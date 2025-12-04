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

        $categorias = $query->latest()->paginate(10)->through(fn($categoria) => [
            'id' => $categoria->id,
            'nombre' => $categoria->nombre,
            'estado' => $categoria->estado,
        ]);

        return Inertia::render('Categorias/CategoriasPage', [
            'categorias' => $categorias,
            'filters' => $request->only(['search', 'estado']),
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
            'categoria' => $categoria
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
