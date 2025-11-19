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
import { UserProp } from './usuarios';

interface UsuariosUpdatePageProps {
    usuario: UserProp;
}

export default function UsuariosUpdatePage({ usuario }: UsuariosUpdatePageProps) {
    
    const breadcrumbs = [
        { title: 'Usuarios', href: route('usuarios.index') }, 
        { title: 'Editar', href: route('usuarios.edit', usuario.id) }
    ];

    // ✅ Inicializa el formulario con los datos del usuario
    const { data, setData, put, processing, errors, reset, recentlySuccessful, isDirty } = useForm({
        name: usuario.name || '',
        email: usuario.email || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('¡Usuario actualizado exitosamente!', {
                description: 'Los cambios han sido guardados.',
            });
            // Limpia solo los campos de contraseña
            setData({
                ...data,
                password: '',
                password_confirmation: '',
            });
        }
    }, [recentlySuccessful]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Si no se ingresó contraseña, no la enviamos
        // const dataToSend = data.password 
        // ? { 
        //     name: data.name, 
        //     email: data.email, 
        //     password: data.password, 
        //     password_confirmation: data.password_confirmation 
        //   }
        // : { 
        //     name: data.name, 
        //     email: data.email 
        //   };
        //   put(route('usuarios.update', usuario.id), {
        //     preserveScroll: true,
        //     onBefore: () => {
        //         // Modifica los datos del formulario temporalmente
        //         Object.keys(dataToSend).forEach(key => {
        //             if (!(key in dataToSend)) {
        //                 delete (data as any)[key];
        //             }
        //         });
        //     },
        //     onError: () => {
        //         toast.error('Error al actualizar usuario', {
        //             description: 'Por favor revisa los campos marcados en rojo.',
        //         });
        //     }
        // });

        put(route('usuarios.update', usuario.id), {
            preserveScroll: true,
            onError: () => {
                toast.error('Error al actualizar usuario', {
                    description: 'Por favor revisa los campos marcados en rojo.',
                });
            }
        });
    };

    const handleCancel = () => {
        if (isDirty) {
            if (confirm('¿Descartar los cambios realizados?')) {
                reset();
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Usuario: ${usuario.name}`} />

            <div className="py-8 lg:py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    
                    <Link 
                        href={route('usuarios.index')} 
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al listado
                    </Link>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Editar Usuario</CardTitle>
                            <CardDescription>
                                Actualiza la información del usuario. Deja los campos de contraseña vacíos si no deseas cambiarla.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            
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

                                {/* Separador */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                        Cambiar Contraseña (Opcional)
                                    </h4>
                                </div>

                                {/* Campo Contraseña */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Nueva Contraseña</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Dejar vacío para no cambiar" 
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
                                    <Label htmlFor="password_confirmation">Confirmar Nueva Contraseña</Label>
                                    <Input 
                                        id="password_confirmation" 
                                        type="password" 
                                        placeholder="Confirmar contraseña" 
                                        value={data.password_confirmation} 
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={!data.password}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Solo completar si deseas cambiar la contraseña
                                    </p>
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={processing}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button 
                                        disabled={processing || !isDirty} 
                                        type="submit"
                                    >
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Actualizar Usuario
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