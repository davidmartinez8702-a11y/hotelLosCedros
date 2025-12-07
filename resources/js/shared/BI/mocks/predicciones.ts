import { PrediccionesData } from "./types";

export const prediccionesData: PrediccionesData[] = [
    { fecha: "Ene", prediccion: 85, maximo: 95, minimo: 75 },
    { fecha: "Feb", prediccion: 88, maximo: 98, minimo: 78 },
    { fecha: "Mar", prediccion: 92, maximo: 102, minimo: 82 },
    { fecha: "Abr", prediccion: 95, maximo: 105, minimo: 85 },
    { fecha: "May", prediccion: 90, maximo: 100, minimo: 80 },
    { fecha: "Jun", prediccion: 97, maximo: 107, minimo: 87 },
    { fecha: "Jul", prediccion: 102, maximo: 112, minimo: 92 },
    { fecha: "Ago", prediccion: 100, maximo: 110, minimo: 90 },
    { fecha: "Sep", prediccion: 93, maximo: 103, minimo: 83 },
    { fecha: "Oct", prediccion: 89, maximo: 99, minimo: 79 },
    { fecha: "Nov", prediccion: 86, maximo: 96, minimo: 76 },
    { fecha: "Dic", prediccion: 98, maximo: 108, minimo: 88 },
];

export const prediccionesFilterOptions = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "trimestre", label: "Próximo Trimestre" },
];
