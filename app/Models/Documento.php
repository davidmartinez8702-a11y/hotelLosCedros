<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    //
    protected $table = 'documentos';
    protected $fillable = [
        'usuario_id',
        'tipo',
        'documento',
        'nacionalidad',
    ];
    public function usuario()
    {
        return $this->belongsTo(User::class,'usuario_id');
    }
}
