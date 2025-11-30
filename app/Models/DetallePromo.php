<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePromo extends Model
{
    //
    protected $table = 'detalle_promos';
    protected $fillable = [
        'promo_id',
        'tipo_habitacion_id',
        'servicio_id',
        'platillo_id',
        'detalle',
    ];
    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }
    public function tipoHabitacion()
    {
        return $this->belongsTo(TipoHabitacion::class);
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
