<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
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
        $reserva->load(['cliente.usuario', 'promo']);

        return Inertia::render('Reservas/Recepcion/ShowRecepcion', [
            'reserva' => [
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
            ],
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
}
