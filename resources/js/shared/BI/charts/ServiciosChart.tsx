import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { ServiciosData, ChartFilterOption } from "../mocks/types";

interface ServiciosChartProps {
  data: ServiciosData[];
  filterOptions: ChartFilterOption[];
}

export function ServiciosChart({ data, filterOptions }: ServiciosChartProps) {
  const [periodo, setPeriodo] = useState("actual");
  const [seriesVisibles, setSeriesVisibles] = useState({
    calificacion: true,
    promedio: true,
  });

  const handleLegendClick = (value: string) => {
    const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
      "Nuestro Hotel": "calificacion",
      "Promedio Sector": "promedio",
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
      title="Calificación de Servicios"
      description="Evaluación comparativa vs promedio del sector"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      icon={<Calendar className="h-8 w-8 text-purple-600" />}
      delay={400}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="servicio"
            tick={{ fontSize: 11, fontWeight: 500, fill: "#374151" }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="Nuestro Hotel"
            dataKey="calificacion"
            stroke="#667eea"
            fill="#667eea"
            fillOpacity={0.6}
            hide={!seriesVisibles.calificacion}
          />
          <Radar
            name="Promedio Sector"
            dataKey="promedio"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
            strokeDasharray="4 4"
            hide={!seriesVisibles.promedio}
          />
          <Legend
            wrapperStyle={{ cursor: "pointer" }}
            onClick={(e) => handleLegendClick(e.value || "")}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}