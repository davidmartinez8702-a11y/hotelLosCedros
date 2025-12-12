// types/cuenta.types.ts
export interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string | null;
}

export interface HabitacionEvento {
    id: number;
    codigo: string;
    nombre: string;
    tipo: string;
    tipo_nombre: string;
    precio: number;
}

export interface Recepcionista {
    id: number;
    nombre: string;
}

export interface Reserva {
    id: number;
    estado: string;
}

export interface Checkin {
    id: number;
    fecha_entrada: string;
    fecha_salida: string | null;
    cliente: Cliente;
    habitacion_evento: HabitacionEvento;
    recepcionista: Recepcionista;
    reserva: Reserva | null;
}

export interface Servicio {
    id: number;
    nombre: string;
    precio: number;
}

export interface Platillo {
    id: number;
    nombre: string;
    precio: number;
}

export interface Transaccion {
    id: number;
    tipo: 'servicio' | 'platillo';
    servicio: Servicio | null;
    platillo: Platillo | null;
    cantidad: number;
    subtotal: number;
    estado: string;
    created_at: string;
}

export interface TipoPago {
    id: number;
    nombre: string;
}

export interface Factura {
    id: number;
    monto_total: number;
    estado: string;
    tipo_pago: TipoPago | null;
}

export interface Cuenta {
    id: number;
    monto_total: number;
    monto_pagado: number;
    saldo: number;
    estado: 'pendiente' | 'pagada' | 'cancelado';
    fecha_pago: string | null;
    created_at: string;
    updated_at: string;
    checkin: Checkin;
    transacciones: Transaccion[];
    factura: Factura | null;
}

export interface ServicioDisponible {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

export interface PlatilloDisponible {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

export interface ItemCarrito {
    tipo: 'servicio' | 'platillo';
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface CuentaShowProps {
    cuenta: Cuenta;
    servicios: ServicioDisponible[];
    platillos: PlatilloDisponible[];
}

