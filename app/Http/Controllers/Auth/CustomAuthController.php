<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CustomAuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar autenticar al usuario
        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Redirigir según el rol del usuario
            if ($user->hasRole('administrador')) {
                return redirect()->route('dashboard.administrador');
            } elseif ($user->hasRole('recepcionista')) {
                return redirect()->route('recepcionista.dashboard');
            } elseif ($user->hasRole('cliente')) {
                return redirect()->route('dashboard.cliente');
            }

            // Redirigir a una ruta por defecto si no tiene un rol específico
            return redirect()->route('dashboard');
        }

        // Si las credenciales son incorrectas
        return back()->withErrors([
            'email' => 'Las credenciales proporcionadas no son correctas.',
        ]);
    }

    private function generateUsername(string $name): string
    {
        // Convertir el nombre a minúsculas y reemplazar espacios por guiones bajos
        $baseUsername = strtolower(str_replace(' ', '_', $name));

        // Verificar si el username ya existe
        $username = $baseUsername;
        $counter = 1;

        // while (User::where('username', $username)->exists()) {
        //     $username = $baseUsername . '_' . $counter;
        //     $counter++;
        // }

        return $username;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'sexo' => 'nullable|string|in:M,F', // M para masculino, F para femenino
            'tipo_nacionalidad' => 'nullable|string|in:nacional,extranjero',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try{
            DB::beginTransaction();
            $user = User::create([
                'name' => $request->name,
                'username' => $this->generateUsername($request->name), // Generar el username
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'sexo' => $request->sexo ?? null, // Si no se proporciona, será null
                'tipo_nacionalidad' => $request->tipo_nacionalidad ?? 'nacional', // Valor predeterminado
            ]);
            $user->assignRole('cliente');
            Cliente::create([
                'id' => $user->id,
            ]);
            DB::commit();

            // Redirigir al login con el email como parámetro
            return Inertia::location(route('login', ['email' => $user->email]));
        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'message' => 'Error al registrar el usuario: ' . $e->getMessage(),
            ], 500);
        }
    }
}