{{-- filepath: d:\DESARRROLLO\TALLER_DE_GRADO\Laravel-Hotel\resources\views\pdf\factura-reserva.blade.php --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura - Reserva {{ $codigo_reserva }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            font-size: 11px;
            color: #333;
            line-height: 1.4;
        }

        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }

        .header-content {
            display: table;
            width: 100%;
        }

        .logo-section {
            display: table-cell;
            width: 30%;
            vertical-align: middle;
        }

        .logo {
            max-width: 120px;
            height: auto;
        }

        .info-section {
            display: table-cell;
            width: 70%;
            text-align: right;
            vertical-align: middle;
        }

        .hotel-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .hotel-info {
            font-size: 10px;
            opacity: 0.9;
        }

        .document-title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin: 20px 0;
            padding: 10px;
            background-color: #f0f9ff;
            border-radius: 5px;
        }

        .section {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .info-grid {
            display: table;
            width: 100%;
            margin-top: 10px;
        }

        .info-row {
            display: table-row;
        }

        .info-label {
            display: table-cell;
            width: 40%;
            font-weight: bold;
            padding: 5px 0;
            color: #4b5563;
        }

        .info-value {
            display: table-cell;
            width: 60%;
            padding: 5px 0;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
        }

        .table thead {
            background-color: #1e3a8a;
            color: white;
        }

        .table th {
            padding: 10px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }

        .table td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
        }

        .table tbody tr:last-child td {
            border-bottom: none;
        }

        .table tbody tr:hover {
            background-color: #f9fafb;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .totals-section {
            margin-top: 20px;
            padding: 15px;
            background-color: #f0f9ff;
            border-radius: 8px;
        }

        .total-row {
            display: table;
            width: 100%;
            margin: 5px 0;
        }

        .total-label {
            display: table-cell;
            width: 70%;
            text-align: right;
            padding-right: 15px;
            font-weight: bold;
        }

        .total-value {
            display: table-cell;
            width: 30%;
            text-align: right;
            font-size: 13px;
        }

        .grand-total {
            border-top: 2px solid #1e3a8a;
            padding-top: 10px;
            margin-top: 10px;
        }

        .grand-total .total-label,
        .grand-total .total-value {
            font-size: 16px;
            color: #1e3a8a;
        }

        .estado-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .estado-pendiente {
            background-color: #fef3c7;
            color: #92400e;
        }

        .estado-confirmada {
            background-color: #d1fae5;
            color: #065f46;
        }

        .estado-pagada {
            background-color: #dbeafe;
            color: #1e40af;
        }

        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
        }

        .highlight {
            background-color: #fef3c7;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }

        .promo-section {
            background-color: #fef3c7;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 4px solid #f59e0b;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    {{-- HEADER --}}
    <div class="header">
        <div class="header-content">
            <div class="logo-section">
                @if($logo)
                    <img src="{{ $logo }}" alt="Logo Hotel" class="logo">
                @endif
            </div>
            <div class="info-section">
                <div class="hotel-name">HOTEL LOS CEDROS</div>
                <div class="hotel-info">
                    Av. Principal #123, La Paz - Bolivia<br>
                    Teléfono: +591 2 1234567<br>
                    Email: reservas@hotelcedros.com
                </div>
            </div>
        </div>
    </div>

    {{-- TÍTULO --}}
    <div class="document-title">
        ✓ FACTURA DE RESERVA - {{ $codigo_reserva }}
    </div>

    {{-- INFORMACIÓN DE LA RESERVA --}}
    <div class="section">
        <div class="section-title">📋 DATOS DE LA RESERVA</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">Código de Reserva:</div>
                <div class="info-value"><strong>{{ $codigo_reserva }}</strong></div>
            </div>
            <div class="info-row">
                <div class="info-label">Fecha de Emisión:</div>
                <div class="info-value">{{ $fecha_emision }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Estado:</div>
                <div class="info-value">
                    <span class="estado-badge estado-{{ $reserva->estado }}">
                        {{ strtoupper($reserva->estado) }}
                    </span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Tipo de Viaje:</div>
                <div class="info-value">{{ ucfirst(str_replace('_', ' ', $reserva->tipo_viaje)) }}</div>
            </div>
        </div>
    </div>

    {{-- INFORMACIÓN DEL CLIENTE --}}
    <div class="section">
        <div class="section-title">👤 DATOS DEL CLIENTE</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">Nombre Completo:</div>
                <div class="info-value">{{ $reserva->cliente->nombre }} {{ $reserva->cliente->apellido }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">{{ $reserva->cliente->email }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Teléfono:</div>
                <div class="info-value">{{ $reserva->cliente->telefono }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">CI/Pasaporte:</div>
                <div class="info-value">{{ $reserva->cliente->ci_pasaporte }}</div>
            </div>
        </div>
    </div>

    {{-- FECHAS DE ESTADÍA --}}
    <div class="section">
        <div class="section-title">📅 FECHAS DE ESTADÍA</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">Fecha de Reserva:</div>
                <div class="info-value">{{ \Carbon\Carbon::parse($reserva->fecha_reserva)->format('d/m/Y') }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Check-in:</div>
                <div class="info-value">
                    <span class="highlight">{{ \Carbon\Carbon::parse($reserva->fecha_reserva)->addDays(7)->format('d/m/Y 14:00') }}</span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Check-out:</div>
                <div class="info-value">
                    <span class="highlight">{{ \Carbon\Carbon::parse($reserva->fecha_reserva)->addDays(7 + $reserva->dias_estadia)->format('d/m/Y 12:00') }}</span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Noches:</div>
                <div class="info-value"><strong>{{ $reserva->dias_estadia }}</strong></div>
            </div>
            <div class="info-row">
                <div class="info-label">Huéspedes:</div>
                <div class="info-value">{{ $reserva->total_cantidad_adultos }} adultos, {{ $reserva->total_cantidad_infantes }} niños</div>
            </div>
        </div>
    </div>

    {{-- PROMOCIÓN (si existe) --}}
    @if($reserva->promo)
    <div class="promo-section">
        <div style="font-weight: bold; margin-bottom: 5px;">🎁 PROMOCIÓN APLICADA</div>
        <div><strong>{{ $reserva->promo->nombre }}</strong></div>
        <div style="font-size: 10px; margin-top: 3px;">{{ $reserva->promo->descripcion }}</div>
        <div style="margin-top: 5px;">
            Descuento: <strong>{{ $reserva->porcentaje_descuento }}%</strong>
        </div>
    </div>
    @endif

    {{-- DETALLE DE HABITACIONES --}}
    <div class="section">
        <div class="section-title">🛏️ HABITACIONES RESERVADAS</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Habitación</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-right">Precio/Noche</th>
                    <th class="text-center">Noches</th>
                    <th class="text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @php $subtotal = 0; @endphp
                @foreach($reserva->hospedajes as $hospedaje)
                    @php
                        $precioNoche = $hospedaje->tipoHabitacion->precio;
                        $subtotalHabitacion = $precioNoche * $hospedaje->cantidad * $reserva->dias_estadia;
                        $subtotal += $subtotalHabitacion;
                    @endphp
                    <tr>
                        <td>{{ $hospedaje->tipoHabitacion->nombre }}</td>
                        <td class="text-center">{{ $hospedaje->cantidad }}</td>
                        <td class="text-right">Bs. {{ number_format($precioNoche, 2) }}</td>
                        <td class="text-center">{{ $reserva->dias_estadia }}</td>
                        <td class="text-right"><strong>Bs. {{ number_format($subtotalHabitacion, 2) }}</strong></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- TOTALES --}}
    <div class="totals-section">
        <div class="total-row">
            <div class="total-label">Subtotal:</div>
            <div class="total-value">Bs. {{ number_format($subtotal, 2) }}</div>
        </div>

        @if($reserva->porcentaje_descuento > 0)
        <div class="total-row">
            <div class="total-label">Descuento ({{ $reserva->porcentaje_descuento }}%):</div>
            <div class="total-value" style="color: #dc2626;">- Bs. {{ number_format($subtotal * $reserva->porcentaje_descuento / 100, 2) }}</div>
        </div>
        @endif

        <div class="total-row grand-total">
            <div class="total-label">TOTAL A PAGAR:</div>
            <div class="total-value">Bs. {{ number_format($reserva->monto_total, 2) }}</div>
        </div>

        <div class="total-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #cbd5e1;">
            <div class="total-label">
                @if($reserva->pago_inicial >= $reserva->monto_total)
                    Pago Completo:
                @else
                    Anticipo Pagado:
                @endif
            </div>
            <div class="total-value" style="color: #059669;">Bs. {{ number_format($reserva->pago_inicial, 2) }}</div>
        </div>

        @if($saldo_pendiente > 0)
        <div class="total-row">
            <div class="total-label">Saldo Pendiente:</div>
            <div class="total-value" style="color: #dc2626; font-weight: bold;">Bs. {{ number_format($saldo_pendiente, 2) }}</div>
        </div>
        <div style="text-align: right; margin-top: 5px; font-size: 10px; color: #6b7280;">
            * A pagar al momento del check-in
        </div>
        @else
        <div style="text-align: right; margin-top: 10px; padding: 10px; background-color: #d1fae5; border-radius: 5px; color: #065f46; font-weight: bold;">
            ✓ RESERVA PAGADA EN SU TOTALIDAD
        </div>
        @endif
    </div>

    {{-- INFORMACIÓN DE PAGO --}}
    <div class="section">
        <div class="section-title">💳 INFORMACIÓN DE PAGO</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">Método de Pago:</div>
                <div class="info-value">{{ strtoupper($factura->tipoPago->nombre) }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Estado de Pago:</div>
                <div class="info-value">
                    <span class="estado-badge estado-pagada">{{ strtoupper($factura->estado) }}</span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Monto Pagado:</div>
                <div class="info-value"><strong>Bs. {{ number_format($factura->monto_relativo, 2) }}</strong></div>
            </div>
        </div>
    </div>

    {{-- POLÍTICAS --}}
    <div class="section">
        <div class="section-title">📜 POLÍTICAS DE RESERVA</div>
        <ul style="margin: 10px 0 0 20px; font-size: 10px; line-height: 1.6;">
            <li>Check-in desde las 14:00 hrs.</li>
            <li>Check-out hasta las 12:00 hrs.</li>
            <li>Cancelación gratuita hasta 48 horas antes de la fecha de entrada.</li>
            <li>No-show o cancelación tardía: se cobrará el 100% de la primera noche.</li>
            <li>El saldo pendiente debe ser pagado al momento del check-in.</li>
            <li>Presentar documento de identidad válido al momento del check-in.</li>
        </ul>
    </div>

    {{-- FOOTER --}}
    <div class="footer">
        <p><strong>¡Gracias por elegirnos!</strong></p>
        <p>Este documento es una factura válida de tu reserva.</p>
        <p>Para cualquier consulta, contáctanos a reservas@hotelcedros.com o al +591 2 1234567</p>
        <p style="margin-top: 10px; font-size: 9px;">
            Documento generado electrónicamente el {{ now()->format('d/m/Y H:i:s') }}
        </p>
    </div>
</body>
</html>