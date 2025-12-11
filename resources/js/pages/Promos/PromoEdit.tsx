import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // ✅ CORREGIDO
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'; // ✅ CORREGIDO
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
    Plus, 
    Trash2,
    ArrowLeft,
    AlertCircle,
    Save,
} from 'lucide-react';

interface Segmento {
    id: number;
    nombre: string;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    precio: number;
}

interface Servicio {
    id: number;
    nombre: string;
    precio: number;
}

interface Platillo {
    id: number;
    nombre: string;
    precio: number;
}

interface DetallePromo {
    id?: number;
    tipo_item: 'habitacion' | 'servicio' | 'platillo';
    tipo_habitacion_id: number | null;
    servicio_id: number | null;
    platillo_id: number | null;
    cantidad: number;
    noches: number | null;
    descuento_porcentaje: number | null;
    descuento_monto: number | null;
    precio_especial: number | null;
    es_gratis: boolean;
    detalle: string;
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
    segmento_id: number | null;
    aplica_a: string;
    estado: string;
    fecha_inicio: string;
    fecha_fin: string;
    image_url: string | null;
    stock: number | null;
    minimo_noches: number;
    minimo_personas: number;
    dias_anticipacion_minimo: number;
    dias_desde_ultima_visita: number | null;
    dias_semana: string[];
    incluye_upgrade: boolean;
    requiere_pago_completo: boolean;
    cantidad_maxima_usos: number | null;
    usos_por_cliente: number;
    prioridad: number;
    detalle_promos: DetallePromo[];
}

interface Props {
    promo: Promo;
    segmentos: Segmento[];
    tiposHabitacion: TipoHabitacion[];
    servicios: Servicio[];
    platillos: Platillo[];
}

interface Detalle {
    tipo_item: 'habitacion' | 'servicio' | 'platillo';
    item_id: number;
    cantidad: number;
    noches: number; // ✅ Remover | null
    descuento_porcentaje: number; // ✅ Remover | null
    descuento_monto: number; // ✅ Remover | null
    precio_especial: number; // ✅ Remover | null
    es_gratis: boolean;
    detalle: string;
}

export default function PromoEdit({ promo, segmentos, tiposHabitacion, servicios, platillos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Promociones', href: '/promos' },
        { title: 'Editar', href: `/promos/${promo.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        codigo_promocional: promo.codigo_promocional || '',
        tipo_promo: promo.tipo_promo,
        descuento_porcentaje: promo.descuento_porcentaje || 0,
        descuento_monto: promo.descuento_monto || 0,
        precio_total_paquete: promo.precio_total_paquete || 0,
        precio_normal: promo.precio_normal || 0,
        segmento_id: promo.segmento_id || 0,
        aplica_a: promo.aplica_a,
        estado: promo.estado,
        fecha_inicio: promo.fecha_inicio,
        fecha_fin: promo.fecha_fin,
        image_url: promo.image_url || '',
        stock: promo.stock || 0,
        minimo_noches: promo.minimo_noches,
        minimo_personas: promo.minimo_personas,
        dias_anticipacion_minimo: promo.dias_anticipacion_minimo,
        dias_desde_ultima_visita: promo.dias_desde_ultima_visita || 0,
        dias_semana: promo.dias_semana || [],
        incluye_upgrade: promo.incluye_upgrade,
        requiere_pago_completo: promo.requiere_pago_completo,
        cantidad_maxima_usos: promo.cantidad_maxima_usos || 0,
        usos_por_cliente: promo.usos_por_cliente,
        prioridad: promo.prioridad,
        detalles: promo.detalle_promos.map((d) => ({
            tipo_item: d.tipo_item,
            item_id: d.tipo_habitacion_id || d.servicio_id || d.platillo_id || 0,
            cantidad: d.cantidad,
            noches: d.noches || 1, // ✅ Ya está bien, asegura un valor por defecto
            descuento_porcentaje: d.descuento_porcentaje || 0, // ✅ Ya está bien
            descuento_monto: d.descuento_monto || 0, // ✅ Ya está bien
            precio_especial: d.precio_especial || 0, // ✅ Ya está bien
            es_gratis: d.es_gratis,
            detalle: d.detalle || '',
        })),
    });

    const [detalles, setDetalles] = useState<Detalle[]>(
        promo.detalle_promos.map((d) => ({
            tipo_item: d.tipo_item,
            item_id: d.tipo_habitacion_id || d.servicio_id || d.platillo_id || 0,
            cantidad: d.cantidad,
            noches: d.noches || 1, // ✅ Asegura que nunca sea null
            descuento_porcentaje: d.descuento_porcentaje || 0,
            descuento_monto: d.descuento_monto || 0,
            precio_especial: d.precio_especial || 0,
            es_gratis: d.es_gratis,
            detalle: d.detalle || '',
        }))
    );

    const diasSemanaOpciones = [
        { value: 'lunes', label: 'Lunes' },
        { value: 'martes', label: 'Martes' },
        { value: 'miercoles', label: 'Miércoles' },
        { value: 'jueves', label: 'Jueves' },
        { value: 'viernes', label: 'Viernes' },
        { value: 'sabado', label: 'Sábado' },
        { value: 'domingo', label: 'Domingo' },
    ];

    const agregarDetalle = () => {
        setDetalles([
            ...detalles,
            {
                tipo_item: 'habitacion',
                item_id: 0,
                cantidad: 1,
                noches: 1, // ✅ Ya no es nullable
                descuento_porcentaje: 0,
                descuento_monto: 0,
                precio_especial: 0,
                es_gratis: false,
                detalle: '',
            },
        ]);
    };

    const eliminarDetalle = (index: number) => {
        const nuevosDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(nuevosDetalles);
        setData('detalles', nuevosDetalles);
    };

    const actualizarDetalle = (index: number, campo: keyof Detalle, valor: any) => {
        const nuevosDetalles = [...detalles];
        nuevosDetalles[index] = { ...nuevosDetalles[index], [campo]: valor };
        
        // Si cambia el tipo de item, resetear item_id
        if (campo === 'tipo_item') {
            nuevosDetalles[index].item_id = 0;
            // ✅ Si cambia a servicio/platillo, resetear noches a 0
            if (valor !== 'habitacion') {
                nuevosDetalles[index].noches = 0;
            } else {
                nuevosDetalles[index].noches = 1;
            }
        }
        
        setDetalles(nuevosDetalles);
        setData('detalles', nuevosDetalles);
    };

    const toggleDiaSemana = (dia: string) => {
        const nuevosDias = data.dias_semana.includes(dia)
            ? data.dias_semana.filter((d) => d !== dia)
            : [...data.dias_semana, dia];
        setData('dias_semana', nuevosDias);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setData('detalles', detalles);
        put(`/promos/${promo.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/promos');
            },
        });
    };

    const obtenerItemsDisponibles = (tipo: string) => {
        switch (tipo) {
            case 'habitacion':
                return tiposHabitacion;
            case 'servicio':
                return servicios;
            case 'platillo':
                return platillos;
            default:
                return [];
        }
    };

    const obtenerNombreItem = (detalle: Detalle) => {
        const items = obtenerItemsDisponibles(detalle.tipo_item);
        const item = items.find((i) => i.id === detalle.item_id);
        return item ? item.nombre : 'Seleccionar...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${promo.nombre}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.visit('/promos')}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Editar Promoción
                                </h1>
                                <p className="text-muted-foreground">
                                    Actualiza los datos de {promo.nombre}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Información Básica */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                                <CardDescription>
                                    Datos generales de la promoción
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">
                                            Nombre <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            placeholder="Ej: Verano 2024"
                                        />
                                        {errors.nombre && (
                                            <p className="text-sm text-red-600">{errors.nombre}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="codigo_promocional">Código Promocional</Label>
                                        <Input
                                            id="codigo_promocional"
                                            value={data.codigo_promocional}
                                            onChange={(e) => setData('codigo_promocional', e.target.value)}
                                            placeholder="Ej: VERANO2024"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                        id="descripcion"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        rows={3}
                                        placeholder="Describe los beneficios de la promoción"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo_promo">
                                            Tipo de Promoción <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.tipo_promo}
                                            onValueChange={(value) => setData('tipo_promo', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="descuento_porcentual">Descuento %</SelectItem>
                                                <SelectItem value="descuento_fijo">Descuento Fijo</SelectItem>
                                                <SelectItem value="paquete">Paquete</SelectItem>
                                                <SelectItem value="precio_especial">Precio Especial</SelectItem>
                                                <SelectItem value="upgrade">Upgrade</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="segmento_id">Segmento</Label>
                                        <Select
                                            value={data.segmento_id?.toString() || '0'}
                                            onValueChange={(value) => setData('segmento_id', parseInt(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Todos</SelectItem>
                                                {segmentos.map((seg) => (
                                                    <SelectItem key={seg.id} value={seg.id.toString()}>
                                                        {seg.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="estado">Estado</Label>
                                        <Select
                                            value={data.estado}
                                            onValueChange={(value) => setData('estado', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activa">Activa</SelectItem>
                                                <SelectItem value="pausada">Pausada</SelectItem>
                                                <SelectItem value="finalizada">Finalizada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Descuentos */}
                        {(data.tipo_promo === 'descuento_porcentual' || data.tipo_promo === 'descuento_fijo') && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Descuento</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {data.tipo_promo === 'descuento_porcentual' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="descuento_porcentaje">
                                                    Porcentaje de Descuento (%)
                                                </Label>
                                                <Input
                                                    id="descuento_porcentaje"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={data.descuento_porcentaje || ''}
                                                    onChange={(e) => setData('descuento_porcentaje', parseFloat(e.target.value))}
                                                />
                                            </div>
                                        )}

                                        {data.tipo_promo === 'descuento_fijo' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="descuento_monto">
                                                    Monto de Descuento (Bs.)
                                                </Label>
                                                <Input
                                                    id="descuento_monto"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={data.descuento_monto || ''}
                                                    onChange={(e) => setData('descuento_monto', parseFloat(e.target.value))}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Paquete */}
                        {data.tipo_promo === 'paquete' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Precio del Paquete</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="precio_total_paquete">
                                                Precio Total del Paquete (Bs.)
                                            </Label>
                                            <Input
                                                id="precio_total_paquete"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.precio_total_paquete || ''}
                                                onChange={(e) => setData('precio_total_paquete', parseFloat(e.target.value))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="precio_normal">Precio Normal (Bs.)</Label>
                                            <Input
                                                id="precio_normal"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.precio_normal || ''}
                                                onChange={(e) => setData('precio_normal', parseFloat(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Vigencia */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Vigencia</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fecha_inicio">
                                            Fecha de Inicio <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="fecha_inicio"
                                            type="date"
                                            value={data.fecha_inicio}
                                            onChange={(e) => setData('fecha_inicio', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fecha_fin">
                                            Fecha de Fin <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="fecha_fin"
                                            type="date"
                                            value={data.fecha_fin}
                                            onChange={(e) => setData('fecha_fin', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Días de la Semana Aplicables</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {diasSemanaOpciones.map((dia) => (
                                            <label
                                                key={dia.value}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Checkbox
                                                    checked={data.dias_semana.includes(dia.value)}
                                                    onCheckedChange={() => toggleDiaSemana(dia.value)}
                                                />
                                                <span className="text-sm">{dia.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Condiciones */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Condiciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="minimo_noches">Mínimo de Noches</Label>
                                        <Input
                                            id="minimo_noches"
                                            type="number"
                                            min="1"
                                            value={data.minimo_noches}
                                            onChange={(e) => setData('minimo_noches', parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="minimo_personas">Mínimo de Personas</Label>
                                        <Input
                                            id="minimo_personas"
                                            type="number"
                                            min="1"
                                            value={data.minimo_personas}
                                            onChange={(e) => setData('minimo_personas', parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dias_anticipacion_minimo">Días de Anticipación</Label>
                                        <Input
                                            id="dias_anticipacion_minimo"
                                            type="number"
                                            min="0"
                                            value={data.dias_anticipacion_minimo}
                                            onChange={(e) => setData('dias_anticipacion_minimo', parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_maxima_usos">Usos Máximos</Label>
                                        <Input
                                            id="cantidad_maxima_usos"
                                            type="number"
                                            min="0"
                                            value={data.cantidad_maxima_usos || ''}
                                            onChange={(e) => setData('cantidad_maxima_usos', parseInt(e.target.value))}
                                            placeholder="Ilimitado"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="usos_por_cliente">Usos por Cliente</Label>
                                        <Input
                                            id="usos_por_cliente"
                                            type="number"
                                            min="1"
                                            value={data.usos_por_cliente}
                                            onChange={(e) => setData('usos_por_cliente', parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="prioridad">Prioridad</Label>
                                        <Input
                                            id="prioridad"
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={data.prioridad}
                                            onChange={(e) => setData('prioridad', parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={data.incluye_upgrade}
                                            onCheckedChange={(checked) => setData('incluye_upgrade', checked as boolean)}
                                        />
                                        <span className="text-sm">Incluye Upgrade</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <Checkbox
                                            checked={data.requiere_pago_completo}
                                            onCheckedChange={(checked) => setData('requiere_pago_completo', checked as boolean)}
                                        />
                                        <span className="text-sm">Requiere Pago Completo</span>
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detalles de Items */}
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Items Incluidos</CardTitle>
                                        <CardDescription>
                                            Habitaciones, servicios o platillos que incluye la promoción
                                        </CardDescription>
                                    </div>
                                    <Button type="button" onClick={agregarDetalle} size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Agregar Item
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {detalles.length === 0 ? (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            No hay items agregados. Haz clic en "Agregar Item" para comenzar.
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <div className="space-y-4">
                                        {detalles.map((detalle, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <Badge>Item #{index + 1}</Badge>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => eliminarDetalle(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Tipo de Item</Label>
                                                        <Select
                                                            value={detalle.tipo_item}
                                                            onValueChange={(value) =>
                                                                actualizarDetalle(index, 'tipo_item', value)
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="habitacion">Habitación</SelectItem>
                                                                <SelectItem value="servicio">Servicio</SelectItem>
                                                                <SelectItem value="platillo">Platillo</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Item</Label>
                                                        <Select
                                                            value={detalle.item_id.toString()}
                                                            onValueChange={(value) =>
                                                                actualizarDetalle(index, 'item_id', parseInt(value))
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccionar..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {obtenerItemsDisponibles(detalle.tipo_item).map((item) => (
                                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                                        {item.nombre}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Cantidad</Label>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={detalle.cantidad}
                                                            onChange={(e) =>
                                                                actualizarDetalle(
                                                                    index,
                                                                    'cantidad',
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {detalle.tipo_item === 'habitacion' && (
                                                    <div className="space-y-2">
                                                        <Label>Noches</Label>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={detalle.noches || 1} // ✅ Asegura valor por defecto en UI
                                                            onChange={(e) =>
                                                                actualizarDetalle(
                                                                    index,
                                                                    'noches',
                                                                    parseInt(e.target.value) || 1 // ✅ Asegura que nunca sea NaN o null
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <Label>Detalle Adicional</Label>
                                                    <Textarea
                                                        value={detalle.detalle}
                                                        onChange={(e) =>
                                                            actualizarDetalle(index, 'detalle', e.target.value)
                                                        }
                                                        rows={2}
                                                        placeholder="Ej: Vista al mar, desayuno incluido..."
                                                    />
                                                </div>

                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <Checkbox
                                                        checked={detalle.es_gratis}
                                                        onCheckedChange={(checked) =>
                                                            actualizarDetalle(index, 'es_gratis', checked)
                                                        }
                                                    />
                                                    <span className="text-sm">Este item es GRATIS</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Imagen */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Imagen</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="image_url">URL de Imagen</Label>
                                    <Input
                                        id="image_url"
                                        type="url"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>

                                {data.image_url && (
                                    <div className="mt-4">
                                        <img
                                            src={data.image_url}
                                            alt="Preview"
                                            className="w-full max-w-md h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/promos')}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? (
                                    'Actualizando...'
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Actualizar Promoción
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}