# 🧪 Guía de Pruebas en Postman - API BI

## 📋 Endpoint: Evolución de Servicios

### **URL Base**
```
http://localhost/api/bi/evolucion-servicios
```

---

## 🔧 Configuración en Postman

### **1. Crear Nueva Request**

1. Abrir Postman
2. Click en "New" → "HTTP Request"
3. Nombre: `BI - Evolución Servicios`

### **2. Configurar Request**

**Método**: `GET`

**URL**: 
```
http://localhost/api/bi/evolucion-servicios
```

**Params** (Query Parameters):

| Key | Value | Description |
|-----|-------|-------------|
| `servicio_id` | `1` | ID del servicio (requerido) |
| `periodo` | `semana` | Período: hoy, semana, mes, anio |

---

## 📝 Ejemplos de Pruebas

### **Ejemplo 1: Gym - Esta Semana**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=1&periodo=semana
```

**Respuesta Esperada:**
```json
{
  "data": [
    {
      "periodo": "Lun",
      "cantidad": 12,
      "ingresos": 3000.00
    },
    {
      "periodo": "Mar",
      "cantidad": 15,
      "ingresos": 3750.00
    },
    {
      "periodo": "Mié",
      "cantidad": 10,
      "ingresos": 2500.00
    },
    {
      "periodo": "Jue",
      "cantidad": 15,
      "ingresos": 3750.00
    },
    {
      "periodo": "Vie",
      "cantidad": 18,
      "ingresos": 4500.00
    },
    {
      "periodo": "Sáb",
      "cantidad": 14,
      "ingresos": 3500.00
    },
    {
      "periodo": "Dom",
      "cantidad": 10,
      "ingresos": 2500.00
    }
  ],
  "servicio": {
    "id": 1,
    "nombre": "Gym",
    "precio": 250.00
  },
  "periodo": "semana",
  "metadata": {
    "total_cantidad": 94,
    "total_ingresos": 23500.00,
    "updated_at": "2025-12-08T04:24:00.000000Z"
  }
}
```

---

### **Ejemplo 2: Spa - Hoy (Por Horas)**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=2&periodo=hoy
```

**Respuesta Esperada:**
```json
{
  "data": [
    { "periodo": "00:00", "cantidad": 0, "ingresos": 0.00 },
    { "periodo": "01:00", "cantidad": 0, "ingresos": 0.00 },
    ...
    { "periodo": "09:00", "cantidad": 2, "ingresos": 1600.00 },
    { "periodo": "10:00", "cantidad": 5, "ingresos": 4000.00 },
    ...
    { "periodo": "23:00", "cantidad": 0, "ingresos": 0.00 }
  ],
  "servicio": {
    "id": 2,
    "nombre": "Spa",
    "precio": 800.00
  },
  "periodo": "hoy",
  "metadata": {
    "total_cantidad": 15,
    "total_ingresos": 12000.00,
    "updated_at": "2025-12-08T04:24:00.000000Z"
  }
}
```

---

### **Ejemplo 3: Restaurant - Este Mes**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=4&periodo=mes
```

**Respuesta Esperada:**
```json
{
  "data": [
    { "periodo": "1", "cantidad": 25, "ingresos": 12500.00 },
    { "periodo": "2", "cantidad": 30, "ingresos": 15000.00 },
    { "periodo": "3", "cantidad": 28, "ingresos": 14000.00 },
    ...
    { "periodo": "31", "cantidad": 35, "ingresos": 17500.00 }
  ],
  "servicio": {
    "id": 4,
    "nombre": "Restaurant",
    "precio": 500.00
  },
  "periodo": "mes",
  "metadata": {
    "total_cantidad": 850,
    "total_ingresos": 425000.00,
    "updated_at": "2025-12-08T04:24:00.000000Z"
  }
}
```

---

### **Ejemplo 4: Piscina - Este Año**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=3&periodo=anio
```

**Respuesta Esperada:**
```json
{
  "data": [
    { "periodo": "Ene", "cantidad": 120, "ingresos": 18000.00 },
    { "periodo": "Feb", "cantidad": 135, "ingresos": 20250.00 },
    { "periodo": "Mar", "cantidad": 150, "ingresos": 22500.00 },
    ...
    { "periodo": "Dic", "cantidad": 180, "ingresos": 27000.00 }
  ],
  "servicio": {
    "id": 3,
    "nombre": "Piscina",
    "precio": 150.00
  },
  "periodo": "anio",
  "metadata": {
    "total_cantidad": 1850,
    "total_ingresos": 277500.00,
    "updated_at": "2025-12-08T04:24:00.000000Z"
  }
}
```

---

## ❌ Casos de Error

### **Error 1: Servicio ID Faltante**
```
GET http://localhost/api/bi/evolucion-servicios?periodo=semana
```

**Respuesta:**
```json
{
  "error": "Se requiere el ID del servicio"
}
```
**Status Code**: `400 Bad Request`

---

### **Error 2: Servicio No Encontrado**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=999&periodo=semana
```

**Respuesta:**
```json
{
  "error": "Servicio no encontrado"
}
```
**Status Code**: `404 Not Found`

---

### **Error 3: Sin Datos para el Período**
```
GET http://localhost/api/bi/evolucion-servicios?servicio_id=1&periodo=hoy
```

**Respuesta (si no hay transacciones hoy):**
```json
{
  "data": [
    { "periodo": "00:00", "cantidad": 0, "ingresos": 0.00 },
    { "periodo": "01:00", "cantidad": 0, "ingresos": 0.00 },
    ...
  ],
  "servicio": {
    "id": 1,
    "nombre": "Gym",
    "precio": 250.00
  },
  "periodo": "hoy",
  "metadata": {
    "total_cantidad": 0,
    "total_ingresos": 0.00,
    "updated_at": "2025-12-08T04:24:00.000000Z"
  }
}
```
**Status Code**: `200 OK` (retorna arrays con 0)

---

## 🔍 Validaciones a Verificar

### **Checklist de Pruebas**

- [ ] **Servicio ID válido** → Retorna datos correctos
- [ ] **Servicio ID inválido** → Error 404
- [ ] **Sin servicio_id** → Error 400
- [ ] **Período "hoy"** → 24 elementos (horas)
- [ ] **Período "semana"** → 7 elementos (días)
- [ ] **Período "mes"** → Variable (días del mes)
- [ ] **Período "anio"** → 12 elementos (meses)
- [ ] **Período inválido** → Default a "semana"
- [ ] **Sin datos** → Arrays con 0
- [ ] **Cálculo de ingresos** → cantidad × precio correcto
- [ ] **Metadata** → Totales correctos

---

## 🛠️ Comandos cURL Alternativos

### **Ejemplo 1: Gym - Semana**
```bash
curl -X GET "http://localhost/api/bi/evolucion-servicios?servicio_id=1&periodo=semana"
```

### **Ejemplo 2: Spa - Hoy**
```bash
curl -X GET "http://localhost/api/bi/evolucion-servicios?servicio_id=2&periodo=hoy"
```

### **Ejemplo 3: Con Headers**
```bash
curl -X GET "http://localhost/api/bi/evolucion-servicios?servicio_id=1&periodo=semana" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

---

## 📊 Mapeo de IDs de Servicios

**IMPORTANTE**: Verifica estos IDs en tu base de datos `servicios`:

| Servicio | ID Esperado |
|----------|-------------|
| Gym | 1 |
| Spa | 2 |
| Piscina | 3 |
| Restaurant | 4 |
| Room Service | 5 |
| Lavandería | 6 |

### **Query para Verificar IDs:**
```sql
SELECT id, nombre, precio FROM servicios ORDER BY id;
```

---

## 🔐 Autenticación (Si está habilitada)

Si tu ruta requiere autenticación, agrega en Postman:

**Headers:**
```
Authorization: Bearer {tu_token_aqui}
Accept: application/json
```

O si usas sesiones de Laravel:
```
Cookie: laravel_session={tu_session_id}
X-XSRF-TOKEN: {tu_csrf_token}
```

---

## 📝 Notas Importantes

1. **Base de Datos**: Asegúrate de tener datos en la tabla `transaccions` con `servicio_id` válidos
2. **Fechas**: Las transacciones deben tener `created_at` recientes para aparecer en los períodos
3. **Precio**: El precio se toma de la tabla `servicios`, no de `transaccions`
4. **Cantidad**: Se suma el campo `cantidad` de la tabla `transaccions`

---

## 🧪 Crear Datos de Prueba

Si no tienes datos, puedes crear transacciones de prueba:

```sql
-- Insertar transacciones de prueba para Gym (servicio_id = 1)
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (1, 1, 2, 'completado', NOW(), NOW()),
  (2, 1, 3, 'completado', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
  (3, 1, 1, 'completado', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Insertar transacciones para Spa (servicio_id = 2)
INSERT INTO transaccions (cuenta_id, servicio_id, cantidad, estado, created_at, updated_at)
VALUES 
  (4, 2, 1, 'completado', NOW(), NOW()),
  (5, 2, 2, 'completado', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY));
```

---

## ✅ Resultado Esperado

Si todo funciona correctamente:

1. ✅ Endpoint responde con status `200 OK`
2. ✅ JSON bien formateado con estructura correcta
3. ✅ Datos calculados correctamente (cantidad e ingresos)
4. ✅ Metadata con totales precisos
5. ✅ Períodos con formato correcto (Lun-Dom, 00:00-23:00, etc.)
