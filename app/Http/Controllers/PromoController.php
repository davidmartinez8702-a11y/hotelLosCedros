<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use App\Models\DetallePromo;
use App\Models\Segmento;
use App\Models\TipoHabitacion;
use App\Models\Servicio;
use App\Models\Platillo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class PromoController extends Controller
{
    /**
     * 📋 Listar todas las promociones
     */
    public function index(Request $request)
    {
        $query = Promo::with(['segmento', 'detallePromos.tipoHabitacion', 'detallePromos.servicio', 'detallePromos.platillo'])
            ->orderBy('prioridad', 'desc')
            ->orderBy('created_at', 'desc');

        // Filtros
        if ($request->estado && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        if ($request->tipo_promo) {
            $query->where('tipo_promo', $request->tipo_promo);
        }

        if ($request->segmento_id) {
            $query->where('segmento_id', $request->segmento_id);
        }

        // Solo vigentes
        if ($request->vigentes) {
            $query->activas();
        }

        $promos = $query->paginate(15)->through(fn($promo) => [
            'id' => $promo->id,
            'nombre' => $promo->nombre,
            'descripcion' => $promo->descripcion,
            'tipo_promo' => $promo->tipo_promo,
            'descuento_porcentaje' => $promo->descuento_porcentaje,
            'descuento_monto' => $promo->descuento_monto,
            'precio_total_paquete' => $promo->precio_total_paquete,
            'estado' => $promo->estado,
            'fecha_inicio' => $promo->fecha_inicio->format('Y-m-d'),
            'fecha_fin' => $promo->fecha_fin->format('Y-m-d'),
            'segmento' => $promo->segmento ? [
                'id' => $promo->segmento->id,
                'nombre' => $promo->segmento->nombre,
            ] : null,
            'prioridad' => $promo->prioridad,
            'cantidad_usos_actual' => $promo->cantidad_usos_actual,
            'cantidad_maxima_usos' => $promo->cantidad_maxima_usos,
            'image_url' => $promo->image_url,
        ]);

        return Inertia::render('Promos/PromoPage', [
            'promos' => $promos,
            'filtros' => $request->only(['estado', 'tipo_promo', 'segmento_id', 'vigentes']),
        ]);
    }

    /**
     * 📝 Mostrar formulario de creación
     */
    public function create()
    {
        return Inertia::render('Promos/PromoCreate', [
            'segmentos' => Segmento::all(),
            'tiposHabitacion' => TipoHabitacion::where('estado', 'activo')->get(),
            'servicios' => Servicio::where('estado', 'activo')->get(),
            'platillos' => Platillo::where('estado', 'disponible')->get(),
        ]);
    }

    /**
     * 💾 Guardar nueva promoción
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'codigo_promocional' => 'nullable|string|unique:promos,codigo_promocional',
            'tipo_promo' => 'required|in:descuento_porcentual,descuento_fijo,paquete,precio_especial,upgrade',
            'descuento_porcentaje' => 'nullable|numeric|min:0|max:100',
            'descuento_monto' => 'nullable|numeric|min:0',
            'precio_total_paquete' => 'nullable|numeric|min:0',
            'precio_normal' => 'nullable|numeric|min:0',
            'segmentos_ids' => 'nullable|array', // ✅ Permitir array de IDs
            'segmentos_ids.*' => 'exists:segmentos,id',
            'aplica_todos_segmentos' => 'boolean',
            'aplica_a' => 'required|in:todos,nuevos,registrados',
            'estado' => 'required|in:activa,pausada,finalizada',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'image_url' => 'nullable|url',
            'minimo_noches' => 'required|integer|min:1',
            'minimo_personas' => 'required|integer|min:1',
            'dias_anticipacion_minimo' => 'nullable|integer|min:0',
            'dias_semana' => 'nullable|array',
            'incluye_upgrade' => 'boolean',
            'requiere_pago_completo' => 'boolean',
            'cantidad_maxima_usos' => 'nullable|integer|min:1',
            'usos_por_cliente' => 'required|integer|min:1',
            'prioridad' => 'required|integer|min:1|max:10',
            'detalles' => 'required|array|min:1',
            'detalles.*.tipo_item' => 'required|in:habitacion,servicio,platillo',
            'detalles.*.item_id' => 'required|integer',
            'detalles.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            // ✅ No guardar segmento_id único, usar tabla pivot
            $promoData = $validated;
            unset($promoData['segmentos_ids']);
            unset($promoData['aplica_todos_segmentos']);
            unset($promoData['detalles']);
            
            $promo = Promo::create($promoData);

            // ✅ Asociar segmentos (si no es para todos)
            if (!$request->aplica_todos_segmentos && !empty($request->segmentos_ids)) {
                $promo->segmentos()->sync($request->segmentos_ids);
            }

            // Crear detalles
            foreach ($request->detalles as $detalle) {
                $detalleData = [
                    'promo_id' => $promo->id,
                    'tipo_item' => $detalle['tipo_item'],
                    'cantidad' => $detalle['cantidad'],
                    'noches' => $detalle['noches'] ?? null,
                    'descuento_porcentaje' => $detalle['descuento_porcentaje'] ?? null,
                    'descuento_monto' => $detalle['descuento_monto'] ?? null,
                    'precio_especial' => $detalle['precio_especial'] ?? null,
                    'es_gratis' => $detalle['es_gratis'] ?? false,
                    'detalle' => $detalle['detalle'] ?? null,
                ];

                if ($detalle['tipo_item'] === 'habitacion') {
                    $detalleData['tipo_habitacion_id'] = $detalle['item_id'];
                } elseif ($detalle['tipo_item'] === 'servicio') {
                    $detalleData['servicio_id'] = $detalle['item_id'];
                } else {
                    $detalleData['platillo_id'] = $detalle['item_id'];
                }

                DetallePromo::create($detalleData);
            }

            DB::commit();

            return redirect()->route('promos.index')
                ->with('success', 'Promoción creada exitosamente');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al crear la promoción: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * 👁️ Ver detalle de una promoción
     */
    public function show(Promo $promo)
    {
        // ✅ Solo cargar las relaciones que SIEMPRE existen
        $promo->load([
            'segmento',
            'detallePromos.tipoHabitacion',
            'detallePromos.servicio',
            'detallePromos.platillo',
        ]);

        // ✅ Estadísticas seguras (verificando si la relación existe)
        $stats = [
            'total_usos' => 0,
            'total_ahorro' => 0,
            'clientes_unicos' => 0,
        ];

        // ✅ Solo intentar obtener stats si la tabla promo_reservas existe
        try {
            if (method_exists($promo, 'promoReservas') && \Schema::hasTable('promo_reservas')) {
                $stats = [
                    'total_usos' => $promo->promoReservas()->count(),
                    'total_ahorro' => $promo->promoReservas()->sum('monto_descuento') ?? 0,
                    'clientes_unicos' => $promo->promoReservas()->distinct('cliente_id')->count('cliente_id'),
                ];
            } else {
                // Usar el contador interno del modelo
                $stats['total_usos'] = $promo->cantidad_usos_actual ?? 0;
            }
        } catch (\Exception $e) {
            // Si hay algún error, usar valores por defecto
            $stats['total_usos'] = $promo->cantidad_usos_actual ?? 0;
        }

        return Inertia::render('Promos/PromoShow', [
            'promo' => [
                'id' => $promo->id,
                'nombre' => $promo->nombre,
                'descripcion' => $promo->descripcion,
                'codigo_promocional' => $promo->codigo_promocional,
                'tipo_promo' => $promo->tipo_promo,
                'descuento_porcentaje' => $promo->descuento_porcentaje,
                'descuento_monto' => $promo->descuento_monto,
                'precio_total_paquete' => $promo->precio_total_paquete,
                'precio_normal' => $promo->precio_normal,
                'segmento' => $promo->segmento ? [
                    'id' => $promo->segmento->id,
                    'nombre' => $promo->segmento->nombre,
                ] : null,
                'aplica_a' => $promo->aplica_a,
                'estado' => $promo->estado,
                'fecha_inicio' => $promo->fecha_inicio->format('Y-m-d'),
                'fecha_fin' => $promo->fecha_fin->format('Y-m-d'),
                'image_url' => $promo->image_url,
                'minimo_noches' => $promo->minimo_noches,
                'minimo_personas' => $promo->minimo_personas,
                'dias_anticipacion_minimo' => $promo->dias_anticipacion_minimo,
                'incluye_upgrade' => $promo->incluye_upgrade,
                'requiere_pago_completo' => $promo->requiere_pago_completo,
                'cantidad_maxima_usos' => $promo->cantidad_maxima_usos,
                'usos_por_cliente' => $promo->usos_por_cliente,
                'cantidad_usos_actual' => $promo->cantidad_usos_actual,
                'prioridad' => $promo->prioridad,
                'created_at' => $promo->created_at->toISOString(),
                'updated_at' => $promo->updated_at->toISOString(),
                
                // ✅ Detalles de la promo con datos completos
                'detalle_promos' => $promo->detallePromos->map(fn($detalle) => [
                    'id' => $detalle->id,
                    'tipo_item' => $detalle->tipo_item,
                    'cantidad' => $detalle->cantidad,
                    'noches' => $detalle->noches,
                    'descuento_porcentaje' => $detalle->descuento_porcentaje,
                    'descuento_monto' => $detalle->descuento_monto,
                    'precio_especial' => $detalle->precio_especial,
                    'es_gratis' => $detalle->es_gratis,
                    'detalle' => $detalle->detalle,
                    'tipo_habitacion' => $detalle->tipoHabitacion ? [
                        'id' => $detalle->tipoHabitacion->id,
                        'nombre' => $detalle->tipoHabitacion->nombre,
                    ] : null,
                    'servicio' => $detalle->servicio ? [
                        'id' => $detalle->servicio->id,
                        'nombre' => $detalle->servicio->nombre,
                    ] : null,
                    'platillo' => $detalle->platillo ? [
                        'id' => $detalle->platillo->id,
                        'nombre' => $detalle->platillo->nombre,
                    ] : null,
                ]),
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * ✏️ Mostrar formulario de edición
     */
    public function edit(Promo $promo)
    {
        $promo->load(['detallePromos']);

        return Inertia::render('Promos/PromoEdit', [
            'promo' => $promo,
            'segmentos' => Segmento::all(),
            'tiposHabitacion' => TipoHabitacion::where('estado', 'activo')->get(),
            'servicios' => Servicio::where('estado', 'activo')->get(),
            'platillos' => Platillo::where('estado', 'disponible')->get(),
        ]);
    }

    /**
     * 🔄 Actualizar promoción
     */
    public function update(Request $request, Promo $promo)
    {
        // Similar a store() pero actualizando
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'codigo_promocional' => 'nullable|string|max:50|unique:promos,codigo_promocional,' . $promo->id,
            'tipo_promo' => 'required|in:descuento_porcentual,descuento_fijo,paquete,precio_especial,upgrade',
            'descuento_porcentaje' => 'nullable|numeric|min:0|max:100',
            'descuento_monto' => 'nullable|numeric|min:0',
            'precio_total_paquete' => 'nullable|numeric|min:0',
            'precio_normal' => 'nullable|numeric|min:0',
            'segmentos_ids' => 'nullable|array', // ✅ Permitir array de IDs
            'segmentos_ids.*' => 'exists:segmentos,id',
            'aplica_todos_segmentos' => 'boolean',
            'aplica_a' => 'required|in:todos,nuevos,registrados',
            'estado' => 'required|in:activa,pausada,finalizada',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'image_url' => 'nullable|url',
            'minimo_noches' => 'required|integer|min:1',
            'minimo_personas' => 'required|integer|min:1',
            'dias_anticipacion_minimo' => 'nullable|integer|min:0',
            'dias_semana' => 'nullable|array',
            'incluye_upgrade' => 'boolean',
            'requiere_pago_completo' => 'boolean',
            'cantidad_maxima_usos' => 'nullable|integer|min:1',
            'usos_por_cliente' => 'required|integer|min:1',
            'prioridad' => 'required|integer|min:1|max:10',
            'detalles' => 'required|array|min:1',
            'detalles.*.tipo_item' => 'required|in:habitacion,servicio,platillo',
            'detalles.*.item_id' => 'required|integer',
            'detalles.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $promo->update($validated);

            // Eliminar detalles anteriores
            $promo->detallePromos()->delete();

            // Crear nuevos detalles
            foreach ($request->detalles as $index => $detalle) {
                $detalleData = [
                    'promo_id' => $promo->id,
                    'tipo_item' => $detalle['tipo_item'],
                    'cantidad' => $detalle['cantidad'],
                    'noches' => $detalle['noches'] ?? null,
                    'descuento_porcentaje' => $detalle['descuento_porcentaje'] ?? null,
                    'descuento_monto' => $detalle['descuento_monto'] ?? null,
                    'precio_especial' => $detalle['precio_especial'] ?? null,
                    'es_gratis' => $detalle['es_gratis'] ?? false,
                    'detalle' => $detalle['detalle'] ?? null,
                    'orden' => $index + 1,
                ];

                // Asignar el FK correcto según el tipo
                match($detalle['tipo_item']) {
                    'habitacion' => $detalleData['tipo_habitacion_id'] = $detalle['item_id'],
                    'servicio' => $detalleData['servicio_id'] = $detalle['item_id'],
                    'platillo' => $detalleData['platillo_id'] = $detalle['item_id'],
                };

                DetallePromo::create($detalleData);
            }

            DB::commit();

            return redirect()->route('promos.index')
                ->with('success', 'Promoción actualizada exitosamente');

        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->withErrors([
                'error' => 'Error al actualizar: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * 🗑️ Eliminar promoción
     */
    public function destroy(Promo $promo)
    {
        // ✅ Solo verificar si la tabla existe
        try {
            if (\Schema::hasTable('promo_reservas') && $promo->promoReservas()->exists()) {
                return back()->withErrors([
                    'error' => 'No se puede eliminar: hay reservas usando esta promoción'
                ]);
            }
        } catch (\Exception $e) {
            // Si hay error, permitir eliminar
        }

        $promo->delete();

        return redirect()->route('promos.index')
            ->with('success', 'Promoción eliminada exitosamente');
    }

    /**
     * ⏸️ Pausar/Activar promoción
     */
    public function toggleEstado(Promo $promo)
    {
        $nuevoEstado = $promo->estado === 'activa' ? 'pausada' : 'activa';
        $promo->update(['estado' => $nuevoEstado]);

        return back()->with('success', "Promoción {$nuevoEstado}");
    }

    /**
     * 🔍 Validar código promocional
     */
    public function validarCodigo(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string',
            'cliente_id' => 'required|exists:clientes,id',
        ]);

        $promo = Promo::where('codigo_promocional', $request->codigo)
            ->activas()
            ->disponibles()
            ->first();

        if (!$promo) {
            return response()->json([
                'valido' => false,
                'mensaje' => 'Código inválido o expirado'
            ]);
        }

        if (!$promo->puedeUsarCliente($request->cliente_id)) {
            return response()->json([
                'valido' => false,
                'mensaje' => 'Ya has usado este código el máximo de veces permitidas'
            ]);
        }

        return response()->json([
            'valido' => true,
            'promo' => $promo->load('detallePromos'),
            'mensaje' => 'Código válido'
        ]);
    }

    /**
     * 🎯 Obtener promociones disponibles para un cliente
     */
    public function promocionesDisponibles(Request $request)
    {
        $clienteId = $request->input('cliente_id');
        $segmentoId = $request->input('segmento_id');

        $promos = Promo::activas()
            ->disponibles()
            ->paraSegmento($segmentoId)
            ->with(['detallePromos.tipoHabitacion', 'detallePromos.servicio', 'detallePromos.platillo'])
            ->orderBy('prioridad', 'desc')
            ->get()
            ->filter(function($promo) use ($clienteId) {
                return $promo->puedeUsarCliente($clienteId);
            });

        return response()->json($promos);
    }
}
