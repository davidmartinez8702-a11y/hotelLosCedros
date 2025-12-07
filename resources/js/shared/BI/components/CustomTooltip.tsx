interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  
  export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              {entry.name.toLowerCase().includes("ocupacion") || entry.name.toLowerCase().includes("meta") ? "%" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  }