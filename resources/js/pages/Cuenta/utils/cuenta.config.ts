export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatCurrency = (monto: number) => {
    return `Bs. ${monto}`;
};

// config/cuenta.config.ts
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { route } from 'ziggy-js';

export const estadoConfig = {
    pendiente: { 
        label: 'Pendiente', 
        variant: 'warning' as const, 
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    pagada: { 
        label: 'Pagada', 
        variant: 'success' as const, 
        icon: CheckCircle2,
        color: 'text-green-600 bg-green-50 border-green-200'
    },
    cancelado: { 
        label: 'Cancelado', 
        variant: 'destructive' as const, 
        icon: XCircle,
        color: 'text-red-600 bg-red-50 border-red-200'
    },
};

export const getBreadcrumbs = (cuentaId: number) => [
    // { title: 'Dashboard', href: route('dashboard') },
    { title: "Recepción", href: route("recepcion.reservas.index") },
    { title: 'Checkins', href: route('recepcion.checkins.index') },
    { title: `Cuenta #${cuentaId}`, href: '#' },
];