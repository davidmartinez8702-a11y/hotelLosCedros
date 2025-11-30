<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    //
    protected $table = 'cuentas';
    protected $fillable = [
        'checkin_id',
        'monto_total',
        'monto_pagado',
        'saldo',
        'estado',
        'fecha_pago',
    ];
    public function checkin()
    {
        return $this->belongsTo(Checkin::class);
    }
    public function transaccions()
    {
        return $this->hasMany(Transaccion::class);
    }
    public function factura()
    {
        return $this->hasOne(Factura::class);
    }
}
