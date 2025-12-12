<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Models\Reserva;
use App\Models\Hospedaje;
use App\Models\Factura;
use App\Models\Pago;
use App\Models\Garante;
use App\Models\Cliente;
use App\Models\TipoHabitacion;
use App\Models\TipoPago;
use App\Models\Checkin;
use App\Models\Recepcionista;
use App\Models\HabitacionEvento;
use App\Models\Cuenta;
use App\Models\Transaccion;
use App\Models\Servicio;
use App\Models\Platillo;
use Carbon\Carbon;
use Exception;

class ReservaCompletaSeeder extends Seeder
{
    private $fechaInicio;
    private $fechaFin;
    private $tiposHabitacion;
    private $tipoPagos;
    private $recepcionistas;
    private $servicios;
    private $platillos;
    private $familias;
    
    // ✅ MAPEO DE TIPOS DE HABITACIÓN A CÓDIGOS
    private $mapeoHabitaciones = [
        'Habitación Estándar Simple' => 'A',
        'Habitación Estándar Doble' => 'B',
        'Habitación Estándar Triple' => 'C',
        'Habitación Deluxe' => 'D',
        'Habitación Deluxe Familiar' => 'E',
        'Suite Junior' => 'F',
        'Suite Ejecutiva' => 'G',
        'Suite Presidencial' => 'H',
        'Habitación Luna de Miel' => 'I',
        'Habitación Accesible' => 'J',
    ];
    
    // ✅ PRECIOS BASE POR CÓDIGO (basados en TipoHabitacionSeeder)
    private $preciosBase = [
        'A' => 250,   // Estándar Simple
        'B' => 350,   // Estándar Doble
        'C' => 450,   // Estándar Triple
        'D' => 650,   // Deluxe
        'E' => 850,   // Deluxe Familiar
        'F' => 950,   // Suite Junior
        'G' => 1250,  // Suite Ejecutiva
        'H' => 2500,  // Suite Presidencial
        'I' => 1100,  // Luna de Miel
        'J' => 400,   // Accesible
    ];
    
    // ✅ CAPACIDADES POR CÓDIGO
    private $capacidades = [
        'A' => ['adultos' => 1, 'infantes' => 0, 'total' => 1],
        'B' => ['adultos' => 2, 'infantes' => 1, 'total' => 3],
        'C' => ['adultos' => 3, 'infantes' => 1, 'total' => 4],
        'D' => ['adultos' => 2, 'infantes' => 2, 'total' => 4],
        'E' => ['adultos' => 4, 'infantes' => 2, 'total' => 6],
        'F' => ['adultos' => 2, 'infantes' => 2, 'total' => 4],
        'G' => ['adultos' => 3, 'infantes' => 2, 'total' => 5],
        'H' => ['adultos' => 4, 'infantes' => 3, 'total' => 7],
        'I' => ['adultos' => 2, 'infantes' => 0, 'total' => 2],
        'J' => ['adultos' => 2, 'infantes' => 1, 'total' => 3],
    ];
    
    public function run(): void
    {
        $this->command->info('🏨 ═══════════════════════════════════════════════════');
        $this->command->info('   SEEDER COMPLETO: RESERVAS + CHECKINS + CUENTAS');
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();

        $this->fechaInicio = Carbon::create(2023, 1, 1);
        $this->fechaFin = Carbon::yesterday();
        $this->familias = collect();

        $this->command->info("📅 Rango de fechas: {$this->fechaInicio->format('Y-m-d')} → {$this->fechaFin->format('Y-m-d')}");
        $this->command->newLine();

        if (!$this->cargarDatosIniciales()) {
            return;
        }

        $clientes = Cliente::all();
        if ($clientes->isEmpty()) {
            $this->command->error('❌ No hay clientes disponibles.');
            return;
        }

        $this->command->info("👥 Clientes encontrados: {$clientes->count()}");
        $this->command->newLine();

        $this->crearGruposFamiliares($clientes);

        $clientesDistribuidos = $this->distribuirClientesPorPerfil($clientes);
        $this->procesarReservasPorPerfil($clientesDistribuidos);

        $this->command->newLine();
        $this->command->info('🎉 ═══════════════════════════════════════════════════');
        $this->command->info('   SEEDER COMPLETO FINALIZADO EXITOSAMENTE');
        $this->command->info('═══════════════════════════════════════════════════');
    }

    private function crearGruposFamiliares($clientes)
    {
        $this->command->info('👨‍👩‍👧‍👦 Creando grupos familiares...');
        
        $clientesDisponibles = $clientes->shuffle();
        $cantidadFamilias = (int) ($clientes->count() * 0.3);
        
        for ($i = 0; $i < $cantidadFamilias; $i++) {
            if ($clientesDisponibles->count() < 2) break;

            $tamanoFamilia = rand(2, 4);
            $familia = $clientesDisponibles->splice(0, $tamanoFamilia)->pluck('id')->toArray();
            
            if (count($familia) >= 2) {
                $this->familias->push([
                    'titular' => $familia[0],
                    'integrantes' => $familia,
                ]);
            }
        }

        $this->command->info("   ✅ Familias creadas: {$this->familias->count()}");
        $this->command->newLine();
    }

    /**
     * Cargar datos iniciales necesarios
     */
    private function cargarDatosIniciales(): bool
    {
        $this->tiposHabitacion = TipoHabitacion::where('tipo', 'habitacion')->get();
        $this->tipoPagos = TipoPago::whereIn('nombre', ['qr', 'efectivo', 'stripe'])->get();
        $this->recepcionistas = Recepcionista::all();
        $this->servicios = Servicio::where('estado', 'activo')->get();
        $this->platillos = Platillo::where('estado', 'disponible')->get();

        if ($this->tiposHabitacion->isEmpty() || $this->tipoPagos->isEmpty() || $this->recepcionistas->isEmpty()) {
            $this->command->error('❌ Faltan datos necesarios.');
            return false;
        }

        // ✅ Mostrar mapeo de habitaciones
        $this->command->info("🏨 Tipos de habitación cargados:");
        foreach ($this->tiposHabitacion as $tipo) {
            $codigo = $this->mapeoHabitaciones[$tipo->nombre] ?? '?';
            $precio = $this->preciosBase[$codigo] ?? $tipo->precio;
            $this->command->info("   [{$codigo}] {$tipo->nombre} - Bs. {$precio}");
        }
        
        $this->command->newLine();
        $this->command->info("💳 Tipos de pago: {$this->tipoPagos->count()}");
        $this->command->info("👔 Recepcionistas: {$this->recepcionistas->count()}");
        $this->command->info("🛎️  Servicios: {$this->servicios->count()}");
        $this->command->info("🍽️  Platillos: {$this->platillos->count()}");

        return true;
    }

    /**
     * Distribuir clientes según perfil (Ocasional, Frecuente, VIP, Corporativo)
     */
    private function distribuirClientesPorPerfil($clientes)
    {
        $totalClientes = $clientes->count();
        
        $distribucion = [
            'ocasional' => [
                'porcentaje' => 50,
                'reservas_min' => 1,
                'reservas_max' => 2,
                'clientes' => [],
            ],
            'frecuente' => [
                'porcentaje' => 25,
                'reservas_min' => 3,
                'reservas_max' => 6,
                'clientes' => [],
            ],
            'vip' => [
                'porcentaje' => 10,
                'reservas_min' => 7,
                'reservas_max' => 12,
                'clientes' => [],
            ],
            'corporativo' => [
                'porcentaje' => 10,
                'reservas_min' => 4,
                'reservas_max' => 8,
                'clientes' => [],
            ],
            'familiar' => [
                'porcentaje' => 5,
                'reservas_min' => 1,
                'reservas_max' => 3,
                'clientes' => [],
            ],
        ];

        $clientesShuffled = $clientes->shuffle();
        $indice = 0;

        foreach ($distribucion as $perfil => &$datos) {
            $cantidad = (int) round(($datos['porcentaje'] / 100) * $totalClientes);
            $datos['clientes'] = $clientesShuffled->slice($indice, $cantidad);
            $indice += $cantidad;

            $this->command->info("📊 {$perfil}: {$datos['clientes']->count()} clientes ({$datos['reservas_min']}-{$datos['reservas_max']} reservas)");
        }

        $this->command->newLine();
        return $distribucion;
    }

    /**
     * Procesar reservas por perfil de cliente
     */
    private function procesarReservasPorPerfil($distribucion)
    {
        $totalReservasCreadas = 0;
        $totalCanceladas = 0;
        $totalCheckins = 0;
        $totalCuentas = 0;
        $totalReservasFamiliares = 0;

        foreach ($distribucion as $perfil => $datos) {
            $this->command->info("🔄 Procesando perfil: {$perfil}...");
            
            foreach ($datos['clientes'] as $cliente) {
                $cantidadReservas = rand($datos['reservas_min'], $datos['reservas_max']);

                for ($i = 0; $i < $cantidadReservas; $i++) {
                    DB::beginTransaction();

                    try {
                        $reserva = $this->crearReserva($cliente, $perfil);
                        $totalReservasCreadas++;

                        if ($reserva->tipo_viaje === 'familiar') {
                            $totalReservasFamiliares++;
                        }

                        if ($reserva->estado === 'cancelada') {
                            $totalCanceladas++;
                            DB::commit();
                            continue;
                        }

                        $checkins = $this->crearCheckins($reserva);
                        $totalCheckins += count($checkins);

                        foreach ($checkins as $checkin) {
                            $this->crearCuentaCompleta($checkin, $reserva, $perfil);
                            $totalCuentas++;
                        }

                        DB::commit();

                    } catch (Exception $e) {
                        DB::rollBack();
                        $this->command->error("❌ Error: {$e->getMessage()}");
                    }
                }
            }

            $this->command->info("✅ Perfil {$perfil} completado");
            $this->command->newLine();
        }

        // Resumen final
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN GENERAL');
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info("   📅 Reservas totales:          {$totalReservasCreadas}");
        $this->command->info("   👨‍👩‍👧‍👦 Reservas familiares:     {$totalReservasFamiliares}");
        $this->command->info("   ❌ Canceladas (20%):          {$totalCanceladas}");
        $this->command->info("   ✅ Confirmadas (80%):         " . ($totalReservasCreadas - $totalCanceladas));
        $this->command->info("   🏨 Check-ins creados:         {$totalCheckins}");
        $this->command->info("   💳 Cuentas procesadas:        {$totalCuentas}");
        $this->command->info('═══════════════════════════════════════════════════');
    }

    /**
     * Crear una reserva con datos realistas
     */
    private function crearReserva($cliente, $perfil)
    {
        // Fecha de reserva aleatoria entre 2023 y ayer
        $fechaReserva = Carbon::createFromTimestamp(
            rand($this->fechaInicio->timestamp, $this->fechaFin->timestamp)
        );

        // Lead time (días de anticipación)
        $leadTime = $this->calcularLeadTime($perfil);
        $fechaEntrada = (clone $fechaReserva)->addDays($leadTime);

        // Asegurar que no sea después de ayer
        if ($fechaEntrada->gt($this->fechaFin)) {
            $fechaEntrada = (clone $this->fechaFin)->subDays(rand(1, 7));
        }

        // Días de estadía según perfil
        $diasEstadia = $this->calcularDiasEstadia($perfil);

        // Tipo de viaje según perfil
        $tipoViaje = $this->determinarTipoViaje($perfil);

        // ✅ Cantidad de personas según perfil
        if ($tipoViaje === 'familiar') {
            $cantidadAdultos = rand(2, 4);
            $cantidadInfantes = rand(1, 3);
        } elseif ($tipoViaje === 'negocios') {
            $cantidadAdultos = rand(1, 2);
            $cantidadInfantes = 0;
        } else {
            $cantidadAdultos = rand(1, 2);
            $cantidadInfantes = rand(0, 1);
        }

        // ✅ Seleccionar habitaciones según perfil
        $tiposSeleccionados = $this->seleccionarHabitacionesPorPerfil($perfil);
        $montoTotal = 0;
        $hospedajes = [];

        foreach ($tiposSeleccionados as $tipo) {
            $cantidad = 1;
            
            // ✅ Obtener código y precio base
            $codigo = $this->mapeoHabitaciones[$tipo->nombre] ?? null;
            $precioBase = $codigo ? $this->preciosBase[$codigo] : $tipo->precio;
            
            // ✅ Aplicar variación temporal
            $precioFinal = $this->aplicarVariacionTemporal($precioBase, $fechaEntrada);
            
            $montoTotal += ($precioFinal * $cantidad * $diasEstadia);

            $hospedajes[] = [
                'tipo_habitacion_id' => $tipo->id,
                'cantidad' => $cantidad,
            ];
        }

        // Determinar estado (80% confirmada/pendiente, 20% cancelada)
        $estadoProbabilidad = rand(1, 100);
        $estado = ($estadoProbabilidad <= 20) ? 'cancelada' : (rand(0, 1) ? 'confirmada' : 'pendiente');

        // Lógica de pago inicial
        $tipoPago = $this->tipoPagos->random();
        list($pagoInicial, $porcentajeDescuento, $crearGarante) = $this->calcularPagoInicial($montoTotal, $estado, $perfil);

        // Crear reserva
        $reserva = Reserva::create([
            'cliente_id' => $cliente->id,
            'promo_id' => null,
            'total_cantidad_adultos' => $cantidadAdultos,
            'total_cantidad_infantes' => $cantidadInfantes,
            'fecha_reserva' => $fechaReserva,
            'dias_estadia' => $diasEstadia,
            'estado' => $estado,
            'tipo_reserva' => 'habitacion',
            'porcentaje_descuento' => $porcentajeDescuento,
            'monto_total' => $montoTotal,
            'pago_inicial' => $pagoInicial,
            'tipo_viaje' => $tipoViaje,
            'created_at' => $fechaReserva,
            'updated_at' => $fechaReserva,
        ]);

        // Crear hospedajes
        foreach ($hospedajes as $hospedaje) {
            Hospedaje::create([
                'reserva_id' => $reserva->id,
                'tipo_habitacion_id' => $hospedaje['tipo_habitacion_id'],
                'cantidad' => $hospedaje['cantidad'],
            ]);
        }

        // Crear factura inicial
        $factura = Factura::create([
            'reserva_id' => $reserva->id,
            'tipo_pago_id' => $tipoPago->id,
            'monto_total' => $montoTotal,
            'monto_relativo' => $pagoInicial,
            'estado' => $estado === 'cancelada' ? 'cancelada' : 'pendiente',
            'checkin_id' => null,
            'cuenta_id' => null,
            'created_at' => $fechaReserva,
            'updated_at' => $fechaReserva,
        ]);

        // Crear pago inicial
        $pagoId = ($tipoPago->nombre === 'qr') ? 'QR-' . uniqid() : 
                  (($tipoPago->nombre === 'stripe') ? 'STRIPE-' . uniqid() : null);

        Pago::create([
            'factura_id' => $factura->id,
            'pago_id' => $pagoId,
            'monto' => $pagoInicial,
            'created_at' => $fechaReserva,
            'updated_at' => $fechaReserva,
        ]);

        // Crear garante si corresponde
        if ($crearGarante) {
            Garante::create([
                'reserva_id' => $reserva->id,
                'tipo_tarjeta' => ['Visa', 'MasterCard', 'Amex'][array_rand(['Visa', 'MasterCard', 'Amex'])],
                'nro_tarjeta' => Crypt::encryptString(rand(1000, 9999)),
            ]);
        }

        return $reserva;
    }

    // ✅ MEJORADO: Usar nombres reales de TipoHabitacion
    private function seleccionarHabitacionesPorPerfil($perfil)
    {
        $habitacionesPorPerfil = [
            'vip' => [
                'Suite Presidencial',      // H - Bs. 2500
                'Suite Ejecutiva',         // G - Bs. 1250
                'Habitación Luna de Miel', // I - Bs. 1100
            ],
            'frecuente' => [
                'Suite Junior',            // F - Bs. 950
                'Habitación Deluxe',       // D - Bs. 650
                'Habitación Estándar Triple', // C - Bs. 450
            ],
            'ocasional' => [
                'Habitación Estándar Simple', // A - Bs. 250
                'Habitación Estándar Doble',  // B - Bs. 350
                'Habitación Accesible',       // J - Bs. 400
            ],
            'corporativo' => [
                'Suite Ejecutiva',         // G - Bs. 1250
                'Habitación Estándar Doble', // B - Bs. 350
            ],
            'familiar' => [
                'Habitación Deluxe Familiar', // E - Bs. 850
                'Habitación Estándar Triple', // C - Bs. 450
            ],
        ];

        $nombresHabitaciones = $habitacionesPorPerfil[$perfil] ?? [
            'Habitación Estándar Doble'
        ];

        // Filtrar habitaciones que existan en la BD
        $habitacionesDisponibles = $this->tiposHabitacion
            ->whereIn('nombre', $nombresHabitaciones);

        if ($habitacionesDisponibles->isEmpty()) {
            // Fallback: cualquier habitación
            return $this->tiposHabitacion->random(1);
        }

        return $habitacionesDisponibles->random(1);
    }

    // ✅ NUEVO: Variación de precio según temporada
    private function aplicarVariacionTemporal($precioBase, $fecha)
    {
        $mes = $fecha->month;
        
        // Temporada alta (Junio-Agosto, Diciembre)
        if (in_array($mes, [6, 7, 8, 12])) {
            return $precioBase * 1.3; // +30%
        }
        
        // Temporada media (Marzo-Mayo, Septiembre-Noviembre)
        if (in_array($mes, [3, 4, 5, 9, 10, 11])) {
            return $precioBase * 1.1; // +10%
        }
        
        // Temporada baja (Enero, Febrero)
        return $precioBase * 0.9; // -10%
    }

    /**
     * Crear checkins para una reserva
     */
    private function crearCheckins($reserva)
    {
        $fechaEntrada = Carbon::parse($reserva->fecha_entrada)->addDays($this->calcularLeadTimeAleatorio());
        $fechaSalida = (clone $fechaEntrada)->addDays($reserva->dias_estadia);

        $totalAsistentes = $reserva->total_cantidad_adultos + $reserva->total_cantidad_infantes;
        
        $asistentes = $this->obtenerAsistentes($reserva, $totalAsistentes);

        $hospedajes = Hospedaje::where('reserva_id', $reserva->id)->get();
        $checkins = [];
        $recepcionista = $this->recepcionistas->random();

        foreach ($hospedajes as $hospedaje) {
            $habitaciones = HabitacionEvento::where('tipo_habitacion_id', $hospedaje->tipo_habitacion_id)
                ->where('estado', 'disponible')
                ->inRandomOrder()
                ->take($hospedaje->cantidad)
                ->get();

            foreach ($habitaciones as $habitacion) {
                if ($asistentes->isEmpty()) break;

                $clienteId = $asistentes->shift();

                $checkin = Checkin::create([
                    'reserva_id' => $reserva->id,
                    'recepcionista_id' => $recepcionista->id,
                    'cliente_id' => $clienteId,
                    'habitacion_evento_id' => $habitacion->id,
                    'fecha_entrada' => $fechaEntrada,
                    'fecha_salida' => $fechaSalida,
                    'created_at' => $fechaEntrada,
                    'updated_at' => $fechaSalida,
                ]);

                $checkins[] = $checkin;
            }
        }

        return $checkins;
    }

    private function obtenerAsistentes($reserva, $totalAsistentes)
    {
        $clientePrincipalAsiste = rand(0, 1) === 1;
        $asistentes = collect();

        if ($clientePrincipalAsiste) {
            $asistentes->push($reserva->cliente_id);
        }

        if ($reserva->tipo_viaje === 'familiar') {
            $familia = $this->familias->firstWhere('titular', $reserva->cliente_id);
            
            if ($familia) {
                $integrantesFamilia = collect($familia['integrantes'])
                    ->filter(fn($id) => $id !== $reserva->cliente_id)
                    ->take($totalAsistentes - 1);
                
                $asistentes = $asistentes->merge($integrantesFamilia);
            }
        }

        if ($asistentes->count() < $totalAsistentes) {
            $faltantes = $totalAsistentes - $asistentes->count();
            $clientesAdicionales = Cliente::whereNotIn('id', $asistentes->toArray())
                ->inRandomOrder()
                ->take($faltantes)
                ->pluck('id');
            
            $asistentes = $asistentes->merge($clientesAdicionales);
        }

        return $asistentes;
    }

    /**
     * Crear cuenta completa con transacciones, factura y pago
     */
    private function crearCuentaCompleta($checkin, $reserva, $perfil)
    {
        $fechaEntrada = Carbon::parse($checkin->fecha_entrada);
        $fechaSalida = Carbon::parse($checkin->fecha_salida);
        $diasEstadia = $fechaEntrada->diffInDays($fechaSalida);
        if ($diasEstadia < 1) $diasEstadia = 1;

        // Crear cuenta
        $cuenta = Cuenta::create([
            'checkin_id' => $checkin->id,
            'monto_total' => 0,
            'monto_pagado' => 0,
            'saldo' => 0,
            'estado' => 'pagada',
            'fecha_pago' => $fechaSalida->toDateString(),
            'created_at' => $fechaEntrada->copy()->addHours(2),
            'updated_at' => $fechaSalida->copy()->subHours(1),
        ]);

        $cantidadTransacciones = $this->calcularTransaccionesPorPerfil($perfil);
        $montoTotalConsumos = 0;

        for ($i = 0; $i < $cantidadTransacciones; $i++) {
            $esServicio = rand(0, 1);
            $servicioId = $esServicio ? $this->servicios->random()->id : null;
            $platilloId = !$esServicio ? $this->platillos->random()->id : null;

            $diaAleatorio = rand(0, $diasEstadia);
            $horaAleatoria = rand(8, 22);
            $fechaTransaccion = $fechaEntrada->copy()->addDays($diaAleatorio)->setTime($horaAleatoria, rand(0, 59));

            if ($fechaTransaccion->gt($fechaSalida)) {
                $fechaTransaccion = $fechaSalida->copy()->subHours(rand(2, 4));
            }

            $cantidad = rand(1, 2); // ⬇️ Reducido de 1-3 a 1-2

            $transaccion = Transaccion::create([
                'cuenta_id' => $cuenta->id,
                'servicio_id' => $servicioId,
                'platillo_id' => $platilloId,
                'estado' => 'confirmada',
                'cantidad' => $cantidad,
                'created_at' => $fechaTransaccion,
                'updated_at' => $fechaTransaccion->copy()->addMinutes(rand(5, 30)),
            ]);

            $precio = $esServicio ? $transaccion->servicio->precio : $transaccion->platillo->precio;
            $montoTotalConsumos += ($precio * $cantidad);
        }

        // Actualizar cuenta
        $cuenta->update([
            'monto_total' => $montoTotalConsumos,
            'monto_pagado' => $montoTotalConsumos,
        ]);

        // ✅ NUEVO: Calcular saldo pendiente de la reserva
        $facturaReserva = Factura::where('reserva_id', $reserva->id)
            ->whereNull('checkin_id')
            ->first();
        
        $saldoPendienteReserva = $facturaReserva->monto_total - $facturaReserva->monto_relativo;

        // ✅ 1️⃣ FACTURA DE CONSUMOS (servicios y platillos)
        $tipoPago = $this->tipoPagos->random();
        $fechaFacturaConsumos = $fechaSalida->copy()->subHours(2);

        $facturaConsumos = Factura::create([
            'cuenta_id' => $cuenta->id,
            'checkin_id' => $checkin->id,
            'reserva_id' => null,
            'tipo_pago_id' => $tipoPago->id,
            'monto_total' => $montoTotalConsumos,
            'monto_relativo' => $montoTotalConsumos,
            'estado' => 'pagada',
            'created_at' => $fechaFacturaConsumos,
            'updated_at' => $fechaFacturaConsumos->copy()->addMinutes(15),
        ]);

        $pagoId = ($tipoPago->nombre === 'qr') ? 'QR-' . uniqid() :
                  (($tipoPago->nombre === 'stripe') ? 'STRIPE-' . uniqid() : null);

        Pago::create([
            'factura_id' => $facturaConsumos->id,
            'pago_id' => $pagoId,
            'monto' => $montoTotalConsumos,
            'created_at' => $fechaFacturaConsumos->copy()->addMinutes(10),
            'updated_at' => $fechaFacturaConsumos->copy()->addMinutes(10),
        ]);

        // ✅ 2️⃣ FACTURA DEL SALDO PENDIENTE DE RESERVA (si hay)
        if ($saldoPendienteReserva > 0) {
            $tipoPagoSaldo = $this->tipoPagos->random();
            $fechaFacturaSaldo = $fechaSalida->copy()->subHours(1);

            $facturaSaldo = Factura::create([
                'cuenta_id' => null,
                'checkin_id' => $checkin->id,
                'reserva_id' => $reserva->id,
                'tipo_pago_id' => $tipoPagoSaldo->id,
                'monto_total' => $saldoPendienteReserva,
                'monto_relativo' => $saldoPendienteReserva,
                'estado' => 'pagada',
                'created_at' => $fechaFacturaSaldo,
                'updated_at' => $fechaFacturaSaldo->copy()->addMinutes(10),
            ]);

            $pagoIdSaldo = ($tipoPagoSaldo->nombre === 'qr') ? 'QR-' . uniqid() :
                          (($tipoPagoSaldo->nombre === 'stripe') ? 'STRIPE-' . uniqid() : null);

            Pago::create([
                'factura_id' => $facturaSaldo->id,
                'pago_id' => $pagoIdSaldo,
                'monto' => $saldoPendienteReserva,
                'created_at' => $fechaFacturaSaldo->copy()->addMinutes(5),
                'updated_at' => $fechaFacturaSaldo->copy()->addMinutes(5),
            ]);

            // Actualizar factura original de reserva
            $facturaReserva->update([
                'estado' => 'pagada',
                'updated_at' => $fechaFacturaSaldo,
            ]);
        }
    }

    // ✅ NUEVO: Transacciones según perfil
    private function calcularTransaccionesPorPerfil($perfil)
    {
        switch ($perfil) {
            case 'vip':
                return rand(15, 25);      // VIP: Muchos consumos
            case 'frecuente':
                return rand(8, 15);       // Frecuente: Consumos medios
            case 'corporativo':
                return rand(5, 10);       // Corporativo: Consumos moderados
            case 'familiar':
                return rand(10, 18);      // Familiar: Muchos consumos (familia grande)
            case 'ocasional':
                return rand(3, 8);        // Ocasional: Pocos consumos
            default:
                return rand(5, 12);
        }
    }

    private function calcularLeadTime($perfil)
    {
        switch ($perfil) {
            case 'ocasional':
                return rand(0, 14);       // ⬇️ Reducido de 0-30
            case 'frecuente':
                return rand(15, 45);      // ⬇️ Reducido de 15-60
            case 'vip':
                return rand(60, 150);     // ⬇️ Reducido de 30-180
            case 'corporativo':
                return rand(7, 30);       // ⬇️ Reducido de 10-90
            case 'familiar':
                return rand(30, 90);      // ✅ NUEVO
            default:
                return rand(0, 30);
        }
    }

    private function calcularLeadTimeAleatorio()
    {
        return rand(0, 3);                // ⬇️ Reducido de 0-5
    }

    private function calcularDiasEstadia($perfil)
    {
        switch ($perfil) {
            case 'ocasional':
                return rand(1, 2);        // ⬇️ Reducido de 1-3
            case 'frecuente':
                return rand(2, 4);        // ⬇️ Reducido de 2-7
            case 'vip':
                return rand(5, 10);       // ⬇️ Reducido de 3-14
            case 'corporativo':
                return rand(1, 3);        // ⬇️ Reducido de 1-5
            case 'familiar':
                return rand(3, 7);        // ✅ NUEVO
            default:
                return rand(1, 4);
        }
    }

    private function determinarTipoViaje($perfil)
    {
        switch ($perfil) {
            case 'ocasional':
                return 'vacaciones';
            case 'frecuente':
                $opciones = ['vacaciones', 'negocios'];
                return $opciones[array_rand($opciones)];
            case 'vip':
                return 'vacaciones';
            case 'corporativo':
                return 'negocios';
            case 'familiar':
                return 'familiar';
            default:
                return 'vacaciones';
        }
    }

    private function calcularPagoInicial($montoTotal, $estado, $perfil)
    {
        if ($estado === 'cancelada') {
            return [0, 0, false];
        }

        if ($perfil === 'vip') {
            $opcion = rand(1, 100);
            if ($opcion <= 70) {
                return [$montoTotal, 0, false];
            } else {
                return [$montoTotal * 0.5, 50, false];
            }
        }

        if ($perfil === 'corporativo') {
            return [0, 0, true];
        }

        $opcion = rand(1, 100);

        if ($opcion <= 40) {
            return [0, 0, true];
        } elseif ($opcion <= 70) {
            $porcentaje = [20, 30][array_rand([20, 30])];
            $pagoInicial = $montoTotal * ($porcentaje / 100);
            return [$pagoInicial, $porcentaje, false];
        } else {
            return [$montoTotal, 0, rand(0, 1) === 1];
        }
    }
}
