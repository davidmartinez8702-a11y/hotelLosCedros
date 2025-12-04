<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
      public function index(Request $request)
    {
        // Eager load la relación 'categoria' para acceder al nombre en el frontend
        $query = Servicio::with('categoria');

        if ($request->filled('search')) {
            $query->where('nombre', 'like', "%{$request->search}%");
        }

        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        $servicios = $query->latest()->paginate(10)->through(fn ($servicio) => [
            'id' => $servicio->id,
            'nombre' => $servicio->nombre,
            'precio' => $servicio->precio,
            'estado' => $servicio->estado,
            // Proporcionar solo el nombre de la categoría para la tabla
            'categoria' => [
                'nombre' => $servicio->categoria->nombre,
            ],
        ]);

        return Inertia::render('Servicios/ServiciosPage', [
            'servicios' => $servicios,
            'filters' => $request->only(['search', 'estado']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
     public function create()
    {
        // Se asume que solo quieres mostrar categorías activas para crear un servicio
        $categorias = Categoria::where('estado', 'activo')->get(['id', 'nombre']);
        return Inertia::render('Servicios/ServiciosCreatePage', [
            'categorias' => $categorias,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'nombre' => 'required|string|max:255|unique:servicios',
            #'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0.01',
            'estado' => 'required|in:activo,inactivo',
        ]);

        Servicio::create($validated);

        return redirect()->route('servicios.index')
            ->with('success', 'Servicio creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Servicio $servicio)
    {
        //
        $servicio->load('categoria');

        return Inertia::render('Servicios/ServiciosShowPage', [
            'servicio' => $servicio
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Servicio $servicio)
    {
        //
        $categorias = Categoria::where('estado', 'activo')->get(['id', 'nombre']);

        return Inertia::render('Servicios/ServiciosUpdatePage', [
            'servicio' => $servicio,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Servicio $servicio)
    {
        $validated = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'nombre' => 'required|string|max:255|unique:servicios,nombre,' . $servicio->id,
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0.01',
            'estado' => 'required|in:activo,inactivo',
        ]);

        $servicio->update($validated);

        return redirect()->route('servicios.index')
            ->with('success', 'Servicio actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Servicio $servicio)
    {
        //
    }
}
