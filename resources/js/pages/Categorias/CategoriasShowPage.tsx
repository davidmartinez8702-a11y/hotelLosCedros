import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { route } from 'ziggy-js';

interface Categoria {
    id: number;
    nombre: string;
    estado: 'activo' | 'inactivo';
    created_at?: string;
    updated_at?: string;
}

interface Props {
    categoria: Categoria;
}

export default function CategoriasShowPage({ categoria }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Categorías',
            href: '/categorias',
        },
        {
            title: categoria.nombre,
            href: `/categorias/${categoria.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detalles - ${categoria.nombre}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href={route('categorias.index')}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight">Detalles de Categoría</h1>
                            <p className="text-muted-foreground">
                                Información detallada de la categoría
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('categorias.edit', categoria.id)}>
                                <Button>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar Categoría
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Información General</CardTitle>
                                    <CardDescription>
                                        Datos registrados de la categoría
                                    </CardDescription>
                                </div>
                                <Badge variant={categoria.estado === 'activo' ? 'default' : 'secondary'} className="capitalize">
                                    {categoria.estado}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Nombre</Label>
                                    <Input value={categoria.nombre} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Estado</Label>
                                    <Input value={categoria.estado === 'activo' ? 'Activo' : 'Inactivo'} readOnly className="bg-muted" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
