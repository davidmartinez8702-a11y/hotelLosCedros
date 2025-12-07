<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Platillo;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PlatilloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager load la relación 'categoria' para acceder al nombre en el frontend
        $query = Platillo::with('categoria');

        // Filtro por búsqueda
        if ($request->filled('search')) {
            $query->where('nombre', 'like', "%{$request->search}%");
        }

        // Filtro por estado
        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        // Paginación y transformación de datos
        $platillos = $query->latest()->paginate(10)->through(fn ($platillo) => [
            'id' => $platillo->id,
            'nombre' => $platillo->nombre,
            'precio' => $platillo->precio,
            'estado' => $platillo->estado,
            'categoria' => [
                'nombre' => $platillo->categoria->nombre,
            ],
        ]);

        // Renderizar la vista con Inertia
        return Inertia::render('Platillos/PlatillosPage', [
            'platillos' => $platillos,
            'filters' => $request->only(['search', 'estado']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categorias = Categoria::all(['id', 'nombre']);


        return Inertia::render('Platillos/PlatillosCreatePage', [
            'categorias' => $categorias,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'descripcion' => 'nullable|string',
            'ingredientes' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|in:disponible,no disponible',
            'imagen' => 'nullable|image|max:2048', // Máximo 2MB
        ]);
    
        // Manejar la imagen si se proporciona
        if ($request->hasFile('imagen')) {
            $validated['image_url'] = $request->file('imagen')->store('platillos', 'public');
        }
    
        // Crear el nuevo platillo
        Platillo::create($validated);
    
        // Redirigir con un mensaje de éxito
        return redirect()->route('platillos.index')->with('success', 'Platillo creado correctamente.');
    
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Buscar el platillo con su categoría
        $platillo = Platillo::with('categoria')->findOrFail($id);

        // Retornar la vista con los datos del platillo
        return Inertia::render('Platillos/PlatilloShow', [
            'platillo' => [
                'id' => $platillo->id,
                'nombre' => $platillo->nombre,
                'descripcion' => $platillo->descripcion,
                'ingredientes' => $platillo->ingredientes,
                'image_url' => $platillo->image_url,
                'precio' => $platillo->precio,
                'estado' => $platillo->estado,
                'categoria' => $platillo->categoria->nombre,
                // 'created_at' => $platillo->created_at->format('d/m/Y H:i'),
                // 'updated_at' => $platillo->updated_at->format('d/m/Y H:i'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Platillo $platillo)
    {
        //
        $categorias = Categoria::all(['id', 'nombre']);


        return Inertia::render('Platillos/PlatilloEdit', [
            'platillo' => $platillo,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Platillo $platillo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'descripcion' => 'nullable|string',
            'ingredientes' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|in:disponible,no disponible',
            'imagen' => 'nullable|image|max:2048', // Máximo 2MB
        ]);
    
        DB::beginTransaction(); // Iniciar la transacción
    
        try {
            // Si se sube una nueva imagen, guardarla y eliminar la anterior
            if ($request->hasFile('imagen')) {
                if ($platillo->image_url) {
                    Storage::delete($platillo->image_url);
                }
                $validated['image_url'] = $request->file('imagen')->store('platillos','public');
            }
    
            // Actualizar el platillo
            $platillo->update($validated);
    
            DB::commit(); // Confirmar la transacción
    
            return redirect()->route('platillos.index')->with('success', 'Platillo actualizado correctamente.');
        } catch (Exception $e) {
            DB::rollBack(); // Revertir la transacción en caso de error
            // dd($e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Ocurrió un error al actualizar el platillo.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Platillo $platillo)
    {
        //
    }
}
