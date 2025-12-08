/**
 * Utilidades para generar reportes del dashboard BI
 */

import { TimeFilter } from './dataFilters';

interface ReportData {
    title: string;
    period: string;
    generatedAt: string;
    data: any;
}

/**
 * Genera un reporte en formato CSV
 */
export function generateCSVReport(data: any[], filename: string): void {
    if (data.length === 0) return;

    // Obtener headers
    const headers = Object.keys(data[0]);

    // Crear contenido CSV
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escapar valores que contengan comas
                return typeof value === 'string' && value.includes(',')
                    ? `"${value}"`
                    : value;
            }).join(',')
        )
    ].join('\n');

    // Descargar archivo
    downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Genera un reporte en formato JSON (para Excel)
 */
export function generateExcelReport(data: any[], filename: string): void {
    // Por ahora exportamos como JSON, luego se puede integrar una librería como xlsx
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
}

/**
 * Genera un reporte PDF (simulado)
 */
export function generatePDFReport(reportData: ReportData): void {
    // Esta función requeriría una librería como jsPDF o html2pdf
    // Por ahora mostramos un alert
    alert(`Generando reporte PDF: ${reportData.title}\nPeríodo: ${reportData.period}\n\nEsta funcionalidad requiere integración con jsPDF o similar.`);

    console.log('Datos del reporte:', reportData);
}

/**
 * Captura el dashboard como imagen
 */
export function generateImageReport(elementId: string = 'dashboard-content'): void {
    // Esta función requeriría html2canvas
    alert('Generando captura de pantalla del dashboard.\n\nEsta funcionalidad requiere integración con html2canvas.');

    console.log('Capturando elemento:', elementId);
}

/**
 * Descarga un archivo
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Formatea el período para el nombre del archivo
 */
export function formatPeriodForFilename(filter: TimeFilter): string {
    const parts: string[] = [];

    if (filter.year) parts.push(`${filter.year}`);
    if (filter.month) parts.push(`M${String(filter.month).padStart(2, '0')}`);

    return parts.length > 0 ? parts.join('-') : 'all-time';
}

/**
 * Formatea el período para display
 */
export function formatPeriodForDisplay(filter: TimeFilter): string {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (filter.granularity === 'year') {
        return 'Vista Anual';
    }

    if (filter.granularity === 'month' && filter.year) {
        return `Año ${filter.year}`;
    }

    if (filter.granularity === 'day' && filter.year && filter.month) {
        return `${months[filter.month - 1]} ${filter.year}`;
    }

    return 'Todos los períodos';
}

/**
 * Prepara datos para exportación
 */
export function prepareDataForExport(
    ocupacionData: any[],
    ingresosData: any[],
    reservasData: any[],
    filter: TimeFilter
): ReportData {
    return {
        title: 'Reporte BI - Hotel Dashboard',
        period: formatPeriodForDisplay(filter),
        generatedAt: new Date().toLocaleString('es-ES'),
        data: {
            ocupacion: ocupacionData,
            ingresos: ingresosData,
            reservas: reservasData,
            filter: filter,
        },
    };
}
