import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Minus, ConciergeBell, Utensils } from 'lucide-react';
import { formatCurrency } from '@/pages/Cuenta/utils/cuenta.config';
import type { ItemCarrito, ServicioDisponible, PlatilloDisponible } from '@/pages/Cuenta/types/cuenta.types';

interface AgregarConsumoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    servicios: ServicioDisponible[];
    platillos: PlatilloDisponible[];
    onConfirmar: (items: ItemCarrito[]) => void;
    processing: boolean;
}

export function AgregarConsumoDialog({
    open,
    onOpenChange,
    servicios,
    platillos,
    onConfirmar,
    processing
}: AgregarConsumoDialogProps) {
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState<'servicio' | 'platillo'>('servicio');
    const [itemSeleccionado, setItemSeleccionado] = useState<string>('');
    const [cantidad, setCantidad] = useState(1);

    const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const handleAgregarAlCarrito = () => {
        if (!itemSeleccionado) return;

        const lista = tipoSeleccionado === 'servicio' ? servicios : platillos;
        const item = lista.find(i => i.id === parseInt(itemSeleccionado));
        
        if (!item) return;

        const existente = carrito.findIndex(
            c => c.tipo === tipoSeleccionado && c.id === item.id
        );

        if (existente >= 0) {
            const nuevoCarrito = [...carrito];
            nuevoCarrito[existente].cantidad += cantidad;
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, {
                tipo: tipoSeleccionado,
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad,
            }]);
        }

        setItemSeleccionado('');
        setCantidad(1);
    };

    const handleRemoverDelCarrito = (index: number) => {
        setCarrito(carrito.filter((_, i) => i !== index));
    };

    const handleConfirmar = () => {
        onConfirmar(carrito);
        setCarrito([]);
        setItemSeleccionado('');
        setCantidad(1);
    };

    const handleClose = () => {
        onOpenChange(false);
        setCarrito([]);
        setItemSeleccionado('');
        setCantidad(1);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Agregar Consumos</DialogTitle>
                    <DialogDescription>
                        Selecciona servicios o platillos para agregar a la cuenta.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Selector de tipo */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tipo</Label>
                            <Select
                                value={tipoSeleccionado}
                                onValueChange={(v) => {
                                    setTipoSeleccionado(v as 'servicio' | 'platillo');
                                    setItemSeleccionado('');
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="servicio">
                                        <div className="flex items-center gap-2">
                                            <ConciergeBell className="h-4 w-4" />
                                            Servicio
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="platillo">
                                        <div className="flex items-center gap-2">
                                            <Utensils className="h-4 w-4" />
                                            Platillo
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Cantidad</Label>
                            <Input
                                type="number"
                                min={1}
                                value={cantidad}
                                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                            />
                        </div>
                    </div>

                    {/* Selector de item */}
                    <div className="space-y-2">
                        <Label>
                            {tipoSeleccionado === 'servicio' ? 'Servicio' : 'Platillo'}
                        </Label>
                        <Select
                            value={itemSeleccionado}
                            onValueChange={setItemSeleccionado}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                {(tipoSeleccionado === 'servicio' ? servicios : platillos).map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        {item.nombre} - {formatCurrency(item.precio)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={handleAgregarAlCarrito}
                        disabled={!itemSeleccionado}
                        className="w-full"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar al carrito
                    </Button>

                    {/* Carrito */}
                    {carrito.length > 0 && (
                        <div className="rounded-lg border p-4">
                            <h4 className="mb-3 font-medium">Carrito</h4>
                            <div className="space-y-2">
                                {carrito.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded bg-muted p-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.tipo === 'servicio' ? (
                                                <ConciergeBell className="h-4 w-4 text-blue-500" />
                                            ) : (
                                                <Utensils className="h-4 w-4 text-green-500" />
                                            )}
                                            <span>{item.nombre}</span>
                                            <Badge variant="secondary">x{item.cantidad}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {formatCurrency(item.precio * item.cantidad)}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => handleRemoverDelCarrito(index)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex justify-between border-t pt-3">
                                <span className="font-medium">Total:</span>
                                <span className="text-lg font-bold">
                                    {formatCurrency(totalCarrito)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmar}
                        disabled={carrito.length === 0 || processing}
                    >
                        {processing ? 'Guardando...' : 'Confirmar Consumos'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}