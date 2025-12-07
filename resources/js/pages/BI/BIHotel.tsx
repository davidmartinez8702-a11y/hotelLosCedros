import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Componentes BI
import { BIHeader } from "@/shared/BI/components/BIHeader";
import { KPICards } from "@/shared/BI/components/KPICards";

// Gráficos
import { OcupacionChart } from "@/shared/BI/charts/OcupacionChart";
import { IngresosChart } from "@/shared/BI/charts/IngresosChart";
import { HuespedesChart } from "@/shared/BI/charts/HuespedesChart";
import { ReservasChart } from "@/shared/BI/charts/ReservasChart";
import { ServiciosChart } from "@/shared/BI/charts/ServiciosChart";
import { TiposReservaChart } from "@/shared/BI/charts/TiposReservaChart";
import { ComparativaAnualChart } from "@/shared/BI/charts/ComparativaAnualChart";
import { CheckinsChart } from "@/shared/BI/charts/CheckinsChart";
import { CanalesChart } from "@/shared/BI/charts/CanalesChart";
import { PrediccionesChart } from "@/shared/BI/charts/PrediccionesChart";

// Types
import { KPIData } from "@/shared/BI/mocks/types";

// Mock Data
import {
  ocupacionData2024,
  ocupacionData2023,
  ocupacionFilterOptions,
  ingresosMensual,
  ingresosSemanal,
  ingresosFilterOptions,
  huespedesDataDiciembre,
  huespedesDataNoviembre,
  huespedesDataOctubre,
  huespedesData2023,
  huespedesDataQ1,
  huespedesDataQ2,
  huespedesDataQ3,
  huespedesDataQ4,
  huespedesFilterOptions,
  reservasDataDiciembre,
  reservasDataNoviembre,
  reservasFilterOptions,
  serviciosData,
  serviciosFilterOptions,
  tiposReservaDataDiciembre,
  tiposReservaDataNoviembre,
  tiposReservaDataOctubre,
  tiposReservaData2023,
  tiposReservaDataQ1,
  tiposReservaDataQ2,
  tiposReservaDataQ3,
  tiposReservaDataQ4,
  tiposReservaFilterOptions,
  comparativaAnualData,
  comparativaFilterOptions,
  checkinsData,
  checkinsFilterOptions,
  canalesData,
  canalesFilterOptions,
  prediccionesData,
  prediccionesFilterOptions,
} from "@/shared/BI/mocks";

// Data KPIs
const kpiData: KPIData[] = [
  {
    id: "ocupacion",
    titulo: "Ocupación Actual",
    valor: "90%",
    tendencia: "+5% vs mes anterior",
    porcentaje: 5,
    icono: "ocupacion",
    gradiente: "from-blue-500 to-cyan-600",
  },
  {
    id: "ingresos",
    titulo: "Ingresos Totales",
    valor: "Bs 568K",
    tendencia: "+12% vs mes anterior",
    porcentaje: 12,
    icono: "ingresos",
    gradiente: "from-emerald-500 to-teal-600",
  },
  {
    id: "reservas",
    titulo: "Reservas Activas",
    valor: "95",
    tendencia: "+8% vs mes anterior",
    porcentaje: 8,
    icono: "reservas",
    gradiente: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "satisfaccion",
    titulo: "Satisfacción",
    valor: "4.7",
    tendencia: "de 5.0 estrellas",
    icono: "satisfaccion",
    gradiente: "from-amber-500 to-rose-600",
  },
];

// Data Resumen
const resumenData = [
  { valor: "156", label: "Total Check-ins", gradiente: "from-blue-50 to-cyan-50", color: "text-blue-600" },
  { valor: "148", label: "Total Check-outs", gradiente: "from-green-50 to-emerald-50", color: "text-green-600" },
  { valor: "3.2", label: "Noches Promedio", gradiente: "from-purple-50 to-fuchsia-50", color: "text-purple-600" },
  { valor: "Bs 850", label: "Tarifa Promedio", gradiente: "from-amber-50 to-orange-50", color: "text-amber-600" },
  { valor: "12", label: "Cancelaciones", gradiente: "from-rose-50 to-pink-50", color: "text-rose-600" },
  { valor: "92%", label: "Tasa Conversión", gradiente: "from-teal-50 to-cyan-50", color: "text-teal-600" },
];

export default function BIHotel() {
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
          <BIHeader
            title="Business Intelligence Dashboard"
            subtitle="Análisis y métricas del hotel - Actualizado al 7 de Diciembre, 2024"
            tip="📊 Visualizaciones interactivas con datos en tiempo real"
          />

          {/* KPIs */}
          <KPICards data={kpiData} />

          <Separator className="my-8" />

          {/* Gráficas principales - Fila 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OcupacionChart
              data2024={ocupacionData2024}
              data2023={ocupacionData2023}
              filterOptions={ocupacionFilterOptions}
            />
            <IngresosChart
              dataMensual={ingresosMensual}
              dataSemanal={ingresosSemanal}
              filterOptions={ingresosFilterOptions}
            />
          </div>

          {/* Gráficas - Fila 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HuespedesChart
              dataDiciembre={huespedesDataDiciembre}
              dataNoviembre={huespedesDataNoviembre}
              dataOctubre={huespedesDataOctubre}
              data2023={huespedesData2023}
              dataQ1={huespedesDataQ1}
              dataQ2={huespedesDataQ2}
              dataQ3={huespedesDataQ3}
              dataQ4={huespedesDataQ4}
              filterOptions={huespedesFilterOptions}
            />
            <ReservasChart
              dataDiciembre={reservasDataDiciembre}
              dataNoviembre={reservasDataNoviembre}
              filterOptions={reservasFilterOptions}
            />
          </div>

          {/* Gráficas - Fila 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiciosChart
              data={serviciosData}
              filterOptions={serviciosFilterOptions}
            />
            <TiposReservaChart
              dataDiciembre={tiposReservaDataDiciembre}
              dataNoviembre={tiposReservaDataNoviembre}
              dataOctubre={tiposReservaDataOctubre}
              data2023={tiposReservaData2023}
              dataQ1={tiposReservaDataQ1}
              dataQ2={tiposReservaDataQ2}
              dataQ3={tiposReservaDataQ3}
              dataQ4={tiposReservaDataQ4}
              filterOptions={tiposReservaFilterOptions}
            />
          </div>

          {/* Gráficas secundarias - Fila 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ComparativaAnualChart
              data={comparativaAnualData}
              filterOptions={comparativaFilterOptions}
            />
            <CheckinsChart
              data={checkinsData}
              filterOptions={checkinsFilterOptions}
            />
            <CanalesChart
              data={canalesData}
              filterOptions={canalesFilterOptions}
            />
          </div>

          {/* Gráfica de Predicciones - Fila 5 */}
          <div className="grid grid-cols-1 gap-6">
            <PrediccionesChart
              data={prediccionesData}
              filterOptions={prediccionesFilterOptions}
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
              📊 Dashboard actualizado automáticamente cada 5 minutos |
              Última actualización: {new Date().toLocaleString("es-ES")}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}