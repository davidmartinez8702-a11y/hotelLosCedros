import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { GenericMultiBarChartProps } from "../types/genericCharts";

export function GenericMultiBarChart({
    data,
    bars,
    categoryKey,
    title,
    description,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericMultiBarChartProps) {
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
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        {bars.map((bar) => (
                            <linearGradient key={bar.dataKey} id={`gradient-${bar.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={bar.fill} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={bar.fill} stopOpacity={0.3} />
                            </linearGradient>
                        ))}
                    </defs>
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
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: "10px", cursor: "pointer" }}
                        onClick={(e) => handleLegendClick(e.value || "")}
                    />
                    {bars.map((bar) => (
                        <Bar
                            key={bar.dataKey}
                            dataKey={bar.dataKey}
                            fill={`url(#gradient-${bar.dataKey})`}
                            radius={bar.radius || [8, 8, 0, 0]}
                            name={bar.name}
                            hide={!seriesVisibles[bar.dataKey]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
