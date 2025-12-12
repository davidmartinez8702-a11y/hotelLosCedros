import React from 'react';
import { Link } from '@inertiajs/react';
import { User } from 'lucide-react';
import { route } from 'ziggy-js';
import type { Checkin } from '@/pages/Cuenta/types/cuenta.types';
import { InfoCard } from './InfoCard';

interface HuespedInfoProps {
    checkin: Checkin;
}

export function HuespedInfo({ checkin }: HuespedInfoProps) {
    return (
        <InfoCard title="Información del Huésped" icon={User}>
            <dl className="space-y-3">
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Nombre</dt>
                    <dd className="font-medium">{checkin.cliente.nombre}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">{checkin.cliente.email}</dd>
                </div>
                {checkin.cliente.telefono && (
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Teléfono</dt>
                        <dd className="font-medium">{checkin.cliente.telefono}</dd>
                    </div>
                )}
                <div className="flex justify-between">
                    <dt className="text-muted-foreground">Check-in</dt>
                    <dd>
                        <Link
                            href={route('recepcion.checkins.show', checkin.id)}
                            className="font-medium text-primary hover:underline"
                        >
                            Ver Check-in #{checkin.id}
                        </Link>
                    </dd>
                </div>
            </dl>
        </InfoCard>
    );
}