import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { HuespedesData, ChartFilterOption } from "../mocks/types";

interface HuespedesChartProps {
  dataDiciembre: HuespedesData[];
  dataNoviembre: HuespedesData[];
  dataOctubre: HuespedesData[];
  data2023: HuespedesData[];
  dataQ1: HuespedesData[];
  dataQ2: HuespedesData[];
  dataQ3: HuespedesData[];
  dataQ4: HuespedesData[];
  filterOptions: ChartFilterOption[];
}

export function HuespedesChart({
  dataDiciembre,
  dataNoviembre,
  dataOctubre,
  data2023,
  dataQ1,
  dataQ2,
  dataQ3,
  dataQ4,
  filterOptions
}: HuespedesChartProps) {
  const [periodo, setPeriodo] = useState("diciembre");
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  const getData = () => {
    switch (periodo) {
      case "noviembre":
        return dataNoviembre;
      case "octubre":
        return dataOctubre;
      case "2023":
        return data2023;
      case "q1":
        return dataQ1;
      case "q2":
        return dataQ2;
      case "q3":
        return dataQ3;
      case "q4":
        return dataQ4;
      default:
        return dataDiciembre;
    }
  };

  const data = getData();

  // Filtrar solo para el Pie
  const visibleData = data.filter(item => !hiddenCategories.includes(item.categoria));

  const handleLegendClick = (categoria: string) => {
    setHiddenCategories(prev =>
      prev.includes(categoria)
        ? prev.filter(cat => cat !== categoria)
        : [...prev, categoria]
    );
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom Legend Component
  const CustomLegend = () => (
    <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
      {data.map((entry) => {
        const isHidden = hiddenCategories.includes(entry.categoria);
        return (
          <div
            key={entry.categoria}
            onClick={() => handleLegendClick(entry.categoria)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span
              className={`text-sm font-semibold ${isHidden ? 'line-through opacity-50' : ''
                }`}
            >
              {entry.categoria}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <ChartCard
      title="Distribución de Huéspedes"
      description="Segmentación por categoría de viaje"
      filterOptions={filterOptions}
      filterValue={periodo}
      onFilterChange={setPeriodo}
      filterPlaceholder="Período"
      delay={200}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={visibleData as any}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={110}
            innerRadius={65}
            dataKey="valor"
            nameKey="categoria"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
            paddingAngle={2}
          >
            {visibleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend />
    </ChartCard>
  );
}