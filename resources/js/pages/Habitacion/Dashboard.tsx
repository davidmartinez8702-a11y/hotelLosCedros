import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Home,
    CheckCircle,
    Clock,
    Wrench,
    Sparkles,
    Building,
    AlertTriangle,
    TrendingUp,
    Users,
    Eye,
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
}

interface HabitacionEvento {
    id: number;
    codigo: string;
    nombre: string;
    estado: string;
    piso: string | null;
    orden_limpieza: number | null;
    notas_internas: string | null;
    tipo_habitacion: TipoHabitacion;
}

interface Estadisticas {
    total: number;
    disponibles: number;
    ocupadas: number;
    limpieza: number;
    mantenimiento: number;
}

interface Props {
    estadisticas: Estadisticas;
    habitacionesLimpieza: HabitacionEvento[];
    habitacionesMantenimiento: HabitacionEvento[];
}

export default function Dashboard({ estadisticas, habitacionesLimpieza, habitacionesMantenimiento }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Habitaciones', href: '/habitaciones' },
        { title: 'Dashboard', href: '/habitaciones-dashboard' },
    ];

    // Calcular porcentajes
    const porcentajeOcupacion = estadisticas.total > 0 
        ? ((estadisticas.ocupadas / estadisticas.total) * 100).toFixed(1)
        : '0';

    const porcentajeDisponibles = estadisticas.total > 0
        ? ((estadisticas.disponibles / estadisticas.total) * 100).toFixed(1)
        : '0';

    const cambiarEstado = (habitacionId: number, nuevoEstado: string) => {
        if (confirm(`¿Marcar habitación como "${nuevoEstado}"?`)) {
            router.post(`/habitaciones/${habitacionId}/cambiar-estado`, {
                estado: nuevoEstado,
            }, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard de Habitaciones" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dashboard de Habitaciones</h1>
                            <p className="text-muted-foreground">Vista general del estado de las habitaciones</p>
                        </div>
                        <Button onClick={() => router.visit('/habitaciones')}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Todas
                        </Button>
                    </div>

                    {/* Estadísticas Principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Total */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    Total
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">{estadisticas.total}</p>
                                <p className="text-xs text-gray-500 mt-1">Habitaciones registradas</p>
                            </CardContent>
                        </Card>

                        {/* Disponibles */}
                        <Card className="border-green-200 bg-green-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Disponibles
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-green-700">{estadisticas.disponibles}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 bg-green-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: `${porcentajeDisponibles}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-green-700">{porcentajeDisponibles}%</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ocupadas */}
                        <Card className="border-red-200 bg-red-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
                                    <Home className="h-4 w-4" />
                                    Ocupadas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-red-700">{estadisticas.ocupadas}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 bg-red-200 rounded-full h-2">
                                        <div
                                            className="bg-red-600 h-2 rounded-full"
                                            style={{ width: `${porcentajeOcupacion}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-red-700">{porcentajeOcupacion}%</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Limpieza */}
                        <Card className="border-yellow-200 bg-yellow-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-yellow-700 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    En Limpieza
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-yellow-700">{estadisticas.limpieza}</p>
                                {estadisticas.limpieza > 0 && (
                                    <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Pendientes de limpieza
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Mantenimiento */}
                        <Card className="border-orange-200 bg-orange-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                                    <Wrench className="h-4 w-4" />
                                    Mantenimiento
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-orange-700">{estadisticas.mantenimiento}</p>
                                {estadisticas.mantenimiento > 0 && (
                                    <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" />
                                        Requieren atención
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Gráfico de Ocupación */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Tasa de Ocupación
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="h-64 flex items-end justify-center gap-4">
                                    {/* Barra Disponibles */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-20 bg-green-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${(estadisticas.disponibles / estadisticas.total) * 100}%` }}
                                        />
                                        <p className="text-sm font-semibold mt-2">Disponibles</p>
                                        <p className="text-2xl font-bold text-green-600">{estadisticas.disponibles}</p>
                                    </div>

                                    {/* Barra Ocupadas */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-20 bg-red-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${(estadisticas.ocupadas / estadisticas.total) * 100}%` }}
                                        />
                                        <p className="text-sm font-semibold mt-2">Ocupadas</p>
                                        <p className="text-2xl font-bold text-red-600">{estadisticas.ocupadas}</p>
                                    </div>

                                    {/* Barra Limpieza */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-20 bg-yellow-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${(estadisticas.limpieza / estadisticas.total) * 100}%` }}
                                        />
                                        <p className="text-sm font-semibold mt-2">Limpieza</p>
                                        <p className="text-2xl font-bold text-yellow-600">{estadisticas.limpieza}</p>
                                    </div>

                                    {/* Barra Mantenimiento */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-20 bg-orange-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${(estadisticas.mantenimiento / estadisticas.total) * 100}%` }}
                                        />
                                        <p className="text-sm font-semibold mt-2">Mantenimiento</p>
                                        <p className="text-2xl font-bold text-orange-600">{estadisticas.mantenimiento}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Cola de Limpieza */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-yellow-500" />
                                        Cola de Limpieza
                                    </span>
                                    <Badge variant="secondary">{habitacionesLimpieza.length}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {habitacionesLimpieza.length === 0 ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                        <p className="text-gray-600">No hay habitaciones pendientes de limpieza</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {habitacionesLimpieza.map((habitacion) => (
                                            <div
                                                key={habitacion.id}
                                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-lg">{habitacion.codigo}</p>
                                                        <Badge variant="outline" className="text-xs">
                                                            #{habitacion.orden_limpieza}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{habitacion.nombre}</p>
                                                    {habitacion.piso && (
                                                        <p className="text-xs text-gray-500">Piso {habitacion.piso}</p>
                                                    )}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => cambiarEstado(habitacion.id, 'disponible')}
                                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Completar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Mantenimiento Requerido */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Wrench className="h-5 w-5 text-orange-500" />
                                        Requieren Mantenimiento
                                    </span>
                                    <Badge variant="secondary">{habitacionesMantenimiento.length}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {habitacionesMantenimiento.length === 0 ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                        <p className="text-gray-600">No hay habitaciones que requieran mantenimiento</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {habitacionesMantenimiento.map((habitacion) => (
                                            <div
                                                key={habitacion.id}
                                                className="p-3 border border-orange-200 bg-orange-50 rounded-lg"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="font-bold text-lg">{habitacion.codigo}</p>
                                                            <Badge className="bg-orange-500 text-white">
                                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                                Urgente
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{habitacion.nombre}</p>
                                                        {habitacion.piso && (
                                                            <p className="text-xs text-gray-600">Piso {habitacion.piso}</p>
                                                        )}
                                                        {habitacion.notas_internas && (
                                                            <div className="mt-2 p-2 bg-white rounded border text-xs">
                                                                {habitacion.notas_internas.split('\n').slice(-1)[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.visit(`/habitaciones/${habitacion.id}`)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                    </div>

                    {/* Acciones Rápidas */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-4 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() => router.visit('/habitaciones?estado=disponible')}
                                >
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                    <span className="font-semibold">Ver Disponibles</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() => router.visit('/habitaciones?estado=ocupada')}
                                >
                                    <Home className="h-8 w-8 text-red-500" />
                                    <span className="font-semibold">Ver Ocupadas</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() => router.visit('/habitaciones?estado=limpieza')}
                                >
                                    <Sparkles className="h-8 w-8 text-yellow-500" />
                                    <span className="font-semibold">Gestionar Limpieza</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col items-center justify-center gap-2"
                                    onClick={() => router.visit('/habitaciones?estado=mantenimiento')}
                                >
                                    <Wrench className="h-8 w-8 text-orange-500" />
                                    <span className="font-semibold">Gestionar Mantenimiento</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AppLayout>
    );
}