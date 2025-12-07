export interface OcupacionData {
  mes: string;
  ocupacion: number;
  meta: number;
  año: string;
}

export interface IngresosData {
  tipo: string;
  ingresos: number;
  gastos: number;
}

export interface HuespedesData {
  categoria: string;
  valor: number;
  fill: string;
}

export interface ReservasData {
  fecha: string;
  confirmadas: number;
  pendientes: number;
  canceladas: number;
}

export interface ServiciosData {
  servicio: string;
  calificacion: number;
  promedio: number;
}

export interface TiposReservaData {
  tipo: string;
  cantidad: number;
  fill: string;
}

export interface ComparativaAnualData {
  mes: string;
  actual: number;
  anterior: number;
}

export interface CheckinsData {
  hora: string;
  checkins: number;
}

export interface CanalesData {
  canal: string;
  reservas: number;
  fill: string;
}

export interface KPIData {
  id: string;
  titulo: string;
  valor: string | number;
  tendencia?: string;
  porcentaje?: number;
  icono: "ocupacion" | "ingresos" | "reservas" | "satisfaccion";
  gradiente: string;
}

export interface PrediccionesData {
  fecha: string;
  prediccion: number;
  maximo: number;
  minimo: number;
}

export interface ChartFilterOption {
  value: string;
  label: string;
}