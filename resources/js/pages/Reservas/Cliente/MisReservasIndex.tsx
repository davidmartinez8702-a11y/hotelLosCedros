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

// --- Interfaces (Adaptadas para el cliente) ---
// El backend ya mapea estos campos
interface Reserva {
    id: number;
    fecha_reserva: string;
    dias_estadia: number;
    estado: string;
    tipo_reserva: string;
    tipo_viaje: string;
    pago_inicial: number;
    monto_total: number;
    promo: {
        id: number;
        nombre: string;
    } | null;
    created_at: string;
    // ✅ Si usas estos campos, asegúrate que vengan del backend como:
    total_cantidad_adultos?: number;
    total_cantidad_infantes?: number;
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
    filters: {
        search?: string;
        estado?: string;
        tipo_reserva?: string;
        tipo_viaje?: string;
    };
    cliente_nombre: string;
}

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Mis Reservas', href: route('clientes.mis-reservas.index') },
];

// Opciones de filtros
const ESTADO_OPTIONS = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'confirmada', label: 'Confirmada' },
    { value: 'cancelada', label: 'Cancelada' },
    // El cliente solo suele ver estos estados relevantes
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

// --- FUNCIONES DE FORMATO REUTILIZADAS ---

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

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


export default function MisReservasIndex({ reservas, filters, cliente_nombre }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');
    const [tipoReservaFilter, setTipoReservaFilter] = useState(filters.tipo_reserva || 'todos');
    const [tipoViajeFilter, setTipoViajeFilter] = useState(filters.tipo_viaje || 'todos');

    // Función unificada para manejar la búsqueda y filtrado
    const handleSearch = (search: string, estado: string, tipoReserva: string, tipoViaje: string) => {
        router.get(
            route('clientes.mis-reservas.index'), 
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
            // Solo aplica si el valor local es diferente al valor de Inertia
            if (searchValue !== (filters.search || '')) {
                handleSearch(searchValue, estadoFilter, tipoReservaFilter, tipoViajeFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Manejar cambios de filtros (sin debounce)
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
    
    // El cliente no necesita hacer Check-in desde aquí, solo ver.
    // const canCheckin = (estado: Reserva['estado']): boolean => {
    //     return ['pendiente', 'confirmada', 'en_curso'].includes(estado);
    // };

    const columns: Column<Reserva>[] = [
        { 
            key: 'id', 
            label: 'ID', 
            className: 'w-[70px]',
            render: (reserva) => (
                <span className="font-mono text-sm">#{reserva.id}</span>
            ),
        },
        // 🚨 REMOVIDO: Columna de Cliente
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
                    {/* El cliente solo ve el detalle */}
                    <Link href={route('clientes.mis-reservas.show', reserva.id)}> 
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    {/* El cliente generalmente no puede editar su reserva directamente desde la tabla */}
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Mis Reservas - ${cliente_nombre}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Mis Reservas</h1>
                            <p className="text-muted-foreground">
                                Hola, {cliente_nombre}. Aquí puedes revisar tus reservas pendientes y pasadas.
                            </p>
                        </div>
                        {/* El cliente no necesita el botón "Nueva Reserva" aquí, lo haría en la landing/web */}
                    </div>

                    {/* Filtros */}
                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        // 🚨 Ajuste de placeholder para el cliente
                        searchPlaceholder="Buscar por ID de reserva o tipo de viaje..."
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
                                route('clientes.mis-reservas.index'), 
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
                        emptyMessage="No tienes reservas registradas."
                    />
                </div>
            </div>
        </AppLayout>
    );
}