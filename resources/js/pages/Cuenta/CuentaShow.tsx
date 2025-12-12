// pages/Recepcion/Cuentas/Show.tsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/pages/Cuenta/utils/cuenta.config';

// Components
import { CuentaHeader } from '@/pages/Cuenta/components/CuentaHeader';
import { CuentaKPIs } from '@/pages/Cuenta/components/CuentaKPIs';
import { HuespedInfo } from '@/pages/Cuenta/components/HuespedInfo';
import { HabitacionInfo } from '@/pages/Cuenta/components/HabitacionInfo';
import { TransaccionesTable } from '@/pages/Cuenta/components/TransaccionesTable';
import { CuentaCharts } from '@/pages/Cuenta/components/CuentaCharts';
import { FacturaInfo } from '@/pages/Cuenta/components/FacturaInfo';
import { PagoCompletadoBanner } from '@/pages/Cuenta/components/PagoCompletadoBanner';
import { AgregarConsumoDialog } from '@/pages/Cuenta/components/AgregarConsumoDialog';
import { RegistrarPagoDialog } from '@/pages/Cuenta/components/RegistrarPagoDialog';

// Hooks
import { useCuentaCharts } from '@/pages/Cuenta/hooks/useCuentaCharts';
import { useCuentaHandlers } from '@/pages/Cuenta/hooks/useCuentaHandlers';

// Types
import type { CuentaShowProps } from '@/pages/Cuenta/types/cuenta.types';

export default function CuentaShow({ cuenta, servicios, platillos }: CuentaShowProps) {
    const [isAddingConsumo, setIsAddingConsumo] = useState(false);
    const [isPaying, setIsPaying] = useState(false);

    const isPendiente = cuenta.estado === 'pendiente';
    const chartData = useCuentaCharts(cuenta.transacciones);
    const showCharts = cuenta.transacciones.length >= 2;

    const {
        processing,
        handleConfirmarConsumos,
        handleEliminarTransaccion,
        handleRegistrarPago,
    } = useCuentaHandlers(cuenta.id);

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(cuenta.id)}>
            <Head title={`Cuenta #${cuenta.id}`} />

            <div className="py-8 lg:py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <CuentaHeader
                        cuenta={cuenta}
                        onAddConsumo={() => setIsAddingConsumo(true)}
                        onRegistrarPago={() => setIsPaying(true)}
                        isPendiente={isPendiente}
                    />

                    {/* KPIs */}
                    <CuentaKPIs cuenta={cuenta} />

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <HuespedInfo checkin={cuenta.checkin} />
                        <HabitacionInfo checkin={cuenta.checkin} />
                    </div>

                    {/* Transacciones */}
                    <TransaccionesTable
                        transacciones={cuenta.transacciones}
                        montoTotal={cuenta.monto_total}
                        isPendiente={isPendiente}
                        onEliminar={handleEliminarTransaccion}
                        onAgregarPrimero={() => setIsAddingConsumo(true)}
                    />

                    {/* Gráficas */}
                    {showCharts && <CuentaCharts data={chartData} />}

                    {/* Factura Info */}
                    {cuenta.factura && <FacturaInfo factura={cuenta.factura} />}

                    {/* Banner de pago completado */}
                    {cuenta.estado === 'pagada' && cuenta.fecha_pago && (
                        <PagoCompletadoBanner fechaPago={cuenta.fecha_pago} />
                    )}
                </div>
            </div>

            {/* Dialogs */}
            <AgregarConsumoDialog
                open={isAddingConsumo}
                onOpenChange={setIsAddingConsumo}
                servicios={servicios}
                platillos={platillos}
                onConfirmar={handleConfirmarConsumos}
                processing={processing}
            />

            <RegistrarPagoDialog
                open={isPaying}
                onOpenChange={setIsPaying}
                saldo={cuenta.saldo}
                onConfirmar={handleRegistrarPago}
                processing={processing}
            />
        </AppLayout>
    );
}