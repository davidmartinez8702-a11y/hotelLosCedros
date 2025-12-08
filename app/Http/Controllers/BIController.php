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
}
