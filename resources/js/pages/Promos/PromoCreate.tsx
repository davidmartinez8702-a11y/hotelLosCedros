import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // ✅ CAMBIO AQUÍ
import { 
    PlusIcon, 
    TrashIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';

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

export default function Create({ segmentos, tiposHabitacion, servicios, platillos }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        codigo_promocional: '',
        tipo_promo: 'descuento_porcentual' as 'descuento_porcentual' | 'descuento_fijo' | 'paquete' | 'precio_especial' | 'upgrade',
        descuento_porcentaje: null as number | null,
        descuento_monto: null as number | null,
        precio_total_paquete: null as number | null,
        precio_normal: null as number | null,
        segmento_id: null as number | null,
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

    const [itemsDisponibles, setItemsDisponibles] = useState<any[]>([]);
    const [tipoItemSeleccionado, setTipoItemSeleccionado] = useState<'habitacion' | 'servicio' | 'platillo'>('habitacion');

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

    const obtenerNombreItem = (detalle: Detalle) => {
        const items = obtenerItemsDisponibles(detalle.tipo_item);
        const item = items.find((i) => i.id === detalle.item_id);
        return item?.nombre || 'Seleccione...';
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('promos.store'));
    };

    return (
        <AppLayout> {/* ✅ CAMBIO AQUÍ */}
            <Head title="Nueva Promoción" />

            {/* Encabezado personalizado */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Nueva Promoción
                    </h2>
                    <button
                        type="button"
                        onClick={() => router.visit(route('promos.index'))}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Volver
                    </button>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Información Básica</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre de la Promoción *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                                        )}
                                    </div>

                                    {/* Código Promocional */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Código Promocional (opcional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.codigo_promocional}
                                            onChange={(e) => setData('codigo_promocional', e.target.value.toUpperCase())}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="VERANO2025"
                                        />
                                        {errors.codigo_promocional && (
                                            <p className="text-red-500 text-xs mt-1">{errors.codigo_promocional}</p>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={data.descripcion}
                                            onChange={(e) => setData('descripcion', e.target.value)}
                                            rows={3}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Tipo de Promoción */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Promoción *
                                        </label>
                                        <select
                                            value={data.tipo_promo}
                                            onChange={(e) => setData('tipo_promo', e.target.value as any)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="descuento_porcentual">Descuento Porcentual (%)</option>
                                            <option value="descuento_fijo">Descuento Fijo (Bs.)</option>
                                            <option value="paquete">Paquete</option>
                                            <option value="precio_especial">Precio Especial</option>
                                            <option value="upgrade">Upgrade</option>
                                        </select>
                                    </div>

                                    {/* Estado */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Estado *
                                        </label>
                                        <select
                                            value={data.estado}
                                            onChange={(e) => setData('estado', e.target.value as any)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="activa">Activa</option>
                                            <option value="pausada">Pausada</option>
                                            <option value="finalizada">Finalizada</option>
                                        </select>
                                    </div>

                                    {/* Descuento Porcentual */}
                                    {data.tipo_promo === 'descuento_porcentual' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Descuento (%) *
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                value={data.descuento_porcentaje || ''}
                                                onChange={(e) => setData('descuento_porcentaje', parseFloat(e.target.value) || null)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Descuento Fijo */}
                                    {data.tipo_promo === 'descuento_fijo' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Descuento (Bs.) *
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={data.descuento_monto || ''}
                                                onChange={(e) => setData('descuento_monto', parseFloat(e.target.value) || null)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* Precio Total Paquete */}
                                    {(data.tipo_promo === 'paquete' || data.tipo_promo === 'precio_especial') && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Precio Total (Bs.) *
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={data.precio_total_paquete || ''}
                                                    onChange={(e) => setData('precio_total_paquete', parseFloat(e.target.value) || null)}
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Precio Normal (Bs.)
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={data.precio_normal || ''}
                                                    onChange={(e) => setData('precio_normal', parseFloat(e.target.value) || null)}
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Fechas y Segmentación */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Fechas y Segmentación</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Fecha Inicio */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fecha de Inicio *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.fecha_inicio}
                                            onChange={(e) => setData('fecha_inicio', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    {/* Fecha Fin */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fecha de Fin *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.fecha_fin}
                                            onChange={(e) => setData('fecha_fin', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    {/* Segmento */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Segmento de Clientes
                                        </label>
                                        <select
                                            value={data.segmento_id || ''}
                                            onChange={(e) => setData('segmento_id', e.target.value ? parseInt(e.target.value) : null)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Todos los clientes</option>
                                            {segmentos.map((seg) => (
                                                <option key={seg.id} value={seg.id}>
                                                    {seg.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Aplica A */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Aplica a
                                        </label>
                                        <select
                                            value={data.aplica_a}
                                            onChange={(e) => setData('aplica_a', e.target.value as any)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="todos">Todos</option>
                                            <option value="nuevos">Solo nuevos clientes</option>
                                            <option value="registrados">Solo clientes registrados</option>
                                        </select>
                                    </div>

                                    {/* Prioridad */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prioridad (1-10)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={data.prioridad}
                                            onChange={(e) => setData('prioridad', parseInt(e.target.value) || 5)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Mayor número = mayor prioridad</p>
                                    </div>

                                    {/* URL Imagen */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            URL de Imagen
                                        </label>
                                        <input
                                            type="url"
                                            value={data.image_url}
                                            onChange={(e) => setData('image_url', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Condiciones */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Condiciones</h3>

                                <div className="grid grid-cols-3 gap-6">
                                    {/* Mínimo Noches */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mínimo de Noches
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.minimo_noches}
                                            onChange={(e) => setData('minimo_noches', parseInt(e.target.value) || 1)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Mínimo Personas */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mínimo de Personas
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.minimo_personas}
                                            onChange={(e) => setData('minimo_personas', parseInt(e.target.value) || 1)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Días Anticipación */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Días de Anticipación
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.dias_anticipacion_minimo}
                                            onChange={(e) => setData('dias_anticipacion_minimo', parseInt(e.target.value) || 0)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Para early bird</p>
                                    </div>

                                    {/* Cantidad Máxima Usos */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Usos Máximos (Total)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.cantidad_maxima_usos || ''}
                                            onChange={(e) => setData('cantidad_maxima_usos', parseInt(e.target.value) || null)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Ilimitado"
                                        />
                                    </div>

                                    {/* Usos por Cliente */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Usos por Cliente
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.usos_por_cliente}
                                            onChange={(e) => setData('usos_por_cliente', parseInt(e.target.value) || 1)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Días desde última visita */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Días desde Última Visita
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.dias_desde_ultima_visita || ''}
                                            onChange={(e) => setData('dias_desde_ultima_visita', parseInt(e.target.value) || null)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Para reactivación"
                                        />
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="col-span-3 flex gap-6">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.incluye_upgrade}
                                                onChange={(e) => setData('incluye_upgrade', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Incluye Upgrade</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.requiere_pago_completo}
                                                onChange={(e) => setData('requiere_pago_completo', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Requiere Pago Completo</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detalles de la Promoción */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Detalles de la Promoción *</h3>
                                    <div className="flex gap-2">
                                        <select
                                            value={tipoItemSeleccionado}
                                            onChange={(e) => setTipoItemSeleccionado(e.target.value as any)}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="habitacion">Habitación</option>
                                            <option value="servicio">Servicio</option>
                                            <option value="platillo">Platillo</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={agregarDetalle}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                                        >
                                            <PlusIcon className="h-5 w-5 mr-2" />
                                            Agregar Item
                                        </button>
                                    </div>
                                </div>

                                {errors.detalles && (
                                    <p className="text-red-500 text-sm mb-4">
                                        Debes agregar al menos un item a la promoción
                                    </p>
                                )}

                                {data.detalles.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No hay items agregados. Selecciona un tipo y haz clic en "Agregar Item".</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {data.detalles.map((detalle, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                                                            {detalle.tipo_item === 'habitacion' ? '🏠 Habitación' : detalle.tipo_item === 'servicio' ? '🛎️ Servicio' : '🍽️ Platillo'}
                                                        </span>
                                                        <span className="text-sm font-medium">Item #{index + 1}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => eliminarDetalle(index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {/* Seleccionar Item */}
                                                    <div className="col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Seleccionar Item *
                                                        </label>
                                                        <select
                                                            value={detalle.item_id}
                                                            onChange={(e) => actualizarDetalle(index, 'item_id', parseInt(e.target.value))}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            required
                                                        >
                                                            <option value={0}>Seleccione...</option>
                                                            {obtenerItemsDisponibles(detalle.tipo_item).map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.nombre} - Bs. {item.precio}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Cantidad */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Cantidad
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={detalle.cantidad}
                                                            onChange={(e) => actualizarDetalle(index, 'cantidad', parseInt(e.target.value) || 1)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    </div>

                                                    {/* Noches (solo habitaciones) */}
                                                    {detalle.tipo_item === 'habitacion' && (
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Noches
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={detalle.noches || 1}
                                                                onChange={(e) => actualizarDetalle(index, 'noches', parseInt(e.target.value) || 1)}
                                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Descuento % */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Descuento (%)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            step="0.01"
                                                            value={detalle.descuento_porcentaje || ''}
                                                            onChange={(e) => actualizarDetalle(index, 'descuento_porcentaje', parseFloat(e.target.value) || null)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            disabled={detalle.es_gratis}
                                                        />
                                                    </div>

                                                    {/* Precio Especial */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Precio Especial (Bs.)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={detalle.precio_especial || ''}
                                                            onChange={(e) => actualizarDetalle(index, 'precio_especial', parseFloat(e.target.value) || null)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            disabled={detalle.es_gratis}
                                                        />
                                                    </div>

                                                    {/* Es Gratis */}
                                                    <div className="flex items-end">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={detalle.es_gratis}
                                                                onChange={(e) => actualizarDetalle(index, 'es_gratis', e.target.checked)}
                                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            />
                                                            <span className="ml-2 text-sm text-gray-700">Es Gratis 🎁</span>
                                                        </label>
                                                    </div>

                                                    {/* Detalle adicional */}
                                                    <div className="col-span-3">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Notas adicionales
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={detalle.detalle}
                                                            onChange={(e) => actualizarDetalle(index, 'detalle', e.target.value)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            placeholder="Ej: Según disponibilidad"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => router.visit(route('promos.index'))}
                                className="px-6 py-2 bg-gray-200 border border-gray-300 rounded-md font-semibold text-sm text-gray-700 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Crear Promoción'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}