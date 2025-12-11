import React, { useEffect, useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    CheckCircle,
    Hotel,
    Users,
    User,
    ClipboardList,
    DoorOpen,
    Search,
    X,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import ReservaSolicitudesPanel from './components/ReservaSolicitudPanel';
import ClienteSearchAndList from './components/ClienteSearchAndList';
import HuespedesAsignacion from './components/HuespedesAsignacion';

// --- 1. INTERFACES DE DATOS ---

// Interfaz para la data de Cliente que viene paginada desde el backend
interface ClienteDisponible {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

interface ClienteReservaPrincipal {
    id: number;
    nombre: string;
    email: string;
    is_principal: true;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    // Agrega aquí otras propiedades de paginación si las usas (from, to, total, links)
    links: { url: string | null, label: string, active: boolean }[];
}

interface ClienteInitial {
    id: number;
    nombre: string;
    email: string;
    is_principal: boolean;
}

interface HabitacionSolicitada {
    tipo_id: number;
    nombre_tipo: string;
    tipo_reserva: 'habitacion' | 'evento';
    total_solicitado: number;
}

interface ReservaData {
    id: number;
    tipo_reserva: string;
    fecha_reserva: string;
    tipo_viaje: string;
}

interface HabitacionDisponible {
    id: number;
    codigo: string;
    nombre: string;
    tipo: 'habitacion' | 'evento';
    tipo_nombre: string;
}

interface RecepcionistaOption {
    id: number;
    nombre: string;
}
interface HuespedAsignado {
    checkin_id: number; // ID del checkin a eliminar/modificar
    cliente_id: number;
    nombre: string;
    email: string;
}

interface HabitacionOcupadaPorReserva {
    habitacion_evento_id: number;
    codigo: string;
    tipo_nombre: string;
    estado_actual: string; // 'ocupado', 'limpieza', etc.
    num_huespedes_activos: number; // Cuántos checkins activos tiene esta habitación
    huespedes_asignados: HuespedAsignado[];
}

interface Props {
    reserva: ReservaData | null;
    clientesIniciales: ClienteInitial[];
    habitacionesDisponibles: HabitacionDisponible[];
    recepcionistas: RecepcionistaOption[];
    habitacionesSolicitadas: HabitacionSolicitada[];
    // AÑADIDA NUEVA PROP DE CLIENTES DISPONIBLES PAGINADOS
    clientesDisponibles: PaginatedData<ClienteDisponible>; 
    habitacionesAsignadas: HabitacionOcupadaPorReserva[];
    clienteQueRealizoLaReserva: ClienteReservaPrincipal | null;
}

// Interfaz para el estado de cada Check-in dentro del formulario
interface CheckinData {
    id: number; // ID del Cliente (usado en la UI)
    nombre: string;
    email: string;
    is_principal: boolean;
    
    // Campos que el backend necesita para Checkin::create()
    cliente_id: number;
    habitacion_evento_id: string; // Se envía como string
    fecha_entrada: string | null; // Acepta string ISO o null
    fecha_salida: string | null; // Acepta string ISO o null
}

// Interfaz del formulario completo (para useForm)
interface FormData {
    reserva_id: number | null;
    checkins: CheckinData[];
    recepcionista_id: string;
}


// --- 2. LÓGICA DE INICIALIZACIÓN Y BÚSQUEDA LOCAL ---

const getInitialCheckins = (clientes: ClienteInitial[]): CheckinData[] => {
    const today = format(new Date(), 'yyyy-MM-dd 00:00:00');
    return clientes.map(c => ({
        ...c,
        cliente_id: c.id,
        habitacion_evento_id: '',
        fecha_entrada: today, // Inicializado como string
        fecha_salida: null,
    }));
};

export default function CheckinCreate({ 
    reserva, 
    clientesIniciales, 
    habitacionesDisponibles, 
    recepcionistas, 
    habitacionesSolicitadas,
    habitacionesAsignadas,
    clientesDisponibles ,
    clienteQueRealizoLaReserva
}: Props) {
    
    // Estado del formulario de Inertia
    const { data, setData, post, processing, errors } = useForm<FormData>({
        reserva_id: reserva?.id || null,
        checkins: getInitialCheckins(clientesIniciales),
        recepcionista_id: recepcionistas[0]?.id.toString() || '',
    });

    // Estado para el término de búsqueda local
    const [searchTerm, setSearchTerm] = useState('');

    // --- LÓGICA DE BÚSQUEDA LOCAL Y FILTRADO ---
    
    // 1. Array de IDs de clientes ya chequeados o en la bolsa (para exclusión)
    const clientesEnBolsaIds = data.checkins.map(h => h.id);

    // 2. Filtrado local de los clientes paginados
    const filteredClientes = clientesDisponibles.data
        // Primero, excluir clientes que ya están en la bolsa
        .filter(cliente => !clientesEnBolsaIds.includes(cliente.id))
        // Segundo, aplicar filtro por término de búsqueda (case-insensitive)
        .filter(cliente => {
            if (!searchTerm) return true;
            const lowerCaseTerm = searchTerm.toLowerCase();
            return (
                cliente.nombre.toLowerCase().includes(lowerCaseTerm) ||
                cliente.email.toLowerCase().includes(lowerCaseTerm) ||
                (cliente.telefono && cliente.telefono.includes(lowerCaseTerm))
            );
        });
    // ------------------------------------------

    // Función para manejar la paginación (llama al backend para nueva data)
    const handlePagination = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, replace: true });
        }
    };
    const combineDateTime = (date: Date | null, timeString: string | null): string | null => {
        if (!date) return null;
        
        // Obtenemos YYYY-MM-DD
        const datePart = format(date, 'yyyy-MM-dd');
        // Obtenemos HH:mm
        const timePart = timeString || '00:00'; 
        
        // Formato que Laravel/PHP suele preferir: YYYY-MM-DD HH:mm:ss
        return `${datePart} ${timePart}:00`; 
    };
    
    // Handler que acepta Date | null (para onSelect)
    const handleDateChange = (index: number, field: 'fecha_entrada' | 'fecha_salida', date: Date | null) => {
        const newCheckins = [...data.checkins];
        const currentCheckin = newCheckins[index];
        
        // 1. Obtener la hora actual (si existe)
        let currentTimeString: string | null = null;
        if (currentCheckin[field]) {
            try {
                // Intentar extraer la hora del string ISO/DB
                currentTimeString = format(parseISO(currentCheckin[field]!), 'HH:mm');
            } catch(e) {
                currentTimeString = '00:00'; // Fallback seguro
            }
        }
        
        // 2. Combinar la nueva fecha (Date | null) con la hora existente
        currentCheckin[field] = combineDateTime(date, currentTimeString);
        
        // Si la fecha de salida se limpió, también limpiamos la hora para que el campo no sea requerido.
        if (field === 'fecha_salida' && date === null) {
            currentCheckin.fecha_salida = null;
        }

        setData('checkins', newCheckins);
    };

    // Handler para el Input de Hora
    const handleTimeChange = (index: number, field: 'fecha_entrada' | 'fecha_salida', time: string) => {
        const newCheckins = [...data.checkins];
        const currentCheckin = newCheckins[index];

        // 1. Obtener el objeto Date de la fecha actual (necesario para formatear YYYY-MM-DD)
        let currentDateObject: Date | null = null;
        if (currentCheckin[field]) {
            try {
                currentDateObject = parseISO(currentCheckin[field]!);
            } catch(e) {
                // Si falla, es un problema de data, forzamos null
                currentDateObject = null;
            }
        }
        
        // 2. Si es fecha de salida y está nula, ignoramos el cambio de hora
        if (field === 'fecha_salida' && currentCheckin.fecha_salida === null) {
            return; 
        }

        // Si la fecha es inválida o nula, no podemos establecer la hora
        if (!currentDateObject || isNaN(currentDateObject.getTime())) {
            alert("Primero selecciona una fecha válida.");
            return;
        }
        
        // 3. Combinar la fecha (Date) con la nueva hora y actualizar
        currentCheckin[field] = combineDateTime(currentDateObject, time);
        setData('checkins', newCheckins);
    };
    
    // Función para añadir cliente de la búsqueda a la bolsa de check-ins
    const addClienteToBag = (cliente: ClienteDisponible) => {
        const newHuesped: CheckinData = {
            id: cliente.id,
            nombre: cliente.nombre,
            email: cliente.email,
            is_principal: false,
            cliente_id: cliente.id,
            habitacion_evento_id: '',
            fecha_entrada: new Date().toISOString().slice(0, 10),
            fecha_salida: null,
        };
        
        setData('checkins', [...data.checkins, newHuesped]);
        setSearchTerm(''); // Limpiar el término de búsqueda después de agregar
    };

    // Función para remover un huésped de la bolsa
    const removeHuesped = (clienteId: number) => {
        if (confirm('¿Estás seguro de remover a este huésped?')) {
            const updatedCheckins = data.checkins.filter(h => h.id !== clienteId);
            setData('checkins', updatedCheckins);
        }
    };
    
    // Función para manejar el cambio de habitación en un huésped específico
    const handleHabitacionChange = (index: number, value: string) => {
        const newCheckins = [...data.checkins];
        newCheckins[index].habitacion_evento_id = value;
        setData('checkins', newCheckins);
    };
    const handleRecepcionistaChange = (value: string) => {
        setData('recepcionista_id', value);
    };
    // Función de envío (manejará la creación múltiple)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('recepcion.checkins.store', { reserva: data.reserva_id }));
    };
    
    // Obtener las IDs de las habitaciones ya asignadas para deshabilitarlas
    const assignedHabitacionIds = data.checkins
        .map(h => h.habitacion_evento_id)
        .filter(id => id);

// --- 3. RENDERIZADO DEL COMPONENTE (JSX) ---

    return (
        <AppLayout 
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Recepción', href: '#' },
                { title: 'Check-ins', href: route('recepcion.checkins.index') },
                { title: `Nuevo Check-in`, href: '#' },
            ]}
        >
            <Head title="Crear Nuevo Check-in" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header Principal */}
                    <div className="flex items-center gap-4">
                        <Link href={route('recepcion.reservas.index')}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Iniciar Check-in {reserva && `(Reserva #${reserva.id})`}
                            </h1>
                            <p className="text-muted-foreground">
                                Asigna habitaciones a los huéspedes y registra la entrada.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Mostrar errores generales */}
                    {/* {errors.general && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            ⚠️ {errors.general}
                        </div>
                    )} */}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* 1. Solicitudes de Reserva (Columna 1) */}
                            {reserva && (
                                <ReservaSolicitudesPanel 
                                    reserva={reserva}
                                    habitacionesSolicitadas={habitacionesSolicitadas}
                                    habitacionesOcupadasPorReserva={habitacionesAsignadas ?? []}
                                    clienteQueRealizoLaReserva={clienteQueRealizoLaReserva}
                                />
                            )}


                            {/* 2. Panel Principal (Columna 2 o 2 y 3) */}
                            <div className={reserva ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"}>
                                
                                {/* A. NUEVA TARJETA: Búsqueda y Adición de Clientes */}
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Search className="h-5 w-5 text-primary" />
                                            Buscar y Añadir Huéspedes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ClienteSearchAndList
                                            searchTerm={searchTerm}
                                            setSearchTerm={setSearchTerm}
                                            filteredClientes={filteredClientes}
                                            clientesEnBolsaIds={clientesEnBolsaIds}
                                            clientesDisponiblesPaginated={clientesDisponibles}
                                            addClienteToBag={addClienteToBag}
                                        />
                                    </CardContent>
                                </Card>


                                {/* B. TARJETA EXISTENTE: Lista de Asignación y Formulario Final */}
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-primary" />
                                            Asignación de Habitaciones
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Aquí solo queda el componente de asignación */}
                                        <HuespedesAsignacion
                                            checkins={data.checkins}
                                            recepcionistaId={data.recepcionista_id}
                                            processing={processing}
                                            errors={errors}
                                            habitacionesDisponibles={habitacionesDisponibles}
                                            assignedHabitacionIds={assignedHabitacionIds}
                                            recepcionistas={recepcionistas}
                                            removeHuesped={removeHuesped}
                                            handleHabitacionChange={handleHabitacionChange}
                                            handleRecepcionistaChange={(value) => setData('recepcionista_id', value)}
                                            handleDateChange={handleDateChange} 
                                            handleTimeChange={handleTimeChange}
                                           
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Botón de Guardar Final (se mantiene abajo, fuera de las cards) */}
                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing || data.checkins.length === 0}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {processing ? 'Registrando...' : `Registrar ${data.checkins.length} Check-in(s)`}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}