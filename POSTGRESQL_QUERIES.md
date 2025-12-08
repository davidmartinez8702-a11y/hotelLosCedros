# Consultas SQL PostgreSQL - Evolución de Servicios

## 📊 Consultas Directas para PostgreSQL

### **1. Evolución por Hora (Hoy)**

```sql
-- Ver transacciones de hoy agrupadas por hora
SELECT 
    EXTRACT(HOUR FROM created_at) as hora,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1  -- Cambiar por el ID del servicio
  AND DATE(created_at) = CURRENT_DATE
GROUP BY hora
ORDER BY hora;
```

**Resultado Esperado:**
```
 hora | total_cantidad
------+----------------
    8 |              2
    9 |              5
   10 |              3
   14 |              8
   ...
```

---

### **2. Evolución por Día de la Semana (Esta Semana)**

```sql
-- Ver transacciones de esta semana agrupadas por día
SELECT 
    EXTRACT(DOW FROM created_at) as dia_numero,
    TO_CHAR(created_at, 'Dy') as dia_nombre,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1  -- Cambiar por el ID del servicio
  AND created_at >= DATE_TRUNC('week', CURRENT_DATE)
  AND created_at < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days'
GROUP BY dia_numero, dia_nombre
ORDER BY dia_numero;
```

**Resultado Esperado:**
```
 dia_numero | dia_nombre | total_cantidad
------------+------------+----------------
          0 | Sun        |             10
          1 | Mon        |             12
          2 | Tue        |             15
          3 | Wed        |             10
          4 | Thu        |             15
          5 | Fri        |             18
          6 | Sat        |             14
```

**Nota:** `DOW` en PostgreSQL: 0=Domingo, 1=Lunes, ..., 6=Sábado

---

### **3. Evolución por Día del Mes (Este Mes)**

```sql
-- Ver transacciones de este mes agrupadas por día
SELECT 
    EXTRACT(DAY FROM created_at) as dia,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1  -- Cambiar por el ID del servicio
  AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY dia
ORDER BY dia;
```

**Resultado Esperado:**
```
 dia | total_cantidad
-----+----------------
   1 |             25
   2 |             30
   3 |             28
   4 |             22
   5 |             35
   ...
  31 |             40
```

---

### **4. Evolución por Mes (Este Año)**

```sql
-- Ver transacciones de este año agrupadas por mes
SELECT 
    EXTRACT(MONTH FROM created_at) as mes,
    TO_CHAR(created_at, 'Mon') as mes_nombre,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1  -- Cambiar por el ID del servicio
  AND DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE)
GROUP BY mes, mes_nombre
ORDER BY mes;
```

**Resultado Esperado:**
```
 mes | mes_nombre | total_cantidad
-----+------------+----------------
   1 | Jan        |            120
   2 | Feb        |            135
   3 | Mar        |            150
   4 | Apr        |            145
   ...
  12 | Dec        |            180
```

---

## 🧮 Consultas con Cálculo de Ingresos

### **1. Hoy - Con Ingresos**

```sql
SELECT 
    EXTRACT(HOUR FROM t.created_at) as hora,
    SUM(t.cantidad) as total_cantidad,
    SUM(t.cantidad * s.precio) as total_ingresos,
    s.nombre as servicio_nombre,
    s.precio as precio_unitario
FROM transaccions t
INNER JOIN servicios s ON t.servicio_id = s.id
WHERE t.servicio_id = 1
  AND DATE(t.created_at) = CURRENT_DATE
GROUP BY hora, s.nombre, s.precio
ORDER BY hora;
```

---

### **2. Esta Semana - Con Ingresos**

```sql
SELECT 
    EXTRACT(DOW FROM t.created_at) as dia_numero,
    CASE EXTRACT(DOW FROM t.created_at)
        WHEN 0 THEN 'Dom'
        WHEN 1 THEN 'Lun'
        WHEN 2 THEN 'Mar'
        WHEN 3 THEN 'Mié'
        WHEN 4 THEN 'Jue'
        WHEN 5 THEN 'Vie'
        WHEN 6 THEN 'Sáb'
    END as dia_nombre,
    SUM(t.cantidad) as total_cantidad,
    SUM(t.cantidad * s.precio) as total_ingresos,
    s.nombre as servicio_nombre
FROM transaccions t
INNER JOIN servicios s ON t.servicio_id = s.id
WHERE t.servicio_id = 1
  AND t.created_at >= DATE_TRUNC('week', CURRENT_DATE)
  AND t.created_at < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days'
GROUP BY dia_numero, s.nombre, s.precio
ORDER BY dia_numero;
```

---

### **3. Este Mes - Con Ingresos**

```sql
SELECT 
    EXTRACT(DAY FROM t.created_at) as dia,
    SUM(t.cantidad) as total_cantidad,
    SUM(t.cantidad * s.precio) as total_ingresos
FROM transaccions t
INNER JOIN servicios s ON t.servicio_id = s.id
WHERE t.servicio_id = 1
  AND DATE_TRUNC('month', t.created_at) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY dia
ORDER BY dia;
```

---

### **4. Este Año - Con Ingresos**

```sql
SELECT 
    EXTRACT(MONTH FROM t.created_at) as mes,
    CASE EXTRACT(MONTH FROM t.created_at)
        WHEN 1 THEN 'Ene'
        WHEN 2 THEN 'Feb'
        WHEN 3 THEN 'Mar'
        WHEN 4 THEN 'Abr'
        WHEN 5 THEN 'May'
        WHEN 6 THEN 'Jun'
        WHEN 7 THEN 'Jul'
        WHEN 8 THEN 'Ago'
        WHEN 9 THEN 'Sep'
        WHEN 10 THEN 'Oct'
        WHEN 11 THEN 'Nov'
        WHEN 12 THEN 'Dic'
    END as mes_nombre,
    SUM(t.cantidad) as total_cantidad,
    SUM(t.cantidad * s.precio) as total_ingresos
FROM transaccions t
INNER JOIN servicios s ON t.servicio_id = s.id
WHERE t.servicio_id = 1
  AND DATE_TRUNC('year', t.created_at) = DATE_TRUNC('year', CURRENT_DATE)
GROUP BY mes
ORDER BY mes;
```

---

## 📋 Consultas de Verificación

### **Ver todos los servicios disponibles**

```sql
SELECT id, nombre, precio, estado
FROM servicios
ORDER BY id;
```

---

### **Ver transacciones recientes**

```sql
SELECT 
    t.id,
    t.servicio_id,
    s.nombre as servicio,
    t.cantidad,
    s.precio,
    (t.cantidad * s.precio) as ingresos,
    t.created_at,
    t.estado
FROM transaccions t
INNER JOIN servicios s ON t.servicio_id = s.id
ORDER BY t.created_at DESC
LIMIT 20;
```

---

### **Contar transacciones por servicio**

```sql
SELECT 
    s.id,
    s.nombre,
    COUNT(t.id) as total_transacciones,
    SUM(t.cantidad) as total_cantidad,
    SUM(t.cantidad * s.precio) as total_ingresos
FROM servicios s
LEFT JOIN transaccions t ON s.id = t.servicio_id
GROUP BY s.id, s.nombre
ORDER BY total_ingresos DESC NULLS LAST;
```

---

## 🔧 Crear Datos de Prueba

### **Insertar transacciones de prueba**

```sql
-- Insertar transacciones para Gym (servicio_id = 1)
-- Hoy a diferentes horas
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (1, 1, 2, 'completado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (1, 1, 3, 'completado', CURRENT_TIMESTAMP - INTERVAL '2 hours', CURRENT_TIMESTAMP),
  (1, 1, 1, 'completado', CURRENT_TIMESTAMP - INTERVAL '4 hours', CURRENT_TIMESTAMP);

-- Esta semana (diferentes días)
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (1, 1, 5, 'completado', CURRENT_DATE - INTERVAL '1 day', CURRENT_TIMESTAMP),
  (1, 1, 3, 'completado', CURRENT_DATE - INTERVAL '2 days', CURRENT_TIMESTAMP),
  (1, 1, 4, 'completado', CURRENT_DATE - INTERVAL '3 days', CURRENT_TIMESTAMP);

-- Este mes (diferentes días)
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (1, 1, 10, 'completado', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '5 days', CURRENT_TIMESTAMP),
  (1, 1, 8, 'completado', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '10 days', CURRENT_TIMESTAMP),
  (1, 1, 12, 'completado', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '15 days', CURRENT_TIMESTAMP);

-- Este año (diferentes meses)
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (1, 1, 50, 'completado', DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 month', CURRENT_TIMESTAMP),
  (1, 1, 60, 'completado', DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '2 months', CURRENT_TIMESTAMP),
  (1, 1, 55, 'completado', DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '3 months', CURRENT_TIMESTAMP);
```

---

### **Insertar transacciones para múltiples servicios**

```sql
-- Función para generar datos de prueba
DO $$
DECLARE
    servicio_id_var INT;
    dia_var INT;
BEGIN
    -- Para cada servicio (1-6)
    FOR servicio_id_var IN 1..6 LOOP
        -- Para cada día de esta semana
        FOR dia_var IN 0..6 LOOP
            INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
            VALUES (
                1,
                servicio_id_var,
                FLOOR(RANDOM() * 10 + 1)::INT,  -- Cantidad aleatoria 1-10
                'completado',
                CURRENT_DATE - (dia_var || ' days')::INTERVAL,
                CURRENT_TIMESTAMP
            );
        END LOOP;
    END LOOP;
END $$;
```

---

## 🧪 Verificar Resultados

### **Verificar datos de hoy**

```sql
SELECT 
    EXTRACT(HOUR FROM created_at) as hora,
    COUNT(*) as num_transacciones,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1
  AND DATE(created_at) = CURRENT_DATE
GROUP BY hora
ORDER BY hora;
```

---

### **Verificar datos de esta semana**

```sql
SELECT 
    DATE(created_at) as fecha,
    EXTRACT(DOW FROM created_at) as dia_semana,
    COUNT(*) as num_transacciones,
    SUM(cantidad) as total_cantidad
FROM transaccions
WHERE servicio_id = 1
  AND created_at >= DATE_TRUNC('week', CURRENT_DATE)
  AND created_at < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days'
GROUP BY fecha, dia_semana
ORDER BY fecha;
```

---

## 💡 Notas Importantes

### **Funciones de Fecha en PostgreSQL**

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `EXTRACT(HOUR FROM timestamp)` | Extrae la hora (0-23) | `EXTRACT(HOUR FROM '2024-12-08 14:30:00')` → 14 |
| `EXTRACT(DOW FROM timestamp)` | Día de la semana (0-6) | `EXTRACT(DOW FROM '2024-12-08')` → 0 (Domingo) |
| `EXTRACT(DAY FROM timestamp)` | Día del mes (1-31) | `EXTRACT(DAY FROM '2024-12-08')` → 8 |
| `EXTRACT(MONTH FROM timestamp)` | Mes (1-12) | `EXTRACT(MONTH FROM '2024-12-08')` → 12 |
| `DATE_TRUNC('week', timestamp)` | Inicio de la semana | `DATE_TRUNC('week', '2024-12-08')` → '2024-12-02' |
| `DATE_TRUNC('month', timestamp)` | Inicio del mes | `DATE_TRUNC('month', '2024-12-08')` → '2024-12-01' |
| `DATE_TRUNC('year', timestamp)` | Inicio del año | `DATE_TRUNC('year', '2024-12-08')` → '2024-01-01' |

---

## ✅ Checklist de Pruebas

- [ ] Ejecutar consulta de verificación de servicios
- [ ] Ver transacciones existentes
- [ ] Insertar datos de prueba
- [ ] Ejecutar consulta "Hoy" y verificar resultados
- [ ] Ejecutar consulta "Esta Semana" y verificar resultados
- [ ] Ejecutar consulta "Este Mes" y verificar resultados
- [ ] Ejecutar consulta "Este Año" y verificar resultados
- [ ] Probar endpoint en Postman
- [ ] Verificar frontend en `/BI-dinamico`
