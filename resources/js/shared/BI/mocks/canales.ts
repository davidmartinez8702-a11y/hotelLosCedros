import { CanalesData } from "./types";

export const canalesData: CanalesData[] = [
  { canal: "Web Directa", reservas: 45, fill: "#667eea" },
  { canal: "Booking", reservas: 28, fill: "#f59e0b" },
  { canal: "Expedia", reservas: 15, fill: "#10b981" },
  { canal: "Teléfono", reservas: 8, fill: "#ef4444" },
  { canal: "Walk-in", reservas: 4, fill: "#8b5cf6" },
];

export const canalesFilterOptions = [
  { value: "mes", label: "Este Mes" },
  { value: "trimestre", label: "Trimestre" },
  { value: "año", label: "Este Año" },
];