<?php

use App\CustomLoginResponse;
use App\Http\Controllers\Auth\CustomAuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServicioController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    // return Inertia::render('welcome', [
    //     'canRegister' => Features::enabled(Features::registration()),
    // ]);
    return Inertia::render('Landing/LandingPage');
})->name('home');

Route::get('/login', function (Request $request) {
    return Inertia::render('auth/Login',[
        'email' => $request->query('email')
    ]);
})->name('login');

// Ruta para el registro (opcional)
Route::get('/register', function () {
    return Inertia::render('auth/Register');
})->name('register');

//backend de login y register
Route::post('/custom-login', [CustomAuthController::class, 'login'])->name('custom.login');
Route::post('/custom-register', [CustomAuthController::class, 'register'])->name('custom.register');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin/dashboard', [AuthController::class, 'adminDashboard'])->name('dashboard.administrador');
    Route::get('recepcion/dashboard', [AuthController::class, 'recepcionDashboard'])->name('dashboard.recepcion');
    Route::get('cliente/dashboard', [AuthController::class, 'clientDashboard'])->name('dashboard.cliente');

    Route::prefix('usuarios')->name('usuarios.')->group(function(){
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
    });

    Route::prefix('configuracion')->name('configuracion.')->group(function(){
        Route::get('/', [ConfiguracionController::class, 'index'])->name('index');
    });

    Route::prefix('categorias')->name('categorias.')->group(function(){
        Route::get('/', [CategoriaController::class, 'index'])->name('index');
        Route::get('/create', [CategoriaController::class, 'create'])->name('create');
        Route::post('/', [CategoriaController::class, 'store'])->name('store');
        Route::get('/{categoria}', [CategoriaController::class, 'show'])->name('show');
        Route::get('/{categoria}/edit', [CategoriaController::class, 'edit'])->name('edit');
        Route::put('/{categoria}', [CategoriaController::class, 'update'])->name('update');
    });
    Route::prefix('servicios')->name('servicios.')->group(function(){
        Route::get('/', [ServicioController::class, 'index'])->name('index');
        Route::get('/create', [ServicioController::class, 'create'])->name('create');
        Route::post('/', [ServicioController::class, 'store'])->name('store');
        Route::get('/{servicio}', [ServicioController::class, 'show'])->name('show');
        Route::get('/{servicio}/edit', [ServicioController::class, 'edit'])->name('edit');
        Route::put('/{servicio}', [ServicioController::class, 'update'])->name('update');
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
