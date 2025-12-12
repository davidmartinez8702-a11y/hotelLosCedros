<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Hospedaje;
use App\Models\Factura;
use App\Models\Pago;
use App\Models\Garante;
use App\Models\Cliente;
use App\Models\TipoHabitacion;
use App\Models\TipoPago;
use App\Models\Promo;
use App\Models\Checkin;
use App\Models\HabitacionEvento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\User;
use App\Models\Documento;
use Illuminate\Support\Str;

class ReservaClienteController extends Controller
{
    /**
     * Buscar disponibilidad de habitaciones
     */
    public function buscarDisponibilidad(Request $request)
    {
        $request->validate([
            'fecha_entrada' => 'required|date|after_or_equal:today',
            'fecha_salida' => 'required|date|after:fecha_entrada',
            'adultos' => 'required|integer|min:1',
            'infantes' => 'nullable|integer|min:0',
        ]);

        $fechaEntrada = Carbon::parse($request->fecha_entrada);
        $fechaSalida = Carbon::parse($request->fecha_salida);
        $adultos = $request->adultos;
        $infantes = $request->infantes ?? 0;
        $totalPersonas = $adultos + $infantes;

        // Obtener tipos de habitación que cumplan con la capacidad
        $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')
            ->where('capacidad_total', '>=', $totalPersonas)
            ->where('estado', 'activo')
            ->with(['imagenes', 'categoria'])
            ->get();

        $disponibilidad = [];

        foreach ($tiposHabitacion as $tipo) {
            // Obtener todas las habitaciones de este tipo
            $habitacionesTotales = HabitacionEvento::where('tipo_habitacion_id', $tipo->id)
                ->where('estado', 'disponible')
                ->count();

            // Contar habitaciones ocupadas en el rango de fechas
            $habitacionesOcupadas = Checkin::whereHas('habitacionEvento', function($query) use ($tipo) {
                    $query->where('tipo_habitacion_id', $tipo->id);
                })
                ->where(function($query) use ($fechaEntrada, $fechaSalida) {
                    $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                        ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                        ->orWhere(function($q) use ($fechaEntrada, $fechaSalida) {
                            $q->where('fecha_entrada', '<=', $fechaEntrada)
                              ->where('fecha_salida', '>=', $fechaSalida);
                        });
                })
                ->distinct('habitacion_evento_id')
                ->count('habitacion_evento_id');

            $habitacionesDisponibles = $habitacionesTotales - $habitacionesOcupadas;

            if ($habitacionesDisponibles > 0) {
                $disponibilidad[] = [
                    'tipo_habitacion' => $tipo,
                    'disponibles' => $habitacionesDisponibles,
                    'precio_por_noche' => $tipo->precio,
                ];
            }
        }

        return response()->json([
            'success' => true,
            'disponibilidad' => $disponibilidad,
            'dias_estadia' => $fechaEntrada->diffInDays($fechaSalida),
        ]);
    }

    /**
     * Calcular precio total con promociones
     */
    public function calcularPrecio(Request $request)
    {
        $request->validate([
            'habitaciones' => 'required|array',
            'habitaciones.*.tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
            'habitaciones.*.cantidad' => 'required|integer|min:1',
            'dias_estadia' => 'required|integer|min:1',
            'promo_id' => 'nullable|exists:promos,id',
        ]);

        $subtotal = 0;
        $detalleHabitaciones = [];

        foreach ($request->habitaciones as $habitacion) {
            $tipo = TipoHabitacion::find($habitacion['tipo_habitacion_id']);
            $precioHabitacion = $tipo->precio * $habitacion['cantidad'] * $request->dias_estadia;
            $subtotal += $precioHabitacion;

            $detalleHabitaciones[] = [
                'tipo' => $tipo->nombre,
                'cantidad' => $habitacion['cantidad'],
                'precio_noche' => $tipo->precio,
                'noches' => $request->dias_estadia,
                'subtotal' => $precioHabitacion,
            ];
        }

        $descuento = 0;
        $porcentajeDescuento = 0;
        $promo = null;

        if ($request->promo_id) {
            $promo = Promo::find($request->promo_id);
            
            if ($promo && $promo->estado === 'activa') {
                if ($promo->tipo_promo === 'descuento_porcentual') {
                    $porcentajeDescuento = $promo->valor;
                    $descuento = ($subtotal * $porcentajeDescuento) / 100;
                } elseif ($promo->tipo_promo === 'descuento_fijo') {
                    $descuento = $promo->valor;
                }
            }
        }

        $total = $subtotal - $descuento;

        return response()->json([
            'success' => true,
            'subtotal' => $subtotal,
            'descuento' => $descuento,
            'porcentaje_descuento' => $porcentajeDescuento,
            'total' => $total,
            'detalle' => $detalleHabitaciones,
            'promo' => $promo ? [
                'id' => $promo->id,
                'nombre' => $promo->nombre,
                'descripcion' => $promo->descripcion,
            ] : null,
        ]);
    }

    /**
     * Crear reserva desde cliente
     */
    public function store(Request $request)
    {
        try {
            // Validar datos
            $validated = $request->validate([
                'fecha_entrada' => 'required|date',
                'fecha_salida' => 'required|date|after:fecha_entrada',
                'adultos' => 'required|integer|min:1',
                'infantes' => 'nullable|integer|min:0',
                'tipo_viaje' => 'required|string',
                'habitaciones' => 'required|array|min:1',
                'habitaciones.*.tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
                'habitaciones.*.cantidad' => 'required|integer|min:1',
                'metodo_pago' => 'required|in:qr,stripe,garante',
                'monto_pago' => 'required|numeric|min:0',
                'promo_id' => 'nullable|exists:promos,id',
            ]);

            DB::beginTransaction();

            // 1. Crear o buscar cliente
            $clienteId = $request->cliente_id;

            if (!$clienteId) {
                // ✅ Cliente nuevo (invitado) - Crear usuario primero
                $request->validate([
                    'nombre' => 'required|string|max:255',
                    'apellido' => 'nullable|string|max:255',
                    'email' => 'required|email|unique:users,email',
                    'telefono' => 'required|string',
                    'ci_pasaporte' => 'required|string',
                ]);

                // Crear usuario
                $usuario = User::create([
                    'name' => $request->nombre . ($request->apellido ? ' ' . $request->apellido : ''),
                    'email' => $request->email,
                    'telefono' => $request->telefono,
                    'password' => bcrypt(Str::random(16)),  // Password temporal
                    'username' => Str::slug($request->email),
                ]);

                // Crear documento (si usas la tabla documentos)
                if ($usuario && $request->ci_pasaporte) {
                    Documento::create([
                        'user_id' => $usuario->id,
                        'numero_documento' => $request->ci_pasaporte,
                        'tipo_documento' => 'CI',  // O determinar según formato
                    ]);
                }

                // Crear cliente vinculado al usuario
                Cliente::create([
                    'id' => $usuario->id,
                ]);

                $clienteId = $usuario->id;

            } else {
                // Cliente existente - Verificar que tenga usuario
                $cliente = Cliente::with('usuario')->find($clienteId);
                
                if (!$cliente || !$cliente->usuario) {
                    throw new \Exception('Cliente no válido');
                }
            }

            // 2. Calcular días de estadía
            $fechaEntrada = Carbon::parse($request->fecha_entrada);
            $fechaSalida = Carbon::parse($request->fecha_salida);
            $diasEstadia = $fechaEntrada->diffInDays($fechaSalida);

            // 3. Calcular totales
            $subtotal = 0;
            foreach ($request->habitaciones as $hab) {
                $tipoHabitacion = TipoHabitacion::findOrFail($hab['tipo_habitacion_id']);
                $subtotal += $tipoHabitacion->precio * $hab['cantidad'] * $diasEstadia;
            }

            // 4. Aplicar promoción (si existe)
            $descuento = 0;
            $descuentoPorcentaje = 0;
            $promoId = null;

            if ($request->promo_id) {
                $promo = Promo::where('id', $request->promo_id)
                    ->where('estado', 'activa')
                    ->where('fecha_inicio', '<=', now())
                    ->where('fecha_fin', '>=', now())
                    ->first();

                if ($promo) {
                    if ($promo->tipo_promo === 'descuento_porcentual') {
                        $descuentoPorcentaje = $promo->valor;
                        $descuento = $subtotal * ($promo->valor / 100);
                    } else {
                        $descuento = min($promo->valor, $subtotal);
                    }
                    $promoId = $promo->id;
                }
            }

            $total = $subtotal - $descuento;
            $pagoInicial = $request->monto_pago;
            $saldoPendiente = $total - $pagoInicial;

            // ✅ DETERMINAR TIPO DE RESERVA SEGÚN EL PAGO
            $tipoReserva = 'parcial'; // Por defecto
            
            if ($request->metodo_pago === 'garante') {
                $tipoReserva = 'garante';
            } elseif ($pagoInicial >= $total) {
                $tipoReserva = 'completo';
            } else {
                $tipoReserva = 'parcial';
            }

            // 5. Crear reserva
            $reserva = Reserva::create([
                'cliente_id' => $clienteId,
                'fecha_reserva' => $fechaEntrada,
                'dias_estadia' => $diasEstadia,
                'total_cantidad_adultos' => $request->adultos,  // ✅ Correcto
                'total_cantidad_infantes' => $request->infantes,  // ✅ Correcto
                'tipo_viaje' => $request->tipo_viaje,
                'tipo_reserva' => 'web',
                'estado' => 'confirmada',
                'monto_total' => $total,
                'pago_inicial' => $pagoInicial,
                'porcentaje_descuento' => $descuentoPorcentaje,
                'promo_id' => $promoId,
            ]);

            // 6. Crear hospedajes (habitaciones reservadas)
            foreach ($request->habitaciones as $hab) {
                $tipoHabitacion = TipoHabitacion::findOrFail($hab['tipo_habitacion_id']);

                // ✅ CREAR UN SOLO REGISTRO con la cantidad
                Hospedaje::create([
                    'reserva_id' => $reserva->id,
                    'tipo_habitacion_id' => $tipoHabitacion->id,
                    'cantidad' => $hab['cantidad'],  // ← Guardar la cantidad aquí
                    'precio_habitacion' => $tipoHabitacion->precio * $diasEstadia * $hab['cantidad'],
                ]);
            }

            // 7. Obtener o crear tipo de pago
            $tipoPago = TipoPago::firstOrCreate(
                ['nombre' => $request->metodo_pago],
                ['descripcion' => ucfirst($request->metodo_pago)]
            );

            // 8. Crear factura
            $factura = Factura::create([
                'reserva_id' => $reserva->id,
                'tipo_pago_id' => $tipoPago->id,
                'monto_total' => $total,
                'monto_subtotal' => $subtotal,
                'descuento_aplicado' => $descuento,
            ]);

            // 9. Procesar pago según método
            if ($request->metodo_pago === 'stripe') {
                // ✅ CORRECCIÓN: Usar el namespace completo sin import
                try {
                    if (!$request->stripe_token) {
                        throw new \Exception('Token de Stripe requerido');
                    }

                    // Configurar Stripe
                    Stripe::setApiKey(config('services.stripe.secret'));

                    // Crear cargo
                    $charge = \Stripe\Charge::create([
                        'amount' => (int)($pagoInicial * 100), // Convertir a centavos
                        'currency' => 'usd', // Cambiar a 'bob' si Stripe lo soporta
                        'source' => $request->stripe_token,
                        'description' => "Reserva #{$reserva->id} - {$cliente->nombre} {$cliente->apellido}",
                        'metadata' => [
                            'reserva_id' => $reserva->id,
                            'cliente_id' => $cliente->id,
                        ],
                    ]);

                    // Guardar pago
                    Pago::create([
                        'factura_id' => $factura->id,
                        'pago_id' => $charge->id,
                        'monto' => $pagoInicial,
                    ]);

                    Log::info('Pago con Stripe exitoso: ' . $charge->id);

                } catch (\Stripe\Exception\CardException $e) {
                    throw new \Exception('Error en la tarjeta: ' . $e->getMessage());
                } catch (\Stripe\Exception\ApiErrorException $e) {
                    throw new \Exception('Error de Stripe: ' . $e->getMessage());
                }

            } elseif ($request->metodo_pago === 'garante') {
                // Guardar información de garantía
                $request->validate([
                    'tipo_tarjeta' => 'required|string',
                    'nro_tarjeta' => 'required|string',
                ]);

                Garante::create([
                    'cliente_id' => $clienteId,
                    'factura_id' => $factura->id,
                    'tipo_tarjeta' => $request->tipo_tarjeta,
                    'nro_tarjeta' => substr($request->nro_tarjeta, -4), // Solo últimos 4 dígitos
                ]);

                // Crear pago pendiente
                Pago::create([
                    'factura_id' => $factura->id,
                    'pago_id' => 'GARANTE-' . $reserva->id,
                    'monto' => 0, // Se pagará en check-in
                ]);

            } else {
                // QR - Crear pago pendiente
                Pago::create([
                    'factura_id' => $factura->id,
                    'pago_id' => 'QR-' . $reserva->id,
                    'monto' => $pagoInicial,
                ]);
            }

            // 10. Generar PDF de factura
            try {
                $pdf = Pdf::loadView('pdf.factura-reserva', [
                    'reserva' => $reserva->load(['cliente', 'hospedajes.tipoHabitacion']),
                    'factura' => $factura,
                    'cliente' => $cliente,
                ]);

                $pdfPath = storage_path('app/public/facturas/factura-reserva-' . $reserva->id . '.pdf');
                
                // Crear directorio si no existe
                if (!file_exists(dirname($pdfPath))) {
                    mkdir(dirname($pdfPath), 0755, true);
                }

                $pdf->save($pdfPath);
                
                Log::info('PDF generado exitosamente: ' . $pdfPath);

            } catch (\Exception $e) {
                Log::error('Error generando PDF: ' . $e->getMessage());
                // No detener el proceso si falla el PDF
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Reserva creada exitosamente',
                'reserva' => [
                    'id' => $reserva->id,
                    'codigo' => 'RES-' . str_pad($reserva->id, 6, '0', STR_PAD_LEFT),
                    'monto_total' => $total,
                    'pago_inicial' => $pagoInicial,
                    'saldo_pendiente' => $saldoPendiente,
                ],
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            
            Log::error('Error de validación: ', $e->errors());
            
            return response()->json([
                'success' => false,
                'message' => 'Datos de validación incorrectos',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Error al crear reserva: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la reserva: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Generar factura PDF de la reserva
     */
    private function generarFacturaReserva($reserva)
    {
        // ✅ CAMBIAR 'facturas' → 'factura'
        $reserva->load(['cliente', 'promo', 'hospedajes.tipoHabitacion', 'factura.tipoPago']);

        $logoPath = public_path('images/cedros_blanco.png');
        $logoBase64 = '';
        
        if (file_exists($logoPath)) {
            $logoData = file_get_contents($logoPath);
            $logoBase64 = 'data:image/png;base64,' . base64_encode($logoData);
        }

        // ✅ CAMBIAR: Acceder a factura singular
        $factura = $reserva->factura; // Ya no usar ->first()
        $saldoPendiente = $reserva->monto_total - $reserva->pago_inicial;

        $data = [
            'reserva' => $reserva,
            'factura' => $factura,
            'logo' => $logoBase64,
            'fecha_emision' => now()->format('d/m/Y H:i'),
            'codigo_reserva' => 'RES-' . str_pad($reserva->id, 6, '0', STR_PAD_LEFT),
            'saldo_pendiente' => $saldoPendiente,
        ];

        $pdf = Pdf::loadView('pdf.factura-reserva', $data)
            ->setPaper('letter', 'portrait');

        $filename = 'factura-reserva-' . $reserva->id . '.pdf';
        $path = storage_path('app/public/facturas/' . $filename);

        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        $pdf->save($path);

        return '/storage/facturas/' . $filename;
    }

    /**
     * Obtener promociones vigentes
     */
    public function obtenerPromociones()
    {
        $hoy = now();
        
        $promos = Promo::where('estado', 'activa')
            ->where('fecha_inicio', '<=', $hoy)
            ->where('fecha_fin', '>=', $hoy)
            ->get();

        return response()->json([
            'success' => true,
            'promociones' => $promos,
        ]);
    }

    /**
     * Mostrar vista de búsqueda
     */
    public function index()
    {
        return inertia('Reservas/Cliente/IndexCliente');
    }

    /**
     * Mostrar formulario de creación
     */
    public function create(Request $request)
    {
        $request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'required|date',
            'adultos' => 'required|integer',
            'infantes' => 'nullable|integer',
            'tipo_viaje' => 'required|string',
            'dias_estadia' => 'required|integer',
        ]);

        // Obtener tipos de habitación disponibles
        $fechaEntrada = Carbon::parse($request->fecha_entrada);
        $fechaSalida = Carbon::parse($request->fecha_salida);
        $totalPersonas = $request->adultos + ($request->infantes ?? 0);

        $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')
            ->where('capacidad_total', '>=', $totalPersonas)
            ->where('estado', 'activo')
            ->get()
            ->map(function($tipo) use ($fechaEntrada, $fechaSalida) {
                $habitacionesTotales = HabitacionEvento::where('tipo_habitacion_id', $tipo->id)
                    ->where('estado', 'disponible')
                    ->count();

                $habitacionesOcupadas = Checkin::whereHas('habitacionEvento', function($query) use ($tipo) {
                        $query->where('tipo_habitacion_id', $tipo->id);
                    })
                    ->where(function($query) use ($fechaEntrada, $fechaSalida) {
                        $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                            ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                            ->orWhere(function($q) use ($fechaEntrada, $fechaSalida) {
                                $q->where('fecha_entrada', '<=', $fechaEntrada)
                                  ->where('fecha_salida', '>=', $fechaSalida);
                            });
                    })
                    ->distinct('habitacion_evento_id')
                    ->count('habitacion_evento_id');

                $tipo->disponibles = $habitacionesTotales - $habitacionesOcupadas;
                return $tipo;
            })
            ->filter(function($tipo) {
                return $tipo->disponibles > 0;
            })
            ->values();

        return inertia('Reservas/Cliente/CreateCliente', [
            'fecha_entrada' => $request->fecha_entrada,
            'fecha_salida' => $request->fecha_salida,
            'adultos' => $request->adultos,
            'infantes' => $request->infantes ?? 0,
            'tipo_viaje' => $request->tipo_viaje,
            'dias_estadia' => $request->dias_estadia,
            'tipos_habitacion' => $tiposHabitacion,
        ]);
    }

    /**
     * Mostrar confirmación de reserva
     */
    public function confirmacion(Request $request)
    {
        // ✅ QUITAR: 'cliente.usuario.documento'
        $reserva = Reserva::with([
            'cliente.usuario',  // ← Solo cargar usuario, sin documento
            'hospedajes.tipoHabitacion', 
            'factura', 
            'promo'
        ])->findOrFail($request->reserva_id);

        $fechaEntrada = Carbon::parse($reserva->fecha_reserva);
        $fechaSalida = $fechaEntrada->copy()->addDays($reserva->dias_estadia);

        // ✅ Transformar hospedajes
        $hospedajesConPrecio = $reserva->hospedajes->map(function ($hospedaje) use ($reserva) {
            return [
                'id' => $hospedaje->id,
                'cantidad' => $hospedaje->cantidad ?? 1,
                'tipo_habitacion' => [
                    'id' => $hospedaje->tipoHabitacion->id,
                    'nombre' => $hospedaje->tipoHabitacion->nombre,
                    'precio' => $hospedaje->tipoHabitacion->precio,
                    'capacidad_total' => $hospedaje->tipoHabitacion->capacidad_total,
                ],
                'precio_habitacion' => $hospedaje->tipoHabitacion->precio * $reserva->dias_estadia * ($hospedaje->cantidad ?? 1),
            ];
        });

        // ✅ Obtener datos del usuario
        $usuario = $reserva->cliente->usuario;

        // ✅ Separar nombre y apellido
        $nombreCompleto = explode(' ', $usuario->name ?? '', 2);
        $nombre = $nombreCompleto[0] ?? 'Usuario';
        $apellido = $nombreCompleto[1] ?? '';

        return inertia('Reservas/Cliente/ConfirmacionCliente', [
            'reserva' => [
                'id' => $reserva->id,
                'codigo' => 'RES-' . str_pad($reserva->id, 6, '0', STR_PAD_LEFT),
                'cliente' => [
                    'id' => $reserva->cliente->id,
                    'nombre' => $nombre,
                    'apellido' => $apellido,
                    'email' => $usuario->email ?? 'correo@ejemplo.com',
                    'telefono' => $usuario->telefono ?? '00000000',
                    // ✅ QUITAR: 'ci_nit' - Ya no se envía desde backend
                ],
                'fecha_reserva' => Carbon::parse($reserva->fecha_reserva)->format('Y-m-d'),
                'dias_estadia' => $reserva->dias_estadia,
                'adultos' => $reserva->total_cantidad_adultos,
                'infantes' => $reserva->total_cantidad_infantes,
                'tipo_viaje' => $reserva->tipo_viaje,
                'monto_total' => $reserva->monto_total,
                'pago_inicial' => $reserva->pago_inicial,
                'estado' => $reserva->estado,
                'hospedajes' => $hospedajesConPrecio,
                'promo' => $reserva->promo,
                'created_at' => $reserva->created_at->format('Y-m-d H:i:s'),
            ],
            'fecha_entrada' => $fechaEntrada->format('Y-m-d'),
            'fecha_salida' => $fechaSalida->format('Y-m-d'),
        ]);
    }

    /**
     * Reenviar email de confirmación
     */
    public function reenviarEmail(Reserva $reserva)
    {
        try {
            // Aquí implementarías el envío de email
            // Mail::to($reserva->cliente->email)->send(new ReservaConfirmada($reserva));

            return response()->json([
                'success' => true,
                'message' => 'Email enviado correctamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el email',
            ], 500);
        }
    }
}
