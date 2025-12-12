import React from 'react';
import { Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InfoCard } from './InfoCard';
import { formatDate } from '@/pages/Cuenta/utils/cuenta.config';
import type { Checkin } from '@/pages/Cuenta/types/cuenta.types';

interface HabitacionInfoProps {
    checkin: Checkin;
}

export function HabitacionInfo({ checkin }: HabitacionInfoProps) {
    return (
        <InfoCard title="Información de Habitación" icon={Building2}>
            <dl className="space-y-3">
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Habitación</dt>
                    <dd className="font-medium">
                        {checkin.habitacion_evento.codigo} - {checkin.habitacion_evento.nombre}
                    </dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tipo</dt>
                    <dd className="font-medium">{checkin.habitacion_evento.tipo_nombre}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Entrada</dt>
                    <dd className="font-medium">{formatDate(checkin.fecha_entrada)}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Salida</dt>
                    <dd className="font-medium">
                        {checkin.fecha_salida
                            ? formatDate(checkin.fecha_salida)
                            : <Badge variant="outline">En curso</Badge>
                        }
                    </dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Atendido por</dt>
                    <dd className="font-medium">{checkin.recepcionista.nombre}</dd>
                </div>
            </dl>
        </InfoCard>
    );
}
