<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    //
    protected $table = 'clientes';
    public $incrementing = false;
    protected $keyType = 'integer';
    protected $fillable = [
        'id',
    ];
    public function usuario()
    {
        //hace referencia a la clase,columna de esta tabla(CLIENTE) foreign key, columna en la tabla del modelo relacionado(User) donde apunta la fk
        return $this->belongsTo(User::class,'id','id');
    }
    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
    public function checkins()
    {
        return $this->hasMany(Checkin::class);
    }
}
