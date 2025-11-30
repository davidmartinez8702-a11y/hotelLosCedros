<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    //
    protected $table = 'pagos';
    protected $fillable = [
        'pago_id',
        'factura_id',
        'monto',
    ];
    public function factura()
    {
        return $this->belongsTo(Factura::class);
    }
}
