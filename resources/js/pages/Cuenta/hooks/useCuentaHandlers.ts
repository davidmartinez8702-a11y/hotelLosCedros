// hooks/useCuentaHandlers.ts
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import type { ItemCarrito } from '@/pages/Cuenta/types/cuenta.types';

export function useCuentaHandlers(cuentaId: number) {
    const [processing, setProcessing] = useState(false);

    const handleConfirmarConsumos = (items: ItemCarrito[]) => {
        if (items.length === 0) return;

        setProcessing(true);
        router.post(
            route('cuentas.transacciones.agregar', cuentaId),
            {
                items: items.map(item => ({
                    tipo: item.tipo,
                    id: item.id,
                    cantidad: item.cantidad,
                })),
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    const handleEliminarTransaccion = (transaccionId: number) => {
        router.delete(
            route('cuentas.transacciones.eliminar', [cuentaId, transaccionId])
        );
    };

    const handleRegistrarPago = (monto: number) => {
        if (isNaN(monto) || monto <= 0) return;

        setProcessing(true);
        router.post(
            route('recepcion.cuentas.pago', cuentaId),
            { monto },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    return {
        processing,
        handleConfirmarConsumos,
        handleEliminarTransaccion,
        handleRegistrarPago,
    };
}