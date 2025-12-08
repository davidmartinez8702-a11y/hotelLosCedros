/**
 * Utilidades para generar datos mock de series temporales
 * con patrones realistas para el dashboard BI
 */

export interface DateRange {
    start: Date;
    end: Date;
}

/**
 * Genera una serie temporal diaria con variación realista
 */
export function generateDailyTimeSeries(
    startDate: Date,
    endDate: Date,
    baseValue: number,
    options: {
        variance?: number; // Variación aleatoria (0-1)
        trend?: number; // Tendencia (positiva o negativa)
        seasonality?: boolean; // Aplicar estacionalidad
        weekendEffect?: boolean; // Efecto fin de semana
    } = {}
): Array<{ date: string; value: number }> {
    const {
        variance = 0.15,
        trend = 0,
        seasonality = true,
        weekendEffect = false,
    } = options;

    const data: Array<{ date: string; value: number }> = [];
    const currentDate = new Date(startDate);
    let dayIndex = 0;

    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];

        // Valor base con tendencia
        let value = baseValue + (trend * dayIndex);

        // Estacionalidad anual (más alto en verano/diciembre)
        if (seasonality) {
            const month = currentDate.getMonth();
            const seasonalFactor = Math.sin((month / 12) * Math.PI * 2) * 0.2 + 1;
            value *= seasonalFactor;
        }

        // Efecto fin de semana (más alto viernes-domingo para hoteles)
        if (weekendEffect) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
                value *= 1.15; // 15% más en fin de semana
            }
        }

        // Variación aleatoria
        const randomFactor = 1 + (Math.random() - 0.5) * variance;
        value *= randomFactor;

        data.push({
            date: dateStr,
            value: Math.round(value * 100) / 100,
        });

        currentDate.setDate(currentDate.getDate() + 1);
        dayIndex++;
    }

    return data;
}

/**
 * Agrega datos diarios a mensuales
 */
export function aggregateToMonthly(
    dailyData: Array<{ date: string; value: number }>
): Array<{ month: string; value: number }> {
    const monthlyMap = new Map<string, { sum: number; count: number }>();

    dailyData.forEach(({ date, value }) => {
        const monthKey = date.substring(0, 7); // YYYY-MM
        const existing = monthlyMap.get(monthKey) || { sum: 0, count: 0 };
        monthlyMap.set(monthKey, {
            sum: existing.sum + value,
            count: existing.count + 1,
        });
    });

    return Array.from(monthlyMap.entries())
        .map(([month, { sum, count }]) => ({
            month,
            value: Math.round((sum / count) * 100) / 100,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Agrega datos mensuales a anuales
 */
export function aggregateToYearly(
    monthlyData: Array<{ month: string; value: number }>
): Array<{ year: string; value: number }> {
    const yearlyMap = new Map<string, { sum: number; count: number }>();

    monthlyData.forEach(({ month, value }) => {
        const year = month.substring(0, 4);
        const existing = yearlyMap.get(year) || { sum: 0, count: 0 };
        yearlyMap.set(year, {
            sum: existing.sum + value,
            count: existing.count + 1,
        });
    });

    return Array.from(yearlyMap.entries())
        .map(([year, { sum, count }]) => ({
            year,
            value: Math.round((sum / count) * 100) / 100,
        }))
        .sort((a, b) => a.year.localeCompare(b.year));
}

/**
 * Obtiene el rango de fechas basado en filtros
 */
export function getDateRange(
    year?: number,
    month?: number,
    day?: number
): DateRange {
    const now = new Date();

    if (day && month && year) {
        // Día específico
        const date = new Date(year, month - 1, day);
        return { start: date, end: date };
    }

    if (month && year) {
        // Mes específico
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0); // Último día del mes
        return { start, end };
    }

    if (year) {
        // Año específico
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        return { start, end };
    }

    // Por defecto: últimos 90 días
    const end = now;
    const start = new Date(now);
    start.setDate(start.getDate() - 90);
    return { start, end };
}

/**
 * Formatea fecha para display según granularidad
 */
export function formatDateForDisplay(
    date: string,
    granularity: 'day' | 'month' | 'year'
): string {
    const d = new Date(date);

    switch (granularity) {
        case 'day':
            return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
        case 'month':
            return d.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
        case 'year':
            return d.getFullYear().toString();
        default:
            return date;
    }
}

/**
 * Genera nombres de meses en español
 */
export const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Genera nombres cortos de meses
 */
export const MONTHS_SHORT_ES = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];
