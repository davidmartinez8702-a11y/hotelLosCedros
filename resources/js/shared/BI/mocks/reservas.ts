import { ReservasData } from "./types";

export const reservasDataDiciembre: ReservasData[] = [
  { fecha: "01-Dic", confirmadas: 45, pendientes: 8, canceladas: 3 },
  { fecha: "03-Dic", confirmadas: 52, pendientes: 6, canceladas: 5 },
  { fecha: "05-Dic", confirmadas: 48, pendientes: 10, canceladas: 2 },
  { fecha: "07-Dic", confirmadas: 61, pendientes: 7, canceladas: 4 },
  { fecha: "09-Dic", confirmadas: 55, pendientes: 9, canceladas: 6 },
  { fecha: "11-Dic", confirmadas: 67, pendientes: 5, canceladas: 3 },
  { fecha: "13-Dic", confirmadas: 73, pendientes: 8, canceladas: 7 },
  { fecha: "15-Dic", confirmadas: 69, pendientes: 11, canceladas: 4 },
  { fecha: "17-Dic", confirmadas: 78, pendientes: 6, canceladas: 5 },
  { fecha: "19-Dic", confirmadas: 82, pendientes: 7, canceladas: 3 },
  { fecha: "21-Dic", confirmadas: 88, pendientes: 4, canceladas: 8 },
  { fecha: "23-Dic", confirmadas: 95, pendientes: 9, canceladas: 4 },
];

export const reservasDataNoviembre: ReservasData[] = [
  { fecha: "01-Nov", confirmadas: 38, pendientes: 6, canceladas: 2 },
  { fecha: "05-Nov", confirmadas: 42, pendientes: 8, canceladas: 3 },
  { fecha: "10-Nov", confirmadas: 48, pendientes: 5, canceladas: 4 },
  { fecha: "15-Nov", confirmadas: 55, pendientes: 7, canceladas: 2 },
  { fecha: "20-Nov", confirmadas: 62, pendientes: 9, canceladas: 5 },
  { fecha: "25-Nov", confirmadas: 58, pendientes: 4, canceladas: 3 },
  { fecha: "30-Nov", confirmadas: 65, pendientes: 6, canceladas: 4 },
];

export const reservasFilterOptions = [
  { value: "diciembre", label: "Diciembre" },
  { value: "noviembre", label: "Noviembre" },
];