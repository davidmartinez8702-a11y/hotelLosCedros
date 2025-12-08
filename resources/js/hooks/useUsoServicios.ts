import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';

interface UsoServiciosData {
    periodo: number | string;
    [key: string]: any; // Para las propiedades dinámicas de servicios
}

interface ServicioInfo {
    id: number;
    nombre: string;
    precio: number;
}

interface UsoServiciosResponse {
    data: UsoServiciosData[];
    ejeX: string[];
    metadata: {
        granularidad: string;
        periodo: string;
        servicios: ServicioInfo[];
    };
}

interface UseUsoServiciosParams {
    granularidad: 'anio' | 'mes' | 'dia';
    anio: number;
    mes?: number;
    dia?: number;
}

interface UseUsoServiciosResult {
    data: UsoServiciosData[];
    ejeX: string[];
    metadata: any;
    loading: boolean;
    error: string | null;
}

/**
 * Hook para obtener el uso de todos los servicios con granularidad dinámica
 */
export function useUsoServicios(params: UseUsoServiciosParams): UseUsoServiciosResult {
    const [data, setData] = useState<UsoServiciosData[]>([]);
    const [ejeX, setEjeX] = useState<string[]>([]);
    const [metadata, setMetadata] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = route('bi.api.uso-servicios', {
                    granularidad: params.granularidad,
                    anio: params.anio,
                    ...(params.mes && { mes: params.mes }),
                    ...(params.dia && { dia: params.dia }),
                });

                const response = await axios.get<UsoServiciosResponse>(url);

                setData(response.data.data);
                setEjeX(response.data.ejeX);
                setMetadata(response.data.metadata);
            } catch (err: any) {
                console.error('Error fetching uso servicios:', err);
                setError(err.response?.data?.error || 'Error al cargar los datos');
                setData([]);
                setEjeX([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.granularidad, params.anio, params.mes, params.dia]);

    return { data, ejeX, metadata, loading, error };
}
