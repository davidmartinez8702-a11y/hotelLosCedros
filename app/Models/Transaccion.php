<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaccion extends Model
{
    //
    protected $table = 'transaccions';
    protected $fillable = [
        'cuenta_id',
        'servicio_id',
        'platillo_id',
        'cantidad',
    ];
    public function cuenta()
    {
        return $this->belongsTo(Cuenta::class);
    }
    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
    public function platillo()
    {
        return $this->belongsTo(Platillo::class);
    }
}
