<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Models\Categoria;
use App\Models\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $categorias = Categoria::where('tipo', 'servicio')->get(['id', 'nombre']);
        return inertia('Servicios/ServiciosCreatePage', [
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
        $servicio = Servicio::with('categoria')->findOrFail($servicio->id);

        // Retornar la vista con los datos del platillo
        return Inertia::render('Servicios/ServicioShow', [
            'servicio' => [
                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'descripcion' => $servicio->descripcion,
                'precio' => $servicio->precio,
                'estado' => $servicio->estado,
                'categoria' => $servicio->categoria,
                'created_at' => $servicio->created_at->format('d/m/Y H:i'),
                'updated_at' => $servicio->updated_at->format('d/m/Y H:i'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Servicio $servicio)
    {
        //
        $categorias = Categoria::where('estado', 'activo')->where('tipo','servicio')->get(['id', 'nombre']);

        return Inertia::render('Servicios/ServicioEdit', [
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
            'nombre' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|in:activo,inactivo',
        ]);

        $servicio->update($validated);

        return redirect()->route('servicios.index')->with('success', 'Servicio actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Servicio $servicio)
    {
        //
    }

    public function galeria(Servicio $servicio)
    {
        // Cargar las imágenes relacionadas con el servicio
        $imagenes = $servicio->imagenes()->get(['id', 'url_image','created_at'])->map(function ($imagen) {
            return [
                'id' => $imagen->id,
                'url' => $imagen->url, // Usa el accesor para obtener la URL completa
                'created_at' => $imagen->created_at->format('d/m/Y H:i'),
            ];
        });

        return inertia('Servicios/ServicioGaleria', [
            'servicioId' => $servicio->id,
            'servicioNombre' => $servicio->nombre,
            'imagenes' => $imagenes,
        ]);
    }


    public function subirImagen(Request $request, Servicio $servicio)
    {
        // Validar la imagen
        $request->validate([
            'imagen' => 'required|image|max:2048', // Máximo 2MB
        ]);

        // Guardar la imagen en el almacenamiento público
        $path = $request->file('imagen')->store('servicios', 'public');

        // Crear el registro de la imagen asociada al servicio
        $servicio->imagenes()->create([
            'url_image' => $path,
        ]);

        return back()->with('success', 'Imagen subida correctamente.');
    }


    public function eliminarImagen(Imagen $imagen)
    {
        // Eliminar el archivo de almacenamiento
        Storage::disk('public')->delete($imagen->url_image);

        // Eliminar el registro de la base de datos
        $imagen->delete();

        return back()->with('success', 'Imagen eliminada correctamente.');
    }
}
