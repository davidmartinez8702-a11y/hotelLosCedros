<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    //
    protected $table = 'promos';
    protected $fillable = [
        'nombre',
        'descripcion',
        'estado',
        'fecha_inicio',
        'fecha_fin',
        'image_url',
        'stock',
        'precio_promo',
        'precio_normal',
        'precio_descuento',
    ];
    public function detallePromos()
    {
        return $this->hasMany(DetallePromo::class);
    }
    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}
