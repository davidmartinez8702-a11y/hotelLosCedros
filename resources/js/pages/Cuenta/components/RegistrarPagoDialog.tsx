import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/pages/Cuenta/utils/cuenta.config';

interface RegistrarPagoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    saldo: number;
    onConfirmar: (monto: number) => void;
    processing: boolean;
}

export function RegistrarPagoDialog({
    open,
    onOpenChange,
    saldo,
    onConfirmar,
    processing
}: RegistrarPagoDialogProps) {
    const [montoPago, setMontoPago] = useState('');

    const handleConfirmar = () => {
        const monto = parseFloat(montoPago);
        if (isNaN(monto) || monto <= 0) return;
        
        onConfirmar(monto);
        setMontoPago('');
    };

    const handleClose = () => {
        onOpenChange(false);
        setMontoPago('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Pago</DialogTitle>
                    <DialogDescription>
                        Saldo pendiente: {formatCurrency(saldo)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Monto a pagar</Label>
                        <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            max={saldo}
                            value={montoPago}
                            onChange={(e) => setMontoPago(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMontoPago((saldo / 2).toFixed(2))}
                        >
                            50%
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMontoPago(saldo.toFixed(2))}
                        >
                            100%
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmar}
                        disabled={!montoPago || parseFloat(montoPago) <= 0 || processing}
                    >
                        {processing ? 'Procesando...' : 'Confirmar Pago'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}