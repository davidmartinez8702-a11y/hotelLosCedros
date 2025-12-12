import React from 'react';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InfoCard } from './InfoCard';
import { formatCurrency } from '@/pages/Cuenta/utils/cuenta.config';
import type { Factura } from '@/pages/Cuenta/types/cuenta.types';

interface FacturaInfoProps {
    factura: Factura;
}

export function FacturaInfo({ factura }: FacturaInfoProps) {
    return (
        <InfoCard title="Información de Factura" icon={FileText}>
            <dl className="space-y-3">
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Factura #</dt>
                    <dd className="font-medium">{factura.id}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Monto</dt>
                    <dd className="font-medium">{formatCurrency(factura.monto_total)}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estado</dt>
                    <dd>
                        <Badge variant="secondary">{factura.estado}</Badge>
                    </dd>
                </div>
                {factura.tipo_pago && (
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Método de Pago</dt>
                        <dd className="font-medium">{factura.tipo_pago.nombre}</dd>
                    </div>
                )}
            </dl>
        </InfoCard>
    );
}