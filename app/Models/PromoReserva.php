<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoReserva extends Model
{
    protected $table = 'promo_reservas';
    
    protected $fillable = [
        'promo_id',
        'reserva_id',
        'cliente_id',
        'monto_original',
        'monto_descuento',
        'monto_final',
        'codigo_usado',
        'snapshot_promo',
    ];

    protected $casts = [
        'monto_original' => 'decimal:2',
        'monto_descuento' => 'decimal:2',
        'monto_final' => 'decimal:2',
        'snapshot_promo' => 'array',
    ];

    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }

    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    /**
     * ✅ Calcular porcentaje de ahorro
     */
    public function getPorcentajeAhorroAttribute()
    {
        if ($this->monto_original == 0) {
            return 0;
        }
        return ($this->monto_descuento / $this->monto_original) * 100;
    }
}
