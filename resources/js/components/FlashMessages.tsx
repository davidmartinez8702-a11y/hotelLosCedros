// resources/js/components/FlashMessages.tsx
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

interface FlashProps {
    flash?: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
    };
    [key: string]: any;
}

export default function FlashMessages() {
    const { flash } = usePage<FlashProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.info) {
            toast.info(flash.info);
        }
        if (flash?.warning) {
            toast.warning(flash.warning);
        }
    }, [flash]);

    return null; // No renderiza nada visible
}