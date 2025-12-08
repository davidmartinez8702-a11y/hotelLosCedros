# 📊 Implementación: Uso de Servicios con Granularidad Dinámica

## ✅ Backend Completado

### **Endpoint Creado**
```
GET /api/bi/uso-servicios
```

### **Parámetros**
| Parámetro | Tipo | Requerido | Valores | Descripción |
|-----------|------|-----------|---------|-------------|
| `granularidad` | string | ❌ No | `anio`, `mes`, `dia` | Nivel de detalle (default: `mes`) |
| `anio` | integer | ❌ No | 2020-2030 | Año a consultar (default: año actual) |
| `mes` | integer | Condicional | 1-12 | Mes (requerido si granularidad=`mes` o `dia`) |
| `dia` | integer | Condicional | 1-31 | Día (requerido si granularidad=`dia`) |

### **Granularidades**

#### **1. Año (`granularidad=anio`)**
- **Eje X**: Meses (Ene - Dic)
- **12 puntos de datos**
- **Ejemplo**: `/api/bi/uso-servicios?granularidad=anio&anio=2024`

#### **2. Mes (`granularidad=mes`)**
- **Eje X**: Semanas (Sem 1 - Sem 5)
- **4-5 puntos de datos**
- **Ejemplo**: `/api/bi/uso-servicios?granularidad=mes&anio=2024&mes=12`

#### **3. Día (`granularidad=dia`)**
- **Eje X**: Horas (00:00 - 23:00)
- **24 puntos de datos**
- **Ejemplo**: `/api/bi/uso-servicios?granularidad=dia&anio=2024&mes=12&dia=8`

---

## 📤 Respuesta del Endpoint

### **Estructura JSON**
```json
{
  "data": [
    {
      "periodo": 1,
      "Gym_cantidad": 45,
      "Gym_ingresos": 11250.00,
      "Spa_cantidad": 30,
      "Spa_ingresos": 24000.00,
      "Piscina_cantidad": 60,
      "Piscina_ingresos": 9000.00,
      "Restaurant_cantidad": 120,
      "Restaurant_ingresos": 60000.00,
      "Room Service_cantidad": 80,
      "Room Service_ingresos": 24000.00,
      "Lavandería_cantidad": 40,
      "Lavandería_ingresos": 4000.00
    },
    ...
  ],
  "ejeX": ["Ene", "Feb", "Mar", ...],
  "metadata": {
    "granularidad": "anio",
    "periodo": "Año 2024",
    "servicios": [
      { "id": 1, "nombre": "Gym", "precio": 250.00 },
      { "id": 2, "nombre": "Spa", "precio": 800.00 },
      ...
    ]
  }
}
```

---

## 🎨 Frontend - Componente Propuesto

### **Selectores**
1. **Selector de Granularidad** (Año / Mes / Día)
2. **Selector de Año** (2020-2030)
3. **Selector de Mes** (1-12, visible si granularidad=mes o dia)
4. **Selector de Día** (1-31, visible si granularidad=dia)

### **Lógica de Selectores**
```typescript
// Estado
const [granularidad, setGranularidad] = useState('anio');
const [anio, setAnio] = useState(2024);
const [mes, setMes] = useState<number | undefined>();
const [dia, setDia] = useState<number | undefined>();

// Al cambiar granularidad
if (granularidad === 'anio') {
  // Solo mostrar selector de año
  setMes(undefined);
  setDia(undefined);
} else if (granularidad === 'mes') {
  // Mostrar año y mes
  setDia(undefined);
  if (!mes) setMes(1);
} else if (granularidad === 'dia') {
  // Mostrar año, mes y día
  if (!mes) setMes(1);
  if (!dia) setDia(1);
}
```

### **Configuración de Barras**
```typescript
// Generar configuración dinámica basada en servicios
const barsConfig = metadata?.servicios.flatMap(servicio => [
  {
    dataKey: `${servicio.nombre}_cantidad`,
    name: `${servicio.nombre} (Cantidad)`,
    fill: getColorForService(servicio.id, 'cantidad'),
    radius: [8, 8, 0, 0],
  },
  {
    dataKey: `${servicio.nombre}_ingresos`,
    name: `${servicio.nombre} (Ingresos)`,
    fill: getColorForService(servicio.id, 'ingresos'),
    radius: [8, 8, 0, 0],
  },
]) || [];
```

---

## 🎨 Paleta de Colores Sugerida

```typescript
const coloresPorServicio = {
  1: { cantidad: '#3b82f6', ingresos: '#60a5fa' }, // Gym - Azul
  2: { cantidad: '#8b5cf6', ingresos: '#a78bfa' }, // Spa - Púrpura
  3: { cantidad: '#06b6d4', ingresos: '#22d3ee' }, // Piscina - Cyan
  4: { cantidad: '#f59e0b', ingresos: '#fbbf24' }, // Restaurant - Ámbar
  5: { cantidad: '#10b981', ingresos: '#34d399' }, // Room Service - Verde
  6: { cantidad: '#ec4899', ingresos: '#f472b6' }, // Lavandería - Rosa
};
```

---

## 📝 Ejemplo de Uso en BIHotelDinamico.tsx

```tsx
import { useUsoServicios } from '@/hooks/useUsoServicios';

const [granularidad, setGranularidad] = useState<'anio' | 'mes' | 'dia'>('anio');
const [anio, setAnio] = useState(2024);
const [mes, setMes] = useState<number>();
const [dia, setDia] = useState<number>();

const { data, ejeX, metadata, loading, error } = useUsoServicios({
  granularidad,
  anio,
  mes,
  dia,
});

// Generar configuración de barras dinámicamente
const barsConfig = metadata?.servicios.flatMap(servicio => [
  {
    dataKey: `${servicio.nombre}_cantidad`,
    name: `${servicio.nombre} (Cantidad)`,
    fill: getColorForService(servicio.id, 'cantidad'),
  },
  {
    dataKey: `${servicio.nombre}_ingresos`,
    name: `${servicio.nombre} (Ingresos Bs)`,
    fill: getColorForService(servicio.id, 'ingresos'),
  },
]) || [];

<GenericMultiBarChart
  data={data}
  bars={barsConfig}
  categoryKey="periodo"
  title="Uso de Servicios"
  description={metadata?.periodo}
/>
```

---

## 🧪 Ejemplos de Prueba en Postman

### **1. Ver todo el año 2024**
```
GET /api/bi/uso-servicios?granularidad=anio&anio=2024
```

### **2. Ver diciembre 2024 por semanas**
```
GET /api/bi/uso-servicios?granularidad=mes&anio=2024&mes=12
```

### **3. Ver 8 de diciembre 2024 por horas**
```
GET /api/bi/uso-servicios?granularidad=dia&anio=2024&mes=12&dia=8
```

---

## ✅ Próximos Pasos

1. [ ] Crear componente `UsoServiciosChart.tsx`
2. [ ] Implementar selectores de granularidad
3. [ ] Generar configuración de barras dinámica
4. [ ] Agregar a `BIHotelDinamico.tsx`
5. [ ] Probar con datos reales
6. [ ] Ajustar colores y leyendas

---

## 🎯 Características Implementadas

- ✅ Backend con 3 granularidades
- ✅ Queries optimizadas para PostgreSQL
- ✅ Cálculo automático de ingresos
- ✅ Todos los servicios en una sola llamada
- ✅ Eje X dinámico según granularidad
- ✅ Hook de React con TypeScript
- ✅ Ruta API configurada
