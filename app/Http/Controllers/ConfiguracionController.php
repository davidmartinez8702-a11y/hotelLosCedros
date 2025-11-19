<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfiguracionController extends Controller
{
    //
    public function index(){
        return Inertia::render('Configuracion/ConfiguracionPage');
    }
}
