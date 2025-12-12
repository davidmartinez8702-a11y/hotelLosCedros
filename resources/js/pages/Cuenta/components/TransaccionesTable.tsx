import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Receipt, ConciergeBell, Utensils, Trash2, Plus } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { AlertDialogFooter, AlertDialogHeader } from '@/shared/ui/alert-dialog';
import { formatCurrency, formatDateTime } from '@/pages/Cuenta/utils/cuenta.config';
import type { Transaccion } from '@/pages/Cuenta/types/cuenta.types';

interface TransaccionesTableProps {
    transacciones: Transaccion[];
    montoTotal: number;
    isPendiente: boolean;
    onEliminar: (transaccionId: number) => void;
    onAgregarPrimero?: () => void;
}

export function TransaccionesTable({ 
    transacciones, 
    montoTotal, 
    isPendiente, 
    onEliminar,
    onAgregarPrimero 
}: TransaccionesTableProps) {
    if (transacciones.length === 0) {
        return (
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="border-b p-6">
                    <div className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Transacciones</h3>
                        <Badge variant="secondary">0</Badge>
                    </div>
                </div>
                <div className="p-12 text-center">
                    <Receipt className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                        No hay transacciones registradas
                    </p>
                    {isPendiente && onAgregarPrimero && (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={onAgregarPrimero}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar primer consumo
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            <div className="border-b p-6">
                <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Transacciones</h3>
                    <Badge variant="secondary">{transacciones.length}</Badge>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">
                                Cantidad
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                                Precio Unit.
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                                Subtotal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                                Fecha
                            </th>
                            {isPendiente && (
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">
                                    Acción
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transacciones.map((transaccion) => {
                            const item = transaccion.servicio || transaccion.platillo;
                            return (
                                <tr key={transaccion.id} className="hover:bg-muted/50">
                                    <td className="px-6 py-4">
                                        {transaccion.tipo === 'servicio' ? (
                                            <Badge className="bg-blue-100 text-blue-700">
                                                <ConciergeBell className="mr-1 h-3 w-3" />
                                                Servicio
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-green-100 text-green-700">
                                                <Utensils className="mr-1 h-3 w-3" />
                                                Platillo
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {item?.nombre || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {transaccion.cantidad}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {formatCurrency(item?.precio || 0)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        {formatCurrency(transaccion.subtotal)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {formatDateTime(transaccion.created_at)}
                                    </td>
                                    {isPendiente && (
                                        <td className="px-6 py-4 text-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            ¿Eliminar transacción?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Se eliminará "{item?.nombre}" de la cuenta.
                                                            Esta acción no se puede deshacer.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => onEliminar(transaccion.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Eliminar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="bg-muted/50">
                        <tr>
                            <td colSpan={4} className="px-6 py-4 font-semibold">
                                Total
                            </td>
                            <td className="px-6 py-4 text-right text-lg font-bold">
                                {formatCurrency(montoTotal)}
                            </td>
                            <td colSpan={isPendiente ? 2 : 1}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}