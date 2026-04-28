# 📱 Nuevos Endpoints para Telegram + Servicios y Platillos

## 🆕 Endpoints Agregados

### 1️⃣ GET `/api/n8n/servicios`
**Obtener listado de servicios disponibles**

```bash
curl http://127.0.0.1:8000/api/n8n/servicios?estado=activo
```

**Parámetros:** `estado` (default: activo)

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Spa",
      "descripcion": "Masaje relajante",
      "categoría": "Relajación",
      "precio": 50.00,
      "estado": "activo",
      "imagen": "https://..."
    }
  ],
  "total": 3
}
```

---

### 2️⃣ GET `/api/n8n/servicios/{id}`
**Detalle de un servicio específico**

```bash
curl http://127.0.0.1:8000/api/n8n/servicios/1
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Spa",
    "descripcion": "Disponible de 8am a 8pm",
    "categoría": "Relajación",
    "precio": 50.00,
    "estado": "activo",
    "imagenes": ["url1", "url2"],
    "created_at": "2026-01-15 10:00:00"
  }
}
```

---

### 3️⃣ GET `/api/n8n/platillos`
**Obtener listado de platillos (comidas)**

```bash
curl "http://127.0.0.1:8000/api/n8n/platillos?estado=activo&categoria_id=2"
```

**Parámetros:**
- `estado` (default: activo)
- `categoria_id` (opcional)

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Lomo Saltado",
      "descripcion": "Tradicional entre otros platos...",
      "ingredientes": "Lomo, Papa, Cebolla",
      "categoría": "Platos Principales",
      "precio": 45.00,
      "imagen": "https://...",
      "estado": "activo"
    }
  ],
  "total": 15
}
```

---

### 4️⃣ GET `/api/n8n/platillos/{id}`
**Detalle de un platillo específico**

```bash
curl http://127.0.0.1:8000/api/n8n/platillos/5
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "nombre": "Lomo Saltado",
    "descripcion": "Tradicional entre otros...",
    "ingredientes": "Lomo, Papa, Cebolla, Ajo",
    "categoría": "Platos Principales",
    "precio": 45.00,
    "imagen": "https://...",
    "estado": "activo",
    "created_at": "2026-01-10 14:00:00"
  }
}
```

---

### 5️⃣ GET `/api/n8n/categorias`
**Obtener categorías (servicios, platillos, etc)**

```bash
curl "http://127.0.0.1:8000/api/n8n/categorias?tipo=servicio"
```

**Parámetros:**
- `tipo` (opcional) - "servicio" | "platillo" | "habitacion"

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Relajación",
      "descripcion": "Servicios de spa y wellness",
      "tipo": "servicio",
      "imagen": null
    },
    {
      "id": 2,
      "nombre": "Restaurante",
      "descripcion": "Nuestros platillos",
      "tipo": "platillo",
      "imagen": null
    }
  ],
  "total": 5
}
```

---

### 6️⃣ POST `/api/n8n/reserva-completa`
**Crear reserva completa con servicios y platillos (IDEAL PARA TELEGRAM)**

```bash
curl -X POST http://127.0.0.1:8000/api/n8n/reserva-completa \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "García",
    "email": "juan@example.com",
    "telefono": "71234567",
    "ci_pasaporte": "1234567",
    
    "fecha_entrada": "2026-05-15",
    "fecha_salida": "2026-05-18",
    "adultos": 2,
    "infantes": 1,
    "tipo_viaje": "familiar",
    
    "habitaciones": [
      {
        "tipo_habitacion_id": 1,
        "cantidad": 1
      }
    ],
    
    "servicios_ids": [1, 3],
    "platillos_ids": [5, 7, 10],
    
    "metodo_pago": "qr",
    "monto_pago": 500,
    "promo_id": null
  }'
```

**Body requerido:**
```json
{
  "nombre": "string (required)",
  "apellido": "string (optional)",
  "email": "email (required)",
  "telefono": "string (required)",
  "ci_pasaporte": "string (required)",
  
  "fecha_entrada": "date YYYY-MM-DD (required)",
  "fecha_salida": "date YYYY-MM-DD (required)",
  "adultos": "integer >= 1 (required)",
  "infantes": "integer >= 0 (optional)",
  "tipo_viaje": "string (required)",
  
  "habitaciones": [
    {
      "tipo_habitacion_id": "integer (required)",
      "cantidad": "integer >= 1 (required)"
    }
  ],
  
  "servicios_ids": "array (optional) - IDs de servicios a agregar",
  "platillos_ids": "array (optional) - IDs de platillos a agregar",
  
  "metodo_pago": "qr|stripe|garante (required)",
  "monto_pago": "numeric >= 0 (required)",
  "promo_id": "integer (optional)"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "data": {
    "reserva_id": 42,
    "codigo": "RES-000042",
    "cliente": {
      "nombre": "Juan García",
      "email": "juan@example.com",
      "telefono": "71234567"
    },
    "fecha_entrada": "2026-05-15",
    "fecha_salida": "2026-05-18",
    "dias": 3,
    "monto_total": 1250.50,
    "pago_inicial": 500.00,
    "saldo_pendiente": 750.50,
    "descuento": 0.00,
    "subtotal_habitaciones": 750.00,
    "subtotal_servicios": 150.00,
    "subtotal_platillos": 350.50
  }
}
```

---

## 📋 Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/n8n/informacion` | Estado general del hotel |
| GET | `/api/n8n/disponibilidad` | Habitaciones disponibles |
| GET | `/api/n8n/habitaciones` | Listar habitaciones |
| GET | `/api/n8n/promociones` | Promociones activas |
| POST | `/api/n8n/calcular-precio` | Calcular precio |
| GET | `/api/n8n/categorias` | Listar categorías |
| GET | `/api/n8n/servicios` | Listar servicios ✨ NEW |
| GET | `/api/n8n/servicios/{id}` | Detalle servicio ✨ NEW |
| GET | `/api/n8n/platillos` | Listar platillos ✨ NEW |
| GET | `/api/n8n/platillos/{id}` | Detalle platillo ✨ NEW |
| POST | `/api/n8n/reserva-completa` | Reserva con servicios ✨ NEW |

---

## 🤖 Ejemplo: Flujo en Telegram

```
Usuario: "Quiero una habitación para 3 personas del 15 al 18 de mayo, 
          con spa y lomo saltado"

Bot:
1. GET /api/n8n/disponibilidad
   (fecha_entrada=2026-05-15, persona=3)
   → Obtiene habitaciones disponibles

2. GET /api/n8n/servicios
   → Muestra servicios disponibles (incluye Spa)

3. GET /api/n8n/platillos
   → Muestra platillos (incluye Lomo Saltado)

4. Usuario elige: Hab Doble ($250/noche) + Spa ($50) + Lomo ($45)

5. POST /api/n8n/reserva-completa
{
  "nombre": "Juan",
  "email": "juan@telegram.com",
  "telefono": "71234567",
  "ci_pasaporte": "1234567",
  "fecha_entrada": "2026-05-15",
  "fecha_salida": "2026-05-18",
  "adultos": 3,
  "habitaciones": [{"tipo_habitacion_id": 1, "cantidad": 1}],
  "servicios_ids": [1],
  "platillos_ids": [5],
  "metodo_pago": "qr",
  "monto_pago": 300
}

Bot responde:
✅ Reserva confirmada
📅 15-18 May (3 noches)
🛏️ Doble Standard: $750
🧖 Spa: $50
🍽️ Lomo Saltado: $45
💰 Total: $845 (Pago inicial: $300, Pendiente: $545)
```

---

## 🧪 Testing en Postman

### 1. Crear nueva colección "Hotel n8n API"

### 2. Test: Listar servicios
```
GET http://127.0.0.1:8000/api/n8n/servicios
```

### 3. Test: Listar platillos
```
GET http://127.0.0.1:8000/api/n8n/platillos
```

### 4. Test: Crear reserva completa
```
POST http://127.0.0.1:8000/api/n8n/reserva-completa

Body (raw JSON):
{
  "nombre": "Juan",
  "apellido": "García",
  "email": "juan@hotel.com",
  "telefono": "71234567",
  "ci_pasaporte": "123456",
  "fecha_entrada": "2026-05-15",
  "fecha_salida": "2026-05-17",
  "adultos": 2,
  "infantes": 0,
  "tipo_viaje": "pareja",
  "habitaciones": [
    {
      "tipo_habitacion_id": 1,
      "cantidad": 1
    }
  ],
  "servicios_ids": [1, 2],
  "platillos_ids": [5, 7],
  "metodo_pago": "qr",
  "monto_pago": 200,
  "promo_id": null
}
```

---

## ✅ Uso en Telegram Bot (Ejemplo pseudocódigo)

```python
# En tu bot de Telegram
@bot.message_handler(regexp=r"quiero.*habitación")
def handle_reservation(message):
    chat_id = message.chat.id
    
    # 1. Llamar a /api/n8n/disponibilidad
    availability = requests.get(
        "http://127.0.0.1:8000/api/n8n/disponibilidad",
        params={
            "fecha_entrada": parsed_dates['entrada'],
            "fecha_salida": parsed_dates['salida'],
            "adultos": int(parsed_people),
            "infantes": 0
        }
    ).json()
    
    # 2. Mostrar opciones
    bot.send_message(chat_id, f"Disponibilidad:")
    for hab in availability['data']['habitaciones_disponibles']:
        bot.send_message(
            chat_id,
            f"• {hab['nombre']}: ${hab['precio_noche']}/noche"
        )
    
    # 3. Usuario elige y confirma
    # 4. POST /api/n8n/reserva-completa
    
    reserva = requests.post(
        "http://127.0.0.1:8000/api/n8n/reserva-completa",
        json=reservation_data
    ).json()
    
    # 5. Confirmar
    bot.send_message(
        chat_id,
        f"✅ Reserva {reserva['data']['codigo']} confirmada!"
    )
```

---

## 🛠️ Configuración en n8n

Usa estos endpoints en tus nodos HTTP Request de n8n:

**Telegram → AI Agent → HTTP GET /api/n8n/servicios → Respuesta**

**Sistema de reserva completo:**
1. Chat input (usuario)
2. AI Agent (parseador)
3. HTTP GET /api/n8n/disponibilidad
4. HTTP GET /api/n8n/servicios
5. HTTP GET /api/n8n/platillos
6. AI Agent (formatea opciones)
7. Chat output (muestra opciones)
8. Usuario elige
9. HTTP POST /api/n8n/reserva-completa
10. Chat output (confirmación)

---

**Documentación completa:** Ver archivos anteriores
- N8N_INTEGRATION_GUIDE.md
- GUIA_N8N_ESPANOL.md
