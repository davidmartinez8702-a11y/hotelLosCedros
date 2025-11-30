<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Descuento extends Model
{
    //
    protected $table = 'descuentos';
    protected $fillable = [
        'descripcion',
        'porcentaje',
        'estado',
        'fecha_creacion',
        'fecha_fin',
        'image_url',
    ];
}
