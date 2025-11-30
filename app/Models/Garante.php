<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Garante extends Model
{
    //
    protected $table = 'garantes';
    protected $fillable = [
        'tipo_tarjeta',
        'nro_tarjeta',
        'reserva_id'
    ];

    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
}
