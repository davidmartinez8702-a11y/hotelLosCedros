<!DOCTYPE html>
<html lang="es">
<head>
    <title>RESERVA-{{ $d['reserva']['id'] }}</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Helvetica', Arial, sans-serif; font-size: 10pt; margin: 0; padding: 0; color: #333; }
        .container { padding: 30px 40px; }
        .header-layout { width: 100%; border-collapse: collapse; margin-bottom: 25px; border-bottom: 2px solid #333; }
        .logo-box { width: 200px; height: 80px; text-align: left; }
        .hotel-info { text-align: right; font-size: 9pt; line-height: 1.5; }
        .hotel-name { font-size: 14pt; font-weight: bold; color:#C1A520; }
        .invoice-title-section { width: 100%; padding: 5px 0; margin-bottom: 20px; }
        .invoice-title-section .title { font-size: 16pt; font-weight: bold; color: #444; float: left; }
        .invoice-title-section .id { font-size: 10pt; color: #888; float: right; padding-top: 5px; }
        .data-sections { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 9pt; }
        .data-sections td { width: 33.33%; padding: 0 10px 10px 0; vertical-align: top; }
        .data-sections h4 { font-size: 10pt; color:#C1A520; margin: 0 0 5px 0; }
        .data-label { font-weight: bold; color: #555; width: 90px; display: inline-block; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .details-table th { padding: 8px 10px; text-align: left; font-size: 9pt; border-bottom: 2px solid #333; }
        .details-table td { padding: 8px 10px; border-bottom: 1px dotted #ddd; font-size: 9pt; }
        .text-right { text-align: right; }
        .totals-box { width: 300px; float: right; border-collapse: collapse; margin-top: 25px; }
        .totals-box td { padding: 8px 15px; font-size: 10pt; }
        .totals-box .final { background-color: #f7f7f7; border-top: 2px solid #C1A520; }
        .bs { font-weight: normal; }
    </style>
</head>
<body>
    @php
        $formatBs = fn($monto) => 'Bs. ' . number_format($monto, 2, '.', ',');
    @endphp

    <div class="container">
        <table class="header-layout">
            <tr>
                <td style="width: 30%;">
                    <div class="logo-box">
                        @if ($d['hotel']['logo_base64'])
                            <img src="{{ $d['hotel']['logo_base64'] }}" style="max-width: 100%; max-height: 80px;">
                        @endif
                    </div>
                </td>
                <td></td>
                <td style="width: 40%;">
                    <div class="hotel-info">
                        <div class="hotel-name">{{ $d['hotel']['nombre'] }}</div>
                        NIT: {{ $d['hotel']['nit'] }}<br>
                        Ubicación: {{ $d['hotel']['ubicacion'] }}<br>
                        Teléfono: {{ $d['hotel']['telefono'] }}
                    </div>
                </td>
            </tr>
        </table>

        <div class="invoice-title-section">
            <div class="title">{{ $d['titulo'] }}</div>
            <div class="id">Emisión: {{ $d['reserva']['fecha_emision'] }}</div>
            <div style="clear: both;"></div>
        </div>

        <table class="data-sections">
            <tr>
                <td>
                    <h4>CLIENTE</h4>
                    <span class="data-label">Nombre:</span> {{ $d['cliente']['nombre'] }}<br>
                    <span class="data-label">Email:</span> {{ $d['cliente']['email'] }}
                </td>
                <td>
                    <h4>DETALLES ESTADÍA</h4>
                    <span class="data-label">Llegada:</span> {{ $d['estadia']['fecha_llegada'] }}<br>
                    <span class="data-label">Noches:</span> {{ $d['estadia']['noches'] }}<br>
                    <span class="data-label">Viaje:</span> {{ ucfirst($d['estadia']['tipo_viaje']) }}
                </td>
                <td>
                    <h4>ESTADO FINANCIERO</h4>
                    <span class="data-label">Saldo Pend:</span> <strong>{{ $formatBs($d['reserva']['saldo_pendiente']) }}</strong>
                </td>
            </tr>
        </table>

        <h3>DISTRIBUCIÓN DE HABITACIONES</h3>
        <table class="details-table">
            <thead>
                <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 35%;">Tipo de Habitación</th>
                    <th class="text-right" style="width: 10%;">Cant.</th>
                    <th class="text-right" style="width: 10%;">Noches</th>
                    <th class="text-right" style="width: 20%;">Precio/Noche</th>
                    <th class="text-right" style="width: 20%;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($d['desglose'] as $index => $item)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $item['descripcion'] }}</td>
                        <td class="text-right">{{ $item['cantidad'] }}</td>
                        <td class="text-right">{{ $item['noches'] }}</td>
                        <td class="text-right"><span class="bs">Bs.</span> {{ number_format($item['precio_unitario'], 2) }}</td>
                        <td class="text-right"><strong><span class="bs">Bs.</span> {{ number_format($item['subtotal'], 2) }}</strong></td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="totals-box">
            <table style="width: 100%">
                <tr>
                    <td>Total Estancia:</td>
                    <td class="text-right">{{ $formatBs($d['reserva']['total_bruto']) }}</td>
                </tr>
                @if($d['reserva']['descuento'] > 0)
                <tr>
                    <td style="color: green">(-) Descuento Promo:</td>
                    <td class="text-right" style="color: green">{{ $formatBs($d['reserva']['descuento']) }}</td>
                </tr>
                @endif
                <tr>
                    <td>(-) Pago Inicial:</td>
                    <td class="text-right">{{ $formatBs($d['reserva']['pago_inicial']) }}</td>
                </tr>
                <tr class="final">
                    <td><strong>SALDO A PAGAR:</strong></td>
                    <td class="text-right"><strong>{{ $formatBs($d['reserva']['saldo_pendiente']) }}</strong></td>
                </tr>
            </table>
        </div>

        <!-- <div style="clear: both;"></div>
        <div class="note">
            <p>Este documento es una confirmación de la distribución de habitaciones y presupuesto de la reserva.</p>
            <p>Sujeto a cambios según consumos adicionales durante la estancia.</p>
        </div> -->
    </div>
</body>
</html>