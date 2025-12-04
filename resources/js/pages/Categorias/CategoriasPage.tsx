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

interface Categoria {
    id: number;
    nombre: string;
    estado: 'activo' | 'inactivo';
    created_at?: string;
    updated_at?: string;
}

interface Props {
    categorias: {
        data: Categoria[];
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    {
        title: 'Categorías',
        href: '/categorias',
    },
];

const ESTADO_OPTIONS = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
];

export default function CategoriasPage({ categorias, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');

    // Función para manejar la búsqueda y filtrado en el servidor
    const handleSearch = (search: string, estado: string) => {
        router.get(
            route('categorias.index'),
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
        handleSearch(searchValue, estado);
    };

    const columns: Column<Categoria>[] = [
        {
            key: 'id',
            label: 'ID',
            className: 'w-[80px]',
        },
        {
            key: 'nombre',
            label: 'Nombre',
        },
        {
            key: 'estado',
            label: 'Estado',
            render: (categoria) => (
                <Badge variant={categoria.estado === 'activo' ? 'default' : 'secondary'}>
                    {categoria.estado.charAt(0).toUpperCase() + categoria.estado.slice(1)}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px]',
            render: (categoria) => (
                <div className="flex gap-2">
                    <Link href={route('categorias.show', categoria.id)}>
                        <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route('categorias.edit', categoria.id)}>
                        <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Categorías" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
                            <p className="text-muted-foreground">
                                Gestiona las categorías de platillos y servicios
                            </p>
                        </div>
                        <Link href={route('categorias.create')}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nueva Categoría
                            </Button>
                        </Link>
                    </div>

                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar categoría..."
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
                        data={categorias.data}
                        pagination={categorias}
                        onPageChange={(page) => {
                            router.get(route('categorias.index'), { page, search: searchValue, estado: estadoFilter }, { preserveState: true });
                        }}
                        emptyMessage="No se encontraron categorías"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
