import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';

interface EvolucionServicioData {
    periodo: string;
    cantidad: number;
    ingresos: number;
    [key: string]: any; // Index signature para compatibilidad con GenericChartData
}

interface ServicioInfo {
    id: number;
    nombre: string;
    precio: number;
}

interface EvolucionServiciosResponse {
    data: EvolucionServicioData[];
    servicio: ServicioInfo;
    periodo: string;
    metadata: {
        total_cantidad: number;
        total_ingresos: number;
        updated_at: string;
    };
}

interface UseEvolucionServiciosResult {
    data: EvolucionServicioData[];
    servicio: ServicioInfo | null;
    metadata: any;
    loading: boolean;
    error: string | null;
}

/**
 * Hook para obtener la evolución temporal de un servicio
 * @param servicioId - ID del servicio a consultar
 * @param periodo - Período de tiempo (hoy, semana, mes, anio)
 */
export function useEvolucionServicios(
    servicioId: number | null,
    periodo: string
): UseEvolucionServiciosResult {
    const [data, setData] = useState<EvolucionServicioData[]>([]);
    const [servicio, setServicio] = useState<ServicioInfo | null>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!servicioId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Usar route helper de Laravel
                const url = route('bi.api.evolucion-servicios', {
                    servicio_id: servicioId,
                    periodo: periodo,
                });

                const response = await axios.get<EvolucionServiciosResponse>(url);

                setData(response.data.data);
                setServicio(response.data.servicio);
                setMetadata(response.data.metadata);
            } catch (err: any) {
                console.error('Error fetching evolución servicios:', err);
                setError(err.response?.data?.error || 'Error al cargar los datos');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [servicioId, periodo]);

    return { data, servicio, metadata, loading, error };
}
