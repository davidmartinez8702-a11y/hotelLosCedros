<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caracteristica extends Model
{
    //
    protected $table = 'caracteristicas';
    protected $fillable = [
        'nombre',
        'estado',
    ];
    public function habitacionCaracteristicas()
    {
        return $this->hasMany(HabitacionCaracteristica::class);
    }
}
