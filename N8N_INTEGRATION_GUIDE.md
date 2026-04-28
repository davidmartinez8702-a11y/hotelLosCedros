# 🤖 Guía: Integración n8n con Hotel API

## 📌 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/n8n/informacion` | Información general del hotel |
| `GET` | `/api/n8n/disponibilidad` | Verificar disponibilidad de hab. |
| `GET` | `/api/n8n/habitaciones` | Listar todas las habitaciones |
| `GET` | `/api/n8n/promociones` | Obtener promociones vigentes |
| `POST` | `/api/n8n/calcular-precio` | Calcular precio con descuentos |

---

## 🔧 Configuración en n8n

### **URL Base**
```
https://tuhotel.com/api/n8n
```

### **Ejemplo 1: Workflow para Consultar Disponibilidad**

#### Paso 1: HTTP Request Node (GET)
```
URL: https://tuhotel.com/api/n8n/disponibilidad
Method: GET

Query Parameters:
- fecha_entrada: {{ $now.toISOString().split('T')[0] }} (hoy)
- fecha_salida: {{ $now.addDays(7).toISOString().split('T')[0] }} (7 días después)
- adultos: 2
- infantes: 0
```

#### Respuesta esperada:
```json
{
  "success": true,
  "data": {
    "fecha_entrada": "2026-04-26",
    "fecha_salida": "2026-05-03",
    "dias_estadia": 7,
    "adultos": 2,
    "infantes": 0,
    "habitaciones_disponibles": [
      {
        "id": 1,
        "nombre": "Habitación Doble Estándar",
        "descripcion": "Confortable habitación con cama doble",
        "capacidad_total": 2,
        "capacidad_adultos": 2,
        "capacidad_infantes": 0,
        "precio_noche": 150.00,
        "precio_total_estadia": 1050.00,
        "disponibles": 5,
        "imagen": "https://..."
      }
    ],
    "total_tipos": 1
  },
  "message": "Disponibilidad consultada correctamente"
}
```

---

### **Ejemplo 2: Workflow Completo en n8n**

```
┌─────────────────────┐
│  Trigger (Chat)     │  ← Usuario dice "Quiero dormir 2 noches"
│  Mensaje del agente │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Nodo: AI Agent      │  ← Procesa la solicitud
│ Detecta: fechas     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ HTTP Request GET    │  ← Llama a /api/n8n/disponibilidad
│ Envía: fechas       │
│ Recibe: habitaciones│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ HTTP Request GET    │  ← Llama a /api/n8n/promociones
│ Obtiene: descuentos │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ AI Agent            │  ← Formatea respuesta bonita
│ Responde al usuario │
└─────────────────────┘
```

---

## 💡 Ejemplo en JavaScript (para testing)

```javascript
// Test disponibilidad
async function consultarDisponibilidad() {
  const params = new URLSearchParams({
    fecha_entrada: '2026-05-01',
    fecha_salida: '2026-05-03',
    adultos: 2,
    infantes: 0
  });

  const response = await fetch(
    `https://tuhotel.com/api/n8n/disponibilidad?${params}`,
    { method: 'GET' }
  );
  
  const data = await response.json();
  console.log(data);
}

// Test calcular precio
async function calcularPrecio() {
  const response = await fetch(
    'https://tuhotel.com/api/n8n/calcular-precio',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo_habitacion_id: 1,
        cantidad: 1,
        dias: 3,
        promo_id: null
      })
    }
  );
  
  const data = await response.json();
  console.log(data);
}
```

---

## 🔐 Seguridad

✅ **Sin autenticación** - Los endpoints son públicos  
✅ **Sin CSRF** - Diseñados para llamadas externas  
⚠️ **Valida inputs** - Los endpoints validan todos los parámetros  
✅ **Rate limiting** (opcional) - Considera aggregar límites si quieres

---

## 📋 Parámetros Detallados

### `GET /api/n8n/disponibilidad`
```
Query Parameters:
- fecha_entrada (required): Formato Y-m-d, debe ser >= hoy
- fecha_salida (required): Formato Y-m-d, debe ser > fecha_entrada
- adultos (required): Número entero >= 1
- infantes (optional): Número entero >= 0
```

### `POST /api/n8n/calcular-precio`
```
Body JSON:
{
  "tipo_habitacion_id": 1,      (required)
  "cantidad": 2,                 (required, min: 1)
  "dias": 3,                     (required, min: 1)
  "promo_id": null               (optional)
}
```

### `GET /api/n8n/promociones`
```
No requiere parámetros
Retorna todas las promociones activas vigentes
```

---

## 🎯 Script n8n (Agent Prompt)

Puedes usar este prompt en tu AI Agent:

```
Eres un asistente de reservas de hotel. Ayuda a los usuarios a:
1. Consultar disponibilidad de habitaciones
2. Ver promociones activas
3. Calcular precios

Cuando el usuario menciona fechas o número de huéspedes:
- Convierte las fechas al formato YYYY-MM-DD
- Consulta el endpoint GET /api/n8n/disponibilidad con los parámetros
- Presenta las habitaciones disponibles de forma clara

Si mencionan una habitación específica:
- Usa GET /api/n8n/calcular-precio para mostrar el precio final
- Incluye el descuento si hay promociones

Siempre presenta:
- Nombre de la habitación
- Precio por noche
- Precio total para la estadía
- Disponibilidad
- Descuentos aplicables
```

---

## 🧪 Testear en Postman

### Disponibilidad
```
GET https://tuhotel.com/api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2&infantes=0
```

### Información del Hotel
```
GET https://tuhotel.com/api/n8n/informacion
```

### Promociones
```
GET https://tuhotel.com/api/n8n/promociones
```

### Calcular Precio
```
POST https://tuhotel.com/api/n8n/calcular-precio
Content-Type: application/json

{
  "tipo_habitacion_id": 1,
  "cantidad": 1,
  "dias": 3,
  "promo_id": null
}
```

---

## ⚠️ Posibles Errores

| Error | Causa | Solución |
|-------|-------|----------|
| 422 Validation Failed | Parámetros inválidos | Verifica el formato de fechas (Y-m-d) |
| 500 Server Error | Error interno | Revisa los logs: `storage/logs/laravel.log` |
| CORS Error | Origen no permitido | Configura CORS en Laravel |

---

## 📞 Soporte

Para más detalles sobre los modelos:
- Ver: `app/Models/TipoHabitacion.php`
- Ver: `app/Models/Promo.php`
- Ver: `database/migrations/`
