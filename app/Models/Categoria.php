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
     * Scope para filtrar por tipo
     */
    public function scopeHabitaciones($query)
    {
        return $query->where('tipo', 'habitacion');
    }

    public function scopePlatillos($query)
    {
        return $query->where('tipo', 'platillo');
    }

    public function scopeServicios($query)
    {
        return $query->where('tipo', 'servicio');
    }

    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }
}
