import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { ReservasData, ChartFilterOption } from "../mocks/types";

interface ReservasChartProps {
  dataDiciembre: ReservasData[];
  dataNoviembre: ReservasData[];
  filterOptions: ChartFilterOption[];
}

export function ReservasChart({ dataDiciembre, dataNoviembre, filterOptions }: ReservasChartProps) {
  const [mes, setMes] = useState("diciembre");
  const [seriesVisibles, setSeriesVisibles] = useState({
    confirmadas: true,
    pendientes: true,
    canceladas: true,
  });

  const data = mes === "diciembre" ? dataDiciembre : dataNoviembre;

  const handleLegendClick = (value: string) => {
    const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
      "Confirmadas": "confirmadas",
      "Pendientes": "pendientes",
      "Canceladas": "canceladas",
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
      title="Estado de Reservas"
      description="Tendencia de reservas por estado"
      filterOptions={filterOptions}
      filterValue={mes}
      onFilterChange={setMes}
      filterPlaceholder="Mes"
      delay={300}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorConfirmadas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPendientes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorCanceladas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="fecha"
            tick={{ fontSize: 10, fontWeight: 500 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px", cursor: "pointer" }}
            onClick={(e) => handleLegendClick(e.value || "")}
          />
          <Area
            type="monotone"
            dataKey="confirmadas"
            stackId="1"
            stroke="#667eea"
            fill="url(#colorConfirmadas)"
            name="Confirmadas"
            hide={!seriesVisibles.confirmadas}
          />
          <Area
            type="monotone"
            dataKey="pendientes"
            stackId="1"
            stroke="#fbbf24"
            fill="url(#colorPendientes)"
            name="Pendientes"
            hide={!seriesVisibles.pendientes}
          />
          <Area
            type="monotone"
            dataKey="canceladas"
            stackId="1"
            stroke="#ef4444"
            fill="url(#colorCanceladas)"
            name="Canceladas"
            hide={!seriesVisibles.canceladas}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}