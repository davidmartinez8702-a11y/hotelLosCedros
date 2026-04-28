<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TipoHabitacion;
use App\Models\Promo;
use App\Models\Checkin;
use App\Models\HabitacionEvento;
use App\Models\Servicio;
use App\Models\Platillo;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

/**
 * Controlador de API Pública para n8n y agentes externos
 * 
 * Estos endpoints NO requieren autenticación y son públicos
 */
class N8nHotelController extends Controller
{
    /**
     * GET /api/n8n/disponibilidad
     * 
     * Verificar disponibilidad de habitaciones
     * 
     * @queryParam fecha_entrada required|date "Fecha de entrada (Y-m-d)"
     * @queryParam fecha_salida required|date "Fecha de salida (Y-m-d)"
     * @queryParam adultos required|integer "Cantidad de adultos"
     * @queryParam infantes nullable|integer "Cantidad de infantes"
     */
    public function disponibilidad(Request $request)
    {
        try {
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
            $diasEstadia = $fechaEntrada->diffInDays($fechaSalida);

            // Obtener tipos de habitación disponibles
            $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')
                ->where('capacidad_total', '>=', $totalPersonas)
                ->where('estado', 'activo')
                ->with(['imagenes', 'categoria'])
                ->get();

            $disponibilidad = [];

            foreach ($tiposHabitacion as $tipo) {
                // CORRECCIÓN: Contar TODAS las habitaciones físicas disponibles de este tipo
                $habitacionesTotales = HabitacionEvento::where('tipo_habitacion_id', $tipo->id)
                    ->where('estado', 'disponible')
                    ->count();

                // CORRECCIÓN: Contar HOSPEDAJES (reservas) que se superponen en el rango de fechas
                // Hospedaje es donde se guarda qué tipo_habitacion fue reservada y cantidad
                $habitacionesReservadas = \App\Models\Hospedaje::where('tipo_habitacion_id', $tipo->id)
                    ->join('reservas', 'hospedajes.reserva_id', '=', 'reservas.id')
                    ->where(function($query) use ($fechaEntrada, $fechaSalida) {
                        // PostgreSQL: Se superponen si: fecha_reserva < fecha_salida Y (fecha_reserva + dias_estadia) > fecha_entrada
                        $query->whereRaw('reservas.fecha_reserva < ?', [$fechaSalida->toDateString()])
                              ->whereRaw('reservas.fecha_reserva + reservas.dias_estadia * interval \'1 day\' > ?', [$fechaEntrada->toDateString()]);
                    })
                    ->sum('hospedajes.cantidad');

                $habitacionesDisponibles = $habitacionesTotales - (int)($habitacionesReservadas ?? 0);

                if ($habitacionesDisponibles > 0) {
                    $disponibilidad[] = [
                        'id' => $tipo->id,
                        'nombre' => $tipo->nombre,
                        'descripcion' => $tipo->descripcion,
                        'capacidad_total' => $tipo->capacidad_total,
                        'capacidad_adultos' => $tipo->capacidad_adultos,
                        'capacidad_infantes' => $tipo->capacidad_infantes,
                        'precio_noche' => (float)$tipo->precio,
                        'precio_total_estadia' => (float)($tipo->precio * $diasEstadia),
                        'disponibles' => $habitacionesDisponibles,
                        'imagen' => $tipo->imagenes->first()?->url ?? null,
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'fecha_entrada' => $fechaEntrada->format('Y-m-d'),
                    'fecha_salida' => $fechaSalida->format('Y-m-d'),
                    'dias_estadia' => $diasEstadia,
                    'adultos' => $adultos,
                    'infantes' => $infantes,
                    'habitaciones_disponibles' => $disponibilidad,
                    'total_tipos' => count($disponibilidad),
                ],
                'message' => 'Disponibilidad consultada correctamente',
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Validación fallida',
                'details' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al consultar disponibilidad',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/n8n/habitaciones
     * 
     * Obtener listado completo de habitaciones
     * 
     * @queryParam estado optional "activo|inactivo (default: activo)"
     */
    public function listarHabitaciones(Request $request)
    {
        try {
            $estado = $request->query('estado', 'activo');

            $habitaciones = TipoHabitacion::where('tipo', 'habitacion')
                ->where('estado', $estado)
                ->with(['imagenes', 'categoria'])
                ->get()
                ->map(function($tipo) {
                    return [
                        'id' => $tipo->id,
                        'nombre' => $tipo->nombre,
                        'descripcion' => $tipo->descripcion,
                        'categoria' => $tipo->categoria?->nombre ?? null,
                        'capacidad_total' => $tipo->capacidad_total,
                        'capacidad_adultos' => $tipo->capacidad_adultos,
                        'capacidad_infantes' => $tipo->capacidad_infantes,
                        'precio' => (float)$tipo->precio,
                        'estado' => $tipo->estado,
                        'imagen' => $tipo->imagenes->first()?->url ?? null,
                        'amenidades' => $tipo->caracteristicas?->pluck('nombre')->toArray() ?? [],
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $habitaciones,
                'total' => count($habitaciones),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener habitaciones',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/promociones
     * 
     * Obtener promociones vigentes
     */
    public function promociones(Request $request)
    {
        try {
            $hoy = now();

            $promos = Promo::where('estado', 'activa')
                ->where('fecha_inicio', '<=', $hoy)
                ->where('fecha_fin', '>=', $hoy)
                ->get()
                ->map(function($promo) {
                    return [
                        'id' => $promo->id,
                        'nombre' => $promo->nombre,
                        'descripcion' => $promo->descripcion,
                        'tipo' => $promo->tipo_promo,
                        'valor' => (float)$promo->valor,
                        'fecha_inicio' => $promo->fecha_inicio->format('Y-m-d'),
                        'fecha_fin' => $promo->fecha_fin->format('Y-m-d'),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $promos,
                'total' => count($promos),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener promociones',
            ], 500);
        }
    }

    /**
     * POST /api/n8n/calcular-precio
     * 
     * Calcular precio total con habitaciones y promociones
     */
    public function calcularPrecio(Request $request)
    {
        try {
            $request->validate([
                'tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
                'cantidad' => 'required|integer|min:1',
                'dias' => 'required|integer|min:1',
                'promo_id' => 'nullable|exists:promos,id',
            ]);

            $tipo = TipoHabitacion::findOrFail($request->tipo_habitacion_id);
            $cantidad = $request->cantidad;
            $dias = $request->dias;

            $subtotal = $tipo->precio * $cantidad * $dias;
            $descuento = 0;
            $promo_aplicada = null;

            if ($request->promo_id) {
                $promo = Promo::where('id', $request->promo_id)
                    ->where('estado', 'activa')
                    ->where('fecha_inicio', '<=', now())
                    ->where('fecha_fin', '>=', now())
                    ->first();

                if ($promo) {
                    if ($promo->tipo_promo === 'descuento_porcentual') {
                        $descuento = $subtotal * ($promo->valor / 100);
                    } else {
                        $descuento = min($promo->valor, $subtotal);
                    }
                    $promo_aplicada = [
                        'id' => $promo->id,
                        'nombre' => $promo->nombre,
                        'descuento' => (float)$descuento,
                    ];
                }
            }

            $total = $subtotal - $descuento;

            return response()->json([
                'success' => true,
                'data' => [
                    'habitacion' => $tipo->nombre,
                    'cantidad' => $cantidad,
                    'dias' => $dias,
                    'precio_noche' => (float)$tipo->precio,
                    'subtotal' => (float)$subtotal,
                    'descuento' => (float)$descuento,
                    'total' => (float)$total,
                    'promocion' => $promo_aplicada,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al calcular precio',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/información
     * 
     * Obtener información general del hotel (para mensajes del agente)
     */
    public function informacion(Request $request)
    {
        try {
            $totalHabitaciones = HabitacionEvento::where('estado', 'disponible')->count();
            $habitacionesOcupadas = Checkin::where('fecha_salida', '>', now())->count();
            $habitacionesLibres = $totalHabitaciones - $habitacionesOcupadas;

            $tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')
                ->where('estado', 'activo')
                ->count();

            $precioMinimo = TipoHabitacion::where('tipo', 'habitacion')
                ->where('estado', 'activo')
                ->min('precio');

            $precioMaximo = TipoHabitacion::where('tipo', 'habitacion')
                ->where('estado', 'activo')
                ->max('precio');

            $promosActivas = Promo::where('estado', 'activa')
                ->where('fecha_inicio', '<=', now())
                ->where('fecha_fin', '>=', now())
                ->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'nombre' => 'Hotel Cedros',
                    'total_habitaciones' => $totalHabitaciones,
                    'habitaciones_disponibles' => $habitacionesLibres,
                    'habitaciones_ocupadas' => $habitacionesOcupadas,
                    'tipos_habitacion' => $tiposHabitacion,
                    'precio_minimo' => (float)$precioMinimo,
                    'precio_maximo' => (float)$precioMaximo,
                    'promociones_activas' => $promosActivas,
                    'ocupacion_porcentaje' => round(($habitacionesOcupadas / $totalHabitaciones) * 100, 2),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener información',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/servicios
     * 
     * Obtener listado de servicios disponibles
     * 
     * @queryParam estado optional "activo|inactivo (default: activo)"
     */
    public function servicios(Request $request)
    {
        try {
            $estado = $request->query('estado', 'activo');

            $servicios = Servicio::where('estado', $estado)
                ->with(['categoria', 'imagenes'])
                ->get()
                ->map(function($servicio) {
                    return [
                        'id' => $servicio->id,
                        'nombre' => $servicio->nombre,
                        'descripcion' => $servicio->descripcion,
                        'categoría' => $servicio->categoria?->nombre ?? 'Sin categoría',
                        'precio' => (float)$servicio->precio,
                        'estado' => $servicio->estado,
                        'imagen' => $servicio->imagenes->first()?->url ?? null,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $servicios,
                'total' => count($servicios),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener servicios',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/platillos
     * 
     * Obtener listado de platillos (comidas) disponibles
     * 
     * @queryParam estado optional "activo|inactivo (default: activo)"
     * @queryParam categoria_id optional "Filtrar por categoría"
     */
    public function platillos(Request $request)
    {
        try {
            $estado = $request->query('estado', 'disponible');

            $query = Platillo::where('estado', $estado)->with('categoria');


            $platillos = $query->get()
                ->map(function($platillo) {
                    return [
                        'id' => $platillo->id,
                        'nombre' => $platillo->nombre,
                        'descripcion' => $platillo->descripcion,
                        'ingredientes' => $platillo->ingredientes,
                        'precio' => (float)$platillo->precio,
                        'imagen' => $platillo->image_url,
                        'estado' => $platillo->estado,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $platillos,
                'total' => count($platillos),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener platillos',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/servicios/{id}
     * 
     * Obtener detalles de un servicio específico
     */
    public function detalleServicio($id)
    {
        try {
            $servicio = Servicio::with(['categoria', 'imagenes'])->find($id);

            if (!$servicio) {
                return response()->json([
                    'success' => false,
                    'error' => 'Servicio no encontrado',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $servicio->id,
                    'nombre' => $servicio->nombre,
                    'descripcion' => $servicio->descripcion,
                    'categoría' => $servicio->categoria?->nombre,
                    'precio' => (float)$servicio->precio,
                    'estado' => $servicio->estado,
                    'imagenes' => $servicio->imagenes->map(fn($img) => $img->url)->toArray(),
                    'created_at' => $servicio->created_at->format('Y-m-d H:i:s'),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener servicio',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/platillos/{id}
     * 
     * Obtener detalles de un platillo específico
     */
    public function detallePlatillo($id)
    {
        try {
            $platillo = Platillo::with('categoria')->find($id);

            if (!$platillo) {
                return response()->json([
                    'success' => false,
                    'error' => 'Platillo no encontrado',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $platillo->id,
                    'nombre' => $platillo->nombre,
                    'descripcion' => $platillo->descripcion,
                    'ingredientes' => $platillo->ingredientes,
                    'categoría' => $platillo->categoria?->nombre,
                    'precio' => (float)$platillo->precio,
                    'imagen' => $platillo->image_url,
                    'estado' => $platillo->estado,
                    'created_at' => $platillo->created_at->format('Y-m-d H:i:s'),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener platillo',
            ], 500);
        }
    }

    /**
     * GET /api/n8n/categorias
     * 
     * Obtener categorías (servicios, platillos, etc)
     * 
     * @queryParam tipo optional "servicio|platillo|habitacion"
     */
    public function categorias(Request $request)
    {
        try {
            $query = \App\Models\Categoria::where('estado', 'activo');

            if ($request->has('tipo')) {
                $query->where('tipo', $request->query('tipo'));
            }

            $categorias = $query->get()->map(function($cat) {
                return [
                    'id' => $cat->id,
                    'nombre' => $cat->nombre,
                    'descripcion' => $cat->descripcion,
                    'tipo' => $cat->tipo,
                    'imagen' => $cat->image_url ?? null,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $categorias,
                'total' => count($categorias),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al obtener categorías',
            ], 500);
        }
    }

    /**
     * POST /api/n8n/reserva-completa
     * 
     * Crear una reserva completa con servicios y platillos
     * 
     * Ideal para Telegram/Chatbots
     */
    public function reservaCompleta(Request $request)
    {
        try {
            $validated = $request->validate([
                // Datos básicos
                'nombre' => 'required|string|max:255',
                'apellido' => 'nullable|string|max:255',
                'email' => 'required|email',
                'telefono' => 'required|string',
                'ci_pasaporte' => 'required|string',
                
                // Datos de la reserva
                'fecha_entrada' => 'required|date|after_or_equal:today',
                'fecha_salida' => 'required|date|after:fecha_entrada',
                'adultos' => 'required|integer|min:1',
                'infantes' => 'nullable|integer|min:0',
                'tipo_viaje' => 'required|string',
                
                // Habitaciones
                'habitaciones' => 'required|array',
                'habitaciones.*.tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
                'habitaciones.*.cantidad' => 'required|integer|min:1',
                
                // Servicios y platillos
                'servicios_ids' => 'nullable|array',
                'servicios_ids.*' => 'exists:servicios,id',
                'platillos_ids' => 'nullable|array',
                'platillos_ids.*' => 'exists:platillos,id',
                
                // Pago
                'metodo_pago' => 'required|in:qr,stripe,garante',
                'monto_pago' => 'required|numeric|min:0',
                'promo_id' => 'nullable|exists:promos,id',
            ]);

            DB::beginTransaction();

            // 1. Crear usuario si no existe
            $usuario = User::where('email', $validated['email'])->first();

            if (!$usuario) {
                $usuario = User::create([
                    'name' => $validated['nombre'] . ($validated['apellido'] ? ' ' . $validated['apellido'] : ''),
                    'email' => $validated['email'],
                    'telefono' => $validated['telefono'],
                    'password' => bcrypt(Str::random(16)),
                    'username' => Str::slug($validated['email']),
                ]);

                // Crear cliente
                Cliente::create(['id' => $usuario->id]);
            }

            $clienteId = $usuario->id;
            $fechaEntrada = Carbon::parse($validated['fecha_entrada']);
            $fechaSalida = Carbon::parse($validated['fecha_salida']);
            $diasEstadia = $fechaEntrada->diffInDays($fechaSalida);

            // 2. Calcular total de habitaciones
            $subtotalHabitaciones = 0;
            foreach ($validated['habitaciones'] as $hab) {
                $tipo = TipoHabitacion::find($hab['tipo_habitacion_id']);
                $subtotalHabitaciones += $tipo->precio * $hab['cantidad'] * $diasEstadia;
            }

            // 3. Agregar servicios y platillos al total
            $subtotalServicios = 0;
            if (!empty($validated['servicios_ids'])) {
                $servicios = Servicio::whereIn('id', $validated['servicios_ids'])->get();
                $subtotalServicios = $servicios->sum('precio');
            }

            $subtotalPlatillos = 0;
            if (!empty($validated['platillos_ids'])) {
                $platillos = Platillo::whereIn('id', $validated['platillos_ids'])->get();
                $subtotalPlatillos = $platillos->sum('precio');
            }

            $subtotal = $subtotalHabitaciones + $subtotalServicios + $subtotalPlatillos;

            // 4. Aplicar promoción
            $descuento = 0;
            $descuentoPorcentaje = 0;
            $promoId = null;

            if ($validated['promo_id'] ?? null) {
                $promo = Promo::where('id', $validated['promo_id'])
                    ->where('estado', 'activa')
                    ->where('fecha_inicio', '<=', now())
                    ->where('fecha_fin', '>=', now())
                    ->first();

                if ($promo) {
                    $descuentoPorcentaje = $promo->tipo_promo === 'descuento_porcentual' ? $promo->valor : 0;
                    $descuento = $promo->tipo_promo === 'descuento_porcentual' 
                        ? $subtotal * ($promo->valor / 100)
                        : min($promo->valor, $subtotal);
                    $promoId = $promo->id;
                }
            }

            $total = $subtotal - $descuento;
            $pagoInicial = $validated['monto_pago'];

            // 5. Crear reserva
            $reserva = Reserva::create([
                'cliente_id' => $clienteId,
                'fecha_reserva' => $fechaEntrada,
                'dias_estadia' => $diasEstadia,
                'total_cantidad_adultos' => $validated['adultos'],
                'total_cantidad_infantes' => $validated['infantes'] ?? 0,
                'tipo_viaje' => $validated['tipo_viaje'],
                'tipo_reserva' => 'web',
                'estado' => 'confirmada',
                'monto_total' => $total,
                'pago_inicial' => $pagoInicial,
                'porcentaje_descuento' => $descuentoPorcentaje,
                'promo_id' => $promoId,
            ]);

            // 6. Crear hospedajes
            foreach ($validated['habitaciones'] as $hab) {
                $tipo = TipoHabitacion::find($hab['tipo_habitacion_id']);
                $reserva->hospedajes()->create([
                    'tipo_habitacion_id' => $tipo->id,
                    'cantidad' => $hab['cantidad'],
                    'precio_habitacion' => $tipo->precio * $diasEstadia * $hab['cantidad'],
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Reserva creada exitosamente',
                'data' => [
                    'reserva_id' => $reserva->id,
                    'codigo' => 'RES-' . str_pad($reserva->id, 6, '0', STR_PAD_LEFT),
                    'cliente' => [
                        'nombre' => $usuario->name,
                        'email' => $usuario->email,
                        'telefono' => $usuario->telefono,
                    ],
                    'fecha_entrada' => $fechaEntrada->format('Y-m-d'),
                    'fecha_salida' => $fechaSalida->format('Y-m-d'),
                    'dias' => $diasEstadia,
                    'monto_total' => (float)$total,
                    'pago_inicial' => (float)$pagoInicial,
                    'saldo_pendiente' => (float)($total - $pagoInicial),
                    'descuento' => (float)$descuento,
                    'subtotal_habitaciones' => (float)$subtotalHabitaciones,
                    'subtotal_servicios' => (float)$subtotalServicios,
                    'subtotal_platillos' => (float)$subtotalPlatillos,
                ],
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validación fallida',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al crear reserva',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
