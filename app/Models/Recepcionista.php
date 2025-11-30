<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recepcionista extends Model
{
    //
    protected $table = 'recepcionistas';
    protected $fillable = [
        'id',
        'direccion'
    ];
    public function usuario()
    {
        return $this->belongsTo(User::class,'id','id');
    }
    public function checkins()
    {
        return $this->hasMany(Checkin::class);
    }
}
