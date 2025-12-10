import React, { useState, useEffect } from 'react';
import { 
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    ZAxis, 
    PieChart, 
    Pie, 
    Cell, 
    BarChart, 
    Bar,
    PieLabelRenderProps // ← AGREGAR ESTA IMPORTACIÓN
} from 'recharts';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Users, TrendingUp, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ClienteSegmentado {
    id: number;
    nombre: string;
    cluster: number;
    total_reservas: number;
    gasto_total: number;
    frecuencia_visitas: number;
}

interface ClusterInfo {
    cluster_id: number;
    nombre: string;
    color: string;
    total_clientes: number;
    caracteristicas: string[];
}

interface EstadisticasResponse {
    success: boolean;
    segmentos: {
        id: number;
        nombre: string;
        color: string;
        total_clientes: number;
        caracteristicas_promedio: {
            revenue: number;
            adr: number;
            total_nights: number;
            lead_time: number;
            frequency: number;
        };
        promos_activas: number;
    }[];
}

// ✅ Interfaz corregida con message opcional
interface ClasificacionResponse {
    success: boolean;
    message?: string; // ← AGREGAR optional
    total_clasificados: number;
    total_errores?: number;
    resultados?: {
        cliente_id: number;
        nombre: string;
        cluster_id: number;
        segmento: string;
    }[];
    errores?: {
        cliente_id: number;
        error: string;
    }[];
    validacion?: any; // Para cuando hay error de validación
}

// ✅ Interfaz para validación
interface ValidacionDatos {
    suficiente: boolean;
    mensaje: string;
    estadisticas?: {
        total_clientes: number;
        total_reservas: number;
        total_checkins: number;
        clientes_con_datos: number;
        clientes_clasificados: number;
        segmentos_activos: number;
    };
    problemas?: string[];
    advertencias?: string[];
}

export default function KmeansVisualizacion() {
    const [clientes, setClientes] = useState<ClienteSegmentado[]>([]);
    const [clusters, setClusters] = useState<ClusterInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [estadisticas, setEstadisticas] = useState<EstadisticasResponse | null>(null);
    const [diasInactividad, setDiasInactividad] = useState(180);
    const [validacionDatos, setValidacionDatos] = useState<ValidacionDatos | null>(null);

    // Colores para cada cluster
    const CLUSTER_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#a4de6c'];

    // Cargar estadísticas al montar
    useEffect(() => {
        cargarEstadisticas();
        validarDatos();
    }, []);

    /**
     * ✅ Cargar estadísticas desde BD
     */
    const cargarEstadisticas = async () => {
        try {
            const response = await fetch(route('kmeans.estadisticas'));
            const result = await response.json();
            
            if (result.success) {
                setEstadisticas(result);
                
                // Convertir a formato para el gráfico
                const clustersData: ClusterInfo[] = [];

                result.segmentos.forEach((segmento: any, index: number) => {
                    clustersData.push({
                        cluster_id: index,
                        nombre: segmento.nombre,
                        color: segmento.color,
                        total_clientes: segmento.total_clientes,
                        caracteristicas: generarCaracteristicas(segmento.caracteristicas_promedio)
                    });
                });

                setClusters(clustersData);
            }
        } catch (err) {
            console.error('Error al cargar estadísticas:', err);
        }
    };

    /**
     * ✅ Validar si hay datos suficientes
     */
    const validarDatos = async () => {
        try {
            const response = await fetch(route('kmeans.validar'));
            const result: ValidacionDatos = await response.json();
            setValidacionDatos(result);
            
            if (!result.suficiente) {
                setError(result.mensaje);
            } else {
                // Limpiar error si ahora hay datos suficientes
                setError(null);
            }
        } catch (err) {
            console.error('Error al validar datos:', err);
            setError('Error al validar datos del sistema');
        }
    };

    /**
     * ✅ Función auxiliar para obtener CSRF token
     */
    const getCsrfToken = (): string => {
        const token = document.head.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
        
        if (!token) {
            console.error('❌ CSRF token no encontrado en el DOM');
            console.log('🔍 Meta tags disponibles:', 
                Array.from(document.head.querySelectorAll('meta')).map(m => m.getAttribute('name'))
            );
        } else {
            console.log('✅ CSRF token encontrado:', token.substring(0, 20) + '...');
        }
        
        return token || '';
    };

    /**
     * ✅ Clasificar con validación previa (CORREGIDO)
     */
    const clasificarClientesLote = async () => {
        // Validar antes de clasificar
        if (validacionDatos && !validacionDatos.suficiente) {
            setError('❌ Datos insuficientes. Ejecuta los seeders primero.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            // ✅ Obtener CSRF token con validación
            const csrfToken = getCsrfToken();
            
            if (!csrfToken) {
                throw new Error('No se pudo obtener el CSRF token. Recarga la página.');
            }

            console.log('📤 Enviando request con:', {
                url: route('clientes.clasificar.lote'),
                dias_inactividad: diasInactividad,
                csrf_token_length: csrfToken.length
            });

            const response = await fetch(route('clientes.clasificar.lote'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,  // ✅ Token validado
                    'X-Requested-With': 'XMLHttpRequest'  // ✅ IMPORTANTE para Laravel
                },
                credentials: 'same-origin',  // ✅ Incluir cookies
                body: JSON.stringify({
                    dias_inactividad: diasInactividad
                })
            });

            console.log('📥 Respuesta recibida:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });

            // ✅ Verificar si la respuesta es JSON válido
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const textResponse = await response.text();
                console.error('❌ Respuesta no JSON:', textResponse.substring(0, 500));
                
                if (response.status === 419) {
                    throw new Error('Sesión expirada (419). Por favor recarga la página (F5) e intenta de nuevo.');
                }
                
                throw new Error(`El servidor devolvió ${response.status}: ${response.statusText}`);
            }

            const result: ClasificacionResponse = await response.json();
            
            console.log('📥 Respuesta parseada:', result);

            if (result.success) {
                setSuccess(`✅ Se clasificaron exitosamente ${result.total_clasificados} clientes`);
                
                if (result.total_errores && result.total_errores > 0) {
                    setError(`⚠️ ${result.total_errores} clientes no pudieron ser clasificados. Revisa los logs.`);
                }

                await cargarEstadisticas();
                await cargarClasificacionesGuardadas();
                await validarDatos();
            } else {
                const errorMsg = result.message || 'Error desconocido al clasificar clientes';
                setError(errorMsg);
                
                if (result.validacion) {
                    console.log('Detalles de validación:', result.validacion);
                }
            }
        } catch (err: any) {
            console.error('❌ Error al clasificar:', err);
            setError(err.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    /**
     * ✅ Cargar clasificaciones guardadas en BD
     */
    const cargarClasificacionesGuardadas = async () => {
        try {
            const response = await fetch(route('clientes.clasificaciones'));
            const result = await response.json();
            
            if (result.success && result.clientes) {
                const clientesFormateados: ClienteSegmentado[] = result.clientes.map((cliente: any) => ({
                    id: cliente.cliente_id,
                    nombre: cliente.nombre_completo,
                    cluster: cliente.cluster_id,
                    total_reservas: cliente.total_reservas_analizadas || 0,
                    gasto_total: cliente.cluster_data?.revenue || 0,
                    frecuencia_visitas: cliente.cluster_data?.frequency || 0
                }));

                setClientes(clientesFormateados);
            }
        } catch (err) {
            console.error('Error al cargar clasificaciones:', err);
        }
    };

    /**
     * Generar características legibles
     */
    const generarCaracteristicas = (caracteristicas: any): string[] => {
        if (!caracteristicas) return ['Sin datos'];

        const result: string[] = [];

        if (caracteristicas.revenue !== undefined) {
            result.push(`Ingreso promedio: Bs. ${caracteristicas.revenue.toFixed(2)}`);
        }
        if (caracteristicas.adr !== undefined) {
            result.push(`Tarifa diaria: Bs. ${caracteristicas.adr.toFixed(2)}`);
        }
        if (caracteristicas.total_nights !== undefined) {
            result.push(`Noches promedio: ${caracteristicas.total_nights.toFixed(1)}`);
        }
        if (caracteristicas.lead_time !== undefined) {
            result.push(`Anticipación: ${Math.round(caracteristicas.lead_time)} días`);
        }
        if (caracteristicas.frequency !== undefined) {
            result.push(`Frecuencia: ${caracteristicas.frequency.toFixed(1)} visitas`);
        }

        return result.length > 0 ? result : ['Sin datos'];
    };

    /**
     * ✅ Datos para gráfico de torta (con validación)
     */
    const getPieData = () => {
        if (!estadisticas || !estadisticas.segmentos) return [];

        return estadisticas.segmentos.map((segmento, index) => ({
            name: segmento.nombre,
            value: segmento.total_clientes,
            color: CLUSTER_COLORS[index % CLUSTER_COLORS.length]
        }));
    };

    /**
     * ✅ Renderizar label del Pie Chart con tipo correcto
     */
    const renderPieLabel = (props: PieLabelRenderProps) => {
        const { name, percent } = props;
        const percentValue = percent !== undefined ? (percent * 100).toFixed(0) : '0';
        const labelName = name || 'Sin nombre';
        return `${labelName}: ${percentValue}%`;
    };

    return (
        <AppLayout>
            <Head title="Segmentación K-means" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Segmentación de Clientes
                        </h1>
                        <p className="text-gray-600">
                            Clasificación automática mediante K-means para personalización de servicios
                        </p>
                    </div>

                    {/* ✅ Alerta de Validación */}
                    {validacionDatos && !validacionDatos.suficiente && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Datos Insuficientes</AlertTitle>
                            <AlertDescription>
                                <p className="mb-2">{validacionDatos.mensaje}</p>
                                <ul className="list-disc list-inside space-y-1">
                                    {validacionDatos.problemas?.map((problema: string, idx: number) => (
                                        <li key={idx}>{problema}</li>
                                    ))}
                                </ul>
                                <p className="mt-3 font-semibold">
                                    Ejecuta los seeders: <code className="bg-red-100 px-2 py-1 rounded">php artisan db:seed</code>
                                </p>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* ✅ Advertencias (no bloquean) */}
                    {validacionDatos && validacionDatos.suficiente && validacionDatos.advertencias && validacionDatos.advertencias.length > 0 && (
                        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <AlertTitle className="text-yellow-800">Advertencias</AlertTitle>
                            <AlertDescription className="text-yellow-700">
                                <ul className="list-disc list-inside space-y-1">
                                    {validacionDatos.advertencias.map((adv: string, idx: number) => (
                                        <li key={idx}>{adv}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Alertas normales */}
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-6 bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Éxito</AlertTitle>
                            <AlertDescription className="text-green-700">{success}</AlertDescription>
                        </Alert>
                    )}

                    {/* ✅ Mostrar estadísticas de datos */}
                    {validacionDatos && validacionDatos.estadisticas && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Estado de los Datos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Clientes</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.total_clientes}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Reservas</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.total_reservas}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Check-ins</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.total_checkins}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Con Datos</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.clientes_con_datos}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Clasificados</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.clientes_clasificados}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Segmentos</p>
                                        <p className="text-2xl font-bold">{validacionDatos.estadisticas.segmentos_activos}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Panel de Control */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Opciones de Clasificación</CardTitle>
                            <CardDescription>
                                Selecciona el rango de tiempo para clasificar clientes activos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Clientes activos en los últimos (días):
                                    </label>
                                    <input 
                                        type="number" 
                                        value={diasInactividad}
                                        onChange={(e) => setDiasInactividad(parseInt(e.target.value) || 180)}
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="180"
                                        min="30"
                                        max="730"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Recomendado: 90-180 días para análisis reciente
                                    </p>
                                </div>

                                <Button 
                                    onClick={clasificarClientesLote}
                                    disabled={loading || (validacionDatos !== null && !validacionDatos.suficiente)}
                                    size="lg"
                                    className="px-8"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Clasificando...
                                        </>
                                    ) : (
                                        <>
                                            <Users className="mr-2 h-4 w-4" />
                                            Clasificar Clientes
                                        </>
                                    )}
                                </Button>

                                <Button 
                                    onClick={() => {
                                        cargarEstadisticas();
                                        cargarClasificacionesGuardadas();
                                        validarDatos();
                                    }}
                                    variant="outline"
                                    size="lg"
                                    disabled={loading}
                                >
                                    Actualizar Datos
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs con visualizaciones */}
                    <Tabs defaultValue="resumen" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="resumen">Resumen</TabsTrigger>
                            <TabsTrigger value="distribucion">Distribución</TabsTrigger>
                            <TabsTrigger value="clientes">Clientes</TabsTrigger>
                            <TabsTrigger value="metricas">Métricas</TabsTrigger>
                        </TabsList>

                        {/* Tab: Resumen */}
                        <TabsContent value="resumen" className="space-y-6">
                            {/* Tarjetas de estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                                        <Users className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {estadisticas?.segmentos.reduce((sum, s) => sum + s.total_clientes, 0) || 0}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Clientes clasificados</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Segmentos Activos</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {estadisticas?.segmentos.length || 0}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Tipos de clientes</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Hoy</div>
                                        <p className="text-xs text-gray-500 mt-1">Datos actualizados</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Información de Clusters */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {estadisticas?.segmentos.map((segmento, idx) => (
                                    <Card 
                                        key={segmento.id}
                                        className="border-l-4"
                                        style={{ borderLeftColor: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}
                                    >
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">{segmento.nombre}</CardTitle>
                                            <CardDescription>
                                                {segmento.total_clientes} clientes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="text-sm space-y-1">
                                                {generarCaracteristicas(segmento.caracteristicas_promedio).map((caract, i) => (
                                                    <li key={i} className="text-gray-700">• {caract}</li>
                                                ))}
                                            </ul>
                                            {segmento.promos_activas > 0 && (
                                                <div className="mt-3 pt-3 border-t">
                                                    <span className="text-xs text-green-600 font-medium">
                                                        {segmento.promos_activas} promos activas
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab: Distribución */}
                        <TabsContent value="distribucion">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Gráfico de Torta */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Distribución por Segmento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {getPieData().length > 0 ? (
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie
                                                        data={getPieData()}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderPieLabel}
                                                        outerRadius={100}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {getPieData().map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500">No hay datos para mostrar</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Gráfico de Barras */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Clientes por Segmento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {getPieData().length > 0 ? (
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={getPieData()}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="value" fill="#8884d8">
                                                        {getPieData().map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500">No hay datos para mostrar</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Tab: Clientes */}
                        <TabsContent value="clientes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lista de Clientes Clasificados</CardTitle>
                                    <CardDescription>
                                        {clientes.length} clientes en total
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {clientes.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Cliente
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Segmento
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Reservas
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Gasto Total
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Frecuencia
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {clientes.map((cliente) => (
                                                        <tr key={cliente.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {cliente.nombre}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span 
                                                                    className="px-3 py-1 rounded-full text-sm font-semibold"
                                                                    style={{ 
                                                                        backgroundColor: CLUSTER_COLORS[cliente.cluster % CLUSTER_COLORS.length] + '20',
                                                                        color: CLUSTER_COLORS[cliente.cluster % CLUSTER_COLORS.length]
                                                                    }}
                                                                >
                                                                    {clusters.find(c => c.cluster_id === cliente.cluster)?.nombre || `Cluster ${cliente.cluster}`}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {cliente.total_reservas}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                Bs. {cliente.gasto_total.toFixed(2)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {cliente.frecuencia_visitas.toFixed(1)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <Users className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes clasificados</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Haz clic en "Clasificar Clientes" para comenzar
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab: Métricas */}
                        <TabsContent value="metricas">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Métricas Detalladas por Segmento</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {estadisticas && estadisticas.segmentos.length > 0 ? (
                                        <div className="space-y-6">
                                            {estadisticas.segmentos.map((segmento, idx) => (
                                                <div 
                                                    key={segmento.id}
                                                    className="border rounded-lg p-4"
                                                    style={{ borderLeftWidth: '4px', borderLeftColor: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}
                                                >
                                                    <h3 className="text-lg font-semibold mb-3">{segmento.nombre}</h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Ingreso Promedio</p>
                                                            <p className="text-xl font-bold">
                                                                Bs. {segmento.caracteristicas_promedio?.revenue?.toFixed(2) || '0.00'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Tarifa Diaria</p>
                                                            <p className="text-xl font-bold">
                                                                Bs. {segmento.caracteristicas_promedio?.adr?.toFixed(2) || '0.00'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Noches Promedio</p>
                                                            <p className="text-xl font-bold">
                                                                {segmento.caracteristicas_promedio?.total_nights?.toFixed(1) || '0'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Anticipación (días)</p>
                                                            <p className="text-xl font-bold">
                                                                {Math.round(segmento.caracteristicas_promedio?.lead_time || 0)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Frecuencia</p>
                                                            <p className="text-xl font-bold">
                                                                {segmento.caracteristicas_promedio?.frequency?.toFixed(1) || '0'} visitas
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Total Clientes</p>
                                                            <p className="text-xl font-bold">
                                                                {segmento.total_clientes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">No hay métricas disponibles</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}