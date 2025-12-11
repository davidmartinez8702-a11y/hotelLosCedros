import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Edit,
    Trash2,
    MoreVertical,
    Home,
    Users,
    MapPin,
    Eye,
    Calendar,
    CheckCircle,
    Clock,
    Wrench,
    Sparkles,
    Building,
    AlertTriangle,
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
}

interface Checkin {
    id: number;
    cliente: Cliente;
    fecha_entrada: string;
    fecha_salida: string;
    created_at: string;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
    capacidad_total: number;
    precio: number;
}

interface HabitacionEvento {
    id: number;
    codigo: string;
    nombre: string;
    estado: 'disponible' | 'ocupada' | 'limpieza' | 'mantenimiento' | 'bloqueada' | 'fuera_de_servicio';
    piso: string | null;
    ala_seccion: string | null;
    vista: string | null;
    notas_internas: string | null;
    requiere_mantenimiento: boolean;
    ultima_limpieza: string | null;
    tipo_habitacion: TipoHabitacion;
    checkins_activos: Checkin[];
    checkins: Checkin[];
}

interface Props {
    habitacion: HabitacionEvento;
    ocupantes_actuales: number;
    capacidad_total: number;
}

export default function HabitacionShow({ habitacion, ocupantes_actuales, capacidad_total }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Habitaciones', href: '/habitaciones' },
        { title: habitacion.codigo, href: `/habitaciones/${habitacion.id}` },
    ];

    const getEstadoBadge = (estado: string) => {
        const badges = {
            disponible: { color: 'bg-green-500', icon: CheckCircle, text: 'Disponible' },
            ocupada: { color: 'bg-red-500', icon: Home, text: 'Ocupada' },
            limpieza: { color: 'bg-yellow-500', icon: Sparkles, text: 'En Limpieza' },
            mantenimiento: { color: 'bg-orange-500', icon: Wrench, text: 'Mantenimiento' },
            bloqueada: { color: 'bg-gray-500', icon: Clock, text: 'Bloqueada' },
            fuera_de_servicio: { color: 'bg-black', icon: Building, text: 'Fuera de Servicio' },
        };

        const badge = badges[estado as keyof typeof badges] || badges.disponible;
        const Icon = badge.icon;

        return (
            <Badge className={`${badge.color} text-white flex items-center gap-2 text-lg px-4 py-2`}>
                <Icon className="h-5 w-5" />
                {badge.text}
            </Badge>
        );
    };

    const cambiarEstado = (nuevoEstado: string) => {
        if (confirm(`¿Cambiar el estado a "${nuevoEstado}"?`)) {
            router.post(`/habitaciones/${habitacion.id}/cambiar-estado`, {
                estado: nuevoEstado,
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de eliminar esta habitación? Esta acción no se puede deshacer.')) {
            router.delete(`/habitaciones/${habitacion.id}`);
        }
    };

    const formatFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Habitación ${habitacion.codigo}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-bold">{habitacion.codigo}</h1>
                                {getEstadoBadge(habitacion.estado)}
                            </div>
                            <p className="text-xl text-muted-foreground">{habitacion.nombre}</p>
                            <p className="text-sm text-gray-500">
                                {habitacion.tipo_habitacion.tipo === 'habitacion' ? '🏨 Habitación' : '🎉 Salón de Eventos'}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => router.visit(`/habitaciones/${habitacion.id}/edit`)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => cambiarEstado('disponible')}>
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                        Marcar Disponible
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => cambiarEstado('limpieza')}>
                                        <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                                        Enviar a Limpieza
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => cambiarEstado('mantenimiento')}>
                                        <Wrench className="h-4 w-4 mr-2 text-orange-500" />
                                        Enviar a Mantenimiento
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => cambiarEstado('bloqueada')}>
                                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                        Bloquear
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Eliminar Habitación
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Alertas */}
                    {habitacion.requiere_mantenimiento && (
                        <Card className="border-orange-200 bg-orange-50">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                                    <div>
                                        <p className="font-semibold text-orange-900">Requiere Mantenimiento</p>
                                        <p className="text-sm text-orange-700">Esta habitación necesita atención del equipo de mantenimiento</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid md:grid-cols-3 gap-6">
                        
                        {/* Información General */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Información General</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-600">Tipo de Habitación</p>
                                            <p className="font-semibold">{habitacion.tipo_habitacion.nombre}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-600">Capacidad</p>
                                            <p className="font-semibold">{capacidad_total} personas</p>
                                        </div>
                                    </div>

                                    {habitacion.piso && (
                                        <div className="flex items-start gap-3">
                                            <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Piso</p>
                                                <p className="font-semibold">Piso {habitacion.piso}</p>
                                            </div>
                                        </div>
                                    )}

                                    {habitacion.ala_seccion && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Ubicación</p>
                                                <p className="font-semibold">{habitacion.ala_seccion}</p>
                                            </div>
                                        </div>
                                    )}

                                    {habitacion.vista && (
                                        <div className="flex items-start gap-3">
                                            <Eye className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Vista</p>
                                                <p className="font-semibold">{habitacion.vista}</p>
                                            </div>
                                        </div>
                                    )}

                                    {habitacion.ultima_limpieza && (
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Última Limpieza</p>
                                                <p className="font-semibold">{formatFecha(habitacion.ultima_limpieza)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {habitacion.notas_internas && (
                                    <div className="pt-4 border-t">
                                        <p className="text-sm text-gray-600 mb-2">Notas Internas</p>
                                        <div className="bg-gray-50 p-3 rounded border">
                                            <p className="text-sm whitespace-pre-wrap">{habitacion.notas_internas}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Ocupación Actual */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ocupación Actual</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center mb-4">
                                    <p className="text-5xl font-bold">{ocupantes_actuales}</p>
                                    <p className="text-gray-600">de {capacidad_total} personas</p>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className={`h-4 rounded-full transition-all ${
                                            ocupantes_actuales >= capacidad_total
                                                ? 'bg-red-500'
                                                : ocupantes_actuales > 0
                                                ? 'bg-blue-500'
                                                : 'bg-gray-300'
                                        }`}
                                        style={{
                                            width: `${(ocupantes_actuales / capacidad_total) * 100}%`,
                                        }}
                                    />
                                </div>

                                {ocupantes_actuales >= capacidad_total && (
                                    <p className="text-sm text-red-600 text-center mt-2 font-semibold">
                                        ⚠️ Capacidad máxima alcanzada
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Huéspedes Actuales */}
                    {habitacion.checkins_activos && habitacion.checkins_activos.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Huéspedes Actuales ({habitacion.checkins_activos.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {habitacion.checkins_activos.map((checkin) => (
                                        <div
                                            key={checkin.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Users className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        {checkin.cliente.nombre} {checkin.cliente.apellido}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{checkin.cliente.email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Check-in</p>
                                                <p className="font-medium">{formatFecha(checkin.fecha_entrada)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Historial de Check-ins */}
                    {habitacion.checkins && habitacion.checkins.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Historial Reciente</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {habitacion.checkins.slice(0, 5).map((checkin) => {
                                        // ✅ Calcular estado dinámicamente
                                        const hoy = new Date();
                                        const entrada = new Date(checkin.fecha_entrada);
                                        const salida = new Date(checkin.fecha_salida);
                                        
                                        let estadoBadge = 'secondary';
                                        let estadoTexto = 'Completado';
                                        
                                        if (hoy >= entrada && hoy <= salida) {
                                            estadoBadge = 'default';
                                            estadoTexto = 'Activo';
                                        } else if (hoy < entrada) {
                                            estadoBadge = 'outline';
                                            estadoTexto = 'Próximo';
                                        }

                                        return (
                                            <div
                                                key={checkin.id}
                                                className="flex items-center justify-between py-3 border-b last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium">
                                                            {checkin.cliente.nombre} {checkin.cliente.apellido}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {formatFecha(checkin.fecha_entrada)} - {formatFecha(checkin.fecha_salida)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant={estadoBadge as any}>
                                                    {estadoTexto}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}