<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
       // if (app()->environment('local')) {
        // DB::listen(function ($query) {
        //     // Guarda la consulta SQL y los parámetros de enlace en el log de Laravel
        //     Log::info(
        //         $query->sql,
        //         ['bindings' => $query->bindings, 'time' => $query->time]
        //     );
        // });
        // }
    }
}
