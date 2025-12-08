<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Categoria::query();

        if ($request->filled('search')) {
            $query->where('nombre', 'like', "%{$request->search}%");
        }

        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('tipo') && $request->tipo !== 'todos') {
            $query->where('tipo', $request->tipo);
        }

        $categorias = $query->latest()->paginate(10)->through(fn($categoria) => [
            'id' => $categoria->id,
            'nombre' => $categoria->nombre,
            'estado' => $categoria->estado,
            'tipo' => $categoria->tipo,
        ]);

        return Inertia::render('Categorias/CategoriasPage', [
            'categorias' => $categorias,
            'filters' => $request->only(['search', 'estado', 'tipo']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categorias/CategoriasCreatePage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias',
            'estado' => 'required|in:activo,inactivo',
            'tipo' => 'required|in:habitacion,platillo,servicio',
        ]);

        Categoria::create($validated);

        return redirect()->route('categorias.index')
            ->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        return Inertia::render('Categorias/CategoriasShowPage', [
            'categoria' => [
                'id' => $categoria->id,
                'nombre' => $categoria->nombre,
                'tipo' => $categoria->tipo,
                'estado' => $categoria->estado,
                'created_at' => $categoria->created_at->format('d/m/Y H:i'),
                'updated_at' => $categoria->updated_at->format('d/m/Y H:i'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        return Inertia::render('Categorias/CategoriasUpdatePage', [
            'categoria' => $categoria
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias,nombre,' . $categoria->id,
            'estado' => 'required|in:activo,inactivo',
            'tipo' => 'required|in:habitacion,platillo,servicio',
        ]);

        $categoria->update($validated);

        return redirect()->route('categorias.index')
            ->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        //
    }
}
