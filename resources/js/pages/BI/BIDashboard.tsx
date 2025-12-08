import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
    TrendingUp,
    TrendingDown,
    Hotel,
    DollarSign,
    Calendar,
    Star,
    Users,
    Activity
} from "lucide-react";

// Componentes de gráficos genéricos
import { GenericBarChart } from "@/shared/BI/ChartsComponents/GenericBarChart";
import { GenericMultiBarChart } from "@/shared/BI/ChartsComponents/GenericMultiBarChart";
import { GenericHorizontalBarChart } from "@/shared/BI/ChartsComponents/GenericHorizontalBarChart";
import { GenericLineChart } from "@/shared/BI/ChartsComponents/GenericLineChart";
import { GenericAreaChart } from "@/shared/BI/ChartsComponents/GenericAreaChart";
import { GenericPieChart } from "@/shared/BI/ChartsComponents/GenericPieChart";

// Componentes BI
import { TimeFilterSelector } from "@/shared/BI/components/TimeFilterSelector";
import { ReportGenerator } from "@/shared/BI/components/ReportGenerator";

// Datos y utilidades
import {
    ocupacionData,
    ingresosData,
    reservasData,
    huespedesData,
    serviciosData,
    huespedPorCategoria,
    huespedPorNacionalidad,
    reservasPorCanal,
    reservasPorTipoHabitacion,
    calificacionServicios,
    ingresosPorServicio,
    availableYears,
} from "@/shared/BI/mocks/timeSeriesData";

import {
    TimeFilter,
    transformDataByFilter,
    getCategoryKey,
    getAvailableMonths,
} from "@/shared/BI/utils/dataFilters";

import {
    generateCSVReport,
    generateExcelReport,
    generatePDFReport,
    generateImageReport,
    formatPeriodForFilename,
    prepareDataForExport,
} from "@/shared/BI/utils/reportGenerator";

// KPIs calculados dinámicamente
interface KPIData {
    id: string;
    titulo: string;
    valor: string;
    tendencia: "up" | "down";
    porcentaje: number;
    icono: "ocupacion" | "ingresos" | "reservas" | "satisfaccion";
    gradiente: string;
}

// Componente KPI Card
function KPICard({ kpi }: { kpi: KPIData }) {
    const iconMap = {
        ocupacion: Hotel,
        ingresos: DollarSign,
        reservas: Calendar,
        satisfaccion: Star,
    };
    const Icon = iconMap[kpi.icono];

    return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${kpi.gradiente} p-6 text-white shadow-lg transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-90">{kpi.titulo}</p>
                    <p className="mt-2 text-3xl font-bold">{kpi.valor}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                        {kpi.tendencia === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                        ) : (
                            <TrendingDown className="h-4 w-4" />
                        )}
                        <span className={kpi.tendencia === "up" ? "text-green-200" : "text-red-200"}>
                            {kpi.porcentaje}%
                        </span>
                        <span className="opacity-75">vs período anterior</span>
                    </div>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                    <Icon className="h-8 w-8" />
                </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10" />
        </div>
    );
}

// Sección con título
function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default function BIDashboard() {
    // Estado del filtro temporal global
    const [timeFilter, setTimeFilter] = useState<TimeFilter>({
        granularity: 'month',
        year: 2024,
        month: undefined,
    });

    // Calcular meses disponibles para el año seleccionado
    const availableMonths = useMemo(() => {
        if (timeFilter.year) {
            return getAvailableMonths(ocupacionData, timeFilter.year);
        }
        return [];
    }, [timeFilter.year]);

    // Transformar datos según filtro temporal
    const filteredOcupacionData = useMemo(() => {
        return transformDataByFilter(ocupacionData, timeFilter, ['ocupacion', 'meta']);
    }, [timeFilter]);

    const filteredIngresosData = useMemo(() => {
        return transformDataByFilter(ingresosData, timeFilter, ['ingresos', 'gastos', 'beneficio']);
    }, [timeFilter]);

    const filteredReservasData = useMemo(() => {
        return transformDataByFilter(reservasData, timeFilter, ['confirmadas', 'pendientes', 'canceladas']);
    }, [timeFilter]);

    const filteredHuespedesData = useMemo(() => {
        return transformDataByFilter(huespedesData, timeFilter, ['nuevos', 'recurrentes']);
    }, [timeFilter]);

    const filteredServiciosData = useMemo(() => {
        return transformDataByFilter(serviciosData, timeFilter, ['restaurante', 'spa', 'gimnasio', 'roomService']);
    }, [timeFilter]);

    // Calcular KPIs dinámicamente
    const kpisData = useMemo((): KPIData[] => {
        const ocupacionPromedio = filteredOcupacionData.length > 0
            ? filteredOcupacionData.reduce((sum, item) => sum + item.ocupacion, 0) / filteredOcupacionData.length
            : 0;

        const ingresosTotal = filteredIngresosData.reduce((sum, item) => sum + item.ingresos, 0);
        const reservasTotal = filteredReservasData.reduce((sum, item) => sum + item.confirmadas, 0);

        return [
            {
                id: "ocupacion",
                titulo: "Ocupación Promedio",
                valor: `${ocupacionPromedio.toFixed(1)}%`,
                tendencia: "up",
                porcentaje: 5.2,
                icono: "ocupacion",
                gradiente: "from-blue-500 to-blue-600",
            },
            {
                id: "ingresos",
                titulo: "Ingresos Totales",
                valor: `Bs ${(ingresosTotal / 1000).toFixed(0)}K`,
                tendencia: "up",
                porcentaje: 12.8,
                icono: "ingresos",
                gradiente: "from-green-500 to-green-600",
            },
            {
                id: "reservas",
                titulo: "Reservas Confirmadas",
                valor: reservasTotal.toString(),
                tendencia: "up",
                porcentaje: 8.3,
                icono: "reservas",
                gradiente: "from-purple-500 to-purple-600",
            },
            {
                id: "satisfaccion",
                titulo: "Satisfacción",
                valor: "4.7/5",
                tendencia: "up",
                porcentaje: 2.1,
                icono: "satisfaccion",
                gradiente: "from-amber-500 to-amber-600",
            },
        ];
    }, [filteredOcupacionData, filteredIngresosData, filteredReservasData]);

    // Obtener clave de categoría según granularidad
    const categoryKey = getCategoryKey(timeFilter.granularity);

    // Manejar generación de reportes
    const handleGenerateReport = (format: 'pdf' | 'excel' | 'csv' | 'image') => {
        const periodStr = formatPeriodForFilename(timeFilter);
        const timestamp = new Date().toISOString().split('T')[0];

        switch (format) {
            case 'csv':
                generateCSVReport(
                    filteredOcupacionData,
                    `reporte-ocupacion-${periodStr}-${timestamp}.csv`
                );
                break;
            case 'excel':
                generateExcelReport(
                    filteredIngresosData,
                    `reporte-ingresos-${periodStr}-${timestamp}.json`
                );
                break;
            case 'pdf':
                const reportData = prepareDataForExport(
                    filteredOcupacionData,
                    filteredIngresosData,
                    filteredReservasData,
                    timeFilter
                );
                generatePDFReport(reportData);
                break;
            case 'image':
                generateImageReport('dashboard-content');
                break;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "#" },
                { title: "Business Intelligence", href: "#" },
            ]}
        >
            <Head title="Business Intelligence - Hotel" />

            <div className="py-8 lg:py-12" id="dashboard-content">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                📊 Dashboard de Business Intelligence
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Análisis completo del rendimiento del hotel con datos temporales
                            </p>
                        </div>
                        <ReportGenerator
                            filter={timeFilter}
                            onGenerateReport={handleGenerateReport}
                        />
                    </div>

                    {/* Filtros Temporales */}
                    <TimeFilterSelector
                        filter={timeFilter}
                        onFilterChange={setTimeFilter}
                        availableYears={availableYears}
                        availableMonths={availableMonths}
                    />

                    {/* KPIs */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {kpisData.map((kpi) => (
                            <KPICard key={kpi.id} kpi={kpi} />
                        ))}
                    </div>

                    {/* Sección: Ocupación */}
                    <Section title="Análisis de Ocupación" icon={Hotel}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericLineChart
                                data={filteredOcupacionData}
                                lines={[
                                    { dataKey: "ocupacion", stroke: "#667eea", name: "Ocupación %" },
                                    { dataKey: "meta", stroke: "#10b981", name: "Meta %", strokeDasharray: "5 5" },
                                ]}
                                categoryKey={categoryKey}
                                title="Tasa de Ocupación"
                                description="Ocupación real vs meta establecida"
                                delay={0}
                            />

                            <GenericAreaChart
                                data={filteredOcupacionData}
                                areas={[
                                    { dataKey: "ocupacion", stroke: "#667eea", fill: "#667eea", name: "Ocupación" },
                                    { dataKey: "meta", stroke: "#10b981", fill: "#10b981", name: "Meta" },
                                ]}
                                categoryKey={categoryKey}
                                title="Tendencia de Ocupación"
                                description="Evolución temporal de la ocupación"
                                stacked={false}
                                delay={100}
                            />
                        </div>
                    </Section>

                    {/* Sección: Ingresos */}
                    <Section title="Análisis Financiero" icon={DollarSign}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericMultiBarChart
                                data={filteredIngresosData}
                                bars={[
                                    { dataKey: "ingresos", fill: "#667eea", name: "Ingresos" },
                                    { dataKey: "gastos", fill: "#ef4444", name: "Gastos" },
                                    { dataKey: "beneficio", fill: "#10b981", name: "Beneficio" },
                                ]}
                                categoryKey={categoryKey}
                                title="Ingresos vs Gastos"
                                description="Comparativa financiera"
                                delay={200}
                            />

                            <GenericLineChart
                                data={filteredIngresosData}
                                lines={[
                                    { dataKey: "ingresos", stroke: "#667eea", name: "Ingresos" },
                                    { dataKey: "beneficio", stroke: "#10b981", name: "Beneficio" },
                                ]}
                                categoryKey={categoryKey}
                                title="Evolución de Ingresos"
                                description="Tendencia de ingresos y beneficios"
                                delay={300}
                            />
                        </div>
                    </Section>

                    {/* Sección: Huéspedes */}
                    <Section title="Análisis de Huéspedes" icon={Users}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <GenericPieChart
                                data={huespedPorCategoria}
                                dataKey="cantidad"
                                nameKey="categoria"
                                title="Por Categoría"
                                description="Distribución de huéspedes"
                                delay={400}
                            />

                            <GenericPieChart
                                data={huespedPorNacionalidad}
                                dataKey="cantidad"
                                nameKey="pais"
                                title="Por Nacionalidad"
                                description="Origen de los huéspedes"
                                innerRadius={50}
                                outerRadius={100}
                                delay={500}
                            />

                            <GenericMultiBarChart
                                data={filteredHuespedesData}
                                bars={[
                                    { dataKey: "nuevos", fill: "#667eea", name: "Nuevos" },
                                    { dataKey: "recurrentes", fill: "#10b981", name: "Recurrentes" },
                                ]}
                                categoryKey={categoryKey}
                                title="Evolución Temporal"
                                description="Nuevos vs recurrentes"
                                delay={600}
                            />
                        </div>
                    </Section>

                    {/* Sección: Reservas */}
                    <Section title="Análisis de Reservas" icon={Calendar}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericAreaChart
                                data={filteredReservasData}
                                areas={[
                                    { dataKey: "confirmadas", stroke: "#10b981", fill: "#10b981", name: "Confirmadas" },
                                    { dataKey: "pendientes", stroke: "#f59e0b", fill: "#f59e0b", name: "Pendientes" },
                                    { dataKey: "canceladas", stroke: "#ef4444", fill: "#ef4444", name: "Canceladas" },
                                ]}
                                categoryKey={categoryKey}
                                title="Estado de Reservas"
                                description="Evolución por estado"
                                delay={700}
                            />

                            <GenericPieChart
                                data={reservasPorCanal}
                                dataKey="reservas"
                                nameKey="canal"
                                title="Canales de Reserva"
                                description="Distribución por origen"
                                delay={800}
                            />
                        </div>

                        <div className="mt-6">
                            <GenericHorizontalBarChart
                                data={reservasPorTipoHabitacion}
                                bars={[
                                    { dataKey: "reservas", fill: "#667eea", name: "Reservas" },
                                    { dataKey: "ingresoPromedio", fill: "#10b981", name: "Ingreso Promedio (Bs)" },
                                ]}
                                categoryKey="tipo"
                                title="Reservas por Tipo de Habitación"
                                description="Cantidad de reservas e ingreso promedio (datos acumulados)"
                                delay={900}
                            />
                        </div>
                    </Section>

                    {/* Sección: Servicios */}
                    <Section title="Análisis de Servicios" icon={Activity}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericBarChart
                                data={calificacionServicios}
                                dataKey="calificacion"
                                categoryKey="servicio"
                                title="Calificación de Servicios"
                                description="Puntuación promedio (1-5)"
                                color="#667eea"
                                delay={1000}
                            />

                            <GenericMultiBarChart
                                data={filteredServiciosData}
                                bars={[
                                    { dataKey: "restaurante", fill: "#667eea", name: "Restaurante" },
                                    { dataKey: "spa", fill: "#10b981", name: "Spa" },
                                    { dataKey: "gimnasio", fill: "#f59e0b", name: "Gimnasio" },
                                    { dataKey: "roomService", fill: "#ef4444", name: "Room Service" },
                                ]}
                                categoryKey={categoryKey}
                                title="Uso de Servicios Temporal"
                                description="Evolución del uso de servicios"
                                delay={1100}
                            />
                        </div>

                        <div className="mt-6">
                            <GenericHorizontalBarChart
                                data={ingresosPorServicio}
                                bars={[
                                    { dataKey: "ingresos", fill: "#667eea", name: "Ingresos (Bs)" },
                                ]}
                                categoryKey="servicio"
                                title="Ingresos por Servicio"
                                description="Ingresos generados por cada servicio (datos acumulados)"
                                delay={1200}
                            />
                        </div>
                    </Section>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 py-4">
                        <p>
                            📊 Dashboard con datos de {availableYears[0]} a {availableYears[availableYears.length - 1]} |
                            Última actualización: {new Date().toLocaleString("es-ES")}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}