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
    
        if ($user->hasRole('admin') || $user->hasRole('super-admin')) {
            // Usamos route('dashboard.admin') que definiste en web.php
            return redirect()->intended(route('dashboard.admin')); 
        }

        
        return redirect()->intended(route('dashboard.user')); 
    }
}