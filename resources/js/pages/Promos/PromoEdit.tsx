import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // ✅ CAMBIO AQUÍ
import { 
    PlusIcon, 
    TrashIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface Promo {
    id: number;
    nombre: string;
    descripcion: string;
    codigo_promocional: string;
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
    image_url: string;
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
    detalle_promos: Array<{
        id: number;
        tipo_item: string;
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
    }>;
}

interface Props {
    promo: Promo;
    segmentos: any[];
    tiposHabitacion: any[];
    servicios: any[];
    platillos: any[];
}

export default function Edit({ promo, segmentos, tiposHabitacion, servicios, platillos }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        codigo_promocional: promo.codigo_promocional,
        tipo_promo: promo.tipo_promo as any,
        descuento_porcentaje: promo.descuento_porcentaje,
        descuento_monto: promo.descuento_monto,
        precio_total_paquete: promo.precio_total_paquete,
        precio_normal: promo.precio_normal,
        segmento_id: promo.segmento_id,
        aplica_a: promo.aplica_a as any,
        estado: promo.estado as any,
        fecha_inicio: promo.fecha_inicio,
        fecha_fin: promo.fecha_fin,
        image_url: promo.image_url,
        stock: promo.stock,
        minimo_noches: promo.minimo_noches,
        minimo_personas: promo.minimo_personas,
        dias_anticipacion_minimo: promo.dias_anticipacion_minimo,
        dias_desde_ultima_visita: promo.dias_desde_ultima_visita,
        dias_semana: promo.dias_semana || [],
        incluye_upgrade: promo.incluye_upgrade,
        requiere_pago_completo: promo.requiere_pago_completo,
        cantidad_maxima_usos: promo.cantidad_maxima_usos,
        usos_por_cliente: promo.usos_por_cliente,
        prioridad: promo.prioridad,
        detalles: promo.detalle_promos.map((d) => ({
            tipo_item: d.tipo_item as any,
            item_id: d.tipo_habitacion_id || d.servicio_id || d.platillo_id || 0,
            cantidad: d.cantidad,
            noches: d.noches,
            descuento_porcentaje: d.descuento_porcentaje,
            descuento_monto: d.descuento_monto,
            precio_especial: d.precio_especial,
            es_gratis: d.es_gratis,
            detalle: d.detalle || '',
        })),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('promos.update', promo.id));
    };

    return (
        <AppLayout> {/* ✅ CAMBIO AQUÍ */}
            <Head title={`Editar: ${promo.nombre}`} />

            {/* Encabezado personalizado */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Editar Promoción: {promo.nombre}
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
                        {/* TODO: Copiar todo el contenido del formulario de Create.tsx aquí */}
                        {/* Cambiar solo el botón final: */}
                        
                        <div className="flex justify-end gap-4 mt-6">
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
                                {processing ? 'Actualizando...' : 'Actualizar Promoción'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}