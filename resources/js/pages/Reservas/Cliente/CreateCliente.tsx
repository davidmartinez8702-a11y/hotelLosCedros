import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    User, Mail, Phone, CreditCard, MapPin, 
    ShoppingCart, Trash2, Plus, Minus, 
    ArrowLeft, ArrowRight, CheckCircle, 
    Gift, AlertCircle, Calendar, Users as UsersIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/shared/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || '');

interface TipoHabitacion {
    id: number;
    nombre: string;
    precio: number;
    capacidad_total: number;
    disponibles?: number;
}

interface HabitacionSeleccionada {
    tipo_habitacion_id: number;
    tipo_habitacion: TipoHabitacion;
    cantidad: number;
}

interface Promo {
    id: number;
    nombre: string;
    descripcion: string;
    tipo_promo: string;
    valor: number;
    estado: string;
}

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    fecha_entrada: string;
    fecha_salida: string;
    adultos: number;
    infantes: number;
    tipo_viaje: string;
    dias_estadia: number;
    tipos_habitacion: TipoHabitacion[];
}

export default function CreateCliente(props: Props) {
    return (
        <AppLayout>
            <Elements stripe={stripePromise}>
                <CreateClienteForm {...props} />
            </Elements>
        </AppLayout>
    );
}

function CreateClienteForm({ 
    auth, 
    fecha_entrada, 
    fecha_salida, 
    adultos, 
    infantes, 
    tipo_viaje, 
    dias_estadia,
    tipos_habitacion 
}: Props) {
    const [pasoActual, setPasoActual] = useState(1);
    const [cargando, setCargando] = useState(false);

    // Paso 1: Datos del cliente
    const [esInvitado, setEsInvitado] = useState(!auth?.user);
    const [clienteId, setClienteId] = useState(auth?.user?.id || null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState(auth?.user?.email || '');
    const [telefono, setTelefono] = useState('');
    const [ciPasaporte, setCiPasaporte] = useState('');

    // Paso 2: Habitaciones
    const [habitaciones, setHabitaciones] = useState<HabitacionSeleccionada[]>([]);
    const [tiposDisponibles, setTiposDisponibles] = useState<TipoHabitacion[]>(tipos_habitacion || []);

    // Paso 3: Promoción
    const [promociones, setPromociones] = useState<Promo[]>([]);
    const [promoSeleccionada, setPromoSeleccionada] = useState<number | null>(null);

    // Paso 4: Pago
    const [metodoPago, setMetodoPago] = useState<'qr' | 'stripe' | 'garante'>('qr');
    const [montoPago, setMontoPago] = useState(0);
    const [porcentajePago, setPorcentajePago] = useState(50);
    const [tipoTarjeta, setTipoTarjeta] = useState('');
    const [nroTarjeta, setNroTarjeta] = useState('');

    // Cálculos
    const [subtotal, setSubtotal] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    const pasos = [
        { numero: 1, titulo: 'Identificación', icono: User },
        { numero: 2, titulo: 'Habitaciones', icono: ShoppingCart },
        { numero: 3, titulo: 'Resumen', icono: Gift },
        { numero: 4, titulo: 'Pago', icono: CreditCard },
    ];

    const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;

    // Cargar promociones
    useEffect(() => {
        fetch('/api/reservas/cliente/promociones')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPromociones(data.promociones);
                }
            });
    }, []);

    // Calcular totales
    useEffect(() => {
        calcularPrecio();
    }, [habitaciones, promoSeleccionada]);

    // Calcular monto de pago según porcentaje
    useEffect(() => {
        setMontoPago((total * porcentajePago) / 100);
    }, [total, porcentajePago]);

    const calcularPrecio = async () => {
        if (habitaciones.length === 0) {
            setSubtotal(0);
            setDescuento(0);
            setTotal(0);
            return;
        }

        try {
            const response = await fetch('/api/reservas/cliente/calcular-precio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    habitaciones: habitaciones.map(h => ({
                        tipo_habitacion_id: h.tipo_habitacion_id,
                        cantidad: h.cantidad,
                    })),
                    dias_estadia,
                    promo_id: promoSeleccionada,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubtotal(data.subtotal);
                setDescuento(data.descuento);
                setTotal(data.total);
            }
        } catch (error) {
            console.error('Error al calcular precio:', error);
        }
    };

    const agregarHabitacion = (tipo: TipoHabitacion) => {
        const existe = habitaciones.find(h => h.tipo_habitacion_id === tipo.id);
        
        if (existe) {
            if (existe.cantidad < (tipo.disponibles || 999)) {
                setHabitaciones(habitaciones.map(h => 
                    h.tipo_habitacion_id === tipo.id 
                        ? { ...h, cantidad: h.cantidad + 1 }
                        : h
                ));
            }
        } else {
            setHabitaciones([...habitaciones, {
                tipo_habitacion_id: tipo.id,
                tipo_habitacion: tipo,
                cantidad: 1,
            }]);
        }
    };

    const reducirHabitacion = (tipoId: number) => {
        const habitacion = habitaciones.find(h => h.tipo_habitacion_id === tipoId);
        
        if (habitacion) {
            if (habitacion.cantidad > 1) {
                setHabitaciones(habitaciones.map(h => 
                    h.tipo_habitacion_id === tipoId 
                        ? { ...h, cantidad: h.cantidad - 1 }
                        : h
                ));
            } else {
                setHabitaciones(habitaciones.filter(h => h.tipo_habitacion_id !== tipoId));
            }
        }
    };

    const eliminarHabitacion = (tipoId: number) => {
        setHabitaciones(habitaciones.filter(h => h.tipo_habitacion_id !== tipoId));
    };

    const validarPaso = (paso: number): boolean => {
        switch (paso) {
            case 1:
                if (!esInvitado && clienteId) return true;
                return !!(nombre && apellido && email && telefono && ciPasaporte);
            case 2:
                return habitaciones.length > 0;
            case 3:
                return true;
            case 4:
                if (metodoPago === 'garante') {
                    return !!(tipoTarjeta && nroTarjeta);
                }
                return true;
            default:
                return false;
        }
    };

    const siguientePaso = () => {
        if (validarPaso(pasoActual)) {
            setPasoActual(pasoActual + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Por favor completa todos los campos requeridos');
        }
    };

    const pasoAnterior = () => {
        setPasoActual(pasoActual - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const confirmarReserva = async () => {
        if (!validarPaso(pasoActual)) {
            alert('Por favor completa todos los campos');
            return;
        }

        setCargando(true);

        // ✅ Timeout de seguridad (30 segundos)
        const timeoutId = setTimeout(() => {
            setCargando(false);
            alert('La operación está tomando más tiempo de lo esperado. Por favor intenta nuevamente o contacta con soporte.');
        }, 30000);

        try {
            let stripeToken = null;

            if (metodoPago === 'stripe') {
                console.log('🔵 Procesando pago con Stripe...');

                if (!stripe || !elements) {
                    clearTimeout(timeoutId);
                    alert('Error: Stripe no está inicializado correctamente');
                    setCargando(false);
                    return;
                }

                const cardElement = elements.getElement(CardElement);
                
                if (!cardElement) {
                    clearTimeout(timeoutId);
                    alert('Error: No se encontró el elemento de tarjeta');
                    setCargando(false);
                    return;
                }

                console.log('🔵 Creando token de Stripe...');

                const { error, token } = await stripe.createToken(cardElement);

                if (error) {
                    clearTimeout(timeoutId);
                    console.error('❌ Error de Stripe:', error);
                    alert(`Error en el pago: ${error.message}`);
                    setCargando(false);
                    return;
                }

                if (!token) {
                    clearTimeout(timeoutId);
                    alert('Error: No se pudo generar el token de pago');
                    setCargando(false);
                    return;
                }

                console.log('✅ Token de Stripe generado:', token.id);
                stripeToken = token.id;
            }

            console.log('🔵 Enviando reserva al servidor...');
            console.log('Método de pago:', metodoPago);
            console.log('Stripe Token:', stripeToken);

            const response = await fetch('/api/reservas/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    cliente_id: clienteId,
                    nombre,
                    apellido,
                    email,
                    telefono,
                    ci_pasaporte: ciPasaporte,
                    fecha_entrada,
                    fecha_salida,
                    adultos,
                    infantes,
                    tipo_viaje,
                    habitaciones: habitaciones.map(h => ({
                        tipo_habitacion_id: h.tipo_habitacion_id,
                        cantidad: h.cantidad,
                    })),
                    metodo_pago: metodoPago,
                    monto_pago: montoPago,
                    promo_id: promoSeleccionada,
                    tipo_tarjeta: tipoTarjeta,
                    nro_tarjeta: nroTarjeta,
                    stripe_token: stripeToken,
                }),
            });

            const data = await response.json();

            clearTimeout(timeoutId); // ✅ Cancelar timeout si todo va bien

            console.log('Respuesta del servidor:', data);

            if (data.success) {
                router.get('/reservas/cliente/confirmacion', {
                    reserva_id: data.reserva.id,
                });
            } else {
                console.error('Error:', data);
                alert(data.message || 'Error al crear la reserva');
                if (data.errors) {
                    console.error('Errores de validación:', data.errors);
                }
            }
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Error:', error);
            alert('Error al procesar la reserva');
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Head title="Crear Reserva" />

            {/* ✅ Overlay de carga */}
            {cargando && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <Card className="w-full max-w-md mx-4">
                        <CardContent className="pt-6 text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">
                                {metodoPago === 'stripe' ? 'Procesando pago...' : 'Creando reserva...'}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {metodoPago === 'stripe' 
                                    ? 'Estamos validando tu tarjeta de forma segura con Stripe. Esto puede tomar unos segundos.'
                                    : 'Por favor espera mientras confirmamos tu reserva.'
                                }
                            </p>
                            <div className="space-y-2 text-sm text-left bg-accent p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="animate-pulse h-2 w-2 bg-primary rounded-full"></div>
                                    <span>Verificando disponibilidad...</span>
                                </div>
                                {metodoPago === 'stripe' && (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-pulse h-2 w-2 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
                                        <span>Validando información de pago...</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <div className="animate-pulse h-2 w-2 bg-primary rounded-full" style={{ animationDelay: '0.4s' }}></div>
                                    <span>Generando confirmación...</span>
                                </div>
                            </div>
                            <Alert className="mt-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                    No cierres esta ventana ni recargues la página
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Nueva Reserva</h1>
                    <p className="text-muted-foreground">
                        Completa los siguientes pasos para confirmar tu reserva
                    </p>
                </div>

                {/* Progress Bar */}
                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                {pasos.map((paso, index) => {
                                    const Icon = paso.icono;
                                    const esActivo = pasoActual === paso.numero;
                                    const esCompletado = pasoActual > paso.numero;

                                    return (
                                        <React.Fragment key={paso.numero}>
                                            <div className="flex flex-col items-center">
                                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                                                    esCompletado 
                                                        ? 'bg-primary border-primary text-primary-foreground' 
                                                        : esActivo
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-border bg-background text-muted-foreground'
                                                }`}>
                                                    {esCompletado ? (
                                                        <CheckCircle className="h-6 w-6" />
                                                    ) : (
                                                        <Icon className="h-6 w-6" />
                                                    )}
                                                </div>
                                                <span className={`mt-2 text-sm font-medium ${
                                                    esActivo ? 'text-primary' : 'text-muted-foreground'
                                                }`}>
                                                    {paso.titulo}
                                                </span>
                                            </div>
                                            {index < pasos.length - 1 && (
                                                <div className="flex-1 h-0.5 mx-4 mt-6">
                                                    <div className={`h-full ${
                                                        esCompletado ? 'bg-primary' : 'bg-border'
                                                    }`} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            <Progress value={progreso} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* PASO 1: IDENTIFICACIÓN */}
                        {pasoActual === 1 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Identificación
                                    </CardTitle>
                                    <CardDescription>
                                        Ingresa tus datos personales para la reserva
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {!auth?.user && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                variant={esInvitado ? "default" : "outline"}
                                                onClick={() => setEsInvitado(true)}
                                                className="h-24 flex-col"
                                            >
                                                <User className="h-8 w-8 mb-2" />
                                                <span>Continuar como invitado</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => router.get('/login')}
                                                className="h-24 flex-col"
                                            >
                                                <CreditCard className="h-8 w-8 mb-2" />
                                                <span>Iniciar sesión</span>
                                            </Button>
                                        </div>
                                    )}

                                    {(esInvitado || !auth?.user) && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="nombre">Nombre *</Label>
                                                    <Input
                                                        id="nombre"
                                                        value={nombre}
                                                        onChange={(e) => setNombre(e.target.value)}
                                                        placeholder="Tu nombre"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="apellido">Apellido *</Label>
                                                    <Input
                                                        id="apellido"
                                                        value={apellido}
                                                        onChange={(e) => setApellido(e.target.value)}
                                                        placeholder="Tu apellido"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    Email *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="tu@email.com"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="telefono" className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    Teléfono *
                                                </Label>
                                                <Input
                                                    id="telefono"
                                                    type="tel"
                                                    value={telefono}
                                                    onChange={(e) => setTelefono(e.target.value)}
                                                    placeholder="+591 12345678"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="ci-pasaporte" className="flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4" />
                                                    CI / Pasaporte *
                                                </Label>
                                                <Input
                                                    id="ci-pasaporte"
                                                    value={ciPasaporte}
                                                    onChange={(e) => setCiPasaporte(e.target.value)}
                                                    placeholder="1234567 LP"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {auth?.user && !esInvitado && (
                                        <Alert>
                                            <CheckCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                <div className="font-medium mb-1">Sesión iniciada como:</div>
                                                <div>{auth.user.name}</div>
                                                <div className="text-sm text-muted-foreground">{auth.user.email}</div>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* PASO 2: HABITACIONES */}
                        {pasoActual === 2 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Selecciona tus Habitaciones
                                    </CardTitle>
                                    <CardDescription>
                                        Elige las habitaciones que necesitas para tu estadía
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {tiposDisponibles.map(tipo => {
                                        const seleccionada = habitaciones.find(h => h.tipo_habitacion_id === tipo.id);
                                        const cantidadSeleccionada = seleccionada?.cantidad || 0;
                                        
                                        return (
                                            <Card key={tipo.id} className="overflow-hidden">
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-lg mb-1">{tipo.nombre}</h3>
                                                            <p className="text-sm text-muted-foreground mb-2">
                                                                Capacidad: {tipo.capacidad_total} personas
                                                            </p>
                                                            <div className="flex items-baseline gap-2">
                                                                <span className="text-2xl font-bold text-primary">
                                                                    Bs. {tipo.precio.toLocaleString()}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">por noche</span>
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary">
                                                            {tipo.disponibles || 0} disponibles
                                                        </Badge>
                                                    </div>

                                                    {cantidadSeleccionada > 0 ? (
                                                        <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg">
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={() => reducirHabitacion(tipo.id)}
                                                                aria-label={`Reducir cantidad de ${tipo.nombre}`}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="font-semibold">
                                                                {cantidadSeleccionada} seleccionada{cantidadSeleccionada !== 1 ? 's' : ''}
                                                            </span>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={() => agregarHabitacion(tipo)}
                                                                disabled={cantidadSeleccionada >= (tipo.disponibles || 0)}
                                                                aria-label={`Agregar ${tipo.nombre}`}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => agregarHabitacion(tipo)}
                                                            className="w-full"
                                                        >
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Agregar habitación
                                                        </Button>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        );
                                    })}

                                    {habitaciones.length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                            <p>No has seleccionado ninguna habitación</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* PASO 3: RESUMEN */}
                        {pasoActual === 3 && (
                            <div className="space-y-6">
                                {/* Fechas */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Fechas de Estadía
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                                                <p className="font-semibold">{new Date(fecha_entrada).toLocaleDateString('es-ES')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                                                <p className="font-semibold">{new Date(fecha_salida).toLocaleDateString('es-ES')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Noches</p>
                                                <p className="font-semibold">{dias_estadia}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Huéspedes</p>
                                                <p className="font-semibold">{adultos} adultos, {infantes} niños</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Promociones */}
                                {promociones.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Gift className="h-5 w-5" />
                                                Promociones Disponibles
                                            </CardTitle>
                                            <CardDescription>
                                                Selecciona una promoción para obtener descuentos
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RadioGroup
                                                value={promoSeleccionada?.toString() || 'none'}
                                                onValueChange={(value) => setPromoSeleccionada(value === 'none' ? null : parseInt(value))}
                                            >
                                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                                                    <RadioGroupItem value="none" id="none" />
                                                    <Label htmlFor="none" className="flex-1 cursor-pointer">
                                                        Sin promoción
                                                    </Label>
                                                </div>
                                                {promociones.map(promo => (
                                                    <div key={promo.id} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-accent">
                                                        <RadioGroupItem value={promo.id.toString()} id={`promo-${promo.id}`} className="mt-1" />
                                                        <Label htmlFor={`promo-${promo.id}`} className="flex-1 cursor-pointer">
                                                            <p className="font-semibold">{promo.nombre}</p>
                                                            <p className="text-sm text-muted-foreground">{promo.descripcion}</p>
                                                            <Badge variant="secondary" className="mt-2">
                                                                {promo.tipo_promo === 'descuento_porcentual' 
                                                                    ? `${promo.valor}% de descuento`
                                                                    : `Bs. ${promo.valor} de descuento`
                                                                }
                                                            </Badge>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* PASO 4: PAGO */}
                        {pasoActual === 4 && (
                            <div className="space-y-6">
                                {/* Porcentaje de pago */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>¿Cuánto deseas pagar ahora?</CardTitle>
                                        <CardDescription>
                                            Selecciona el porcentaje que deseas pagar en este momento
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[50, 75, 100].map(porcentaje => (
                                                <Button
                                                    key={porcentaje}
                                                    variant={porcentajePago === porcentaje ? "default" : "outline"}
                                                    onClick={() => setPorcentajePago(porcentaje)}
                                                    className="h-20 flex-col"
                                                >
                                                    <span className="text-2xl font-bold">{porcentaje}%</span>
                                                    <span className="text-sm">
                                                        Bs. {((total * porcentaje) / 100).toLocaleString()}
                                                    </span>
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Métodos de pago */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Método de Pago</CardTitle>
                                        <CardDescription>
                                            Elige cómo deseas realizar el pago
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup
                                            value={metodoPago}
                                            onValueChange={(value) => setMetodoPago(value as any)}
                                        >
                                            <div className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-accent">
                                                <RadioGroupItem value="qr" id="qr" className="mt-1" />
                                                <Label htmlFor="qr" className="flex-1 cursor-pointer">
                                                    <p className="font-semibold">QR / Transferencia Bancaria</p>
                                                    <p className="text-sm text-muted-foreground">Genera un código QR para pagar</p>
                                                </Label>
                                            </div>

                                            <div className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-accent">
                                                <RadioGroupItem value="stripe" id="stripe" className="mt-1" />
                                                <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                                                    <p className="font-semibold">Tarjeta de Crédito/Débito</p>
                                                    <p className="text-sm text-muted-foreground">Pago seguro con Stripe</p>
                                                </Label>
                                            </div>

                                            <div className="flex items-start space-x-2 p-4 border rounded-lg hover:bg-accent">
                                                <RadioGroupItem value="garante" id="garante" className="mt-1" />
                                                <Label htmlFor="garante" className="flex-1 cursor-pointer">
                                                    <p className="font-semibold">Garantía con Tarjeta</p>
                                                    <p className="text-sm text-muted-foreground">Reserva ahora, paga al check-in</p>
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        {/* Formulario de Stripe */}
                                        {metodoPago === 'stripe' && (
                                            <div className="mt-6 p-4 border rounded-lg">
                                                <Label className="mb-3 block">Datos de la Tarjeta</Label>
                                                <div className="p-3 border rounded-md">
                                                    <CardElement
                                                        options={{
                                                            style: {
                                                                base: {
                                                                    fontSize: '16px',
                                                                    color: '#424770',
                                                                    '::placeholder': {
                                                                        color: '#aab7c4',
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Formulario de Garante */}
                                        {metodoPago === 'garante' && (
                                            <div className="mt-6 space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="tipo-tarjeta">Tipo de Tarjeta *</Label>
                                                        <select
                                                            id="tipo-tarjeta"
                                                            aria-label="Tipo de Tarjeta"
                                                            value={tipoTarjeta}
                                                            onChange={(e) => setTipoTarjeta(e.target.value)}
                                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                        >
                                                            <option value="">Selecciona...</option>
                                                            <option value="visa">Visa</option>
                                                            <option value="mastercard">Mastercard</option>
                                                            <option value="amex">American Express</option>
                                                        </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="nro-tarjeta">Número de Tarjeta *</Label>
                                                    <Input
                                                        id="nro-tarjeta"
                                                        value={nroTarjeta}
                                                        onChange={(e) => setNroTarjeta(e.target.value)}
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                    />
                                                </div>
                                                <Alert>
                                                    <AlertCircle className="h-4 w-4" />
                                                    <AlertDescription>
                                                        No se realizará ningún cargo. Solo se guardará como garantía.
                                                    </AlertDescription>
                                                </Alert>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Botones de navegación */}
                        <div className="flex justify-between">
                            {pasoActual > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={pasoAnterior}
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Anterior
                                </Button>
                            )}

                            {pasoActual < 4 ? (
                                <Button
                                    onClick={siguientePaso}
                                    className="ml-auto"
                                >
                                    Siguiente
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={confirmarReserva}
                                    disabled={cargando}
                                    className="ml-auto"
                                    size="lg"
                                >
                                    {cargando ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            {metodoPago === 'stripe' ? 'Procesando pago seguro...' : 'Procesando reserva...'}
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Confirmar Reserva
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Resumen lateral */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle>Resumen de Reserva</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Habitaciones */}
                                {habitaciones.length > 0 && (
                                    <>
                                        <div>
                                            <h4 className="font-semibold mb-3 text-sm">Habitaciones</h4>
                                            <div className="space-y-2">
                                                {habitaciones.map(h => (
                                                    <div key={h.tipo_habitacion_id} className="flex justify-between items-start text-sm">
                                                        <div className="flex-1">
                                                            <p className="font-medium">{h.tipo_habitacion.nombre}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {h.cantidad} x Bs. {h.tipo_habitacion.precio} x {dias_estadia} noches
                                                            </p>
                                                        </div>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => eliminarHabitacion(h.tipo_habitacion_id)}
                                                            aria-label={`Eliminar ${h.tipo_habitacion.nombre}`}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Totales */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">Bs. {subtotal.toLocaleString()}</span>
                                    </div>
                                    
                                    {descuento > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Descuento</span>
                                            <span className="font-medium">- Bs. {descuento.toLocaleString()}</span>
                                        </div>
                                    )}
                                    
                                    <Separator />
                                    
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">Bs. {total.toLocaleString()}</span>
                                    </div>

                                    {pasoActual >= 4 && porcentajePago < 100 && (
                                        <>
                                            <Separator />
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Pago ahora ({porcentajePago}%)</span>
                                                <span className="font-medium text-green-600">
                                                    Bs. {montoPago.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Saldo pendiente</span>
                                                <span className="font-medium text-orange-600">
                                                    Bs. {(total - montoPago).toLocaleString()}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}