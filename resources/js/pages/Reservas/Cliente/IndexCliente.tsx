import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Search, Calendar, Users, Baby, Briefcase, Plane, Heart, Home, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';

interface TipoHabitacion {
    id: number;
    nombre: string;
    precio: number;
    capacidad_total: number;
    descripcion?: string;
    imagen_principal?: string;
}

interface DisponibilidadItem {
    tipo_habitacion: TipoHabitacion;
    disponibles: number;
}

export default function IndexCliente() {
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [adultos, setAdultos] = useState(2);
    const [infantes, setInfantes] = useState(0);
    const [tipoViaje, setTipoViaje] = useState('placer');
    const [buscando, setBuscando] = useState(false);
    const [disponibilidad, setDisponibilidad] = useState<DisponibilidadItem[]>([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [error, setError] = useState('');

    const buscarDisponibilidad = async () => {
        setError('');

        if (!fechaEntrada || !fechaSalida) {
            setError('Por favor selecciona las fechas de entrada y salida');
            return;
        }

        if (new Date(fechaEntrada) >= new Date(fechaSalida)) {
            setError('La fecha de salida debe ser posterior a la fecha de entrada');
            return;
        }

        if (adultos < 1) {
            setError('Debe haber al menos 1 adulto');
            return;
        }

        setBuscando(true);

        try {
            const response = await fetch('/api/reservas/cliente/disponibilidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    fecha_entrada: fechaEntrada,
                    fecha_salida: fechaSalida,
                    adultos,
                    infantes,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setDisponibilidad(data.disponibilidad);
                setMostrarResultados(true);
            } else {
                setError(data.message || 'Error al buscar disponibilidad');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error al conectar con el servidor');
        } finally {
            setBuscando(false);
        }
    };

    const continuarReserva = () => {
        const diasEstadia = Math.ceil(
            (new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24)
        );

        router.get('/reservas/cliente/crear', {
            fecha_entrada: fechaEntrada,
            fecha_salida: fechaSalida,
            adultos,
            infantes,
            tipo_viaje: tipoViaje,
            dias_estadia: diasEstadia,
        });
    };

    const tiposViaje = [
        { value: 'placer', label: 'Placer', icon: Heart },
        { value: 'negocios', label: 'Negocios', icon: Briefcase },
        { value: 'turismo', label: 'Turismo', icon: Plane },
        { value: 'familia', label: 'Familia', icon: Home },
    ];

    return (
        <AppLayout>
            <Head title="Reservar Habitación" />

            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Reserva tu Estadía Perfecta
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Encuentra la habitación ideal para tu viaje
                    </p>
                </div>

                {/* Formulario de Búsqueda */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-6 w-6" />
                            Buscar Disponibilidad
                        </CardTitle>
                        <CardDescription>
                            Ingresa tus fechas y preferencias para encontrar habitaciones disponibles
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Fecha de Entrada */}
                            <div className="space-y-2">
                                <Label htmlFor="fecha-entrada" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Fecha de Entrada
                                </Label>
                                <Input
                                    id="fecha-entrada"
                                    type="date"
                                    value={fechaEntrada}
                                    onChange={(e) => setFechaEntrada(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Fecha de Salida */}
                            <div className="space-y-2">
                                <Label htmlFor="fecha-salida" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Fecha de Salida
                                </Label>
                                <Input
                                    id="fecha-salida"
                                    type="date"
                                    value={fechaSalida}
                                    onChange={(e) => setFechaSalida(e.target.value)}
                                    min={fechaEntrada || new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Adultos */}
                            <div className="space-y-2">
                                <Label htmlFor="adultos" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Adultos
                                </Label>
                                <Select value={adultos.toString()} onValueChange={(v) => setAdultos(parseInt(v))}>
                                    <SelectTrigger id="adultos">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'Adulto' : 'Adultos'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Niños */}
                            <div className="space-y-2">
                                <Label htmlFor="infantes" className="flex items-center gap-2">
                                    <Baby className="h-4 w-4" />
                                    Niños
                                </Label>
                                <Select value={infantes.toString()} onValueChange={(v) => setInfantes(parseInt(v))}>
                                    <SelectTrigger id="infantes">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[0, 1, 2, 3, 4].map(num => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'Niño' : 'Niños'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tipo de Viaje */}
                        <div className="mt-6">
                            <Label className="mb-3 block">Motivo del Viaje</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {tiposViaje.map((tipo) => {
                                    const Icon = tipo.icon;
                                    return (
                                        <button
                                            key={tipo.value}
                                            onClick={() => setTipoViaje(tipo.value)}
                                            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                                                tipoViaje === tipo.value
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <Icon className="h-6 w-6 mx-auto mb-2" />
                                            <p className="text-sm font-medium">{tipo.label}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <Alert variant="destructive" className="mt-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Botón Buscar */}
                        <Button
                            onClick={buscarDisponibilidad}
                            disabled={buscando}
                            size="lg"
                            className="w-full mt-6"
                        >
                            {buscando ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <Search className="h-5 w-5 mr-2" />
                                    Buscar Habitaciones
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Resultados */}
                {mostrarResultados && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Habitaciones Disponibles
                            </h2>
                            <p className="text-muted-foreground">
                                {disponibilidad.length} {disponibilidad.length === 1 ? 'opción' : 'opciones'} disponible{disponibilidad.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {disponibilidad.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        No hay habitaciones disponibles
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        Lo sentimos, no hay habitaciones disponibles para las fechas seleccionadas.
                                    </p>
                                    <Button variant="outline" onClick={() => setMostrarResultados(false)}>
                                        Buscar otras fechas
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {disponibilidad.map((item) => (
                                        <Card key={item.tipo_habitacion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            {item.tipo_habitacion.imagen_principal && (
                                                <div className="h-48 bg-muted overflow-hidden">
                                                    <img
                                                        src={item.tipo_habitacion.imagen_principal}
                                                        alt={item.tipo_habitacion.nombre}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                    />
                                                </div>
                                            )}
                                            <CardHeader>
                                                <CardTitle>{item.tipo_habitacion.nombre}</CardTitle>
                                                <CardDescription>
                                                    {item.tipo_habitacion.descripcion || 'Habitación cómoda y espaciosa'}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">Capacidad:</span>
                                                        <span className="font-semibold">
                                                            {item.tipo_habitacion.capacidad_total} personas
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">Disponibles:</span>
                                                        <span className="font-semibold text-green-600">
                                                            {item.disponibles} habitación{item.disponibles !== 1 ? 'es' : ''}
                                                        </span>
                                                    </div>
                                                    <div className="pt-3 border-t">
                                                        <p className="text-2xl font-bold text-primary">
                                                            Bs. {item.tipo_habitacion.precio.toLocaleString()}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">por noche</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <Card className="bg-primary/5 border-primary/20">
                                    <CardContent className="py-6">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-1">
                                                    ¿Encontraste lo que buscabas?
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    Continúa con tu reserva y selecciona las habitaciones que necesitas
                                                </p>
                                            </div>
                                            <Button onClick={continuarReserva} size="lg">
                                                Continuar con Reserva
                                                <ChevronRight className="h-5 w-5 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}