import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { GenericBarChartProps } from "../types/genericCharts";

export function GenericBarChart({
    data,
    dataKey,
    categoryKey,
    title,
    description,
    color = "#667eea",
    gradient = true,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericBarChartProps) {
    const [seriesVisible, setSeriesVisible] = useState(true);

    const handleLegendClick = () => {
        setSeriesVisible(!seriesVisible);
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
                    {gradient && (
                        <defs>
                            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                    )}
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
                        wrapperStyle={{ cursor: "pointer" }}
                        onClick={handleLegendClick}
                    />
                    <Bar
                        dataKey={dataKey}
                        fill={gradient ? `url(#gradient-${dataKey})` : color}
                        radius={[8, 8, 0, 0]}
                        hide={!seriesVisible}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
