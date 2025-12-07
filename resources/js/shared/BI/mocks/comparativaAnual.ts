import { ComparativaAnualData } from "./types";

export const comparativaAnualData: ComparativaAnualData[] = [
  { mes: "Q1", actual: 380000, anterior: 320000 },
  { mes: "Q2", actual: 420000, anterior: 350000 },
  { mes: "Q3", actual: 480000, anterior: 410000 },
  { mes: "Q4", actual: 520000, anterior: 450000 },
];

export const comparativaFilterOptions = [
  { value: "trimestral", label: "Trimestral" },
  { value: "mensual", label: "Mensual" },
];