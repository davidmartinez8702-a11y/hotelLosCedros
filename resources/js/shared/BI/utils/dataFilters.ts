/**
 * Utilidades para filtrar y transformar datos según filtros temporales
 */

export type TimeGranularity = 'day' | 'month' | 'year';

export interface TimeFilter {
    granularity: TimeGranularity;
    year?: number;
    month?: number;
}

interface TimeSeriesDataPoint {
    fecha: string;
    year: number;
    month: number;
    day: number;
    [key: string]: any;
}

/**
 * Filtra datos por rango temporal
 */
export function filterByTimeRange<T extends TimeSeriesDataPoint>(
    data: T[],
    filter: TimeFilter
): T[] {
    return data.filter((item) => {
        if (filter.year && item.year !== filter.year) return false;
        if (filter.month && item.month !== filter.month) return false;
        return true;
    });
}

/**
 * Agrega datos a nivel mensual
 */
export function aggregateToMonthly<T extends TimeSeriesDataPoint>(
    data: T[],
    valueKeys: string[]
): any[] {
    const monthlyMap = new Map<string, any>();

    data.forEach((item) => {
        const monthKey = `${item.year}-${String(item.month).padStart(2, '0')}`;

        if (!monthlyMap.has(monthKey)) {
            const monthData: any = {
                mes: getMonthName(item.month),
                year: item.year,
                month: item.month,
                count: 0,
            };
            valueKeys.forEach((key) => {
                monthData[key] = 0;
            });
            monthlyMap.set(monthKey, monthData);
        }

        const monthData = monthlyMap.get(monthKey)!;
        monthData.count++;
        valueKeys.forEach((key) => {
            monthData[key] += item[key] || 0;
        });
    });

    // Calcular promedios
    return Array.from(monthlyMap.values())
        .map((item) => {
            const result: any = { mes: item.mes, year: item.year, month: item.month };
            valueKeys.forEach((key) => {
                result[key] = Math.round((item[key] / item.count) * 100) / 100;
            });
            return result;
        })
        .sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });
}

/**
 * Agrega datos a nivel anual
 */
export function aggregateToYearly<T extends TimeSeriesDataPoint>(
    data: T[],
    valueKeys: string[]
): any[] {
    const yearlyMap = new Map<number, any>();

    data.forEach((item) => {
        if (!yearlyMap.has(item.year)) {
            const yearData: any = {
                año: item.year.toString(),
                year: item.year,
                count: 0,
            };
            valueKeys.forEach((key) => {
                yearData[key] = 0;
            });
            yearlyMap.set(item.year, yearData);
        }

        const yearData = yearlyMap.get(item.year)!;
        yearData.count++;
        valueKeys.forEach((key) => {
            yearData[key] += item[key] || 0;
        });
    });

    // Calcular promedios
    return Array.from(yearlyMap.values())
        .map((item) => {
            const result: any = { año: item.año, year: item.year };
            valueKeys.forEach((key) => {
                result[key] = Math.round((item[key] / item.count) * 100) / 100;
            });
            return result;
        })
        .sort((a, b) => a.year - b.year);
}

/**
 * Formatea datos diarios para gráficos
 */
export function formatDailyData<T extends TimeSeriesDataPoint>(
    data: T[]
): any[] {
    return data.map((item) => ({
        ...item,
        dia: `${String(item.day).padStart(2, '0')}/${String(item.month).padStart(2, '0')}`,
    }));
}

/**
 * Obtiene el nombre del mes
 */
function getMonthName(month: number): string {
    const months = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return months[month - 1] || '';
}

/**
 * Obtiene la clave de categoría según granularidad
 */
export function getCategoryKey(granularity: TimeGranularity): string {
    switch (granularity) {
        case 'day':
            return 'dia';
        case 'month':
            return 'mes';
        case 'year':
            return 'año';
        default:
            return 'mes';
    }
}

/**
 * Transforma datos según filtro temporal
 */
export function transformDataByFilter<T extends TimeSeriesDataPoint>(
    data: T[],
    filter: TimeFilter,
    valueKeys: string[]
): any[] {
    // Filtrar por rango
    const filtered = filterByTimeRange(data, filter);

    // Agregar según granularidad
    switch (filter.granularity) {
        case 'day':
            return formatDailyData(filtered);
        case 'month':
            return aggregateToMonthly(filtered, valueKeys);
        case 'year':
            return aggregateToYearly(filtered, valueKeys);
        default:
            return filtered;
    }
}

/**
 * Obtiene meses disponibles para un año
 */
export function getAvailableMonths(data: TimeSeriesDataPoint[], year: number): number[] {
    const months = new Set<number>();
    data.forEach((item) => {
        if (item.year === year) {
            months.add(item.month);
        }
    });
    return Array.from(months).sort((a, b) => a - b);
}

/**
 * Obtiene años disponibles
 */
export function getAvailableYears(data: TimeSeriesDataPoint[]): number[] {
    const years = new Set<number>();
    data.forEach((item) => {
        years.add(item.year);
    });
    return Array.from(years).sort((a, b) => a - b);
}
