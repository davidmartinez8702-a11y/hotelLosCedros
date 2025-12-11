import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Pencil, 
    Receipt, 
    User, 
    Building2, 
    Calendar, 
    DoorOpen, 
    DoorClosed,
    Clock,
    UserCog,
    FileText
} from "lucide-react";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";
import { cn } from "@/lib/utils";

// --- Interfaces ---
interface Usuario {
    id: number;
    name: string;
    email: string;
    telefono?: string;
}

interface Cliente {
    id: number;
    user: Usuario;
}

interface Recepcionista {
    id: number;
    user: Usuario;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
    precio: number;
}

interface HabitacionEvento {
    id: number;
    nombre: string;
    codigo: string;
    estado: string;
    tipo_habitacion: TipoHabitacion;
}

interface Reserva {
    id: number;
    fecha_reserva: string;
    tipo_reserva: string;
    estado: string;
}

interface Cuenta {
    id: number;
    monto_total: number;
    monto_pagado: number;
    saldo: number;
    estado: string;
}

interface Checkin {
    id: number;
    cliente: Cliente;
    recepcionista: Recepcionista;
    habitacion_evento: HabitacionEvento;
    reserva: Reserva | null;
    cuenta: Cuenta | null;
    fecha_entrada: string;
    fecha_salida: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    checkin: Checkin;
}

// Formatear fecha
const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

// Formatear fecha y hora
const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Formatear moneda
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function CheckinShow({ checkin }: Props) {
    const isActivo = !checkin.fecha_salida;
    const tieneCuenta = checkin.cuenta !== null;
    const isHabitacion = checkin.habitacion_evento.tipo_habitacion.tipo === 'habitacion';

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: route("dashboard") },
                { title: "Recepción", href: "#" },
                { title: "Check-ins", href: route("recepcion.checkins.index") },
                { title: `Check-in #${checkin.id}`, href: route("recepcion.checkins.show", checkin.id) },
            ]}
        >
            <Head title={`Detalle del Check-in #${checkin.id}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Encabezado */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <EntityHeader
                            title={`Check-in #${checkin.id}`}
                            subtitle="Última actualización:"
                            span={formatDateTime(checkin.updated_at)}
                        />

                        <div className="flex gap-2 flex-wrap">
                            <Link href={route("recepcion.checkins.edit", checkin.id)}>
                                <Button variant="outline">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                            </Link>
                            {/* {!tieneCuenta && (
                                <Link href={route("recepcion.checkins.create", { checkin_id: checkin.id })}>
                                    <Button>
                                        <Receipt className="mr-2 h-4 w-4" />
                                        Crear Cuenta
                                    </Button>
                                </Link>
                            )} */}
                            {tieneCuenta && (
                                <Link href={route("cuentas.show", checkin.cuenta!.id)}>
                                    <Button variant="secondary">
                                        <Receipt className="mr-2 h-4 w-4" />
                                        Ver Cuenta
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Estado del Check-in */}
                    <div className="flex items-center gap-4">
                        <Badge 
                            variant={isActivo ? "default" : "secondary"} 
                            className={cn(
                                "text-sm px-4 py-1",
                                isActivo && "bg-green-500 hover:bg-green-600"
                            )}
                        >
                            {isActivo ? '🟢 Check-in Activo' : '⚪ Check-in Finalizado'}
                        </Badge>
                        {checkin.reserva && (
                            <Badge variant="outline" className="text-sm px-4 py-1">
                                <FileText className="h-3 w-3 mr-1" />
                                Reserva #{checkin.reserva.id}
                            </Badge>
                        )}
                        {tieneCuenta && (
                            <Badge 
                                variant="outline" 
                                className={cn(
                                    "text-sm px-4 py-1",
                                    checkin.cuenta!.estado === 'pagado' 
                                        ? "border-green-500 text-green-700 bg-green-50" 
                                        : "border-yellow-500 text-yellow-700 bg-yellow-50"
                                )}
                            >
                                <Receipt className="h-3 w-3 mr-1" />
                                Cuenta: {checkin.cuenta!.estado.charAt(0).toUpperCase() + checkin.cuenta!.estado.slice(1)}
                            </Badge>
                        )}
                    </div>

                    {/* Grid de información */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Información del Cliente */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Información del Cliente
                                </CardTitle>
                                <CardDescription>
                                    Datos del huésped registrado en el check-in.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Nombre Completo</h3>
                                        <p className="text-lg font-semibold">{checkin.cliente.user.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Correo Electrónico</h3>
                                        <p className="text-base">{checkin.cliente.user.email}</p>
                                    </div>
                                    {checkin.cliente.user.telefono && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Teléfono</h3>
                                            <p className="text-base">{checkin.cliente.user.telefono}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información de la Habitación/Evento */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    {isHabitacion ? 'Información de la Habitación' : 'Información del Evento'}
                                </CardTitle>
                                <CardDescription>
                                    Detalles del espacio asignado al huésped.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Código</h3>
                                        <Badge 
                                            variant="outline" 
                                            className={cn(
                                                "font-mono text-base mt-1",
                                                isHabitacion 
                                                    ? "border-blue-200 bg-blue-50 text-blue-700" 
                                                    : "border-purple-200 bg-purple-50 text-purple-700"
                                            )}
                                        >
                                            {checkin.habitacion_evento.codigo}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                                        <Badge variant="secondary" className="mt-1">
                                            {isHabitacion ? '🛏️ Habitación' : '🎉 Evento'}
                                        </Badge>
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                                        <p className="text-base font-medium">{checkin.habitacion_evento.nombre}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">Categoría</h3>
                                        <p className="text-base">{checkin.habitacion_evento.tipo_habitacion.nombre}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Precio por Noche</h3>
                                        <p className="text-lg font-bold text-green-600">
                                            {formatCurrency(checkin.habitacion_evento.tipo_habitacion.precio)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fechas del Check-in */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    Fechas del Check-in
                                </CardTitle>
                                <CardDescription>
                                    Fechas de entrada y salida del huésped.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DoorOpen className="h-5 w-5 text-green-600" />
                                            <h3 className="text-sm font-medium text-green-800">Fecha de Entrada</h3>
                                        </div>
                                        <p className="text-lg font-bold text-green-700">
                                            {formatDate(checkin.fecha_entrada)}
                                        </p>
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-lg border",
                                        checkin.fecha_salida 
                                            ? "bg-red-50 border-red-200" 
                                            : "bg-gray-50 border-gray-200"
                                    )}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <DoorClosed className={cn(
                                                "h-5 w-5",
                                                checkin.fecha_salida ? "text-red-600" : "text-gray-400"
                                            )} />
                                            <h3 className={cn(
                                                "text-sm font-medium",
                                                checkin.fecha_salida ? "text-red-800" : "text-gray-600"
                                            )}>Fecha de Salida</h3>
                                        </div>
                                        <p className={cn(
                                            "text-lg font-bold",
                                            checkin.fecha_salida ? "text-red-700" : "text-gray-400 italic"
                                        )}>
                                            {checkin.fecha_salida ? formatDate(checkin.fecha_salida) : 'Pendiente'}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">Registrado el: {formatDateTime(checkin.created_at)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información del Recepcionista */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserCog className="h-5 w-5 text-primary" />
                                    Atendido por
                                </CardTitle>
                                <CardDescription>
                                    Recepcionista que realizó el check-in.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                                        <p className="text-lg font-semibold">{checkin.recepcionista.user.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Correo</h3>
                                        <p className="text-base">{checkin.recepcionista.user.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Información de la Cuenta (si existe) */}
                    {tieneCuenta && (
                        <Card className="shadow-lg border-2 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Receipt className="h-5 w-5 text-primary" />
                                    Resumen de Cuenta
                                </CardTitle>
                                <CardDescription>
                                    Estado financiero del check-in.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-600 font-medium">Monto Total</p>
                                        <p className="text-2xl font-bold text-blue-700">
                                            {formatCurrency(checkin.cuenta!.monto_total)}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-green-600 font-medium">Monto Pagado</p>
                                        <p className="text-2xl font-bold text-green-700">
                                            {formatCurrency(checkin.cuenta!.monto_pagado)}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                        <p className="text-sm text-yellow-600 font-medium">Saldo Pendiente</p>
                                        <p className="text-2xl font-bold text-yellow-700">
                                            {formatCurrency(checkin.cuenta!.saldo)}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600 font-medium">Estado</p>
                                        <Badge 
                                            className={cn(
                                                "mt-2",
                                                checkin.cuenta!.estado === 'pagado' 
                                                    ? "bg-green-500" 
                                                    : "bg-yellow-500"
                                            )}
                                        >
                                            {checkin.cuenta!.estado.charAt(0).toUpperCase() + checkin.cuenta!.estado.slice(1)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-4">
                        <Link href={route("recepcion.checkins.index")}>
                            <Button variant="outline">
                                Volver al listado
                            </Button>
                        </Link>
                        <Link href={route("recepcion.checkins.edit", checkin.id)}>
                            <Button variant="secondary">
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar Check-in
                            </Button>
                        </Link>
                        {/* {!tieneCuenta && (
                            <Link href={route("recepcion.cuentas.create", { checkin_id: checkin.id })}>
                                <Button>
                                    <Receipt className="mr-2 h-4 w-4" />
                                    Crear Cuenta
                                </Button>
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
