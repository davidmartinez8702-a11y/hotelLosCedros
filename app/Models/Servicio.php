<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    //
    protected $table = 'servicios';
    protected $fillable = [
        'categoria_id',
        'nombre',
        'descripcion',
        'precio',
        'estado',
    ];
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
    public function imagenes():MorphMany
    {
        return $this->morphMany(Imagen::class, 'imageable');
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
