import React, { useState } from 'react';
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

interface UserFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    edad: string;
    sexo: string;
    telefono: string;
    tipo_nacionalidad: string;
    role: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Crear Usuario',
        href: '/usuarios/create',
    },
];

export default function UsuariosCreatePage() {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        edad: '',
        sexo: '',
        telefono: '',
        tipo_nacionalidad: 'nacional',
        role: 'cliente',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('usuarios.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href="/usuarios">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Crear Usuario</h1>
                            <p className="text-muted-foreground">
                                Completa el formulario para crear un nuevo usuario
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Usuario</CardTitle>
                            <CardDescription>
                                Todos los campos marcados con * son obligatorios
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nombre Completo <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-2">
                                        <Label htmlFor="username">
                                            Username <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="username"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            placeholder="Ej: juan_perez"
                                            required
                                        />
                                        {errors.username && (
                                            <p className="text-sm text-destructive">{errors.username}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Ej: juan@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-destructive">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Teléfono */}
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono">Teléfono</Label>
                                        <Input
                                            id="telefono"
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                            placeholder="Ej: 555-1234"
                                        />
                                        {errors.telefono && (
                                            <p className="text-sm text-destructive">{errors.telefono}</p>
                                        )}
                                    </div>

                                    {/* Edad */}
                                    <div className="space-y-2">
                                        <Label htmlFor="edad">Edad</Label>
                                        <Input
                                            id="edad"
                                            type="number"
                                            min="1"
                                            max="120"
                                            value={data.edad}
                                            onChange={(e) => setData('edad', e.target.value)}
                                            placeholder="Ej: 25"
                                        />
                                        {errors.edad && (
                                            <p className="text-sm text-destructive">{errors.edad}</p>
                                        )}
                                    </div>

                                    {/* Sexo */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sexo">Sexo</Label>
                                        <Select value={data.sexo} onValueChange={(value) => setData('sexo', value)}>
                                            <SelectTrigger id="sexo">
                                                <SelectValue placeholder="Seleccionar sexo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Masculino</SelectItem>
                                                <SelectItem value="F">Femenino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.sexo && (
                                            <p className="text-sm text-destructive">{errors.sexo}</p>
                                        )}
                                    </div>

                                    {/* Tipo Nacionalidad */}
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo_nacionalidad">
                                            Tipo de Nacionalidad <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={data.tipo_nacionalidad}
                                            onValueChange={(value) => setData('tipo_nacionalidad', value)}
                                        >
                                            <SelectTrigger id="tipo_nacionalidad">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nacional">Nacional</SelectItem>
                                                <SelectItem value="extranjero">Extranjero</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.tipo_nacionalidad && (
                                            <p className="text-sm text-destructive">{errors.tipo_nacionalidad}</p>
                                        )}
                                    </div>

                                    {/* Rol */}
                                    <div className="space-y-2">
                                        <Label htmlFor="role">
                                            Rol <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={data.role}
                                            onValueChange={(value) => setData('role', value)}
                                        >
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder="Seleccionar rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="administrador">Administrador</SelectItem>
                                                <SelectItem value="cliente">Cliente</SelectItem>
                                                <SelectItem value="recepcionista">Recepcionista</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {/* @ts-ignore */}
                                        {errors.role && (
                                            /* @ts-ignore */
                                            <p className="text-sm text-destructive">{errors.role}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Contraseña <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            required
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-destructive">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirmar Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirmar Contraseña <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            required
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-destructive">{errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href="/usuarios">
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creando...' : 'Crear Usuario'}
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