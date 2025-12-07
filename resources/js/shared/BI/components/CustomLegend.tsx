interface CustomLegendProps {
    items: Array<{ name: string; color: string }>;
    hiddenItems: string[];
    onItemClick: (name: string) => void;
}

export function CustomLegend({ items, hiddenItems, onItemClick }: CustomLegendProps) {
    return (
        <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
            {items.map((item) => {
                const isHidden = hiddenItems.includes(item.name);
                return (
                    <div
                        key={item.name}
                        onClick={() => onItemClick(item.name)}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span
                            className={`text-sm font-semibold ${isHidden ? 'line-through opacity-50' : ''
                                }`}
                        >
                            {item.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
