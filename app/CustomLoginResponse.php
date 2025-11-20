<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse;
use Illuminate\Http\RedirectResponse;

class CustomLoginResponse implements LoginResponse
{
    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function toResponse($request): RedirectResponse
    {
        $user = Auth::user();

        if (is_null($user)) {
             return redirect()->route('login');
        }

        // 2. Lógica de Redirección Condicional
    
        if ($user->hasRole('administrador')) {
            return redirect()->intended(route('dashboard.administrador')); 
        }
        if( $user -> hasRole('recepcionista')){
            return redirect()->intended(route('dashboard.recepcion'));

        }
        if ($user->hasRole('cliente')) {
            return redirect()->intended(route('dashboard.cliente'));
        }
        // si no tiene rol especifico
        return redirect()->intended(config('fortify.home', '/dashboard'));
    }
}