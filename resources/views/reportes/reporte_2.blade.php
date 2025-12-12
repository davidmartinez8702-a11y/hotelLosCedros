<!DOCTYPE html>
<html lang="es">
<head>
    <title>INVOICE CUE-{{ $datosReporte['cuenta']['id'] }}</title>
    <meta charset="UTF-8">
    <style>
        /* ... (Estilos CSS se mantienen igual) ... */
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 10pt;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            padding: 30px 40px;
        }
        .header-layout {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333;
        }
        .header-layout td {
            vertical-align: top;
            padding: 0;
        }
        .logo-box {
            width: 200px;
            height: 100px; 
            line-height: 50px;
            text-align: left;
        }
        .hotel-info {
            text-align: right;
            font-size: 9pt;
            line-height: 1.5;
        }
        .hotel-name {
            font-size: 14pt;
            font-weight: bold;
            /* color: #1a56db; */
            color:#C1A520;
            margin-bottom: 2px;
        }
        .invoice-title-section {
            width: 100%;
            padding: 5px 0;
            margin-bottom: 20px;
        }
        .invoice-title-section .title {
            font-size: 16pt;
            font-weight: bold;
            color: #444;
            float: left;
        }
        .invoice-title-section .id {
            font-size: 10pt;
            color: #888;
            float: right;
            padding-top: 5px;
        }
        .data-sections {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 9pt;
        }
        .data-sections td {
            width: 33.33%;
            padding: 0 10px 10px 0;
            vertical-align: top;
        }
        .data-sections h4 {
            font-size: 10pt;
            /* color: #1a56db; */
            color:#C1A520;
            margin: 0 0 5px 0;
            padding-bottom: 3px;
        }
        .data-label {
            font-weight: bold;
            color: #555;
            width: 90px;
            display: inline-block;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .details-table th {
            padding: 8px 10px;
            text-align: left;
            font-size: 9pt;
            color: #333;
            background-color: transparent;
            border-bottom: 2px solid #333;
        }
        .details-table td {
            padding: 8px 10px;
            border-bottom: 1px dotted #ddd;
            text-align: left;
            font-size: 9pt;
        }
        .details-table tr:last-of-type td {
            border-bottom: none;
        }
        .text-right {
            text-align: right;
        }
        .totals-container {
            width: 100%;
            margin-top: 25px;
        }
        .totals-box {
            width: 300px;
            float: right;
            border-collapse: collapse;
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
            background-color: #f7f7f7;
            border-top: 2px solid #333;
        }
        .note {
            margin-top: 20px;
            font-size: 8pt;
            color: #777;
        }
        .bs {
            font-weight: normal;
        }
    </style>
</head>
<body>

    @php
        $d = $datosReporte;
        $cliente = $d['cliente'];
        $estadia = $d['estadia'];
        $cuenta = $d['cuenta'];
        $hotel = $d['hotel'];
        
        $formatBs = fn($monto) => 'Bs. ' . number_format($monto, 2, '.', ',');
    @endphp

    <div class="container">
        
        {{-- SECCIÓN 1: ENCABEZADO Y DATOS DEL HOTEL --}}
        <table class="header-layout">
            <tr>
                <td style="width: 30%;">
                    <div class="logo-box">
                        @if ($hotel['logo_base64'])
                            <img src="{{ $hotel['logo_base64'] }}" style="max-width: 100%; max-height: 300px;">
                        @else
                            <span style="color: #cc0000;">[LOGO FALTANTE]</span>
                        @endif
                    </div>
                </td>
                <td style="width: 40%;">
                    </td>
                <td style="width: 30%;">
                    <div class="hotel-info">
                        <div class="hotel-name">{{ $hotel['nombre'] }}</div>
                        NIT: {{ $hotel['nit'] }}<br>
                        Ubicación: {{ $hotel['ubicacion'] }}<br>
                        Teléfono: {{ $hotel['telefono'] }}<br>
                    </div>
                </td>
            </tr>
        </table>
        
        <div style="clear: both;"></div>

        {{-- SECCIÓN 2: TÍTULO Y FECHA --}}
        <div class="invoice-title-section">
            <div class="title">{{ $d['titulo'] }}</div>
            <div class="id">
                Emisión: {{ $cuenta['fecha_emision'] }}
            </div>
            <div style="clear: both;"></div>
        </div>

        {{-- SECCIÓN 3: INFORMACIÓN DEL CLIENTE Y ESTADÍA --}}
        <table class="data-sections">
            <tr>
                <td>
                    <h4>FACTURADO A:</h4>
                    <span class="data-label">Cliente:</span> {{ $cliente['nombre'] }}<br>
                    <span class="data-label">Email:</span> {{ $cliente['email'] }}<br>
                    <span class="data-label">Teléfono:</span> {{ $cliente['telefono'] ?? 'N/A' }}<br>
                </td>
                <td>
                    <h4>DETALLES ESTADÍA</h4>
                    <span class="data-label">Habitación:</span> {{ $estadia['habitacion_codigo'] }}<br>
                    <span class="data-label">Categoría:</span> {{ $estadia['habitacion_nombre'] }}<br> <span class="data-label">Check-in:</span> {{ $estadia['fecha_entrada'] }}<br>
                    <span class="data-label">Check-out:</span> {{ $estadia['fecha_salida'] }}<br>
                </td>
                <td>
                    <h4>INFORMACIÓN INTERNA</h4>
                    <span class="data-label">Recepcionista:</span> {{ $d['recepcionista'] }}<br>
                    <span class="data-label">Noches:</span> {{ $estadia['noches'] }}<br>
                    <span class="data-label">Fecha Reserva:</span> {{ $estadia['fecha_reserva'] }}<br> </td>
            </tr>
        </table>

        {{-- SECCIÓN 4: DESGLOSE DE CARGOS --}}
        <h3>DETALLE DE CONSUMOS</h3>
        <table class="details-table">
            <thead>
                <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 10%;">Tipo</th>
                    <th style="width: 40%;">Descripción</th>
                    <th class="text-right" style="width: 10%;">Cant.</th>
                    <th class="text-right" style="width: 15%;">Precio Unit.</th>
                    <th class="text-right" style="width: 20%;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($d['desglose'] as $index => $item)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $item['tipo'] }}</td>
                        <td>
                            {{ $item['descripcion'] }}
                        </td>
                        <td class="text-right">{{ $item['cantidad'] }}</td>
                        <td class="text-right"><span class="bs">Bs.</span> {{ number_format($item['precio_unitario'], 2, '.', ',') }}</td>
                        <td class="text-right"><span class="bs">Bs.</span> {{ number_format($item['subtotal'], 2, '.', ',') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- SECCIÓN 5: RESUMEN DE TOTALES --}}
        <div class="totals-container">
            <table class="totals-box">
                <tr>
                    <td>SUBTOTAL CARGOS:</td>
                    <td class="value">{{ $formatBs($cuenta['total_calculado']) }}</td>
                </tr>
                <tr>
                    <td>(-) Monto Pagado:</td>
                    <td class="value">{{ $formatBs($cuenta['monto_pagado']) }}</td>
                </tr>
                <tr class="final">
                    <td>SALDO PENDIENTE:</td>
                    <td class="value">{{ $formatBs($cuenta['saldo']) }}</td>
                </tr>
            </table>
        </div>

        <div style="clear: both;"></div>

        <div class="note">
            <p>Este documento es una proforma y un detalle de consumos a la fecha de emisión.</p>
            <p>Por favor, revise sus cargos antes de proceder al checkout final.</p>
        </div>

    </div>
</body>
</html>