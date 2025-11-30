<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    //
    protected $table = 'categorias';
    protected $fillable = [
        'nombre',
        'estado'
    ];
    public function platillos()
    {
        return $this->hasMany(Platillo::class);
    }
    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }
}
