import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, BedDouble, Star } from "lucide-react";
import { KPIData } from "../mocks/types";

interface KPICardsProps {
  data: KPIData[];
}

const iconMap = {
  ocupacion: BedDouble,
  ingresos: DollarSign,
  reservas: Users,
  satisfaccion: Star,
};

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
      {data.map((kpi) => {
        const Icon = iconMap[kpi.icono];
        return (
          <Card
            key={kpi.id}
            className={`border-0 shadow-lg bg-gradient-to-br ${kpi.gradiente} text-white overflow-hidden relative hover:scale-105 transition-transform duration-300`}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/20 blur-2xl"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white/90 text-sm font-medium">
                  {kpi.titulo}
                </CardTitle>
                <Icon className="h-8 w-8 text-white/80" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold mb-2">{kpi.valor}</div>
              <div className="flex items-center gap-2 text-sm">
                {kpi.porcentaje && <TrendingUp className="h-4 w-4" />}
                <span>{kpi.tendencia}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}