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
import { TrendingUp } from "lucide-react";
import { CustomTooltip } from "../components/CustomTooltip";
import { PrediccionesData, ChartFilterOption } from "../mocks/types";
import { ChartCard } from "../components/ChartCard";

interface PrediccionesChartProps {
    data: PrediccionesData[];
    filterOptions: ChartFilterOption[];
}

export function PrediccionesChart({ data, filterOptions }: PrediccionesChartProps) {
    const [periodo, setPeriodo] = useState("2025");
    const [seriesVisibles, setSeriesVisibles] = useState({
        prediccion: true,
        maximo: true,
        minimo: true,
    });

    // Función para manejar click en leyenda
    const handleLegendClick = (value: string) => {
        // Mapear el nombre mostrado al dataKey
        const dataKeyMap: Record<string, keyof typeof seriesVisibles> = {
            "Predicción": "prediccion",
            "Máximo": "maximo",
            "Mínimo": "minimo",
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
            title="Predicción de Reservas"
            description="Proyección de reservas con rangos máximo y mínimo"
            filterOptions={filterOptions}
            filterValue={periodo}
            onFilterChange={setPeriodo}
            filterPlaceholder="Período"
            icon={<TrendingUp className="h-8 w-8 text-indigo-600" />}
            delay={900}
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <defs>
                        <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="colorMaximo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="colorMinimo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="fecha"
                        tick={{ fontSize: 11, fontWeight: 500 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis
                        tick={{ fontSize: 11 }}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: "20px", cursor: "pointer" }}
                        onClick={(e) => handleLegendClick(e.value || "")}
                        iconType="line"
                    />
                    <Line
                        type="monotone"
                        dataKey="prediccion"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: "#6366f1", r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Predicción"
                        hide={!seriesVisibles.prediccion}
                    />
                    <Line
                        type="monotone"
                        dataKey="maximo"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#10b981", r: 4 }}
                        name="Máximo"
                        hide={!seriesVisibles.maximo}
                    />
                    <Line
                        type="monotone"
                        dataKey="minimo"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#f59e0b", r: 4 }}
                        name="Mínimo"
                        hide={!seriesVisibles.minimo}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
