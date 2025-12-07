import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartFilterOption } from "../mocks/types";


interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  filterOptions?: ChartFilterOption[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterPlaceholder?: string;
  badge?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function ChartCard({
  title,
  description,
  children,
  filterOptions,
  filterValue,
  onFilterChange,
  filterPlaceholder = "Seleccionar",
  badge,
  icon,
  delay = 0,
}: ChartCardProps) {
  return (
    <Card
      className={`shadow-lg animate-in slide-in-from-bottom duration-700 hover:shadow-xl transition-shadow`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            {icon}
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
            {filterOptions && onFilterChange && (
              <Select value={filterValue} onValueChange={onFilterChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={filterPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}