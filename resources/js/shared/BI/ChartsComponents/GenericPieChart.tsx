import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChartCard } from "../components/ChartCard";
import { CustomTooltip } from "../components/CustomTooltip";
import { CustomLegend } from "../components/CustomLegend";
import { GenericPieChartProps } from "../types/genericCharts";

export function GenericPieChart({
    data,
    dataKey,
    nameKey,
    title,
    description,
    innerRadius = 65,
    outerRadius = 110,
    filterOptions,
    filterValue,
    onFilterChange,
    delay = 0,
}: GenericPieChartProps) {
    const [hiddenItems, setHiddenItems] = useState<string[]>([]);

    const visibleData = data.filter(item => !hiddenItems.includes(String(item[nameKey])));

    const handleLegendClick = (name: string) => {
        setHiddenItems(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
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

    // Preparar items para la leyenda
    const legendItems = data.map((item) => ({
        name: String(item[nameKey]),
        color: item.fill as string || "#667eea",
    }));

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
                <PieChart>
                    <Pie
                        data={visibleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={outerRadius}
                        innerRadius={innerRadius}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                        paddingAngle={2}
                    >
                        {visibleData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.fill as string || "#667eea"}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'transparent' }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <CustomLegend
                items={legendItems}
                hiddenItems={hiddenItems}
                onItemClick={handleLegendClick}
            />
        </ChartCard>
    );
}
