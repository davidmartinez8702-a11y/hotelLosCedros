<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PrediccionController extends Controller
{
    private $microservicioUrl = 'http://localhost:5000'; // Ajusta al puerto de tu microservicio

    public function index()
    {
        return Inertia::render('Prediccion/PrediccionPage');
    }

    public function predecirDemanda($dias)
    {
        try {
            $response = Http::get("{$this->microservicioUrl}/api/predict/demand/{$dias}");

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'data' => $response->json(),
                    'tipo' => 'demanda'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener predicción de demanda'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function predecirIngresos($dias)
    {
        try {
            $response = Http::get("{$this->microservicioUrl}/api/predict/revenue/{$dias}");

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'data' => $response->json(),
                    'tipo' => 'ingresos'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener predicción de ingresos'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function predecirCancelaciones($dias)
    {
        try {
            $response = Http::get("{$this->microservicioUrl}/api/predict/cancellations/{$dias}");

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'data' => $response->json(),
                    'tipo' => 'cancelaciones'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener predicción de cancelaciones'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generarReporte(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:demanda,ingresos,cancelaciones',
            'data' => 'required|array',
            'dias' => 'required|integer'
        ]);

        $data = [
            'tipo' => $request->tipo,
            'predicciones' => $request->data,
            'dias' => $request->dias,
            'fecha_generacion' => now()->format('d/m/Y H:i:s'),
            'titulo' => $this->getTituloReporte($request->tipo)
        ];

        $pdf = Pdf::loadView('reportes.predicciones', $data);
        
        return $pdf->download("reporte-prediccion-{$request->tipo}-" . now()->format('Y-m-d') . ".pdf");
    }

    private function getTituloReporte($tipo)
    {
        return match($tipo) {
            'demanda' => 'Predicción de Demanda de Habitaciones',
            'ingresos' => 'Predicción de Ingresos',
            'cancelaciones' => 'Predicción de Cancelaciones',
            default => 'Reporte de Predicción'
        };
    }
}
