// ReservaSolicitudesPanel.tsx - Versión compatible con Modo Oscuro

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Hotel, KeyRound, Save, User, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Asegúrate de importar la función cn (clsx/cva)
import { Button } from '@/shared/ui/button';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

// --- INTERFACES (Se mantienen igual) ---
interface ReservaData {
    id: number;
    tipo_reserva: string;
    fecha_reserva: string;
    tipo_viaje: string;
}

interface HuespedAsignado {
    checkin_id: number; // ID del checkin a eliminar/modificar
    cliente_id: number;
    nombre: string;
    email: string;
}

interface HabitacionSolicitada {
    tipo_id: number;
    nombre_tipo: string;
    tipo_reserva: 'habitacion' | 'evento';
    total_solicitado: number;
}

interface Props {
    reserva: ReservaData;
    habitacionesSolicitadas: HabitacionSolicitada[];
    habitacionesOcupadasPorReserva: HabitacionOcupadaPorReserva[];
    clienteQueRealizoLaReserva: ClienteReservaPrincipal | null;
}

interface HabitacionOcupadaPorReserva {
    habitacion_evento_id: number;
    codigo: string;
    tipo_nombre: string;
    estado_actual: string; // 'ocupado', 'limpieza', etc.
    num_huespedes_activos: number; // Cuántos checkins activos tiene esta habitación
    huespedes_asignados: HuespedAsignado[];
}
const ESTADO_HABITACION_OPTIONS = [
    { value: 'activo', label: 'Disponible (Activo)', color: 'bg-green-500' },
    { value: 'ocupado', label: 'Ocupado', color: 'bg-red-500' },
    { value: 'limpieza', label: 'Limpieza', color: 'bg-yellow-500' },
    { value: 'mantenimiento', label: 'Mantenimiento', color: 'bg-slate-500' },
];

interface ClienteReservaPrincipal {
    id: number;
    nombre: string;
    email: string;
    is_principal: true;
}

export default function ReservaSolicitudesPanel({ reserva, habitacionesSolicitadas, habitacionesOcupadasPorReserva, clienteQueRealizoLaReserva }: Props) {
    
    // Define el color de énfasis para la reserva, usando 'primary' o un color temático
    // Utilizaremos utilidades Tailwind que cambian con el modo oscuro (ej. bg-primary/10)
    const [estadoChanges, setEstadoChanges] = useState<{ [id: number]: string }>({});
    const [isSaving, setIsSaving] = useState(false);
    const handleEstadoChange = (habId: number, newState: string) => {
        setEstadoChanges(prev => ({ ...prev, [habId]: newState }));
    };

    const handleEliminarCheckin = (checkinId: number, nombreCliente: string) => {
        if (confirm(`¿Estás seguro de finalizar el Check-in (Checkout) para ${nombreCliente}?`)) {
            // Asumiendo que Checkout es una eliminación LÓGICA (cierra el check-in)
            router.delete(route('recepcion.checkins.destroy', checkinId), {
                preserveScroll: true,
                onSuccess: () => alert(`Checkout de ${nombreCliente} registrado.`),
            });
        }
    };
    const handleGuardarEstados = async () => {
        if (Object.keys(estadoChanges).length === 0) return;
        
        setIsSaving(true);
        
        // **ESTO REQUERIRÁ UN NUEVO ENDPOINT POST/PUT EN EL BACKEND**
        // Ejemplo de endpoint: PUT /recepcion/habitaciones/estado
        
        console.log("Enviando cambios de estado:", estadoChanges);
        
        try {
            // Aquí iría tu llamada AXIOS o Inertia POST/PUT
            // Ejemplo:
            // await router.put(route('recepcion.habitaciones.updateEstado'), { estados: estadoChanges });
            
            // Simulación de éxito:
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            // Actualizar el estado local de las habitaciones (solo si la llamada Inertia recarga la página)
            // Si usas Inertia.js, un éxito aquí generalmente recargará la página con la nueva prop.
            
            setEstadoChanges({}); // Limpiar cambios pendientes
            alert("Estados de habitación actualizados con éxito!");
            // Si el backend no recarga, podrías forzar una recarga o actualizar las props.
            // router.reload({ only: ['habitacionesDisponibles'] }); 

        } catch (error) {
            console.error("Error al guardar estados:", error);
            alert("Error al actualizar estados.");
        } finally {
            setIsSaving(false);
        }
    };
    const panelClasses = cn(
        // Fondo base ligero, que usa la variable 'muted'
        "bg-muted/50", 
        // Borde y texto usan el color primario para destacar la importancia
        "border-primary/50" 
    );

    const titleClasses = "text-primary"; // Utiliza el color principal del tema
    const cambiosPendientes = Object.keys(estadoChanges).length;

    return (
        <div className="lg:col-span-1 space-y-4">
            {/* Aplicamos las clases dinámicas al Card principal */}
            <Card className={cn(panelClasses, "sticky top-4")}>
                <CardHeader>
                    {/* El color del título ahora es 'primary' */}
                    <CardTitle className={cn("flex items-center gap-2 text-xl", titleClasses)}>
                        <ClipboardList className="h-5 w-5" />
                        Solicitudes de Reserva
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    
                    <div className="space-y-2">
                        {clienteQueRealizoLaReserva && (
                            <>
                                <div className="space-y-2">
                                    <h4 className="text-base font-semibold flex items-center gap-2 text-primary">
                                        <User className="h-4 w-4" />
                                        Reservado por:
                                    </h4>
                                    <p className="text-base font-medium">{clienteQueRealizoLaReserva.nombre}</p>
                                    <p className="text-sm text-muted-foreground">{clienteQueRealizoLaReserva.email}</p>
                                </div>
                                <Separator />
                            </>
                        )}
                        
                    </div>
                    <Separator />
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Hotel className="h-4 w-4 text-primary" /> {/* Usamos text-primary */}
                        Tipos de Habitación Solicitados
                    </h3>
                    {habitacionesSolicitadas.map((solicitud) => (
                        <div key={solicitud.tipo_id} 
                             // Usamos fondo 'background' o 'card' para que cambie automáticamente
                             className="p-3 bg-background rounded-lg border flex justify-between items-center"
                        >
                            <div className="space-y-0.5">
                                <p className="text-base font-semibold">{solicitud.nombre_tipo}</p>
                                <Badge variant="outline" className="text-xs">
                                    {solicitud.tipo_reserva === 'habitacion' ? 'Habitación' : 'Evento'}
                                </Badge>
                            </div>
                            <Badge 
                                // Usamos el color 'primary' (o 'accent') para destacar la cantidad
                                className="text-lg bg-primary hover:bg-primary/90"
                            >
                                x{solicitud.total_solicitado}
                            </Badge>
                        </div>
                    ))}
                    {habitacionesSolicitadas.length === 0 && (
                        <p className="text-sm italic text-muted-foreground">
                            No se especificaron solicitudes de habitación/evento.
                        </p>
                    )}

                    <Separator />
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-1 text-primary">
                            <KeyRound className="h-5 w-5" /> Habitaciones Asignadas ({habitacionesOcupadasPorReserva.length})
                        </h3>
                        
                        {cambiosPendientes > 0 && (
                            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex justify-between items-center">
                                <span className="text-sm font-medium text-yellow-800">
                                    {cambiosPendientes} cambio(s) de estado pendiente(s).
                                </span>
                                <Button 
                                    type="button" 
                                    size="sm" 
                                    className="bg-yellow-500 hover:bg-yellow-600"
                                    onClick={handleGuardarEstados}
                                    disabled={isSaving}
                                >
                                    <Save className="h-4 w-4 mr-1" />
                                    {isSaving ? 'Guardando...' : 'Guardar Estados'}
                                </Button>
                            </div>
                        )}

                        {habitacionesOcupadasPorReserva.map((hab) => (
                            <div key={hab.habitacion_evento_id} className="p-3 bg-background rounded-lg border">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="space-y-0.5">
                                        <Badge variant="outline" className="font-mono text-base">
                                            {hab.codigo}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground">{hab.tipo_nombre} ({hab.num_huespedes_activos} huéspedes)</p>
                                    </div>
                                    {/* Estado actual (puede ser el pendiente si existe, o el actual) */}
                                    <Badge 
                                        className={ESTADO_HABITACION_OPTIONS.find(o => o.value === (estadoChanges[hab.habitacion_evento_id] || hab.estado_actual))?.color || 'bg-gray-500'}
                                    >
                                        {hab.estado_actual.charAt(0).toUpperCase() + hab.estado_actual.slice(1)}
                                        {estadoChanges[hab.habitacion_evento_id] && ' *'}
                                    </Badge>
                                </div>
                                <Separator className="my-3" />
                                {/* Select de cambio de estado */}
                                {/* LISTA DE HUÉSPEDES EN ESTA HABITACIÓN (NUEVA SECCIÓN) */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                                        <User className="h-4 w-4 text-primary/80" /> Huéspedes Activos:
                                    </h4>
                                    
                                    {hab.huespedes_asignados.map((huesped) => (
                                        <div key={huesped.checkin_id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md border">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{huesped.nombre}</span>
                                                <span className="text-xs text-muted-foreground">{huesped.email}</span>
                                            </div>
                                            
                                            {/* Botón de Acción: Eliminar/Checkout */}
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleEliminarCheckin(huesped.checkin_id, huesped.nombre)}
                                            >
                                                <X className="h-4 w-4 mr-1" />
                                                Checkout
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="my-3" />
                                <select
                                    value={estadoChanges[hab.habitacion_evento_id] || hab.estado_actual}
                                    onChange={(e) => handleEstadoChange(hab.habitacion_evento_id, e.target.value)}
                                    className="w-full p-1.5 border rounded-lg text-sm bg-background"
                                >
                                    {ESTADO_HABITACION_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {habitacionesOcupadasPorReserva.length === 0 && (
                            <p className="text-sm italic text-muted-foreground">
                                Aún no hay habitaciones asignadas a check-ins activos de esta reserva.
                            </p>
                        )}
                    </div>
                    
                </CardContent>
            </Card>
        </div>
    );
}