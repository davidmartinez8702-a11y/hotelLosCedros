<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    public function getImageUrlAttribute($value)
    {
        if (!$value) {
            // Si no hay imagen, devuelve una imagen por defecto
            return asset('images/platillo_default.jpg');
        }

        if (str_starts_with($value, 'http') || str_starts_with($value, 'https')) {
            // Si la URL ya es absoluta, devuélvela tal cual
            return $value;
        }

        // Si la URL es relativa, genera la URL completa desde el storage
        return Storage::url($value);
    }

    public function categoria()
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
