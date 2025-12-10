import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/PopoverWrapper';
import { Calendar } from '@/shared/components/CalendarioModified';
import { 
    ArrowLeft, 
    Calendar as CalendarIcon, 
    User, 
    Building2, 
    UserCog,
    Save
} from 'lucide-react';
import { route } from 'ziggy-js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// --- Interfaces ---
interface Usuario {
    id: number;
    name: string;
    email: string;
}

interface Cliente {
    id: number;
    user: Usuario;
}

interface Recepcionista {
    id: number;
    user: Usuario;
}

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
}

interface HabitacionEvento {
    id: number;
    nombre: string;
    codigo: string;
    tipo_habitacion: TipoHabitacion;
}

interface Checkin {
    id: number;
    cliente: Cliente;
    recepcionista_id: number;
    habitacion_evento_id: number;
    fecha_entrada: string;
    fecha_salida: string | null;
}

interface RecepcionistaOption {
    id: number;
    nombre: string;
    email: string;
}

interface HabitacionEventoOption {
    id: number;
    codigo: string;
    nombre: string;
    tipo: string;
}

interface Props {
    checkin: Checkin;
    recepcionistas: RecepcionistaOption[];
    habitacionesEventos: HabitacionEventoOption[];
}

interface FormData {
    fecha_entrada: string;
    fecha_salida: string | null;
    recepcionista_id: string;
    habitacion_evento_id: string;
}

export default function CheckinEdit({ checkin, recepcionistas, habitacionesEventos }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        fecha_entrada: checkin.fecha_entrada,
        fecha_salida: checkin.fecha_salida || '',
        recepcionista_id: checkin.recepcionista_id.toString(),
        habitacion_evento_id: checkin.habitacion_evento_id.toString(),
    });

    // Estados para los calendarios
    const [fechaEntrada, setFechaEntrada] = React.useState<Date | undefined>(
        checkin.fecha_entrada ? new Date(checkin.fecha_entrada) : undefined
    );
    const [fechaSalida, setFechaSalida] = React.useState<Date | undefined>(
        checkin.fecha_salida ? new Date(checkin.fecha_salida) : undefined
    );

    const handleFechaEntradaChange = (date: Date | undefined) => {
        setFechaEntrada(date);
        setData('fecha_entrada', date ? format(date, 'yyyy-MM-dd') : '');
    };

    const handleFechaSalidaChange = (date: Date | undefined) => {
        setFechaSalida(date);
        setData('fecha_salida', date ? format(date, 'yyyy-MM-dd') : '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('recepcion.checkins.update', checkin.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Recepción', href: '#' },
                { title: 'Check-ins', href: route('recepcion.checkins.index') },
                { title: `Editar #${checkin.id}`, href: route('recepcion.checkins.edit', checkin.id) },
            ]}
        >
            <Head title={`Editar Check-in #${checkin.id}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link href={route('recepcion.checkins.show', checkin.id)}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Editar Check-in #{checkin.id}
                            </h1>
                            <p className="text-muted-foreground">
                                Modifica los datos del check-in
                            </p>
                        </div>
                    </div>

                    {/* Info del Cliente (solo lectura) */}
                    <Card className="bg-muted/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User className="h-5 w-5 text-primary" />
                                Cliente (No editable)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{checkin.cliente.user.name}</p>
                                    <p className="text-muted-foreground">{checkin.cliente.user.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Información del Check-in</CardTitle>
                                <CardDescription>
                                    Modifica los campos necesarios
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Fechas */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Fecha de Entrada */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-green-600" />
                                            Fecha de Entrada <span className="text-destructive">*</span>
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !fechaEntrada && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {fechaEntrada 
                                                        ? format(fechaEntrada, "dd 'de' MMMM, yyyy", { locale: es }) 
                                                        : "Seleccionar fecha"
                                                    }
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={fechaEntrada}
                                                    onSelect={handleFechaEntradaChange}
                                                    locale={es}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.fecha_entrada && (
                                            <p className="text-sm text-destructive">{errors.fecha_entrada}</p>
                                        )}
                                    </div>

                                    {/* Fecha de Salida */}
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-red-600" />
                                            Fecha de Salida
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !fechaSalida && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {fechaSalida 
                                                        ? format(fechaSalida, "dd 'de' MMMM, yyyy", { locale: es }) 
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
                                                        onClick={() => handleFechaSalidaChange(undefined)}
                                                    >
                                                        Limpiar fecha
                                                    </Button>
                                                </div>
                                                <Calendar
                                                    mode="single"
                                                    selected={fechaSalida}
                                                    onSelect={handleFechaSalidaChange}
                                                    locale={es}
                                                    disabled={(date) => fechaEntrada ? date < fechaEntrada : false}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.fecha_salida && (
                                            <p className="text-sm text-destructive">{errors.fecha_salida}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Dejar vacío si el huésped aún no ha salido
                                        </p>
                                    </div>
                                </div>

                                {/* Habitación/Evento */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-blue-600" />
                                        Habitación / Evento <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.habitacion_evento_id}
                                        onValueChange={(value) => setData('habitacion_evento_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar habitación o evento" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {habitacionesEventos.map((hab) => (
                                                <SelectItem key={hab.id} value={hab.id.toString()}>
                                                    <span className="flex items-center gap-2">
                                                        <Badge 
                                                            variant="outline" 
                                                            className={cn(
                                                                "font-mono text-xs",
                                                                hab.tipo === 'habitacion' 
                                                                    ? "border-blue-200 bg-blue-50 text-blue-700" 
                                                                    : "border-purple-200 bg-purple-50 text-purple-700"
                                                            )}
                                                        >
                                                            {hab.codigo}
                                                        </Badge>
                                                        {hab.nombre}
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.habitacion_evento_id && (
                                        <p className="text-sm text-destructive">{errors.habitacion_evento_id}</p>
                                    )}
                                </div>

                                {/* Recepcionista */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <UserCog className="h-4 w-4 text-purple-600" />
                                        Recepcionista <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.recepcionista_id}
                                        onValueChange={(value) => setData('recepcionista_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar recepcionista" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {recepcionistas.map((recep) => (
                                                <SelectItem key={recep.id} value={recep.id.toString()}>
                                                    <span className="flex flex-col">
                                                        <span>{recep.nombre}</span>
                                                        <span className="text-xs text-muted-foreground">{recep.email}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.recepcionista_id && (
                                        <p className="text-sm text-destructive">{errors.recepcionista_id}</p>
                                    )}
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end gap-4 pt-4 border-t">
                                    <Link href={route('recepcion.checkins.show', checkin.id)}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
