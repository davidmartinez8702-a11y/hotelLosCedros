import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
    Plus, 
    Trash2,
    ArrowLeft,
    AlertCircle,
    X,
} from 'lucide-react';

interface Segmento {
    id: number;
    nombre: string;
    descripcion?: string;
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

interface Detalle {
    tipo_item: 'habitacion' | 'servicio' | 'platillo';
    item_id: number;
    cantidad: number;
    noches: number | null;
    descuento_porcentaje: number | null;
    descuento_monto: number | null;
    precio_especial: number | null;
    es_gratis: boolean;
    detalle: string;
}

interface Props {
    segmentos: Segmento[];
    tiposHabitacion: TipoHabitacion[];
    servicios: Servicio[];
    platillos: Platillo[];
}

export default function PromoCreate({ segmentos, tiposHabitacion, servicios, platillos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Promociones', href: '/promos' },
        { title: 'Crear', href: '/promos/create' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        codigo_promocional: '',
        tipo_promo: 'descuento_porcentual' as 'descuento_porcentual' | 'descuento_fijo' | 'paquete' | 'precio_especial' | 'upgrade',
        descuento_porcentaje: null as number | null,
        descuento_monto: null as number | null,
        precio_total_paquete: null as number | null,
        precio_normal: null as number | null,
        segmentos_ids: [] as number[],
        aplica_todos_segmentos: true,
        aplica_a: 'todos' as 'todos' | 'nuevos' | 'registrados',
        estado: 'activa' as 'activa' | 'pausada' | 'finalizada',
        fecha_inicio: '',
        fecha_fin: '',
        image_url: '',
        stock: null as number | null,
        minimo_noches: 1,
        minimo_personas: 1,
        dias_anticipacion_minimo: 0,
        dias_desde_ultima_visita: null as number | null,
        dias_semana: [] as string[],
        incluye_upgrade: false,
        requiere_pago_completo: false,
        cantidad_maxima_usos: null as number | null,
        usos_por_cliente: 1,
        prioridad: 5,
        detalles: [] as Detalle[],
    });

    const [tipoItemSeleccionado, setTipoItemSeleccionado] = useState<'habitacion' | 'servicio' | 'platillo'>('habitacion');
    const [busquedaSegmento, setBusquedaSegmento] = useState('');

    const diasSemanaOpciones = [
        { value: 'lunes', label: 'Lunes' },
        { value: 'martes', label: 'Martes' },
        { value: 'miercoles', label: 'Miércoles' },
        { value: 'jueves', label: 'Jueves' },
        { value: 'viernes', label: 'Viernes' },
        { value: 'sabado', label: 'Sábado' },
        { value: 'domingo', label: 'Domingo' },
    ];

    const toggleSegmento = (segmentoId: number) => {
        const nuevosSegmentos = data.segmentos_ids.includes(segmentoId)
            ? data.segmentos_ids.filter(id => id !== segmentoId)
            : [...data.segmentos_ids, segmentoId];
        
        setData('segmentos_ids', nuevosSegmentos);
    };

    const seleccionarTodosSegmentos = () => {
        setData('segmentos_ids', segmentos.map(s => s.id));
    };

    const limpiarSegmentos = () => {
        setData('segmentos_ids', []);
    };

    const segmentosFiltrados = segmentos.filter(seg =>
        seg.nombre.toLowerCase().includes(busquedaSegmento.toLowerCase())
    );

    const agregarDetalle = () => {
        setData('detalles', [
            ...data.detalles,
            {
                tipo_item: tipoItemSeleccionado,
                item_id: 0,
                cantidad: 1,
                noches: tipoItemSeleccionado === 'habitacion' ? 1 : null,
                descuento_porcentaje: null,
                descuento_monto: null,
                precio_especial: null,
                es_gratis: false,
                detalle: '',
            },
        ]);
    };

    const eliminarDetalle = (index: number) => {
        const nuevosDetalles = data.detalles.filter((_, i) => i !== index);
        setData('detalles', nuevosDetalles);
    };

    const actualizarDetalle = (index: number, campo: keyof Detalle, valor: any) => {
        const nuevosDetalles = [...data.detalles];
        nuevosDetalles[index] = { ...nuevosDetalles[index], [campo]: valor };
        setData('detalles', nuevosDetalles);
    };

    const obtenerItemsDisponibles = (tipo: 'habitacion' | 'servicio' | 'platillo') => {
        switch (tipo) {
            case 'habitacion':
                return tiposHabitacion;
            case 'servicio':
                return servicios;
            case 'platillo':
                return platillos;
        }
    };

    const toggleDiaSemana = (dia: string) => {
        const nuevosDias = data.dias_semana.includes(dia)
            ? data.dias_semana.filter((d) => d !== dia)
            : [...data.dias_semana, dia];
        setData('dias_semana', nuevosDias);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/promos', {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/promos');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Promoción" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
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
                                <h1 className="text-3xl font-bold tracking-tight">Nueva Promoción</h1>
                                <p className="text-muted-foreground">
                                    Crea una nueva promoción para tus clientes
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Información Básica */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                                <CardDescription>Datos generales de la promoción</CardDescription>
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
                                            required
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
                                            onChange={(e) => setData('codigo_promocional', e.target.value.toUpperCase())}
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
                                            onValueChange={(value) => setData('tipo_promo', value as any)}
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
                                        <Label htmlFor="estado">Estado</Label>
                                        <Select
                                            value={data.estado}
                                            onValueChange={(value) => setData('estado', value as any)}
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

                                    <div className="space-y-2">
                                        <Label htmlFor="prioridad">Prioridad (1-10)</Label>
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

                                {/* Descuentos - ✅ CORREGIDO */}
                                {data.tipo_promo === 'descuento_porcentual' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="descuento_porcentaje">
                                            Descuento (%) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="descuento_porcentaje"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={data.descuento_porcentaje || ''}
                                            onChange={(e) => setData('descuento_porcentaje', parseFloat(e.target.value) || null)}
                                            required
                                        />
                                    </div>
                                )}

                                {data.tipo_promo === 'descuento_fijo' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="descuento_monto">
                                            Descuento (Bs.) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="descuento_monto"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.descuento_monto || ''}
                                            onChange={(e) => setData('descuento_monto', parseFloat(e.target.value) || null)}
                                            required
                                        />
                                    </div>
                                )}

                                {(data.tipo_promo === 'paquete' || data.tipo_promo === 'precio_especial') && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="precio_total_paquete">
                                                Precio Total (Bs.) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="precio_total_paquete"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.precio_total_paquete || ''}
                                                onChange={(e) => setData('precio_total_paquete', parseFloat(e.target.value) || null)}
                                                required
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
                                                onChange={(e) => setData('precio_normal', parseFloat(e.target.value) || null)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Segmentación de Clientes */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Segmentación de Clientes</CardTitle>
                                <CardDescription>
                                    Selecciona los segmentos de clientes que pueden usar esta promoción
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="aplica_todos"
                                            checked={data.aplica_todos_segmentos}
                                            onCheckedChange={(checked) => {
                                                setData('aplica_todos_segmentos', checked as boolean);
                                                if (checked) {
                                                    setData('segmentos_ids', []);
                                                }
                                            }}
                                        />
                                        <label htmlFor="aplica_todos" className="cursor-pointer">
                                            <p className="font-medium text-blue-900">
                                                🌍 Aplicar a TODOS los segmentos
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                Esta promoción estará disponible para todos los clientes
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {!data.aplica_todos_segmentos && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <Input
                                                type="text"
                                                placeholder="🔍 Buscar segmento..."
                                                value={busquedaSegmento}
                                                onChange={(e) => setBusquedaSegmento(e.target.value)}
                                                className="max-w-xs"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={seleccionarTodosSegmentos}
                                                >
                                                    Seleccionar Todos
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={limpiarSegmentos}
                                                >
                                                    Limpiar
                                                </Button>
                                            </div>
                                        </div>

                                        {data.segmentos_ids.length > 0 && (
                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                <p className="text-sm font-medium text-green-900 mb-2">
                                                    ✅ {data.segmentos_ids.length} segmento(s) seleccionado(s):
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {data.segmentos_ids.map((segId) => {
                                                        const segmento = segmentos.find(s => s.id === segId);
                                                        return segmento ? (
                                                            <Badge
                                                                key={segId}
                                                                variant="default"
                                                                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                                                                onClick={() => toggleSegmento(segId)}
                                                            >
                                                                {segmento.nombre}
                                                                <X className="h-3 w-3 ml-1" />
                                                            </Badge>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
                                            {segmentosFiltrados.length === 0 ? (
                                                <div className="p-8 text-center text-gray-500">
                                                    <p>No se encontraron segmentos</p>
                                                </div>
                                            ) : (
                                                segmentosFiltrados.map((segmento) => (
                                                    <label
                                                        key={segmento.id}
                                                        className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                                    >
                                                        <Checkbox
                                                            checked={data.segmentos_ids.includes(segmento.id)}
                                                            onCheckedChange={() => toggleSegmento(segmento.id)}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">
                                                                {segmento.nombre}
                                                            </p>
                                                            {segmento.descripcion && (
                                                                <p className="text-sm text-gray-500">
                                                                    {segmento.descripcion}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {data.segmentos_ids.includes(segmento.id) && (
                                                            <Badge variant="default" className="bg-green-600">
                                                                Seleccionado
                                                            </Badge>
                                                        )}
                                                    </label>
                                                ))
                                            )}
                                        </div>

                                        {errors.segmentos_ids && (
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>{errors.segmentos_ids}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Vigencia y Condiciones */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Vigencia y Condiciones</CardTitle>
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
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Días de la Semana Aplicables</Label>
                                    <div className="flex flex-wrap gap-3">
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

                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_maxima_usos">Usos Máximos</Label>
                                        <Input
                                            id="cantidad_maxima_usos"
                                            type="number"
                                            min="1"
                                            value={data.cantidad_maxima_usos || ''}
                                            onChange={(e) => setData('cantidad_maxima_usos', parseInt(e.target.value) || null)}
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
                                    <div className="flex gap-2">
                                        <Select
                                            value={tipoItemSeleccionado}
                                            onValueChange={(value) => setTipoItemSeleccionado(value as any)}
                                        >
                                            <SelectTrigger className="w-40">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="habitacion">Habitación</SelectItem>
                                                <SelectItem value="servicio">Servicio</SelectItem>
                                                <SelectItem value="platillo">Platillo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button type="button" onClick={agregarDetalle} size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Agregar
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {data.detalles.length === 0 ? (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            No hay items agregados. Selecciona un tipo y haz clic en "Agregar".
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <div className="space-y-4">
                                        {data.detalles.map((detalle, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 bg-gray-50 space-y-4"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <Badge>
                                                        {detalle.tipo_item === 'habitacion' ? '🏠' : detalle.tipo_item === 'servicio' ? '🛎️' : '🍽️'}{' '}
                                                        Item #{index + 1}
                                                    </Badge>
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
                                                    <div className="col-span-2 space-y-2">
                                                        <Label>Seleccionar Item</Label>
                                                        <Select
                                                            value={detalle.item_id.toString()}
                                                            onValueChange={(value) =>
                                                                actualizarDetalle(index, 'item_id', parseInt(value))
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {obtenerItemsDisponibles(detalle.tipo_item).map((item) => (
                                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                                        {item.nombre} - Bs. {item.precio}
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
                                                                actualizarDetalle(index, 'cantidad', parseInt(e.target.value))
                                                            }
                                                        />
                                                    </div>

                                                    {detalle.tipo_item === 'habitacion' && (
                                                        <div className="space-y-2">
                                                            <Label>Noches</Label>
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                value={detalle.noches || 1}
                                                                onChange={(e) =>
                                                                    actualizarDetalle(index, 'noches', parseInt(e.target.value))
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="col-span-3 space-y-2">
                                                        <Label>Detalle Adicional</Label>
                                                        <Input
                                                            value={detalle.detalle}
                                                            onChange={(e) =>
                                                                actualizarDetalle(index, 'detalle', e.target.value)
                                                            }
                                                            placeholder="Ej: Vista al mar, desayuno incluido..."
                                                        />
                                                    </div>

                                                    <div className="col-span-3">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <Checkbox
                                                                checked={detalle.es_gratis}
                                                                onCheckedChange={(checked) =>
                                                                    actualizarDetalle(index, 'es_gratis', checked)
                                                                }
                                                            />
                                                            <span className="text-sm">Este item es GRATIS 🎁</span>
                                                        </label>
                                                    </div>
                                                </div>
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
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
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
                                {processing ? 'Creando...' : 'Crear Promoción'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}