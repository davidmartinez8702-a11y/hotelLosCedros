<?php

namespace App\Http\Controllers;

use App\Models\Checkin;
use App\Models\Cliente;
use App\Models\Reserva;
use App\Models\User;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
    public function dashboardCliente()
    {
        $usuarioAutenticado = Auth::user(); 
        
        // 1. Perfil del Cliente
        // CORRECTO: Carga directamente la relación 'documento' que existe en el modelo User
        $usuarioConDocumento = User::with('documento')->find($usuarioAutenticado->id);
        
        // Ahora puedes acceder al documento. Si el usuario no tiene documento, $usuarioConDocumento->documento será null.
        $perfilCompleto = $usuarioConDocumento->documento !== null;
        $clienteId = $usuarioAutenticado->id; // El ID del cliente es el ID del usuario
        
        // ... y el resto de tu lógica.

        // 2. Reserva ACTIVA (Check-in en curso)
        $estanciaActual = Checkin::with([
            // ...
            ])
            ->where('cliente_id', $clienteId) // Usamos el ID del usuario
            ->whereNull('fecha_salida')
            // ...
            ->first();

        // 3. Próximas Reservas
        // Reservas que aún no han sido utilizadas para un check-in y están pendientes/confirmadas
        $proximasReservas = Reserva::with('hospedajes.tipoHabitacion')
            ->where('cliente_id', $usuarioAutenticado->id)
            ->where('fecha_reserva', '>', Carbon::today())
            ->whereIn('estado', ['pendiente', 'confirmada'])
            ->orderBy('fecha_reserva', 'asc')
            ->limit(3)
            ->get();

        // 4. Historial de Reservas (Pagado/Finalizado)
        $historialReservas = Reserva::with('hospedajes.tipoHabitacion')
            ->where('cliente_id', $usuarioAutenticado->id)
            ->whereIn('estado', ['finalizado', 'pagado']) // Asumiendo estos estados para historial
            ->orderBy('fecha_reserva', 'desc')
            ->limit(5)
            ->get();
            
        // 5. Total gastado (Métricas de fidelidad)
        $totalGastado = Checkin::where('cliente_id', $usuarioAutenticado->id)
            ->whereHas('cuenta', function ($query) {
                $query->where('estado', 'pagado'); // Solo cuentas pagadas
            })
            ->join('cuentas', 'checkins.id', '=', 'cuentas.checkin_id')
            ->sum('cuentas.monto_total');

        return Inertia::render('Dashboards/DashboardCliente', [
            'perfil' => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'documento_completo' => $perfilCompleto,
                'gasto_total' => $totalGastado,
            ],
            'estanciaActual' => $estanciaActual,
            'proximasReservas' => $proximasReservas,
            'historialReservas' => $historialReservas,
        ]);
    }
}
