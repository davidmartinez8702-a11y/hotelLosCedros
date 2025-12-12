import React from 'react';
import { Receipt, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { KPICard } from './KPICard';
import { formatCurrency } from '@/pages/Cuenta/utils/cuenta.config';
import type { Cuenta } from '@/pages/Cuenta/types/cuenta.types';

interface CuentaKPIsProps {
    cuenta: Cuenta;
}

export function CuentaKPIs({ cuenta }: CuentaKPIsProps) {
    const serviciosCount = cuenta.transacciones.filter(t => t.tipo === 'servicio').length;
    const platillosCount = cuenta.transacciones.filter(t => t.tipo === 'platillo').length;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
                title="Total"
                value={formatCurrency(cuenta.monto_total)}
                icon={Receipt}
                color="bg-blue-50 text-blue-700 border-blue-200"
            />
            <KPICard
                title="Pagado"
                value={formatCurrency(cuenta.monto_pagado)}
                icon={CheckCircle2}
                color="bg-green-50 text-green-700 border-green-200"
            />
            <KPICard
                title="Saldo Pendiente"
                value={formatCurrency(cuenta.saldo)}
                icon={Clock}
                color={cuenta.saldo > 0 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}
            />
            <KPICard
                title="Transacciones"
                value={cuenta.transacciones.length.toString()}
                icon={TrendingUp}
                color="bg-purple-50 text-purple-700 border-purple-200"
                subtitle={`${serviciosCount} servicios, ${platillosCount} platillos`}
            />
        </div>
    );
}