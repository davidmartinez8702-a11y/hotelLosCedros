<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checkin extends Model
{
    //
    protected $table = 'checkins';
    protected $fillable = [
        'reserva_id',
        'recepcionista_id',
        'cliente_id',
        'habitacion_evento_id',
        'fecha_entrada',
        'fecha_salida',
    ];
    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
    public function recepcionista()
    {
        return $this->belongsTo(Recepcionista::class);
    }
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    public function habitacionEvento()
    {
        return $this->belongsTo(HabitacionEvento::class);
    }
    public function cuenta()
    {
        return $this->hasOne(Cuenta::class);
    }
    public function factura()
    {
        return $this->hasOne(Factura::class);
    }
}
