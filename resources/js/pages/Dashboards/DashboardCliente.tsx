import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Calendar, 
    Hotel, 
    FileText, 
    DollarSign, 
    UserCheck,
    CreditCard,
    Star,
    ArrowRight
} from "lucide-react";
import { route } from "ziggy-js";
import { Progress } from "@radix-ui/react-progress";
//import { Progress } from "@/components/ui/progress"; // Asumiendo que usas un componente Progress

// Formato de Moneda
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
    }).format(amount);
};

// --- Interfaces de Datos (Simplificadas) ---
interface EstanciaActual {
    id: number;
    fecha_entrada: string;
    habitacion_evento: { codigo: string; tipo_habitacion: { nombre: string } };
    reserva: { dias_estadia: number; fecha_reserva: string };
    cuenta: { monto_total: number; saldo: number; estado: string };
}
interface ReservaHistorial {
    id: number;
    fecha_reserva: string;
    monto_total: number;
    estado: string;
}
interface Props {
    perfil: {
        name: string;
        gasto_total: number;
        documento_completo: boolean; // Para la barra de progreso
    };
    estanciaActual: EstanciaActual | null;
    proximasReservas: ReservaHistorial[];
    historialReservas: ReservaHistorial[];
}


export default function ClienteDashboard({ perfil, estanciaActual, proximasReservas, historialReservas }: Props) {
    const perfilProgreso = perfil.documento_completo ? 100 : 50;

    return (
        <AppLayout breadcrumbs={[{ title: "Mis Reservas", href: route('clientes.mis-reservas.index') }]}>
            <Head title="Mi Panel de Huésped" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* ENCABEZADO y Bienvenida */}
                    <div className="bg-primary-500 text-white p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700">
                        <h1 className="text-3xl font-bold">Bienvenido, {perfil.name.split(' ')[0]}</h1>
                        <p className="mt-2 opacity-90">Gestione su estancia y vea sus próximos viajes.</p>
                    </div>

                    {/* Fila de KPIs (Gasto total y Fidelidad) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* KPI Gasto Total */}
                        <Card className="shadow-md border-l-4 border-l-green-500">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Gasto Total Histórico</p>
                                    <h3 className="text-3xl font-bold text-green-700 mt-1">{formatCurrency(perfil.gasto_total)}</h3>
                                </div>
                                <DollarSign className="h-10 w-10 text-green-500 opacity-20" />
                            </CardContent>
                        </Card>
                        
                        {/* KPI Puntos/Nivel (Simulado) */}
                        {/* <Card className="shadow-md border-l-4 border-l-amber-500">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Nivel de Fidelidad</p>
                                    <h3 className="text-3xl font-bold text-amber-600 mt-1">Platino</h3>
                                </div>
                                <Star className="h-10 w-10 text-amber-500 opacity-20" />
                            </CardContent>
                        </Card> */}

                        {/* Tarjeta de Perfil Completo / Pre-Checkin */}
                        <Card className="shadow-md border-l-4 border-l-indigo-500">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex justify-between items-center">
                                    Perfil Completo 
                                    <Badge variant="secondary">{perfilProgreso}%</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Progress value={perfilProgreso} className="mb-2 h-2" />
                                {!perfil.documento_completo && (
                                    <p className="text-xs text-muted-foreground">
                                        Suba su CI/Pasaporte para el **Pre-Checkin**.
                                    </p>
                                )}
                                {/* <Link href={route('clientes.perfil.edit')}>
                                    <Button variant="link" className="p-0 text-sm mt-2">
                                        {perfil.documento_completo ? 'Ver Perfil' : 'Completar ahora'} <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                    </div>

                    {/* ESTANCIA ACTUAL (SI EXISTE) */}
                    {estanciaActual ? (
                        <Card className="shadow-xl border-2 border-primary-300">
                            <CardHeader className="bg-red-50/50 border-b">
                                <CardTitle className="flex items-center gap-3 text-red-700">
                                    <Hotel className="h-6 w-6" />
                                    ¡Check-in Activo!
                                </CardTitle>
                                <CardDescription>
                                    Gestione su estancia actual en el hotel.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Columna 1: Habitación */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Habitación Asignada</h3>
                                    <Badge className="text-xl mt-1 py-1 px-3 bg-red-600 hover:bg-red-600">{estanciaActual.habitacion_evento.codigo}</Badge>
                                    <p className="text-sm mt-1">{estanciaActual.habitacion_evento.tipo_habitacion.nombre}</p>
                                </div>
                                {/* Columna 2: Fechas */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Entrada / Noches</h3>
                                    <p className="text-base font-semibold">{new Date(estanciaActual.fecha_entrada).toLocaleDateString()}</p>
                                    <p className="text-sm text-muted-foreground">{estanciaActual.reserva.dias_estadia} Noches</p>
                                </div>
                                {/* Columna 3: Cuenta */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Saldo Pendiente</h3>
                                    <p className={`text-xl font-bold ${estanciaActual.cuenta.saldo > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatCurrency(estanciaActual.cuenta.saldo)}
                                    </p>
                                    <Button size="sm" variant="secondary" className="mt-2">
                                        <CreditCard className="h-4 w-4 mr-2" /> Ver Cuenta
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="bg-gray-100 p-8 rounded-lg text-center border-dashed border-2 border-gray-300">
                            <h2 className="text-xl font-semibold mb-2">¡No tienes un Check-in activo!</h2>
                            <p className="text-muted-foreground">
                                ¿Buscas tu próxima aventura?
                            </p>
                            <Link href={route('reservas.cliente.index')}>
                                <Button className="mt-4 bg-primary hover:bg-primary/90">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Reservar Ahora
                                </Button>
                            </Link>
                        </div>
                    )}


                    {/* PRÓXIMAS RESERVAS E HISTORIAL */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Próximas Reservas */}
                        <Card className="shadow-md">
                            <CardHeader className="bg-blue-50/50">
                                <CardTitle className="flex items-center gap-2 text-blue-700">
                                    <Calendar className="h-5 w-5" />
                                    Mis Próximas Reservas
                                </CardTitle>
                                <CardDescription>Reservas confirmadas y pendientes de ingreso.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 divide-y">
                                {proximasReservas.length > 0 ? proximasReservas.map(reserva => (
                                    <div key={reserva.id} className="p-4 flex justify-between items-center hover:bg-blue-50 transition-colors">
                                        <div>
                                            <p className="font-semibold">Reserva #{reserva.id}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(reserva.fecha_reserva).toLocaleDateString()} • {formatCurrency(reserva.monto_total)}
                                            </p>
                                        </div>
                                        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                                            {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                                        </Badge>
                                    </div>
                                )) : (
                                    <p className="p-4 text-center text-muted-foreground text-sm">No tienes reservas próximas.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Historial de Reservas */}
                        <Card className="shadow-md">
                            <CardHeader className="bg-gray-50/50">
                                <CardTitle className="flex items-center gap-2 text-gray-700">
                                    <FileText className="h-5 w-5" />
                                    Historial y Facturas
                                </CardTitle>
                                <CardDescription>Reservas finalizadas y cuentas pagadas.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 divide-y">
                                {historialReservas.length > 0 ? historialReservas.map(reserva => (
                                    <div key={reserva.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-semibold">Reserva #{reserva.id}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(reserva.fecha_reserva).toLocaleDateString()} • {formatCurrency(reserva.monto_total)}
                                            </p>
                                        </div>
                                        <Badge variant="secondary">Ver Detalle</Badge>
                                    </div>
                                )) : (
                                    <p className="p-4 text-center text-muted-foreground text-sm">Historial vacío.</p>
                                )}
                            </CardContent>
                        </Card>

                    </div>

                </div>
            </div>
        </AppLayout>
    );
}