import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Receipt, 
    User, 
    Building2, 
    Calendar,
    ArrowLeft,
    Check
} from 'lucide-react';
import { route } from 'ziggy-js';

interface Checkin {
    id: number;
    cliente: {
        id: number;
        nombre: string;
        email: string;
    };
    habitacion_evento: {
        id: number;
        codigo: string;
        nombre: string;
        precio: number;
    };
    fecha_entrada: string;
    fecha_salida: string | null;
}

interface Props {
    checkin: Checkin;
}

const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function CreateCuenta({ checkin }: Props) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        router.post(
            route('recepcion.cuentas.store'),
            { checkin_id: checkin.id },
            {
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Recepción', href: '#' },
                { title: 'Check-ins', href: route('recepcion.checkins.index') },
                { title: `Check-in #${checkin.id}`, href: route('recepcion.checkins.show', checkin.id) },
                { title: 'Crear Cuenta', href: '#' },
            ]}
        >
            <Head title="Crear Cuenta" />

            <div className="py-8 lg:py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href={route('recepcion.checkins.show', checkin.id)}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Crear Cuenta</h1>
                            <p className="text-muted-foreground">
                                Se creará una cuenta para el check-in #{checkin.id}
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-primary" />
                                Resumen del Check-in
                            </CardTitle>
                            <CardDescription>
                                Verifique la información antes de crear la cuenta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Cliente */}
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <User className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">{checkin.cliente.nombre}</p>
                                    <p className="text-sm text-muted-foreground">{checkin.cliente.email}</p>
                                </div>
                            </div>

                            {/* Habitación */}
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="font-mono">
                                            {checkin.habitacion_evento.codigo}
                                        </Badge>
                                        <span className="font-medium">{checkin.habitacion_evento.nombre}</span>
                                    </div>
                                    <p className="text-sm text-green-600 font-medium mt-1">
                                        {formatCurrency(checkin.habitacion_evento.precio)} / noche
                                    </p>
                                </div>
                            </div>

                            {/* Fechas */}
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="text-sm">
                                        <span className="text-muted-foreground">Entrada:</span>{' '}
                                        <span className="font-medium">{formatDate(checkin.fecha_entrada)}</span>
                                    </p>
                                    <p className="text-sm">
                                        <span className="text-muted-foreground">Salida:</span>{' '}
                                        <span className="font-medium">
                                            {checkin.fecha_salida ? formatDate(checkin.fecha_salida) : 'Pendiente'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex gap-4 pt-4">
                                <Link href={route('recepcion.checkins.show', checkin.id)} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button 
                                    className="flex-1"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    {isSubmitting ? 'Creando...' : 'Crear Cuenta'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
