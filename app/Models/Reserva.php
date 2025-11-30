<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    //
    protected $table = 'reservas';
    protected $fillable = [
        'cliente_id',
        'promo_id',
        'total_cantidad_adultos',
        'total_cantidad_infantes',
        'fecha_reserva',
        'dias_estadia',
        'estado',
        'tipo_reserva',
        'porcentaje_descuento',
        'monto_total',
        'pago_inicial',
        'tipo_viaje',
    ];
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    public function garante()
    {
        return $this->belongsTo(Garante::class);
    }
    public function hospedajes()
    {
        return $this->hasMany(Hospedaje::class);
    }
    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }
    public function checkins()
    {
        return $this->hasMany(Checkin::class);
    }
    public function factura()
    {
        return $this->hasOne(Factura::class);
    }
}
