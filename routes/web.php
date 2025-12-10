<?php

use App\CustomLoginResponse;
use App\Http\Controllers\Auth\CustomAuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BIController;
use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PlatilloController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\TipoHabitacionController;
use App\Http\Controllers\PrediccionController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Ramsey\Uuid\Type\Time;

Route::get('/', function () {
    // return Inertia::render('welcome', [
    //     'canRegister' => Features::enabled(Features::registration()),
    // ]);
    return Inertia::render('Landing/LandingPage');
})->name('home');

Route::get('/login', function (Request $request) {
    return Inertia::render('auth/Login', [
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

    Route::prefix('usuarios')->name('usuarios.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
    });

    Route::prefix('configuracion')->name('configuracion.')->group(function () {
        Route::get('/', [ConfiguracionController::class, 'index'])->name('index');
    });

    Route::prefix('categorias')->name('categorias.')->group(function () {
        Route::get('/', [CategoriaController::class, 'index'])->name('index');
        Route::get('/create', [CategoriaController::class, 'create'])->name('create');
        Route::post('/', [CategoriaController::class, 'store'])->name('store');
        Route::get('/{categoria}', [CategoriaController::class, 'show'])->name('show');
        Route::get('/{categoria}/edit', [CategoriaController::class, 'edit'])->name('edit');
        Route::put('/{categoria}', [CategoriaController::class, 'update'])->name('update');
    });
    Route::prefix('servicios')->name('servicios.')->group(function () {
        Route::get('/', [ServicioController::class, 'index'])->name('index');
        Route::get('/create', [ServicioController::class, 'create'])->name('create');
        Route::post('/', [ServicioController::class, 'store'])->name('store');
        Route::get('/{servicio}', [ServicioController::class, 'show'])->name('show');
        Route::get('/{servicio}/edit', [ServicioController::class, 'edit'])->name('edit');
        Route::put('/{servicio}', [ServicioController::class, 'update'])->name('update');

        Route::get('/{servicio}/galeria', [ServicioController::class, 'galeria'])->name('galeria');
        Route::post('/{servicio}/imagenes', [ServicioController::class, 'subirImagen'])->name('imagenes.subir');
        Route::delete('/imagenes/{imagen}', [ServicioController::class, 'eliminarImagen'])->name('imagenes.eliminar');
    });


    Route::prefix('tipoHabitacion')->name('tipo-habitacion.')->group(function () {
        Route::get('/', [TipoHabitacionController::class, 'index'])->name('index');
        Route::get('/create', [TipoHabitacionController::class, 'create'])->name('create');
        Route::post('/', [TipoHabitacionController::class, 'store'])->name('store');
        Route::get('/{tipoHabitacion}', [TipoHabitacionController::class, 'show'])->name('show');
        Route::get('/{tipoHabitacion}/edit', [TipoHabitacionController::class, 'edit'])->name('edit');
        Route::put('/{tipoHabitacion}', [TipoHabitacionController::class, 'update'])->name('update');

        Route::get('/{tipoHabitacion}/galeria', [TipoHabitacionController::class, 'galeria'])->name('galeria');
        // Route::post('/{tipoHabitacion}/imagenes', [ServicioController::class, 'subirImagen'])->name('imagenes.subir');
        // Route::delete('/imagenes/{imagen}', [ServicioController::class, 'eliminarImagen'])->name('imagenes.eliminar');
        Route::get('/{tipoHabitacion}/galeria', [TipoHabitacionController::class, 'galeria'])->name('galeria');
        Route::post('/{tipoHabitacion}/imagenes', [TipoHabitacionController::class, 'subirImagen'])->name('imagenes.subir');
        Route::delete('/imagenes/{imagen}', [TipoHabitacionController::class, 'eliminarImagen'])->name('imagenes.eliminar');
    });



    Route::prefix('platillos')->name('platillos.')->group(function () {
        Route::get('/', [PlatilloController::class, 'index'])->name('index');
        Route::get('/create', [PlatilloController::class, 'create'])->name('create');
        Route::post('/', [PlatilloController::class, 'store'])->name('store');
        Route::get('/{platillo}', [PlatilloController::class, 'show'])->name('show');
        Route::get('/{platillo}/edit', [PlatilloController::class, 'edit'])->name('edit');
        Route::post('/{platillo}', [PlatilloController::class, 'update'])->name('update'); //post por que tiene imagen
    });

    // Rutas de Business Intelligence
    Route::get('/BI', function () {
        return Inertia::render('BI/BIHotelGenerico');
    })->name('bi.index');

    Route::get('/BI-dinamico', function () {
        return Inertia::render('BI/BIHotelDinamico');
    })->name('bi.index-dinamico');


    Route::get('/BI-v2', function () {
        return Inertia::render('BI/BIDashboard');
    })->name('bi.index-v2');

    // API endpoints para BI
});
Route::get('/api/bi/evolucion-servicios', [BIController::class, 'getEvolucionServicios'])->name('bi.api.evolucion-servicios');
Route::get('/api/bi/uso-servicios', [BIController::class, 'getUsoServicios'])->name('bi.api.uso-servicios');

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

require __DIR__ . '/settings.php';

Route::middleware(['auth'])->group(function () {
    // Vista principal
    Route::get('/predicciones', [PrediccionController::class, 'index'])
        ->name('predicciones.index');
    
    // Endpoints de predicción (GET con parámetro en URL)
    Route::get('/predicciones/demanda/{dias}', [PrediccionController::class, 'predecirDemanda'])
        ->name('predicciones.demanda');
    
    Route::get('/predicciones/ingresos/{dias}', [PrediccionController::class, 'predecirIngresos'])
        ->name('predicciones.ingresos');
    
    Route::get('/predicciones/cancelaciones/{dias}', [PrediccionController::class, 'predecirCancelaciones'])
        ->name('predicciones.cancelaciones');
    
    // Generar reporte PDF
    Route::post('/predicciones/reporte', [PrediccionController::class, 'generarReporte'])
        ->name('predicciones.reporte');
});

use App\Http\Controllers\ClasificacionClienteController;

Route::middleware(['auth'])->group(function () {
    // Vista K-means
    Route::get('/kmeans', function () {
        return Inertia::render('Kmeans/KmeansPage');
    })->name('kmeans.index');

    
    Route::get('/kmeans/validar', [ClasificacionClienteController::class, 'validarDatosSuficientes'])
        ->name('kmeans.validar');
    
    
    Route::post('/clientes/{id}/clasificar', [ClasificacionClienteController::class, 'clasificarCliente'])
        ->name('clientes.clasificar');
    
    
    Route::post('/clientes/clasificar-lote', [ClasificacionClienteController::class, 'clasificarClientesEnLote'])
        ->name('clientes.clasificar.lote');
    
    
    Route::get('/clientes/clasificaciones', [ClasificacionClienteController::class, 'verClasificacionesGuardadas'])
        ->name('clientes.clasificaciones');
    
    
    Route::get('/kmeans/estadisticas', [ClasificacionClienteController::class, 'estadisticas'])
        ->name('kmeans.estadisticas');

    Route::get('/kmeans/test-hardcoded', [ClasificacionClienteController::class, 'probarConDatosHardcodeados'])
        ->name('kmeans.test.hardcoded');
    
    Route::get('/kmeans/logs', [ClasificacionClienteController::class, 'verLogs'])
        ->name('kmeans.logs');
});
