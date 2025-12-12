import { useMemo } from 'react';
import type { Transaccion } from '@/pages/Cuenta/types/cuenta.types';

export function useCuentaCharts(transacciones: Transaccion[]) {
    return useMemo(() => {
        const serviciosTotal = transacciones
            .filter(t => t.tipo === 'servicio')
            .reduce((sum, t) => sum + t.subtotal, 0);
        
        const platillosTotal = transacciones
            .filter(t => t.tipo === 'platillo')
            .reduce((sum, t) => sum + t.subtotal, 0);

        const pieData = [
            { nombre: 'Servicios', valor: serviciosTotal, fill: '#667eea' },
            { nombre: 'Platillos', valor: platillosTotal, fill: '#10b981' },
        ].filter(d => d.valor > 0);

        // Agrupar transacciones por nombre
        const itemsAgrupados = transacciones.reduce((acc, t) => {
            const nombre = t.servicio?.nombre || t.platillo?.nombre || 'Desconocido';
            if (!acc[nombre]) {
                acc[nombre] = { nombre, total: 0 };
            }
            acc[nombre].total += t.subtotal;
            return acc;
        }, {} as Record<string, { nombre: string; total: number }>);

        const barData = Object.values(itemsAgrupados)
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

        return { pieData, barData };
    }, [transacciones]);
}
