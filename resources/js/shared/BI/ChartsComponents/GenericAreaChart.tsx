import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { GenericAreaChartProps } from "../types/genericCharts";

export function GenericAreaChart({
    data,
    areas,
    categoryKey,
    title,
    description,
    stacked = true,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericAreaChartProps) {
    const [seriesVisibles, setSeriesVisibles] = useState<Record<string, boolean>>(
        areas.reduce((acc, area) => ({ ...acc, [area.dataKey]: true }), {})
    );

    const handleLegendClick = (value: string) => {
        const areaConfig = areas.find(a => a.name === value);
        if (areaConfig) {
            setSeriesVisibles(prev => ({
                ...prev,
                [areaConfig.dataKey]: !prev[areaConfig.dataKey],
            }));
        }
    };

    return (
        <ChartCard
            title={title}
            description={description ?? ''}
            filterOptions={filterOptions}
            filterValue={filterValue}
            onFilterChange={onFilterChange}
            filterPlaceholder="Período"
            delay={delay}
        >
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        {areas.map((area) => (
                            <linearGradient key={area.dataKey} id={`gradient-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={area.stroke} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={area.stroke} stopOpacity={0.1} />
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
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: "20px", cursor: "pointer" }}
                        onClick={(e) => handleLegendClick(e.value || "")}
                    />
                    {areas.map((area) => (
                        <Area
                            key={area.dataKey}
                            type="monotone"
                            dataKey={area.dataKey}
                            stackId={stacked ? area.stackId || "1" : undefined}
                            stroke={area.stroke}
                            fill={`url(#gradient-${area.dataKey})`}
                            name={area.name}
                            hide={!seriesVisibles[area.dataKey]}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
