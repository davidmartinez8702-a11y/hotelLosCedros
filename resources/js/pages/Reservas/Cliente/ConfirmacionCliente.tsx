import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    CheckCircle, Download, Mail, Home, Calendar, 
    Users, CreditCard, FileText, MapPin, Phone,
    Clock, Bed, Gift, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';

interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    ci_nit: string;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    precio: number;
    capacidad_total: number;
}

interface Hospedaje {
    id: number;
    tipo_habitacion: TipoHabitacion;
    precio_habitacion: number;
}

interface Promo {
    id: number;
    nombre: string;
    descripcion: string;
    valor: number;
    tipo_promo: string;
}

interface Reserva {
    id: number;
    codigo: string;
    cliente: Cliente;
    fecha_reserva: string;
    dias_estadia: number;
    adultos: number;  // ✅ Este viene de total_cantidad_adultos
    infantes: number;  // ✅ Este viene de total_cantidad_infantes
    tipo_viaje: string;
    monto_total: number;
    pago_inicial: number;
    estado: string;
    hospedajes: Hospedaje[];
    promo: Promo | null;
    created_at: string;
}

interface Props {
    reserva: Reserva;
    fecha_entrada: string;
    fecha_salida: string;
}

export default function ConfirmacionCliente({ reserva, fecha_entrada, fecha_salida }: Props) {
    const saldoPendiente = reserva.monto_total - reserva.pago_inicial;
    const porcentajePagado = (reserva.pago_inicial / reserva.monto_total) * 100;

    const descargarPDF = () => {
        window.open(`/reservas/${reserva.id}/pdf`, '_blank');
    };

    const reenviarEmail = async () => {
        try {
            const response = await fetch(`/api/reservas/${reserva.id}/reenviar-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (data.success) {
                alert('Email reenviado exitosamente');
            } else {
                alert('Error al reenviar el email');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    };

    const tipoViajeTexto = {
        'placer': 'Placer',
        'negocios': 'Negocios',
        'turismo': 'Turismo',
        'familia': 'Familia',
    }[reserva.tipo_viaje] || reserva.tipo_viaje;

    const estadoBadge = {
        'confirmada': { variant: 'default' as const, label: 'Confirmada' },
        'pendiente': { variant: 'secondary' as const, label: 'Pendiente' },
        'cancelada': { variant: 'destructive' as const, label: 'Cancelada' },
    }[reserva.estado] || { variant: 'secondary' as const, label: reserva.estado };

    return (
        <AppLayout>
            <Head title="Confirmación de Reserva" />

            <div className="container mx-auto py-8 px-4 max-w-5xl">
                {/* Header de Éxito */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">¡Reserva Confirmada!</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        Tu reserva ha sido procesada exitosamente
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-muted-foreground">Código de reserva:</span>
                        <Badge variant="outline" className="text-lg px-4 py-1">
                            {reserva.codigo || `RES-${String(reserva.id).padStart(6, '0')}`}
                        </Badge>
                    </div>
                </div>

                {/* Alerta de confirmación */}
                <Alert className="mb-6 border-green-200 bg-green-50">
                    <Mail className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Email de Confirmación Enviado</AlertTitle>
                    <AlertDescription className="text-green-700">
                        Hemos enviado los detalles de tu reserva a <strong>{reserva.cliente.email}</strong>
                    </AlertDescription>
                </Alert>

                {/* Saldo pendiente */}
                {saldoPendiente > 0 && (
                    <Alert className="mb-6 border-orange-200 bg-orange-50">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertTitle className="text-orange-800">Pago Pendiente</AlertTitle>
                        <AlertDescription className="text-orange-700">
                            Tienes un saldo pendiente de <strong>Bs. {saldoPendiente.toLocaleString()}</strong> que deberás pagar al momento del check-in.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Información Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Datos del Cliente */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Información del Huésped
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Nombre completo</p>
                                        <p className="font-semibold">
                                            {reserva.cliente.nombre} {reserva.cliente.apellido}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">CI/Pasaporte</p>
                                        <p className="font-semibold">{reserva.cliente.ci_nit || '7845764554'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="font-semibold">{reserva.cliente.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                                        <p className="font-semibold">{reserva.cliente.telefono}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fechas de Estadía */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Fechas de Estadía
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-accent rounded-lg">
                                        <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                                        <p className="font-semibold">
                                            {new Date(fecha_entrada).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-accent rounded-lg">
                                        <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                                        <p className="font-semibold">
                                            {new Date(fecha_salida).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-accent rounded-lg">
                                        <Bed className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-1">Noches</p>
                                        <p className="font-semibold">{reserva.dias_estadia}</p>
                                    </div>
                                    <div className="text-center p-4 bg-accent rounded-lg">
                                        <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-1">Huéspedes</p>
                                        <p className="font-semibold">
                                            {reserva.adultos + reserva.infantes}
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Motivo del viaje:</span>
                                    <Badge variant="secondary">{tipoViajeTexto}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Habitaciones Reservadas */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bed className="h-5 w-5" />
                                    Habitaciones Reservadas
                                </CardTitle>
                                <CardDescription>
                                    {reserva.hospedajes.length} habitación{reserva.hospedajes.length !== 1 ? 'es' : ''} reservada{reserva.hospedajes.length !== 1 ? 's' : ''}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {reserva.hospedajes.map((hospedaje, index) => (
                                        <div key={hospedaje.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                                    <Bed className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{hospedaje.tipo_habitacion.nombre}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Capacidad: {hospedaje.tipo_habitacion.capacidad_total} personas
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-primary">
                                                    Bs. {hospedaje.precio_habitacion.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {reserva.dias_estadia} noche{reserva.dias_estadia !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Promoción Aplicada */}
                        {reserva.promo && (
                            <Card className="border-yellow-200 bg-yellow-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                                        <Gift className="h-5 w-5" />
                                        Promoción Aplicada
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="font-semibold text-yellow-900">{reserva.promo.nombre}</p>
                                        <p className="text-sm text-yellow-800">{reserva.promo.descripcion}</p>
                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                            {reserva.promo.tipo_promo === 'descuento_porcentual' 
                                                ? `${reserva.promo.valor}% de descuento`
                                                : `Bs. ${reserva.promo.valor} de descuento`
                                            }
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Resumen de Pago */}
                    <div className="space-y-6">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Resumen de Pago
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant={estadoBadge.variant}>
                                        {estadoBadge.label}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Monto Total</span>
                                        <span className="font-semibold">
                                            Bs. {reserva.monto_total.toLocaleString()}
                                        </span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Pago Inicial</span>
                                        <span className="font-semibold text-green-600">
                                            Bs. {reserva.pago_inicial.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Porcentaje pagado</span>
                                        <Badge variant="secondary">
                                            {porcentajePagado.toFixed(0)}%
                                        </Badge>
                                    </div>

                                    {saldoPendiente > 0 && (
                                        <>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Saldo Pendiente</span>
                                                <span className="font-bold text-orange-600">
                                                    Bs. {saldoPendiente.toLocaleString()}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <Separator />

                                {/* Acciones */}
                                <div className="space-y-2">
                                    <Button
                                        onClick={descargarPDF}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar Factura (PDF)
                                    </Button>

                                    <Button
                                        onClick={reenviarEmail}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Reenviar Email
                                    </Button>

                                    <Button
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/">
                                            <Home className="h-4 w-4 mr-2" />
                                            Volver al Inicio
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información Adicional */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Información Importante</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Horarios</p>
                                        <p className="text-muted-foreground">
                                            Check-in: 14:00 hrs<br />
                                            Check-out: 12:00 hrs
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Ubicación</p>
                                        <p className="text-muted-foreground">
                                            Presentar este código al llegar al hotel
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-start gap-2">
                                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Contacto</p>
                                        <p className="text-muted-foreground">
                                            ¿Preguntas? Contáctanos al:<br />
                                            +591 12345678
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer con código de reserva */}
                <Card className="bg-accent">
                    <CardContent className="py-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            Guarda tu código de reserva para futuras consultas
                        </p>
                        <div className="text-3xl font-bold tracking-wider">
                            {reserva.codigo || `RES-${String(reserva.id).padStart(6, '0')}`}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}