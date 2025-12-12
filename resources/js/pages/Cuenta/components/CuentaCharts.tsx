import React from 'react';
import { GenericPieChart } from '@/shared/BI/ChartsComponents/GenericPieChart';
import { GenericBarChart } from '@/shared/BI/ChartsComponents/GenericBarChart';

interface ChartData {
    pieData: Array<{ nombre: string; valor: number; fill: string }>;
    barData: Array<{ nombre: string; total: number }>;
}

interface CuentaChartsProps {
    data: ChartData;
}

export function CuentaCharts({ data }: CuentaChartsProps) {
    const { pieData, barData } = data;

    if (pieData.length === 0 && barData.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {pieData.length > 1 && (
                <GenericPieChart
                    data={pieData}
                    dataKey="valor"
                    nameKey="nombre"
                    title="Distribución de Gastos"
                    description="Servicios vs Platillos"
                />
            )}

            {barData.length > 0 && (
                <GenericBarChart
                    data={barData}
                    dataKey="total"
                    categoryKey="nombre"
                    title="Top Consumos"
                    description="Items más consumidos"
                    color="#667eea"
                />
            )}
        </div>
    );
}