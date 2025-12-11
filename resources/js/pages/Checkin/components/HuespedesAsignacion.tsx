// HuespedesAsignacion.tsx (Actualizado con Selectores de Fecha/Hora)

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { User, X, DoorOpen, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/PopoverWrapper';
import { Calendar } from '@/shared/components/CalendarioModified'; // Asumimos que este componente existe
import { Input } from '@/components/ui/input';
import { format, parseISO } from 'date-fns'; // Importamos format y parseISO para manejo de fechas
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';


// --- INTERFACES DE DATOS (Mapeamos las interfaces originales) ---
interface CheckinData {
    id: number;
    nombre: string;
    email: string;
    is_principal: boolean;
    habitacion_evento_id: string;
    fecha_entrada: string | null; // YYYY-MM-DD HH:mm:ss string
    fecha_salida: string | null; // YYYY-MM-DD HH:mm:ss string o null
    // ... otros campos
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

interface Errors {
    [key: string]: string | undefined;
}

interface ClienteReservaPrincipal {
    id: number;
    nombre: string;
    email: string;
    is_principal: true;
}

// Props para el componente HuespedesAsignacion
interface Props {
    checkins: CheckinData[];
    recepcionistaId: string;
    processing: boolean;
    errors: Errors;
    habitacionesDisponibles: HabitacionDisponible[];
    assignedHabitacionIds: string[];
    recepcionistas: RecepcionistaOption[];

    // Handlers (MODIFICADOS PARA RECIBIR LA DATA COMPLETA DE CHECKINS)
    removeHuesped: (clienteId: number) => void;
    handleHabitacionChange: (index: number, value: string) => void; // Mantiene el manejo simple de Select
    handleRecepcionistaChange: (value: string) => void;
    // NUEVOS HANDLERS PARA MANEJO DE FECHA/HORA
    handleDateChange: (index: number, field: 'fecha_entrada' | 'fecha_salida', date: Date | null) => void;
    handleTimeChange: (index: number, field: 'fecha_entrada' | 'fecha_salida', time: string) => void;
    
}

export default function HuespedesAsignacion({
    checkins,
    recepcionistaId,
    processing,
    errors,
    habitacionesDisponibles,
    assignedHabitacionIds,
    recepcionistas,
    removeHuesped,
    handleHabitacionChange,
    handleRecepcionistaChange,
    handleDateChange,
    handleTimeChange,
    
}: Props) {


    // Función para extraer la hora (HH:mm) de un string ISO (YYYY-MM-DDTHH:mm:ss...)
    const getTimeFromISO = (isoString: string | null): string => {
        if (!isoString) return '';
        // Si el string es solo YYYY-MM-DD (sin tiempo), devuelve vacío
        if (isoString.length <= 10) return '';
        try {
            return format(parseISO(isoString), 'HH:mm');
        } catch (e) {
            return '';
        }
    };

    // Función para extraer solo la parte de la fecha (Date objeto)
    const getDateFromISO = (isoString: string | null): Date | null => {
        if (!isoString) return null;
        try {
            // parseISO puede manejar YYYY-MM-DD o YYYY-MM-DDTHH:mm
            return parseISO(isoString);
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="space-y-6">
            
            {/* ... Mostrar errores generales ... */}
            {errors['checkins'] && (
                <p className="text-sm text-destructive font-semibold">⚠️ {errors['checkins']}</p>
            )}

            {checkins.length === 0 && (
                <p className="text-sm italic text-muted-foreground">
                    No hay huéspedes en la bolsa de check-ins.
                </p>
            )}

            {/* Mapeo de Huéspedes */}
            <div className="space-y-4">
                {checkins.map((huesped, index) => (
                    <div
                        key={huesped.id}
                        className="p-4 border rounded-lg bg-gray-50 space-y-4"
                    >
                        {/* Fila 1: Cliente y Botón Remover */}
                        <div className="flex justify-between items-start border-b pb-3">
                            <div className="space-y-1">
                                <p className="font-semibold flex items-center gap-1">
                                    <User className="h-4 w-4 text-primary" />
                                    {huesped.nombre}
                                    {huesped.is_principal && <Badge variant="default" className="bg-primary/80 ml-2">Principal</Badge>}
                                </p>
                                <p className="text-sm text-muted-foreground">{huesped.email}</p>
                            </div>

                            {!huesped.is_principal && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeHuesped(huesped.id)}
                                    title="Remover huésped"
                                >
                                    <X className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </div>

                        {/* Fila 2: Asignación de Habitación */}
                        <div className="space-y-2">
                            <label htmlFor={`habitacion-${index}`} className="text-sm font-medium">Asignar Habitación/Evento</label>

                            <select
                                id={`habitacion-${index}`}
                                value={huesped.habitacion_evento_id}
                                onChange={(e) => handleHabitacionChange(index, e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">-- Seleccionar Habitación Disponible --</option>
                                {habitacionesDisponibles.map((hab: HabitacionDisponible) => (
                                    <option
                                        key={hab.id}
                                        value={hab.id.toString()}
                                    >
                                        {hab.codigo} - {hab.nombre} ({hab.tipo_nombre})
                                    </option>
                                ))}
                            </select>

                            {errors[`checkins.${index}.habitacion_evento_id` as keyof Props] && (
                                <p className="text-sm text-destructive">
                                    {errors[`checkins.${index}.habitacion_evento_id` as keyof Props]}
                                </p>
                            )}
                        </div>

                        {/* Fila 3: Fechas y Horas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">

                            {/* Fecha de Entrada (Requerido) */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <DoorOpen className="h-3 w-3 text-green-600" /> Entrada
                                </Label>
                                <div className="flex gap-2">
                                    {/* Selector de Fecha */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !huesped.fecha_entrada && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {huesped.fecha_entrada
                                                    ? format(getDateFromISO(huesped.fecha_entrada)!, "dd/MM/yyyy")
                                                    : "Seleccionar fecha"
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                //selected={getDateFromISO(huesped.fecha_entrada)}
                                                onSelect={(date) => handleDateChange(index, 'fecha_entrada', date ?? null)}
                                                locale={es}

                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {/* Input de Hora */}
                                    <div className="relative w-[100px]">
                                        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="time"
                                            className="pl-8"
                                            value={getTimeFromISO(huesped.fecha_entrada)}
                                            onChange={(e) => handleTimeChange(index, 'fecha_entrada', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                {errors[`checkins.${index}.fecha_entrada` as keyof Props] && (
                                    <p className="text-xs text-destructive mt-1">
                                        {errors[`checkins.${index}.fecha_entrada` as keyof Props]}
                                    </p>
                                )}
                            </div>

                            {/* Fecha de Salida (Opcional/Nulo) */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <DoorOpen className="h-3 w-3 text-red-600" /> Salida (Opcional)
                                </Label>
                                <div className="flex gap-2">
                                    {/* Selector de Fecha */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !huesped.fecha_salida && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {huesped.fecha_salida
                                                    ? format(getDateFromISO(huesped.fecha_salida)!, "dd/MM/yyyy")
                                                    : "Sin fecha de salida"
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <div className="p-2 border-b">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => handleDateChange(index, 'fecha_salida', null)}
                                                >
                                                    Limpiar fecha
                                                </Button>
                                            </div>
                                            <Calendar
                                                mode="single"
                                                //selected={getDateFromISO(huesped.fecha_salida)}
                                                onSelect={(date) => handleDateChange(index, 'fecha_salida', date ?? null)}
                                                locale={es}

                                                // Deshabilitar fechas anteriores a la entrada
                                                disabled={(date) => getDateFromISO(huesped.fecha_entrada) ? date < getDateFromISO(huesped.fecha_entrada)! : false}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {/* Input de Hora */}
                                    <div className="relative w-[100px]">
                                        <Clock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="time"
                                            className="pl-8"
                                            value={getTimeFromISO(huesped.fecha_salida)}
                                            onChange={(e) => handleTimeChange(index, 'fecha_salida', e.target.value)}
                                            // Solo requerido si hay fecha
                                            required={!!huesped.fecha_salida}
                                            disabled={!huesped.fecha_salida}
                                        />
                                    </div>
                                </div>
                                {errors[`checkins.${index}.fecha_salida` as keyof Props] && (
                                    <p className="text-xs text-destructive mt-1">
                                        {errors[`checkins.${index}.fecha_salida` as keyof Props]}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Selector de Recepcionista (Sección administrativa) */}
            <div className="space-y-2 pt-4 border-t">
                <label className="text-sm font-medium">Recepcionista</label>
                <select
                    value={recepcionistaId}
                    onChange={(e) => handleRecepcionistaChange(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                >
                    {recepcionistas.map((recep) => (
                        <option key={recep.id} value={recep.id.toString()}>
                            {recep.nombre}
                        </option>
                    ))}
                </select>
                {errors.recepcionista_id && (
                    <p className="text-sm text-destructive">{errors.recepcionista_id}</p>
                )}
            </div>

        </div>
    );
}