import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DataTable, Column } from '@/components/shared/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { Plus, Eye, Pencil, Calendar, Users, Plane, Briefcase, Heart, PartyPopper, DoorOpen } from 'lucide-react';
import { route } from 'ziggy-js';

// --- Interfaces ---
interface Cliente {
    id: number;
    user: {
        name: string;
        email: string;
    };
}

interface Reserva {
    id: number;
    cliente: Cliente;
    fecha_reserva: string;
    dias_estadia: number;
    estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada' | 'en_curso';
    tipo_reserva: 'habitacion' | 'evento';
    tipo_viaje: 'negocios' | 'turismo' | 'familiar' | 'luna_de_miel' | 'otro';
    pago_inicial: number;
    monto_total: number;
}

interface Props {
    reservas: {
        data: Reserva[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters?: {
        search?: string;
        estado?: string;
        tipo_reserva?: string;
        tipo_viaje?: string;
    };
}

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Recepción', href: '#' },
    { title: 'Reservas', href: route('recepcion.reservas.index') },
];

// Opciones de filtros
const ESTADO_OPTIONS = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'confirmada', label: 'Confirmada' },
    { value: 'cancelada', label: 'Cancelada' },
];

const TIPO_RESERVA_OPTIONS = [
    { value: 'todos', label: 'Todos los tipos' },
    { value: 'habitacion', label: 'Habitación' },
    { value: 'evento', label: 'Evento' },
];

const TIPO_VIAJE_OPTIONS = [
    { value: 'todos', label: 'Todos los viajes' },
    { value: 'negocios', label: '💼 Negocios' },
    { value: 'vacaciones', label: '✈️ Vacaciones' },
    { value: 'familiar', label: '👨‍👩‍👧‍👦 Familiar' },
    { value: 'luna_de_miel', label: '💕 Luna de Miel' },
    { value: 'otro', label: '📋 Otro' },
];

// Formatear precio como moneda
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

// Formatear fecha
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

// Helper para obtener configuración del estado
const getEstadoConfig = (estado: string) => {
    switch (estado) {
        case 'pendiente':
            return { label: 'Pendiente', variant: 'outline' as const, className: 'border-yellow-500 text-yellow-700 bg-yellow-50' };
        case 'confirmada':
            return { label: 'Confirmada', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' };
        case 'en_curso':
            return { label: 'En Curso', variant: 'default' as const, className: 'bg-blue-500 hover:bg-blue-600' };
        case 'completada':
            return { label: 'Completada', variant: 'default' as const, className: 'bg-emerald-600 hover:bg-emerald-700' };
        case 'cancelada':
            return { label: 'Cancelada', variant: 'destructive' as const, className: '' };
        default:
            return { label: estado, variant: 'secondary' as const, className: '' };
    }
};

// Helper para obtener configuración del tipo de reserva
const getTipoReservaConfig = (tipo: string) => {
    switch (tipo) {
        case 'habitacion':
            return { label: 'Habitación', icon: '🛏️', className: 'bg-blue-100 text-blue-800' };
        case 'evento':
            return { label: 'Evento', icon: '🎉', className: 'bg-purple-100 text-purple-800' };
        default:
            return { label: tipo, icon: '📋', className: 'bg-gray-100 text-gray-800' };
    }
};

// Helper para obtener configuración del tipo de viaje
const getTipoViajeConfig = (tipo: string) => {
    switch (tipo) {
        case 'negocios':
            return { label: 'Negocios', icon: <Briefcase className="h-3 w-3" />, className: 'bg-slate-100 text-slate-800' };
        case 'turismo':
            return { label: 'Turismo', icon: <Plane className="h-3 w-3" />, className: 'bg-cyan-100 text-cyan-800' };
        case 'familiar':
            return { label: 'Familiar', icon: <Users className="h-3 w-3" />, className: 'bg-orange-100 text-orange-800' };
        case 'luna_de_miel':
            return { label: 'Luna de Miel', icon: <Heart className="h-3 w-3" />, className: 'bg-pink-100 text-pink-800' };
        case 'otro':
            return { label: 'Otro', icon: <PartyPopper className="h-3 w-3" />, className: 'bg-gray-100 text-gray-800' };
        default:
            return { label: tipo, icon: null, className: 'bg-gray-100 text-gray-800' };
    }
};

export default function IndexRecepcion({ reservas, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');
    const [tipoReservaFilter, setTipoReservaFilter] = useState(filters.tipo_reserva || 'todos');
    const [tipoViajeFilter, setTipoViajeFilter] = useState(filters.tipo_viaje || 'todos');

    // Función para manejar la búsqueda y filtrado
    const handleSearch = (search: string, estado: string, tipoReserva: string, tipoViaje: string) => {
        router.get(
            route('recepcion.reservas.index'),
            { 
                search, 
                estado, 
                tipo_reserva: tipoReserva, 
                tipo_viaje: tipoViaje 
            },
            { preserveState: true, replace: true }
        );
    };

    // Efecto para debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                handleSearch(searchValue, estadoFilter, tipoReservaFilter, tipoViajeFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Manejar cambios de filtros
    const handleEstadoChange = (estado: string) => {
        setEstadoFilter(estado);
        handleSearch(searchValue, estado, tipoReservaFilter, tipoViajeFilter);
    };

    const handleTipoReservaChange = (tipo: string) => {
        setTipoReservaFilter(tipo);
        handleSearch(searchValue, estadoFilter, tipo, tipoViajeFilter);
    };

    const handleTipoViajeChange = (tipo: string) => {
        setTipoViajeFilter(tipo);
        handleSearch(searchValue, estadoFilter, tipoReservaFilter, tipo);
    };

    const canCheckin = (estado: Reserva['estado']): boolean => {
        return ['pendiente', 'confirmada', 'en_curso'].includes(estado);
    };

    const columns: Column<Reserva>[] = [
        { 
            key: 'id', 
            label: 'ID', 
            className: 'w-[70px]',
            render: (reserva) => (
                <span className="font-mono text-sm">#{reserva.id}</span>
            ),
        },
        {
            key: 'cliente',
            label: 'Cliente',
            className: 'min-w-[180px]',
            render: (reserva) => (
                <div className="flex flex-col">
                    <span className="font-medium">{reserva.cliente.user.name}</span>
                    <span className="text-xs text-muted-foreground">{reserva.cliente.user.email}</span>
                </div>
            ),
        },
        {
            key: 'fecha_reserva',
            label: 'Fecha Reserva',
            render: (reserva) => (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(reserva.fecha_reserva)}</span>
                </div>
            ),
        },
        {
            key: 'dias_estadia',
            label: 'Días',
            className: 'w-[80px] text-center',
            render: (reserva) => (
                <Badge variant="outline" className="font-mono">
                    {reserva.dias_estadia} {reserva.dias_estadia === 1 ? 'día' : 'días'}
                </Badge>
            ),
        },
        {
            key: 'tipo_reserva',
            label: 'Tipo Reserva',
            render: (reserva) => {
                const config = getTipoReservaConfig(reserva.tipo_reserva);
                return (
                    <Badge className={config.className}>
                        {config.icon} {config.label}
                    </Badge>
                );
            },
        },
        {
            key: 'tipo_viaje',
            label: 'Tipo Viaje',
            render: (reserva) => {
                const config = getTipoViajeConfig(reserva.tipo_viaje);
                return (
                    <Badge className={config.className}>
                        <span className="flex items-center gap-1">
                            {config.icon}
                            {config.label}
                        </span>
                    </Badge>
                );
            },
        },
        {
            key: 'pago_inicial',
            label: 'Pago Inicial',
            render: (reserva) => (
                <span className="font-medium text-blue-600">
                    {formatCurrency(reserva.pago_inicial)}
                </span>
            ),
        },
        {
            key: 'monto_total',
            label: 'Total',
            render: (reserva) => (
                <span className="font-bold text-green-600">
                    {formatCurrency(reserva.monto_total)}
                </span>
            ),
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (reserva) => {
                const config = getEstadoConfig(reserva.estado);
                return (
                    <Badge variant={config.variant} className={config.className}>
                        {config.label}
                    </Badge>
                );
            },
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px] text-right',
            render: (reserva) => (
                <div className="flex gap-2 justify-end">
                    {/* Botón de Check-in */}
                    {canCheckin(reserva.estado) && (
                        <Link 
                            // La nueva ruta para iniciar el check-in, pasando el ID de la reserva
                            href={route('recepcion.checkins.create', { reserva: reserva.id })} 
                            title="Crear Check-in"
                        >
                            {/* Se puede usar DoorOpen o un icono de llave */}
                            <Button variant="ghost" size="sm" title='agregar checkin'>
                                +<DoorOpen className="h-4 w-4 mr-1" />
                                
                            </Button>
                        </Link>
                    )}
                    <Link href={route('recepcion.reservas.show', reserva.id)}>
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route('recepcion.reservas.edit', reserva.id)}>
                        <Button variant="ghost" size="sm" title="Editar">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Reservas - Recepción" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
                            <p className="text-muted-foreground">
                                Gestiona las reservas de habitaciones y eventos del hotel.
                            </p>
                        </div>
                        <Link href={route('recepcion.reservas.create')}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nueva Reserva
                            </Button>
                        </Link>
                    </div>

                    {/* Filtros */}
                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar por nombre de cliente..."
                    >
                        <Select value={estadoFilter} onValueChange={handleEstadoChange}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {ESTADO_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={tipoReservaFilter} onValueChange={handleTipoReservaChange}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Tipo Reserva" />
                            </SelectTrigger>
                            <SelectContent>
                                {TIPO_RESERVA_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={tipoViajeFilter} onValueChange={handleTipoViajeChange}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Tipo Viaje" />
                            </SelectTrigger>
                            <SelectContent>
                                {TIPO_VIAJE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </SearchFilter>

                    {/* Tabla */}
                    <DataTable
                        columns={columns}
                        data={reservas.data}
                        pagination={reservas}
                        onPageChange={(page) => {
                            router.get(
                                route('recepcion.reservas.index'),
                                { 
                                    page, 
                                    search: searchValue, 
                                    estado: estadoFilter,
                                    tipo_reserva: tipoReservaFilter,
                                    tipo_viaje: tipoViajeFilter,
                                },
                                { preserveState: true }
                            );
                        }}
                        emptyMessage="No se encontraron reservas"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
