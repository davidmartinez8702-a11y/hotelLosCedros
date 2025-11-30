<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HabitacionEvento extends Model
{
    //
    protected $table = 'habitacion_eventos';
    protected $fillable = [
        'tipo_habitacion_id',
        'nombre',
        'codigo',
        'estado',
    ];
    public function tipoHabitacion()
    {
        return $this->belongsTo(TipoHabitacion::class);
    }
    public function checkins()
    {
        return $this->hasMany(Checkin::class);
    }
}
