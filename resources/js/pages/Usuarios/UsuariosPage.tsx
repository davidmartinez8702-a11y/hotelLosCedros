import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
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
import { SearchFilter, FilterOption } from '@/components/shared/SearchFilter';
import { Plus, Eye } from 'lucide-react';
import { route } from 'ziggy-js';

// Tipo de usuario basado en el modelo User
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    edad: number | null;
    sexo: 'M' | 'F' | null;
    telefono: string | null;
    tipo_nacionalidad: string;
    email_verified_at: string | null;
    created_at: string;
    role: 'administrador' | 'cliente' | 'recepcionista';
}

// Datos estáticos de ejemplo
// Eliminamos STATIC_USERS ya que usaremos datos del backend

const FILTER_OPTIONS: FilterOption[] = [
    { value: 'username', label: 'Username' },
    { value: 'email', label: 'Email' },
];

const ROLE_OPTIONS: FilterOption[] = [
    { value: 'todos', label: 'Todos los roles' },
    { value: 'administrador', label: 'Administradores' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'recepcionista', label: 'Recepcionistas' },
];

const ITEMS_PER_PAGE = 5;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

import { router } from '@inertiajs/react';

interface Props {
    usuariosPaginados: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters?: {
        search?: string;
        role?: string;
    };
}

export default function UsuariosPage({ usuariosPaginados, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || 'todos');
    const [filterBy, setFilterBy] = useState<'username' | 'email'>('username'); // Solo visual por ahora

    // Función para manejar la búsqueda y filtrado en el servidor
    const handleSearch = (search: string, role: string) => {
        router.get(
            route('usuarios.index'),
            { search, role },
            { preserveState: true, replace: true }
        );
    };

    // Efecto para debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                handleSearch(searchValue, roleFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Manejar cambio de rol
    const handleRoleChange = (role: string) => {
        setRoleFilter(role);
        handleSearch(searchValue, role);
    };

    // Eliminamos lógica de filtrado local y paginación local




    const columns: Column<User>[] = [
        {
            key: 'id',
            label: 'ID',
            className: 'w-[60px]',
        },
        {
            key: 'name',
            label: 'Nombre',
        },
        {
            key: 'username',
            label: 'Username',
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'telefono',
            label: 'Teléfono',
            render: (user) => user.telefono || '—',
        },
        {
            key: 'tipo_nacionalidad',
            label: 'Nacionalidad',
            render: (user) => (
                <Badge variant={user.tipo_nacionalidad === 'nacional' ? 'default' : 'secondary'}>
                    {user.tipo_nacionalidad}
                </Badge>
            ),
        },
        {
            key: 'email_verified_at',
            label: 'Verificado',
            render: (user) => (
                <Badge variant={user.email_verified_at ? 'default' : 'destructive'}>
                    {user.email_verified_at ? 'Sí' : 'No'}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Acciones',
            className: 'w-[100px]',
            render: (user) => (
                <Link href={`/usuarios/${user.id}`}>
                    <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
                            <p className="text-muted-foreground">
                                Gestiona los usuarios del sistema
                            </p>
                        </div>
                        <Link href="/usuarios/create">
                            <Button>
                                <Plus className="h-4 w-4" />
                                Nuevo Usuario
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <SearchFilter
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            filterValue={filterBy}
                            onFilterChange={(value) => setFilterBy(value as 'username' | 'email')}
                            filterOptions={FILTER_OPTIONS}
                            searchPlaceholder="Buscar..."
                            filterPlaceholder="Buscar por..."
                        />

                        <Select value={roleFilter} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Filtrar por rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DataTable
                        columns={columns}
                        data={usuariosPaginados.data}
                        pagination={usuariosPaginados}
                        onPageChange={(page) => {
                            router.get(route('usuarios.index'), { page, search: searchValue, role: roleFilter }, { preserveState: true });
                        }}
                        emptyMessage="No se encontraron usuarios"
                    />
                </div>
            </div>
        </AppLayout>
    );
}