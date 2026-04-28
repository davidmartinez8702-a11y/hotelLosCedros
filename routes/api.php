<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\N8nHotelController;
use App\Http\Controllers\Api\ChatN8nController;

/**
 * Rutas de API Pública para n8n y agentes externos
 * 
 * Base URL: /api/n8n/
 * Estas rutas NO requieren autenticación ni token CSRF
 */

Route::prefix('n8n')->group(function () {
    // Información general del hotel
    Route::get('/informacion', [N8nHotelController::class, 'informacion'])
        ->name('api.n8n.informacion');

    // Disponibilidad de habitaciones
    Route::get('/disponibilidad', [N8nHotelController::class, 'disponibilidad'])
        ->name('api.n8n.disponibilidad');

    // Listar habitaciones
    Route::get('/habitaciones', [N8nHotelController::class, 'listarHabitaciones'])
        ->name('api.n8n.habitaciones');

    // Obtener promociones vigentes
    Route::get('/promociones', [N8nHotelController::class, 'promociones'])
        ->name('api.n8n.promociones');

    // Calcular precio
    Route::post('/calcular-precio', [N8nHotelController::class, 'calcularPrecio'])
        ->name('api.n8n.calcular-precio');

    // ✅ NUEVOS ENDPOINTS PARA SERVICIOS Y PLATILLOS
    
    // Obtener categorías (filtrable por tipo)
    Route::get('/categorias', [N8nHotelController::class, 'categorias'])
        ->name('api.n8n.categorias');

    // Listar servicios
    Route::get('/servicios', [N8nHotelController::class, 'servicios'])
        ->name('api.n8n.servicios');

    // Detalle de servicio específico
    Route::get('/servicios/{id}', [N8nHotelController::class, 'detalleServicio'])
        ->name('api.n8n.servicio-detalle');

    // Listar platillos
    Route::get('/platillos', [N8nHotelController::class, 'platillos'])
        ->name('api.n8n.platillos');

    // Detalle de platillo específico
    Route::get('/platillos/{id}', [N8nHotelController::class, 'detallePlatillo'])
        ->name('api.n8n.platillo-detalle');

    // Crear reserva completa (con servicios y platillos)
    Route::post('/reserva-completa', [N8nHotelController::class, 'reservaCompleta'])
        ->name('api.n8n.reserva-completa');
});
