<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservaController extends Controller
{
    public function index(Request $request)
    {
        $query = Reserva::with(['cliente.usuario']);

        // Filtro por búsqueda (nombre del cliente)
        if ($request->filled('search')) {
            $query->whereHas('cliente.usuario', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        // Filtro por estado
        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        // Filtro por tipo de reserva
        if ($request->filled('tipo_reserva') && $request->tipo_reserva !== 'todos') {
            $query->where('tipo_reserva', $request->tipo_reserva);
        }

        // Filtro por tipo de viaje
        if ($request->filled('tipo_viaje') && $request->tipo_viaje !== 'todos') {
            $query->where('tipo_viaje', $request->tipo_viaje);
        }

        $reservas = $query->latest('fecha_reserva')->paginate(10)->through(fn($reserva) => [
            'id' => $reserva->id,
            'cliente' => [
                'id' => $reserva->cliente->id,
                'user' => [
                    'name' => $reserva->cliente->usuario->name,
                    'email' => $reserva->cliente->usuario->email,
                ],
            ],
            'fecha_reserva' => $reserva->fecha_reserva,
            'dias_estadia' => $reserva->dias_estadia,
            'estado' => $reserva->estado,
            'tipo_reserva' => $reserva->tipo_reserva,
            'tipo_viaje' => $reserva->tipo_viaje,
            'pago_inicial' => $reserva->pago_inicial,
            'monto_total' => $reserva->monto_total,
        ]);

        return Inertia::render('Reservas/Recepcion/IndexRecepcion', [
            'reservas' => $reservas,
            'filters' => $request->only(['search', 'estado', 'tipo_reserva', 'tipo_viaje']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservas/Recepcion/CreateRecepcion');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Implementar
    }

    /**
     * Display the specified resource.
     */
    public function show(Reserva $reserva)
    {
        // 1. Cargar relaciones profundas necesarias para la Recepción
        $reserva->load([
            'cliente.usuario', // Quién reservó
            'promo',
            'hospedajes.tipoHabitacion', // Lo que se solicitó
            'checkins.cliente.usuario',             // Clientes (huéspedes) en el check-in
            'checkins.habitacionEvento.tipoHabitacion', // Habitación y su tipo asignado
        ]);

        // 2. Mapear datos de la Reserva (similar a lo que ya tenías)
        $reservaData = [
            'id' => $reserva->id,
            'cliente' => [
                'id' => $reserva->cliente->id,
                'user' => [
                    'name' => $reserva->cliente->usuario->name,
                    'email' => $reserva->cliente->usuario->email,
                ],
            ],
            'fecha_reserva' => $reserva->fecha_reserva,
            'dias_estadia' => $reserva->dias_estadia,
            'estado' => $reserva->estado,
            'tipo_reserva' => $reserva->tipo_reserva,
            'tipo_viaje' => $reserva->tipo_viaje,
            'total_cantidad_adultos' => $reserva->total_cantidad_adultos,
            'total_cantidad_infantes' => $reserva->total_cantidad_infantes,
            'porcentaje_descuento' => $reserva->porcentaje_descuento,
            'pago_inicial' => $reserva->pago_inicial,
            'monto_total' => $reserva->monto_total,
            'promo' => $reserva->promo ? [
                'id' => $reserva->promo->id,
                'nombre' => $reserva->promo->nombre,
            ] : null,
            'created_at' => $reserva->created_at->format('d/m/Y H:i'),
            'updated_at' => $reserva->updated_at->format('d/m/Y H:i'),
        ];

        // 3. Mapear los detalles de Hospedaje Solicitado
        $detallesHospedajeSolicitado = $reserva->hospedajes->map(fn($hospedaje) => [
            'tipo_habitacion_nombre' => $hospedaje->tipoHabitacion->nombre,
            'cantidad_solicitada' => $hospedaje->cantidad,
            'precio_noche' => $hospedaje->tipoHabitacion->precio,
        ]);

        // 4. Mapear los Check-ins Asignados
        $checkinsAsignados = $reserva->checkins->map(fn($checkin) => [
            'id' => $checkin->id,
            'recepcionista_id' => $checkin->recepcionista_id,
            'cliente_id' => $checkin->cliente_id,
            'huesped_nombre' => $checkin->cliente->usuario->name, // El huésped principal del check-in
            'habitacion_codigo' => $checkin->habitacionEvento->codigo,
            'tipo_habitacion' => $checkin->habitacionEvento->tipoHabitacion->nombre,
            'fecha_entrada' => $checkin->fecha_entrada,
            'fecha_salida' => $checkin->fecha_salida,
            'estado_checkin' => $checkin->fecha_salida ? 'Check-out' : 'Activo',
            
            // Aquí deberías cargar los huéspedes adicionales si tienes la tabla 'huespedes_checkin' o similar.
            // Por ahora, asumiremos que solo el cliente_id asociado es el principal.
            // Si necesitas múltiples huéspedes por checkin, avísame para integrar esa lógica.
        ]);


        return Inertia::render('Reservas/Recepcion/ShowRecepcion', [
            'reserva' => $reservaData,
            'hospedajes_solicitados' => $detallesHospedajeSolicitado,
            'checkins_asignados' => $checkinsAsignados,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reserva)
    {
        return Inertia::render('Reservas/Recepcion/EditRecepcion', [
            'reserva' => $reserva->load(['cliente.usuario']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reserva $reserva)
    {
        // TODO: Implementar
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        // TODO: Implementar
        
    }

    public function misReservas(Request $request)
    {
        // 1. Obtener ID del Cliente Autenticado
        $usuarioAutenticado = Auth::user();
        
        // Cargar la relación 'cliente' del usuario autenticado
        $usuarioAutenticado->load('cliente'); 
        
        $clienteAutenticado = $usuarioAutenticado->cliente;

        if (!$clienteAutenticado) {
            abort(403, 'Acceso denegado o usuario no es cliente.');
        }

        $clienteAutenticadoId = $clienteAutenticado->id;

        
        $query = Reserva::with(['cliente.usuario', 'promo'])
            ->where('cliente_id', $clienteAutenticadoId); // ← CAMBIO AQUÍ

        // 4. Aplicar Filtros
        
        // Filtro por búsqueda (ID de reserva o tipo de viaje)
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('id', 'like', "%{$request->search}%")
                  ->orWhere('tipo_viaje', 'like', "%{$request->search}%");
            });
        }

        // Filtro por estado
        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        // Filtro por tipo de reserva
        if ($request->filled('tipo_reserva') && $request->tipo_reserva !== 'todos') {
            $query->where('tipo_reserva', $request->tipo_reserva);
        }

        // Filtro por tipo de viaje
        if ($request->filled('tipo_viaje') && $request->tipo_viaje !== 'todos') {
            $query->where('tipo_viaje', $request->tipo_viaje);
        }
        
        // 5. Paginar y Mapear Datos
        $reservas = $query->latest('fecha_reserva')->paginate(10)->through(fn($reserva) => [
            'id' => $reserva->id,
            'fecha_reserva' => Carbon::parse($reserva->fecha_reserva)->format('Y-m-d'),
            'dias_estadia' => $reserva->dias_estadia,
            'estado' => $reserva->estado,
            'tipo_reserva' => $reserva->tipo_reserva,
            'tipo_viaje' => $reserva->tipo_viaje,
            'pago_inicial' => $reserva->pago_inicial,
            'monto_total' => $reserva->monto_total,
            'promo' => $reserva->promo ? [
                'id' => $reserva->promo->id,
                'nombre' => $reserva->promo->nombre,
            ] : null,
            'created_at' => $reserva->created_at->format('Y-m-d H:i:s'),
        ]);

        // 6. Renderizar vista del cliente
        return Inertia::render('Reservas/Cliente/MisReservasIndex', [
            'reservas' => $reservas,
            'filters' => $request->only(['search', 'estado', 'tipo_reserva', 'tipo_viaje']),
            'cliente_nombre' => $clienteAutenticado->usuario->name, 
        ]);
    }


    public function generarReporteDistribucion(Reserva $reserva)
    {
        // 1. Cargar relaciones
        $reserva->load(['cliente.usuario', 'hospedajes.tipoHabitacion', 'promo']);

        // 2. Preparar el Logo
        $logoPath = public_path('images/cedros_blanco.png');
        $logoBase64 = null;
        if (file_exists($logoPath)) {
            $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
        }

        // 3. Mapear Desglose (Calculando totales reales por ítem)
        $desgloseHospedaje = $reserva->hospedajes->map(function ($h) use ($reserva) {
            $subtotal = $h->tipoHabitacion->precio * $h->cantidad * $reserva->dias_estadia;
            return [
                'tipo' => 'Habitación',
                'descripcion' => $h->tipoHabitacion->nombre,
                'precio_unitario' => $h->tipoHabitacion->precio,
                'cantidad' => $h->cantidad,
                'noches' => $reserva->dias_estadia,
                'subtotal' => $subtotal
            ];
        });

        $totalCalculado = $desgloseHospedaje->sum('subtotal');
        $descuento = $reserva->promo ? ($totalCalculado * ($reserva->porcentaje_descuento / 100)) : 0;

        $datosReporte = [
            'titulo' => 'DISTRIBUCIÓN DE RESERVA',
            'hotel' => [
                'nombre' => 'HOTEL LOS CEDROS',
                'nit' => '1029384756',
                'ubicacion' => 'Santa Cruz, Bolivia',
                'telefono' => '+591 3 345 6789',
                'logo_base64' => $logoBase64,
            ],
            'reserva' => [
                'id' => $reserva->id,
                'fecha_emision' => Carbon::now()->format('d/m/Y H:i:s'),
                'total_bruto' => $totalCalculado,
                'pago_inicial' => $reserva->pago_inicial,
                'descuento' => $descuento,
                'saldo_pendiente' => ($totalCalculado - $descuento) - $reserva->pago_inicial,
            ],
            'cliente' => [
                'nombre' => $reserva->cliente->usuario->name,
                'email' => $reserva->cliente->usuario->email,
                'telefono' => $reserva->cliente->usuario->telefono,
            ],
            'estadia' => [
                'fecha_llegada' => Carbon::parse($reserva->fecha_reserva)->format('d/m/Y'),
                'noches' => $reserva->dias_estadia,
                'tipo_viaje' => $reserva->tipo_viaje,
            ],
            'desglose' => $desgloseHospedaje,
        ];

        $pdf = Pdf::loadView('reportes.reporte_distribucion_reserva', ['d' => $datosReporte]);
        return $pdf->download('RESERVA_DISTRIBUCION_' . $reserva->id . '.pdf');
    }

    public function generarReporteAsignacion(Reserva $reserva)
    {
        // 1. Eager Loading de todas las relaciones necesarias según tus migraciones
        $reserva->load([
            'cliente.usuario', 
            'checkins.cliente.usuario', 
            'checkins.habitacionEvento.tipoHabitacion'
        ]);

        // 2. Agrupamos los check-ins por el código de la habitación
        // Esto nos permite listar múltiples personas bajo una misma unidad física
        $habitacionesAgrupadas = $reserva->checkins->groupBy(function($checkin) {
            return $checkin->habitacionEvento->codigo; 
        });

        // 3. Preparación del Logo
        $logoPath = public_path('images/cedros_blanco.png');
        $logoBase64 = file_exists($logoPath) ? 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath)) : null;

        $datosReporte = [
            'titulo' => 'HOJA DE ALOJAMIENTO Y DISTRIBUCIÓN DE HUÉSPEDES',
            'hotel' => [
                'nombre' => 'HOTEL LOS CEDROS',
                'nit' => '1029384756',
                'ubicacion' => 'Santa Cruz, Bolivia',
                'logo_base64' => $logoBase64,
            ],
            'reserva' => [
                'id' => $reserva->id,
                'titular' => $reserva->cliente->usuario->name,
                'fecha_emision' => now()->format('d/m/Y H:i'),
                'noches' => $reserva->dias_estadia,
            ],
            'habitaciones' => $habitacionesAgrupadas
        ];

        $pdf = Pdf::loadView('reportes.reporte_asignacion', ['d' => $datosReporte]);
        
        return $pdf->download('ROOMING_LIST_' . $reserva->id . '.pdf');
    }

}
