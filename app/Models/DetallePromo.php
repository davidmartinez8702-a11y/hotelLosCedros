<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePromo extends Model
{
    protected $table = 'detalle_promos';
    
    protected $fillable = [
        'promo_id',
        'tipo_item',
        'tipo_habitacion_id',
        'servicio_id',
        'platillo_id',
        'cantidad',
        'noches',
        'descuento_porcentaje',
        'descuento_monto',
        'precio_especial',
        'es_gratis',
        'orden',
        'detalle',
    ];

    protected $casts = [
        'descuento_porcentaje' => 'decimal:2',
        'descuento_monto' => 'decimal:2',
        'precio_especial' => 'decimal:2',
        'es_gratis' => 'boolean',
    ];

    /**
     * Relaciones
     */
    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }

    public function tipoHabitacion()
    {
        return $this->belongsTo(TipoHabitacion::class);
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }

    public function platillo()
    {
        return $this->belongsTo(Platillo::class);
    }

    /**
     * ✅ Obtener el item relacionado dinámicamente
     */
    public function getItemAttribute()
    {
        return match($this->tipo_item) {
            'habitacion' => $this->tipoHabitacion,
            'servicio' => $this->servicio,
            'platillo' => $this->platillo,
            default => null,
        };
    }

    /**
     * ✅ Obtener nombre del item
     */
    public function getNombreItemAttribute()
    {
        return $this->item?->nombre ?? 'N/A';
    }

    /**
     * ✅ Calcular precio del item
     */
    public function calcularPrecio()
    {
        if ($this->es_gratis) {
            return 0;
        }

        if ($this->precio_especial) {
            return $this->precio_especial * $this->cantidad;
        }

        $precioBase = $this->item?->precio ?? 0;
        
        if ($this->descuento_porcentaje) {
            $precioBase -= $precioBase * ($this->descuento_porcentaje / 100);
        }
        
        if ($this->descuento_monto) {
            $precioBase -= $this->descuento_monto;
        }

        return max(0, $precioBase) * $this->cantidad;
    }
}
