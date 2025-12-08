<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PrediccionController extends Controller
{
    private $microservicioUrl = 'http://localhost:5000';

    public function index()
    {
        return Inertia::render('Prediccion/PrediccionPage');
    }

    public function predecirDemanda($dias)
    {
        try {
            $response = Http::timeout(30)->get("{$this->microservicioUrl}/api/predict/demand/{$dias}");

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
                'message' => 'No se pudo conectar con el microservicio: ' . $e->getMessage()
            ], 500);
        }
    }

    public function predecirIngresos($dias)
    {
        try {
            $response = Http::timeout(30)->get("{$this->microservicioUrl}/api/predict/revenue/{$dias}");

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
                'message' => 'No se pudo conectar con el microservicio: ' . $e->getMessage()
            ], 500);
        }
    }

    public function predecirCancelaciones($dias)
    {
        try {
            $response = Http::timeout(30)->get("{$this->microservicioUrl}/api/predict/cancellations/{$dias}");

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
                'message' => 'No se pudo conectar con el microservicio: ' . $e->getMessage()
            ], 500);
        }
    }

    public function generarReporte(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:demanda,ingresos,cancelaciones',
            'data' => 'required|string',
            'dias' => 'required|integer'
        ]);

        // Decodificar el JSON
        $predicciones = json_decode($request->data, true);

        if (!$predicciones) {
            return back()->with('error', 'Datos de predicción inválidos');
        }

        $data = [
            'tipo' => $request->tipo,
            'predicciones' => $predicciones,
            'dias' => $request->dias,
            'fecha_generacion' => now()->format('d/m/Y H:i:s'),
            'titulo' => $this->getTituloReporte($request->tipo)
        ];

        $pdf = Pdf::loadView('reportes.predicciones', $data)
                  ->setPaper('letter', 'portrait')
                  ->setOption('margin-top', 10)
                  ->setOption('margin-bottom', 10)
                  ->setOption('margin-left', 15)
                  ->setOption('margin-right', 15);
        
        $filename = "reporte-prediccion-{$request->tipo}-" . now()->format('Y-m-d-His') . ".pdf";
        
        return $pdf->download($filename);
    }

    private function getTituloReporte($tipo)
    {
        return match($tipo) {
            'demanda' => 'Predicción de Demanda de Habitaciones',
            'ingresos' => 'Predicción de Ingresos Esperados',
            'cancelaciones' => 'Predicción de Cancelaciones',
            default => 'Reporte de Predicción'
        };
    }
}
