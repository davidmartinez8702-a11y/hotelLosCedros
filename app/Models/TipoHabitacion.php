<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;

class TipoHabitacion extends Model
{
    //
    protected $table = 'tipo_habitacions';
    protected $fillable = [
        'nombre',
        'descripcion',
        'estado',
        'capacidad_adultos',
        'capacidad_infantes',
        'precio',
        'capacidad_total',
        'tipo',
    ];
    public function imagenes():MorphMany
    {
        return $this->morphMany(Imagen::class, 'imageable');
    }
    public function habitacionCaracteristicas()
    {
        return $this->hasMany(HabitacionCaracteristica::class);
    }
    public function detallePromos()
    {
        return $this->hasMany(DetallePromo::class);
    }
    public function habitacionEventos()
    {
        return $this->hasMany(HabitacionEvento::class);
    }
    public function hospedajes()
    {
        return $this->hasMany(Hospedaje::class);
    }
}
