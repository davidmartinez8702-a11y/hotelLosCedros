# 📊 Resumen: Integración n8n + Hotel API

## ✅ Lo que hemos configurado

### 1. **Nuevo Controlador API**
- Archivo: `app/Http/Controllers/Api/N8nHotelController.php`
- Métodos públicos sin autenticación
- Validación de parámetros integrada
- Respuestas JSON limpias

### 2. **Rutas de API**
- Archivo: `routes/api.php`
- Base URL: `/api/n8n/`
- Configurado en: `bootstrap/app.php`

### 3. **5 Endpoints disponibles**

```
1️⃣  GET  /api/n8n/informacion
    → Estado general del hotel (ocupación, precios, etc)

2️⃣  GET  /api/n8n/disponibilidad
    → Buscar habitaciones disponibles en un rango de fechas
    Parámetros: fecha_entrada, fecha_salida, adultos, infantes

3️⃣  GET  /api/n8n/habitaciones
    → Listar todas las habitaciones del hotel
    Parámetro opcional: estado (activo/inactivo)

4️⃣  GET  /api/n8n/promociones
    → Obtener promociones vigentes

5️⃣  POST /api/n8n/calcular-precio
    → Calcular precio total con descuentos
    Body: tipo_habitacion_id, cantidad, dias, promo_id
```

---

## 🎯 Casos de Uso en n8n

### **Caso 1: Usuario pregunta "¿Hay cuartos disponibles para 2 personas del 1 al 5 de mayo?"**

```
Step 1: AI Agent (Claude/GPT)
├─ Parsea: adultos=2, fecha_entrada=2026-05-01, fecha_salida=2026-05-05

Step 2: HTTP GET
├─ URL: /api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-05&adultos=2&infantes=0

Step 3: Respuesta recibida
├─ Exrae datos de habitaciones_disponibles[]

Step 4: AI Agent formatea respuesta
└─ "Tenemos disponibles 3 tipos de habitaciones:
   - Doble Estándar: $150/noche - 5 disponibles
   - Suite Deluxe: $250/noche - 2 disponibles
   - Penthouse: $500/noche - 1 disponible"
```

### **Caso 2: Usuario pregunta "¿Cuánto cuesta una Doble por 3 noches con promoción?"**

```
Step 1: AI Agent
├─ Detecta: tipo_habitacion_id=1, cantidad=1, dias=3

Step 2: Obtener promociones (opcional)
├─ GET /api/n8n/promociones → promo_id=5 (descuento 15%)

Step 3: HTTP POST calcular-precio
├─ Body: { tipo_habitacion_id: 1, cantidad: 1, dias: 3, promo_id: 5 }

Step 4: Respuesta
├─ subtotal: $450
├─ descuento: $67.50
└─ total: $382.50
```

### **Caso 3: Dashboard de ocupación**

```
Step 1: Timer (cada 10 minutos)

Step 2: HTTP GET /api/n8n/informacion

Step 3: Datos obtenidos:
├─ habitaciones_ocupadas: 8
├─ habitaciones_disponibles: 12
├─ ocupacion_porcentaje: 40%

Step 4: Notificación (si ocupación > 80%)
└─ Slack: "⚠️ Ocupación crítica: 92%"
```

---

## 🔌 Integración en n8n (paso a paso)

### **1. Crear nuevo workflow en n8n**

```
1. Click en "+ New Workflow"
2. Agregar trigger (Chat, Schedule, Manual, etc)
```

### **2. Agregar nodo HTTP Request**

Para obtener disponibilidad:
```
Node Type: HTTP Request
Method: GET
URL: https://tuhotel.com/api/n8n/disponibilidad
Authentication: None

Query Parameters (Add Dynamic Values):
- fecha_entrada = {{ $now.format('yyyy-MM-dd') }}
- fecha_salida = {{ $now.addDays(7).format('yyyy-MM-dd') }}
- adultos = 2
- infantes = 0
```

### **3. Procesar respuesta con AI Agent**

```
Node Type: AI Agent (Claude, GPT-4, etc)
System Prompt:

"Eres un asistente de reservas amable y profesional.
El usuario solicita información sobre disponibilidad de habitaciones.
Tienes acceso a datos del hotel:

{{ $node["HTTP Request"].json }}

Responde de forma clara y natural:
- Menciona las habitaciones disponibles
- Indica precio por noche y total
- Sugiere promociones si aplican"
```

### **4. Enviar respuesta al usuario**

```
Node Type: Chat Send
Message: {{ $node["AI Agent"].json.text }}
```

---

## 📝 Ejemplo JSON para importar en n8n

```json
{
  "name": "Hotel Disponibilidad - Agente",
  "nodes": [
    {
      "parameters": {},
      "id": "1",
      "name": "Chat Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "https://tuhotel.com/api/n8n/disponibilidad",
        "queryParameters": {
          "parameters": [
            {
              "name": "fecha_entrada",
              "value": "2026-05-01"
            },
            {
              "name": "fecha_salida",
              "value": "2026-05-03"
            },
            {
              "name": "adultos",
              "value": "2"
            },
            {
              "name": "infantes",
              "value": "0"
            }
          ]
        }
      },
      "id": "2",
      "name": "Obtener Disponibilidad",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Chat Trigger": {
      "main": [
        [
          {
            "node": "Obtener Disponibilidad",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## 🧠 Prompt para AI Agent en n8n

Usa este prompt en tu nodo AI Agent:

```
You are a helpful hotel reservations assistant. 

When a user asks about:
1. Room availability: Call GET /api/n8n/disponibilidad with their dates/guests
2. Pricing: Call POST /api/n8n/calcular-precio with room details
3. Promotions: Reference the active promotions from the data

Available API endpoints:
- GET /api/n8n/disponibilidad (check availability)
- GET /api/n8n/habitaciones (list all rooms)
- GET /api/n8n/promociones (show active promos)
- POST /api/n8n/calcular-precio (calculate total price)
- GET /api/n8n/informacion (hotel general info)

Current hotel data: {{ $node["HTTP Request"].json }}

Always be friendly and professional. Format responses clearly with:
- Room types available
- Price per night
- Total cost for stay
- Any applicable discounts
```

---

## 🚀 Testing rápido

### Abrir terminal y testear con curl:

```bash
# Test 1: Información del hotel
curl https://tuhotel.com/api/n8n/informacion

# Test 2: Disponibilidad
curl "https://tuhotel.com/api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2"

# Test 3: Calcular precio
curl -X POST https://tuhotel.com/api/n8n/calcular-precio \
  -H "Content-Type: application/json" \
  -d '{"tipo_habitacion_id":1,"cantidad":1,"dias":3,"promo_id":null}'
```

---

## ⚙️ Configuración Final

### En `config/cors.php` (si necesitas CORS):

```php
'allowed_origins' => [
    'https://n8n.example.com',
    'http://localhost:5678', // n8n local
],
```

### En `.env` (si quieres):

```
API_N8N_TOKEN=opcional_para_futura_autenticacion
API_RATE_LIMIT=true
```

---

## 🎓 Resumen Visual

```
┌─────────────────┐
│   Usuario en    │
│  n8n Chat       │
│ "Disponibilidad │
│  del 1 al 5"    │
└────────┬────────┘
         │
         ▼
    ┌─────────────────────────┐
    │  AI Agent (Claude/GPT)  │
    │ Parsea solicitud        │
    └────────┬────────────────┘
             │
             ▼
    ┌──────────────────────────────────┐
    │  HTTP GET /api/n8n/disponibilidad│
    │  + filtros (fechas, personas)    │
    └────────┬───────────────────────┬─┘
             │                       │
             ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐
    │  Base de datos   │    │  Cache si existe │
    │  (Habitaciones)  │    │  (opcional)      │
    └────────┬─────────┘    └──────────────────┘
             │
             ▼
    ┌────────────────────────────────────┐
    │  JSON Response                     │
    │ {habitaciones_disponibles: [...]}  │
    └────────┬───────────────────────────┘
             │
             ▼
    ┌─────────────────────────┐
    │  AI Agent formatea      │
    │  respuesta para usuario │
    └────────┬────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │  Usuario recibe respuesta:   │
    │  "Tenemos 5 habitaciones... "│
    └──────────────────────────────┘
```

---

## 📞 Ver documentación

- Guía completa: [N8N_INTEGRATION_GUIDE.md](./N8N_INTEGRATION_GUIDE.md)
- Controlador: [app/Http/Controllers/Api/N8nHotelController.php](./app/Http/Controllers/Api/N8nHotelController.php)
- Rutas: [routes/api.php](./routes/api.php)
