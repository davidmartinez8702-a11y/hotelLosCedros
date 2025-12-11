<?php

namespace App\Http\Controllers;

use App\Models\Checkin;
use App\Models\Cliente;
use App\Models\HabitacionEvento;
use App\Models\Recepcionista;
use App\Models\Reserva;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CheckinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Checkin::with([
            'cliente.usuario',
            'habitacionEvento.tipoHabitacion'
        ]);

        // Filtro por búsqueda (nombre o email del cliente)
        if ($request->filled('search')) {
            $query->whereHas('cliente.usuario', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        // Filtro por cliente específico
        if ($request->filled('cliente_id') && $request->cliente_id !== 'todos') {
            $query->where('cliente_id', $request->cliente_id);
        }

        // Filtro por fecha desde
        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha_entrada', '>=', $request->fecha_desde);
        }

        // Filtro por fecha hasta
        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha_entrada', '<=', $request->fecha_hasta);
        }

        $checkins = $query->latest('fecha_entrada')->paginate(10)->through(fn($checkin) => [
            'id' => $checkin->id,
            'cliente' => [
                'id' => $checkin->cliente->id,
                'user' => [
                    'id' => $checkin->cliente->usuario->id,
                    'name' => $checkin->cliente->usuario->name,
                    'email' => $checkin->cliente->usuario->email,
                ],
            ],
            'habitacion_evento' => [
                'id' => $checkin->habitacionEvento->id,
                'nombre' => $checkin->habitacionEvento->nombre,
                'codigo' => $checkin->habitacionEvento->codigo,
                'tipo_habitacion' => [
                    'id' => $checkin->habitacionEvento->tipoHabitacion->id,
                    'nombre' => $checkin->habitacionEvento->tipoHabitacion->nombre,
                    'tipo' => $checkin->habitacionEvento->tipoHabitacion->tipo,
                ],
            ],
            'fecha_entrada' => $checkin->fecha_entrada,
            'fecha_salida' => $checkin->fecha_salida,
            'created_at' => $checkin->created_at->toISOString(),
        ]);

        // Obtener lista de clientes para el filtro
        $clientes = Cliente::with('usuario')
            ->whereHas('usuario')
            ->get()
            ->map(fn($cliente) => [
                'id' => $cliente->id,
                'nombre' => $cliente->usuario->name,
                'email' => $cliente->usuario->email,
            ]);

        return Inertia::render('Checkin/Index', [
            'checkins' => $checkins,
            'clientes' => $clientes,
            'filters' => $request->only(['search', 'cliente_id', 'fecha_desde', 'fecha_hasta']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

   public function createCheckinMedianteReserva(Reserva $reserva, Request $request)
    {
        // 1. Cargar la Reserva y Cliente Principal
        $reserva->load(['cliente.usuario', 'hospedajes.tipoHabitacion','checkins.habitacionEvento.tipoHabitacion']);
        
        $clientesReserva = collect();
        $clientePrincipalId = null;
        $clienteQueRealizoLaReserva = null;
        if ($reserva->cliente) {
            $clientePrincipalId = $reserva->cliente->id; // Guarda el ID del cliente principal
            
            $clienteQueRealizoLaReserva = [
                'id' => $reserva->cliente->id,
                'nombre' => $reserva->cliente->usuario->name,
                'email' => $reserva->cliente->usuario->email,
                'is_principal' => true,         
            ];    
        }
        $clientesDeCheckin = $reserva->checkins->pluck('cliente_id')->toArray();
        // 2. Obtener lista paginada de clientes disponibles (Excluyendo al principal)
        
        // Determinar qué cliente excluir
        // $excluirIds = $clientesReserva->pluck('id')->toArray();
        $excluirIds = $clientesDeCheckin;
        // Filtro de búsqueda opcional desde el frontend (si el recepcionista teclea en el input y se envía un GET)
        $search = $request->input('search');

        $clientesDisponiblesQuery = Cliente::with('usuario')
            ->whereHas('usuario');

        // Excluir al cliente principal y otros que ya estén en la bolsa
        // $clientesDisponiblesQuery->whereNotIn('id', $excluirIds);

        // Si se envía un término de búsqueda paginado (ej. el recepcionista teclea y se hace un router.get)
        if ($search) {
             $clientesDisponiblesQuery->whereHas('usuario', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('telefono', 'like', "%{$search}%");
            });
        }

        if (!empty($excluirIds)) {
            $clientesDisponiblesQuery->whereNotIn('id', $excluirIds);
        }
        // Obtener la paginación de clientes
        $clientesDisponibles = $clientesDisponiblesQuery
            ->latest('id')
            ->paginate(5) // 10 por página, controlado por el frontend
            ->through(fn($cliente) => [
                'id' => $cliente->id,
                'nombre' => $cliente->usuario->name,
                'email' => $cliente->usuario->email,
                'telefono' => $cliente->usuario->telefono,
            ]);
        
        // 3. Obtener Habitaciones y Recepcionistas (como lo tenías)
        $habitacionesDisponibles = HabitacionEvento::with('tipoHabitacion')
            ->where('estado', 'disponible')
            ->get()
            ->map(fn($hab) => [
                'id' => $hab->id,
                'codigo' => $hab->codigo,
                'nombre' => $hab->nombre,
                'tipo' => $hab->tipoHabitacion->tipo,
                'tipo_nombre' => $hab->tipoHabitacion->nombre,
                'capacidad_adultos' => $hab->tipoHabitacion->capacidad_adultos,
                'capacidad_infantil' => $hab->tipoHabitacion->capacidad_infantes,
                'capacidad_total' => $hab->tipoHabitacion->capacidad_total,
            ]);
        
        $recepcionistas = Recepcionista::with('usuario')
            ->whereHas('usuario')
            ->get()
            ->map(fn($recep) => [
                'id' => $recep->id,
                'nombre' => $recep->usuario->name,
            ]);

        // 4. Calcular habitaciones solicitadas
        $habitacionesSolicitadas = $reserva?->hospedajes
            ?->map(fn($hospedaje) => [
                'tipo_id' => $hospedaje->tipoHabitacion->id,
                'nombre_tipo' => $hospedaje->tipoHabitacion->nombre,
                'cantidad' => $hospedaje->cantidad ?? 1, 
                'tipo_reserva' => $hospedaje->tipoHabitacion->tipo,
            ])
            ->groupBy('tipo_id')
            ->map(function ($items, $tipo_id) {
                return [
                    'tipo_id' => $tipo_id,
                    'nombre_tipo' => $items->first()['nombre_tipo'],
                    'tipo_reserva' => $items->first()['tipo_reserva'],
                    'total_solicitado' => $items->sum('cantidad'),
                ];
            })
            ->values();
        $habitacionesAsignadas = $reserva->checkins
        // Agrupamos la colección de checkins directamente por la habitación asignada
            ->groupBy('habitacion_evento_id') 
            ->map(function ($checkinsPorHabitacion, $habitacion_evento_id) {
                
                $firstCheckin = $checkinsPorHabitacion->first();
                $habitacionEvento = $firstCheckin->habitacionEvento;

                return [
                    'habitacion_evento_id' => $habitacion_evento_id,
                    'codigo' => $habitacionEvento->codigo,
                    'tipo_nombre' => $habitacionEvento->tipoHabitacion->nombre,
                    'estado_actual' => $habitacionEvento->estado,
                    
                    // LISTA DE HUESPEDES ASIGNADOS A ESTA HABITACIÓN
                    'huespedes_asignados' => $checkinsPorHabitacion->map(fn($checkin) => [
                        'checkin_id' => $checkin->id,
                        'cliente_id' => $checkin->cliente_id,
                        'nombre' => $checkin->cliente->usuario->name,
                        'email' => $checkin->cliente->usuario->email,
                    ])->toArray(),
                    
                    'num_huespedes_activos' => $checkinsPorHabitacion->count(),
                ];
            })
            ->values();

        // 5. Retornar a la vista de creación
        return Inertia::render('Checkin/CreateCheckin', [
            'reserva' => [
                'id' => $reserva->id,
                'tipo_reserva' => $reserva->tipo_reserva,
                'fecha_reserva' => $reserva->fecha_reserva,
                'tipo_viaje' => $reserva->tipo_viaje,
            ],
            'clientesIniciales' => $clientesReserva,
            'clientesDisponibles' => $clientesDisponibles, // Nueva lista paginada
            'habitacionesDisponibles' => $habitacionesDisponibles,
            'recepcionistas' => $recepcionistas,
            'habitacionesSolicitadas' => $habitacionesSolicitadas,
            'habitacionesAsignadas' => $habitacionesAsignadas,
            'clienteQueRealizoLaReserva' => $clienteQueRealizoLaReserva,
        ]);
    }

    public function updateHabitacionEstado(Request $request)
    {
        // Validar el formato del array de cambios
        $validated = $request->validate([
            'estados' => 'required|array',
            'estados.*' => 'required|in:activo,ocupado,limpieza,mantenimiento,inactivo',
            'estados.*' => 'required|exists:habitacion_eventos,id', // Se valida que la clave sea un ID existente
        ]);

        // Usar transacción para el cambio masivo
        DB::beginTransaction();
        
        try {
            foreach ($validated['estados'] as $habitacionId => $nuevoEstado) {
                HabitacionEvento::where('id', $habitacionId)
                    ->update(['estado' => $nuevoEstado]);
            }
            
            DB::commit();

            // Redirigir de vuelta o retornar una respuesta de éxito
            return back()->with('success', 'Estados de habitaciones actualizados correctamente.');

        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['general' => 'Error al actualizar los estados: ' . $e->getMessage()]);
        }
    }

    public function searchClientes(Request $request)
    {
        $search = $request->input('search');

        $clientes = Cliente::query()
            ->with('usuario')
            ->when($search, function ($query, $search) {
                $query->whereHas('usuario', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('telefono', 'like', "%{$search}%");
                });
            })
            ->limit(10) // Limita para no sobrecargar el resultado dinámico
            ->get()
            ->map(fn($cliente) => [
                'id' => $cliente->id,
                'nombre' => $cliente->usuario->name,
                'email' => $cliente->usuario->email,
                'telefono' => $cliente->usuario->telefono,
            ]);

        // Devolvemos la data directamente como JSON
        return response()->json(['data' => $clientes]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public final function store(Reserva $reserva, Request $request)
    {
        // El ID de la reserva viene de la inyección de modelo en la URL
        $reservaId = $reserva->id;
        // dd($request->all());
        // 1. Validación de los datos
        $validated = $request->validate([
                
                'reserva_id' => ['nullable', Rule::in([$reservaId])],
                
                'recepcionista_id' => 'required|exists:recepcionistas,id',
                
                'checkins' => 'required|array|min:1',
                
                
                'checkins.*.cliente_id' => 'required|exists:clientes,id', 
                
                'checkins.*.habitacion_evento_id' => [
                    'required',
                    'exists:habitacion_eventos,id',
                    
                    // ⚠️ ALERTA: Si la dejas desactivada, se asignarán habitaciones OCUPADAS.
                    // Rule::exists('habitacion_eventos', 'id')->where(function ($query) {
                    //     return $query->where('estado', 'activo');
                    // }),
                ],
                
                
                'checkins.*.fecha_entrada' => 'required|date',
                'checkins.*.fecha_salida' => 'nullable|date|after_or_equal:checkins.*.fecha_entrada',
            ], [
                'checkins.required' => 'Debe haber al menos un huésped para registrar el check-in.',
                'checkins.*.habitacion_evento_id.exists' => 'Una o más habitaciones seleccionadas no existen.',
                'checkins.*.cliente_id.required' => 'Falta el ID del cliente para uno o más huéspedes.', // Nuevo mensaje de diagnóstico
            ]);
                    

        // 2. Ejecutar la creación y actualización dentro de una Transacción
        try {
            DB::beginTransaction();
            

            $checkinIds = [];

            foreach ($validated['checkins'] as $data) {
                // Crear el Check-in, usando el $reservaId de la URL inyectada
                $checkin = Checkin::create([
                    'reserva_id' => $reservaId, // Usamos el ID de la reserva inyectada
                    'recepcionista_id' => $validated['recepcionista_id'],
                    'cliente_id' => $data['cliente_id'],
                    'habitacion_evento_id' => $data['habitacion_evento_id'],
                    'fecha_entrada' => $data['fecha_entrada'],
                    'fecha_salida' => $data['fecha_salida'] ?? null,
                ]);
                $checkinIds[] = $checkin->id;

                // 3. Actualizar el estado de la Habitación
                // Si no tiene fecha de salida, la habitación pasa a 'ocupado'
                // if (!$checkin->fecha_salida) {
                //     HabitacionEvento::where('id', $data['habitacion_evento_id'])
                //         ->update(['estado' => 'ocupado']);
                // }
            }
            
            // 4. Actualizar el estado de la Reserva principal
            $reserva->update(['estado' => 'confirmada']);

            DB::commit();

            // 5. Redirección
            // if (count($checkinIds) === 1) {
            //      return redirect()->route('recepcion.checkins.show', $checkinIds[0])
            //         ->with('success', 'Check-in registrado correctamente.');
            // } else {
            //      return redirect()->route('recepcion.checkins.index')
            //         ->with('success', count($checkinIds) . ' Check-ins registrados correctamente.');
            // }
            return redirect()->back()
                ->with('success', 'Check-in registrado correctamente.');

        } catch (Exception $e) {
            // dd($e->getMessage());
            DB::rollBack();
            // Manejo de errores (muestra el error general a Inertia)
            return back()->withErrors(['general' => 'Error al registrar los check-ins. Detalle: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Checkin $checkin)
    {
        $checkin->load([
            'cliente.usuario',
            'recepcionista.usuario',
            'habitacionEvento.tipoHabitacion',
            'reserva',
            'cuenta'
        ]);

        return Inertia::render('Checkin/Show', [
            'checkin' => [
                'id' => $checkin->id,
                'cliente' => [
                    'id' => $checkin->cliente->id,
                    'user' => [
                        'id' => $checkin->cliente->usuario->id,
                        'name' => $checkin->cliente->usuario->name,
                        'email' => $checkin->cliente->usuario->email,
                        'telefono' => $checkin->cliente->usuario->telefono,
                    ],
                ],
                'recepcionista' => [
                    'id' => $checkin->recepcionista->id,
                    'user' => [
                        'id' => $checkin->recepcionista->usuario->id,
                        'name' => $checkin->recepcionista->usuario->name,
                        'email' => $checkin->recepcionista->usuario->email,
                    ],
                ],
                'habitacion_evento' => [
                    'id' => $checkin->habitacionEvento->id,
                    'nombre' => $checkin->habitacionEvento->nombre,
                    'codigo' => $checkin->habitacionEvento->codigo,
                    'estado' => $checkin->habitacionEvento->estado,
                    'tipo_habitacion' => [
                        'id' => $checkin->habitacionEvento->tipoHabitacion->id,
                        'nombre' => $checkin->habitacionEvento->tipoHabitacion->nombre,
                        'tipo' => $checkin->habitacionEvento->tipoHabitacion->tipo,
                        'precio' => $checkin->habitacionEvento->tipoHabitacion->precio,
                    ],
                ],
                'reserva' => $checkin->reserva ? [
                    'id' => $checkin->reserva->id,
                    'fecha_reserva' => $checkin->reserva->fecha_reserva,
                    'tipo_reserva' => $checkin->reserva->tipo_reserva,
                    'estado' => $checkin->reserva->estado,
                ] : null,
                'cuenta' => $checkin->cuenta ? [
                    'id' => $checkin->cuenta->id,
                    'monto_total' => $checkin->cuenta->monto_total,
                    'monto_pagado' => $checkin->cuenta->monto_pagado,
                    'saldo' => $checkin->cuenta->saldo,
                    'estado' => $checkin->cuenta->estado,
                ] : null,
                'fecha_entrada' => $checkin->fecha_entrada,
                'fecha_salida' => $checkin->fecha_salida,
                'created_at' => $checkin->created_at->toISOString(),
                'updated_at' => $checkin->updated_at->toISOString(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Checkin $checkin)
    {
        $checkin->load(['cliente.usuario', 'recepcionista.usuario', 'habitacionEvento.tipoHabitacion']);

        // Obtener recepcionistas disponibles
        $recepcionistas = Recepcionista::with('usuario')
            ->whereHas('usuario')
            ->get()
            ->map(fn($recep) => [
                'id' => $recep->id,
                'nombre' => $recep->usuario->name,
                'email' => $recep->usuario->email,
            ]);

        // Obtener habitaciones/eventos disponibles (activos o el actual asignado)
        $habitacionesEventos = HabitacionEvento::with('tipoHabitacion')
            ->where(function ($query) use ($checkin) {
                $query->where('estado', 'activo')
                      ->orWhere('id', $checkin->habitacion_evento_id);
            })
            ->get()
            ->map(fn($hab) => [
                'id' => $hab->id,
                'codigo' => $hab->codigo,
                'nombre' => $hab->nombre,
                'tipo' => $hab->tipoHabitacion->tipo,
            ]);

        return Inertia::render('Checkin/Edit', [
            'checkin' => [
                'id' => $checkin->id,
                'cliente' => [
                    'id' => $checkin->cliente->id,
                    'user' => [
                        'id' => $checkin->cliente->usuario->id,
                        'name' => $checkin->cliente->usuario->name,
                        'email' => $checkin->cliente->usuario->email,
                    ],
                ],
                'recepcionista_id' => $checkin->recepcionista_id,
                'habitacion_evento_id' => $checkin->habitacion_evento_id,
                'fecha_entrada' => $checkin->fecha_entrada,
                'fecha_salida' => $checkin->fecha_salida,
            ],
            'recepcionistas' => $recepcionistas,
            'habitacionesEventos' => $habitacionesEventos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Checkin $checkin)
    {
        $validated = $request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'nullable|date|after_or_equal:fecha_entrada',
            'recepcionista_id' => 'required|exists:recepcionistas,id',
            'habitacion_evento_id' => 'required|exists:habitacion_eventos,id',
        ], [
            'fecha_entrada.required' => 'La fecha de entrada es obligatoria.',
            'fecha_entrada.date' => 'La fecha de entrada debe ser una fecha válida.',
            'fecha_salida.date' => 'La fecha de salida debe ser una fecha válida.',
            'fecha_salida.after_or_equal' => 'La fecha de salida debe ser igual o posterior a la fecha de entrada.',
            'recepcionista_id.required' => 'El recepcionista es obligatorio.',
            'recepcionista_id.exists' => 'El recepcionista seleccionado no existe.',
            'habitacion_evento_id.required' => 'La habitación o evento es obligatorio.',
            'habitacion_evento_id.exists' => 'La habitación o evento seleccionado no existe.',
        ]);

        // Si cambia la habitación, actualizar estados
        if ($checkin->habitacion_evento_id != $validated['habitacion_evento_id']) {
            // Liberar la habitación anterior (si no tiene fecha de salida)
            if (!$checkin->fecha_salida) {
                HabitacionEvento::where('id', $checkin->habitacion_evento_id)
                    ->update(['estado' => 'activo']);
            }
            
            // Ocupar la nueva habitación (si no tiene fecha de salida)
            if (!$validated['fecha_salida']) {
                HabitacionEvento::where('id', $validated['habitacion_evento_id'])
                    ->update(['estado' => 'ocupado']);
            }
        }

        // Si se asigna fecha de salida, liberar habitación
        if ($validated['fecha_salida'] && !$checkin->fecha_salida) {
            HabitacionEvento::where('id', $validated['habitacion_evento_id'])
                ->update(['estado' => 'activo']);
        }

        // Si se quita la fecha de salida, ocupar habitación
        if (!$validated['fecha_salida'] && $checkin->fecha_salida) {
            HabitacionEvento::where('id', $validated['habitacion_evento_id'])
                ->update(['estado' => 'ocupado']);
        }

        $checkin->update($validated);

        return redirect()->route('recepcion.checkins.show', $checkin->id)
            ->with('success', 'Check-in actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Checkin $checkin)
    {
        //
    }
}
