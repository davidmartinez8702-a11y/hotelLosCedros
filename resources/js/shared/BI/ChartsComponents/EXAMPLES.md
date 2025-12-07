# Ejemplos de Uso - Componentes Genéricos de Charts

## Importación

```tsx
import {
  GenericBarChart,
  GenericHorizontalBarChart,
  GenericLineChart,
  GenericPieChart,
  GenericAreaChart,
  GenericMultiBarChart,
} from "@/shared/BI/ChartsComponents";
```

## 1. GenericBarChart - Barras Verticales

**Uso:** Canales de reserva, uso de servicios, ventas por categoría

```tsx
// Datos del backend
const serviciosData = [
  { servicio: "Gym", cantidad: 45 },
  { servicio: "Spa", cantidad: 32 },
  { servicio: "Piscina", cantidad: 67 },
  { servicio: "Restaurant", cantidad: 89 },
];

// Renderizado
<GenericBarChart
  data={serviciosData}
  dataKey="cantidad"
  categoryKey="servicio"
  title="Uso de Servicios"
  description="Cantidad de usos por servicio"
  color="#667eea"
  gradient={true}
/>
```

## 2. GenericHorizontalBarChart - Barras Horizontales

**Uso:** Comparativas, rankings, análisis por categoría

```tsx
const comparativaData = [
  { mes: "Enero", actual: 85, anterior: 78 },
  { mes: "Febrero", actual: 92, anterior: 85 },
  { mes: "Marzo", actual: 88, anterior: 90 },
];

const barsConfig = [
  { dataKey: "actual", name: "2024", fill: "#667eea" },
  { dataKey: "anterior", name: "2023", fill: "#d1d5db" },
];

<GenericHorizontalBarChart
  data={comparativaData}
  bars={barsConfig}
  categoryKey="mes"
  title="Comparativa Anual"
  description="Ocupación 2024 vs 2023"
/>
```

## 3. GenericLineChart - Líneas

**Uso:** Predicciones, tendencias, evolución temporal

```tsx
const prediccionesData = [
  { mes: "Ene", prediccion: 120, maximo: 135, minimo: 105 },
  { mes: "Feb", prediccion: 135, maximo: 150, minimo: 120 },
  { mes: "Mar", prediccion: 145, maximo: 160, minimo: 130 },
];

const linesConfig = [
  { dataKey: "prediccion", name: "Predicción", stroke: "#6366f1", strokeWidth: 3 },
  { dataKey: "maximo", name: "Máximo", stroke: "#10b981", strokeDasharray: "5 5" },
  { dataKey: "minimo", name: "Mínimo", stroke: "#f59e0b", strokeDasharray: "5 5" },
];

<GenericLineChart
  data={prediccionesData}
  lines={linesConfig}
  categoryKey="mes"
  title="Predicción de Reservas"
  description="Proyección para próximos meses"
/>
```

## 4. GenericPieChart - Pie/Donut

**Uso:** Distribuciones, porcentajes, segmentación

```tsx
const distribucionData = [
  { tipo: "Viaje de Negocios", cantidad: 28, fill: "#667eea" },
  { tipo: "Viaje Familiar", cantidad: 35, fill: "#764ba2" },
  { tipo: "Luna de Miel", cantidad: 15, fill: "#f093fb" },
  { tipo: "Turismo Individual", cantidad: 12, fill: "#4facfe" },
];

<GenericPieChart
  data={distribucionData}
  dataKey="cantidad"
  nameKey="tipo"
  title="Tipos de Reserva"
  description="Distribución por motivo de viaje"
  innerRadius={65}
  outerRadius={110}
/>
```

## 5. GenericAreaChart - Áreas Apiladas

**Uso:** Estados de reservas, distribuciones temporales

```tsx
const estadosData = [
  { dia: "Lun", confirmadas: 45, pendientes: 12, canceladas: 3 },
  { dia: "Mar", confirmadas: 52, pendientes: 8, canceladas: 2 },
  { dia: "Mié", confirmadas: 48, pendientes: 15, canceladas: 4 },
];

const areasConfig = [
  { dataKey: "confirmadas", name: "Confirmadas", stroke: "#667eea", fill: "#667eea", stackId: "1" },
  { dataKey: "pendientes", name: "Pendientes", stroke: "#fbbf24", fill: "#fbbf24", stackId: "1" },
  { dataKey: "canceladas", name: "Canceladas", stroke: "#ef4444", fill: "#ef4444", stackId: "1" },
];

<GenericAreaChart
  data={estadosData}
  areas={areasConfig}
  categoryKey="dia"
  title="Estado de Reservas"
  description="Distribución semanal"
  stacked={true}
/>
```

## 6. GenericMultiBarChart - Barras Múltiples Dinámicas

**Uso:** Ingresos vs Gastos, comparativas con N columnas

```tsx
// Ejemplo con 2 barras
const ingresosGastosData = [
  { mes: "Ene", ingresos: 45000, gastos: 32000 },
  { mes: "Feb", ingresos: 52000, gastos: 35000 },
];

const barsConfig2 = [
  { dataKey: "ingresos", name: "Ingresos", fill: "#10b981" },
  { dataKey: "gastos", name: "Gastos", fill: "#ef4444" },
];

<GenericMultiBarChart
  data={ingresosGastosData}
  bars={barsConfig2}
  categoryKey="mes"
  title="Ingresos vs Gastos"
  description="Análisis financiero mensual"
/>

// Ejemplo con 4 barras
const ventasData = [
  { producto: "Habitaciones", q1: 120, q2: 135, q3: 145, q4: 150 },
  { producto: "Servicios", q1: 45, q2: 52, q3: 48, q4: 55 },
];

const barsConfig4 = [
  { dataKey: "q1", name: "Q1", fill: "#667eea" },
  { dataKey: "q2", name: "Q2", fill: "#764ba2" },
  { dataKey: "q3", name: "Q3", fill: "#f093fb" },
  { dataKey: "q4", name: "Q4", fill: "#4facfe" },
];

<GenericMultiBarChart
  data={ventasData}
  bars={barsConfig4}
  categoryKey="producto"
  title="Ventas por Trimestre"
  description="Análisis trimestral de productos"
/>
```

## Con Filtros

Todos los componentes soportan filtros opcionales:

```tsx
const filterOptions = [
  { value: "2024", label: "Año 2024" },
  { value: "2023", label: "Año 2023" },
  { value: "q1", label: "Q1 2024" },
];

const [periodo, setPeriodo] = useState("2024");

<GenericBarChart
  data={data}
  dataKey="cantidad"
  categoryKey="categoria"
  title="Mi Gráfica"
  filterOptions={filterOptions}
  filterValue={periodo}
  onFilterChange={setPeriodo}
/>
```

## Estructura de Datos desde Backend

```typescript
// Ejemplo de respuesta del backend
interface ChartResponse {
  type: 'bar' | 'horizontal-bar' | 'line' | 'pie' | 'area' | 'multi-bar';
  title: string;
  description?: string;
  data: Array<Record<string, string | number>>;
  config: {
    dataKey?: string;
    categoryKey?: string;
    nameKey?: string;
    bars?: BarConfig[];
    lines?: LineConfig[];
    areas?: AreaConfig[];
    colors?: string[];
  };
}

// Uso
const chartData: ChartResponse = await fetchChartData();

// Renderizado dinámico
{chartData.type === 'bar' && (
  <GenericBarChart
    data={chartData.data}
    dataKey={chartData.config.dataKey!}
    categoryKey={chartData.config.categoryKey!}
    title={chartData.title}
    description={chartData.description}
  />
)}
```
