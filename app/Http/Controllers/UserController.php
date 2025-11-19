<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $users = User::latest()->paginate(10)->through(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);

        return Inertia::render('Usuarios/UsuariosPage',[
            'usuariosPaginados' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuarios/UsuariosCreatePage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        User::create($validated);
        return redirect()->back()
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Usuarios/UsuariosUpdatePage', [
            'usuario' => $user,
        ]);
    }
    
    public function update(Request $request, User $user)
    {
        // Validación dinámica: si se envía password, lo validamos
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ];
    
        if ($request->filled('password')) {
            $rules['password'] = 'required|string|min:8|confirmed';
        }
    
        $validated = $request->validate($rules);
    
        $user->name = $validated['name'];
        $user->email = $validated['email'];
    
        if ($request->filled('password')) {
            $user->password = bcrypt($validated['password']);
        }
    
        $user->save();
    
        return back()->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
