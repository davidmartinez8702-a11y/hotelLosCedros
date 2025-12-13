import { usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { SharedData } from '@/types'; // Asumiendo que SharedData está definido en '@/types'

/**
 * Hook para obtener la ruta y el título del Dashboard según el rol del usuario.
 * @returns {{ path: string; title: string; }}
 */
export const useDashboardRoute = () => {
    // Obtenemos los props compartidos de Inertia, incluyendo el rol del usuario
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.rol ?? 'cliente'; // Default a 'cliente' si no está definido

    let path = route('dashboard'); // Ruta por defecto/fallback
    let title = 'Dashboard';

    switch (userRole) {
        case 'administrador':
            // Asumiendo que el administrador usa el dashboard de BI
            path = route('bi.index-v2'); 
            title = 'Dashboard';
            break;
        case 'recepcionista':
            // Usa el dashboard operativo que acabamos de crear
            path = route('recepcionista.dashboard');
            title = 'Dashboard';
            break;
        case 'cliente':
            // El cliente ve sus reservas como su dashboard principal
            path = route('clientes.dashboard');
            title = 'Dashboard';
            break;
        default:
            // Fallback en caso de rol desconocido
            path = route('bi.index-v2');
            title = 'Dashboard';
            break;
    }

    return { path, title };
};