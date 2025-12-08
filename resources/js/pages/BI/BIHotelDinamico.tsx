import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Componentes BI
import { BIHeader } from "@/shared/BI/components/BIHeader";
import { KPICards } from "@/shared/BI/components/KPICards";

// Componentes Genéricos
import {
    GenericBarChart,
    GenericHorizontalBarChart,
    GenericLineChart,
    GenericPieChart,
    GenericAreaChart,
    GenericMultiBarChart,
} from "@/shared/BI/ChartsComponents";

// Hooks
import { useEvolucionServicios } from "@/hooks/useEvolucionServicios";

// Configuración
import { serviciosMap, periodosMap } from "./serviciosConfig";

// Mock Data
import {
    serviciosUsoData,
    serviciosBarsConfig,
    rankingHabitacionesData,
    rankingBarsConfig,
    prediccionDemandaData,
    prediccionLinesConfig,
    origenHuespedesData,
    flujoReservasData,
    flujoAreasConfig,
    flujoIngresosData,
    flujoIngresosAreasConfig,
    analisisFinancieroData,
    financieroBarsConfig,
    periodoFilterOptions,
    checkinsCheckoutsData,
    checkinsCheckoutsBarsConfig,
    checkinsFilterOptions,
    comentariosData,
    evolucionServiciosBarsConfig,
    evolucionServiciosFilterOptions,
    serviciosSelectOptions,
} from "./mockGenericCharts";
import { kpisData } from "@/shared/BI/mocks";

// Data Resumen
const resumenData = [
    { valor: "156", label: "Total Check-ins", gradiente: "from-blue-50 to-cyan-50", color: "text-blue-600" },
    { valor: "148", label: "Total Check-outs", gradiente: "from-green-50 to-emerald-50", color: "text-green-600" },
    { valor: "3.2", label: "Noches Promedio", gradiente: "from-purple-50 to-fuchsia-50", color: "text-purple-600" },
    { valor: "Bs 850", label: "Tarifa Promedio", gradiente: "from-amber-50 to-orange-50", color: "text-amber-600" },
    { valor: "12", label: "Cancelaciones", gradiente: "from-rose-50 to-pink-50", color: "text-rose-600" },
    { valor: "92%", label: "Tasa Conversión", gradiente: "from-teal-50 to-cyan-50", color: "text-teal-600" },
];

export default function BIHotelDinamico() {
    const [periodo, setPeriodo] = useState("mes");
    const [periodoCheckins, setPeriodoCheckins] = useState("hoy");
    const [periodoServicios, setPeriodoServicios] = useState("semana");
    const [servicioSeleccionado, setServicioSeleccionado] = useState("gym");

    // Hook para obtener datos reales del backend
    const servicioId = serviciosMap[servicioSeleccionado];
    const periodoBackend = periodosMap[periodoServicios] || periodoServicios;
    const { data: evolucionData, servicio, metadata, loading, error } = useEvolucionServicios(
        servicioId,
        periodoBackend
    );

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "#" },
                { title: "Business Intelligence", href: "#" },
            ]}
        >
            <Head title="BI Dinamico - Hotel Genérico" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <BIHeader
                        title="BI Dinamico Dashboard"
                        subtitle="Análisis y métricas del hotel - Actualizado al 7 de Diciembre, 2024"
                        tip="📊 Visualizaciones interactivas con componentes genéricos reutilizables"
                    />

                    {/* KPIs */}
                    <KPICards data={kpisData} />

                    <Separator className="my-8" />

                   

                    {/* Gráficas - Fila 6: Evolución Temporal de Servicios (DINÁMICO) */}
                    <div className="grid grid-cols-1 gap-6">
                        <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl flex items-center gap-2">
                                            Evolución Temporal de Uso de Servicios
                                            <Badge variant="secondary" className="text-xs">
                                                DINÁMICO
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription className="mt-2">
                                            {servicio ? (
                                                <>
                                                    {servicio.nombre} - Cantidad de usos e ingresos por período de tiempo
                                                    {metadata && (
                                                        <span className="ml-2 text-xs text-green-600">
                                                            (Total: {metadata.total_cantidad} usos, Bs {metadata.total_ingresos.toLocaleString()})
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                "Cantidad de usos e ingresos por período de tiempo"
                                            )}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Selector de Servicio */}
                                        <select
                                            value={servicioSeleccionado}
                                            onChange={(e) => setServicioSeleccionado(e.target.value)}
                                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                                            disabled={loading}
                                        >
                                            {serviciosSelectOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Selector de Período */}
                                        <select
                                            value={periodoServicios}
                                            onChange={(e) => setPeriodoServicios(e.target.value)}
                                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                                            disabled={loading}
                                        >
                                            {evolucionServiciosFilterOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex items-center justify-center h-[300px]">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                            <p className="text-gray-600 dark:text-gray-400">Cargando datos...</p>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-[300px]">
                                        <div className="text-center">
                                            <div className="text-red-500 text-5xl mb-4">⚠️</div>
                                            <p className="text-red-600 dark:text-red-400 font-semibold mb-2">Error al cargar datos</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
                                        </div>
                                    </div>
                                ) : evolucionData.length === 0 ? (
                                    <div className="flex items-center justify-center h-[300px]">
                                        <div className="text-center">
                                            <div className="text-gray-400 text-5xl mb-4">📊</div>
                                            <p className="text-gray-600 dark:text-gray-400">No hay datos disponibles para este período</p>
                                        </div>
                                    </div>
                                ) : (
                                    <GenericMultiBarChart
                                        data={evolucionData}
                                        bars={evolucionServiciosBarsConfig}
                                        categoryKey="periodo"
                                        title=""
                                        description=""
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Resumen de Rendimiento */}
                    <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">Resumen de Rendimiento</CardTitle>
                                    <CardDescription className="mt-2">
                                        Métricas clave del último mes
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-sm">
                                    Diciembre 2024
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {resumenData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`text-center p-4 bg-gradient-to-br ${item.gradiente} rounded-lg`}
                                    >
                                        <p className={`text-3xl font-bold ${item.color}`}>{item.valor}</p>
                                        <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer informativo */}
                    <div className="text-center text-sm text-gray-500 py-4">
                        <p>
                            📊 Dashboard con componentes genéricos reutilizables |
                            Última actualización: {new Date().toLocaleString("es-ES")}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
