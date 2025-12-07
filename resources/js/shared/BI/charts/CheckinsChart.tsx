import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { CheckinsData, ChartFilterOption } from "../mocks/types";

interface CheckinsChartProps {
  data: CheckinsData[];
  filterOptions: ChartFilterOption[];
}

export function CheckinsChart({ data, filterOptions }: CheckinsChartProps) {
  const [periodo, setPeriodo] = useState("hoy");

  return (
    <ChartCard
      title="Check-ins por Hora"
      description="Distribución horaria típica"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      delay={700}
    >
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCheckins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="hora" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="checkins"
            stroke="#10b981"
            fill="url(#colorCheckins)"
            name="Check-ins"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}