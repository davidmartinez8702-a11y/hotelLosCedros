<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatN8nController extends Controller
{
    /**
     * Enviar mensaje al flujo de n8n y obtener respuesta
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function send(Request $request): JsonResponse
    {
        // La ruta web ya valida que sea administrador, aquí es redundante
        // Solo validar que esté autenticado (lo hace el middleware)
        
        $request->validate([
            'message' => 'required|string|min:1|max:1000'
        ], [
            'message.required' => 'El mensaje es requerido',
            'message.min' => 'El mensaje debe tener al menos 1 carácter',
            'message.max' => 'El mensaje no puede exceder 1000 caracteres'
        ]);

        try {
            $n8nWebhookUrl = config('services.n8n.webhook_url');
            
            if (!$n8nWebhookUrl) {
                Log::error('N8N webhook URL no configurada');
                return response()->json([
                    'error' => 'La configuración de N8N no está disponible',
                    'success' => false
                ], 500);
            }

            // Preparar datos a enviar a n8n
            $payload = [
                'message' => $request->input('message'),
                'user_id' => Auth::id(),
                'user_email' => Auth::user()?->email,
                'user_name' => Auth::user()?->name,
                'timestamp' => now()->toIso8601String(),
                'source' => 'chat_web'
            ];

            Log::info('Enviando mensaje a N8N', [
                'webhook' => $n8nWebhookUrl,
                'message' => $request->input('message'),
                'user_id' => Auth::id()
            ]);

            // Enviar mensaje a n8n
            // Timeout de 120 segundos (2 minutos) porque n8n puede demorar
            $response = Http::timeout(120)
                ->connectTimeout(30)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->post($n8nWebhookUrl, $payload);

            if (!$response->successful()) {
                Log::error('Error en respuesta de N8N', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                
                return response()->json([
                    'error' => 'Error al conectar con el asistente N8N (HTTP ' . $response->status() . ')',
                    'success' => false
                ], 500);
            }

            $data = $response->json();

            // Validar que la respuesta tenga el campo esperado
            // n8n puede devolver en diferentes formatos: response, message, text, output, o directamente el contenido
            $responseText = match(true) {
                isset($data['response']) => $data['response'],
                isset($data['message']) => $data['message'],
                isset($data['text']) => $data['text'],
                isset($data['output']) => $data['output'],
                default => json_encode($data) // Si no encuentra, devuelve todo como JSON
            };

            // Si es array, convertir a string
            if (is_array($responseText)) {
                $responseText = json_encode($responseText);
            }

            $responseText = (string)$responseText ?: 'Respuesta recibida pero vacía';

            Log::info('Respuesta recibida de N8N', [
                'user_id' => Auth::id(),
                'response_length' => strlen($responseText)
            ]);

            return response()->json([
                'response' => $responseText,
                'success' => true,
                'timestamp' => now()->toIso8601String()
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validación fallida',
                'errors' => $e->errors(),
                'success' => false
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error en ChatN8nController', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'error' => 'Error interno del servidor',
                'message' => env('APP_DEBUG') ? $e->getMessage() : null,
                'success' => false
            ], 500);
        }
    }
}
