import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, FileText, Plus, Printer } from 'lucide-react';
import { route } from 'ziggy-js';
import { formatDate,estadoConfig } from '@/pages/Cuenta/utils/cuenta.config';
import type { Cuenta } from '@/pages/Cuenta/types/cuenta.types';


interface CuentaHeaderProps {
    cuenta: Cuenta;
    onAddConsumo: () => void;
    onRegistrarPago: () => void;
    isPendiente: boolean;
    // onImprimirReporte: () => void;
}

export function CuentaHeader({ cuenta, onAddConsumo, onRegistrarPago, isPendiente }: CuentaHeaderProps) {
    const estadoActual = estadoConfig[cuenta.estado];
    const EstadoIcon = estadoActual.icon;

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <Link href={route('recepcion.checkins.index')}>
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Cuenta #{cuenta.id}</h1>
                        <Badge className={estadoActual.color}>
                            <EstadoIcon className="mr-1 h-3 w-3" />
                            {estadoActual.label}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Creada el {formatDate(cuenta.created_at)}
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                {isPendiente && (
                    <>
                        <Button variant="outline" onClick={onAddConsumo}>
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar Consumo
                        </Button>
                        <Button onClick={onRegistrarPago}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Registrar Pago
                        </Button>
                    </>
                )}
                <Button
                    variant="outline"
                    asChild // Usamos 'asChild' para renderizar el <a>
                    
                >
                    <a 
                        href={route('cuentas.reportes.pdf', cuenta.id)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Generar e imprimir reporte de consumos"
                        download={`REPORTE_CONSUMO_${cuenta.id}.pdf`} // Opcional, pero útil
                    >
                        <Printer className="mr-2 h-4 w-4" />
                        Imprimir Reporte
                    </a>
                </Button>
                {cuenta.factura && (
                    <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Factura
                    </Button>
                )}
            </div>
        </div>
    );
}