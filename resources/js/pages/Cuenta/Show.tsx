import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';

import { 
    DollarSign, 
    CreditCard, 
    User, 
    Building2, 
    Calendar,
    Plus,
    Trash2,
    ArrowLeft,
    Receipt,
    TrendingUp,
    Utensils,
    ConciergeBell,
    FileText,
    CheckCircle2,
    Clock,
    XCircle,
    Minus
} from 'lucide-react';
import { route } from 'ziggy-js';
import { GenericPieChart } from '@/shared/BI/ChartsComponents/GenericPieChart';
import { GenericBarChart } from '@/shared/BI/ChartsComponents/GenericBarChart';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { AlertDialogFooter, AlertDialogHeader } from '@/shared/ui/alert-dialog';

// --- Interfaces ---
interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string | null;
}

interface HabitacionEvento {
    id: number;
    codigo: string;
    nombre: string;
    tipo: string;
    tipo_nombre: string;
    precio: number;
}

interface Recepcionista {
    id: number;
    nombre: string;
}

interface Reserva {
    id: number;
    estado: string;
}

interface Checkin {
    id: number;
    fecha_entrada: string;
    fecha_salida: string | null;
    cliente: Cliente;
    habitacion_evento: HabitacionEvento;
    recepcionista: Recepcionista;
    reserva: Reserva | null;
}

interface Servicio {
    id: number;
    nombre: string;
    precio: number;
}

interface Platillo {
    id: number;
    nombre: string;
    precio: number;
}

interface Transaccion {
    id: number;
    tipo: 'servicio' | 'platillo';
    servicio: Servicio | null;
    platillo: Platillo | null;
    cantidad: number;
    subtotal: number;
    estado: string;
    created_at: string;
}

interface TipoPago {
    id: number;
    nombre: string;
}

interface Factura {
    id: number;
    monto_total: number;
    estado: string;
    tipo_pago: TipoPago | null;
}

interface Cuenta {
    id: number;
    monto_total: number;
    monto_pagado: number;
    saldo: number;
    estado: 'pendiente' | 'pagada' | 'cancelado';
    fecha_pago: string | null;
    created_at: string;
    updated_at: string;
    checkin: Checkin;
    transacciones: Transaccion[];
    factura: Factura | null;
}

interface ServicioDisponible {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

interface PlatilloDisponible {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

interface Props {
    cuenta: Cuenta;
    servicios: ServicioDisponible[];
    platillos: PlatilloDisponible[];
}

// Breadcrumbs
const getBreadcrumbs = (cuentaId: number): BreadcrumbItem[] => [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Recepción', href: '#' },
    { title: 'Cuentas', href: route('recepcion.checkins.index') },
    { title: `Cuenta #${cuentaId}`, href: '#' },
];

// Configuración de estados
const estadoConfig = {
    pendiente: { 
        label: 'Pendiente', 
        variant: 'warning' as const, 
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    pagada: { 
        label: 'Pagada', 
        variant: 'success' as const, 
        icon: CheckCircle2,
        color: 'text-green-600 bg-green-50 border-green-200'
    },
    cancelado: { 
        label: 'Cancelado', 
        variant: 'destructive' as const, 
        icon: XCircle,
        color: 'text-red-600 bg-red-50 border-red-200'
    },
};

// Componente KPI Card
function KPICard({ 
    title, 
    value, 
    icon: Icon, 
    color,
    subtitle 
}: { 
    title: string; 
    value: string; 
    icon: React.ElementType; 
    color: string;
    subtitle?: string;
}) {
    return (
        <div className={`rounded-xl border p-6 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <p className="mt-1 text-2xl font-bold">{value}</p>
                    {subtitle && (
                        <p className="mt-1 text-xs opacity-60">{subtitle}</p>
                    )}
                </div>
                <div className="rounded-full bg-white/50 p-3">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}

// Componente Info Card
function InfoCard({ 
    title, 
    icon: Icon, 
    children 
}: { 
    title: string; 
    icon: React.ElementType; 
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{title}</h3>
            </div>
            {children}
        </div>
    );
}

// Componente Item para agregar consumo
interface ItemCarrito {
    tipo: 'servicio' | 'platillo';
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

export default function CuentaShow({ cuenta, servicios, platillos }: Props) {
    const [isAddingConsumo, setIsAddingConsumo] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [montoPago, setMontoPago] = useState('');
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState<'servicio' | 'platillo'>('servicio');
    const [itemSeleccionado, setItemSeleccionado] = useState<string>('');
    const [cantidad, setCantidad] = useState(1);
    const [processing, setProcessing] = useState(false);

    const estadoActual = estadoConfig[cuenta.estado];
    const EstadoIcon = estadoActual.icon;
    const isPendiente = cuenta.estado === 'pendiente';

    // Calcular datos para gráficas
    const datosGraficas = useMemo(() => {
        const serviciosTotal = cuenta.transacciones
            .filter(t => t.tipo === 'servicio')
            .reduce((sum, t) => sum + t.subtotal, 0);
        
        const platillosTotal = cuenta.transacciones
            .filter(t => t.tipo === 'platillo')
            .reduce((sum, t) => sum + t.subtotal, 0);

        const pieData = [
            { nombre: 'Servicios', valor: serviciosTotal, fill: '#667eea' },
            { nombre: 'Platillos', valor: platillosTotal, fill: '#10b981' },
        ].filter(d => d.valor > 0);

        // Agrupar transacciones por nombre
        const itemsAgrupados = cuenta.transacciones.reduce((acc, t) => {
            const nombre = t.servicio?.nombre || t.platillo?.nombre || 'Desconocido';
            if (!acc[nombre]) {
                acc[nombre] = { nombre, total: 0 };
            }
            acc[nombre].total += t.subtotal;
            return acc;
        }, {} as Record<string, { nombre: string; total: number }>);

        const barData = Object.values(itemsAgrupados)
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

        return { pieData, barData };
    }, [cuenta.transacciones]);

    const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Handlers
    const handleAgregarAlCarrito = () => {
        if (!itemSeleccionado) return;

        const lista = tipoSeleccionado === 'servicio' ? servicios : platillos;
        const item = lista.find(i => i.id === parseInt(itemSeleccionado));
        
        if (!item) return;

        const existente = carrito.findIndex(
            c => c.tipo === tipoSeleccionado && c.id === item.id
        );

        if (existente >= 0) {
            const nuevoCarrito = [...carrito];
            nuevoCarrito[existente].cantidad += cantidad;
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, {
                tipo: tipoSeleccionado,
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad,
            }]);
        }

        setItemSeleccionado('');
        setCantidad(1);
    };

    const handleRemoverDelCarrito = (index: number) => {
        setCarrito(carrito.filter((_, i) => i !== index));
    };

    const handleConfirmarConsumos = () => {
        if (carrito.length === 0) return;

        setProcessing(true);
        router.post(
            route('cuentas.transacciones.agregar', cuenta.id),
            {
                items: carrito.map(item => ({
                    tipo: item.tipo,
                    id: item.id,
                    cantidad: item.cantidad,
                })),
            },
            {
                onSuccess: () => {
                    setCarrito([]);
                    setIsAddingConsumo(false);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const handleEliminarTransaccion = (transaccionId: number) => {
        router.delete(
            route('cuentas.transacciones.eliminar', [cuenta.id, transaccionId])
        );
    };

    const handleRegistrarPago = () => {
        const monto = parseFloat(montoPago);
        if (isNaN(monto) || monto <= 0) return;

        setProcessing(true);
        router.post(
            route('recepcion.cuentas.pago', cuenta.id),
            { monto },
            {
                onSuccess: () => {
                    setMontoPago('');
                    setIsPaying(false);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (monto: number) => {
       // return `Bs. ${monto.toFixed(2)}`;
       return `Bs. ${monto}`
    };

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(cuenta.id)}>
            <Head title={`Cuenta #${cuenta.id}`} />

            <div className="py-8 lg:py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    {/* Header */}
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
                                    <Dialog open={isAddingConsumo} onOpenChange={setIsAddingConsumo}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Agregar Consumo
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Agregar Consumos</DialogTitle>
                                                <DialogDescription>
                                                    Selecciona servicios o platillos para agregar a la cuenta.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4">
                                                {/* Selector de tipo */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Tipo</Label>
                                                        <Select
                                                            value={tipoSeleccionado}
                                                            onValueChange={(v) => {
                                                                setTipoSeleccionado(v as 'servicio' | 'platillo');
                                                                setItemSeleccionado('');
                                                            }}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="servicio">
                                                                    <div className="flex items-center gap-2">
                                                                        <ConciergeBell className="h-4 w-4" />
                                                                        Servicio
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="platillo">
                                                                    <div className="flex items-center gap-2">
                                                                        <Utensils className="h-4 w-4" />
                                                                        Platillo
                                                                    </div>
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Cantidad</Label>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            value={cantidad}
                                                            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Selector de item */}
                                                <div className="space-y-2">
                                                    <Label>
                                                        {tipoSeleccionado === 'servicio' ? 'Servicio' : 'Platillo'}
                                                    </Label>
                                                    <Select
                                                        value={itemSeleccionado}
                                                        onValueChange={setItemSeleccionado}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccionar..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {(tipoSeleccionado === 'servicio' ? servicios : platillos).map((item) => (
                                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                                    {item.nombre} - {formatCurrency(item.precio)}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <Button
                                                    onClick={handleAgregarAlCarrito}
                                                    disabled={!itemSeleccionado}
                                                    className="w-full"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Agregar al carrito
                                                </Button>

                                                {/* Carrito */}
                                                {carrito.length > 0 && (
                                                    <div className="rounded-lg border p-4">
                                                        <h4 className="mb-3 font-medium">Carrito</h4>
                                                        <div className="space-y-2">
                                                            {carrito.map((item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between rounded bg-muted p-2"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        {item.tipo === 'servicio' ? (
                                                                            <ConciergeBell className="h-4 w-4 text-blue-500" />
                                                                        ) : (
                                                                            <Utensils className="h-4 w-4 text-green-500" />
                                                                        )}
                                                                        <span>{item.nombre}</span>
                                                                        <Badge variant="secondary">x{item.cantidad}</Badge>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium">
                                                                            {formatCurrency(item.precio * item.cantidad)}
                                                                        </span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8 text-destructive"
                                                                            onClick={() => handleRemoverDelCarrito(index)}
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-3 flex justify-between border-t pt-3">
                                                            <span className="font-medium">Total:</span>
                                                            <span className="text-lg font-bold">
                                                                {formatCurrency(totalCarrito)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsAddingConsumo(false)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    onClick={handleConfirmarConsumos}
                                                    disabled={carrito.length === 0 || processing}
                                                >
                                                    {processing ? 'Guardando...' : 'Confirmar Consumos'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog open={isPaying} onOpenChange={setIsPaying}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Registrar Pago
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Registrar Pago</DialogTitle>
                                                <DialogDescription>
                                                    Saldo pendiente: {formatCurrency(cuenta.saldo)}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Monto a pagar</Label>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0.01"
                                                        max={cuenta.saldo}
                                                        value={montoPago}
                                                        onChange={(e) => setMontoPago(e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setMontoPago((cuenta.saldo / 2).toFixed(2))}
                                                    >
                                                        50%
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setMontoPago(cuenta.saldo.toFixed(2))}
                                                    >
                                                        100%
                                                    </Button>
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsPaying(false)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    onClick={handleRegistrarPago}
                                                    disabled={!montoPago || parseFloat(montoPago) <= 0 || processing}
                                                >
                                                    {processing ? 'Procesando...' : 'Confirmar Pago'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}

                            {cuenta.factura && (
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver Factura
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <KPICard
                            title="Total"
                            value={formatCurrency(cuenta.monto_total)}
                            icon={Receipt}
                            color="bg-blue-50 text-blue-700 border-blue-200"
                        />
                        <KPICard
                            title="Pagado"
                            value={formatCurrency(cuenta.monto_pagado)}
                            icon={CheckCircle2}
                            color="bg-green-50 text-green-700 border-green-200"
                        />
                        <KPICard
                            title="Saldo Pendiente"
                            value={formatCurrency(cuenta.saldo)}
                            icon={Clock}
                            color={cuenta.saldo > 0 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}
                        />
                        <KPICard
                            title="Transacciones"
                            value={cuenta.transacciones.length.toString()}
                            icon={TrendingUp}
                            color="bg-purple-50 text-purple-700 border-purple-200"
                            subtitle={`${cuenta.transacciones.filter(t => t.tipo === 'servicio').length} servicios, ${cuenta.transacciones.filter(t => t.tipo === 'platillo').length} platillos`}
                        />
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Info Huésped */}
                        <InfoCard title="Información del Huésped" icon={User}>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Nombre</dt>
                                    <dd className="font-medium">{cuenta.checkin.cliente.nombre}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd className="font-medium">{cuenta.checkin.cliente.email}</dd>
                                </div>
                                {cuenta.checkin.cliente.telefono && (
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Teléfono</dt>
                                        <dd className="font-medium">{cuenta.checkin.cliente.telefono}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Check-in</dt>
                                    <dd>
                                        <Link
                                            href={route('recepcion.checkins.show', cuenta.checkin.id)}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Ver Check-in #{cuenta.checkin.id}
                                        </Link>
                                    </dd>
                                </div>
                            </dl>
                        </InfoCard>

                        {/* Info Habitación */}
                        <InfoCard title="Información de Habitación" icon={Building2}>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Habitación</dt>
                                    <dd className="font-medium">
                                        {cuenta.checkin.habitacion_evento.codigo} - {cuenta.checkin.habitacion_evento.nombre}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Tipo</dt>
                                    <dd className="font-medium">{cuenta.checkin.habitacion_evento.tipo_nombre}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Entrada</dt>
                                    <dd className="font-medium">{formatDate(cuenta.checkin.fecha_entrada)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Salida</dt>
                                    <dd className="font-medium">
                                        {cuenta.checkin.fecha_salida 
                                            ? formatDate(cuenta.checkin.fecha_salida)
                                            : <Badge variant="outline">En curso</Badge>
                                        }
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Atendido por</dt>
                                    <dd className="font-medium">{cuenta.checkin.recepcionista.nombre}</dd>
                                </div>
                            </dl>
                        </InfoCard>
                    </div>

                    {/* Transacciones */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b p-6">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Transacciones</h3>
                                <Badge variant="secondary">{cuenta.transacciones.length}</Badge>
                            </div>
                        </div>

                        {cuenta.transacciones.length === 0 ? (
                            <div className="p-12 text-center">
                                <Receipt className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-4 text-muted-foreground">
                                    No hay transacciones registradas
                                </p>
                                {isPendiente && (
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => setIsAddingConsumo(true)}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Agregar primer consumo
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                                Tipo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                                Descripción
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">
                                                Cantidad
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                                                Precio Unit.
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                                                Subtotal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                                Fecha
                                            </th>
                                            {isPendiente && (
                                                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">
                                                    Acción
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {cuenta.transacciones.map((transaccion) => {
                                            const item = transaccion.servicio || transaccion.platillo;
                                            return (
                                                <tr key={transaccion.id} className="hover:bg-muted/50">
                                                    <td className="px-6 py-4">
                                                        {transaccion.tipo === 'servicio' ? (
                                                            <Badge className="bg-blue-100 text-blue-700">
                                                                <ConciergeBell className="mr-1 h-3 w-3" />
                                                                Servicio
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-green-100 text-green-700">
                                                                <Utensils className="mr-1 h-3 w-3" />
                                                                Platillo
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">
                                                        {item?.nombre || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {transaccion.cantidad}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {formatCurrency(item?.precio || 0)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-medium">
                                                        {formatCurrency(transaccion.subtotal)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                                        {formatDateTime(transaccion.created_at)}
                                                    </td>
                                                    {isPendiente && (
                                                        <td className="px-6 py-4 text-center">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-destructive hover:bg-destructive/10"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            ¿Eliminar transacción?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Se eliminará "{item?.nombre}" de la cuenta.
                                                                            Esta acción no se puede deshacer.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleEliminarTransaccion(transaccion.id)}
                                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                        >
                                                                            Eliminar
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot className="bg-muted/50">
                                        <tr>
                                            <td colSpan={isPendiente ? 4 : 4} className="px-6 py-4 font-semibold">
                                                Total
                                            </td>
                                            <td className="px-6 py-4 text-right text-lg font-bold">
                                                {formatCurrency(cuenta.monto_total)}
                                            </td>
                                            <td colSpan={isPendiente ? 2 : 1}></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Gráficas (solo si hay >= 2 transacciones) */}
                    {cuenta.transacciones.length >= 2 && (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {datosGraficas.pieData.length > 1 && (
                                <GenericPieChart
                                    data={datosGraficas.pieData}
                                    dataKey="valor"
                                    nameKey="nombre"
                                    title="Distribución de Gastos"
                                    description="Servicios vs Platillos"
                                />
                            )}

                            {datosGraficas.barData.length > 0 && (
                                <GenericBarChart
                                    data={datosGraficas.barData}
                                    dataKey="total"
                                    categoryKey="nombre"
                                    title="Top Consumos"
                                    description="Items más consumidos"
                                    color="#667eea"
                                />
                            )}
                        </div>
                    )}

                    {/* Factura Info (si existe) */}
                    {cuenta.factura && (
                        <InfoCard title="Información de Factura" icon={FileText}>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Factura #</dt>
                                    <dd className="font-medium">{cuenta.factura.id}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Monto</dt>
                                    <dd className="font-medium">{formatCurrency(cuenta.factura.monto_total)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Estado</dt>
                                    <dd>
                                        <Badge variant="secondary">{cuenta.factura.estado}</Badge>
                                    </dd>
                                </div>
                                {cuenta.factura.tipo_pago && (
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Método de Pago</dt>
                                        <dd className="font-medium">{cuenta.factura.tipo_pago.nombre}</dd>
                                    </div>
                                )}
                            </dl>
                        </InfoCard>
                    )}

                    {/* Fecha de pago (si está pagado) */}
                    {cuenta.estado === 'pagada' && cuenta.fecha_pago && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="font-semibold text-green-800">Cuenta Saldada</p>
                                    <p className="text-sm text-green-600">
                                        Pagado el {formatDateTime(cuenta.fecha_pago)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}