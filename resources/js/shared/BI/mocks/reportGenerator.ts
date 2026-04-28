// src/shared/BI/utils/reportGenerator.ts

import { TimeFilter } from "../utils/dataFilters";

// import { TimeFilter } from './dataFilters';


// --- Funciones Helpers ---

/**
 * Función genérica para descargar datos como archivo.
 */
const downloadFile = (data: BlobPart, filename: string, mimeType: string) => {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

/**
 * Formatea el período actual para ser usado en el nombre del archivo.
 */
export const formatPeriodForFilename = (filter: TimeFilter): string => {
    let period = `${filter.year}`;
    if (filter.granularity === 'month' && filter.month) {
        // Formato MM-YYYY
        period = `${filter.month.toString().padStart(2, '0')}-${filter.year}`;
    } else if (filter.granularity === 'year') {
        period = `${filter.year}`;
    }
    return period;
};

// --- Generación de Reportes ---

/**
 * Genera un reporte CSV a partir de datos JSON.
 */
export const generateCSVReport = (data: any[], filename: string) => {
    if (data.length === 0) {
        alert("No hay datos para exportar en este período.");
        return;
    }

    // 1. Cabeceras (Keys)
    const header = Object.keys(data[0]).join(',');
    
    // 2. Filas (Valores)
    const rows = data.map(row => 
        Object.values(row).map(value => {
            // Manejar valores que contienen comas o saltos de línea envolviéndolos en comillas
            if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return String(value);
        }).join(',')
    );

    const csvContent = [header, ...rows].join('\n');
    
    downloadFile('\ufeff' + csvContent, filename, 'text/csv;charset=utf-8;');
    alert(`Reporte CSV "${filename}" generado.`);
};

/**
 * Prepara un objeto consolidado de datos para PDF/Excel (usado por el BIDashboard).
 */
export const prepareDataForExport = (
    ocupacionData: any[],
    ingresosData: any[],
    reservasData: any[],
    filter: TimeFilter
) => {
    return {
        filters: filter,
        date: new Date().toLocaleDateString("es-ES"),
        datasets: {
            ocupacion: ocupacionData.map(d => ({ fecha: d.fecha || `${d.month}-${d.year}`, ocupacion: d.ocupacion, meta: d.meta })),
            ingresos: ingresosData.map(d => ({ fecha: d.fecha || `${d.month}-${d.year}`, ingresos: d.ingresos, gastos: d.gastos, beneficio: d.beneficio })),
            reservas: reservasData.map(d => ({ fecha: d.fecha || `${d.month}-${d.year}`, confirmadas: d.confirmadas, canceladas: d.canceladas })),
        }
    };
};


/**
 * SIMULACIÓN DE GENERACIÓN DE EXCEL/PDF
 * En un entorno real, esto enviaría los datos a un endpoint de Laravel que usaría PhpSpreadsheet o Dompdf.
 */
export const generateExcelReport = (data: any, filename: string) => {
    console.log("Datos enviados al servidor para Excel:", data);
    alert(`Generación de Excel simulada. Debería llamar a un endpoint de Laravel como: /reportes/excel con los datos.`);
};

export const generatePDFReport = (data: any) => {
    console.log("Datos enviados al servidor para PDF:", data);
    alert(`Generación de PDF simulada. Debería llamar a un endpoint de Laravel como: /reportes/pdf con los datos.`);
};


/**
 * Genera una imagen (PNG) del contenido del dashboard.
 * Requiere la librería html2canvas (no incluida en este snippet).
 */
export const generateImageReport = (elementId: string) => {
    // Si tienes html2canvas instalado, descomenta y usa:
    // import html2canvas from 'html2canvas';

    /*
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return alert("Error: Elemento de dashboard no encontrado.");

    try {
        html2canvas(targetElement, {
            useCORS: true,
            scale: 2, // Mejora la calidad
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `dashboard-captura-${new Date().toISOString().split('T')[0]}.png`;
            link.click();
            alert("Captura de imagen generada.");
        });
    } catch (error) {
        console.error("Error al generar imagen:", error);
        alert("Error al generar imagen. Asegúrese de que 'html2canvas' está instalado.");
    }
    */
    
    // SIMULACIÓN si html2canvas no está disponible:
    alert(`Reporte de Imagen (PNG) simulado. Requiere instalar la librería 'html2canvas' y ejecutar 'npm install html2canvas'.`);
};