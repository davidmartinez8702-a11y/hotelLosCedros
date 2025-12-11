import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Save, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { BreadcrumbItem } from '@/types';

interface TipoHabitacion {
    id: number;
    nombre: string;
    tipo: 'habitacion' | 'evento';
    capacidad_total: number;
}

interface Props {
    tiposHabitacion: TipoHabitacion[];
}

export default function HabitacionCreate({ tiposHabitacion }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tipo_habitacion_id: '',
        codigo: '',
        piso: '',
        ala_seccion: '',
        vista: '',
        notas_internas: '',
    });

    const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoHabitacion | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Habitaciones', href: '/habitaciones' },
        { title: 'Nueva Habitación', href: '/habitaciones/create' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/habitaciones');
    };

    const handleTipoChange = (value: string) => {
        setData('tipo_habitacion_id', value);
        const tipo = tiposHabitacion.find((t) => t.id.toString() === value);
        setTipoSeleccionado(tipo || null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Habitación" />

            <div className="py-8 lg:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Registrar Nueva Habitación</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Tipo de Habitación */}
                                <div className="space-y-2">
                                    <Label htmlFor="tipo_habitacion_id">
                                        Tipo de Habitación <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.tipo_habitacion_id}
                                        onValueChange={handleTipoChange}
                                    >
                                        <SelectTrigger id="tipo_habitacion_id">
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="" disabled>Selecciona un tipo</SelectItem>
                                            {tiposHabitacion.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                    {tipo.nombre} - {tipo.tipo === 'habitacion' ? '🏨 Habitación' : '🎉 Salón'} (Cap: {tipo.capacidad_total})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo_habitacion_id && (
                                        <p className="text-sm text-red-500">{errors.tipo_habitacion_id}</p>
                                    )}
                                </div>

                                {/* Info del tipo seleccionado */}
                                {tipoSeleccionado && (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            <strong>Nombre heredado:</strong> {tipoSeleccionado.nombre}
                                            <br />
                                            <strong>Capacidad:</strong> {tipoSeleccionado.capacidad_total} personas
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Código */}
                                <div className="space-y-2">
                                    <Label htmlFor="codigo">
                                        Código de Habitación <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="codigo"
                                        placeholder="Ej: 101, 305, SC-A"
                                        value={data.codigo}
                                        onChange={(e) => setData('codigo', e.target.value)}
                                    />
                                    {errors.codigo && <p className="text-sm text-red-500">{errors.codigo}</p>}
                                    <p className="text-sm text-gray-500">
                                        Este código es el que verá el cliente para identificar su habitación
                                    </p>
                                </div>

                                {/* Grid para piso, ala y vista */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Piso */}
                                    <div className="space-y-2">
                                        <Label htmlFor="piso">Piso</Label>
                                        <Input
                                            id="piso"
                                            placeholder="Ej: 1, 3, PB"
                                            value={data.piso}
                                            onChange={(e) => setData('piso', e.target.value)}
                                        />
                                        {errors.piso && <p className="text-sm text-red-500">{errors.piso}</p>}
                                    </div>

                                    {/* Ala/Sección */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ala_seccion">Ala / Sección</Label>
                                        <Input
                                            id="ala_seccion"
                                            placeholder="Ej: Torre A, Ala Este"
                                            value={data.ala_seccion}
                                            onChange={(e) => setData('ala_seccion', e.target.value)}
                                        />
                                        {errors.ala_seccion && <p className="text-sm text-red-500">{errors.ala_seccion}</p>}
                                    </div>

                                    {/* Vista */}
                                    <div className="space-y-2">
                                        <Label htmlFor="vista">Vista</Label>
                                        <Input
                                            id="vista"
                                            placeholder="Ej: Mar, Jardín, Ciudad"
                                            value={data.vista}
                                            onChange={(e) => setData('vista', e.target.value)}
                                        />
                                        {errors.vista && <p className="text-sm text-red-500">{errors.vista}</p>}
                                    </div>
                                </div>

                                {/* Notas internas */}
                                <div className="space-y-2">
                                    <Label htmlFor="notas_internas">Notas Internas (Solo Staff)</Label>
                                    <Textarea
                                        id="notas_internas"
                                        placeholder="Notas o comentarios internos sobre esta habitación..."
                                        value={data.notas_internas}
                                        onChange={(e) => setData('notas_internas', e.target.value)}
                                        rows={4}
                                    />
                                    {errors.notas_internas && <p className="text-sm text-red-500">{errors.notas_internas}</p>}
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="h-4 w-4 mr-2" />
                                        {processing ? 'Guardando...' : 'Guardar Habitación'}
                                    </Button>
                                </div>

                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AppLayout>
    );
}