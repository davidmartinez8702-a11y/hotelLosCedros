import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    LogIn, 
    LogOut, 
    Hotel, 
    Activity, 
    UserPlus, 
    Calendar, 
    ChevronRight,
    ClipboardList,
    Clock
} from "lucide-react";
import { route } from "ziggy-js";
import EntityHeader from "@/shared/components/EntityHeader";
import { cn } from "@/lib/utils";

// Componentes Genéricos de Gráficos
import { GenericPieChart } from "@/shared/BI/ChartsComponents/GenericPieChart";
import { GenericAreaChart } from "@/shared/BI/ChartsComponents/GenericAreaChart";

// --- Interfaces ---
interface Props {
    stats: {
        llegadas_hoy: number;
        salidas_hoy: number;
        total_habitaciones: number;
        ocupacion_porcentaje: number;
    };
    charts: {
        estado_habitaciones: Array<{ name: string; value: number; fill: string }>;
        actividad_semanal: Array<{ fecha: string; llegadas: number; salidas: number }>;
    };
    listas: {
        llegadas: any[];
        salidas: any[];
    };
}

export default function DashboardRecepcionista({ stats, charts, listas }: Props) {
    const formatDateTime = () => {
        return new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: route("dashboard") },
                { title: "Recepción", href: "#" },
            ]}
        >
            <Head title="Panel de Recepción" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* ENCABEZADO */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <EntityHeader
                            title="Panel Operativo de Recepción"
                            subtitle="Sincronizado al:"
                            span={formatDateTime()}
                        />

                        <div className="flex gap-2 flex-wrap">
                            <Link href={route("recepcion.reservas.index")}>
                                <Button variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Ver Reservas
                                </Button>
                            </Link>
                            <Link href={route("recepcion.checkins.index")}>
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Nuevo Check-in
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Separator />

                    {/* KPIs DE ESTADO ACTUAL */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    
                        {/* KPI: Llegadas Hoy */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Llegadas Hoy</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.llegadas_hoy}</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-blue-100">
                                        <Clock className="h-3 w-3" />
                                        <span>Sincronizado hoy</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                                    <LogIn className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            {/* Decoración de fondo */}
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                        </div>

                        {/* KPI: Salidas Hoy */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 to-rose-600 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Salidas Hoy</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.salidas_hoy}</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-100">
                                        <LogOut className="h-3 w-3" />
                                        <span>Pendientes de cierre</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                                    <LogOut className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                        </div>

                        {/* KPI: Ocupación Actual */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Ocupación</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.ocupacion_porcentaje}%</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-100">
                                        <Activity className="h-3 w-3" />
                                        <span>Estado del inventario</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                                    <Activity className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                        </div>

                        {/* KPI: Total Habitaciones */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Capacidad Total</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.total_habitaciones}</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-purple-100">
                                        <Hotel className="h-3 w-3" />
                                        <span>Habitaciones físicas</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                                    <Hotel className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                        </div>

                    </div>
                    {/* SECCIÓN DE GRÁFICOS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <GenericPieChart
                                data={charts.estado_habitaciones}
                                dataKey="value"
                                nameKey="name"
                                title="Estado Físico"
                                description="Disponibilidad inmediata"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <GenericAreaChart
                                data={charts.actividad_semanal}
                                categoryKey="fecha"
                                areas={[
                                    { dataKey: "llegadas", name: "Llegadas", stroke: "#3b82f6", fill: "#3b82f6" },
                                    { dataKey: "salidas", name: "Salidas", stroke: "#f97316", fill: "#f97316" },
                                ]}
                                title="Flujo Semanal"
                                description="Entradas vs Salidas proyectadas"
                                stacked={false}
                            />
                        </div>
                    </div>

                    {/* TABLAS OPERATIVAS (Llegadas y Salidas) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* COLUMNA: LLEGADAS */}
                        <Card className="shadow-lg">
                            <CardHeader className="bg-blue-50/50">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <LogIn className="h-5 w-5 text-blue-600" />
                                        Check-ins Pendientes
                                    </CardTitle>
                                    <Badge variant="outline">{listas.llegadas.length}</Badge>
                                </div>
                                <CardDescription>Huéspedes con reserva para ingresar hoy.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {listas.llegadas.length > 0 ? listas.llegadas.map((reserva) => (
                                        <div key={reserva.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="space-y-1">
                                                <p className="font-bold text-sm">{reserva.cliente.user.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Badge variant="secondary" className="text-[10px]">#{reserva.id}</Badge>
                                                    <span>{reserva.dias_estadia} noches</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{reserva.tipo_viaje}</span>
                                                </div>
                                            </div>
                                            <Link href={route('recepcion.checkins.create', { reserva: reserva.id })}>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                    Registrar <ChevronRight className="ml-1 h-3 w-3" />
                                                </Button>
                                            </Link>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-muted-foreground text-sm">
                                            No hay llegadas pendientes.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* COLUMNA: SALIDAS */}
                        <Card className="shadow-lg">
                            <CardHeader className="bg-orange-50/50">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <LogOut className="h-5 w-5 text-orange-600" />
                                        Salidas (Check-outs)
                                    </CardTitle>
                                    <Badge variant="outline">{listas.salidas.length}</Badge>
                                </div>
                                <CardDescription>Huéspedes que deben dejar la habitación hoy.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {listas.salidas.length > 0 ? listas.salidas.map((ci) => (
                                        <div key={ci.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="space-y-1">
                                                <p className="font-bold text-sm">{ci.cliente.user.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">
                                                        Hab: {ci.habitacion_evento.codigo}
                                                    </Badge>
                                                    <span className="font-medium text-orange-600">
                                                        {ci.habitacion_evento.tipo_habitacion.nombre}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={route('recepcion.checkins.show', ci.id)}>
                                                <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                                    Finalizar <LogOut className="ml-1 h-3 w-3" />
                                                </Button>
                                            </Link>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-muted-foreground text-sm">
                                            No hay salidas programadas para hoy.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}