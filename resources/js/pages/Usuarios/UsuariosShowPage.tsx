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
    role: 'administrador' | 'cliente' | 'recepcionista';
}

// Eliminamos STATIC_USERS

interface Props {
    user: User;
}

export default function UsuariosShowPage({ user }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/usuarios',
        },
        {
            title: user.name,
            href: `/usuarios/${user.id}`,
        },
    ];



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detalles - ${user.name}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href="/usuarios">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight">Detalles del Usuario</h1>
                            <p className="text-muted-foreground">
                                Información detallada del usuario
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/usuarios/${user.id}/edit`}>
                                <Button>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar Usuario
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Información Personal</CardTitle>
                                    <CardDescription>
                                        Datos registrados del usuario
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant={user.email_verified_at ? 'default' : 'destructive'}>
                                        {user.email_verified_at ? 'Email Verificado' : 'Email No Verificado'}
                                    </Badge>
                                    <Badge variant="outline" className="capitalize">
                                        {user.role}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Nombre Completo</Label>
                                    <Input value={user.name} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Username</Label>
                                    <Input value={user.username} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input value={user.email} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Teléfono</Label>
                                    <Input value={user.telefono || 'No registrado'} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Edad</Label>
                                    <Input value={user.edad?.toString() || 'No registrada'} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sexo</Label>
                                    <Input value={user.sexo === 'M' ? 'Masculino' : user.sexo === 'F' ? 'Femenino' : 'No registrado'} readOnly className="bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo de Nacionalidad</Label>
                                    <Input value={user.tipo_nacionalidad} readOnly className="capitalize bg-muted" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Rol</Label>
                                    <Input value={user.role} readOnly className="capitalize bg-muted" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
