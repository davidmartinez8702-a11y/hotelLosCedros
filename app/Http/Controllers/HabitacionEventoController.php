<?php

namespace App\Http\Controllers;

use App\Models\HabitacionEvento;
use App\Models\TipoHabitacion;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;  // ✅ AGREGAR ESTE IMPORT
use Carbon\Carbon;  // ✅ AGREGAR TAMBIÉN CARBON

class HabitacionEventoController extends Controller
{
    /**
     * Lista de habitaciones con filtros
     */
    public function index(Request $request)
    {
        $query = HabitacionEvento::with('tipoHabitacion');

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por tipo (habitacion/evento)
        if ($request->filled('tipo')) {
            $query->whereHas('tipoHabitacion', function($q) use ($request) {
                $q->where('tipo', $request->tipo);
            });
        }

        // Filtro por piso
        if ($request->filled('piso')) {
            $query->where('piso', $request->piso);
        }

        // Filtro por tipo de habitación específico
        if ($request->filled('tipo_habitacion_id')) {
            $query->where('tipo_habitacion_id', $request->tipo_habitacion_id);
        }

        // Búsqueda
        if ($request->filled('search')) {
            $query->buscar($request->search);
        }

        $habitaciones = $query->latest()->paginate(15);

        // Obtener pisos únicos para filtro
        $pisos = HabitacionEvento::whereNotNull('piso')
                                  ->distinct()
                                  ->orderBy('piso')
                                  ->pluck('piso');

        // Tipos de habitación para filtro
        $tiposHabitacion = TipoHabitacion::orderBy('nombre')->get(['id', 'nombre', 'tipo']);

        // Estadísticas
        $estadisticas = [
            'total' => HabitacionEvento::count(),
            'disponibles' => HabitacionEvento::disponibles()->count(),
            'ocupadas' => HabitacionEvento::ocupadas()->count(),
            'limpieza' => HabitacionEvento::enLimpieza()->count(),
            'mantenimiento' => HabitacionEvento::enMantenimiento()->count(),
        ];

        return inertia('Habitacion/HabitacionPage', [
            'habitaciones' => $habitaciones,
            'pisos' => $pisos,
            'tiposHabitacion' => $tiposHabitacion,
            'estadisticas' => $estadisticas,
            'filters' => $request->only(['search', 'estado', 'tipo', 'piso', 'tipo_habitacion_id']),
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create()
    {
        $tiposHabitacion = TipoHabitacion::where('estado', 'activo')
                                         ->orderBy('tipo')
                                         ->orderBy('nombre')
                                         ->get(['id', 'nombre', 'tipo', 'capacidad_total']);

        return inertia('Habitacion/HabitacionCreate', [
            'tiposHabitacion' => $tiposHabitacion,
        ]);
    }

    /**
     * Crear habitación
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
            'codigo' => 'required|string|max:50|unique:habitacion_eventos,codigo',
            'piso' => 'nullable|string|max:10',
            'ala_seccion' => 'nullable|string|max:50',
            'vista' => 'nullable|string|max:100',
            'notas_internas' => 'nullable|string',
        ]);

        // Heredar nombre del tipo de habitación
        $tipoHabitacion = TipoHabitacion::findOrFail($validated['tipo_habitacion_id']);
        $validated['nombre'] = $tipoHabitacion->nombre;
        $validated['estado'] = 'disponible';

        $habitacion = HabitacionEvento::create($validated);

        return redirect()
            ->route('habitaciones.show', $habitacion)
            ->with('success', 'Habitación creada exitosamente.');
    }

    /**
     * Ver detalle de habitación
     */
    public function show(HabitacionEvento $habitacione)
    {
        $hoy = Carbon::now();

        // Cargar checkins normales
        $habitacione->load([
            'tipoHabitacion',
            'checkins' => function($query) {
                $query->with('cliente')
                      ->orderBy('created_at', 'desc')
                      ->take(10);
            },
        ]);

        // ✅ Obtener checkins activos directamente con query
        $checkinsActivos = $habitacione->checkins()
            ->with('cliente')
            ->whereDate('fecha_entrada', '<=', $hoy)
            ->whereDate('fecha_salida', '>=', $hoy)
            ->get();

        $ocupantes_actuales = $checkinsActivos->count();
        $capacidad_total = $habitacione->tipoHabitacion->capacidad_total ?? 0;

        return inertia('Habitacion/HabitacionShow', [
            'habitacion' => [
                'id' => $habitacione->id,
                'codigo' => $habitacione->codigo,
                'nombre' => $habitacione->nombre,
                'estado' => $habitacione->estado,
                'piso' => $habitacione->piso,
                'ala_seccion' => $habitacione->ala_seccion,
                'vista' => $habitacione->vista,
                'notas_internas' => $habitacione->notas_internas,
                'requiere_mantenimiento' => (bool) $habitacione->requiere_mantenimiento,
                'ultima_limpieza' => $habitacione->ultima_limpieza,
                'tipo_habitacion' => [
                    'id' => $habitacione->tipoHabitacion->id,
                    'nombre' => $habitacione->tipoHabitacion->nombre,
                    'tipo' => $habitacione->tipoHabitacion->tipo,
                    'capacidad_total' => $habitacione->tipoHabitacion->capacidad_total,
                    'precio' => $habitacione->tipoHabitacion->precio,
                ],
                'checkins_activos' => $checkinsActivos->map(function($checkin) {
                    return [
                        'id' => $checkin->id,
                        'fecha_entrada' => $checkin->fecha_entrada,
                        'fecha_salida' => $checkin->fecha_salida,
                        'created_at' => $checkin->created_at->format('Y-m-d H:i:s'),
                        'cliente' => [
                            'id' => $checkin->cliente->id,
                            'nombre' => $checkin->cliente->nombre,
                            'apellido' => $checkin->cliente->apellido,
                            'email' => $checkin->cliente->email,
                        ],
                    ];
                }),
                'checkins' => $habitacione->checkins->map(function($checkin) {
                    return [
                        'id' => $checkin->id,
                        'fecha_entrada' => $checkin->fecha_entrada,
                        'fecha_salida' => $checkin->fecha_salida,
                        'created_at' => $checkin->created_at->format('Y-m-d H:i:s'),
                        'cliente' => [
                            'id' => $checkin->cliente->id,
                            'nombre' => $checkin->cliente->nombre,
                            'apellido' => $checkin->cliente->apellido,
                            'email' => $checkin->cliente->email,
                        ],
                    ];
                }),
            ],
            'ocupantes_actuales' => $ocupantes_actuales,
            'capacidad_total' => $capacidad_total,
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(HabitacionEvento $habitacione)
    {
        $tiposHabitacion = TipoHabitacion::where('estado', 'activo')
                                         ->orderBy('nombre')
                                         ->get(['id', 'nombre', 'tipo']);

        return inertia('Habitacion/HabitacionEdit', [
            'habitacion' => $habitacione->load('tipoHabitacion'),
            'tiposHabitacion' => $tiposHabitacion,
        ]);
    }

    /**
     * Actualizar habitación
     */
    public function update(Request $request, HabitacionEvento $habitacione)
    {
        $validated = $request->validate([
            'tipo_habitacion_id' => 'required|exists:tipo_habitacions,id',
            'codigo' => [
                'required',
                'string',
                'max:50',
                Rule::unique('habitacion_eventos', 'codigo')->ignore($habitacione->id)
            ],
            'piso' => 'nullable|string|max:10',
            'ala_seccion' => 'nullable|string|max:50',
            'vista' => 'nullable|string|max:100',
            'notas_internas' => 'nullable|string',
            'estado' => 'required|in:disponible,ocupada,limpieza,mantenimiento,bloqueada,fuera_de_servicio',
        ]);

        // Si cambió el tipo, actualizar el nombre
        if ($validated['tipo_habitacion_id'] != $habitacione->tipo_habitacion_id) {
            $tipoHabitacion = TipoHabitacion::findOrFail($validated['tipo_habitacion_id']);
            $validated['nombre'] = $tipoHabitacion->nombre;
        }

        $habitacione->update($validated);

        return redirect()
            ->route('habitaciones.show', $habitacione)
            ->with('success', 'Habitación actualizada exitosamente.');
    }

    /**
     * Eliminar habitación (soft delete)
     */
    public function destroy(HabitacionEvento $habitacione)
    {
        // Verificar que no tenga check-ins activos
        if ($habitacione->checkinsActivos()->exists()) {
            return back()->with('error', 'No se puede eliminar una habitación con huéspedes activos.');
        }

        $habitacione->delete();

        return redirect()
            ->route('habitaciones.index')
            ->with('success', 'Habitación eliminada exitosamente.');
    }

    /**
     * Cambiar estado rápidamente
     */
    public function cambiarEstado(Request $request, HabitacionEvento $habitacione)
    {
        $validated = $request->validate([
            'estado' => 'required|in:disponible,ocupada,limpieza,mantenimiento,bloqueada,fuera_de_servicio',
        ]);

        $habitacione->cambiarEstado($validated['estado']);

        return back()->with('success', 'Estado actualizado correctamente.');
    }

    /**
     * Dashboard de habitaciones
     */
    public function dashboard()
    {
        $estadisticas = [
            'total' => HabitacionEvento::count(),
            'disponibles' => HabitacionEvento::disponibles()->count(),
            'ocupadas' => HabitacionEvento::ocupadas()->count(),
            'limpieza' => HabitacionEvento::enLimpieza()->count(),
            'mantenimiento' => HabitacionEvento::enMantenimiento()->count(),
        ];

        $habitacionesLimpieza = HabitacionEvento::enLimpieza()
                                                ->orderBy('orden_limpieza')
                                                ->with('tipoHabitacion')
                                                ->get();

        $habitacionesMantenimiento = HabitacionEvento::where('requiere_mantenimiento', true)
                                                     ->with('tipoHabitacion')
                                                     ->get();

        return inertia('Habitacion/Dashboard', [
            'estadisticas' => $estadisticas,
            'habitacionesLimpieza' => $habitacionesLimpieza,
            'habitacionesMantenimiento' => $habitacionesMantenimiento,
        ]);
    }
}
