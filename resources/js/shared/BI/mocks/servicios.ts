import { ServiciosData } from "./types";

export const serviciosData: ServiciosData[] = [
  { servicio: "Limpieza", calificacion: 95, promedio: 85 },
  { servicio: "Atención", calificacion: 92, promedio: 88 },
  { servicio: "Comida", calificacion: 88, promedio: 82 },
  { servicio: "Instalaciones", calificacion: 90, promedio: 86 },
  { servicio: "Ubicación", calificacion: 96, promedio: 90 },
  { servicio: "Precio", calificacion: 85, promedio: 80 },
];

export const serviciosFilterOptions = [
  { value: "actual", label: "Mes Actual" },
  { value: "trimestre", label: "Último Trimestre" },
  { value: "anual", label: "Anual" },
];