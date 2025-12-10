<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    /**
     * Segmento actual del cliente
     */
    public function segmento(): BelongsToMany
    {
        return $this->belongsToMany(Segmento::class, 'cliente_segmento')
            ->withPivot([
                'cluster_id',
                'fecha_clasificacion',
                'cluster_data',
                'total_reservas_analizadas',
                'confianza',
                'version_modelo'
            ])
            ->withTimestamps();
    }

    /**
     * Obtener el segmento actual (helper)
     */
    public function segmentoActual()
    {
        return $this->segmento()->first();
    }

    /**
     * Obtener cluster_id actual
     */
    public function getClusterIdAttribute()
    {
        return $this->segmentoActual()?->pivot->cluster_id;
    }

    /**
     * Obtener datos del cluster
     */
    public function getClusterDataAttribute()
    {
        return $this->segmentoActual()?->pivot->cluster_data;
    }

    /**
     * Verificar si el cliente pertenece a un segmento específico
     */
    public function esDelSegmento(string $nombreSegmento): bool
    {
        return $this->segmentoActual()?->nombre === $nombreSegmento;
    }

    /**
     * Obtener promos disponibles según su segmento
     */
    public function promosDisponibles()
    {
        $segmento = $this->segmentoActual();
        
        if (!$segmento) {
            return collect();
        }

        return $segmento->promosActivas()->get();
    }
}
