import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react'; 
import { route } from 'ziggy-js';
import { toast } from 'sonner';

const breadcrumbs = [
    { title: 'Usuarios', href: route('usuarios.index') }, 
    { title: 'Crear', href: route('usuarios.create') }
];

export default function UsuariosCreatePage() {
    
    // ✅ useForm maneja los errores automáticamente
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('¡Usuario creado exitosamente!', {
                description: 'Puedes crear otro usuario si lo deseas.',
            });
            reset(); // Limpia todos los campos
            // Opcional: Mostrar un toast
           // toast.success('Usuario creado exitosamente. Puedes crear otro.');
        }
    }, [recentlySuccessful]);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('usuarios.store'),{
            preserveScroll: true,
            onSuccess: () => {}
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="py-8 lg:py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    
                    <Link 
                        href={route('usuarios.index')} 
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al listado
                    </Link>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Crear Nuevo Usuario</CardTitle>
                            <CardDescription>
                                Ingrese la información del nuevo usuario y su contraseña inicial.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentlySuccessful && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                                    ✓ Usuario creado exitosamente. Puedes crear otro.
                                </div>
                            )}
                            
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Campo Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        placeholder="Fernando Tello" 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Campo Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="usuario@ejemplo.com" 
                                        value={data.email} 
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Campo Contraseña */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={data.password} 
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Campo Confirmar Contraseña */}
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                                    <Input 
                                        id="password_confirmation" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={data.password_confirmation} 
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>

                                {/* Botón de Envío */}
                                <div className="flex justify-end gap-4">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => reset()}
                                        disabled={processing}
                                    >
                                        Limpiar
                                    </Button>
                                    <Button 
                                        disabled={processing} 
                                        type="submit" 
                                        className="w-full sm:w-auto"
                                    >
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Crear Usuario
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