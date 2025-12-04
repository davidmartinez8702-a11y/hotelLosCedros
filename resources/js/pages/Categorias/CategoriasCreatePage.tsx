import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';

interface CategoriaFormData {
    nombre: string;
    estado: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
    {
        title: 'Crear Categoría',
        href: '/categorias/create',
    },
];

export default function CategoriasCreatePage() {
    const { data, setData, post, processing, errors } = useForm<CategoriaFormData>({
        nombre: '',
        estado: 'activo',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categorias.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Categoría" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href={route('categorias.index')}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Crear Categoría</h1>
                            <p className="text-muted-foreground">
                                Completa el formulario para crear una nueva categoría
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la Categoría</CardTitle>
                            <CardDescription>
                                Todos los campos marcados con * son obligatorios
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">
                                            Nombre <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            placeholder="Ej: Bebidas"
                                            required
                                        />
                                        {errors.nombre && (
                                            <p className="text-sm text-destructive">{errors.nombre}</p>
                                        )}
                                    </div>

                                    {/* Estado */}
                                    <div className="space-y-2">
                                        <Label htmlFor="estado">
                                            Estado <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={data.estado}
                                            onValueChange={(value) => setData('estado', value)}
                                        >
                                            <SelectTrigger id="estado">
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activo">Activo</SelectItem>
                                                <SelectItem value="inactivo">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.estado && (
                                            <p className="text-sm text-destructive">{errors.estado}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('categorias.index')}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creando...' : 'Crear Categoría'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
