import { CheckinsData } from "./types";

export const checkinsData: CheckinsData[] = [
  { hora: "08:00", checkins: 5 },
  { hora: "10:00", checkins: 12 },
  { hora: "12:00", checkins: 25 },
  { hora: "14:00", checkins: 45 },
  { hora: "16:00", checkins: 38 },
  { hora: "18:00", checkins: 22 },
  { hora: "20:00", checkins: 15 },
  { hora: "22:00", checkins: 8 },
];

export const checkinsFilterOptions = [
  { value: "hoy", label: "Hoy" },
  { value: "semana", label: "Esta Semana" },
  { value: "mes", label: "Este Mes" },
];