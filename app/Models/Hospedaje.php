<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hospedaje extends Model
{
    //
    protected $table = 'hospedajes';
    protected $fillable = [
        'reserva_id',
        'tipo_habitacion_id',
        'cantidad'
    ];
    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
    public function tipoHabitacion()
    {
        return $this->belongsTo(TipoHabitacion::class);
    }
}
