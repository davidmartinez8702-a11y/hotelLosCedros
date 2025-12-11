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
        'segmento_id', // ⚠️ DEPRECADO - Usar relación muchos a muchos en su lugar
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
     * 🔗 Relaciones
     */
    
    // ⚠️ DEPRECADA - Mantener para compatibilidad pero NO usar en nuevas implementaciones
    public function segmento()
    {
        return $this->belongsTo(Segmento::class);
    }

    /**
     * ✅ USAR ESTA - Relación muchos a muchos con segmentos
     */
    public function segmentos()
    {
        return $this->belongsToMany(
            Segmento::class, 
            'segmento_promo',  // Nombre de tabla pivot
            'promo_id',        // Foreign key de promo
            'segmento_id'      // Foreign key de segmento
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

    public function detallePromos()
    {
        return $this->hasMany(DetallePromo::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    /**
     * 🔗 Relación con reservas que usaron esta promo
     */
    public function promoReservas()
    {
        return $this->hasMany(PromoReserva::class);
    }

    /**
     * 📊 Verificar si tiene reservas asociadas (seguro)
     */
    public function tieneReservas(): bool
    {
        try {
            if (\Schema::hasTable('promo_reservas')) {
                return $this->promoReservas()->exists();
            }
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * 📈 Obtener estadísticas de uso
     */
    public function obtenerEstadisticas(): array
    {
        if (!$this->tieneReservas()) {
            return [
                'total_usos' => $this->cantidad_usos_actual ?? 0,
                'total_ahorro' => 0,
                'clientes_unicos' => 0,
            ];
        }

        return [
            'total_usos' => $this->promoReservas()->count(),
            'total_ahorro' => $this->promoReservas()->sum('monto_descuento') ?? 0,
            'clientes_unicos' => $this->promoReservas()->distinct('cliente_id')->count('cliente_id'),
        ];
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

    // ⚠️ DEPRECADO - Usar scopeParaSegmentos en su lugar
    public function scopeParaSegmento($query, $segmentoId)
    {
        return $query->where(function($q) use ($segmentoId) {
            $q->whereNull('segmento_id')
              ->orWhere('segmento_id', $segmentoId);
        });
    }

    /**
     * ✅ Nuevo scope para múltiples segmentos
     */
    public function scopeParaSegmentos($query, array $segmentosIds)
    {
        return $query->where(function($q) use ($segmentosIds) {
            // Promos que no tienen segmentos específicos (para todos)
            $q->whereDoesntHave('segmentos')
              // O promos que incluyen alguno de estos segmentos
              ->orWhereHas('segmentos', function($sq) use ($segmentosIds) {
                  $sq->whereIn('segmentos.id', $segmentosIds)
                     ->where('segmento_promo.estado', 'activa');
              });
        });
    }

    public function scopeConDisponibilidad($query)
    {
        return $query->where(function($q) {
            $q->whereNull('cantidad_maxima_usos')
              ->orWhereRaw('cantidad_usos_actual < cantidad_maxima_usos');
        });
    }

    public function scopeDisponibles($query)
    {
        return $query->where(function($q) {
            $q->whereNull('cantidad_maxima_usos')
              ->orWhereRaw('cantidad_usos_actual < cantidad_maxima_usos');
        });
    }

    /**
     * ✅ Métodos de validación
     */
    public function puedeUsarse(): bool
    {
        if ($this->estado !== 'activa') {
            return false;
        }

        $hoy = now();
        if ($hoy->lt($this->fecha_inicio) || $hoy->gt($this->fecha_fin)) {
            return false;
        }

        if ($this->cantidad_maxima_usos && $this->cantidad_usos_actual >= $this->cantidad_maxima_usos) {
            return false;
        }

        return true;
    }

    public function estaVigente()
    {
        $ahora = Carbon::now();
        return $this->fecha_inicio <= $ahora && $this->fecha_fin >= $ahora;
    }

    public function tieneStock()
    {
        if ($this->cantidad_maxima_usos === null) {
            return true;
        }
        return $this->cantidad_usos_actual < $this->cantidad_maxima_usos;
    }

    /**
     * 📊 Verificar si aplica a todos los segmentos
     */
    public function aplicaTodosSegmentos(): bool
    {
        return $this->segmentos()->count() === 0;
    }

    /**
     * ✅ Verificar si un cliente puede usar esta promo
     */
    public function puedeUsarCliente($clienteId): bool
    {
        // Verificar si la promo está activa y vigente
        if (!$this->puedeUsarse()) {
            return false;
        }

        // Si aplica a todos los segmentos
        if ($this->aplicaTodosSegmentos()) {
            // Solo verificar límite de usos por cliente
            if (\Schema::hasTable('promo_reservas')) {
                $usosCliente = $this->promoReservas()
                    ->where('cliente_id', $clienteId)
                    ->count();
                return $usosCliente < $this->usos_por_cliente;
            }
            return true;
        }

        // Verificar si el cliente pertenece a un segmento válido
        $cliente = \App\Models\Cliente::find($clienteId);
        if (!$cliente || !$cliente->segmento_id) {
            return false;
        }

        // Verificar si el segmento del cliente está en la promo
        $segmentoValido = $this->segmentos()
            ->where('segmentos.id', $cliente->segmento_id)
            ->where('segmento_promo.estado', 'activa')
            ->whereBetween(\DB::raw('CURRENT_DATE'), [
                \DB::raw('COALESCE(segmento_promo.fecha_inicio, promos.fecha_inicio)'),
                \DB::raw('COALESCE(segmento_promo.fecha_fin, promos.fecha_fin)')
            ])
            ->exists();

        if (!$segmentoValido) {
            return false;
        }

        // Verificar límite de usos por cliente
        if (\Schema::hasTable('promo_reservas')) {
            $usosCliente = $this->promoReservas()
                ->where('cliente_id', $clienteId)
                ->count();
            return $usosCliente < $this->usos_por_cliente;
        }

        return true;
    }

    /**
     * 💰 Calcular descuento según tipo de promo y segmento del cliente
     */
    public function calcularDescuento($montoOriginal, $clienteId = null)
    {
        $descuentoBase = 0;

        switch ($this->tipo_promo) {
            case 'descuento_porcentual':
                $descuentoBase = $montoOriginal * ($this->descuento_porcentaje / 100);
                break;
            
            case 'descuento_fijo':
                $descuentoBase = min($this->descuento_monto, $montoOriginal);
                break;
            
            case 'precio_especial':
            case 'paquete':
                $descuentoBase = max(0, $montoOriginal - $this->precio_total_paquete);
                break;
            
            default:
                $descuentoBase = 0;
        }

        // ✅ Aplicar descuento adicional si el cliente tiene segmento con bonus
        if ($clienteId) {
            $cliente = \App\Models\Cliente::find($clienteId);
            if ($cliente && $cliente->segmento_id) {
                $segmentoPromo = $this->segmentos()
                    ->where('segmentos.id', $cliente->segmento_id)
                    ->first();

                if ($segmentoPromo && $segmentoPromo->pivot->descuento_adicional) {
                    $descuentoAdicional = $descuentoBase * ($segmentoPromo->pivot->descuento_adicional / 100);
                    $descuentoBase += $descuentoAdicional;
                }
            }
        }

        return min($descuentoBase, $montoOriginal); // No puede ser mayor al monto original
    }

    /**
     * 📈 Incrementar contador de usos
     */
    public function incrementarUsos($segmentoId = null)
    {
        $this->increment('cantidad_usos_actual');

        // Si se especifica un segmento, incrementar su contador también
        if ($segmentoId) {
            $this->segmentos()
                ->where('segmentos.id', $segmentoId)
                ->increment('segmento_promo.usos_actuales');
        }
    }

    /**
     * 🔍 Obtener promos disponibles para un cliente
     */
    public static function disponiblesParaCliente($clienteId)
    {
        $cliente = \App\Models\Cliente::find($clienteId);
        
        return static::activas()
            ->disponibles()
            ->where(function($q) use ($cliente) {
                // Promos para todos
                $q->whereDoesntHave('segmentos');
                
                // O promos para el segmento del cliente
                if ($cliente && $cliente->segmento_id) {
                    $q->orWhereHas('segmentos', function($sq) use ($cliente) {
                        $sq->where('segmentos.id', $cliente->segmento_id)
                           ->where('segmento_promo.estado', 'activa');
                    });
                }
            })
            ->orderBy('prioridad', 'desc')
            ->get()
            ->filter(fn($promo) => $promo->puedeUsarCliente($clienteId));
    }
}
