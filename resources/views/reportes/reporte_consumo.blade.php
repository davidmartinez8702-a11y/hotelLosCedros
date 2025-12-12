<!DOCTYPE html>
<html>
<head>
    <title>INVOICE CUE-{{ $datosReporte['cuenta']['id'] }}</title>
    <style>
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 10pt;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            padding: 30px;
        }
        .header {
            display: table;
            width: 100%;
            margin-bottom: 30px;
        }
        .header-left, .header-right {
            display: table-cell;
            vertical-align: top;
        }
        .header-left {
            width: 50%;
        }
        .header-right {
            text-align: right;
            width: 50%;
        }
        .hotel-name {
            font-size: 18pt;
            font-weight: bold;
            color: #007bff; /* Color primario */
            margin-bottom: 5px;
        }
        .hotel-slogan {
            font-size: 10pt;
            color: #666;
            margin-bottom: 15px;
        }
        .invoice-title {
            font-size: 20pt;
            color: #444;
            margin-top: 0;
        }
        .invoice-id {
            font-size: 12pt;
            color: #007bff;
        }
        
        .section-box {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            background-color: #f9f9f9;
        }
        .section-box h3 {
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 12pt;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            color: #007bff;
        }
        .table-info {
            width: 100%;
            border-collapse: collapse;
        }
        .table-info td {
            padding: 3px 0;
            font-size: 10pt;
        }

        /* TABLA DE DETALLE */
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .details-table th, .details-table td {
            border: 1px solid #eee;
            padding: 10px;
            text-align: left;
            font-size: 9pt;
        }
        .details-table th {
            background-color: #007bff;
            color: white;
            text-transform: uppercase;
        }
        .details-table td.qty, .details-table td.price, .details-table td.subtotal {
            text-align: right;
        }
        .canceled {
            color: red;
            font-style: italic;
            text-decoration: line-through;
        }

        /* TOTALES */
        .totals-container {
            width: 100%;
            margin-top: 20px;
        }
        .totals-box {
            width: 300px;
            float: right;
            border: 1px solid #ccc;
        }
        .totals-box td {
            padding: 8px 15px;
            font-size: 10pt;
        }
        .totals-box .label {
            font-weight: bold;
            text-align: left;
        }
        .totals-box .value {
            text-align: right;
            font-weight: bold;
        }
        .totals-box .final {
            background-color: #007bff;
            color: white;
            font-size: 11pt;
        }
        .note {
            margin-top: 20px;
            font-size: 8pt;
            color: #777;
        }

        /* IMAGEN Y UBICACION (DOMPDF no maneja float/flex bien, usamos tablas) */
        .header-layout {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .header-layout td {
            vertical-align: top;
            padding: 0;
        }
    </style>
</head>
<body>

    @php
        $d = $datosReporte;
        $totalConfirmado = number_format($d['cuenta']['total_calculado'], 2, '.', ',');
        $montoPagado = number_format($d['cuenta']['monto_pagado'], 2, '.', ',');
        $saldoPendiente = number_format($d['cuenta']['saldo'], 2, '.', ',');
        
        // Helper de formato local
        $formatBs = fn($monto) => 'Bs. ' . number_format($monto, 2, '.', ',');
    @endphp

    <div class="container">
        
        {{-- ENCABEZADO DEL HOTEL (TOP SECTION) --}}
        <table class="header-layout">
            <tr>
                <td style="width: 25%;">
                    </td>
                <td style="width: 50%; text-align: center;">
                    <div class="hotel-name">Hotel/Resort [TU NOMBRE AQUÍ]</div>
                    <div class="hotel-slogan">Santa Cruz - Bolivia</div>
                </td>
                <td style="width: 25%; text-align: right; padding-top: 5px;">
                    <div style="font-size: 10pt;">**REPORTE PROFORMA**</div>
                    <div style="font-size: 9pt;">Fecha Emisión: {{ Carbon\Carbon::now()->format('d/m/Y') }}</div>
                    <div style="font-size: 9pt;">Hora: {{ Carbon\Carbon::now()->format('H:i:s') }}</div>
                </td>
            </tr>
        </table>

        <h2 class="invoice-title">REPORTE DE CONSUMOS Y ESTADÍA</h2>
        <div class="invoice-id">Cuenta ID: **{{ $d['cuenta']['id'] }}**</div>

        {{-- INFORMACIÓN DEL CLIENTE Y ESTADÍA --}}
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <td style="width: 50%;">
                    <div class="section-box">
                        <h3>FACTURADO A:</h3>
                        <table class="table-info">
                            <tr><td>**Nombre:**</td><td>{{ $d['cliente']['nombre'] }}</td></tr>
                            <tr><td>**Email:**</td><td>{{ $d['cliente']['email'] }}</td></tr>
                            <tr><td>**Teléfono:**</td><td>{{ $d['cliente']['telefono'] ?? 'N/A' }}</td></tr>
                        </table>
                    </div>
                </td>
                <td style="width: 50%;">
                    <div class="section-box" style="margin-left: 10px;">
                        <h3>DETALLES ESTADÍA:</h3>
                        <table class="table-info">
                            <tr><td>**Habitación:**</td><td>{{ $d['estadia']['habitacion_codigo'] }} / {{ $d['estadia']['habitacion_nombre'] }}</td></tr>
                            <tr><td>**Entrada:**</td><td>{{ $d['estadia']['fecha_entrada'] }}</td></tr>
                            <tr><td>**Salida:**</td><td>{{ $d['estadia']['fecha_salida'] }}</td></tr>
                            <tr><td>**Noches:**</td><td>{{ $d['estadia']['noches'] }}</td></tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        
        {{-- TABLA DE DETALLE DE CARGOS --}}
        <h3>Desglose de Cargos</h3>
        <table class="details-table">
            <thead>
                <tr>
                    <th style="width: 10%;">Tipo</th>
                    <th style="width: 40%;">Descripción</th>
                    <th class="qty" style="width: 10%;">Cant.</th>
                    <th class="price" style="width: 20%;">Precio Unit.</th>
                    <th class="subtotal" style="width: 20%;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($d['desglose'] as $item)
                    @php
                        $isCanceled = $item['estado'] === 'CANCELADO';
                        $rowClass = $isCanceled ? 'canceled' : '';
                    @endphp
                    <tr class="{{ $rowClass }}">
                        <td>{{ $item['tipo'] }}</td>
                        <td>{{ $item['descripcion'] }}</td>
                        <td class="qty">{{ $item['cantidad'] }}</td>
                        <td class="price">{{ $formatBs($item['precio_unitario']) }}</td>
                        <td class="subtotal">{{ $formatBs($item['subtotal']) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- RESUMEN DE TOTALES --}}
        <div class="totals-container">
            <table class="totals-box">
                <tr>
                    <td class="label">SUBTOTAL CARGOS:</td>
                    <td class="value">{{ $formatBs($d['cuenta']['total_calculado']) }}</td>
                </tr>
                <tr>
                    <td class="label">(-) Descuentos/Ajustes:</td>
                    <td class="value">{{ $formatBs(0) }}</td>
                </tr>
                <tr>
                    <td class="label">TOTAL A COBRAR:</td>
                    <td class="value">{{ $formatBs($d['cuenta']['total_calculado']) }}</td>
                </tr>
                <tr>
                    <td class="label">Monto Pagado:</td>
                    <td class="value">{{ $formatBs($d['cuenta']['monto_pagado']) }}</td>
                </tr>
                <tr class="final">
                    <td class="label">SALDO PENDIENTE:</td>
                    <td class="value">{{ $formatBs($d['cuenta']['saldo']) }}</td>
                </tr>
            </table>
        </div>

        <div style="clear: both;"></div>

        <div class="note">
            <p>Este documento es un reporte proforma de consumos y estancia y no constituye una factura fiscal, a menos que se indique lo contrario. Los cargos cancelados aparecen tachados.</p>
        </div>

    </div>
</body>
</html>