export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    telefono?: string;
    email?: string;
}

export interface TipoReserva {
    id: number;
    nombre: string;
}

export interface TipoViaje {
    id: number;
    nombre: string;
}

export interface TipoPago {
    id: number;
    nombre: string;
    estado: string;
}

export interface Reserva {
    id: number;
    cliente_id: number;
    tipo_reserva_id: number;
    tipo_viaje_id: number;
    estado: string;
    pago_pieza: number;
    monto_total: number;
    fecha_reserva: string;
    dias_estadia: number;
    cliente: Cliente;
    tipo_reserva: TipoReserva;
    tipo_viaje: TipoViaje;
    created_at: string;
    updated_at: string;
}

export interface PaginatedReservas {
    data: Reserva[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface Filters {
    estado?: string;
    tipo_reserva_id?: string;
    tipo_viaje_id?: string;
}
