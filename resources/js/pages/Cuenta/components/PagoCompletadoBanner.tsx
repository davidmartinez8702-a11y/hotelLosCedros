import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { formatDateTime } from '@/pages/Cuenta/utils/cuenta.config';

interface PagoCompletadoBannerProps {
    fechaPago: string;
}

export function PagoCompletadoBanner({ fechaPago }: PagoCompletadoBannerProps) {
    return (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                    <p className="font-semibold text-green-800">Cuenta Saldada</p>
                    <p className="text-sm text-green-600">
                        Pagado el {formatDateTime(fechaPago)}
                    </p>
                </div>
            </div>
        </div>
    );
}