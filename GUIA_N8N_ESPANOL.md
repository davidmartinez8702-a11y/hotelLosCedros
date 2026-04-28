# 🤖 Guía n8n: Agente de Disponibilidad de Hotel

## 📌 Resumen Ejecutivo

Se han expuesto **5 endpoints públicos** que n8n puede consumir sin autenticación para consultar:
- ✅ Disponibilidad de habitaciones
- ✅ Información del hotel
- ✅ Promociones activas
- ✅ Listado de cuartos
- ✅ Cálculo de precios

---

## 🚀 Guía Rápida (5 minutos)

### Paso 1: Validar que funcione

Abre PowerShell en la carpeta del proyecto y corre:

```powershell
.\test_n8n_endpoints.ps1
```

O desde terminal:

```bash
Invoke-WebRequest -Uri "http://localhost:8000/api/n8n/informacion"
```

Deberías ver datos del hotel en JSON.

### Paso 2: En n8n, crear workflow

**Ir a:** n8n (http://localhost:5678 o tu instancia)

1. Click "+ New Workflow"
2. Agregar nodo: **Chat**
3. Configurar:
   - Agregar "On Message" trigger

### Paso 3: Agregar HTTP Request

1. Agregar nodo: **HTTP Request**
2. Configurar:
   ```
   Method: GET
   URL: http://localhost:8000/api/n8n/disponibilidad
   ```
3. Agregar parámetros:
   - `fecha_entrada`: `{{ $now.format('yyyy-MM-dd') }}`
   - `fecha_salida`: `{{ $now.addDays(7).format('yyyy-MM-dd') }}`
   - `adultos`: `2`
   - `infantes`: `0`

### Paso 4: Agregar AI Agent

1. Agregar nodo: **OpenAI** / **Claude** / **Anthropic**
2. Seleccionar modelo (ej: gpt-4-turbo)
3. System Prompt:
   ```
   Eres un asistente de reservas de hotel amable.
   El usuario pregunta sobre disponibilidad de cuartos.
   Tienes datos del hotel:

   {{ $node["HTTP Request"].json }}

   Responde de forma clara:
   - Nombre de la habitación
   - Precio por noche
   - Precio total
   - Cantidad disponible
   ```

### Paso 5: Respuesta al usuario

1. Agregar nodo: **Chat**
2. Message: `{{ $node["AI Agent"].json.text }}`

**¡Listo!** Tu agente ya puede responder preguntas sobre disponibilidad.

---

## 🎯 Casos de Uso Comunes

### Caso 1: "¿Hay cuartos disponibles el próximo fin de semana?"

```
Usuario → Chat
    ↓
n8n parsea: "fin de semana"
    ↓
HTTP GET /api/n8n/disponibilidad?fecha_entrada=...
    ↓
Recibe: { habitaciones_disponibles: [...] }
    ↓
AI Agent formatea la respuesta
    ↓
Respuesta: "Tenemos 3 cuartos disponibles..."
```

### Caso 2: "¿Cuánto cuesta 2 noches con promoción?"

```
Usuario → Chat con detalles
    ↓
HTTP POST /api/n8n/calcular-precio
{
  "tipo_habitacion_id": 1,
  "cantidad": 1,
  "dias": 2,
  "promo_id": 5
}
    ↓
Respuesta: { total: 300, descuento: 45, ... }
    ↓
AI Agent responde: "El total es $255 con descuento applied"
```

### Caso 3: Dashboard de ocupación

```
Cada 30 minutos:
    ↓
HTTP GET /api/n8n/informacion
    ↓
Extraer: ocupacion_porcentaje
    ↓
Si ocupacion > 80% → Enviar notificación Slack ⚠️
```

---

## 📋 Endpoints Detallados

### 1️⃣ GET `/api/n8n/informacion`

**Qué obtiene:** Estado general del hotel

Respuesta:
```json
{
  "success": true,
  "data": {
    "nombre": "Hotel Cedros",
    "total_habitaciones": 20,
    "habitaciones_disponibles": 12,
    "habitaciones_ocupadas": 8,
    "ocupacion_porcentaje": 40,
    "tipos_habitacion": 4,
    "precio_minimo": 100,
    "precio_maximo": 500,
    "promociones_activas": 2
  }
}
```

**En n8n:**
```
URL: {{ $baseUrl }}/api/n8n/informacion
Method: GET
```

---

### 2️⃣ GET `/api/n8n/disponibilidad`

**Qué obtiene:** Habitaciones disponibles en un rango de fechas

**Parámetros:**
- `fecha_entrada` (requerido) - Y-m-d
- `fecha_salida` (requerido) - Y-m-d
- `adultos` (requerido) - número
- `infantes` (opcional) - número

**Ejemplo:**
```
GET /api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2&infantes=0
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "fecha_entrada": "2026-05-01",
    "fecha_salida": "2026-05-03",
    "dias_estadia": 2,
    "habitaciones_disponibles": [
      {
        "id": 1,
        "nombre": "Doble Estándar",
        "capacidad_total": 2,
        "precio_noche": 150.00,
        "precio_total_estadia": 300.00,
        "disponibles": 5,
        "imagen": "https://..."
      }
    ]
  }
}
```

**En n8n:**
```
{{ $baseUrl }}/api/n8n/disponibilidad
?fecha_entrada={{ $now.format('yyyy-MM-dd') }}
&fecha_salida={{ $now.addDays(7).format('yyyy-MM-dd') }}
&adultos=2
&infantes=0
```

---

### 3️⃣ GET `/api/n8n/habitaciones`

**Qué obtiene:** Listado de todas las habitaciones

**Parámetros (opcional):**
- `estado` - "activo" (default) o "inactivo"

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Doble Estándar",
      "descripcion": "Habitación confortable...",
      "precio": 150.00,
      "capacidad_total": 2,
      "estado": "activo"
    }
  ],
  "total": 4
}
```

---

### 4️⃣ GET `/api/n8n/promociones`

**Qué obtiene:** Promociones vigentes

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Descuento Verano 15%",
      "descripcion": "15% de descuento...",
      "tipo": "descuento_porcentual",
      "valor": 15,
      "fecha_inicio": "2026-05-01",
      "fecha_fin": "2026-08-31"
    }
  ],
  "total": 2
}
```

---

### 5️⃣ POST `/api/n8n/calcular-precio`

**Qué obtiene:** Precio total con descuentos aplicados

**Body JSON (requerido):**
```json
{
  "tipo_habitacion_id": 1,
  "cantidad": 1,
  "dias": 3,
  "promo_id": null
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "habitacion": "Doble Estándar",
    "cantidad": 1,
    "dias": 3,
    "precio_noche": 150.00,
    "subtotal": 450.00,
    "descuento": 67.50,
    "total": 382.50,
    "promocion": {
      "id": 1,
      "nombre": "Descuento Verano 15%",
      "descuento": 67.50
    }
  }
}
```

**En n8n:**
```
URL: {{ $baseUrl }}/api/n8n/calcular-precio
Method: POST
Content-Type: application/json

Body:
{
  "tipo_habitacion_id": 1,
  "cantidad": 1,
  "dias": 2,
  "promo_id": null
}
```

---

## 🤖 Prompt para el Agente IA

Copia este prompt en tu nodo de AI Agent:

```
Eres un asistente de reservas de hotel profesional y amable.

Tu rol es ayudar a los usuarios a:
1. Consultar disponibilidad de cuartos
2. Ver precios
3. Conocer promociones

Cuando un usuario pregunta sobre disponibilidad:
- Extrae: fechas de entrada/salida, cantidad de huéspedes
- Convierte fechas al formato YYYY-MM-DD
- Llama al endpoint con los datos
- Presenta las habitaciones de forma clara y atractiva

Cuando pregunta por precio:
- Usa el endpoint calcular-precio
- Incluye descuentos aplicables
- Muestra desglose: precio_noche × días = subtotal

Siempre responde:
- Nombre de la habitación
- Capacidad
- Precio por noche
- Precio total para la estadía
- Promociones o descuentos
- Disponibilidad

Sé amable, profesional y siempre ofrece alternativas.
```

---

## 📱 Flujo Visual del Workflow n8n

```
┌────────────────────┐
│   USUARIO DICE:    │
│ "¿Hay cuartos      │
│  del 5 al 7 mayo?" │
└─────────┬──────────┘
          │
          ▼
    ┌──────────────┐
    │  Chat Node   │ ← Input
    └─────┬────────┘
          │
          ▼
┌──────────────────────────┐
│  AI Agent (Claude/GPT-4) │
│ Parsea: fechas, personas │
└─────┬────────────────────┘
      │
      ▼
┌───────────────────────────────────────┐
│  HTTP Request (GET)                   │
│  /api/n8n/disponibilidad              │
│  fecha_entrada=2026-05-05             │
│  fecha_salida=2026-05-07              │
│  adultos=2                            │
└─────┬──────────────────────────────────┘
      │
      ▼
┌───────────────────────────┐
│  Response:                │
│  habitaciones_disponibles │
│  [Doble, Suite, Premium]  │
└─────┬─────────────────────┘
      │
      ▼
┌──────────────────────────┐
│  AI Agent                │
│  Formatea respuesta:     │
│ "Tenemos 3 opciones..." │
└─────┬───────────────────┘
      │
      ▼
┌──────────────────┐
│  Chat Node       │
│  Output          │
│  (Muestra al     │
│   usuario)       │
└──────────────────┘
```

---

## 🧪 Prueba Rápida en Postman

1. **Abre Postman**
2. **Crea nueva solicitud:**

   **Tab 1 - Disponibilidad:**
   ```
   Method: GET
   URL: http://localhost:8000/api/n8n/disponibilidad
   
   Query Params:
   - fecha_entrada: 2026-05-01
   - fecha_salida: 2026-05-05
   - adultos: 2
   - infantes: 0
   ```

   **Tab 2 - Precio:**
   ```
   Method: POST
   URL: http://localhost:8000/api/n8n/calcular-precio
   
   Headers:
   Content-Type: application/json
   
   Body (raw):
   {
     "tipo_habitacion_id": 1,
     "cantidad": 1,
     "dias": 4,
     "promo_id": null
   }
   ```

3. **Click "Send"**
4. Ver respuesta en JSON

---

## 🛑 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `404 Not Found` | Ruta no existe | Verifica que routes/api.php esté creado |
| `422 Validation Failed` | Parámetros inválidos | Verifica fechas en formato YYYY-MM-DD |
| `500 Server Error` | Error en BD | Verifica que existan Habitaciones en BD |
| `CORS Error` | Origen bloqueado | Agrega origen en config/cors.php |

---

## 📞 Verificación Final

```bash
# Test 1: ¿Funciona información?
curl http://localhost:8000/api/n8n/informacion

# Test 2: ¿Funciona disponibilidad?
curl "http://localhost:8000/api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2"

# Test 3: ¿Funciona precio?
curl -X POST http://localhost:8000/api/n8n/calcular-precio \
  -H "Content-Type: application/json" \
  -d '{"tipo_habitacion_id":1,"cantidad":1,"dias":2,"promo_id":null}'
```

Si los 3 retornan JSON, ¡está listo para usar en n8n!

---

## ✅ Checklist Final

- [ ] Endpoints creados (archivos en app/Http/Controllers/Api/)
- [ ] Rutas configuradas (routes/api.php)
- [ ] Bootstrap.php actualizado para cargar API routes
- [ ] BD tiene tipos de habitación
- [ ] BD tiene habitaciones (habitacion_eventos)
- [ ] Probé los endpoints con curl/Postman
- [ ] n8n workflow creado
- [ ] HTTP Request nodo configurado
- [ ] AI Agent nodo configurado
- [ ] Chat nodes conectados
- [ ] Testeé con una pregunta de usuario

---

**Documentación Completa:**
- Technicamente detallade: [N8N_INTEGRATION_GUIDE.md](./N8N_INTEGRATION_GUIDE.md)
- Resumen arquitectura: [RESUMEN_N8N.md](./RESUMEN_N8N.md)
- Checklist de configuración: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

**¡Listo para usar!** 🎉
