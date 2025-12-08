/**
 * Datos mock completos de series temporales para el dashboard BI
 * Generados con patrones realistas de ocupación, ingresos, reservas, etc.
 */

import {
    generateDailyTimeSeries,
    aggregateToMonthly,
    aggregateToYearly,
    MONTHS_SHORT_ES,
} from '../utils/dataGenerator';

// ==================== CONFIGURACIÓN ====================
const START_DATE = new Date('2022-01-01');
const END_DATE = new Date('2024-12-31');

// ==================== OCUPACIÓN ====================
const ocupacionDaily = generateDailyTimeSeries(START_DATE, END_DATE, 75, {
    variance: 0.2,
    trend: 0.01,
    seasonality: true,
    weekendEffect: true,
});

const metaDaily = generateDailyTimeSeries(START_DATE, END_DATE, 80, {
    variance: 0.05,
    trend: 0.008,
    seasonality: true,
    weekendEffect: false,
});

export const ocupacionData = ocupacionDaily.map((item, index) => ({
    fecha: item.date,
    year: parseInt(item.date.substring(0, 4)),
    month: parseInt(item.date.substring(5, 7)),
    day: parseInt(item.date.substring(8, 10)),
    ocupacion: Math.min(100, Math.max(0, item.value)),
    meta: Math.min(100, Math.max(0, metaDaily[index].value)),
}));

// ==================== INGRESOS ====================
const ingresosDaily = generateDailyTimeSeries(START_DATE, END_DATE, 15000, {
    variance: 0.25,
    trend: 5,
    seasonality: true,
    weekendEffect: true,
});

const gastosDaily = generateDailyTimeSeries(START_DATE, END_DATE, 6000, {
    variance: 0.15,
    trend: 2,
    seasonality: true,
    weekendEffect: false,
});

export const ingresosData = ingresosDaily.map((item, index) => ({
    fecha: item.date,
    year: parseInt(item.date.substring(0, 4)),
    month: parseInt(item.date.substring(5, 7)),
    day: parseInt(item.date.substring(8, 10)),
    ingresos: Math.round(item.value),
    gastos: Math.round(gastosDaily[index].value),
    beneficio: Math.round(item.value - gastosDaily[index].value),
}));

// ==================== RESERVAS ====================
const confirmadasDaily = generateDailyTimeSeries(START_DATE, END_DATE, 45, {
    variance: 0.3,
    trend: 0.02,
    seasonality: true,
    weekendEffect: true,
});

const pendientesDaily = generateDailyTimeSeries(START_DATE, END_DATE, 8, {
    variance: 0.4,
    trend: 0,
    seasonality: false,
    weekendEffect: false,
});

const canceladasDaily = generateDailyTimeSeries(START_DATE, END_DATE, 3, {
    variance: 0.5,
    trend: 0,
    seasonality: false,
    weekendEffect: false,
});

export const reservasData = confirmadasDaily.map((item, index) => ({
    fecha: item.date,
    year: parseInt(item.date.substring(0, 4)),
    month: parseInt(item.date.substring(5, 7)),
    day: parseInt(item.date.substring(8, 10)),
    confirmadas: Math.round(item.value),
    pendientes: Math.round(pendientesDaily[index].value),
    canceladas: Math.round(canceladasDaily[index].value),
}));

// ==================== HUÉSPEDES ====================
const huespedesDaily = generateDailyTimeSeries(START_DATE, END_DATE, 120, {
    variance: 0.25,
    trend: 0.03,
    seasonality: true,
    weekendEffect: true,
});

export const huespedesData = huespedesDaily.map((item) => ({
    fecha: item.date,
    year: parseInt(item.date.substring(0, 4)),
    month: parseInt(item.date.substring(5, 7)),
    day: parseInt(item.date.substring(8, 10)),
    total: Math.round(item.value),
    nuevos: Math.round(item.value * 0.65),
    recurrentes: Math.round(item.value * 0.35),
}));

// ==================== SERVICIOS ====================
const restauranteDaily = generateDailyTimeSeries(START_DATE, END_DATE, 85, {
    variance: 0.2,
    trend: 0.01,
    seasonality: true,
    weekendEffect: true,
});

const spaDaily = generateDailyTimeSeries(START_DATE, END_DATE, 25, {
    variance: 0.3,
    trend: 0.02,
    seasonality: true,
    weekendEffect: true,
});

const gimnasioDaily = generateDailyTimeSeries(START_DATE, END_DATE, 35, {
    variance: 0.25,
    trend: 0.015,
    seasonality: false,
    weekendEffect: false,
});

const roomServiceDaily = generateDailyTimeSeries(START_DATE, END_DATE, 42, {
    variance: 0.3,
    trend: 0.01,
    seasonality: true,
    weekendEffect: true,
});

export const serviciosData = restauranteDaily.map((item, index) => ({
    fecha: item.date,
    year: parseInt(item.date.substring(0, 4)),
    month: parseInt(item.date.substring(5, 7)),
    day: parseInt(item.date.substring(8, 10)),
    restaurante: Math.round(item.value),
    spa: Math.round(spaDaily[index].value),
    gimnasio: Math.round(gimnasioDaily[index].value),
    roomService: Math.round(roomServiceDaily[index].value),
}));

// ==================== DATOS ESTÁTICOS (NO TEMPORALES) ====================

// Distribución de huéspedes por categoría
export const huespedPorCategoria = [
    { categoria: 'Negocios', cantidad: 1250, porcentaje: 32, fill: '#667eea' },
    { categoria: 'Turismo', cantidad: 1680, porcentaje: 43, fill: '#10b981' },
    { categoria: 'Familiar', cantidad: 580, porcentaje: 15, fill: '#f59e0b' },
    { categoria: 'Eventos', cantidad: 390, porcentaje: 10, fill: '#ef4444' },
];

// Distribución por nacionalidad
export const huespedPorNacionalidad = [
    { pais: 'Bolivia', cantidad: 1850, porcentaje: 38, fill: '#667eea' },
    { pais: 'Argentina', cantidad: 720, porcentaje: 15, fill: '#10b981' },
    { pais: 'Brasil', cantidad: 580, porcentaje: 12, fill: '#f59e0b' },
    { pais: 'Chile', cantidad: 485, porcentaje: 10, fill: '#ef4444' },
    { pais: 'Perú', cantidad: 390, porcentaje: 8, fill: '#8b5cf6' },
    { pais: 'USA', cantidad: 340, porcentaje: 7, fill: '#06b6d4' },
    { pais: 'España', cantidad: 245, porcentaje: 5, fill: '#ec4899' },
    { pais: 'Otros', cantidad: 290, porcentaje: 5, fill: '#6b7280' },
];

// Canales de reserva
export const reservasPorCanal = [
    { canal: 'Booking.com', reservas: 1580, porcentaje: 32, fill: '#667eea' },
    { canal: 'Expedia', reservas: 985, porcentaje: 20, fill: '#10b981' },
    { canal: 'Web Directa', reservas: 1230, porcentaje: 25, fill: '#f59e0b' },
    { canal: 'Recepción', reservas: 640, porcentaje: 13, fill: '#ef4444' },
    { canal: 'Airbnb', reservas: 295, porcentaje: 6, fill: '#8b5cf6' },
    { canal: 'Agencias', reservas: 195, porcentaje: 4, fill: '#06b6d4' },
];

// Reservas por tipo de habitación
export const reservasPorTipoHabitacion = [
    { tipo: 'Individual', reservas: 890, ingresoPromedio: 75 },
    { tipo: 'Doble', reservas: 1650, ingresoPromedio: 120 },
    { tipo: 'Suite', reservas: 780, ingresoPromedio: 250 },
    { tipo: 'Suite Premium', reservas: 420, ingresoPromedio: 380 },
    { tipo: 'Familiar', reservas: 850, ingresoPromedio: 180 },
    { tipo: 'Presidencial', reservas: 135, ingresoPromedio: 550 },
];

// Calificación de servicios
export const calificacionServicios = [
    { servicio: 'Recepción', calificacion: 4.8, evaluaciones: 2450 },
    { servicio: 'Limpieza', calificacion: 4.7, evaluaciones: 2380 },
    { servicio: 'Restaurante', calificacion: 4.5, evaluaciones: 1850 },
    { servicio: 'Room Service', calificacion: 4.3, evaluaciones: 920 },
    { servicio: 'Spa', calificacion: 4.9, evaluaciones: 680 },
    { servicio: 'Gimnasio', calificacion: 4.4, evaluaciones: 520 },
    { servicio: 'Piscina', calificacion: 4.6, evaluaciones: 780 },
    { servicio: 'WiFi', calificacion: 4.2, evaluaciones: 2100 },
];

// Ingresos por servicio
export const ingresosPorServicio = [
    { servicio: 'Restaurante', ingresos: 71280, transacciones: 1980 },
    { servicio: 'Spa', ingresos: 35200, transacciones: 352 },
    { servicio: 'Room Service', ingresos: 18960, transacciones: 632 },
    { servicio: 'Gimnasio', ingresos: 4850, transacciones: 485 },
    { servicio: 'Lavandería', ingresos: 5600, transacciones: 145 },
    { servicio: 'Minibar', ingresos: 12400, transacciones: 680 },
    { servicio: 'Parking', ingresos: 9800, transacciones: 420 },
    { servicio: 'Tours', ingresos: 22500, transacciones: 95 },
];

// ==================== AÑOS DISPONIBLES ====================
export const availableYears = [2022, 2023, 2024];
