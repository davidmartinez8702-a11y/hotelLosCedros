<?php

namespace App\Http\Controllers;

use App\Models\Checkin;
use App\Models\Cliente;
use App\Models\HabitacionEvento;
use App\Models\Recepcionista;
use Illuminate\Http\Request;
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
