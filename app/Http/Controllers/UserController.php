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
    public function index(Request $request)
    {
        $query = User::query()->with('roles');

        // Filtrar por búsqueda (nombre, email, username)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('username', 'like', "%{$search}%");
            });
        }

        // Filtrar por rol
        if ($request->filled('role') && $request->role !== 'todos') {
            $role = $request->role;
            $query->whereHas('roles', function($q) use ($role) {
                $q->where('name', $role);
            });
        }

        $users = $query->latest()->paginate(10)->through(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'edad' => $user->edad,
            'sexo' => $user->sexo,
            'telefono' => $user->telefono,
            'tipo_nacionalidad' => $user->tipo_nacionalidad,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
            'role' => $user->roles->first()?->name ?? 'cliente', // Asumimos un rol principal
        ]);

        return Inertia::render('Usuarios/UsuariosPage', [
            'usuariosPaginados' => $users,
            'filters' => $request->only(['search', 'role']),
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'edad' => 'nullable|integer|min:1|max:120',
            'sexo' => 'nullable|in:M,F',
            'telefono' => 'nullable|string|max:20',
            'tipo_nacionalidad' => 'required|string',
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'edad' => $validated['edad'],
            'sexo' => $validated['sexo'],
            'telefono' => $validated['telefono'],
            'tipo_nacionalidad' => $validated['tipo_nacionalidad'],
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Usuarios/UsuariosShowPage', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'edad' => $user->edad,
                'sexo' => $user->sexo,
                'telefono' => $user->telefono,
                'tipo_nacionalidad' => $user->tipo_nacionalidad,
                'email_verified_at' => $user->email_verified_at,
                'role' => $user->roles->first()?->name ?? 'cliente',
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Usuarios/UsuariosUpdatePage', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'edad' => $user->edad,
                'sexo' => $user->sexo,
                'telefono' => $user->telefono,
                'tipo_nacionalidad' => $user->tipo_nacionalidad,
                'email_verified_at' => $user->email_verified_at,
                'role' => $user->roles->first()?->name ?? 'cliente',
            ],
        ]);
    }
    
    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'edad' => 'nullable|integer|min:1|max:120',
            'sexo' => 'nullable|in:M,F',
            'telefono' => 'nullable|string|max:20',
            'tipo_nacionalidad' => 'required|string',
            'role' => 'required|string|exists:roles,name',
            'email_verified_at' => 'boolean',
        ];
    
        if ($request->filled('password')) {
            $rules['password'] = 'required|string|min:8|confirmed';
        }
    
        $validated = $request->validate($rules);
    
        $user->fill([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'edad' => $validated['edad'],
            'sexo' => $validated['sexo'],
            'telefono' => $validated['telefono'],
            'tipo_nacionalidad' => $validated['tipo_nacionalidad'],
        ]);

        if ($request->filled('password')) {
            $user->password = bcrypt($validated['password']);
        }

        if ($request->has('email_verified_at')) {
            if ($request->email_verified_at && !$user->email_verified_at) {
                $user->email_verified_at = now();
            } elseif (!$request->email_verified_at) {
                $user->email_verified_at = null;
            }
        }
    
        $user->save();

        $user->syncRoles([$validated['role']]);
    
        return redirect()->route('usuarios.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
