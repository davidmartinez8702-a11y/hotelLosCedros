<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Segmento extends Model
{
    protected $fillable = [
        'nombre',
        'color',
        'descripcion',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean'
    ];

    /**
     * Clientes que pertenecen a este segmento
     */
    public function clientes(): BelongsToMany
    {
        return $this->belongsToMany(Cliente::class, 'cliente_segmento')
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
     * Promociones asociadas a este segmento
     */
    public function promos()
    {
        return $this->belongsToMany(
            Promo::class,
            'segmento_promo',
            'segmento_id',
            'promo_id'
        )->withPivot([
            'estado',
            'aplicacion_automatica',
            'prioridad',
            'descuento_adicional',
            'fecha_inicio',
            'fecha_fin',
            'usos_maximos',
            'usos_actuales',
        ])->withTimestamps();
    }

    /**
     * Promos activas para este segmento
     */
    public function promosActivas()
    {
        return $this->promos()
            ->where('promos.estado', 'activa')
            ->where('segmento_promo.estado', 'activa')
            ->where('promos.fecha_inicio', '<=', now())
            ->where('promos.fecha_fin', '>=', now());
    }
}
