import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { GenericLineChartProps } from "../types/genericCharts";

export function GenericLineChart({
    data,
    lines,
    categoryKey,
    title,
    description,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericLineChartProps) {
    const [seriesVisibles, setSeriesVisibles] = useState<Record<string, boolean>>(
        lines.reduce((acc, line) => ({ ...acc, [line.dataKey]: true }), {})
    );

    const handleLegendClick = (value: string) => {
        const lineConfig = lines.find(l => l.name === value);
        if (lineConfig) {
            setSeriesVisibles(prev => ({
                ...prev,
                [lineConfig.dataKey]: !prev[lineConfig.dataKey],
            }));
        }
    };

    return (
        <ChartCard
            title={title}
            description={description}
            filterOptions={filterOptions}
            filterValue={filterValue}
            onFilterChange={onFilterChange}
            filterPlaceholder="Período"
            delay={delay}
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey={categoryKey}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ cursor: "pointer", paddingTop: "10px" }}
                        onClick={(e) => handleLegendClick(e.value || "")}
                    />
                    {lines.map((line) => (
                        <Line
                            key={line.dataKey}
                            type="monotone"
                            dataKey={line.dataKey}
                            stroke={line.stroke}
                            strokeWidth={line.strokeWidth || 3}
                            strokeDasharray={line.strokeDasharray}
                            dot={{ fill: line.stroke, r: 5 }}
                            activeDot={{ r: 7 }}
                            name={line.name}
                            hide={!seriesVisibles[line.dataKey]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
