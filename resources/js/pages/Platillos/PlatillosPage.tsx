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
import { DataTable, Column, PaginationData } from '@/components/shared/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SearchFilter } from '@/components/shared/SearchFilter';
import { Plus, Eye, Pencil } from 'lucide-react';
import { route } from 'ziggy-js';
import { useDashboardRoute } from '@/hooks/useDashboardRoute';

// --- Interfaces de Tipos ---
interface Categoria {
    nombre: string;
}

interface Platillo {
    id: number;
    nombre: string;
    precio: number;
    estado: 'activo' | 'inactivo';
    categoria: Categoria;
}

interface Props {
    platillos: {
        data: Platillo[];
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

// Breadcrumbs


// Opciones de filtro de estado
const ESTADO_OPTIONS = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'no disponible', label: 'No Disponible' },
];

// Formatear precio como moneda
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function PlatillosPage({ platillos, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');
    const {path,title} = useDashboardRoute();

    const breadcrumbs: BreadcrumbItem[] = [
        { title, href: path },
        { title: 'Platillos', href: path },
    ];
    const handleSearch = (search: string, estado: string) => {
        router.get(
            route('platillos.index'),
            { search, estado },
            { preserveState: true, replace: true }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                handleSearch(searchValue, estadoFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const handleEstadoChange = (estado: string) => {
        setEstadoFilter(estado);
        handleSearch(searchValue, estado);
    };

    const columns: Column<Platillo>[] = [
        { key: 'id', label: 'ID', className: 'w-[80px]' },
        { key: 'nombre', label: 'Nombre del Platillo', className: 'min-w-[200px]' },
        {
            key: 'categoria',
            label: 'Categoría',
            render: (platillo) => <span>{platillo.categoria.nombre}</span>,
        },
        {
            key: 'precio',
            label: 'Precio',
            render: (platillo) => (
                <span className="font-medium text-green-600">
                    {formatCurrency(platillo.precio)}
                </span>
            ),
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (platillo) => (
                <Badge variant={platillo.estado === 'activo' ? 'default' : 'secondary'}>
                    {platillo.estado.charAt(0).toUpperCase() + platillo.estado.slice(1)}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px] text-right',
            render: (platillo) => (
                <div className="flex gap-2 justify-end">
                    <Link href={route('platillos.show', platillo.id)}>
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route('platillos.edit', platillo.id)}>
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
            <Head title="Gestión de Platillos" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Platillos</h1>
                            <p className="text-muted-foreground">
                                Administra los platillos disponibles en el menú.
                            </p>
                        </div>
                        <Link href={route('platillos.create')}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo Platillo
                            </Button>
                        </Link>
                    </div>

                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar platillo por nombre..."
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
                        data={platillos.data}
                        pagination={platillos}
                        onPageChange={(page) => {
                            router.get(
                                route('platillos.index'),
                                { page, search: searchValue, estado: estadoFilter },
                                { preserveState: true }
                            );
                        }}
                        emptyMessage="No se encontraron platillos"
                    />
                </div>
            </div>
        </AppLayout>
    );
}