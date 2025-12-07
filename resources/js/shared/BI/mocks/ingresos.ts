import { IngresosData } from "./types";

export const ingresosMensual: IngresosData[] = [
  { tipo: "Suite Presidencial", ingresos: 125000, gastos: 45000 },
  { tipo: "Suite Deluxe", ingresos: 98000, gastos: 38000 },
  { tipo: "Habitación Estándar", ingresos: 156000, gastos: 62000 },
  { tipo: "Habitación Familiar", ingresos: 87000, gastos: 35000 },
  { tipo: "Habitación Ejecutiva", ingresos: 102000, gastos: 41000 },
];

export const ingresosSemanal: IngresosData[] = [
  { tipo: "Suite Presidencial", ingresos: 28750, gastos: 10350 },
  { tipo: "Suite Deluxe", ingresos: 22540, gastos: 8740 },
  { tipo: "Habitación Estándar", ingresos: 35880, gastos: 14260 },
  { tipo: "Habitación Familiar", ingresos: 20010, gastos: 8050 },
  { tipo: "Habitación Ejecutiva", ingresos: 23460, gastos: 9430 },
];

export const ingresosFilterOptions = [
  { value: "mensual", label: "Mensual" },
  { value: "semanal", label: "Semanal" },
];