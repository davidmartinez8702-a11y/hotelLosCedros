import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { GenericHorizontalBarChartProps } from "../types/genericCharts";

export function GenericHorizontalBarChart({
    data,
    bars,
    categoryKey,
    title,
    description,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericHorizontalBarChartProps) {
    const [seriesVisibles, setSeriesVisibles] = useState<Record<string, boolean>>(
        bars.reduce((acc, bar) => ({ ...acc, [bar.dataKey]: true }), {})
    );

    const handleLegendClick = (value: string) => {
        const barConfig = bars.find(b => b.name === value);
        if (barConfig) {
            setSeriesVisibles(prev => ({
                ...prev,
                [barConfig.dataKey]: !prev[barConfig.dataKey],
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
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis
                        type="category"
                        dataKey={categoryKey}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        width={150}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ cursor: "pointer" }}
                        onClick={(e) => handleLegendClick(e.value || "")}
                    />
                    {bars.map((bar) => (
                        <Bar
                            key={bar.dataKey}
                            dataKey={bar.dataKey}
                            fill={bar.fill}
                            radius={bar.radius ?? [0, 4, 4, 0]}
                            name={bar.name}
                            hide={!seriesVisibles[bar.dataKey]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
