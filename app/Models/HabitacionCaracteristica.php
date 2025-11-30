<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HabitacionCaracteristica extends Model
{
    //
    protected $table = 'habitacion_caracteristicas';
    protected $fillable = [
        'tipo_habitacion_id',
        'caracteristica_id',
    ];
    public function tipoHabitacion()
    {
        return $this->belongsTo(TipoHabitacion::class);
    }
    public function caracteristica()
    {
        return $this->belongsTo(Caracteristica::class);
    }
}
