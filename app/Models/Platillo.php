<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Platillo extends Model
{
    //
    protected $table = 'platillos';
    protected $fillable = [
        'categoria_id',
        'nombre',
        'descripcion',
        'ingredientes',
        'image_url',
        'precio',
        'estado',
    ];
    public function categorias()
    {
        return $this->belongsTo(Categoria::class);
    }
    public function detallePromos()
    {
        return $this->hasMany(DetallePromo::class);
    }
    public function transaccions()
    {
        return $this->hasMany(Transaccion::class);
    }
}
