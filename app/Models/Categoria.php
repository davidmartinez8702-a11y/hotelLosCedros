<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    protected $table = 'categorias';

    protected $fillable = [
        'nombre',
        'tipo',
        'estado',
    ];

    /**
     * Relación con tipos de habitación
     */
    public function tipoHabitaciones(): HasMany
    {
        return $this->hasMany(TipoHabitacion::class);
    }

    /**
     * Scope para filtrar por tipo habitacion
     */
    public function scopeHabitaciones($query)
    {
        return $query->where('tipo', 'habitacion');
    }

    /**
     * Scope para filtrar por tipo platillo
     */
    public function scopePlatillos($query)
    {
        return $query->where('tipo', 'platillo');
    }

    /**
     * Scope para filtrar por tipo servicio
     */
    public function scopeServicios($query)
    {
        return $query->where('tipo', 'servicio');
    }

    /**
     * Scope para activos
     */
    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }
}
