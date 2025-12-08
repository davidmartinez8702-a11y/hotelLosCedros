import { useState } from "react";
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

// Datos
import {
    periodoFilterOptions,
    ocupacionMensual,
    ocupacionSemanal,
    ingresosMensuales,
    ingresosSemanales,
    huespedPorCategoria,
    huespedPorNacionalidad,
    huespedMensuales,
    reservasPorEstado,
    reservasPorCanal,
    reservasPorTipoHabitacion,
    calificacionServicios,
    usoServiciosMensual,
    ingresosPorServicio,
    comparativaAnual,
    prediccionesOcupacion,
    kpisData,
} from "./data";

// Componente KPI Card
function KPICard({ kpi }: { kpi: typeof kpisData[0] }) {
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
                        <span className="opacity-75">vs mes anterior</span>
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
    // Estados de filtros
    const [periodoOcupacion, setPeriodoOcupacion] = useState("mes");
    const [periodoIngresos, setPeriodoIngresos] = useState("mes");
    const [periodoReservas, setPeriodoReservas] = useState("mes");
    const [periodoServicios, setPeriodoServicios] = useState("mes");

    // Seleccionar datos según filtro
    const ocupacionData = periodoOcupacion === "semana" ? ocupacionSemanal : ocupacionMensual;
    const ocupacionCategoryKey = periodoOcupacion === "semana" ? "semana" : "mes";
    
    const ingresosData = periodoIngresos === "semana" ? ingresosSemanales : ingresosMensuales;
    const ingresosCategoryKey = periodoIngresos === "semana" ? "semana" : "mes";

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "#" },
                { title: "Business Intelligence", href: "#" },
            ]}
        >
            <Head title="Business Intelligence - Hotel" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            📊 Dashboard de Business Intelligence
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Análisis completo del rendimiento del hotel
                        </p>
                    </div>

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
                                data={ocupacionData}
                                lines={[
                                    { dataKey: "ocupacion", stroke: "#667eea", name: "Ocupación %" },
                                    { dataKey: "meta", stroke: "#10b981", name: "Meta %", strokeDasharray: "5 5" },
                                ]}
                                categoryKey={ocupacionCategoryKey}
                                title="Tasa de Ocupación"
                                description="Ocupación real vs meta establecida"
                                filterOptions={periodoFilterOptions}
                                filterValue={periodoOcupacion}
                                onFilterChange={setPeriodoOcupacion}
                                delay={0}
                            />

                            <GenericAreaChart
                                data={prediccionesOcupacion}
                                areas={[
                                    { dataKey: "maximo", stroke: "#10b981", fill: "#10b981", name: "Máximo", stackId: "1" },
                                    { dataKey: "prediccion", stroke: "#667eea", fill: "#667eea", name: "Predicción", stackId: "2" },
                                    { dataKey: "minimo", stroke: "#f59e0b", fill: "#f59e0b", name: "Mínimo", stackId: "3" },
                                ]}
                                categoryKey="fecha"
                                title="Predicción de Ocupación"
                                description="Proyección para las próximas semanas"
                                stacked={false}
                                delay={100}
                            />
                        </div>
                    </Section>

                    {/* Sección: Ingresos */}
                    <Section title="Análisis Financiero" icon={DollarSign}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericMultiBarChart
                                data={ingresosData}
                                bars={[
                                    { dataKey: "ingresos", fill: "#667eea", name: "Ingresos" },
                                    { dataKey: "gastos", fill: "#ef4444", name: "Gastos" },
                                    { dataKey: "beneficio", fill: "#10b981", name: "Beneficio" },
                                ]}
                                categoryKey={ingresosCategoryKey}
                                title="Ingresos vs Gastos"
                                description="Comparativa financiera mensual"
                                filterOptions={periodoFilterOptions}
                                filterValue={periodoIngresos}
                                onFilterChange={setPeriodoIngresos}
                                delay={200}
                            />

                            <GenericLineChart
                                data={comparativaAnual}
                                lines={[
                                    { dataKey: "añoAnterior", stroke: "#9ca3af", name: "2023", strokeDasharray: "5 5" },
                                    { dataKey: "añoActual", stroke: "#667eea", name: "2024" },
                                ]}
                                categoryKey="mes"
                                title="Comparativa Anual"
                                description="Ingresos 2024 vs 2023"
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
                                data={huespedMensuales}
                                bars={[
                                    { dataKey: "nuevos", fill: "#667eea", name: "Nuevos" },
                                    { dataKey: "recurrentes", fill: "#10b981", name: "Recurrentes" },
                                ]}
                                categoryKey="mes"
                                title="Evolución Mensual"
                                description="Nuevos vs recurrentes"
                                delay={600}
                            />
                        </div>
                    </Section>

                    {/* Sección: Reservas */}
                    <Section title="Análisis de Reservas" icon={Calendar}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenericAreaChart
                                data={reservasPorEstado}
                                areas={[
                                    { dataKey: "confirmadas", stroke: "#10b981", fill: "#10b981", name: "Confirmadas" },
                                    { dataKey: "pendientes", stroke: "#f59e0b", fill: "#f59e0b", name: "Pendientes" },
                                    { dataKey: "canceladas", stroke: "#ef4444", fill: "#ef4444", name: "Canceladas" },
                                ]}
                                categoryKey="mes"
                                title="Estado de Reservas"
                                description="Evolución mensual por estado"
                                filterOptions={periodoFilterOptions}
                                filterValue={periodoReservas}
                                onFilterChange={setPeriodoReservas}
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
                                    { dataKey: "ingresoPromedio", fill: "#10b981", name: "Ingreso Promedio ($)" },
                                ]}
                                categoryKey="tipo"
                                title="Reservas por Tipo de Habitación"
                                description="Cantidad de reservas e ingreso promedio"
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
                                data={usoServiciosMensual}
                                bars={[
                                    { dataKey: "restaurante", fill: "#667eea", name: "Restaurante" },
                                    { dataKey: "spa", fill: "#10b981", name: "Spa" },
                                    { dataKey: "gimnasio", fill: "#f59e0b", name: "Gimnasio" },
                                    { dataKey: "roomService", fill: "#ef4444", name: "Room Service" },
                                ]}
                                categoryKey="mes"
                                title="Uso de Servicios"
                                description="Cantidad de usos mensuales"
                                filterOptions={periodoFilterOptions}
                                filterValue={periodoServicios}
                                onFilterChange={setPeriodoServicios}
                                delay={1100}
                            />
                        </div>

                        <div className="mt-6">
                            <GenericHorizontalBarChart
                                data={ingresosPorServicio}
                                bars={[
                                    { dataKey: "ingresos", fill: "#667eea", name: "Ingresos ($)" },
                                ]}
                                categoryKey="servicio"
                                title="Ingresos por Servicio"
                                description="Ingresos generados por cada servicio"
                                delay={1200}
                            />
                        </div>
                    </Section>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 py-4">
                        <p>
                            📊 Dashboard actualizado automáticamente cada 5 minutos |
                            Última actualización: {new Date().toLocaleString("es-ES")}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}