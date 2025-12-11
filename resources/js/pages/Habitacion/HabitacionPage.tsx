import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    Search,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Home,
    Clock,
    Wrench,
    CheckCircle,
    Building,
    Sparkles,
} from 'lucide-react';
import { DataTable } from '@/shared/ui/data-table';
import type { BreadcrumbItem } from '@/types';

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
    capacidad_total: number;
}

interface HabitacionEvento {
    id: number;
    codigo: string;
    nombre: string;
    estado: 'disponible' | 'ocupada' | 'limpieza' | 'mantenimiento' | 'bloqueada' | 'fuera_de_servicio';
    piso: string | null;
    ala_seccion: string | null;
    vista: string | null;
    tipo_habitacion: TipoHabitacion;
    ocupantes_actuales: number;
    capacidad_total: number;
    es_salon_evento: boolean;
}

// ✅ CORRECCIÓN: Hacer que todos los campos sean string | undefined
interface Filters {
    search?: string;
    estado?: string;
    tipo?: string;
    piso?: string;
    tipo_habitacion_id?: string; // ✅ Cambiar de number a string
}

interface Props {
    habitaciones: {
        data: HabitacionEvento[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    pisos: string[];
    tiposHabitacion: TipoHabitacion[];
    estadisticas: {
        total: number;
        disponibles: number;
        ocupadas: number;
        limpieza: number;
        mantenimiento: number;
    };
    filters: Filters;
}

export default function HabitacionPage({ habitaciones, pisos, tiposHabitacion, estadisticas, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Habitaciones', href: '/habitaciones' },
    ];

    // Función para obtener el badge de estado
    const getEstadoBadge = (estado: string) => {
        const badges = {
            disponible: { color: 'bg-green-500', icon: CheckCircle, text: 'Disponible' },
            ocupada: { color: 'bg-red-500', icon: Home, text: 'Ocupada' },
            limpieza: { color: 'bg-yellow-500', icon: Sparkles, text: 'Limpieza' },
            mantenimiento: { color: 'bg-orange-500', icon: Wrench, text: 'Mantenimiento' },
            bloqueada: { color: 'bg-gray-500', icon: Clock, text: 'Bloqueada' },
            fuera_de_servicio: { color: 'bg-black', icon: Building, text: 'Fuera de Servicio' },
        };

        const badge = badges[estado as keyof typeof badges] || badges.disponible;
        const Icon = badge.icon;

        return (
            <Badge className={`${badge.color} text-white flex items-center gap-1 w-fit`}>
                <Icon className="h-3 w-3" />
                {badge.text}
            </Badge>
        );
    };

    // Manejar búsqueda
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/habitaciones', {
            ...filters,
            search: searchTerm,
        } as Record<string, string>, { // ✅ CORRECCIÓN: Cast a Record<string, string>
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Manejar filtros
    const handleFilter = (key: string, value: string) => {
        router.get('/habitaciones', {
            ...filters,
            [key]: value || undefined,
        } as Record<string, string>, { // ✅ CORRECCIÓN: Cast a Record<string, string>
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Limpiar filtros
    const clearFilters = () => {
        setSearchTerm('');
        router.get('/habitaciones', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Eliminar habitación
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta habitación?')) {
            router.delete(`/habitaciones/${id}`, {
                preserveScroll: true,
            });
        }
    };

    // Columnas de la tabla
    const columns = [
        {
            key: 'codigo',
            label: 'Código',
            render: (habitacion: HabitacionEvento) => (
                <div>
                    <p className="font-bold text-lg">{habitacion.codigo}</p>
                    {habitacion.piso && (
                        <p className="text-sm text-gray-500">Piso {habitacion.piso}</p>
                    )}
                </div>
            ),
        },
        {
            key: 'nombre',
            label: 'Tipo',
            render: (habitacion: HabitacionEvento) => (
                <div>
                    <p className="font-medium">{habitacion.nombre}</p>
                    <p className="text-sm text-gray-500">
                        {habitacion.tipo_habitacion.tipo === 'habitacion' ? '🏨 Habitación' : '🎉 Salón'}
                    </p>
                </div>
            ),
        },
        {
            key: 'ubicacion',
            label: 'Ubicación',
            render: (habitacion: HabitacionEvento) => (
                <div className="text-sm">
                    {habitacion.ala_seccion && <p>📍 {habitacion.ala_seccion}</p>}
                    {habitacion.vista && <p>👁️ Vista {habitacion.vista}</p>}
                    {!habitacion.ala_seccion && !habitacion.vista && <p className="text-gray-400">-</p>}
                </div>
            ),
        },
        {
            key: 'ocupacion',
            label: 'Ocupación',
            render: (habitacion: HabitacionEvento) => (
                <div className="text-center">
                    <p className="text-lg font-bold">
                        {habitacion.ocupantes_actuales} / {habitacion.capacidad_total}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                            className={`h-2 rounded-full ${
                                habitacion.ocupantes_actuales >= habitacion.capacidad_total
                                    ? 'bg-red-500'
                                    : 'bg-blue-500'
                            }`}
                            style={{
                                width: `${(habitacion.ocupantes_actuales / habitacion.capacidad_total) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            ),
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (habitacion: HabitacionEvento) => getEstadoBadge(habitacion.estado),
        },
        {
            key: 'acciones',
            label: 'Acciones',
            render: (habitacion: HabitacionEvento) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.visit(`/habitaciones/${habitacion.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.visit(`/habitaciones/${habitacion.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDelete(habitacion.id)}
                            className="text-red-600"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Habitaciones" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Habitaciones</h1>
                            <p className="text-muted-foreground">Gestiona las habitaciones y salones del hotel</p>
                        </div>
                        <Button onClick={() => router.visit('/habitaciones/create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Habitación
                        </Button>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{estadisticas.total}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200 bg-green-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-green-600">Disponibles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-green-600">{estadisticas.disponibles}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 bg-red-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-red-600">Ocupadas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-red-600">{estadisticas.ocupadas}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-yellow-200 bg-yellow-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-yellow-600">Limpieza</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-yellow-600">{estadisticas.limpieza}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-orange-200 bg-orange-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-orange-600">Mantenimiento</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-orange-600">{estadisticas.mantenimiento}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filtros */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {/* Búsqueda */}
                                <form onSubmit={handleSearch} className="md:col-span-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Buscar por código o nombre..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </form>

                                {/* Filtro Estado */}
                                <Select
                                    value={filters.estado || 'todos'}
                                    onValueChange={(value) => handleFilter('estado', value === 'todos' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos los estados</SelectItem>
                                        <SelectItem value="disponible">Disponible</SelectItem>
                                        <SelectItem value="ocupada">Ocupada</SelectItem>
                                        <SelectItem value="limpieza">Limpieza</SelectItem>
                                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                                        <SelectItem value="bloqueada">Bloqueada</SelectItem>
                                        <SelectItem value="fuera_de_servicio">Fuera de Servicio</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Filtro Piso */}
                                <Select
                                    value={filters.piso || 'todos'}
                                    onValueChange={(value) => handleFilter('piso', value === 'todos' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Piso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos los pisos</SelectItem>
                                        {pisos.map((piso) => (
                                            <SelectItem key={piso} value={piso}>
                                                Piso {piso}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Botón limpiar filtros */}
                                <Button variant="outline" onClick={clearFilters}>
                                    Limpiar Filtros
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabla */}
                    <Card>
                        <CardContent className="pt-6">
                            <DataTable
                                columns={columns}
                                data={habitaciones.data}
                                emptyMessage="No se encontraron habitaciones"
                            />

                            {/* Paginación simple */}
                            {habitaciones.last_page > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {Array.from({ length: habitaciones.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={habitaciones.current_page === page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => router.get(`/habitaciones?page=${page}`, filters as Record<string, string>)} // ✅ CORRECCIÓN
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AppLayout>
    );
}