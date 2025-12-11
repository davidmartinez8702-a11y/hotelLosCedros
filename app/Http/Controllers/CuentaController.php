<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Models\Checkin;
use App\Models\Transaccion;
use App\Models\Servicio;
use App\Models\Platillo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cuentas = Cuenta::with([
            'checkin.cliente.usuario',
            'checkin.habitacionEvento.tipoHabitacion',
        ])
        ->latest()
        ->paginate(10)
        ->through(fn($cuenta) => [
            'id' => $cuenta->id,
            'monto_total' => $cuenta->monto_total,
            'monto_pagado' => $cuenta->monto_pagado,
            'saldo' => $cuenta->saldo,
            'estado' => $cuenta->estado,
            'checkin' => [
                'id' => $cuenta->checkin->id,
                'cliente' => [
                    'nombre' => $cuenta->checkin->cliente->usuario->name,
                    'email' => $cuenta->checkin->cliente->usuario->email,
                ],
                'habitacion_evento' => [
                    'codigo' => $cuenta->checkin->habitacionEvento->codigo,
                    'nombre' => $cuenta->checkin->habitacionEvento->nombre,
                ],
            ],
            'created_at' => $cuenta->created_at->toISOString(),
        ]);

        // return Inertia::render('Cuenta/Index', [
        //     'cuentas' => $cuentas,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Checkin $checkin)
    {
        
        //$checkinId = $request->query('checkin');
        
        // if (!$checkinId) {
        //     return redirect()->route('recepcion.checkins.index')
        //         ->with('error', 'Se requiere un check-in para crear una cuenta.');
        // }

        // $checkin = Checkin::with([
        //     'cliente.usuario',
        //     'habitacionEvento.tipoHabitacion',
        //     'cuenta'
        // ])->findOrFail($checkinId);
        $checkin->load([
            'cliente.usuario',
            'habitacionEvento.tipoHabitacion',
            'cuenta'
        ]);

        // Verificar si ya tiene cuenta
        if ($checkin->cuenta) {
            return redirect()->route('recepcion.checkins.show', $checkin->cuenta->id)
                ->with('info', 'Este check-in ya tiene una cuenta asociada.');
        }

        return Inertia::render('Cuenta/Create', [
            'checkin' => [
                'id' => $checkin->id,
                'cliente' => [
                    'id' => $checkin->cliente->id,
                    'nombre' => $checkin->cliente->usuario->name,
                    'email' => $checkin->cliente->usuario->email,
                ],
                'habitacion_evento' => [
                    'id' => $checkin->habitacionEvento->id,
                    'codigo' => $checkin->habitacionEvento->codigo,
                    'nombre' => $checkin->habitacionEvento->nombre,
                    'precio' => $checkin->habitacionEvento->tipoHabitacion->precio,
                ],
                'fecha_entrada' => $checkin->fecha_entrada,
                'fecha_salida' => $checkin->fecha_salida,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'checkin_id' => 'required|exists:checkins,id|unique:cuentas,checkin_id',
        ], [
            'checkin_id.required' => 'El check-in es obligatorio.',
            'checkin_id.exists' => 'El check-in no existe.',
            'checkin_id.unique' => 'Este check-in ya tiene una cuenta asociada.',
        ]);

        $cuenta = Cuenta::create([
            'checkin_id' => $validated['checkin_id'],
            'monto_total' => 0,
            'monto_pagado' => 0,
            'saldo' => 0,
            'estado' => 'pendiente',
        ]);

        return redirect()->route('recepcion.checkins.show', $cuenta->id)
            ->with('success', 'Cuenta creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cuenta $cuenta)
    {
        $cuenta->load([
            'checkin.cliente.usuario',
            'checkin.habitacionEvento.tipoHabitacion',
            'checkin.recepcionista.usuario',
            'checkin.reserva',
            'transaccions.servicio',
            'transaccions.platillo',
            'factura.tipoPago',
        ]);

        // Obtener servicios disponibles
        $servicios = Servicio::where('estado', 'activo')
            ->get()
            ->map(fn($servicio) => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'descripcion' => $servicio->descripcion,
                'precio' => $servicio->precio,
            ]);

        // Obtener platillos disponibles
        $platillos = Platillo::where('estado', 'disponible')
            ->get()
            ->map(fn($platillo) => [
                'id' => $platillo->id,
                'nombre' => $platillo->nombre,
                'descripcion' => $platillo->descripcion,
                'precio' => $platillo->precio,
            ]);

        return Inertia::render('Cuenta/Show', [
            'cuenta' => [
                'id' => $cuenta->id,
                'monto_total' => $cuenta->monto_total,
                'monto_pagado' => $cuenta->monto_pagado,
                'saldo' => $cuenta->saldo,
                'estado' => $cuenta->estado,
                'fecha_pago' => $cuenta->fecha_pago,
                'created_at' => $cuenta->created_at->toISOString(),
                'updated_at' => $cuenta->updated_at->toISOString(),
                'checkin' => [
                    'id' => $cuenta->checkin->id,
                    'fecha_entrada' => $cuenta->checkin->fecha_entrada,
                    'fecha_salida' => $cuenta->checkin->fecha_salida,
                    'cliente' => [
                        'id' => $cuenta->checkin->cliente->id,
                        'nombre' => $cuenta->checkin->cliente->usuario->name,
                        'email' => $cuenta->checkin->cliente->usuario->email,
                        'telefono' => $cuenta->checkin->cliente->usuario->telefono,
                    ],
                    'habitacion_evento' => [
                        'id' => $cuenta->checkin->habitacionEvento->id,
                        'codigo' => $cuenta->checkin->habitacionEvento->codigo,
                        'nombre' => $cuenta->checkin->habitacionEvento->nombre,
                        'tipo' => $cuenta->checkin->habitacionEvento->tipoHabitacion->tipo,
                        'tipo_nombre' => $cuenta->checkin->habitacionEvento->tipoHabitacion->nombre,
                        'precio' => $cuenta->checkin->habitacionEvento->tipoHabitacion->precio,
                    ],
                    'recepcionista' => [
                        'id' => $cuenta->checkin->recepcionista->id,
                        'nombre' => $cuenta->checkin->recepcionista->usuario->name,
                    ],
                    'reserva' => $cuenta->checkin->reserva ? [
                        'id' => $cuenta->checkin->reserva->id,
                        'estado' => $cuenta->checkin->reserva->estado,
                    ] : null,
                ],
                'transacciones' => $cuenta->transaccions->map(fn($t) => [
                    'id' => $t->id,
                    'tipo' => $t->servicio_id ? 'servicio' : 'platillo',
                    'servicio' => $t->servicio ? [
                        'id' => $t->servicio->id,
                        'nombre' => $t->servicio->nombre,
                        'precio' => $t->servicio->precio,
                    ] : null,
                    'platillo' => $t->platillo ? [
                        'id' => $t->platillo->id,
                        'nombre' => $t->platillo->nombre,
                        'precio' => $t->platillo->precio,
                    ] : null,
                    'cantidad' => $t->cantidad,
                    'subtotal' => $t->cantidad * ($t->servicio?->precio ?? $t->platillo?->precio ?? 0),
                    'estado' => $t->estado,
                    'created_at' => $t->created_at->toISOString(),
                ]),
                'factura' => $cuenta->factura ? [
                    'id' => $cuenta->factura->id,
                    'monto_total' => $cuenta->factura->monto_total,
                    'estado' => $cuenta->factura->estado,
                    'tipo_pago' => $cuenta->factura->tipoPago ? [
                        'id' => $cuenta->factura->tipoPago->id,
                        'nombre' => $cuenta->factura->tipoPago->nombre,
                    ] : null,
                ] : null,
            ],
            'servicios' => $servicios,
            'platillos' => $platillos,
        ]);
    }

    /**
     * Agregar transacciones a la cuenta
     */
    public function agregarTransacciones(Request $request, Cuenta $cuenta)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.tipo' => 'required|in:servicio,platillo',
            'items.*.id' => 'required|integer',
            'items.*.cantidad' => 'required|integer|min:1',
        ], [
            'items.required' => 'Debe agregar al menos un item.',
            'items.min' => 'Debe agregar al menos un item.',
            'items.*.tipo.required' => 'El tipo es obligatorio.',
            'items.*.tipo.in' => 'El tipo debe ser servicio o platillo.',
            'items.*.id.required' => 'El ID del item es obligatorio.',
            'items.*.cantidad.required' => 'La cantidad es obligatoria.',
            'items.*.cantidad.min' => 'La cantidad debe ser al menos 1.',
        ]);

        DB::transaction(function () use ($validated, $cuenta) {
            $montoAdicional = 0;

            foreach ($validated['items'] as $item) {
                $transaccionData = [
                    'cuenta_id' => $cuenta->id,
                    'cantidad' => $item['cantidad'],
                    //'estado' => 'pendiente',
                    'estado' => 'confirmada', //esta mal pero para rapidez
                ];

                if ($item['tipo'] === 'servicio') {
                    $servicio = Servicio::findOrFail($item['id']);
                    $transaccionData['servicio_id'] = $servicio->id;
                    $transaccionData['platillo_id'] = null;
                    $montoAdicional += $servicio->precio * $item['cantidad'];
                } else {
                    $platillo = Platillo::findOrFail($item['id']);
                    $transaccionData['platillo_id'] = $platillo->id;
                    $transaccionData['servicio_id'] = null;
                    $montoAdicional += $platillo->precio * $item['cantidad'];
                }

                Transaccion::create($transaccionData);
            }

            // Actualizar montos de la cuenta
            $cuenta->monto_total += $montoAdicional;
            $cuenta->saldo = $cuenta->monto_total - $cuenta->monto_pagado;
            $cuenta->save();
        });

        return redirect()->back()->with('success', 'Transacciones agregadas correctamente.');    
    }

    public function eliminarTransaccion(Cuenta $cuenta, Transaccion $transaccion)
    {
        // Verificar que la transacción pertenece a la cuenta
        if ($transaccion->cuenta_id !== $cuenta->id) {
            return redirect()->back()
                ->with('error', 'La transacción no pertenece a esta cuenta.');
        }

        // Solo permitir eliminar si la cuenta no está pagada
        if ($cuenta->estado === 'pagado') {
            return redirect()->back()
                ->with('error', 'No se pueden eliminar transacciones de una cuenta pagada.');
        }

        // Calcular el monto a restar
        $precio = $transaccion->servicio?->precio ?? $transaccion->platillo?->precio ?? 0;
        $montoRestar = $precio * $transaccion->cantidad;

        DB::transaction(function () use ($cuenta, $transaccion, $montoRestar) {
            $transaccion->delete();

            // Actualizar montos de la cuenta
            $cuenta->monto_total -= $montoRestar;
            $cuenta->saldo = $cuenta->monto_total - $cuenta->monto_pagado;
            $cuenta->save();
        });

        return redirect()->back()
            ->with('success', 'Transacción eliminada correctamente.');
    }


    public function cancelarTransaccion(Cuenta $cuenta, Transaccion $transaccion)
    {
        // 1. Verificar la integridad de la relación
        if ($transaccion->cuenta_id !== $cuenta->id) {
            return redirect()->back()
                ->with('error', 'La transacción no pertenece a esta cuenta.');
        }

        // 2. Verificar el estado de la Transacción (solo cancelar si está activa)
        if ($transaccion->estado === 'cancelada') {
            return redirect()->back()
                ->with('info', 'Esta transacción ya ha sido cancelada.');
        }
        
        // 3. Verificar el estado de la Cuenta (solo permitir cancelación si la cuenta NO está pagada)
        if ($cuenta->estado === 'pagada') {
            // Esto es crucial para mantener la integridad de la factura o el cierre contable.
            return redirect()->back()
                ->with('error', 'No se pueden cancelar transacciones de una cuenta ya pagada o cerrada.');
        }

        // 4. Calcular el monto a restar (usando el subtotal, que ya fue calculado al registrarla)
        $montoRestar = $transaccion->subtotal; // Usamos el subtotal ya registrado en la BD.

        DB::transaction(function () use ($cuenta, $transaccion, $montoRestar) {
            
            // 4.1. CAMBIO CLAVE: Actualizar el estado de la transacción a 'cancelada'
            $transaccion->estado = 'cancelada';
            $transaccion->save();

            // 4.2. Actualizar montos de la cuenta
            $cuenta->monto_total -= $montoRestar;
            
            // Recalcular el saldo. Asumimos que el saldo es siempre (total - pagado)
            $cuenta->saldo = $cuenta->monto_total - $cuenta->monto_pagado;
            
            // Opcional: Si el monto total es cero después de la cancelación, puedes cambiar el estado de la cuenta.
            
            $cuenta->save();
        });

        return redirect()->back()
            ->with('success', 'Transacción cancelada correctamente. El monto se ha ajustado del total.');
    }



    

}
    
