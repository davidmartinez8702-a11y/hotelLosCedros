export interface GenericChartData {
    [key: string]: string | number;
}

export interface ChartFilterOption {
    value: string;
    label: string;
}

export interface LineConfig {
    dataKey: string;
    name: string;
    stroke: string;
    strokeWidth?: number;
    strokeDasharray?: string;
}

export interface BarConfig {
    dataKey: string;
    name: string;
    fill: string;
    radius?: [number, number, number, number];
}

export interface AreaConfig {
    dataKey: string;
    name: string;
    stroke: string;
    fill: string;
    stackId?: string;
}

export interface GenericChartBaseProps {
    title: string;
    description?: string;
    filterOptions?: ChartFilterOption[];
    filterValue?: string;
    onFilterChange?: (value: string) => void;
    delay?: number;
}

export interface GenericBarChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    dataKey: string;
    categoryKey: string;
    color?: string;
    gradient?: boolean;
}

export interface GenericHorizontalBarChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    bars: BarConfig[];
    categoryKey: string;
}

export interface GenericLineChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    lines: LineConfig[];
    categoryKey: string;
}

export interface GenericPieChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    dataKey: string;
    nameKey: string;
    innerRadius?: number;
    outerRadius?: number;
}

export interface GenericAreaChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    areas: AreaConfig[];
    categoryKey: string;
    stacked?: boolean;
}

export interface GenericMultiBarChartProps extends GenericChartBaseProps {
    data: GenericChartData[];
    bars: BarConfig[];
    categoryKey: string;
}
