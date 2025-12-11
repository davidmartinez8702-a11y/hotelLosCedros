<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HabitacionEvento extends Model
{
    use SoftDeletes;

    protected $table = 'habitacion_eventos';
    protected $fillable = [
        'tipo_habitacion_id',
        'nombre',
        'codigo',
        'estado',
        'piso',
        'ala_seccion',
        'vista',
        'notas_internas',
        'requiere_mantenimiento',
        'ultima_limpieza',
        'orden_limpieza',
    ];

    protected $casts = [
        'requiere_mantenimiento' => 'boolean',
        'ultima_limpieza' => 'datetime',
    ];

    // ============================
    // RELACIONES
    // ============================

    public function tipoHabitacion(): BelongsTo
    {
        return $this->belongsTo(TipoHabitacion::class);
    }

    public function checkins(): HasMany
    {
        return $this->hasMany(Checkin::class);
    }

    /**
     * ✅ CAMBIO: Checkins activos basados en fechas (no en columna estado)
     * Un checkin está activo si:
     * - La fecha de entrada ya pasó (entrada <= hoy)
     * - La fecha de salida no ha pasado (salida >= hoy)
     */
    public function checkinsActivos(): HasMany
    {
        return $this->hasMany(Checkin::class)
                    ->where('fecha_entrada', '<=', now()->endOfDay())
                    ->where('fecha_salida', '>=', now()->startOfDay());
    }

    // ============================
    // ACCESSORS
    // ============================

    public function getNombreCompletoAttribute(): string
    {
        return $this->nombre . ' - ' . $this->codigo;
    }

    /**
     * ✅ Cuenta ocupantes de checkins activos (basado en fechas)
     */
    public function getOcupantesActualesAttribute(): int
    {
        return $this->checkinsActivos()->count();
    }

    public function getCapacidadTotalAttribute(): int
    {
        return $this->tipoHabitacion->capacidad_total ?? 0;
    }

    public function getEstaDisponibleAttribute(): bool
    {
        return $this->estado === 'disponible' && 
               $this->ocupantes_actuales < $this->capacidad_total;
    }

    public function getEsSalonEventoAttribute(): bool
    {
        return $this->tipoHabitacion->tipo === 'evento';
    }

    // ============================
    // SCOPES
    // ============================

    public function scopeDisponibles($query)
    {
        return $query->where('estado', 'disponible');
    }

    public function scopeOcupadas($query)
    {
        return $query->where('estado', 'ocupada');
    }

    public function scopeEnLimpieza($query)
    {
        return $query->where('estado', 'limpieza');
    }

    public function scopeEnMantenimiento($query)
    {
        return $query->where('estado', 'mantenimiento');
    }

    public function scopePorTipo($query, $tipoHabitacionId)
    {
        return $query->where('tipo_habitacion_id', $tipoHabitacionId);
    }

    public function scopePorPiso($query, $piso)
    {
        return $query->where('piso', $piso);
    }

    public function scopeHabitaciones($query)
    {
        return $query->whereHas('tipoHabitacion', function($q) {
            $q->where('tipo', 'habitacion');
        });
    }

    public function scopeSalonesEvento($query)
    {
        return $query->whereHas('tipoHabitacion', function($q) {
            $q->where('tipo', 'evento');
        });
    }

    public function scopeBuscar($query, $termino)
    {
        return $query->where(function($q) use ($termino) {
            $q->where('codigo', 'like', "%{$termino}%")
              ->orWhere('nombre', 'like', "%{$termino}%")
              ->orWhereHas('tipoHabitacion', function($subQ) use ($termino) {
                  $subQ->where('nombre', 'like', "%{$termino}%");
              });
        });
    }

    // ============================
    // MÉTODOS
    // ============================

    public function cambiarEstado(string $nuevoEstado): bool
    {
        $estadosValidos = [
            'disponible',
            'ocupada',
            'limpieza',
            'mantenimiento',
            'bloqueada',
            'fuera_de_servicio'
        ];

        if (!in_array($nuevoEstado, $estadosValidos)) {
            return false;
        }

        $estadoAnterior = $this->estado; // ✅ Guardar estado anterior
        $this->estado = $nuevoEstado;

        // Si cambia a limpieza, registrar orden
        if ($nuevoEstado === 'limpieza') {
            $this->orden_limpieza = static::enLimpieza()->max('orden_limpieza') + 1;
        }

        // ✅ CORRECCIÓN: Comparar con estado anterior guardado
        if ($nuevoEstado === 'disponible' && $estadoAnterior === 'limpieza') {
            $this->ultima_limpieza = now();
            $this->orden_limpieza = null;
        }

        return $this->save();
    }

    public function puedeAceptarOcupantes(int $cantidad): bool
    {
        $ocupantesActuales = $this->ocupantes_actuales;
        return ($ocupantesActuales + $cantidad) <= $this->capacidad_total;
    }

    public function marcarParaMantenimiento(string $nota = null): void
    {
        $this->requiere_mantenimiento = true;
        if ($nota) {
            $this->notas_internas = ($this->notas_internas ? $this->notas_internas . "\n\n" : '') . 
                                     "[" . now()->format('Y-m-d H:i') . "] " . $nota;
        }
        $this->save();
    }

    public function completarMantenimiento(): void
    {
        $this->requiere_mantenimiento = false;
        $this->estado = 'disponible';
        $this->notas_internas = ($this->notas_internas ? $this->notas_internas . "\n\n" : '') . 
                                 "[" . now()->format('Y-m-d H:i') . "] Mantenimiento completado";
        $this->save();
    }
}
