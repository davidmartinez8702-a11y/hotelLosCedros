<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    //
    protected $table = 'facturas';
    protected $fillable = [
        'cuenta_id',
        'reserva_id',
        'checkin_id',
        'tipo_pago_id',
        'monto_total',
        'monto_relativo',
        'estado',
    ];
    public function cuenta()
    {
        return $this->belongsTo(Cuenta::class);
    }
    public function tipoPago()
    {
        return $this->belongsTo(TipoPago::class);
    }
    public function pagos()
    {
        return $this->hasOne(Pago::class);
    }
    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
    public function checkin()
    {
        return $this->belongsTo(Checkin::class);
    }
}
