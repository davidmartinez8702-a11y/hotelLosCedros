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
// Asegúrate de que las rutas a estos componentes son correctas en tu proyecto
import { DataTable, Column, PaginationData } from '@/components/shared/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { Plus, Eye, Pencil, DollarSign } from 'lucide-react';
import { route } from 'ziggy-js';

// --- Interfaces de Tipos ---

// Interfaz para la Categoria anidada
interface Categoria {
    nombre: string;
}

// Interfaz para un Servicio individual
interface Servicio {
    id: number;
    nombre: string;
    precio: number;
    estado: 'activo' | 'inactivo';
    categoria: Categoria; // Relación cargada
    created_at?: string;
    updated_at?: string;
}

// Interfaz para las Props que recibe el componente desde Laravel
interface Props {
    servicios: {
        data: Servicio[];
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
    };
}

// Definición de Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    {
        title: 'Servicios',
        href: '/servicios',
    },
];

// Opciones de filtro de estado
const ESTADO_OPTIONS = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
];

// Función para formatear el precio como moneda (ej: $1,250.00)
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB', // Puedes ajustar la moneda a tu país (ej: 'USD', 'MXN', 'BOB', etc.)
        minimumFractionDigits: 2,
    }).format(amount);
};


export default function ServiciosPage({ servicios, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');

    const handleSearch = (search: string, estado: string) => {
        router.get(
            route('servicios.index'), // Asegúrate que esta ruta exista
            { search, estado },
            { preserveState: true, replace: true }
        );
    };

    // Efecto para debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                handleSearch(searchValue, estadoFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Manejar cambio de estado
    const handleEstadoChange = (estado: string) => {
        setEstadoFilter(estado);
        // Si el estado cambia, disparamos la búsqueda inmediatamente
        handleSearch(searchValue, estado);
    };

    const columns: Column<Servicio>[] = [
        {
            key: 'id',
            label: 'ID',
            className: 'w-[80px]',
        },
        {
            key: 'nombre',
            label: 'Nombre del Servicio',
            className: 'min-w-[200px]',
        },
        {
            key: 'categoria',
            label: 'Categoría',
            render: (servicio) => (
                // Muestra el nombre de la categoría
                <span>{servicio.categoria.nombre}</span>
            ),
        },
        {
            key: 'precio',
            label: 'Precio',
            render: (servicio) => (
                <span className="font-medium text-green-600">
                    {formatCurrency(servicio.precio)}
                </span>
            ),
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (servicio) => (
                <Badge variant={servicio.estado === 'activo' ? 'default' : 'secondary'}>
                    {servicio.estado.charAt(0).toUpperCase() + servicio.estado.slice(1)}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px] text-right',
            render: (servicio) => (
                <div className="flex gap-2 justify-end">
                    {/* Botón para ver el detalle del servicio */}
                    <Link href={route('servicios.show', servicio.id)}>
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    {/* Botón para editar el servicio */}
                    <Link href={route('servicios.edit', servicio.id)}>
                        <Button variant="ghost" size="sm" title="Editar">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    // Función para manejar el cambio de página
    const handlePageChange = (page: number) => {
        router.get(
            route('servicios.index'),
            { page, search: searchValue, estado: estadoFilter },
            { preserveState: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Servicios" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
                            <p className="text-muted-foreground">
                                Administra los servicios ofrecidos por el negocio.
                            </p>
                        </div>
                        <Link href={route('servicios.create')}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo Servicio
                            </Button>
                        </Link>
                    </div>

                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar servicio por nombre..."
                    >
                        <Select value={estadoFilter} onValueChange={handleEstadoChange}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Filtrar por estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {ESTADO_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </SearchFilter>

                    <DataTable
                        columns={columns}
                        data={servicios.data}
                        pagination={servicios}
                        onPageChange={handlePageChange}
                        emptyMessage="No se encontraron servicios"
                    />
                </div>
            </div>
        </AppLayout>
    );
}