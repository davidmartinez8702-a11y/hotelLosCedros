import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../components/CustomTooltip";
import { OcupacionData, ChartFilterOption } from "../mocks/types";
import { ChartCard } from "../components/ChartCard";

interface OcupacionChartProps {
  data2024: OcupacionData[];
  data2023: OcupacionData[];
  filterOptions: ChartFilterOption[];
}

export function OcupacionChart({ data2024, data2023, filterOptions }: OcupacionChartProps) {
  const [periodo, setPeriodo] = useState("2024");
  const [seriesVisibles, setSeriesVisibles] = useState({
    ocupacion: true,
    meta: true,
  });

  // Combinar datos para comparativa
  const getData = (): OcupacionData[] => {
    if (periodo === "ambos") {
      return [...data2024, ...data2023];
    }
    return periodo === "2024" ? data2024 : data2023;
  };

  // Preparar datos para comparativa lado a lado
  const getComparativaData = () => {
    if (periodo !== "ambos") return getData();

    return data2024.map((item: OcupacionData, index: number) => ({
      mes: item.mes,
      "Ocupación 2024": item.ocupacion,
      "Meta 2024": item.meta,
      "Ocupación 2023": data2023[index]?.ocupacion || 0,
      "Meta 2023": data2023[index]?.meta || 0,
    }));
  };

  const handleLegendClick = (value: string) => {
    // Mapear el nombre mostrado al dataKey según el período
    if (periodo === "ambos") {
      const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
        "Ocupación 2024": "ocupacion",
        "Ocupación 2023": "ocupacion",
        "Meta 2024": "meta",
        "Meta 2023": "meta",
      };
      const key = dataKeyMap[value];
      if (key) {
        setSeriesVisibles((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      }
    } else {
      const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
        "Ocupación Real": "ocupacion",
        "Meta": "meta",
      };
      const key = dataKeyMap[value];
      if (key) {
        setSeriesVisibles((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      }
    }
  };

  const data = periodo === "ambos" ? getComparativaData() : getData();

  return (
    <ChartCard
      title="Tasa de Ocupación vs Meta"
      description="Comparativa de ocupación real contra objetivos mensuales"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Seleccionar año"
      delay={0}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorOcupacion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 11, fontWeight: 500 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px", cursor: "pointer" }}
            onClick={(e) => handleLegendClick(e.value || "")}
          />
          {periodo === "ambos" ? (
            <>
              <Line
                type="monotone"
                dataKey="Ocupación 2024"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: "#667eea", r: 5 }}
                activeDot={{ r: 7 }}
                hide={!seriesVisibles.ocupacion}
              />
              <Line
                type="monotone"
                dataKey="Ocupación 2023"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
                hide={!seriesVisibles.ocupacion}
              />
              <Line
                type="monotone"
                dataKey="Meta 2024"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#ef4444", r: 4 }}
                hide={!seriesVisibles.meta}
              />
              <Line
                type="monotone"
                dataKey="Meta 2023"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#f59e0b", r: 4 }}
                hide={!seriesVisibles.meta}
              />
            </>
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="ocupacion"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: "#667eea", r: 5 }}
                activeDot={{ r: 7 }}
                name="Ocupación Real"
                hide={!seriesVisibles.ocupacion}
              />
              <Line
                type="monotone"
                dataKey="meta"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#ef4444", r: 4 }}
                name="Meta"
                hide={!seriesVisibles.meta}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}