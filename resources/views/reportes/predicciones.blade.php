{{-- filepath: resources/views/reportes/predicciones.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>Reporte de Predicción - {{ ucfirst($tipo) }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            color: #333;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #4a5568;
            padding-bottom: 15px;
        }
        
        .header h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        
        .header p {
            color: #718096;
            font-size: 11px;
        }
        
        .info-section {
            background-color: #f7fafc;
            padding: 15px;
            margin-bottom: 25px;
            border-radius: 5px;
            border-left: 4px solid #4299e1;
        }
        
        .info-section .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .info-section .info-row:last-child {
            margin-bottom: 0;
        }
        
        .info-label {
            font-weight: bold;
            color: #2d3748;
        }
        
        .info-value {
            color: #4a5568;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background-color: white;
        }
        
        thead {
            background-color: #4a5568;
            color: white;
        }
        
        th {
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        
        tbody tr:nth-child(even) {
            background-color: #f7fafc;
        }
        
        tbody tr:hover {
            background-color: #edf2f7;
        }
        
        .valor-prediccion {
            font-weight: bold;
            color: #2b6cb0;
        }
        
        .valor-minimo {
            color: #38a169;
        }
        
        .valor-maximo {
            color: #dd6b20;
        }
        
        .estadisticas {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            padding: 15px;
            background-color: #edf2f7;
            border-radius: 5px;
        }
        
        .stat-box {
            text-align: center;
            padding: 10px;
        }
        
        .stat-label {
            font-size: 10px;
            color: #718096;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .stat-value {
            font-size: 18px;
            font-weight: bold;
            color: #2d3748;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            font-size: 10px;
            color: #718096;
        }
        
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <!-- Encabezado -->
    <div class="header">
        <h1>{{ $titulo }}</h1>
        <p>Sistema de Gestión Hotelera - Módulo de Predicciones</p>
    </div>

    <!-- Información General -->
    <div class="info-section">
        <div class="info-row">
            <span class="info-label">Fecha de Generación:</span>
            <span class="info-value">{{ $fecha_generacion }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Tipo de Predicción:</span>
            <span class="info-value">{{ ucfirst($tipo) }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Período de Análisis:</span>
            <span class="info-value">{{ $dias }} días</span>
        </div>
        <div class="info-row">
            <span class="info-label">Total de Registros:</span>
            <span class="info-value">{{ count($predicciones) }}</span>
        </div>
    </div>

    <!-- Estadísticas Resumen -->
    @php
        $predicciones_valores = array_column($predicciones, 'prediction');
        $promedio = count($predicciones_valores) > 0 ? array_sum($predicciones_valores) / count($predicciones_valores) : 0;
        $max_pred = count($predicciones_valores) > 0 ? max($predicciones_valores) : 0;
        $min_pred = count($predicciones_valores) > 0 ? min($predicciones_valores) : 0;
    @endphp

    <div class="section-title">Resumen Estadístico</div>
    <div class="estadisticas">
        <div class="stat-box">
            <div class="stat-label">Promedio</div>
            <div class="stat-value">{{ number_format($promedio, 2) }}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Máximo</div>
            <div class="stat-value valor-maximo">{{ number_format($max_pred, 2) }}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Mínimo</div>
            <div class="stat-value valor-minimo">{{ number_format($min_pred, 2) }}</div>
        </div>
    </div>

    <!-- Tabla de Predicciones -->
    <div class="section-title">Datos Detallados de Predicción</div>
    <table>
        <thead>
            <tr>
                <th style="width: 15%;">N°</th>
                <th style="width: 25%;">Fecha</th>
                <th style="width: 20%;">Predicción</th>
                <th style="width: 20%;">Valor Mínimo</th>
                <th style="width: 20%;">Valor Máximo</th>
            </tr>
        </thead>
        <tbody>
            @foreach($predicciones as $index => $pred)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ \Carbon\Carbon::parse($pred['date'])->format('d/m/Y') }}</td>
                <td class="valor-prediccion">{{ number_format($pred['prediction'], 2) }}</td>
                <td class="valor-minimo">{{ number_format($pred['min'], 2) }}</td>
                <td class="valor-maximo">{{ number_format($pred['max'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Análisis Adicional -->
    <div class="section-title">Análisis de Tendencia</div>
    <div class="info-section">
        @php
            $primera_pred = $predicciones[0]['prediction'] ?? 0;
            $ultima_pred = end($predicciones)['prediction'] ?? 0;
            $diferencia = $ultima_pred - $primera_pred;
            $porcentaje_cambio = $primera_pred != 0 ? (($diferencia / $primera_pred) * 100) : 0;
        @endphp
        <div class="info-row">
            <span class="info-label">Valor Inicial:</span>
            <span class="info-value">{{ number_format($primera_pred, 2) }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Valor Final:</span>
            <span class="info-value">{{ number_format($ultima_pred, 2) }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Variación:</span>
            <span class="info-value" style="color: {{ $diferencia >= 0 ? '#38a169' : '#e53e3e' }};">
                {{ $diferencia >= 0 ? '+' : '' }}{{ number_format($diferencia, 2) }} 
                ({{ number_format($porcentaje_cambio, 2) }}%)
            </span>
        </div>
    </div>

    <!-- Pie de página -->
    <div class="footer">
        <p><strong>Sistema de Gestión Hotelera</strong></p>
        <p>Este reporte fue generado automáticamente por el sistema de predicciones basado en modelos ARIMA.</p>
        <p>Los valores de mínimo y máximo representan el intervalo de confianza del 95%.</p>
    </div>
</body>
</html>