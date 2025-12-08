<?php

namespace Database\Seeders;

use App\Models\Checkin;
use App\Models\Cuenta;
use App\Models\Factura;
use App\Models\Pago;
use App\Models\Reserva;
use App\Models\Servicio;
use App\Models\Platillo;
use App\Models\Transaccion;
use App\Models\TipoPago;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CuentaSeeder extends Seeder
{


    public function run(): void
    {
        $this->command->info('💳 Iniciando seeder de Cuentas, Transacciones, Facturas y Pagos...');
        $this->command->newLine();

        // Verificar reservas
        $reservas = Reserva::whereIn('estado', ['confirmada', 'pendiente'])->get();
        $this->command->info("📋 Reservas encontradas: {$reservas->count()}");

        // Verificar servicios
        $servicios = Servicio::where('estado', 'activo')->get();
        $this->command->info("🛎️ Servicios disponibles: {$servicios->count()}");

        // Verificar platillos
        $platillos = Platillo::where('estado', 'disponible')->get();
        $this->command->info("🍽️ Platillos disponibles: {$platillos->count()}");

        // Verificar tipos de pago
        $tiposPago = TipoPago::where('estado', 'activo')->get();
        $this->command->info("💳 Tipos de pago disponibles: {$tiposPago->count()}");

        // Validar datos iniciales
        if ($reservas->isEmpty()) {
            $this->command->error('❌ No hay reservas disponibles para procesar.');
            return;
        }

        if ($tiposPago->isEmpty()) {
            $this->command->error('❌ No hay tipos de pago disponibles en la base de datos.');
            return;
        }

        $cuentasCreadas = 0;

        foreach ($reservas as $reserva) {
            $this->command->info("🔍 Procesando reserva ID: {$reserva->id}");

            #            DB::beginTransaction();

            try {
                // Verificar check-ins asociados a la reserva
                $checkins = Checkin::where('reserva_id', $reserva->id)->get();
                $this->command->info("🔎 Check-ins encontrados para la reserva {$reserva->id}: {$checkins->count()}");

                if ($checkins->isEmpty()) {
                    $this->command->error("⚠️ No se encontraron check-ins para la reserva {$reserva->id}.");
                    continue;
                }

                $cantidadCuentas = rand(1, $checkins->count());
                $checkinsSeleccionados = $checkins->random($cantidadCuentas);

                foreach ($checkinsSeleccionados as $checkin) {
                    $this->command->info("📝 Creando cuenta para check-in ID: {$checkin->id}");

                    // Obtener la fecha de entrada del check-in
                    $fechaEntrada = Carbon::parse($checkin->fecha_entrada);

                    // Fecha de salida (puede ser null si aún no ha salido)
                    $fechaSalida = $checkin->fecha_salida
                        ? Carbon::parse($checkin->fecha_salida)
                        : Carbon::now();

                    // Crear cuenta con fecha basada en la entrada
                    $cuenta = Cuenta::create([
                        'checkin_id' => $checkin->id,
                        'monto_total' => 0,
                        'monto_pagado' => 0,
                        'saldo' => 0,
                        'estado' => 'pagada',
                        'fecha_pago' => $fechaSalida->toDateString(),
                        'created_at' => $fechaEntrada->copy()->addHours(rand(1, 3)),
                        'updated_at' => $fechaSalida->copy()->subHours(rand(1, 2)),
                    ]);

                    $this->command->info("✅ Cuenta creada con ID: {$cuenta->id}");

                    if ($servicios->isEmpty() && $platillos->isEmpty()) {
                        $this->command->error("❌ No hay servicios ni platillos disponibles para generar transacciones.");
                        continue;
                    }

                    $cantidadTransacciones = rand(10, 20);
                    $montoTotal = 0;

                    // Calcular días de estadía
                    $diasEstadia = $fechaEntrada->diffInDays($fechaSalida);
                    if ($diasEstadia < 1) $diasEstadia = 1;

                    for ($i = 0; $i < $cantidadTransacciones; $i++) {
                        $esServicio = rand(0, 1); // 0: Platillo, 1: Servicio
                        $servicioId = $esServicio ? $servicios->random()->id : null;
                        $platilloId = !$esServicio ? $platillos->random()->id : null;

                        if ($servicioId === null && $platilloId === null) {
                            $this->command->error("❌ No se pudo generar una transacción válida para la cuenta {$cuenta->id}.");
                            continue;
                        }

                        // Generar fecha aleatoria entre la entrada y la salida
                        $diaAleatorio = rand(0, $diasEstadia);
                        $horaAleatoria = rand(8, 22); // Entre 8 AM y 10 PM
                        $minutoAleatorio = rand(0, 59);

                        $fechaTransaccion = $fechaEntrada->copy()
                            ->addDays($diaAleatorio)
                            ->setTime($horaAleatoria, $minutoAleatorio);

                        // Asegurar que no sea después de la salida
                        if ($fechaTransaccion->gt($fechaSalida)) {
                            $fechaTransaccion = $fechaSalida->copy()->subHours(rand(1, 4));
                        }

                        $transaccion = Transaccion::create([
                            'cuenta_id' => $cuenta->id,
                            'servicio_id' => $servicioId,
                            'platillo_id' => $platilloId,
                            'estado' => 'confirmada',
                            'cantidad' => rand(1, 3),
                            'created_at' => $fechaTransaccion,
                            'updated_at' => $fechaTransaccion->copy()->addMinutes(rand(5, 30)),
                        ]);

                        $precio = $esServicio
                            ? $transaccion->servicio->precio
                            : $transaccion->platillo->precio;
                        $montoTotal += $precio * $transaccion->cantidad;

                        $this->command->info("💰 Transacción creada el {$fechaTransaccion->format('Y-m-d H:i')} para cuenta {$cuenta->id}, monto acumulado: {$montoTotal}");
                    }

                    $cuenta->update([
                        'monto_total' => $montoTotal,
                        'monto_pagado' => $montoTotal,
                    ]);

                    $this->command->info("💳 Cuenta actualizada con monto total: {$montoTotal}");

                    $tipoPago = $tiposPago->random();

                    // Fecha de factura: cerca del check-out
                    $fechaFactura = $fechaSalida->copy()->subHours(rand(1, 3));

                    $factura = Factura::create([
                        'cuenta_id' => $cuenta->id,
                        'checkin_id' => null,
                        'reserva_id' => null,
                        'tipo_pago_id' => $tipoPago->id,
                        'monto_total' => $cuenta->monto_total,
                        'monto_relativo' => $cuenta->monto_pagado,
                        'estado' => 'pagada',
                        'created_at' => $fechaFactura,
                        'updated_at' => $fechaFactura->copy()->addMinutes(rand(10, 30)),
                    ]);

                    $this->command->info("🧾 Factura creada el {$fechaFactura->format('Y-m-d H:i')} con ID: {$factura->id}");

                    $pagoId = null;
                    if (in_array($tipoPago->nombre, ['qr', 'stripe'])) {
                        $pagoId = strtoupper($tipoPago->nombre) . '-' . uniqid();
                    }

                    // Fecha de pago: justo después de la factura
                    $fechaPago = $fechaFactura->copy()->addMinutes(rand(5, 20));

                    Pago::create([
                        'factura_id' => $factura->id,
                        'pago_id' => $pagoId,
                        'monto' => $cuenta->monto_pagado,
                        'created_at' => $fechaPago,
                        'updated_at' => $fechaPago,
                    ]);

                    $this->command->info("💵 Pago registrado el {$fechaPago->format('Y-m-d H:i')} para factura {$factura->id}");
                }

                $fecha_salida = Carbon::now()->toDateString();
                $checkin->update(['fecha_salida' => $fecha_salida]);
                $cuentasCreadas += $checkinsSeleccionados->count();
                #  DB::commit();
                $this->command->info("✅ Cuentas creadas para reserva {$reserva->id}: {$checkinsSeleccionados->count()}");
            } catch (Exception $e) {
                #  DB::rollBack();
                $this->command->error("❌ Error al crear cuentas para reserva {$reserva->id}: {$e->getMessage()}");
                $this->command->error($e->getTraceAsString());
            }
        }

        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info("   ✅ Cuentas creadas: {$cuentasCreadas}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Cuentas completado!');
    }
}
