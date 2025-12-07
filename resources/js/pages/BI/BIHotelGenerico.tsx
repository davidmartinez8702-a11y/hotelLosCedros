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

export default function BIHotelGenerico() {
    const [periodo, setPeriodo] = useState("mes");
    const [periodoCheckins, setPeriodoCheckins] = useState("hoy");

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: "#" },
                { title: "Business Intelligence", href: "#" },
            ]}
        >
            <Head title="Business Intelligence - Hotel Genérico" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <BIHeader
                        title="Business Intelligence Dashboard"
                        subtitle="Análisis y métricas del hotel - Actualizado al 7 de Diciembre, 2024"
                        tip="📊 Visualizaciones interactivas con componentes genéricos reutilizables"
                    />

                    {/* KPIs */}
                    <KPICards data={kpisData} />

                    <Separator className="my-8" />

                    {/* Gráficas principales - Fila 1: Bar Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GenericMultiBarChart
                            data={serviciosUsoData}
                            bars={serviciosBarsConfig}
                            categoryKey="servicio"
                            title="Uso de Servicios"
                            description="Cantidad de usos e ingresos por servicio"
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={0}
                        />

                        <GenericHorizontalBarChart
                            data={rankingHabitacionesData}
                            bars={rankingBarsConfig}
                            categoryKey="tipo"
                            title="Ranking de Habitaciones"
                            description="Reservas e ingresos por tipo de habitación"
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={100}
                        />
                    </div>

                    {/* Gráficas - Fila 2: Line & Pie Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GenericLineChart
                            data={prediccionDemandaData}
                            lines={prediccionLinesConfig}
                            categoryKey="mes"
                            title="Predicción de Demanda"
                            description="Demanda real vs predicción y rangos esperados"
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={200}
                        />

                        <GenericPieChart
                            data={origenHuespedesData}
                            dataKey="cantidad"
                            nameKey="origen"
                            title="Origen de Huéspedes"
                            description="Distribución geográfica de huéspedes"
                            innerRadius={65}
                            outerRadius={110}
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={300}
                        />
                    </div>

                    {/* Gráficas - Fila 3: Area Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GenericAreaChart
                            data={flujoReservasData}
                            areas={flujoAreasConfig}
                            categoryKey="semana"
                            title="Flujo de Reservas"
                            description="Nuevas, modificadas y canceladas por semana"
                            stacked={true}
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={400}
                        />

                        <GenericAreaChart
                            data={flujoIngresosData}
                            areas={flujoIngresosAreasConfig}
                            categoryKey="semana"
                            title="Flujo de Ingresos"
                            description="Ingresos por categoría semanal (Bs)"
                            stacked={true}
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={420}
                        />
                    </div>

                    {/* Gráficas - Fila 4: Check-ins/Check-outs y Comentarios */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GenericMultiBarChart
                            data={checkinsCheckoutsData}
                            bars={checkinsCheckoutsBarsConfig}
                            categoryKey="hora"
                            title="Check-ins y Check-outs"
                            description="Flujo de entrada y salida de huéspedes"
                            filterOptions={checkinsFilterOptions}
                            filterValue={periodoCheckins}
                            onFilterChange={setPeriodoCheckins}
                            delay={450}
                        />

                        <GenericPieChart
                            data={comentariosData}
                            dataKey="cantidad"
                            nameKey="categoria"
                            title="Rendimiento de Comentarios"
                            description="Distribución de calificaciones de huéspedes"
                            innerRadius={65}
                            outerRadius={110}
                            delay={470}
                        />
                    </div>

                    {/* Gráficas - Fila 5: Multi-Bar Chart */}
                    <div className="grid grid-cols-1 gap-6">
                        <GenericMultiBarChart
                            data={analisisFinancieroData}
                            bars={financieroBarsConfig}
                            categoryKey="categoria"
                            title="Análisis Financiero por Categoría"
                            description="Ingresos, gastos, utilidad y proyección"
                            filterOptions={periodoFilterOptions}
                            filterValue={periodo}
                            onFilterChange={setPeriodo}
                            delay={500}
                        />
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
