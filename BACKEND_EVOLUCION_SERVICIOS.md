# Backend: Evolución Temporal de Servicios

## ✅ Implementación Completada

Se ha creado el backend para la gráfica de **Evolución Temporal de Uso de Servicios** que retorna datos dinámicos desde la base de datos.

---

## 📋 Endpoint Creado

### **URL**
```
GET /bi/api/evolucion-servicios
```

### **Parámetros**
| Parámetro | Tipo | Requerido | Valores | Descripción |
|-----------|------|-----------|---------|-------------|
| `servicio_id` | integer | ✅ Sí | ID del servicio | ID del servicio a consultar |
| `periodo` | string | ❌ No | `hoy`, `semana`, `mes`, `anio` | Período de tiempo (default: `semana`) |

### **Ejemplo de Uso**
```javascript
// Esta Semana - Gym (ID: 1)
GET /bi/api/evolucion-servicios?servicio_id=1&periodo=semana

// Hoy - Spa (ID: 2)
GET /bi/api/evolucion-servicios?servicio_id=2&periodo=hoy

// Este Mes - Piscina (ID: 3)
GET /bi/api/evolucion-servicios?servicio_id=3&periodo=mes

// Este Año - Restaurant (ID: 4)
GET /bi/api/evolucion-servicios?servicio_id=4&periodo=anio
```

---

## 📊 Períodos Soportados

### **1. Hoy (`periodo=hoy`)**
- **Eje X**: Horas (00:00 - 23:00)
- **24 puntos de datos** (una por cada hora)
- **Query**: Agrupa por `HOUR(created_at)`

### **2. Esta Semana (`periodo=semana`)** ⭐ Default
- **Eje X**: Días (Lun, Mar, Mié, Jue, Vie, Sáb, Dom)
- **7 puntos de datos** (uno por cada día)
- **Query**: Agrupa por `DAYOFWEEK(created_at)`
- **Rango**: Desde inicio de semana hasta fin de semana

### **3. Este Mes (`periodo=mes`)**
- **Eje X**: Días del mes (1-31)
- **Variable puntos de datos** (según días del mes)
- **Query**: Agrupa por `DAY(created_at)`
- **Rango**: Desde inicio de mes hasta fin de mes

### **4. Este Año (`periodo=anio`)**
- **Eje X**: Meses (Ene - Dic)
- **12 puntos de datos** (uno por cada mes)
- **Query**: Agrupa por `MONTH(created_at)`
- **Rango**: Desde inicio de año hasta fin de año

---

## 📤 Respuesta del Endpoint

### **Estructura JSON**
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
    }
    // ... más días
  ],
  "servicio": {
    "id": 1,
    "nombre": "Gym",
    "precio": 250.00
  },
  "periodo": "semana",
  "metadata": {
    "total_cantidad": 87,
    "total_ingresos": 21750.00,
    "updated_at": "2025-12-08T04:05:51.000000Z"
  }
}
```

### **Campos de Respuesta**

**`data`** (array):
- `periodo`: Etiqueta del eje X (día, hora, mes)
- `cantidad`: Número de veces que se adquirió el servicio
- `ingresos`: Ingresos generados (cantidad × precio del servicio)

**`servicio`** (object):
- `id`: ID del servicio
- `nombre`: Nombre del servicio
- `precio`: Precio unitario del servicio

**`periodo`** (string):
- Período consultado (`hoy`, `semana`, `mes`, `anio`)

**`metadata`** (object):
- `total_cantidad`: Suma total de todas las cantidades
- `total_ingresos`: Suma total de todos los ingresos
- `updated_at`: Timestamp de cuando se generó la respuesta

---

## 🗄️ Tablas Utilizadas

### **`transaccions`**
```sql
- id
- cuenta_id
- servicio_id (FK a servicios)
- platillo_id
- cantidad (usado para contar usos)
- estado
- created_at (usado para agrupar por tiempo)
- updated_at
```

### **`servicios`**
```sql
- id
- nombre
- descripcion
- precio (usado para calcular ingresos)
- categoria_id
- estado
- created_at
- updated_at
```

---

## 💡 Lógica de Cálculo

### **Cantidad**
```php
SUM(transaccions.cantidad)
```
Suma de todas las transacciones del servicio en el período.

### **Ingresos**
```php
cantidad × servicios.precio
```
Multiplicación de la cantidad por el precio del servicio.

---

## 🔧 Archivos Modificados

### **1. BIController.php**
**Ubicación**: `app/Http/Controllers/BIController.php`

**Métodos creados**:
- `getEvolucionServicios()` - Método principal del endpoint
- `getEvolucionPorHora()` - Datos por hora (Hoy)
- `getEvolucionPorDiaSemana()` - Datos por día (Esta Semana)
- `getEvolucionPorDiaMes()` - Datos por día del mes (Este Mes)
- `getEvolucionPorMes()` - Datos por mes (Este Año)

### **2. web.php**
**Ubicación**: `routes/web.php`

**Cambios**:
- Agregado `use App\Http\Controllers\BIController;`
- Creado grupo de rutas `bi.*`
- Agregada ruta `GET /bi/api/evolucion-servicios`

---

## 🚀 Próximos Pasos

### **Frontend**
1. Crear hook `useEvolucionServicios` para consumir el endpoint
2. Actualizar `BIHotelGenerico.tsx` para usar datos reales
3. Mapear servicios a IDs (Gym=1, Spa=2, etc.)
4. Manejar estados de loading y error

### **Backend**
1. Agregar caché (5 minutos) para optimizar
2. Agregar validación de parámetros
3. Agregar paginación si es necesario
4. Crear endpoints para otras gráficas

---

## 📝 Ejemplo de Integración Frontend

```typescript
// Hook personalizado
const useEvolucionServicios = (servicioId: number, periodo: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/bi/api/evolucion-servicios', {
      params: { servicio_id: servicioId, periodo }
    })
    .then(res => setData(res.data.data))
    .finally(() => setLoading(false));
  }, [servicioId, periodo]);
  
  return { data, loading };
};

// Uso en componente
const { data, loading } = useEvolucionServicios(1, 'semana');

<GenericMultiBarChart
  data={data || []}
  bars={evolucionServiciosBarsConfig}
  categoryKey="periodo"
  title="Evolución Temporal de Uso de Servicios"
/>
```

---

## ✅ Validaciones Implementadas

1. ✅ Validación de `servicio_id` requerido
2. ✅ Validación de existencia del servicio
3. ✅ Manejo de períodos inválidos (default a `semana`)
4. ✅ Retorno de 0 cuando no hay datos para un período
5. ✅ Formato consistente de respuesta JSON

---

## 🎯 Resumen

- ✅ Endpoint funcional creado
- ✅ 4 períodos soportados (hoy, semana, mes, año)
- ✅ Cálculo automático de ingresos
- ✅ Respuesta JSON estructurada
- ✅ Rutas configuradas
- ✅ Listo para integración frontend
