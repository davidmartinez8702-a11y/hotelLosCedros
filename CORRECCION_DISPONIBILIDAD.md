# ✅ CORRECCIÓN: Cálculo de Disponibilidad en Base a Hospedaje

## Problema Identificado

Los endpoints de disponibilidad estaban usando `Checkin` para contar habitaciones ocupadas, pero esto es **incorrecto** porque:

- ❌ `Checkin` = Se crea cuando el huésped **LLEGA** al hotel (check-in formal)
- ✅ `Hospedaje` = Se crea cuando se **REALIZA LA RESERVA** (es el registro de qué se reservó)

**El flujo correcto es:**

```
1. Cliente reserva → Crea registro en RESERVA
                  → Crea registro en HOSPEDAJE (qué tipo de habitación y cantidad)
                  
2. Cliente llega  → Se hace CHECK-IN 
                  → Se asigna HABITACION_EVENTO específica
```

---

## Archivos Corregidos

### 1. `ReservaClienteController.php`

**Métodos corregidos:**
- `buscarDisponibilidad()` (línea ~30)
- `create()` (línea ~540)

**Cambios:**

**Antes (❌ INCORRECTO):**
```php
$habitacionesOcupadas = Checkin::whereHas('habitacionEvento', function($query) use ($tipo) {
    $query->where('tipo_habitacion_id', $tipo->id);
})
->where(function($query) use ($fechaEntrada, $fechaSalida) {
    // ... lógica de fechas
})
->count();
```

**Después (✅ CORRECTO):**
```php
$habitacionesReservadas = \App\Models\Hospedaje::where('tipo_habitacion_id', $tipo->id)
    ->join('reservas', 'hospedajes.reserva_id', '=', 'reservas.id')
    ->where(function($query) use ($fechaEntrada, $fechaSalida) {
        // Se superponen si: fecha_reserva < fecha_salida Y fecha_reserva + dias_estadia > fecha_entrada
        $query->whereRaw('reservas.fecha_reserva < ?', [$fechaSalida->toDateString()])
              ->whereRaw('DATE_ADD(reservas.fecha_reserva, INTERVAL reservas.dias_estadia DAY) > ?', [$fechaEntrada->toDateString()]);
    })
    ->sum('hospedajes.cantidad');

$habitacionesDisponibles = $habitacionesTotales - (int)($habitacionesReservadas ?? 0);
```

---

### 2. `N8nHotelController.php` 

**Método corregido:**
- `disponibilidad()` (línea ~63)

**Mismo cambio:** De `Checkin` a `Hospedaje` con join a `reservas`

---

## Lógica de Superposición de Fechas

La lógica para detectar si dos rangos de fechas se superponen:

```
Rango 1: [fecha_entrada, fecha_salida] (solicitado)
Rango 2: [fecha_reserva, fecha_reserva + dias_estadia] (en BD)

Se superponen si:
✅ fecha_reserva < fecha_salida  AND  (fecha_reserva + dias_estadia) > fecha_entrada
```

**Ejemplo:**
```
Solicitado: 15-May a 18-May (3 noches)
Reservado: 16-May a 17-May (1 noche)

16 < 18 ✅  AND  17 > 15 ✅  = SÍ SE SUPERPONE
```

---

## Explicación del Cambio

### Tabla `Hospedaje` 
Esta es la tabla **pivote** entre `Reserva` y `TipoHabitacion`:

| id | reserva_id | tipo_habitacion_id | cantidad | precio_habitacion |
|----|------------|------------------|----------|-------------------|
| 1  | 5          | 1 (Doble)        | 2        | 750.00            |
| 2  | 6          | 2 (Suite)        | 1        | 450.00            |

**Significa:**
- Reserva #5 → Reservó 2 habitaciones Doble
- Reserva #6 → Reservó 1 habitación Suite

---

### Cálculo Correcto

**Ejemplo:** Disponibilidad para 15-18 de mayo

```sql
-- Total de Dobles disponibles
SELECT COUNT(*) FROM habitacion_eventos 
WHERE tipo_habitacion_id = 1 AND estado = 'disponible'
-- Resultado: 5 habitaciones

-- Dobles reservadas que se superponen 15-18 mayo
SELECT SUM(cantidad) FROM hospedajes 
JOIN reservas ON hospedajes.reserva_id = reservas.id
WHERE hospedajes.tipo_habitacion_id = 1
  AND reservas.fecha_reserva < '2026-05-18'
  AND DATE_ADD(reservas.fecha_reserva, INTERVAL reservas.dias_estadia DAY) > '2026-05-15'
-- Resultado: 3 (hay 3 Dobles reservadas en ese rango)

-- Disponibles = 5 - 3 = 2 Dobles disponibles
```

---

## Endpoints Afectados

### 1. `POST /api/reservas/cliente/disponibilidad`
**Base:** `ReservaClienteController@buscarDisponibilidad`
✅ Corregido

### 2. `GET /api/n8n/disponibilidad`
**Base:** `N8nHotelController@disponibilidad`
✅ Corregido

### 3. Formulario de crear reserva
**Base:** `ReservaClienteController@create` (GET /reservas/cliente/crear)
✅ Corregido

---

## Pruebas Recomendadas

Después de estos cambios, prueba:

```bash
# Test 1: Crear una reserva de prueba
POST /api/n8n/reserva-completa
{
  "nombre": "Test",
  "email": "test@example.com",
  "telefono": "1234567",
  "ci_pasaporte": "123",
  "fecha_entrada": "2026-05-15",
  "fecha_salida": "2026-05-17",
  "adultos": 2,
  "habitaciones": [{"tipo_habitacion_id": 1, "cantidad": 2}],
  "metodo_pago": "qr",
  "monto_pago": 100
}
# Resultado: Reserva creada ✅

# Test 2: Consultar disponibilidad para esas fechas
GET /api/n8n/disponibilidad?fecha_entrada=2026-05-15&fecha_salida=2026-05-17&adultos=2

# Esperado: Debe mostrar MENOS habitaciones Doble disponibles
# (porque ya hay 2 reservadas)
```

---

## Relación de Tablas

```
┌─────────────┐
│  RESERVA    │
│ id, cliente │
│ fecha_reserva, dias_estadia
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼────────────────┐
│    HOSPEDAJE (Pivote) │
│ id, reserva_id        │
│ tipo_habitacion_id    │
│ cantidad              │  ✅ Aquí se guarda cantidad
│ precio_habitacion     │     de habitaciones reservadas
└──────┬────────────────┘
       │
       │ N:1
       │
┌──────▼──────────────┐
│ TIPO_HABITACION     │
│ id, nombre, precio  │
└─────────────────────┘

       ↓ (en check-in)

┌──────────────────────┐
│ HABITACION_EVENTO    │
│ (entidad física)     │
│ id, numero_cuarto    │ ✅ Se asigna aquí
│ tipo_habitacion_id   │    cuando llega cliente
└──────────────────────┘

       ↓ (hace check-in)

┌──────────────────────┐
│   CHECK-IN           │
│ id, habitacion_evento│
│ fecha_entrada        │ ✅ Se crea aquí cuando
│ fecha_salida         │    cliente hace check-in
└──────────────────────┘
```

---

## Cambios Resumidos

| Archivo | Método | Línea | Cambio |
|---------|--------|-------|--------|
| ReservaClienteController | buscarDisponibilidad | 30 | Checkin → Hospedaje |
| ReservaClienteController | create | 540 | Checkin → Hospedaje |
| N8nHotelController | disponibilidad | 63 | Checkin → Hospedaje |

✅ **Todos los cambios aplicados correctamente**
