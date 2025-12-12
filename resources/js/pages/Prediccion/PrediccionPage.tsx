import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface Prediccion {
    date: string;
    prediction: number;
    min: number;
    max: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    {
        title: 'Predicciones',
        href: route('predicciones.index'),
    },
];

export default function PrediccionPage() {
    const [dias, setDias] = useState<number>(10);
    const [tipoPred, setTipoPred] = useState<'demanda' | 'ingresos' | 'cancelaciones'>('demanda');
    const [predicciones, setPredicciones] = useState<Prediccion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePredict = async () => {
        setLoading(true);
        setError(null);

        try {
            // Cambiar a GET y pasar días en la URL
            const endpoint = route(`predicciones.${tipoPred}`, { dias });
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                setPredicciones(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Error al obtener predicciones. Asegúrate de que el microservicio esté corriendo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerarReporte = async () => {
        if (predicciones.length === 0) {
            alert('Primero debe generar una predicción');
            return;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('predicciones.reporte');
        
        // Obtener el token CSRF correctamente
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        if (!csrfToken) {
            alert('Error: Token CSRF no encontrado');
            return;
        }
        
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        const tipoInput = document.createElement('input');
        tipoInput.type = 'hidden';
        tipoInput.name = 'tipo';
        tipoInput.value = tipoPred;
        form.appendChild(tipoInput);

        const dataInput = document.createElement('input');
        dataInput.type = 'hidden';
        dataInput.name = 'data';
        dataInput.value = JSON.stringify(predicciones);
        form.appendChild(dataInput);

        const diasInput = document.createElement('input');
        diasInput.type = 'hidden';
        diasInput.name = 'dias';
        diasInput.value = dias.toString();
        form.appendChild(diasInput);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    const getTitulo = () => {
        switch (tipoPred) {
            case 'demanda': return 'Demanda de Habitaciones';
            case 'ingresos': return 'Ingresos Proyectados';
            case 'cancelaciones': return 'Cancelaciones Estimadas';
        }
    };

    const getUnidad = () => {
        switch (tipoPred) {
            case 'demanda': return 'habitaciones';
            case 'ingresos': return 'Bs.';
            case 'cancelaciones': return 'cancelaciones';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Predicciones" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Sistema de Predicciones</h1>
                            <p className="text-muted-foreground">
                                Predicción de demanda, ingresos y cancelaciones
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                        {/* Controles */}
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label htmlFor="tipo-prediccion" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de Predicción
                                </label>
                                <select
                                    id="tipo-prediccion"
                                    aria-label="Seleccionar tipo de predicción"
                                    value={tipoPred}
                                    onChange={(e) => setTipoPred(e.target.value as any)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="demanda">Demanda de Habitaciones</option>
                                    <option value="ingresos">Ingresos</option>
                                    <option value="cancelaciones">Cancelaciones</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="dias-predecir" className="block text-sm font-medium text-gray-700 mb-2">
                                    Días a Predecir
                                </label>
                                <input
                                    id="dias-predecir"
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={dias}
                                    onChange={(e) => setDias(parseInt(e.target.value))}
                                    aria-label="Cantidad de días a predecir"
                                    placeholder="Ej: 10"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-end gap-2">
                                <Button
                                    onClick={handlePredict}
                                    disabled={loading}
                                    className="flex-1"
                                    aria-label="Generar predicción"
                                >
                                    {loading ? 'Procesando...' : 'Generar Predicción'}
                                </Button>
                                
                                {predicciones.length > 0 && (
                                    <Button
                                        onClick={handleGenerarReporte}
                                        variant="outline"
                                        title="Generar Reporte PDF"
                                        aria-label="Descargar reporte PDF de predicciones"
                                    >
                                        <FileDown className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                                {error}
                            </div>
                        )}

                        {/* Gráfico */}
                        {predicciones.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    Predicción de {getTitulo()}
                                </h3>
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <ComposedChart data={predicciones}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="date" 
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                        />
                                        <YAxis label={{ value: getUnidad(), angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Legend />
                                        
                                        {/* Área de confianza (min-max) */}
                                        <Area
                                            type="monotone"
                                            dataKey="max"
                                            fill="#8884d8"
                                            stroke="none"
                                            fillOpacity={0.2}
                                            name="Límite Superior"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="min"
                                            fill="#8884d8"
                                            stroke="none"
                                            fillOpacity={0.2}
                                            name="Límite Inferior"
                                        />
                                        
                                        {/* Línea de predicción */}
                                        <Line
                                            type="monotone"
                                            dataKey="prediction"
                                            stroke="#8884d8"
                                            strokeWidth={3}
                                            dot={{ r: 4 }}
                                            name="Predicción"
                                        />
                                        
                                        <Line
                                            type="monotone"
                                            dataKey="min"
                                            stroke="#82ca9d"
                                            strokeDasharray="5 5"
                                            dot={false}
                                            name="Mínimo"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="max"
                                            stroke="#ff7300"
                                            strokeDasharray="5 5"
                                            dot={false}
                                            name="Máximo"
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>

                                {/* Tabla de datos */}
                                <div className="mt-8">
                                    <h4 className="text-md font-semibold mb-3">Datos Detallados</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Predicción</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mínimo</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Máximo</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {predicciones.map((pred, idx) => (
                                                    <tr key={idx}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{pred.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            {pred.prediction.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                                            {pred.min.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">
                                                            {pred.max.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}