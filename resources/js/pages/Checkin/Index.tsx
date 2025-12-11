import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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

import { Popover,PopoverContent,PopoverTrigger } from '@/shared/components/PopoverWrapper';

import { DataTable, Column } from '@/components/shared/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { 
    Plus, 
    Eye, 
    Pencil, 
    Calendar as CalendarIcon, 
    User, 
    DoorOpen, 
    DoorClosed,
    Building2,
    X
} from 'lucide-react';
import { route } from 'ziggy-js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/CalendarioModified';


// --- Interfaces ---
interface Usuario {
    id: number;
    name: string;
    email: string;
}

interface Cliente {
    id: number;
    user: Usuario;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
}

interface HabitacionEvento {
    id: number;
    nombre: string;
    codigo: string;
    tipo_habitacion: TipoHabitacion;
}

interface Checkin {
    id: number;
    cliente: Cliente;
    habitacion_evento: HabitacionEvento;
    fecha_entrada: string;
    fecha_salida: string | null;
    created_at: string;
}

interface ClienteOption {
    id: number;
    nombre: string;
    email: string;
}

interface Props {
    checkins: {
        data: Checkin[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    clientes: ClienteOption[];
    filters?: {
        search?: string;
        cliente_id?: string;
        fecha_desde?: string;
        fecha_hasta?: string;
    };
}

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Recepción', href: '#' },
    { title: 'Check-ins', href: route('recepcion.checkins.index') },
];

// Formatear fecha
const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

// Formatear fecha y hora
const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function CheckinIndex({ checkins, clientes, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [clienteFilter, setClienteFilter] = useState(filters.cliente_id || 'todos');
    const [fechaDesde, setFechaDesde] = useState<Date | undefined>(
        filters.fecha_desde ? new Date(filters.fecha_desde) : undefined
    );
    const [fechaHasta, setFechaHasta] = useState<Date | undefined>(
        filters.fecha_hasta ? new Date(filters.fecha_hasta) : undefined
    );

    // Función para manejar la búsqueda y filtrado
    const handleFilter = (
        search: string, 
        clienteId: string, 
        desde: Date | undefined, 
        hasta: Date | undefined
    ) => {
        const params: Record<string, string> = {};
        
        if (search) params.search = search;
        if (clienteId && clienteId !== 'todos') params.cliente_id = clienteId;
        if (desde) params.fecha_desde = format(desde, 'yyyy-MM-dd');
        if (hasta) params.fecha_hasta = format(hasta, 'yyyy-MM-dd');

        router.get(
            route('recepcion.checkins.index'),
            params,
            { preserveState: true, replace: true }
        );
    };

    // Efecto para debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                handleFilter(searchValue, clienteFilter, fechaDesde, fechaHasta);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Manejar cambio de cliente
    const handleClienteChange = (clienteId: string) => {
        setClienteFilter(clienteId);
        handleFilter(searchValue, clienteId, fechaDesde, fechaHasta);
    };

    // Manejar cambio de fecha desde
    const handleFechaDesdeChange = (date: Date | undefined) => {
        setFechaDesde(date);
        handleFilter(searchValue, clienteFilter, date, fechaHasta);
    };

    // Manejar cambio de fecha hasta
    const handleFechaHastaChange = (date: Date | undefined) => {
        setFechaHasta(date);
        handleFilter(searchValue, clienteFilter, fechaDesde, date);
    };

    // Limpiar filtros de fecha
    const clearFechaFilters = () => {
        setFechaDesde(undefined);
        setFechaHasta(undefined);
        handleFilter(searchValue, clienteFilter, undefined, undefined);
    };

    const columns: Column<Checkin>[] = [
        { 
            key: 'id', 
            label: 'ID', 
            className: 'w-[70px]',
            render: (checkin) => (
                <span className="font-mono text-sm">#{checkin.id}</span>
            ),
        },
        {
            key: 'cliente',
            label: 'Cliente',
            className: 'min-w-[200px]',
            render: (checkin) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{checkin.cliente.user.name}</span>
                        <span className="text-xs text-muted-foreground">{checkin.cliente.user.email}</span>
                    </div>
                </div>
            ),
        },
        {
            key: 'habitacion_evento',
            label: 'Habitación/Evento',
            render: (checkin) => {
                const isHabitacion = checkin.habitacion_evento.tipo_habitacion.tipo === 'habitacion';
                return (
                    <div className="flex items-center gap-2">
                        <Badge 
                            variant="outline" 
                            className={cn(
                                "font-mono",
                                isHabitacion 
                                    ? "border-blue-200 bg-blue-50 text-blue-700" 
                                    : "border-purple-200 bg-purple-50 text-purple-700"
                            )}
                        >
                            <Building2 className="h-3 w-3 mr-1" />
                            {checkin.habitacion_evento.codigo}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            {checkin.habitacion_evento.nombre}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'fecha_entrada',
            label: 'Fecha Entrada',
            render: (checkin) => (
                <div className="flex items-center gap-2">
                    <DoorOpen className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">
                        {formatDate(checkin.fecha_entrada)}
                    </span>
                </div>
            ),
        },
        {
            key: 'fecha_salida',
            label: 'Fecha Salida',
            render: (checkin) => (
                <div className="flex items-center gap-2">
                    <DoorClosed className={cn(
                        "h-4 w-4",
                        checkin.fecha_salida ? "text-red-600" : "text-gray-400"
                    )} />
                    <span className={cn(
                        "font-medium",
                        checkin.fecha_salida ? "text-red-700" : "text-gray-400 italic"
                    )}>
                        {checkin.fecha_salida ? formatDate(checkin.fecha_salida) : 'N/A'}
                    </span>
                </div>
            ),
        },
        {
            key: 'created_at',
            label: 'Registrado',
            render: (checkin) => (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDateTime(checkin.created_at)}</span>
                </div>
            ),
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (checkin) => {
                const activo = !checkin.fecha_salida;
                return (
                    <Badge variant={activo ? "default" : "secondary"} className={cn(
                        activo && "bg-green-500 hover:bg-green-600"
                    )}>
                        {activo ? 'Activo' : 'Finalizado'}
                    </Badge>
                );
            },
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px] text-right',
            render: (checkin) => (
                <div className="flex gap-2 justify-end">
                    <Link href={route('recepcion.checkins.show', checkin.id)}>
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route('recepcion.checkins.edit', checkin.id)}>
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
            <Head title="Gestión de Check-ins" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Check-ins</h1>
                            <p className="text-muted-foreground">
                                Gestiona los registros de entrada y salida de huéspedes.
                            </p>
                        </div>
                        {/* <Link href={route('recepcion.checkins.create')}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo Check-in
                            </Button>
                        </Link> */}
                    </div>

                    {/* Filtros */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Búsqueda */}
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar</Label>
                                <Input
                                    id="search"
                                    placeholder="Buscar por nombre o email..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>

                            {/* Filtro por cliente */}
                            <div className="space-y-2">
                                <Label>Cliente</Label>
                                <Select value={clienteFilter} onValueChange={handleClienteChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos los clientes</SelectItem>
                                        {clientes.map((cliente) => (
                                            <SelectItem key={cliente.id} value={cliente.id.toString()}>
                                                {cliente.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Fecha Desde */}
                            <div className="space-y-2">
                                <Label>Fecha Desde</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !fechaDesde && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "Seleccionar"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={fechaDesde}
                                            onSelect={handleFechaDesdeChange}
                                            locale={es}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Fecha Hasta */}
                            <div className="space-y-2">
                                <Label>Fecha Hasta</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !fechaHasta && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "Seleccionar"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={fechaHasta}
                                            onSelect={handleFechaHastaChange}
                                            locale={es}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Botón limpiar filtros de fecha */}
                        {(fechaDesde || fechaHasta) && (
                            <div className="flex justify-end">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={clearFechaFilters}
                                    className="text-muted-foreground"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Limpiar fechas
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Tabla */}
                    <DataTable
                        columns={columns}
                        data={checkins.data}
                        pagination={checkins}
                        onPageChange={(page) => {
                            const params: Record<string, string> = { page: page.toString() };
                            if (searchValue) params.search = searchValue;
                            if (clienteFilter && clienteFilter !== 'todos') params.cliente_id = clienteFilter;
                            if (fechaDesde) params.fecha_desde = format(fechaDesde, 'yyyy-MM-dd');
                            if (fechaHasta) params.fecha_hasta = format(fechaHasta, 'yyyy-MM-dd');

                            router.get(route('recepcion.checkins.index'), params, { preserveState: true });
                        }}
                        emptyMessage="No se encontraron check-ins"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
