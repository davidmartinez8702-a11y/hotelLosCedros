<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Promo extends Model
{
    protected $table = 'promos';
    
    protected $fillable = [
        'nombre',
        'descripcion',
        'codigo_promocional',
        'tipo_promo',
        'descuento_porcentaje',
        'descuento_monto',
        'precio_total_paquete',
        'precio_normal',
        'segmento_id',
        'aplica_a',
        'estado',
        'fecha_inicio',
        'fecha_fin',
        'image_url',
        'stock',
        'minimo_noches',
        'minimo_personas',
        'dias_anticipacion_minimo',
        'dias_desde_ultima_visita',
        'dias_semana',
        'incluye_upgrade',
        'requiere_pago_completo',
        'cantidad_maxima_usos',
        'usos_por_cliente',
        'cantidad_usos_actual',
        'prioridad',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'descuento_porcentaje' => 'decimal:2',
        'descuento_monto' => 'decimal:2',
        'precio_total_paquete' => 'decimal:2',
        'precio_normal' => 'decimal:2',
        'dias_semana' => 'array',
        'incluye_upgrade' => 'boolean',
        'requiere_pago_completo' => 'boolean',
    ];

    /**
     * Relaciones
     */
    public function segmento()
    {
        return $this->belongsTo(Segmento::class);
    }

    public function detallePromos()
    {
        return $this->hasMany(DetallePromo::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    public function promoReservas()
    {
        return $this->hasMany(PromoReserva::class);
    }

    /**
     * ✅ Scopes
     */
    public function scopeActivas($query)
    {
        return $query->where('estado', 'activa')
            ->where('fecha_inicio', '<=', Carbon::now())
            ->where('fecha_fin', '>=', Carbon::now());
    }

    public function scopeParaSegmento($query, $segmentoId)
    {
        return $query->where(function($q) use ($segmentoId) {
            $q->whereNull('segmento_id')  // Promos para todos
              ->orWhere('segmento_id', $segmentoId);  // Promos específicas
        });
    }

    public function scopeDisponibles($query)
    {
        return $query->where(function($q) {
            $q->whereNull('cantidad_maxima_usos')  // Sin límite
              ->orWhereRaw('cantidad_usos_actual < cantidad_maxima_usos');  // Con stock
        });
    }

    /**
     * ✅ Métodos útiles
     */
    public function estaVigente()
    {
        $ahora = Carbon::now();
        return $this->fecha_inicio <= $ahora && $this->fecha_fin >= $ahora;
    }

    public function tieneStock()
    {
        if ($this->cantidad_maxima_usos === null) {
            return true;  // Ilimitado
        }
        return $this->cantidad_usos_actual < $this->cantidad_maxima_usos;
    }

    public function puedeUsarCliente($clienteId)
    {
        $usosCliente = $this->promoReservas()
            ->where('cliente_id', $clienteId)
            ->count();
        
        return $usosCliente < $this->usos_por_cliente;
    }

    public function calcularDescuento($montoOriginal)
    {
        switch ($this->tipo_promo) {
            case 'descuento_porcentual':
                return $montoOriginal * ($this->descuento_porcentaje / 100);
            
            case 'descuento_fijo':
                return min($this->descuento_monto, $montoOriginal);
            
            case 'precio_especial':
            case 'paquete':
                return max(0, $montoOriginal - $this->precio_total_paquete);
            
            default:
                return 0;
        }
    }

    public function incrementarUsos()
    {
        $this->increment('cantidad_usos_actual');
    }
}
