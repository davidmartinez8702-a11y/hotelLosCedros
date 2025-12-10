<?php
// filepath: d:\DESARRROLLO\TALLER_DE_GRADO\Laravel-Hotel\app\Listeners\ClasificarClienteAlCheckout.php

namespace App\Listeners;

use App\Events\CheckoutCompletado;
use App\Http\Controllers\ClasificacionClienteController;

class ClasificarClienteAlCheckout
{
    public function handle(CheckoutCompletado $event)
    {
        $cliente = $event->cliente;
        
        // Clasificar solo si tiene al menos 2 reservas
        if ($cliente->reservas()->count() >= 2) {
            $controller = new ClasificacionClienteController();
            $controller->clasificarCliente($cliente->id);
        }
    }
}