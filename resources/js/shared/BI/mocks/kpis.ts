import { KPIData } from "./types";

export const kpisData: KPIData[] = [
  {
    id: "ocupacion",
    titulo: "Ocupación Actual",
    valor: "90%",
    tendencia: "+5% vs mes anterior",
    porcentaje: 5,
    icono: "ocupacion",
    gradiente: "from-blue-500 to-cyan-600",
  },
  {
    id: "ingresos",
    titulo: "Ingresos Totales",
    valor: "Bs 568K",
    tendencia: "+12% vs mes anterior",
    porcentaje: 12,
    icono: "ingresos",
    gradiente: "from-emerald-500 to-teal-600",
  },
  {
    id: "reservas",
    titulo: "Reservas Activas",
    valor: "95",
    tendencia: "+8% vs mes anterior",
    porcentaje: 8,
    icono: "reservas",
    gradiente: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "satisfaccion",
    titulo: "Satisfacción",
    valor: "4.7",
    tendencia: "de 5.0 estrellas",
    icono: "satisfaccion",
    gradiente: "from-amber-500 to-rose-600",
  },
];