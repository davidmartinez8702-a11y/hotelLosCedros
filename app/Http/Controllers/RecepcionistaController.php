<?php

namespace App\Http\Controllers;

use App\Models\Checkin;
use App\Models\HabitacionEvento;
use App\Models\Recepcionista;
use App\Models\Reserva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecepcionistaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function dashboardRecepcionista()
    {
        $hoy = Carbon::today();

        // --- 1. ESTADÍSTICAS RÁPIDAS (KPIs) ---
        $totalHabitaciones = HabitacionEvento::count();
        $habitacionesOcupadas = HabitacionEvento::where('estado', 'ocupado')->count();
        
        $llegadasHoyCount = Reserva::whereDate('fecha_reserva', $hoy)
            ->where('estado', 'pendiente')
            ->count();

        // Cálculo de salidas para hoy (PostgreSQL)
        $salidasHoyCount = Checkin::whereNull('fecha_salida')
            ->whereHas('reserva', function($q) use ($hoy) {
                $q->whereRaw("(fecha_reserva + dias_estadia) = ?", [$hoy->toDateString()]);
            })->count();

        // --- 2. DATOS PARA GRÁFICOS (BI Operativo) ---
        
        // Gráfico Circular: Estado Físico Actual
        $chartHabitaciones = [
            ['name' => 'Disponibles', 'value' => HabitacionEvento::where('estado', 'activo')->count(), 'fill' => '#10b981'],
            ['name' => 'Ocupadas', 'value' => $habitacionesOcupadas, 'fill' => '#ef4444'],
            ['name' => 'Mantenimiento', 'value' => HabitacionEvento::where('estado', 'mantenimiento')->count(), 'fill' => '#f59e0b'],
        ];

        // Gráfico de Área: Proyección de Actividad (7 días)
        $chartActividad = [];
        for ($i = 0; $i < 7; $i++) {
            $fecha = Carbon::today()->addDays($i);
            $chartActividad[] = [
                'fecha' => $fecha->format('d M'),
                'llegadas' => Reserva::whereDate('fecha_reserva', $fecha)->count(),
                'salidas' => Checkin::whereNull('fecha_salida')
                    ->whereHas('reserva', function($q) use ($fecha) {
                        $q->whereRaw("(fecha_reserva + dias_estadia) = ?", [$fecha->toDateString()]);
                    })->count(),
            ];
        }

        // --- 3. LISTAS DE ACCIÓN (Operativa Diaria) ---

        // Huéspedes por llegar hoy
        $llegadasDetalle = Reserva::with(['cliente.usuario'])
            ->whereDate('fecha_reserva', $hoy)
            ->where('estado', 'pendiente')
            ->limit(10)
            ->get();

        // Huéspedes que deben salir hoy (Check-outs pendientes)
        $salidasDetalle = Checkin::with(['cliente.usuario', 'habitacionEvento.tipoHabitacion'])
            ->whereNull('fecha_salida')
            ->get()
            ->filter(function($ci) use ($hoy) {
                // Filtramos en la colección la fecha de salida calculada
                $fechaSalida = Carbon::parse($ci->reserva->fecha_reserva)->addDays($ci->reserva->dias_estadia);
                return $fechaSalida->isToday();
            })->values();

        // --- 4. RESPUESTA A INERTIA ---
        return Inertia::render('Dashboards/DashboardRecepcionista', [
            'stats' => [
                'llegadas_hoy' => $llegadasHoyCount,
                'salidas_hoy' => $salidasHoyCount,
                'total_habitaciones' => $totalHabitaciones,
                'ocupacion_porcentaje' => $totalHabitaciones > 0 ? round(($habitacionesOcupadas / $totalHabitaciones) * 100, 1) : 0,
            ],
            'charts' => [
                'estado_habitaciones' => $chartHabitaciones,
                'actividad_semanal' => $chartActividad,
            ],
            'listas' => [
                'llegadas' => $llegadasDetalle,
                'salidas' => $salidasDetalle,
            ]
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
    public function show(Recepcionista $recepcionista)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recepcionista $recepcionista)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recepcionista $recepcionista)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recepcionista $recepcionista)
    {
        //
    }
}
