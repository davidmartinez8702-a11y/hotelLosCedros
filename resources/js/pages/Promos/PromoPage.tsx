import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Search,
    Plus, 
    Pencil, 
    Trash2,
    Eye,
    Pause,
    Play,
    Filter,
} from 'lucide-react'; // ✅ Usando lucide-react
import { route } from 'ziggy-js';
import { useDashboardRoute } from '@/hooks/useDashboardRoute';

interface Promo {
    id: number;
    nombre: string;
    descripcion: string;
    tipo_promo: string;
    descuento_porcentaje: number | null;
    descuento_monto: number | null;
    precio_total_paquete: number | null;
    estado: string;
    fecha_inicio: string;
    fecha_fin: string;
    segmento?: { id: number; nombre: string } | null;
    prioridad: number;
    cantidad_usos_actual: number;
    cantidad_maxima_usos: number | null;
    image_url: string | null;
}

interface Props {
    promos: {
        data: Promo[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filtros: {
        estado?: string;
        tipo_promo?: string;
        segmento_id?: number;
        vigentes?: boolean;
    };
}

export default function Index({ promos, filtros }: Props) {
    const [busqueda, setBusqueda] = useState('');
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
    const {title,path} = useDashboardRoute();
    const breadcrumbs: BreadcrumbItem[] = [
        { title, href: path }, // ✅ CORRECCIÓN: label → title
        { title: 'Promociones', href: route('promos.index') }, // ✅ CORRECCIÓN: label → title
    ];

    const getTipoPromoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            descuento_porcentual: 'Descuento %',
            descuento_fijo: 'Descuento Fijo',
            paquete: 'Paquete',
            precio_especial: 'Precio Especial',
            upgrade: 'Upgrade',
        };
        return labels[tipo] || tipo;
    };

    const getEstadoBadge = (estado: string) => {
        const badges: Record<string, { bg: string; text: string }> = {
            activa: { bg: 'bg-green-100', text: 'text-green-800' },
            pausada: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
            finalizada: { bg: 'bg-gray-100', text: 'text-gray-800' },
        };
        const badge = badges[estado] || badges.finalizada;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {estado.toUpperCase()}
            </span>
        );
    };

    const toggleEstado = (promoId: number) => {
        if (confirm('¿Cambiar el estado de esta promoción?')) {
            router.post(route('promos.toggle', promoId));
        }
    };

    const eliminarPromo = (promoId: number, nombre: string) => {
        if (confirm(`¿Eliminar la promoción "${nombre}"?`)) {
            router.delete(route('promos.destroy', promoId));
        }
    };

    const filtrosPorDefecto = {
        estado: filtros.estado || '',
        tipo_promo: filtros.tipo_promo || '',
        vigentes: filtros.vigentes || false,
    };

    const aplicarFiltros = (nuevosFiltros: Partial<typeof filtrosPorDefecto>) => {
        router.get(route('promos.index'), { ...filtrosPorDefecto, ...nuevosFiltros }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promociones" />

            {/* Header con botón */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Promociones</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Gestiona todas las promociones del hotel
                    </p>
                </div>
                <Link
                    href={route('promos.create')}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Nueva Promoción
                </Link>
            </div>

            {/* Búsqueda y Filtros */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div className="p-6">
                    <div className="flex gap-4 mb-4">
                        {/* Búsqueda */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar promociones..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Botón Filtros */}
                        <button
                            onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <Filter className="h-5 w-5 mr-2" />
                            Filtros
                        </button>
                    </div>

                    {/* Panel de Filtros */}
                    {filtrosAbiertos && (
                        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <label htmlFor="filtro-estado" className="block text-sm font-medium text-gray-700 mb-2">
                                    Estado
                                </label>
                                <select
                                    id="filtro-estado"
                                    aria-label="Filtrar por estado de promoción"
                                    value={filtrosPorDefecto.estado}
                                    onChange={(e) => aplicarFiltros({ estado: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Todos</option>
                                    <option value="activa">Activa</option>
                                    <option value="pausada">Pausada</option>
                                    <option value="finalizada">Finalizada</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="filtro-tipo" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo
                                </label>
                                <select
                                    id="filtro-tipo"
                                    aria-label="Filtrar por tipo de promoción"
                                    value={filtrosPorDefecto.tipo_promo}
                                    onChange={(e) => aplicarFiltros({ tipo_promo: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Todos</option>
                                    <option value="descuento_porcentual">Descuento %</option>
                                    <option value="descuento_fijo">Descuento Fijo</option>
                                    <option value="paquete">Paquete</option>
                                    <option value="precio_especial">Precio Especial</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filtrosPorDefecto.vigentes}
                                        onChange={(e) => aplicarFiltros({ vigentes: e.target.checked })}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Solo vigentes</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Grid de Promociones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.data
                    .filter((promo) =>
                        promo.nombre.toLowerCase().includes(busqueda.toLowerCase())
                    )
                    .map((promo) => (
                        <div
                            key={promo.id}
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                        >
                            {/* Imagen */}
                            {promo.image_url && (
                                <img
                                    src={promo.image_url}
                                    alt={promo.nombre}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            <div className="p-6">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {promo.nombre}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {getTipoPromoLabel(promo.tipo_promo)}
                                        </p>
                                    </div>
                                    {getEstadoBadge(promo.estado)}
                                </div>

                                {/* Descripción */}
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {promo.descripcion}
                                </p>

                                {/* Descuento */}
                                <div className="mb-4">
                                    {promo.descuento_porcentaje && (
                                        <div className="text-2xl font-bold text-indigo-600">
                                            {promo.descuento_porcentaje}% OFF
                                        </div>
                                    )}
                                    {promo.descuento_monto && (
                                        <div className="text-2xl font-bold text-indigo-600">
                                            Bs. {promo.descuento_monto} OFF
                                        </div>
                                    )}
                                    {promo.precio_total_paquete && (
                                        <div className="text-2xl font-bold text-indigo-600">
                                            Bs. {promo.precio_total_paquete}
                                        </div>
                                    )}
                                </div>

                                {/* Fechas */}
                                <div className="text-xs text-gray-500 mb-4">
                                    <div>
                                        Válido: {new Date(promo.fecha_inicio).toLocaleDateString()} - {new Date(promo.fecha_fin).toLocaleDateString()}
                                    </div>
                                    {promo.segmento && (
                                        <div className="mt-1">
                                            Segmento: <span className="font-medium">{promo.segmento.nombre}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Usos */}
                                {promo.cantidad_maxima_usos && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Usos</span>
                                            <span>
                                                {promo.cantidad_usos_actual} / {promo.cantidad_maxima_usos}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-indigo-600 h-2 rounded-full"
                                                style={{
                                                    width: `${(promo.cantidad_usos_actual / promo.cantidad_maxima_usos) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Acciones */}
                                <div className="flex gap-2">
                                    <Link
                                        href={route('promos.show', promo.id)}
                                        className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-200"
                                        aria-label={`Ver detalles de ${promo.nombre}`}
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ver
                                    </Link>

                                    <Link
                                        href={route('promos.edit', promo.id)}
                                        className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-indigo-100 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                                        aria-label={`Editar ${promo.nombre}`}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => toggleEstado(promo.id)}
                                        className="inline-flex justify-center items-center px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-md text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                                        aria-label={promo.estado === 'activa' ? `Pausar ${promo.nombre}` : `Activar ${promo.nombre}`}
                                        title={promo.estado === 'activa' ? 'Pausar promoción' : 'Activar promoción'}
                                    >
                                        {promo.estado === 'activa' ? (
                                            <Pause className="h-4 w-4" />
                                        ) : (
                                            <Play className="h-4 w-4" />
                                        )}
                                    </button>

                                    <button
                                        onClick={() => eliminarPromo(promo.id, promo.nombre)}
                                        className="inline-flex justify-center items-center px-3 py-2 bg-red-100 border border-red-300 rounded-md text-xs font-medium text-red-700 hover:bg-red-200"
                                        aria-label={`Eliminar ${promo.nombre}`}
                                        title="Eliminar promoción"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Mensaje si no hay promos */}
            {promos.data.length === 0 && (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-12 text-center">
                    <p className="text-gray-500 text-lg">No hay promociones disponibles</p>
                    <Link
                        href={route('promos.create')}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Crear Primera Promoción
                    </Link>
                </div>
            )}

            {/* Paginación */}
            {promos.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                        {Array.from({ length: promos.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('promos.index', { ...filtros, page })}
                                className={`px-4 py-2 text-sm font-medium ${
                                    page === promos.current_page
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border border-gray-300`}
                            >
                                {page}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </AppLayout>
    );
}