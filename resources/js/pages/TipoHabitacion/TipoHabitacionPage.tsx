import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DataTable, Column } from "@/components/shared/DataTable";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { SearchFilter } from "@/components/shared/SearchFilter";
import { Plus, Eye, Pencil } from "lucide-react";
import { route } from "ziggy-js";

// --- Interfaces ---
interface TipoHabitacion {
    id: number;
    nombre: string;
    estado: "activo" | "inactivo";
    precio: number;
    tipo: "habitacion" | "evento";
}

interface Props {
    tipoHabitaciones: {
        data: TipoHabitacion[];
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
        tipo?: string;
    };
}

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: route("dashboard") },
    { title: "Tipo de Habitaciones", href: route("tipo-habitacion.index") },
];

// Opciones de filtro
const ESTADO_OPTIONS = [
    { value: "todos", label: "Todos los estados" },
    { value: "activo", label: "Activo" },
    { value: "inactivo", label: "Inactivo" },
];

const TIPO_OPTIONS = [
    { value: "todos", label: "Todos los tipos" },
    { value: "habitacion", label: "Habitación" },
    { value: "evento", label: "Evento" },
];

// Formatear precio como moneda
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: "BOB",
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function TipoHabitacionPage({ tipoHabitaciones, filters = {} }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || "");
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || "todos");
    const [tipoFilter, setTipoFilter] = useState(filters.tipo || "todos");

    const handleSearch = (search: string, estado: string, tipo: string) => {
        router.get(
            route("tipo-habitacion.index"),
            { search, estado, tipo },
            { preserveState: true, replace: true }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== (filters.search || "")) {
                handleSearch(searchValue, estadoFilter, tipoFilter);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const handleEstadoChange = (estado: string) => {
        setEstadoFilter(estado);
        handleSearch(searchValue, estado, tipoFilter);
    };

    const handleTipoChange = (tipo: string) => {
        setTipoFilter(tipo);
        handleSearch(searchValue, estadoFilter, tipo);
    };

    const columns: Column<TipoHabitacion>[] = [
        { key: "id", label: "ID", className: "w-[80px]" },
        { key: "nombre", label: "Nombre", className: "min-w-[200px]" },
        {
            key: "estado",
            label: "Estado",
            render: (habitacion) => (
                <Badge variant={habitacion.estado === "activo" ? "default" : "secondary"}>
                    {habitacion.estado.charAt(0).toUpperCase() + habitacion.estado.slice(1)}
                </Badge>
            ),
        },
        {
            key: "precio",
            label: "Precio",
            render: (habitacion) => (
                <span className="font-medium text-green-600">
                    {formatCurrency(habitacion.precio)}
                </span>
            ),
        },
        {
            key: "tipo",
            label: "Tipo",
            render: (habitacion) => (
                <Badge variant={habitacion.tipo === "habitacion" ? "default" : "secondary"}>
                    {habitacion.tipo.charAt(0).toUpperCase() + habitacion.tipo.slice(1)}
                </Badge>
            ),
        },
        {
            key: "actions",
            label: "Acciones",
            className: "w-[100px] text-right",
            render: (habitacion) => (
                <div className="flex gap-2 justify-end">
                    <Link href={route("tipo-habitacion.show", habitacion.id)}>
                        <Button variant="ghost" size="sm" title="Ver Detalle">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route("tipo-habitacion.edit", habitacion.id)}>
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
            <Head title="Tipo de Habitaciones" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Tipo de Habitaciones</h1>
                            <p className="text-muted-foreground">
                                Administra los tipos de habitaciones disponibles.
                            </p>
                        </div>
                        <Link href={route("tipo-habitacion.create")}>
                            <Button className="w-full sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Nuevo Tipo
                            </Button>
                        </Link>
                    </div>

                    <SearchFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar por nombre..."
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

                        <Select value={tipoFilter} onValueChange={handleTipoChange}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Filtrar por tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {TIPO_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </SearchFilter>

                    <DataTable
                        columns={columns}
                        data={tipoHabitaciones.data}
                        pagination={tipoHabitaciones}
                        onPageChange={(page) => {
                            router.get(
                                route("tipo-habitacion.index"),
                                { page, search: searchValue, estado: estadoFilter, tipo: tipoFilter },
                                { preserveState: true }
                            );
                        }}
                        emptyMessage="No se encontraron tipos de habitaciones"
                    />
                </div>
            </div>
        </AppLayout>
    );
}