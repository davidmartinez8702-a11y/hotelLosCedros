// Generic Chart Components - Exportaciones centralizadas
export { GenericBarChart } from "./GenericBarChart";
export { GenericHorizontalBarChart } from "./GenericHorizontalBarChart";
export { GenericLineChart } from "./GenericLineChart";
export { GenericPieChart } from "./GenericPieChart";
export { GenericAreaChart } from "./GenericAreaChart";
export { GenericMultiBarChart } from "./GenericMultiBarChart";

// Re-export types
export type {
    GenericChartData,
    LineConfig,
    BarConfig,
    AreaConfig,
    GenericBarChartProps,
    GenericHorizontalBarChartProps,
    GenericLineChartProps,
    GenericPieChartProps,
    GenericAreaChartProps,
    GenericMultiBarChartProps,
} from "../types/genericCharts";
