<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    //
    public function adminDashboard()
    {
        return Inertia::render('Dashboards/DashboardAdministrador');
    }

    // Dashboard para Recepcionista
    public function recepcionDashboard()
    {
        return Inertia::render('Dashboards/DashboardRecepcionista');
    }

    // Dashboard para Cliente
    public function clientDashboard()
    {
        return Inertia::render('Dashboards/DashboardCliente');
    }

    // Dashboard general (original)
    public function dashboard()
    {
        return Inertia::render('dashboard');
    }
}
