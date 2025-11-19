<?php

use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::prefix('usuarios')->name('usuarios.')->group(function(){
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
    });

    Route::prefix('configuracion')->name('configuracion.')->group(function(){
        Route::get('/', [ConfiguracionController::class, 'index'])->name('index');
    });
});

//rutas agrupadas
// Route::middleware(['auth','verified'])->group(function(){

//     Route::prefix('usuarios')->name('usuarios.')->group(function(){
//         Route::get('/', [UserController::class, 'index'])->name('index');
//         Route::get('/create', [UserController::class, 'create'])->name('create');
//         Route::post('/store', [UserController::class, 'store'])->name('store');
//         Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
//     });

//     Route::prefix('configuracion')->name('configuracion.')->group(function(){
//         Route::get('/', [ConfiguracionController::class, 'index'])->name('index');
//     });
// });

//rutas separadas
// Route::get('/usuarios', [UserController::class, 'index'])
//     ->name('usuarios.index')
//     ->middleware(['auth', 'verified']);

// Route::get('/usuarios/create', [UserController::class, 'create'])
//     ->name('usuarios.create');

// Route::post('/usuarios/store', [UserController::class, 'store'])
//     ->name('usuarios.store');

// Route::get('usuarios/{user}/edit', [UserController::class, 'edit'])
//     ->name('usuarios.edit');

//rutas validas solo para crud
// Route::resource('usuarios', UserController::class)
//     ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']) 
//     ->middleware(['auth', 'verified'])
//     ->names([
//         'index' => 'usuarios.index',
//         'create' => 'usuarios.create',
//         'store' => 'usuarios.store',
//         'edit' => 'usuarios.edit',      
//         'update' => 'usuarios.update',  
//         'destroy' => 'usuarios.destroy',
//     ]);

require __DIR__.'/settings.php';
