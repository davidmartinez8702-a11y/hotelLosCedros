import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp } from "lucide-react";
import { TimeFilter, TimeGranularity } from "../utils/dataFilters";

interface TimeFilterSelectorProps {
    filter: TimeFilter;
    onFilterChange: (filter: TimeFilter) => void;
    availableYears: number[];
    availableMonths?: number[];
}

const MONTHS = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

const GRANULARITIES: { value: TimeGranularity; label: string }[] = [
    { value: 'year', label: 'Anual' },
    { value: 'month', label: 'Mensual' },
    { value: 'day', label: 'Diario' },
];

export function TimeFilterSelector({
    filter,
    onFilterChange,
    availableYears,
    availableMonths = [],
}: TimeFilterSelectorProps) {
    const handleGranularityChange = (value: string) => {
        const granularity = value as TimeGranularity;
        onFilterChange({
            granularity,
            year: granularity === 'year' ? undefined : filter.year,
            month: granularity === 'day' ? filter.month : undefined,
        });
    };

    const handleYearChange = (value: string) => {
        const year = value === 'all' ? undefined : parseInt(value);
        onFilterChange({
            ...filter,
            year,
            month: undefined, // Reset month when year changes
        });
    };

    const handleMonthChange = (value: string) => {
        const month = parseInt(value);
        onFilterChange({
            ...filter,
            month,
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-700">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold text-sm">Filtros Temporales:</span>
            </div>

            {/* Granularidad */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Vista:</span>
                <Select value={filter.granularity} onValueChange={handleGranularityChange}>
                    <SelectTrigger className="w-[120px] bg-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {GRANULARITIES.map((g) => (
                            <SelectItem key={g.value} value={g.value}>
                                {g.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Año */}
            {filter.granularity !== 'year' && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Año:</span>
                    <Select
                        value={filter.year?.toString() || 'all'}
                        onValueChange={handleYearChange}
                    >
                        <SelectTrigger className="w-[120px] bg-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {availableYears.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Mes */}
            {filter.granularity === 'day' && filter.year && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Mes:</span>
                    <Select
                        value={filter.month?.toString() || ''}
                        onValueChange={handleMonthChange}
                    >
                        <SelectTrigger className="w-[140px] bg-white">
                            <SelectValue placeholder="Seleccionar mes" />
                        </SelectTrigger>
                        <SelectContent>
                            {MONTHS.filter(m => availableMonths.length === 0 || availableMonths.includes(m.value)).map((month) => (
                                <SelectItem key={month.value} value={month.value.toString()}>
                                    {month.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Indicador de datos */}
            <div className="ml-auto flex items-center gap-2 text-sm text-indigo-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">
                    {filter.granularity === 'year' && 'Vista Anual'}
                    {filter.granularity === 'month' && (filter.year ? `Año ${filter.year}` : 'Todos los años')}
                    {filter.granularity === 'day' && filter.year && filter.month && `${MONTHS[filter.month - 1].label} ${filter.year}`}
                    {filter.granularity === 'day' && (!filter.year || !filter.month) && 'Seleccione año y mes'}
                </span>
            </div>
        </div>
    );
}
