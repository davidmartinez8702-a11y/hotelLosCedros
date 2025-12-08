<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HabitacionCaracteristica extends Model
{
    protected $table = 'habitacion_caracteristicas';

    protected $fillable = [
        'tipo_habitacion_id',
        'caracteristica_id',
    ];

    /**
     * Relación con TipoHabitacion
     */
    public function tipoHabitacion(): BelongsTo
    {
        return $this->belongsTo(TipoHabitacion::class);
    }

    /**
     * Relación con Caracteristica
     */
    public function caracteristica(): BelongsTo
    {
        return $this->belongsTo(Caracteristica::class);
    }
}
