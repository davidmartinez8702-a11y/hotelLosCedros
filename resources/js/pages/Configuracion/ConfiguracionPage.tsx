import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Loader2, Zap } from 'lucide-react';
import { route } from 'ziggy-js';


const breadcrumbs = [
    { title: 'Dashboard', href: route('dashboard') }, 
    { title: 'UI Showcase', href: route('configuracion.index') } 
];

export default function ConfiguracionPage() {
    const [inputValue, setInputValue] = useState('Ejemplo de Input');

    return (
        // Usamos el layout principal de la aplicación
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Componentes UI" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    <h1 className="text-3xl font-extrabold text-gray-200 border-b pb-2">
                        Componentes del Design System
                    </h1>
                    
                    {/* SECCIÓN 1: CARDS Y FORMULARIO */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Entradas y Etiquetas</CardTitle>
                            <CardDescription>Demostración de Input, Label y Card.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Input Estándar */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="correo@ejemplo.com" 
                                    value={inputValue} 
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <p className="text-sm text-gray-500">Valor actual: {inputValue}</p>
                            </div>
                            
                            {/* Input Deshabilitado */}
                            <div className="space-y-2">
                                <Label htmlFor="name-disabled">Nombre (Deshabilitado)</Label>
                                <Input id="name-disabled" placeholder="No se puede editar" disabled />
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* SECCIÓN 2: BOTONES Y BADGES */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Acciones y Estados</CardTitle>
                            <CardDescription>Variantes de botones y badges.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            
                            {/* Botones */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <Button>Primario</Button>
                                <Button variant="secondary">Secundario</Button>
                                <Button variant="outline">Contorno</Button>
                                <Button variant="ghost">Transparente</Button>
                                <Button variant="destructive">Eliminar</Button>
                                <Button disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando...
                                </Button>
                                <Button size="icon" variant="default">
                                    <Zap className="h-4 w-4" />
                                </Button>
                            </div>
                            
                            {/* Badges */}
                            <div className="flex flex-wrap gap-3 items-center pt-2">
                                <Badge>Defecto</Badge>
                                <Badge variant="secondary">Secundario</Badge>
                                <Badge variant="destructive">Crítico</Badge>
                                <Badge variant="outline">Pendiente</Badge>
                            </div>

                        </CardContent>
                    </Card>
                    
                    <Separator />

                    {/* SECCIÓN 3: MODAL Y SPINNER */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Spinner/Loader */}
                        <Card className="shadow-lg col-span-1">
                            <CardHeader>
                                <CardTitle>Indicador de Carga</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center h-20">
                                <Spinner  />
                            </CardContent>
                        </Card>

                        {/* Diálogo/Modal */}
                        <Card className="shadow-lg col-span-2">
                            <CardHeader>
                                <CardTitle>Diálogo (Modal)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Abrir Configuración</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Confirmar Acción</DialogTitle>
                                            <DialogDescription>
                                                ¿Estás seguro de que quieres guardar estos cambios?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end space-x-3 mt-4">
                                            <Button variant="ghost">Cancelar</Button>
                                            <Button>Confirmar</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}