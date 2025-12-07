import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { IngresosData, ChartFilterOption } from "../mocks/types";

interface IngresosChartProps {
  dataMensual: IngresosData[];
  dataSemanal: IngresosData[];
  filterOptions: ChartFilterOption[];
}

export function IngresosChart({ dataMensual, dataSemanal, filterOptions }: IngresosChartProps) {
  const [periodo, setPeriodo] = useState("mensual");
  const [seriesVisibles, setSeriesVisibles] = useState({
    ingresos: true,
    gastos: true,
  });

  const data = periodo === "mensual" ? dataMensual : dataSemanal;

  const handleLegendClick = (value: string) => {
    // Mapear el nombre mostrado al dataKey
    const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
      "Ingresos": "ingresos",
      "Gastos": "gastos",
    };

    const key = dataKeyMap[value];
    if (key) {
      setSeriesVisibles((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  return (
    <ChartCard
      title="Ingresos vs Gastos"
      description="Comparativa por tipo de habitación"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      delay={100}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="tipo"
            tick={{ fontSize: 10, fontWeight: 500 }}
            angle={-35}
            textAnchor="end"
            height={100}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => `Bs ${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "10px", cursor: "pointer" }}
            onClick={(e) => handleLegendClick(e.value || "")}
          />
          <Bar
            dataKey="ingresos"
            fill="url(#colorIngresos)"
            radius={[8, 8, 0, 0]}
            name="Ingresos"
            hide={!seriesVisibles.ingresos}
          />
          <Bar
            dataKey="gastos"
            fill="url(#colorGastos)"
            radius={[8, 8, 0, 0]}
            name="Gastos"
            hide={!seriesVisibles.gastos}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}