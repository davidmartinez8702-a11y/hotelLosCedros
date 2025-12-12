<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Helvetica', Arial, sans-serif; font-size: 9pt; color: #333; margin: 0; padding: 0; }
        .container { padding: 30px; }
        .header { width: 100%; border-bottom: 2px solid #C1A520; margin-bottom: 20px; padding-bottom: 10px; }
        .hotel-name { font-size: 14pt; font-weight: bold; color: #C1A520; }
        
        /* Estilo de Tarjeta de Habitación */
        .room-section { 
            border: 1px solid #ddd; 
            margin-bottom: 25px; 
            page-break-inside: avoid; 
        }
        .room-title { 
            background-color: #fcf8e3; 
            padding: 8px 12px; 
            border-bottom: 2px solid #C1A520;
            font-weight: bold;
        }
        .room-code { color: #C1A520; font-size: 12pt; }
        .room-type { float: right; font-size: 8pt; color: #666; padding-top: 3px; }

        /* Tabla de Huéspedes por habitación */
        .guests-table { width: 100%; border-collapse: collapse; }
        .guests-table th { 
            background-color: #f9f9f9; 
            text-align: left; 
            padding: 6px 10px; 
            font-size: 8pt; 
            color: #777;
            border-bottom: 1px solid #eee;
        }
        .guests-table td { padding: 10px; border-bottom: 1px solid #f2f2f2; vertical-align: top; }
        
        .guest-info { font-weight: bold; font-size: 10pt; }
        .guest-sub { font-size: 8pt; color: #666; margin-top: 2px; }

        .footer { margin-top: 50px; text-align: center; font-size: 8pt; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <table style="width: 100%;" class="header">
            <tr>
                <td style="width: 60%;">
                    @if($d['hotel']['logo_base64'])
                        <img src="{{ $d['hotel']['logo_base64'] }}" style="max-height: 60px;">
                    @else
                        <div class="hotel-name">{{ $d['hotel']['nombre'] }}</div>
                    @endif
                </td>
                <td style="text-align: right; line-height: 1.2;">
                    <h2 style="color: #C1A520; margin: 0; font-size: 14pt;">{{ $d['titulo'] }}</h2>
                    <span style="font-size: 9pt;">Reserva: <strong>#{{ $d['reserva']['id'] }}</strong></span><br>
                    <span style="font-size: 8pt;">Emisión: {{ $d['reserva']['fecha_emision'] }}</span>
                </td>
            </tr>
        </table>

        <div style="margin-bottom: 20px; font-size: 10pt;">
            <strong>Titular de Reserva:</strong> {{ $d['reserva']['titular'] }}<br>
            <strong>Estancia:</strong> {{ $d['reserva']['noches'] }} noches
        </div>

        @foreach($d['habitaciones'] as $codigo => $checkins)
            @php 
                $h = $checkins->first()->habitacionEvento; 
            @endphp
            <div class="room-section">
                <div class="room-title">
                    <span class="room-code">HABITACIÓN: {{ $codigo }}</span>
                    <span class="room-type">{{ $h->tipoHabitacion->nombre }} | {{ $h->nombre }}</span>
                </div>
                
                <table class="guests-table">
                    <thead>
                        <tr>
                            <th style="width: 40%;">Nombre del Huésped</th>
                            <th style="width: 20%;">Nacionalidad</th>
                            <th style="width: 20%;">Teléfono</th>
                            <th style="width: 20%;">Edad / Sexo</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($checkins as $ci)
                        @php $u = $ci->cliente->usuario; @endphp
                        <tr>
                            <td>
                                <div class="guest-info">{{ $u->name }}</div>
                                <div class="guest-sub">Check-in: {{ \Carbon\Carbon::parse($ci->fecha_entrada)->format('d/m/Y') }}</div>
                            </td>
                            <td>{{ ucfirst($u->tipo_nacionalidad) }}</td>
                            <td>{{ $u->telefono ?? 'N/A' }}</td>
                            <td>
                                {{ $u->edad ? $u->edad . ' años' : 'N/A' }} / 
                                {{ $u->sexo == 'M' ? 'Masc.' : ($u->sexo == 'F' ? 'Fem.' : 'N/A') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endforeach

        <div class="footer">
            <p>Este documento es para uso exclusivo del Hotel Los Cedros. Control de Registro de Pasajeros.</p>
        </div>
    </div>
</body>
</html>