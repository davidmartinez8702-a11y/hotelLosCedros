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
import { ComparativaAnualData, ChartFilterOption } from "../mocks/types";

interface ComparativaAnualChartProps {
  data: ComparativaAnualData[];
  filterOptions: ChartFilterOption[];
}

export function ComparativaAnualChart({ data, filterOptions }: ComparativaAnualChartProps) {
  const [periodo, setPeriodo] = useState("trimestral");
  const [seriesVisibles, setSeriesVisibles] = useState({
    actual: true,
    anterior: true,
  });

  const handleLegendClick = (value: string) => {
    const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
      "2024": "actual",
      "2023": "anterior",
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
      title="Comparativa Anual"
      description="Ingresos 2024 vs 2023"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      delay={600}
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            type="number"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <YAxis dataKey="mes" type="category" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ cursor: "pointer" }}
            onClick={(e) => handleLegendClick(e.value || "")}
          />
          <Bar
            dataKey="actual"
            fill="#667eea"
            radius={[0, 4, 4, 0]}
            name="2024"
            hide={!seriesVisibles.actual}
          />
          <Bar
            dataKey="anterior"
            fill="#d1d5db"
            radius={[0, 4, 4, 0]}
            name="2023"
            hide={!seriesVisibles.anterior}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}