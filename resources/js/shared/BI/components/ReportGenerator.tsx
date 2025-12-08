import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, FileImage } from "lucide-react";
import { TimeFilter } from "../utils/dataFilters";

interface ReportGeneratorProps {
    filter: TimeFilter;
    onGenerateReport: (format: 'pdf' | 'excel' | 'csv' | 'image') => void;
}

export function ReportGenerator({ filter, onGenerateReport }: ReportGeneratorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Download className="mr-2 h-4 w-4" />
                    Generar Reporte
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Formato de Exportación</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => onGenerateReport('pdf')}>
                    <FileText className="mr-2 h-4 w-4 text-red-600" />
                    <div className="flex flex-col">
                        <span className="font-medium">PDF</span>
                        <span className="text-xs text-gray-500">Reporte completo con gráficos</span>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onGenerateReport('excel')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                    <div className="flex flex-col">
                        <span className="font-medium">Excel</span>
                        <span className="text-xs text-gray-500">Datos tabulares para análisis</span>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onGenerateReport('csv')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-600" />
                    <div className="flex flex-col">
                        <span className="font-medium">CSV</span>
                        <span className="text-xs text-gray-500">Datos en formato CSV</span>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onGenerateReport('image')}>
                    <FileImage className="mr-2 h-4 w-4 text-purple-600" />
                    <div className="flex flex-col">
                        <span className="font-medium">Imagen</span>
                        <span className="text-xs text-gray-500">Captura del dashboard</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
