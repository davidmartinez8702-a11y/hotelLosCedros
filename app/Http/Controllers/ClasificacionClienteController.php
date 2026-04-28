<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Reserva;
use App\Models\Segmento;
use App\Models\Checkin;       
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;

class ClasificacionClienteController extends Controller
{
    private $microservicioUrl = 'http://localhost:5000';

    /**
     * ✅ Clasificar UN cliente
     */
    public function clasificarCliente($clienteId)
    {
        try {
            $cliente = Cliente::with([
                'reservas' => function($query) {
                    $query->with(['checkins', 'hospedajes.tipoHabitacion'])
                          ->where('estado', '!=', 'cancelada')
                          ->latest()
                          ->limit(10);
                }
            ])->findOrFail($clienteId);

            if ($cliente->reservas->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'El cliente no tiene reservas para clasificar'
                ], 400);
            }

            $reservasConCheckin = $cliente->reservas->filter(function($reserva) {
                return $reserva->checkins->isNotEmpty();
            });

            if ($reservasConCheckin->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'El cliente no tiene check-ins registrados'
                ], 400);
            }

            // Enviar la ÚLTIMA reserva
            $reservaRepresentativa = $reservasConCheckin->first();
            $datosReserva = $this->formatearReservaParaMicroservicio($reservaRepresentativa, $cliente);

            // ✅ LLAMAR AL MICROSERVICIO (endpoint para UN usuario)
            $response = Http::timeout(30)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post(
                    "{$this->microservicioUrl}/api/clustering/predict-user",
                    $datosReserva
                );

            if (!$response->successful()) {
                Log::error('Error microservicio:', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Error al clasificar: ' . $response->body()
                ], 500);
            }

            $resultado = $response->json();

            // Tu microservicio devuelve: {"customer_id": 1, "cluster_id": 0, "classification_date": "..."}
            $clusterId = $resultado['cluster_id'] ?? $resultado['cluster'];
            $fechaClasificacion = $resultado['classification_date'] ?? now()->toDateTimeString();

            // Mapear cluster a segmento
            $segmento = $this->mapearClusterASegmento($clusterId);

            if (!$segmento) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró segmento para cluster ' . $clusterId
                ], 500);
            }

            // ✅ GUARDAR EN BASE DE DATOS
            $cliente->segmento()->detach();
            $cliente->segmento()->attach($segmento->id, [
                'cluster_id' => $clusterId,
                'fecha_clasificacion' => $fechaClasificacion,
                'cluster_data' => json_encode($this->calcularClusterData($reservasConCheckin)),
                'total_reservas_analizadas' => $reservasConCheckin->count(),
                'confianza' => 100.0,
                'version_modelo' => '1.0'
            ]);

            return response()->json([
                'success' => true,
                'cliente_id' => $cliente->id,
                'nombre' => $cliente->nombre . ' ' . $cliente->apellido,
                'cluster_id' => $clusterId,
                'segmento' => $segmento->nombre,
                'fecha_clasificacion' => $fechaClasificacion,
                'total_reservas_analizadas' => $reservasConCheckin->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Error en clasificarCliente:', ['error' => $e->getMessage()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ Clasificar MÚLTIPLES clientes
     */
    public function clasificarClientesEnLote(Request $request)
    {
        // ✅ Aumentar tiempo máximo de ejecución
        set_time_limit(300); // 5 minutos
        ini_set('max_execution_time', '300');
        
        try {
            // ✅ PASO 1: VALIDAR DATOS SUFICIENTES
            $validacion = $this->validarDatosSuficientes();
            $datosValidacion = $validacion->getData();
            
            if (!$datosValidacion->suficiente) {
                return response()->json([
                    'success' => false,
                    'message' => '❌ Datos insuficientes para clasificar',
                    'validacion' => $datosValidacion
                ], 400);
            }
            
            // ✅ PASO 2: CONTINUAR CON CLASIFICACIÓN
            $diasInactividad = $request->input('dias_inactividad', 180);

            $clientes = Cliente::with([
                'reservas' => function($query) use ($diasInactividad) {
                    $query->with(['checkins', 'hospedajes.tipoHabitacion'])
                          ->where('created_at', '>=', now()->subDays($diasInactividad))
                          ->where('estado', '!=', 'cancelada')
                          ->whereHas('checkins');
                }
            ])
            ->whereHas('reservas.checkins')
            ->get();

            if ($clientes->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => "No hay clientes activos en los últimos {$diasInactividad} días con check-ins registrados",
                    'sugerencia' => 'Intenta aumentar el rango de días (180-365) o ejecuta los seeders'
                ], 400);
            }

            // Preparar datos
            $reservasParaClasificar = [];
            
            foreach ($clientes as $cliente) {
                $reservasConCheckin = $cliente->reservas->filter(function($reserva) {
                    return $reserva->checkins->isNotEmpty();
                });

                if ($reservasConCheckin->isNotEmpty()) {
                    $reservaRepresentativa = $reservasConCheckin->first();
                    
                    try {
                        $datos = $this->formatearReservaParaMicroservicio($reservaRepresentativa, $cliente);
                        $reservasParaClasificar[] = $datos;
                    } catch (\Exception $e) {
                        Log::warning("⚠️ No se pudo formatear cliente {$cliente->id}: {$e->getMessage()}");
                        continue;
                    }
                }
            }

            if (empty($reservasParaClasificar)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se pudieron preparar datos válidos para clasificar',
                    'detalle' => 'Verifica que las reservas tengan fechas y check-ins correctos'
                ], 400);
            }

            Log::info(' Enviando datos al microservicio:', [
                'total_clientes' => count($reservasParaClasificar),
                'primer_registro' => $reservasParaClasificar[0] ?? null
            ]);

            // Enviar al microservicio
            $response = Http::asJson()
                ->timeout(120)
                ->post(
                    "{$this->microservicioUrl}/api/clustering/classify-all",
                    $reservasParaClasificar
                );

            Log::info(' Respuesta del microservicio:', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al clasificar en lote',
                    'detalle' => $response->body(),
                    'status' => $response->status()
                ], 500);
            }

            $resultado = $response->json();
            
            if (($resultado['status'] ?? null) !== 'success') {
                return response()->json([
                    'success' => false,
                    'message' => 'El microservicio reportó un error',
                    'detalle' => $resultado
                ], 500);
            }

            $listaResultados = $resultado['data'] ?? [];

            if (empty($listaResultados)) {
                return response()->json([
                    'success' => false,
                    'message' => 'El microservicio no devolvió resultados'
                ], 500);
            }

            // Guardar resultados
            $clasificados = [];
            $errores = [];

            foreach ($listaResultados as $item) {
                try {
                    $clienteId = $item['customer_id'];
                    $clusterId = $item['cluster_id'];
                    $fechaClasificacion = $item['classification_date'];

                    $cliente = Cliente::with('reservas.checkins')->find($clienteId);
                    
                    if (!$cliente) {
                        $errores[] = [
                            'cliente_id' => $clienteId,
                            'error' => 'Cliente no encontrado'
                        ];
                        continue;
                    }

                    $segmento = $this->mapearClusterASegmento($clusterId);

                    if (!$segmento) {
                        $errores[] = [
                            'cliente_id' => $clienteId,
                            'error' => 'Segmento no encontrado para cluster ' . $clusterId
                        ];
                        continue;
                    }

                    $reservasConCheckin = $cliente->reservas->filter(fn($r) => $r->checkins->isNotEmpty());
                    
                    $cliente->segmento()->detach();
                    $cliente->segmento()->attach($segmento->id, [
                        'cluster_id' => $clusterId,
                        'fecha_clasificacion' => $fechaClasificacion,
                        'cluster_data' => json_encode($this->calcularClusterData($reservasConCheckin)),
                        'total_reservas_analizadas' => $reservasConCheckin->count(),
                        'confianza' => 100.0,
                        'version_modelo' => '1.0'
                    ]);

                    $clasificados[] = [
                        'cliente_id' => $clienteId,
                        'nombre' => $cliente->nombre . ' ' . $cliente->apellido,
                        'cluster_id' => $clusterId,
                        'segmento' => $segmento->nombre
                    ];

                } catch (\Exception $e) {
                    $errores[] = [
                        'cliente_id' => $item['customer_id'] ?? null,
                        'error' => $e->getMessage()
                    ];
                }
            }

            // ✅ OPCIÓN A: Devolver JSON (para fetch)
            return response()->json([
                'success' => true,
                'total_clasificados' => count($clasificados),
                'total_errores' => count($errores),
                'resultados' => $clasificados,
                'errores' => $errores
            ]);

            // ✅ OPCIÓN B: Devolver con Inertia (si usas router.post)
            // return back()->with([
            //     'flash' => [
            //         'success' => true,
            //         'total_clasificados' => count($clasificados),
            //         'message' => "Se clasificaron {$clasificados} clientes exitosamente"
            //     ]
            // ]);

        } catch (\Exception $e) {
            Log::error('Error:', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ Validar si hay datos suficientes para clasificar
     */
    public function validarDatosSuficientes()
    {
        try {
            // 1. Verificar clientes
            $totalClientes = Cliente::count();
            
            // 2. Verificar reservas
            $totalReservas = Reserva::where('estado', '!=', 'cancelada')->count();
            
            // 3. Verificar check-ins
            $totalCheckins = Checkin::count();
            
            // 4. Clientes con al menos una reserva y check-in
            $clientesConDatos = Cliente::whereHas('reservas', function($query) {
                $query->where('estado', '!=', 'cancelada')
                      ->whereHas('checkins');
            })->count();
            
            // 5. Verificar segmentos
            $segmentosActivos = Segmento::where('activo', true)->count();
            
            // 6. Clientes ya clasificados
            $clientesClasificados = Cliente::has('segmento')->count();
            
            // Criterios mínimos
            $criterios = [
                'clientes_minimos' => 10,
                'reservas_minimas' => 20,
                'checkins_minimos' => 15,
                'clientes_con_datos_minimos' => 5,
                'segmentos_minimos' => 4
            ];
            
            $problemas = [];
            $advertencias = [];
            
            if ($totalClientes < $criterios['clientes_minimos']) {
                $problemas[] = "Solo hay {$totalClientes} clientes (mínimo: {$criterios['clientes_minimos']})";
            }
            
            if ($totalReservas < $criterios['reservas_minimas']) {
                $problemas[] = "Solo hay {$totalReservas} reservas válidas (mínimo: {$criterios['reservas_minimas']})";
            }
            
            if ($totalCheckins < $criterios['checkins_minimos']) {
                $problemas[] = "Solo hay {$totalCheckins} check-ins (mínimo: {$criterios['checkins_minimos']})";
            }
            
            if ($clientesConDatos < $criterios['clientes_con_datos_minimos']) {
                $problemas[] = "Solo {$clientesConDatos} clientes tienen reservas con check-in (mínimo: {$criterios['clientes_con_datos_minimos']})";
            }
            
            if ($segmentosActivos < $criterios['segmentos_minimos']) {
                $problemas[] = "Solo hay {$segmentosActivos} segmentos activos (mínimo: {$criterios['segmentos_minimos']})";
            }
            
            if ($clientesClasificados === 0) {
                $advertencias[] = "No hay clientes clasificados previamente. Esta será la primera clasificación.";
            }
            
            if ($clientesConDatos < 20) {
                $advertencias[] = "Con solo {$clientesConDatos} clientes, los resultados pueden no ser muy precisos.";
            }
            
            $esSuficiente = empty($problemas);
            
            return response()->json([
                'suficiente' => $esSuficiente,
                'estadisticas' => [
                    'total_clientes' => $totalClientes,
                    'total_reservas' => $totalReservas,
                    'total_checkins' => $totalCheckins,
                    'clientes_con_datos' => $clientesConDatos,
                    'clientes_clasificados' => $clientesClasificados,
                    'segmentos_activos' => $segmentosActivos
                ],
                'criterios' => $criterios,
                'problemas' => $problemas,
                'advertencias' => $advertencias,
                'mensaje' => $esSuficiente 
                    ? "✅ Hay datos suficientes para clasificar" 
                    : "❌ Datos insuficientes. Ejecuta los seeders primero."
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error en validarDatosSuficientes:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'suficiente' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ Formatear reserva para microservicio
     */
    private function formatearReservaParaMicroservicio(Reserva $reserva, Cliente $cliente)
    {
        $checkin = $reserva->checkins->first();
        
        if (!$checkin) {
            throw new \Exception("Reserva sin check-in");
        }

        $fechaLlegada = Carbon::parse($checkin->fecha_entrada);
        $fechaSalida = Carbon::parse($checkin->fecha_salida);

        // Datos básicos
        $customerId = $cliente->id;
        $arrivalYear = $fechaLlegada->year;
        $arrivalMonth = $fechaLlegada->format('F'); // "January", "February", etc.
        $arrivalDay = $fechaLlegada->day;

        // ADR (Average Daily Rate)
        $diasEstadia = max($reserva->dias_estadia, 1);
        $adr = round($reserva->monto_total / $diasEstadia, 2);

        // Cancelación
        $isCanceled = ($reserva->estado === 'cancelada') ? 1 : 0;

        // Lead Time
        $fechaReserva = Carbon::parse($reserva->fecha_reserva);
        $leadTime = $fechaReserva->diffInDays($fechaLlegada);

        // Huéspedes
        $adults = $reserva->total_cantidad_adultos ?? 1;
        $children = $reserva->total_cantidad_infantes ?? 0;
        $babies = 0;

        // País
        $country = $this->obtenerCodigoPais($cliente->pais ?? 'Bolivia');

        // Tipo de habitación
        $assignedRoomType = $this->obtenerTipoHabitacion($reserva);

        // Solicitudes especiales
        $totalSpecialRequests = !empty($reserva->solicitudes_especiales) ? 1 : 0;

        // Hotel
        $hotel = config('app.name', 'Resort Hotel');

        // Noches
        $staysWeekend = 0;
        $staysWeekNights = 0;
        
        $fechaTemp = $fechaLlegada->copy();
        while ($fechaTemp->lt($fechaSalida)) {
            if (in_array($fechaTemp->dayOfWeek, [Carbon::FRIDAY, Carbon::SATURDAY])) {
                $staysWeekend++;
            } else {
                $staysWeekNights++;
            }
            $fechaTemp->addDay();
        }

        return [
            'customer_id' => $customerId,
            'arrival_date_year' => $arrivalYear,
            'arrival_date_month' => $arrivalMonth,
            'arrival_date_day_of_month' => $arrivalDay,
            'adr' => $adr,
            'is_canceled' => $isCanceled,
            'lead_time' => $leadTime,
            'adults' => $adults,
            'children' => $children,
            'babies' => $babies,
            'country' => $country,
            'assigned_room_type' => $assignedRoomType,
            'total_of_special_requests' => $totalSpecialRequests,
            'hotel' => $hotel,
            'stays_in_weekend_nights' => $staysWeekend,
            'stays_in_week_nights' => $staysWeekNights
        ];
    }

    /**
     * Calcular cluster_data agregado
     */
    private function calcularClusterData($reservasConCheckin)
    {
        $totalReservas = $reservasConCheckin->count();
        $gastoTotal = $reservasConCheckin->sum('monto_total');
        $totalNoches = $reservasConCheckin->sum('dias_estadia');
        $adr = $totalNoches > 0 ? round($gastoTotal / $totalNoches, 2) : 0;

        $leadTimes = $reservasConCheckin->map(function($reserva) {
            $fechaReserva = Carbon::parse($reserva->fecha_reserva);
            $checkin = $reserva->checkins->first();
            if ($checkin) {
                $fechaLlegada = Carbon::parse($checkin->fecha_entrada);
                return $fechaReserva->diffInDays($fechaLlegada);
            }
            return 0;
        });
        $leadTimePromedio = $leadTimes->avg();

        $solicitudesEspeciales = $reservasConCheckin->filter(function($reserva) {
            return !empty($reserva->solicitudes_especiales);
        })->count();

        $grupoPromedio = $reservasConCheckin->map(function($reserva) {
            return ($reserva->total_cantidad_adultos ?? 1) + ($reserva->total_cantidad_infantes ?? 0);
        })->avg();

        $roomScore = $this->calcularRoomScore($reservasConCheckin);

        return [
            'revenue' => $gastoTotal,
            'adr' => $adr,
            'total_nights' => $totalNoches,
            'lead_time' => $leadTimePromedio,
            'total_of_special_requests' => $solicitudesEspeciales,
            'group_size' => $grupoPromedio,
            'room_score' => $roomScore,
            'frequency' => $totalReservas
        ];
    }

    private function obtenerTipoHabitacion(Reserva $reserva)
    {
        $hospedaje = $reserva->hospedajes->first();
        
        if (!$hospedaje || !$hospedaje->tipoHabitacion) {
            return 'A';
        }

        return $this->mapearTipoHabitacionALetra($hospedaje->tipoHabitacion);
    }

    private function mapearTipoHabitacionALetra($tipoHabitacion)
    {
        $mapeo = [
            'simple' => 'A',
            'doble' => 'B',
            'twin' => 'C',
            'triple' => 'D',
            'cuadruple' => 'E',
            'matrimonial' => 'F',
            'suite' => 'G',
            'suite junior' => 'H',
            'suite ejecutiva' => 'I',
            'suite presidencial' => 'J',
            'deluxe' => 'K',
            'superior' => 'L',
            'estándar' => 'M',
            'económica' => 'N',
            'familiar' => 'O',
            'penthouse' => 'P',
        ];

        $nombreLower = strtolower($tipoHabitacion->nombre ?? '');
        
        foreach ($mapeo as $keyword => $letra) {
            if (str_contains($nombreLower, $keyword)) {
                return $letra;
            }
        }

        $tipoId = $tipoHabitacion->id ?? 1;
        $letraIndex = min($tipoId - 1, 15);
        return chr(65 + $letraIndex);
    }

    private function obtenerCodigoPais($pais)
    {
        $mapeo = [
            'Bolivia' => 'BOL',
            'Argentina' => 'ARG',
            'Brasil' => 'BRA',
            'Chile' => 'CHL',
            'Colombia' => 'COL',
            'Ecuador' => 'ECU',
            'Paraguay' => 'PRY',
            'Perú' => 'PER',
            'Uruguay' => 'URY',
            'Venezuela' => 'VEN',
            'España' => 'ESP',
            'Portugal' => 'PRT',
            'México' => 'MEX',
            'Estados Unidos' => 'USA',
            'Reino Unido' => 'GBR',
            'Francia' => 'FRA',
            'Alemania' => 'DEU',
            'Italia' => 'ITA',
        ];

        foreach ($mapeo as $nombre => $codigo) {
            if (stripos($pais, $nombre) !== false) {
                return $codigo;
            }
        }

        return 'BOL';
    }

    private function calcularRoomScore($reservas)
    {
        $scores = $reservas->map(function($reserva) {
            $hospedaje = $reserva->hospedajes->first();
            if (!$hospedaje || !$hospedaje->tipoHabitacion) {
                return 1;
            }

            $mapeo = [
                'económica' => 1,
                'estándar' => 2,
                'superior' => 3,
                'deluxe' => 4,
                'suite' => 5,
            ];

            $nombreLower = strtolower($hospedaje->tipoHabitacion->nombre ?? '');
            
            foreach ($mapeo as $keyword => $score) {
                if (str_contains($nombreLower, $keyword)) {
                    return $score;
                }
            }

            return 2;
        });

        return round($scores->avg(), 2);
    }

    private function mapearClusterASegmento($clusterId)
    {
        $mapeo = [
            0 => 'Cliente VIP',
            1 => 'Cliente Frecuente',
            2 => 'Cliente Ocasional',
            3 => 'Cliente Ocasional',
            4 => 'Cliente Ocasional',
            5 => 'Cliente Premium',
        ];

        $nombreSegmento = $mapeo[$clusterId] ?? 'Cliente Ocasional';
        
        return Segmento::where('nombre', $nombreSegmento)->first();
    }

    public function estadisticas()
    {
        $segmentos = Segmento::withCount('clientes')
            ->with(['clientes' => function($query) {
                $query->with(['reservas' => function($q) {
                    $q->where('estado', '!=', 'cancelada');
                }]);
            }])
            ->where('activo', true)
            ->get();

        return response()->json([
            'success' => true,
            'segmentos' => $segmentos->map(function($segmento) {
                $clusterDataPromedio = $segmento->clientes->map(function($cliente) {
                    return json_decode($cliente->pivot->cluster_data, true);
                })->filter()->values();

                return [
                    'id' => $segmento->id,
                    'nombre' => $segmento->nombre,
                    'color' => $segmento->color,
                    'total_clientes' => $segmento->clientes_count,
                    'caracteristicas_promedio' => $this->calcularPromedioClusterData($clusterDataPromedio),
                    'promos_activas' => $segmento->promosActivas()->count()
                ];
            })
        ]);
    }

    private function calcularPromedioClusterData($clusterDataArray)
    {
        if ($clusterDataArray->isEmpty()) return null;

        $keys = array_keys($clusterDataArray->first());
        $promedios = [];

        foreach ($keys as $key) {
            $valores = $clusterDataArray->pluck($key)->filter()->values();
            $promedios[$key] = $valores->isNotEmpty() ? round($valores->avg(), 2) : 0;
        }

        return $promedios;
    }

    public function verClasificacionesGuardadas()
    {
        $clientesClasificados = Cliente::has('segmento')
            ->with(['segmento'])
            ->get()
            ->map(function($cliente) {
                $segmento = $cliente->segmentoActual();
                
                return [
                    'cliente_id' => $cliente->id,
                    'nombre_completo' => $cliente->nombre . ' ' . $cliente->apellido,
                    'email' => $cliente->email,
                    'segmento' => $segmento->nombre,
                    'cluster_id' => $segmento->pivot->cluster_id,
                    'fecha_clasificacion' => $segmento->pivot->fecha_clasificacion,
                    'confianza' => $segmento->pivot->confianza . '%',
                    'total_reservas_analizadas' => $segmento->pivot->total_reservas_analizadas,
                    'cluster_data' => json_decode($segmento->pivot->cluster_data, true)
                ];
            });

        return response()->json([
            'success' => true,
            'total_clasificados' => $clientesClasificados->count(),
            'clientes' => $clientesClasificados
        ]);
    }

    /**
     * ✅ Endpoint de prueba
     */
    public function probarConexion()
    {
        try {
            $datosPrueba = [
                [
                    'customer_id' => 999,
                    'arrival_date_year' => 2025,
                    'arrival_date_month' => 'December',
                    'arrival_date_day_of_month' => 10,
                    'adr' => 150.0,
                    'is_canceled' => 0,
                    'lead_time' => 30,
                    'adults' => 2,
                    'children' => 0,
                    'babies' => 0,
                    'country' => 'BOL',
                    'assigned_room_type' => 'A',
                    'total_of_special_requests' => 0,
                    'hotel' => 'Resort Hotel',
                    'stays_in_weekend_nights' => 1,
                    'stays_in_week_nights' => 2
                ]
            ];

            $response = Http::timeout(10)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post(
                    "{$this->microservicioUrl}/api/clustering/classify-all",
                    $datosPrueba
                );

            return response()->json([
                'success' => $response->successful(),
                'status' => $response->status(),
                'body' => $response->body(),
                'parsed' => $response->json()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}
