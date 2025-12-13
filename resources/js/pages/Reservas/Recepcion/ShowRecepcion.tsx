import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Pencil,
    User,
    Calendar,
    DoorOpen,
    Clock,
    Briefcase,
    Plane,
    Users,
    CreditCard,
    TicketPercent,
    BedDouble,
    ChevronRight,
    MapPin,
    ArrowLeft,
    HotelIcon,
    Printer,
    ChevronDown,
    FileText,
    ClipboardList,
    PrinterCheck
} from "lucide-react";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useDashboardRoute } from "@/hooks/useDashboardRoute";

// --- Interfaces basadas en el Controlador ---
interface ReservaData {
    id: number;
    cliente: {
        id: number;
        user: { name: string; email: string; };
    };
    fecha_reserva: string;
    dias_estadia: number;
    estado: string;
    tipo_reserva: string;
    tipo_viaje: string;
    total_cantidad_adultos: number;
    total_cantidad_infantes: number;
    porcentaje_descuento: string | number;
    pago_inicial: number;
    monto_total: number;
    promo: { id: number; nombre: string; } | null;
    created_at: string;
    updated_at: string;
}

interface HospedajeSolicitado {
    tipo_habitacion_nombre: string;
    cantidad_solicitada: number;
    precio_noche: number;
}

interface CheckinAsignado {
    id: number;
    huesped_nombre: string;
    habitacion_codigo: string;
    tipo_habitacion: string;
    fecha_entrada: string;
    fecha_salida: string | null;
    estado_checkin: string;
}

interface Props {
    reserva: ReservaData;
    hospedajes_solicitados: HospedajeSolicitado[];
    checkins_asignados: CheckinAsignado[];
}

// --- Helpers de Formato ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency', currency: 'BOB', minimumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
};

const getStatusColor = (estado: string) => {
    const status = estado.toLowerCase();
    if (status === 'confirmada') return 'bg-green-500 hover:bg-green-600';
    if (status === 'pendiente') return 'bg-yellow-500 hover:bg-yellow-600';
    if (status === 'cancelada') return 'bg-red-500 hover:bg-red-600';
    return 'bg-gray-500';
};

export default function ShowRecepcion({ reserva, hospedajes_solicitados, checkins_asignados }: Props) {
    const { path, title } = useDashboardRoute();
    return (
        <AppLayout
            breadcrumbs={[
                { title: title, href: path },
                { title: "Reservas", href: route("recepcion.reservas.index") },
                { title: `Reserva #${reserva.id}`, href: "#" },
            ]}
        >
            <Head title={`Reserva #${reserva.id} - Detalle`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Botón Volver */}
                    <Link href={route("recepcion.reservas.index")} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al listado
                    </Link>

                    {/* Encabezado */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <EntityHeader
                            title={`Reserva #${reserva.id}`}
                            subtitle="Registrada el:"
                            span={reserva.created_at}
                        />
                        {/* <div className="flex gap-2">
                            <Badge className={cn("text-sm px-4 py-1 capitalize", getStatusColor(reserva.estado))}>
                                {reserva.estado}
                            </Badge>
                            <Link href={route("recepcion.reservas.edit", reserva.id)}>
                                <Button variant="outline" size="sm">
                                    <Pencil className="mr-2 h-4 w-4" /> Editar Reserva
                                </Button>
                            </Link>
                        </div> */}
                        <div className="flex gap-2 flex-wrap">
                            {/* Menú Desplegable de Reportes */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="sm" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                                        <PrinterCheck className="mr-2 h-4 w-4" />
                                        Imprimir Reportes
                                        <ChevronDown className="ml-2 h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Opciones de Impresión</DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    {/* Reporte 1: Para el Cliente */}
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={route('recepcion.reporte.distribucion', reserva.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-pointer"
                                        >
                                            <FileText className="mr-2 h-4 w-4 text-blue-600" />
                                            <span>Resumen de Reserva (Cliente)</span>
                                        </a>
                                    </DropdownMenuItem>

                                    {/* Reporte 2: Interno / Distribución */}
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={route('recepcion.reporte.asignacion', reserva.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-pointer"
                                        >
                                            <ClipboardList className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Hoja de Alojamiento (Interno)</span>
                                        </a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Botón Editar Existente */}
                            <Link href={route("recepcion.reservas.edit", reserva.id)}>
                                <Button variant="outline" size="sm">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar Reserva
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Separator />

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Izquierda: Información General */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Card: Detalles de la Reserva */}
                            <Card className="shadow-md">
                                <CardHeader className="bg-muted/30">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        Información de Estancia
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Duración</p>
                                                <p className="text-base font-semibold">{reserva.dias_estadia} Noches</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            {reserva.tipo_viaje.toLowerCase() === 'negocios' ? <Briefcase className="h-5 w-5 text-muted-foreground" /> : <Plane className="h-5 w-5 text-muted-foreground" />}
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Motivo del Viaje</p>
                                                <p className="text-base font-semibold capitalize">{reserva.tipo_viaje}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Huéspedes</p>
                                                <p className="text-base font-semibold">
                                                    {reserva.total_cantidad_adultos} Adultos / {reserva.total_cantidad_infantes} Niños
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Canal de Reserva</p>
                                                <Badge variant="secondary" className="capitalize">{reserva.tipo_reserva}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card: Hospedaje Solicitado (Lo que el cliente pidió) */}
                            <Card className="shadow-md border-blue-100">
                                <CardHeader className="border-b bg-blue-50/50">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <BedDouble className="h-5 w-5 text-blue-600" />
                                        Hospedaje Solicitado
                                    </CardTitle>
                                    <CardDescription>Detalle de habitaciones y costos según la estadía de {reserva.dias_estadia} noches.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {hospedajes_solicitados.map((item, idx) => (
                                            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-lg border bg-card hover:bg-slate-50 transition-colors">

                                                {/* Nombre y Precio Unitario */}
                                                <div className="md:col-span-6 flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                                        <HotelIcon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-base text-slate-900">{item.tipo_habitacion_nombre}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            <span className="font-medium text-slate-600">{formatCurrency(item.precio_noche)}</span> / noche
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Cantidad Reservada */}
                                                <div className="md:col-span-3 flex flex-col items-start md:items-center border-l border-r border-transparent md:border-slate-100">
                                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Cantidad</p>
                                                    <Badge variant="secondary" className="mt-1 text-md px-3">
                                                        {item.cantidad_solicitada} {item.cantidad_solicitada === 1 ? 'Habitación' : 'Habitaciones'}
                                                    </Badge>
                                                </div>

                                                {/* Subtotal Item */}
                                                <div className="md:col-span-3 text-right">
                                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Subtotal</p>
                                                    <p className="text-lg font-bold text-blue-700">
                                                        {formatCurrency(item.cantidad_solicitada * item.precio_noche)}
                                                    </p>

                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card: Check-ins Ejecutados (La realidad en el hotel) */}
                            <Card className="shadow-md border-green-100">
                                <CardHeader className="border-b bg-green-50/50 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                                            <DoorOpen className="h-5 w-5" />
                                            Habitaciones Asignadas / Check-ins
                                        </CardTitle>
                                        <CardDescription>Huéspedes que ya ingresaron a sus habitaciones.</CardDescription>
                                    </div>
                                    {reserva.estado !== 'cancelada' && (
                                        <Link href={route('recepcion.checkins.create', { reserva: reserva.id })}>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                Registrar Entrada
                                            </Button>
                                        </Link>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {checkins_asignados.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {checkins_asignados.map((ci) => (
                                                <div key={ci.id} className="relative p-4 rounded-xl border-2 border-green-50 bg-green-50/30 overflow-hidden group">
                                                    <div className="absolute top-0 right-0 p-2">
                                                        <Badge variant={ci.estado_checkin === 'Activo' ? "default" : "secondary"} className={cn(ci.estado_checkin === 'Activo' ? "bg-green-500" : "")}>
                                                            {ci.estado_checkin}
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-8 w-8 rounded bg-white border flex items-center justify-center font-bold text-primary">
                                                                {ci.habitacion_codigo}
                                                            </div>
                                                            <span className="font-bold text-sm truncate">{ci.tipo_habitacion}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                                                            <span className="font-medium">{ci.huesped_nombre}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                                                            <span>Entrada: {formatDate(ci.fecha_entrada)}</span>
                                                            <Link href={route('recepcion.checkins.show', ci.id)} className="text-primary hover:underline font-bold">
                                                                Detalle →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 bg-muted/20 rounded-lg border-2 border-dashed">
                                            <DoorOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                            <p className="mt-2 text-muted-foreground font-medium">No hay ingresos registrados para esta reserva todavía.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Columna Derecha: Finanzas y Cliente */}
                        <div className="space-y-6">

                            {/* Card: Cliente Solicitante */}
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-md">Cliente Solicitante</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold leading-none">{reserva.cliente.user.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{reserva.cliente.user.email}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full" size="sm">
                                        Ver Perfil del Cliente
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Card: Resumen Financiero */}
                            <Card className="shadow-md border-primary/20 bg-primary/5">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Resumen Financiero
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Monto Bruto</span>
                                        <span className="font-semibold">{formatCurrency(reserva.monto_total)}</span>
                                    </div>

                                    {reserva.promo && (
                                        <div className="flex justify-between items-center text-sm p-2 bg-green-100/50 rounded-md border border-green-200">
                                            <div className="flex items-center gap-2 text-green-700">
                                                <TicketPercent className="h-4 w-4" />
                                                <span className="text-[11px] font-bold uppercase">{reserva.promo.nombre}</span>
                                            </div>
                                            <span className="text-green-700 font-bold">-{reserva.porcentaje_descuento}%</span>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Pago Inicial Recibido</span>
                                            <Badge variant="outline" className="bg-white text-blue-600 border-blue-200">
                                                {formatCurrency(reserva.pago_inicial)}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-base font-bold">Saldo Pendiente</span>
                                            <span className="text-xl font-black text-primary">
                                                {formatCurrency(reserva.monto_total - reserva.pago_inicial)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}