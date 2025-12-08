<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaccion;
use App\Models\Servicio;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BIController extends Controller
{
    /**
     * Obtener evolución temporal de uso de servicios
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEvolucionServicios(Request $request)
    {
        $periodo = $request->input('periodo', 'semana'); // hoy, semana, mes, anio
        $servicioId = $request->input('servicio_id'); // ID del servicio específico

        // Validar que el servicio existe
        if (!$servicioId) {
            return response()->json([
                'error' => 'Se requiere el ID del servicio'
            ], 400);
        }

        $servicio = Servicio::find($servicioId);
        if (!$servicio) {
            return response()->json([
                'error' => 'Servicio no encontrado'
            ], 404);
        }

        $data = [];

        switch ($periodo) {
            case 'hoy':
                $data = $this->getEvolucionPorHora($servicioId, $servicio->precio);
                break;
            case 'semana':
                $data = $this->getEvolucionPorDiaSemana($servicioId, $servicio->precio);
                break;
            case 'mes':
                $data = $this->getEvolucionPorDiaMes($servicioId, $servicio->precio);
                break;
            case 'anio':
                $data = $this->getEvolucionPorMes($servicioId, $servicio->precio);
                break;
            default:
                $data = $this->getEvolucionPorDiaSemana($servicioId, $servicio->precio);
        }

        return response()->json([
            'data' => $data,
            'servicio' => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'precio' => $servicio->precio,
            ],
            'periodo' => $periodo,
            'metadata' => [
                'total_cantidad' => array_sum(array_column($data, 'cantidad')),
                'total_ingresos' => array_sum(array_column($data, 'ingresos')),
                'updated_at' => now()->toISOString(),
            ]
        ]);
    }

    /**
     * Evolución por hora (Hoy)
     * Eje X: Horas (00:00 - 23:00)
     */
    private function getEvolucionPorHora($servicioId, $precioServicio)
    {
        $hoy = Carbon::today();

        $transacciones = Transaccion::where('servicio_id', $servicioId)
            ->whereDate('created_at', $hoy)
            ->select(
                DB::raw('EXTRACT(HOUR FROM created_at) as hora'),
                DB::raw('SUM(cantidad) as total_cantidad')
            )
            ->groupBy('hora')
            ->get()
            ->keyBy('hora');

        $data = [];
        for ($h = 0; $h < 24; $h++) {
            $cantidad = $transacciones->get($h)->total_cantidad ?? 0;
            $data[] = [
                'periodo' => sprintf('%02d:00', $h),
                'cantidad' => (int) $cantidad,
                'ingresos' => (float) ($cantidad * $precioServicio),
            ];
        }

        return $data;
    }

    /**
     * Evolución por día de la semana (Esta Semana)
     * Eje X: Lun, Mar, Mié, Jue, Vie, Sáb, Dom
     */
    private function getEvolucionPorDiaSemana($servicioId, $precioServicio)
    {
        $inicioSemana = Carbon::now()->startOfWeek();
        $finSemana = Carbon::now()->endOfWeek();

        $transacciones = Transaccion::where('servicio_id', $servicioId)
            ->whereBetween('created_at', [$inicioSemana, $finSemana])
            ->select(
                DB::raw('EXTRACT(DOW FROM created_at) as dia_numero'),
                DB::raw('SUM(cantidad) as total_cantidad')
            )
            ->groupBy('dia_numero')
            ->get()
            ->keyBy('dia_numero');

        $diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        $data = [];

        // PostgreSQL EXTRACT(DOW): 0=Domingo, 1=Lunes, ..., 6=Sábado
        // Ajustamos para que empiece en Lunes
        for ($d = 1; $d <= 6; $d++) {
            $cantidad = $transacciones->get($d)->total_cantidad ?? 0;
            $data[] = [
                'periodo' => $diasSemana[$d],
                'cantidad' => (int) $cantidad,
                'ingresos' => (float) ($cantidad * $precioServicio),
            ];
        }
        // Agregar Domingo al final
        $cantidad = $transacciones->get(0)->total_cantidad ?? 0;
        $data[] = [
            'periodo' => 'Dom',
            'cantidad' => (int) $cantidad,
            'ingresos' => (float) ($cantidad * $precioServicio),
        ];

        return $data;
    }

    /**
     * Evolución por día del mes (Este Mes)
     * Eje X: Días del mes (1-31)
     */
    private function getEvolucionPorDiaMes($servicioId, $precioServicio)
    {
        $inicioMes = Carbon::now()->startOfMonth();
        $finMes = Carbon::now()->endOfMonth();
        $diasEnMes = $finMes->day;

        $transacciones = Transaccion::where('servicio_id', $servicioId)
            ->whereBetween('created_at', [$inicioMes, $finMes])
            ->select(
                DB::raw('EXTRACT(DAY FROM created_at) as dia'),
                DB::raw('SUM(cantidad) as total_cantidad')
            )
            ->groupBy('dia')
            ->get()
            ->keyBy('dia');

        $data = [];
        for ($d = 1; $d <= $diasEnMes; $d++) {
            $cantidad = $transacciones->get($d)->total_cantidad ?? 0;
            $data[] = [
                'periodo' => (string) $d,
                'cantidad' => (int) $cantidad,
                'ingresos' => (float) ($cantidad * $precioServicio),
            ];
        }

        return $data;
    }

    /**
     * Evolución por mes (Este Año)
     * Eje X: Meses (Ene - Dic)
     */
    private function getEvolucionPorMes($servicioId, $precioServicio)
    {
        $inicioAnio = Carbon::now()->startOfYear();
        $finAnio = Carbon::now()->endOfYear();

        $transacciones = Transaccion::where('servicio_id', $servicioId)
            ->whereBetween('created_at', [$inicioAnio, $finAnio])
            ->select(
                DB::raw('EXTRACT(MONTH FROM created_at) as mes'),
                DB::raw('SUM(cantidad) as total_cantidad')
            )
            ->groupBy('mes')
            ->get()
            ->keyBy('mes');

        $meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $data = [];

        for ($m = 1; $m <= 12; $m++) {
            $cantidad = $transacciones->get($m)->total_cantidad ?? 0;
            $data[] = [
                'periodo' => $meses[$m - 1],
                'cantidad' => (int) $cantidad,
                'ingresos' => (float) ($cantidad * $precioServicio),
            ];
        }

        return $data;
    }

    /**
     * Obtener uso de todos los servicios con granularidad dinámica
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsoServicios(Request $request)
    {
        $granularidad = $request->input('granularidad', 'mes'); // anio, mes, dia
        $anio = $request->input('anio', Carbon::now()->year);
        $mes = $request->input('mes'); // 1-12
        $dia = $request->input('dia'); // 1-31

        // Obtener todos los servicios activos
        $servicios = Servicio::where('estado', 'activo')->get();

        if ($servicios->isEmpty()) {
            return response()->json([
                'error' => 'No hay servicios disponibles'
            ], 404);
        }

        $data = [];
        $ejeX = [];
        $metadata = [
            'granularidad' => $granularidad,
            'periodo' => '',
            'servicios' => [],
        ];

        switch ($granularidad) {
            case 'anio':
                // Año seleccionado → Eje X: Meses
                $data = $this->getUsoServiciosPorMes($servicios, $anio);
                $ejeX = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                $metadata['periodo'] = "Año {$anio}";
                break;

            case 'mes':
                // Mes seleccionado → Eje X: Semanas
                if (!$mes) {
                    return response()->json(['error' => 'Se requiere el mes'], 400);
                }
                $data = $this->getUsoServiciosPorSemana($servicios, $anio, $mes);
                $ejeX = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'];
                $metadata['periodo'] = Carbon::create($anio, $mes, 1)->format('F Y');
                break;

            case 'dia':
                // Día seleccionado → Eje X: Horas
                if (!$mes || !$dia) {
                    return response()->json(['error' => 'Se requiere mes y día'], 400);
                }
                $data = $this->getUsoServiciosPorHora($servicios, $anio, $mes, $dia);
                $ejeX = array_map(fn($h) => sprintf('%02d:00', $h), range(0, 23));
                $metadata['periodo'] = Carbon::create($anio, $mes, $dia)->format('d/m/Y');
                break;

            default:
                return response()->json(['error' => 'Granularidad inválida'], 400);
        }

        // Metadata de servicios
        foreach ($servicios as $servicio) {
            $metadata['servicios'][] = [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'precio' => $servicio->precio,
            ];
        }

        return response()->json([
            'data' => $data,
            'ejeX' => $ejeX,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Uso de servicios por mes (para granularidad año)
     */
    private function getUsoServiciosPorMes($servicios, $anio)
    {
        $data = [];

        for ($mes = 1; $mes <= 12; $mes++) {
            $punto = ['periodo' => $mes];

            foreach ($servicios as $servicio) {
                $inicioMes = Carbon::create($anio, $mes, 1)->startOfMonth();
                $finMes = Carbon::create($anio, $mes, 1)->endOfMonth();

                $resultado = Transaccion::where('servicio_id', $servicio->id)
                    ->whereBetween('created_at', [$inicioMes, $finMes])
                    ->selectRaw('SUM(cantidad) as total_cantidad')
                    ->first();

                $cantidad = $resultado->total_cantidad ?? 0;
                $punto["{$servicio->nombre}_cantidad"] = (int) $cantidad;
                $punto["{$servicio->nombre}_ingresos"] = (float) ($cantidad * $servicio->precio);
            }

            $data[] = $punto;
        }

        return $data;
    }

    /**
     * Uso de servicios por semana (para granularidad mes)
     */
    private function getUsoServiciosPorSemana($servicios, $anio, $mes)
    {
        $data = [];
        $inicioMes = Carbon::create($anio, $mes, 1);
        $finMes = $inicioMes->copy()->endOfMonth();

        // Dividir el mes en semanas
        $semanas = [];
        $diaActual = $inicioMes->copy();
        $semanaNum = 1;

        while ($diaActual <= $finMes) {
            $finSemana = $diaActual->copy()->addDays(6);
            if ($finSemana > $finMes) {
                $finSemana = $finMes->copy();
            }

            $semanas[] = [
                'numero' => $semanaNum,
                'inicio' => $diaActual->copy(),
                'fin' => $finSemana->copy(),
            ];

            $diaActual->addDays(7);
            $semanaNum++;
        }

        foreach ($semanas as $semana) {
            $punto = ['periodo' => $semana['numero']];

            foreach ($servicios as $servicio) {
                $resultado = Transaccion::where('servicio_id', $servicio->id)
                    ->whereBetween('created_at', [$semana['inicio'], $semana['fin']])
                    ->selectRaw('SUM(cantidad) as total_cantidad')
                    ->first();

                $cantidad = $resultado->total_cantidad ?? 0;
                $punto["{$servicio->nombre}_cantidad"] = (int) $cantidad;
                $punto["{$servicio->nombre}_ingresos"] = (float) ($cantidad * $servicio->precio);
            }

            $data[] = $punto;
        }

        return $data;
    }

    /**
     * Uso de servicios por hora (para granularidad día)
     */
    private function getUsoServiciosPorHora($servicios, $anio, $mes, $dia)
    {
        $data = [];
        $fecha = Carbon::create($anio, $mes, $dia);

        for ($hora = 0; $hora < 24; $hora++) {
            $punto = ['periodo' => $hora];

            foreach ($servicios as $servicio) {
                $resultado = Transaccion::where('servicio_id', $servicio->id)
                    ->whereDate('created_at', $fecha)
                    ->whereRaw('EXTRACT(HOUR FROM created_at) = ?', [$hora])
                    ->selectRaw('SUM(cantidad) as total_cantidad')
                    ->first();

                $cantidad = $resultado->total_cantidad ?? 0;
                $punto["{$servicio->nombre}_cantidad"] = (int) $cantidad;
                $punto["{$servicio->nombre}_ingresos"] = (float) ($cantidad * $servicio->precio);
            }

            $data[] = $punto;
        }

        return $data;
    }
}
