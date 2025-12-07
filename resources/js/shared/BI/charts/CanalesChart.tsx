import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { CanalesData, ChartFilterOption } from "../mocks/types";

interface CanalesChartProps {
  data: CanalesData[];
  filterOptions: ChartFilterOption[];
}

export function CanalesChart({ data, filterOptions }: CanalesChartProps) {
  const [periodo, setPeriodo] = useState("mes");

  return (
    <ChartCard
      title="Canales de Reserva"
      description="Origen de las reservaciones"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      delay={800}
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="canal"
            tick={{ fontSize: 9 }}
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="reservas" radius={[4, 4, 0, 0]} name="Reservas">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}