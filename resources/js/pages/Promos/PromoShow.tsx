import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    ArrowLeft, 
    Calendar, 
    Users, 
    Tag, 
    TrendingUp,
    Edit,
    Trash2,
    Pause,
    Play
} from 'lucide-react';
import { route } from 'ziggy-js';

interface Segmento {
    id: number;
    nombre: string;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
}

interface Servicio {
    id: number;
    nombre: string;
}

interface Platillo {
    id: number;
    nombre: string;
}

interface DetallePromo {
    id: number;
    tipo_item: 'habitacion' | 'servicio' | 'platillo';
    cantidad: number;
    noches: number | null;
    descuento_porcentaje: number | null;
    descuento_monto: number | null;
    precio_especial: number | null;
    es_gratis: boolean;
    detalle: string;
    tipo_habitacion: TipoHabitacion | null;
    servicio: Servicio | null;
    platillo: Platillo | null;
}

interface Promo {
    id: number;
    nombre: string;
    descripcion: string;
    codigo_promocional: string | null;
    tipo_promo: string;
    descuento_porcentaje: number | null;
    descuento_monto: number | null;
    precio_total_paquete: number | null;
    precio_normal: number | null;
    segmento: Segmento | null;
    aplica_a: string;
    estado: string;
    fecha_inicio: string;
    fecha_fin: string;
    image_url: string | null;
    minimo_noches: number;
    minimo_personas: number;
    dias_anticipacion_minimo: number;
    incluye_upgrade: boolean;
    requiere_pago_completo: boolean;
    cantidad_maxima_usos: number | null;
    usos_por_cliente: number;
    cantidad_usos_actual: number;
    prioridad: number;
    detalle_promos: DetallePromo[];
    created_at: string;
    updated_at: string;
}

interface Stats {
    total_usos: number;
    total_ahorro: number;
    clientes_unicos: number;
}

interface Props {
    promo: Promo;
    stats: Stats;
}

export default function PromoShow({ promo, stats }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Promociones', href: route('promos.index') },
        { title: promo.nombre, href: route('promos.show', promo.id) },
    ];

    const getTipoPromoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            descuento_porcentual: 'Descuento Porcentual',
            descuento_fijo: 'Descuento Fijo',
            paquete: 'Paquete',
            precio_especial: 'Precio Especial',
            upgrade: 'Upgrade',
        };
        return labels[tipo] || tipo;
    };

    const getEstadoBadge = (estado: string) => {
        const badges: Record<string, { variant: any; label: string }> = {
            activa: { variant: 'default', label: 'Activa' },
            pausada: { variant: 'secondary', label: 'Pausada' },
            finalizada: { variant: 'destructive', label: 'Finalizada' },
        };
        const badge = badges[estado] || badges.finalizada;
        return <Badge variant={badge.variant}>{badge.label}</Badge>;
    };

    const toggleEstado = () => {
        if (confirm('¿Cambiar el estado de esta promoción?')) {
            router.post(route('promos.toggle', promo.id));
        }
    };

    const eliminar = () => {
        if (confirm(`¿Eliminar la promoción "${promo.nombre}"?`)) {
            router.delete(route('promos.destroy', promo.id));
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-BO', {
            style: 'currency',
            currency: 'BOB',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const obtenerNombreItem = (detalle: DetallePromo) => {
        if (detalle.tipo_habitacion) return detalle.tipo_habitacion.nombre;
        if (detalle.servicio) return detalle.servicio.nombre;
        if (detalle.platillo) return detalle.platillo.nombre;
        return 'Item desconocido';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Promoción: ${promo.nombre}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={route('promos.index')}>
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{promo.nombre}</h1>
                                <p className="text-muted-foreground">
                                    {getTipoPromoLabel(promo.tipo_promo)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {getEstadoBadge(promo.estado)}
                            <Link href={route('promos.edit', promo.id)}>
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleEstado}
                            >
                                {promo.estado === 'activa' ? (
                                    <>
                                        <Pause className="h-4 w-4 mr-2" />
                                        Pausar
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-4 w-4 mr-2" />
                                        Activar
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={eliminar}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Imagen */}
                    {promo.image_url && (
                        <Card>
                            <CardContent className="p-0">
                                <img
                                    src={promo.image_url}
                                    alt={promo.nombre}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Grid de Información */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Estadísticas */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Estadísticas</CardTitle>
                                {(stats.total_usos === 0 && stats.total_ahorro === 0) && (
                                    <CardDescription className="text-yellow-600">
                                        Esta promoción aún no ha sido utilizada
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total de Usos</p>
                                    <p className="text-2xl font-bold">
                                        {stats.total_usos}
                                        {stats.total_usos === 0 && (
                                            <span className="text-sm text-muted-foreground ml-2">
                                                (Sin usos aún)
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ahorro Total</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(stats.total_ahorro)}
                                        {stats.total_ahorro === 0 && (
                                            <span className="text-sm text-muted-foreground ml-2">
                                                (Sin ahorros generados)
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Clientes Únicos</p>
                                    <p className="text-2xl font-bold">
                                        {stats.clientes_unicos}
                                        {stats.clientes_unicos === 0 && (
                                            <span className="text-sm text-muted-foreground ml-2">
                                                (Ningún cliente aún)
                                            </span>
                                        )}
                                    </p>
                                </div>
                                
                                {/* ✅ Mensaje informativo si no hay usos */}
                                {stats.total_usos === 0 && (
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            💡 <strong>Nota:</strong> Esta promoción comenzará a generar estadísticas 
                                            cuando los clientes realicen reservas utilizándola.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Información Básica */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Descripción</p>
                                    <p>{promo.descripcion || 'Sin descripción'}</p>
                                </div>
                                
                                {promo.codigo_promocional && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Código</p>
                                        <Badge variant="outline" className="text-lg font-mono">
                                            {promo.codigo_promocional}
                                        </Badge>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vigencia</p>
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(promo.fecha_inicio).toLocaleDateString()} - {new Date(promo.fecha_fin).toLocaleDateString()}
                                    </p>
                                </div>

                                {promo.segmento && (
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Segmento</p>
                                        <Badge>{promo.segmento.nombre}</Badge>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Aplica a</p>
                                    <p className="capitalize">{promo.aplica_a}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Prioridad</p>
                                    <p>{promo.prioridad}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Descuento/Precio */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Beneficio</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {promo.descuento_porcentaje && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Descuento</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {promo.descuento_porcentaje}%
                                    </p>
                                </div>
                            )}
                            
                            {promo.descuento_monto && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Descuento Fijo</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {formatCurrency(promo.descuento_monto)}
                                    </p>
                                </div>
                            )}

                            {promo.precio_total_paquete && (
                                <>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Precio Paquete</p>
                                        <p className="text-3xl font-bold text-blue-600">
                                            {formatCurrency(promo.precio_total_paquete)}
                                        </p>
                                    </div>
                                    {promo.precio_normal && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Precio Normal</p>
                                            <p className="text-2xl font-medium text-gray-500 line-through">
                                                {formatCurrency(promo.precio_normal)}
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Condiciones */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Condiciones</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Mínimo de Noches</p>
                                <p className="font-semibold">{promo.minimo_noches}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Mínimo de Personas</p>
                                <p className="font-semibold">{promo.minimo_personas}</p>
                            </div>
                            {promo.dias_anticipacion_minimo > 0 && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Días de Anticipación</p>
                                    <p className="font-semibold">{promo.dias_anticipacion_minimo}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground">Usos por Cliente</p>
                                <p className="font-semibold">{promo.usos_por_cliente}</p>
                            </div>
                            {promo.cantidad_maxima_usos && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Usos Máximos</p>
                                    <p className="font-semibold">
                                        {promo.cantidad_usos_actual} / {promo.cantidad_maxima_usos}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-muted-foreground">Incluye Upgrade</p>
                                <Badge variant={promo.incluye_upgrade ? 'default' : 'secondary'}>
                                    {promo.incluye_upgrade ? 'Sí' : 'No'}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Requiere Pago Completo</p>
                                <Badge variant={promo.requiere_pago_completo ? 'default' : 'secondary'}>
                                    {promo.requiere_pago_completo ? 'Sí' : 'No'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detalles de la Promoción */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Items Incluidos</CardTitle>
                            <CardDescription>
                                {promo.detalle_promos.length} item(s) en esta promoción
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {promo.detalle_promos.map((detalle, index) => (
                                    <div
                                        key={detalle.id}
                                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">
                                                        {detalle.tipo_item.toUpperCase()}
                                                    </Badge>
                                                    <h4 className="font-semibold">
                                                        {obtenerNombreItem(detalle)}
                                                    </h4>
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">Cantidad:</span>
                                                        <span className="ml-2 font-medium">{detalle.cantidad}</span>
                                                    </div>
                                                    
                                                    {detalle.noches && (
                                                        <div>
                                                            <span className="text-muted-foreground">Noches:</span>
                                                            <span className="ml-2 font-medium">{detalle.noches}</span>
                                                        </div>
                                                    )}

                                                    {detalle.descuento_porcentaje && (
                                                        <div>
                                                            <span className="text-muted-foreground">Descuento:</span>
                                                            <span className="ml-2 font-medium text-green-600">
                                                                {detalle.descuento_porcentaje}%
                                                            </span>
                                                        </div>
                                                    )}

                                                    {detalle.descuento_monto && (
                                                        <div>
                                                            <span className="text-muted-foreground">Descuento:</span>
                                                            <span className="ml-2 font-medium text-green-600">
                                                                {formatCurrency(detalle.descuento_monto)}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {detalle.precio_especial && (
                                                        <div>
                                                            <span className="text-muted-foreground">Precio:</span>
                                                            <span className="ml-2 font-medium text-blue-600">
                                                                {formatCurrency(detalle.precio_especial)}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {detalle.es_gratis && (
                                                        <div>
                                                            <Badge variant="default" className="bg-green-600">
                                                                GRATIS
                                                            </Badge>
                                                        </div>
                                                    )}
                                                </div>

                                                {detalle.detalle && (
                                                    <p className="text-sm text-muted-foreground mt-2">
                                                        {detalle.detalle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadatos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Sistema</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Creado</p>
                                <p>{new Date(promo.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Última Actualización</p>
                                <p>{new Date(promo.updated_at).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}