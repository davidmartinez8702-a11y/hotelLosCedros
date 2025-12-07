import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Users, DollarSign, BedDouble, Star, Calendar } from "lucide-react";

export default function BIHotelRecharts() {
  const [periodoOcupacion, setPeriodoOcupacion] = useState("2024");
  const [periodoIngresos, setPeriodoIngresos] = useState("mensual");
  const [mesSeleccionado, setMesSeleccionado] = useState("diciembre");

  // Data estática para ocupación mensual
  const ocupacionData2024 = [
    { mes: "Ene", ocupacion: 75, meta: 80 },
    { mes: "Feb", ocupacion: 82, meta: 80 },
    { mes: "Mar", ocupacion: 88, meta: 85 },
    { mes: "Abr", ocupacion: 91, meta: 85 },
    { mes: "May", ocupacion: 85, meta: 85 },
    { mes: "Jun", ocupacion: 93, meta: 90 },
    { mes: "Jul", ocupacion: 97, meta: 95 },
    { mes: "Ago", ocupacion: 95, meta: 95 },
    { mes: "Sep", ocupacion: 87, meta: 85 },
    { mes: "Oct", ocupacion: 84, meta: 85 },
    { mes: "Nov", ocupacion: 79, meta: 80 },
    { mes: "Dic", ocupacion: 90, meta: 90 },
  ];

  const ocupacionData2023 = [
    { mes: "Ene", ocupacion: 68, meta: 75 },
    { mes: "Feb", ocupacion: 72, meta: 75 },
    { mes: "Mar", ocupacion: 78, meta: 80 },
    { mes: "Abr", ocupacion: 81, meta: 80 },
    { mes: "May", ocupacion: 75, meta: 80 },
    { mes: "Jun", ocupacion: 83, meta: 85 },
    { mes: "Jul", ocupacion: 89, meta: 90 },
    { mes: "Ago", ocupacion: 87, meta: 90 },
    { mes: "Sep", ocupacion: 79, meta: 80 },
    { mes: "Oct", ocupacion: 76, meta: 80 },
    { mes: "Nov", ocupacion: 71, meta: 75 },
    { mes: "Dic", ocupacion: 82, meta: 85 },
  ];

  const ocupacionData = periodoOcupacion === "2024" ? ocupacionData2024 : ocupacionData2023;

  // Data para ingresos con múltiples series
  const ingresosMensual = [
    { tipo: "Suite Presidencial", ingresos: 125000, gastos: 45000 },
    { tipo: "Suite Deluxe", ingresos: 98000, gastos: 38000 },
    { tipo: "Habitación Estándar", ingresos: 156000, gastos: 62000 },
    { tipo: "Habitación Familiar", ingresos: 87000, gastos: 35000 },
    { tipo: "Habitación Ejecutiva", ingresos: 102000, gastos: 41000 },
  ];

  const ingresosSemanal = [
    { tipo: "Suite Presidencial", ingresos: 28750, gastos: 10350 },
    { tipo: "Suite Deluxe", ingresos: 22540, gastos: 8740 },
    { tipo: "Habitación Estándar", ingresos: 35880, gastos: 14260 },
    { tipo: "Habitación Familiar", ingresos: 20010, gastos: 8050 },
    { tipo: "Habitación Ejecutiva", ingresos: 23460, gastos: 9430 },
  ];

  const ingresosData = periodoIngresos === "mensual" ? ingresosMensual : ingresosSemanal;

  // Data para distribución de huéspedes
  const huespedesData = [
    { categoria: "Negocios", valor: 35, fill: "#667eea" },
    { categoria: "Turismo", valor: 45, fill: "#764ba2" },
    { categoria: "Eventos", valor: 12, fill: "#f093fb" },
    { categoria: "Otros", valor: 8, fill: "#4facfe" },
  ];

  // Data para reservas con área apilada
  const reservasData = [
    { fecha: "01-Dic", confirmadas: 45, pendientes: 8, canceladas: 3 },
    { fecha: "03-Dic", confirmadas: 52, pendientes: 6, canceladas: 5 },
    { fecha: "05-Dic", confirmadas: 48, pendientes: 10, canceladas: 2 },
    { fecha: "07-Dic", confirmadas: 61, pendientes: 7, canceladas: 4 },
    { fecha: "09-Dic", confirmadas: 55, pendientes: 9, canceladas: 6 },
    { fecha: "11-Dic", confirmadas: 67, pendientes: 5, canceladas: 3 },
    { fecha: "13-Dic", confirmadas: 73, pendientes: 8, canceladas: 7 },
    { fecha: "15-Dic", confirmadas: 69, pendientes: 11, canceladas: 4 },
    { fecha: "17-Dic", confirmadas: 78, pendientes: 6, canceladas: 5 },
    { fecha: "19-Dic", confirmadas: 82, pendientes: 7, canceladas: 3 },
    { fecha: "21-Dic", confirmadas: 88, pendientes: 4, canceladas: 8 },
    { fecha: "23-Dic", confirmadas: 95, pendientes: 9, canceladas: 4 },
  ];

  // Data para radar de servicios
  const serviciosData = [
    { servicio: "Limpieza", calificacion: 95, promedio: 85 },
    { servicio: "Atención", calificacion: 92, promedio: 88 },
    { servicio: "Comida", calificacion: 88, promedio: 82 },
    { servicio: "Instalaciones", calificacion: 90, promedio: 86 },
    { servicio: "Ubicación", calificacion: 96, promedio: 90 },
    { servicio: "Precio", calificacion: 85, promedio: 80 },
  ];

  // Data para tipos de reserva
  const tiposReservaData = [
    { tipo: "Viaje de Negocios", cantidad: 28, fill: "#667eea" },
    { tipo: "Viaje Familiar", cantidad: 35, fill: "#764ba2" },
    { tipo: "Luna de Miel", cantidad: 15, fill: "#f093fb" },
    { tipo: "Turismo Individual", cantidad: 12, fill: "#4facfe" },
    { tipo: "Evento/Conferencia", cantidad: 7, fill: "#43e97b" },
    { tipo: "Escapada Romántica", cantidad: 3, fill: "#fa709a" },
  ];

  // Colores para gráficas
  const COLORS = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b", "#fa709a"];
  const GRADIENT_COLORS = {
    primary: "url(#colorPrimary)",
    secondary: "url(#colorSecondary)",
    success: "url(#colorSuccess)",
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              {entry.name.includes('ocupacion') || entry.name.includes('meta') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Label personalizado para Pie
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "#" },
        { title: "Business Intelligence - Recharts", href: "#" },
      ]}
    >
      <Head title="Business Intelligence - Hotel (Recharts)" />

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Header con gradiente */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-2">
                Business Intelligence Dashboard
              </h1>
              <p className="text-purple-100 text-lg">
                Análisis y métricas del hotel con Recharts - Actualizado al 7 de Diciembre, 2024
              </p>
              <p className="text-purple-200 text-sm mt-2">
                📊 Visualizaciones interactivas con datos en tiempo real
              </p>
            </div>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
          </div>

          {/* KPIs con gradientes animados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white overflow-hidden relative hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Ocupación Actual
                  </CardTitle>
                  <BedDouble className="h-8 w-8 text-white/80" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+5% vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden relative hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Ingresos Totales
                  </CardTitle>
                  <DollarSign className="h-8 w-8 text-white/80" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold mb-2">Bs 568K</div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white overflow-hidden relative hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Reservas Activas
                  </CardTitle>
                  <Users className="h-8 w-8 text-white/80" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold mb-2">95</div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8% vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-rose-600 text-white overflow-hidden relative hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white/90 text-sm font-medium">
                    Satisfacción
                  </CardTitle>
                  <Star className="h-8 w-8 text-white/80" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold mb-2">4.7</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>de 5.0 estrellas</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Gráficas principales con selectores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfica de Ocupación con Meta */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Tasa de Ocupación vs Meta</CardTitle>
                    <CardDescription className="mt-2">
                      Comparativa de ocupación real contra objetivos mensuales
                    </CardDescription>
                  </div>
                  <Select value={periodoOcupacion} onValueChange={setPeriodoOcupacion}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Seleccionar año" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ocupacionData}>
                    <defs>
                      <linearGradient id="colorOcupacion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#764ba2" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="mes"
                      tick={{ fontSize: 11, fontWeight: 500 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      label={{ value: "Ocupación (%)", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
                      domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Line
                      type="monotone"
                      dataKey="ocupacion"
                      stroke="#667eea"
                      strokeWidth={3}
                      dot={{ fill: "#667eea", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Ocupación Real"
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#ef4444", r: 4 }}
                      name="Meta"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfica de Ingresos vs Gastos */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Ingresos vs Gastos</CardTitle>
                    <CardDescription className="mt-2">
                      Comparativa por tipo de habitación
                    </CardDescription>
                  </div>
                  <Select value={periodoIngresos} onValueChange={setPeriodoIngresos}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ingresosData}>
                    <defs>
                      <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="tipo"
                      tick={{ fontSize: 10, fontWeight: 500 }}
                      angle={-35}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) => `Bs ${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                    <Bar dataKey="ingresos" fill="url(#colorIngresos)" radius={[8, 8, 0, 0]} name="Ingresos" />
                    <Bar dataKey="gastos" fill="url(#colorGastos)" radius={[8, 8, 0, 0]} name="Gastos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfica de Distribución de Huéspedes */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Distribución de Huéspedes</CardTitle>
                    <CardDescription className="mt-2">
                      Segmentación por categoría de viaje
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Diciembre 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={huespedesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="valor"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {huespedesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value, entry: any) => (
                        <span className="text-sm font-medium">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfica de Reservas con Áreas Apiladas */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-300 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div>
                  <CardTitle className="text-2xl">Estado de Reservas</CardTitle>
                  <CardDescription className="mt-2">
                    Tendencia de reservas por estado (Diciembre 2024)
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={reservasData}>
                    <defs>
                      <linearGradient id="colorConfirmadas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorPendientes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorCanceladas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="fecha"
                      tick={{ fontSize: 10, fontWeight: 500 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Area
                      type="monotone"
                      dataKey="confirmadas"
                      stackId="1"
                      stroke="#667eea"
                      fill="url(#colorConfirmadas)"
                      name="Confirmadas"
                    />
                    <Area
                      type="monotone"
                      dataKey="pendientes"
                      stackId="1"
                      stroke="#fbbf24"
                      fill="url(#colorPendientes)"
                      name="Pendientes"
                    />
                    <Area
                      type="monotone"
                      dataKey="canceladas"
                      stackId="1"
                      stroke="#ef4444"
                      fill="url(#colorCanceladas)"
                      name="Canceladas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfica Radar de Calificación de Servicios */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-400 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Calificación de Servicios</CardTitle>
                    <CardDescription className="mt-2">
                      Evaluación comparativa vs promedio del sector
                    </CardDescription>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={serviciosData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                      dataKey="servicio"
                      tick={{ fontSize: 11, fontWeight: 500, fill: "#374151" }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                    />
                    <Radar
                      name="Nuestro Hotel"
                      dataKey="calificacion"
                      stroke="#667eea"
                      fill="#667eea"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Promedio Sector"
                      dataKey="promedio"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      strokeDasharray="4 4"
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            

            {/* Gráfica de Tipos de Reserva */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-500 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Tipos de Reserva</CardTitle>
                    <CardDescription className="mt-2">
                      Distribución por motivo de viaje
                    </CardDescription>
                  </div>
                  <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diciembre">Diciembre</SelectItem>
                      <SelectItem value="noviembre">Noviembre</SelectItem>
                      <SelectItem value="octubre">Octubre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tiposReservaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="cantidad"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {tiposReservaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value, entry: any) => (
                        <span className="text-sm font-medium">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sección adicional de métricas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Comparativa Anual */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-600 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Comparativa Anual</CardTitle>
                <CardDescription>Ingresos 2024 vs 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { mes: "Q1", actual: 380000, anterior: 320000 },
                      { mes: "Q2", actual: 420000, anterior: 350000 },
                      { mes: "Q3", actual: 480000, anterior: 410000 },
                      { mes: "Q4", actual: 520000, anterior: 450000 },
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                    <YAxis dataKey="mes" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="actual" fill="#667eea" radius={[0, 4, 4, 0]} name="2024" />
                    <Bar dataKey="anterior" fill="#d1d5db" radius={[0, 4, 4, 0]} name="2023" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Check-ins por Hora */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-700 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Check-ins por Hora</CardTitle>
                <CardDescription>Distribución horaria típica</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={[
                      { hora: "08:00", checkins: 5 },
                      { hora: "10:00", checkins: 12 },
                      { hora: "12:00", checkins: 25 },
                      { hora: "14:00", checkins: 45 },
                      { hora: "16:00", checkins: 38 },
                      { hora: "18:00", checkins: 22 },
                      { hora: "20:00", checkins: 15 },
                      { hora: "22:00", checkins: 8 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorCheckins" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hora" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="checkins"
                      stroke="#10b981"
                      fill="url(#colorCheckins)"
                      name="Check-ins"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Canales de Reserva */}
            <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-800 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Canales de Reserva</CardTitle>
                <CardDescription>Origen de las reservaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { canal: "Web Directa", reservas: 45, fill: "#667eea" },
                      { canal: "Booking", reservas: 28, fill: "#f59e0b" },
                      { canal: "Expedia", reservas: 15, fill: "#10b981" },
                      { canal: "Teléfono", reservas: 8, fill: "#ef4444" },
                      { canal: "Walk-in", reservas: 4, fill: "#8b5cf6" },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="canal" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reservas" radius={[4, 4, 0, 0]} name="Reservas">
                      {[
                        { canal: "Web Directa", reservas: 45, fill: "#667eea" },
                        { canal: "Booking", reservas: 28, fill: "#f59e0b" },
                        { canal: "Expedia", reservas: 15, fill: "#10b981" },
                        { canal: "Teléfono", reservas: 8, fill: "#ef4444" },
                        { canal: "Walk-in", reservas: 4, fill: "#8b5cf6" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabla Resumen */}
          <Card className="shadow-lg animate-in slide-in-from-bottom duration-700 delay-900 hover:shadow-xl transition-shadow">
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
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">156</p>
                  <p className="text-sm text-gray-600 mt-1">Total Check-ins</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">148</p>
                  <p className="text-sm text-gray-600 mt-1">Total Check-outs</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">3.2</p>
                  <p className="text-sm text-gray-600 mt-1">Noches Promedio</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                  <p className="text-3xl font-bold text-amber-600">Bs 850</p>
                  <p className="text-sm text-gray-600 mt-1">Tarifa Promedio</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg">
                  <p className="text-3xl font-bold text-rose-600">12</p>
                  <p className="text-sm text-gray-600 mt-1">Cancelaciones</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg">
                  <p className="text-3xl font-bold text-teal-600">92%</p>
                  <p className="text-sm text-gray-600 mt-1">Tasa Conversión</p>
                </div>
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