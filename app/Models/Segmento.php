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
    public function promos(): BelongsToMany
    {
        return $this->belongsToMany(Promo::class, 'segmento_promo')
            ->withPivot([
                'estado',
                'aplicacion_automatica',
                'prioridad',
                'descuento_adicional',
                'fecha_inicio',
                'fecha_fin',
                'usos_maximos',
                'usos_actuales'
            ])
            ->withTimestamps();
    }

    /**
     * Promos activas para este segmento
     */
    public function promosActivas()
    {
        return $this->promos()
            ->wherePivot('estado', 'activa')
            ->wherePivot('aplicacion_automatica', true)
            ->where(function($query) {
                $query->whereNull('segmento_promo.fecha_inicio')
                      ->orWhere('segmento_promo.fecha_inicio', '<=', now());
            })
            ->where(function($query) {
                $query->whereNull('segmento_promo.fecha_fin')
                      ->orWhere('segmento_promo.fecha_fin', '>=', now());
            })
            ->orderByPivot('prioridad', 'desc');
    }
}
