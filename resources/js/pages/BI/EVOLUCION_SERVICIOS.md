# Nueva Gráfica: Evolución Temporal de Servicios

## 📊 Descripción

Se ha agregado una **nueva gráfica de líneas** que muestra la **evolución temporal del uso de servicios** en el hotel. Esta gráfica complementa la gráfica de "Uso de Servicios" existente, permitiendo ver:

- **Gráfica 1 (Uso de Servicios)**: Total acumulado de cantidad e ingresos por servicio
- **Gráfica 2 (Evolución Temporal)**: Tendencia de uso de cada servicio a lo largo del tiempo

## 🎯 Objetivo

Responder preguntas como:
- ¿En qué días de la semana se usa más el Gym?
- ¿Cuál es la tendencia de uso del Restaurant?
- ¿Qué servicios tienen picos de demanda los fines de semana?
- ¿Cómo varía el uso de la Piscina durante el mes?

## 📈 Características

### Datos Mostrados
- **6 servicios** rastreados simultáneamente:
  - Gym (azul)
  - Spa (rosa)
  - Piscina (celeste)
  - Restaurant (verde)
  - Room Service (amarillo)
  - Lavandería (rojo)

### Filtros Disponibles
- **Esta Semana**: Datos por día (Lun-Dom)
- **Este Mes**: Datos por semana (Sem 1-4)
- **Este Trimestre**: Datos por mes (Ene-Mar)

### Interactividad
- ✅ **Toggle de leyenda**: Click en la leyenda para ocultar/mostrar servicios
- ✅ **Tooltip**: Hover para ver valores exactos
- ✅ **Filtros**: Cambiar período de visualización

## 💾 Datos Mock Creados

```typescript
export const evolucionServiciosData = [
  { periodo: "Lun", gym: 8, spa: 5, piscina: 12, restaurant: 18, roomService: 10, lavanderia: 4 },
  { periodo: "Mar", gym: 12, spa: 7, piscina: 15, restaurant: 22, roomService: 14, lavanderia: 6 },
  // ... más días
];
```

## 🔄 Integración con Backend

Cuando se conecte al backend, el endpoint deberá retornar:

```php
// Endpoint: GET /api/bi/evolucion-servicios?periodo={semana|mes|trimestre}

// Respuesta esperada:
{
  "data": [
    {
      "periodo": "Lun",
      "gym": 8,
      "spa": 5,
      "piscina": 12,
      "restaurant": 18,
      "roomService": 10,
      "lavanderia": 4
    },
    // ...
  ],
  "metadata": {
    "periodo": "semana",
    "total_usos": 87,
    "servicio_mas_usado": "Restaurant"
  }
}
```

### Query Sugerida (Laravel)

```php
// Para "Esta Semana" (por día)
Transaccion::with('servicio')
    ->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])
    ->selectRaw('
        DAYNAME(created_at) as periodo,
        servicio_id,
        COUNT(*) as cantidad
    ')
    ->groupBy('periodo', 'servicio_id')
    ->get()
    ->groupBy('periodo')
    ->map(function($items) {
        return $items->pluck('cantidad', 'servicio.nombre')->toArray();
    });

// Para "Este Mes" (por semana)
Transaccion::with('servicio')
    ->whereMonth('created_at', now()->month)
    ->selectRaw('
        WEEK(created_at) as semana,
        servicio_id,
        COUNT(*) as cantidad
    ')
    ->groupBy('semana', 'servicio_id')
    ->get();
```

## 📍 Ubicación en el Dashboard

La gráfica se encuentra en la **Fila 6**, después del "Análisis Financiero" y antes del "Resumen de Rendimiento".

## 🎨 Componente Utilizado

Se reutilizó el componente **`GenericLineChart`** existente, sin necesidad de crear un nuevo componente genérico.

## 🔮 Próximas Mejoras

1. **Agregar ingresos**: Mostrar también la evolución de ingresos por servicio
2. **Comparativa**: Comparar semana actual vs semana anterior
3. **Predicción**: Agregar línea de predicción basada en tendencias
4. **Zoom**: Permitir zoom en períodos específicos
5. **Exportación**: Exportar datos a CSV/Excel

## ✅ Resumen

- ✅ Nueva gráfica de evolución temporal agregada
- ✅ 6 servicios rastreados simultáneamente
- ✅ 3 filtros de período (semana/mes/trimestre)
- ✅ Datos mock realistas creados
- ✅ Componente genérico reutilizado
- ✅ Lista para integración con backend
