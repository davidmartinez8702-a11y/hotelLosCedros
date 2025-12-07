<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\TipoHabitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TipoHabitacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Construir la consulta base
        $query = TipoHabitacion::query();

        // Aplicar filtro por estado
        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        // Aplicar filtro por tipo
        if ($request->filled('tipo') && $request->tipo !== 'todos') {
            $query->where('tipo', $request->tipo);
        }

        // Aplicar búsqueda por nombre
        if ($request->filled('search')) {
            $query->where('nombre', 'like', '%' . $request->search . '%');
        }

        // Obtener los datos paginados
        $tipoHabitaciones = $query->paginate(10)->withQueryString();

        // Retornar la vista con los datos
        return inertia('TipoHabitacion/TipoHabitacionPage', [
            'tipoHabitaciones' => $tipoHabitaciones,
            'filters' => [
                'search' => $request->search ?? '',
                'estado' => $request->estado ?? 'todos',
                'tipo' => $request->tipo ?? 'todos',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:activo,inactivo',
            'capacidad_adultos' => 'nullable|integer|min:0',
            'capacidad_infantes' => 'nullable|integer|min:0',
            'capacidad_total' => 'nullable|integer|min:0',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:habitacion,evento',
        ]);
    
        // Si el tipo es "evento", establecer capacidades de adultos e infantes en 0
        if ($validated['tipo'] === 'evento') {
            $validated['capacidad_adultos'] = 0;
            $validated['capacidad_infantes'] = 0;
        }
    
        // Si el tipo es "habitacion", calcular la capacidad total
        if ($validated['tipo'] === 'habitacion') {
            $validated['capacidad_total'] = ($validated['capacidad_adultos'] ?? 0) + ($validated['capacidad_infantes'] ?? 0);
        }
    
        // Crear el registro
        TipoHabitacion::create($validated);
    
        return redirect()->route('tipo-habitacion.index')->with('success', 'Tipo de habitación creado correctamente.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Retornar la vista para crear un nuevo tipo de habitación o evento
        return inertia('TipoHabitacion/TipoHabitacionPageCreate');
    }
    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(TipoHabitacion $tipoHabitacion)
    {
        //
        return inertia('TipoHabitacion/TipoHabitacionShow', [
                'tipoHabitacion' => [
                    'id' => $tipoHabitacion->id,
                    'nombre' => $tipoHabitacion->nombre,
                    'descripcion' => $tipoHabitacion->descripcion,
                    'estado' => $tipoHabitacion->estado,
                    'capacidad_adultos' => $tipoHabitacion->capacidad_adultos,
                    'capacidad_infantes' => $tipoHabitacion->capacidad_infantes,
                    'capacidad_total' => $tipoHabitacion->capacidad_total,
                    'precio' => $tipoHabitacion->precio,
                    'tipo' => $tipoHabitacion->tipo,
                    'created_at' => $tipoHabitacion->created_at->format('d/m/Y'),
                    'updated_at' => $tipoHabitacion->updated_at->format('d/m/Y'),
                ]
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoHabitacion $tipoHabitacion)
    {
        // Retornar la vista para editar el tipo de habitación
        return inertia('TipoHabitacion/TipoHabitacionPageEdit', [
            'tipoHabitacion' => $tipoHabitacion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoHabitacion $tipoHabitacion)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'estado' => 'required|in:activo,inactivo',
            'capacidad_adultos' => 'nullable|integer|min:0',
            'capacidad_infantes' => 'nullable|integer|min:0',
            'capacidad_total' => 'nullable|integer|min:0',
            'precio' => 'required|numeric|min:0',
            'tipo' => 'required|in:habitacion,evento',
        ]);

        // Si el tipo es "evento", limpiar capacidades de adultos e infantes
        if ($validated['tipo'] === 'evento') {
            $validated['capacidad_adultos'] = 0;
            $validated['capacidad_infantes'] = 0;
        }

        // Si el tipo es "habitacion", calcular la capacidad total
        if ($validated['tipo'] === 'habitacion') {
            $validated['capacidad_total'] = ($validated['capacidad_adultos'] ?? 0) + ($validated['capacidad_infantes'] ?? 0);
        } else {
            $validated['capacidad_total'] = 0; // Limpiar capacidad total si no es habitación
        }

        // Actualizar el registro
        $tipoHabitacion->update($validated);

        return redirect()->route('tipo-habitacion.index')->with('success', 'Tipo de habitación actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoHabitacion $tipoHabitacion)
    {
        //
    }
    public function galeria(TipoHabitacion $tipoHabitacion)
    {
        // Cargar las imágenes relacionadas con el tipo de habitación
        $imagenes = $tipoHabitacion->imagenes()->get(['id', 'url_image', 'created_at'])->map(function ($imagen) {
            return [
                'id' => $imagen->id,
                'url' => $imagen->url, // Usa el accesor para obtener la URL completa
                'created_at' => $imagen->created_at->format('d/m/Y H:i'),
            ];
        });

        return inertia('TipoHabitacion/TipoHabitacionGaleria', [
            'tipoHabitacionId' => $tipoHabitacion->id,
            'tipoHabitacionNombre' => $tipoHabitacion->nombre,
            'imagenes' => $imagenes,
        ]);
    }

    public function subirImagen(Request $request, TipoHabitacion $tipoHabitacion)
    {
        // Validar la imagen
        $request->validate([
            'imagen' => 'required|image|max:2048', // Máximo 2MB
        ]);

        // Guardar la imagen en el almacenamiento público
        $path = $request->file('imagen')->store('tipo_habitaciones', 'public');

        // Crear el registro de la imagen asociada al tipo de habitación
        $tipoHabitacion->imagenes()->create([
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
