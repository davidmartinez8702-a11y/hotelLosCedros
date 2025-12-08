interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border-2 border-gray-300 dark:border-gray-600">
        <p className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-base border-b border-gray-200 dark:border-gray-600 pb-2">
          {label}
        </p>
        {payload.map((entry: any, index: number) => {
          const isRevenue = entry.name.toLowerCase().includes("ingreso") ||
            entry.dataKey?.toLowerCase().includes("ingreso");
          const isPercentage = entry.name.toLowerCase().includes("ocupacion") ||
            entry.name.toLowerCase().includes("meta") ||
            entry.name.toLowerCase().includes("porcentaje");

          let formattedValue = typeof entry.value === "number"
            ? entry.value.toLocaleString('es-BO')
            : entry.value;

          if (isRevenue) {
            formattedValue = `Bs ${formattedValue}`;
          } else if (isPercentage) {
            formattedValue = `${formattedValue}%`;
          }

          return (
            <div key={index} className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {entry.name}:
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: entry.color }}>
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}