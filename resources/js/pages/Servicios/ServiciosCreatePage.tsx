import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/shared/TextArea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { route } from 'ziggy-js';

// === INTERFACE CLARA PARA LOS DATOS DEL FORMULARIO ===
interface CategoriaOption {
    id: number;
    nombre: string;
}

interface ServicioFormData {
    nombre: string;
    descripcion: string;
    precio: string;
    estado: 'activo' | 'inactivo';
    categoria_id: string; // Se maneja como string en el formulario
}

interface Props {
    categorias: CategoriaOption[]; 
    errors: Record<keyof ServicioFormData, string>; 
}
// =====================================================

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: route('servicios.index'),
    },
    {
        title: 'Crear Servicio',
        href: route('servicios.create'),
    },
];

export default function ServiciosCreatePage({ categorias, errors }: Props) {
    // Establecemos categoria_id inicial con el primer ID disponible o null
    const initialCategoriaId = categorias.length > 0 ? String(categorias[0].id) : '';

    const { data, setData, post, processing } = useForm<ServicioFormData>({
        nombre: '',
        descripcion: '',
        precio: '',
        estado: 'activo',
        categoria_id: initialCategoriaId, // Usamos el ID inicial
    });

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Asegura que solo se ingresen números y un punto decimal
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setData('precio', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Enviamos la data completa, incluyendo el categoria_id
        post(route('servicios.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Servicio" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href={route('servicios.index')}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Servicio</h1>
                            <p className="text-muted-foreground">
                                Completa el formulario para registrar un nuevo servicio.
                            </p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Servicio</CardTitle>
                            <CardDescription>
                                Todos los campos marcados con <span className="text-red-500">*</span> son obligatorios.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">
                                            Nombre <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            placeholder="Ej: Mantenimiento Preventivo"
                                            required
                                        />
                                        {errors.nombre && (
                                            <p className="text-sm text-red-500">{errors.nombre}</p>
                                        )}
                                    </div>

                                    {/* Precio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="precio">
                                            Precio <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="precio"
                                            type="text"
                                            value={data.precio}
                                            onChange={handlePriceChange}
                                            placeholder="0.00"
                                            required
                                        />
                                        {errors.precio && (
                                            <p className="text-sm text-red-500">{errors.precio}</p>
                                        )}
                                    </div>

                                    {/* Categoría */}
                                    <div className="space-y-2">
                                        <Label htmlFor="categoria_id">
                                            Categoría <span className="text-red-500">*</span>
                                        </Label>
                                        {categorias.length === 0 ? (
                                            <div className="p-2 border border-dashed border-red-400 rounded-md text-sm text-red-700 bg-red-50 h-10 flex items-center">
                                                No hay categorías activas. Cree una primero.
                                            </div>
                                        ) : (
                                            <Select
                                                value={data.categoria_id}
                                                onValueChange={(value) => setData('categoria_id', value)}
                                            >
                                                <SelectTrigger id="categoria_id">
                                                    <SelectValue placeholder="Seleccionar categoría" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categorias.map((categoria) => (
                                                        <SelectItem key={categoria.id} value={String(categoria.id)}>
                                                            {categoria.nombre}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        {errors.categoria_id && (
                                            <p className="text-sm text-red-500">{errors.categoria_id}</p>
                                        )}
                                    </div>

                                    {/* Estado */}
                                    <div className="space-y-2">
                                        <Label htmlFor="estado">
                                            Estado <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={data.estado}
                                            onValueChange={(value) => setData('estado', value as 'activo' | 'inactivo')}
                                        >
                                            <SelectTrigger id="estado">
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activo">Activo</SelectItem>
                                                <SelectItem value="inactivo">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.estado && (
                                            <p className="text-sm text-red-500">{errors.estado}</p>
                                        )}
                                    </div>
                                    
                                    {/* Descripción (Full Width) */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="descripcion">
                                            Descripción <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="descripcion"
                                            value={data.descripcion}
                                            onChange={(e) => setData('descripcion', e.target.value)}
                                            placeholder="Detalles sobre el servicio, alcance, duración, etc."
                                            
                                        />
                                        {errors.descripcion && (
                                            <p className="text-sm text-red-500">{errors.descripcion}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('servicios.index')}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing || categorias.length === 0}>
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Guardar Servicio
                                            </>
                                        )}
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
