<?php

namespace Database\Seeders;

use App\Models\Checkin;
use App\Models\Cliente;
use App\Models\Cuenta;
use App\Models\Factura;
use App\Models\HabitacionEvento;
use App\Models\Hospedaje;
use App\Models\Pago;
use App\Models\Platillo;
use App\Models\Recepcionista;
use App\Models\Reserva;
use App\Models\Servicio;
use App\Models\Transaccion;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FullCheckinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏨 Iniciando seeder de Check-ins y Check-outs...');
        $this->command->newLine();

        $reservas = Reserva::whereIn('estado', ['confirmada', 'pendiente'])->get();
        $recepcionistas = Recepcionista::all();
        $servicios = Servicio::where('estado', 'activo')->get();
        $platillos = Platillo::where('estado', 'activo')->get();

        if ($reservas->isEmpty() || $recepcionistas->isEmpty()) {
            $this->command->error('❌ Faltan datos necesarios (reservas, recepcionistas, servicios o platillos).');
            return;
        }

        $this->command->info("📋 Reservas encontradas: {$reservas->count()}");
        $this->command->info("👤 Recepcionistas encontrados: {$recepcionistas->count()}");
        $this->command->info("🛎️ Servicios disponibles: {$servicios->count()}");
        $this->command->info("🍽️ Platillos disponibles: {$platillos->count()}");
        $this->command->newLine();

        $checkinsCreados = 0;

        foreach ($reservas as $reserva) {
            DB::beginTransaction();

            try {
                // Seleccionar recepcionista
                $recepcionista = $recepcionistas->random();

                // Generar fechas de entrada y salida
                $fechaEntrada = Carbon::parse($reserva->fecha_reserva)->addDays(rand(0, 5));
                $fechaSalida = (clone $fechaEntrada)->addDays($reserva->dias_estadia);

                // Obtener hospedajes asociados a la reserva
                $hospedajes = Hospedaje::where('reserva_id', $reserva->id)->get();
                $checkins = [];
                $clientes = collect();

                // Decidir si el cliente que hizo la reserva estará presente
                if (rand(0, 1) === 1) {
                    $clientes->push($reserva->cliente_id);
                }

                // Crear check-ins para cada cliente en las habitaciones asignadas
                foreach ($hospedajes as $hospedaje) {
                    $habitaciones = HabitacionEvento::where('tipo_habitacion_id', $hospedaje->tipo_habitacion_id)
                        ->where('estado', 'activo')
                        ->take($hospedaje->cantidad)
                        ->get();

                    foreach ($habitaciones as $habitacion) {
                        for ($i = 0; $i < $hospedaje->cantidad; $i++) {
                            $clienteId = $clientes->random(); // Seleccionar cliente aleatorio
                            $checkins[] = Checkin::create([
                                'reserva_id' => $reserva->id,
                                'recepcionista_id' => $recepcionista->id,
                                'cliente_id' => $clienteId,
                                'habitacion_evento_id' => $habitacion->id,
                                'fecha_entrada' => $fechaEntrada,
                                'fecha_salida' => null, // Se actualizará en el check-out
                            ]);
                        }
                    }
                }

                // Decidir si crear una o varias cuentas
                $crearVariasCuentas = rand(0, 1); // 0: Una cuenta, 1: Varias cuentas
                $cuentas = [];

                if ($crearVariasCuentas === 0) {
                    // Crear una sola cuenta para toda la reserva
                    $cuentas[] = Cuenta::create([
                        'checkin_id' => $checkins[0]->id,
                        'monto_total' => $reserva->monto_total,
                        'monto_pagado' => $reserva->monto_total,
                        'saldo' => 0,
                        'estado' => 'pagada',
                    ]);
                } else {
                    // Crear una cuenta para cada check-in
                    foreach ($checkins as $checkin) {
                        $cuentas[] = Cuenta::create([
                            'checkin_id' => $checkin->id,
                            'monto_total' => $reserva->monto_total ,
                            'monto_pagado' => $reserva->monto_total ,
                            'saldo' => 0,
                            'estado' => 'pagada',
                        ]);
                    }
                }

                // Crear transacciones para cada cuenta
                foreach ($cuentas as $cuenta) {
                    $cantidadTransacciones = rand(1, 5);
                    for ($i = 0; $i < $cantidadTransacciones; $i++) {
                        $esServicio = rand(0, 1); // 0: Platillo, 1: Servicio
                        Transaccion::create([
                            'cuenta_id' => $cuenta->id,
                            'servicio_id' => $esServicio ? $servicios->random()->id : null,
                            'platillo_id' => !$esServicio ? $platillos->random()->id : null,
                            'estado' => 'confirmada',
                            'cantidad' => rand(1, 3),
                        ]);
                    }

                    // Generar factura para la cuenta
                    $tipoPago = $reserva->factura->tipo_pago_id;
                    $factura = Factura::create([
                        'cuenta_id' => $cuenta->id,
                        'checkin_id' => null,
                        'reserva_id' => null,
                        'tipo_pago_id' => $tipoPago,
                        'monto_total' => $cuenta->monto_total,
                        'monto_relativo' => $cuenta->monto_pagado,
                        'estado' => 'pagada',
                    ]);

                    // Crear el pago asociado a la factura
                    $pagoId = null;
                    if ($tipoPago == 'qr' || $tipoPago == 'stripe') {
                        $pagoId = strtoupper($tipoPago) . '-' . uniqid();
                    }

                    Pago::create([
                        'factura_id' => $factura->id,
                        'pago_id' => $pagoId,
                        'monto' => $cuenta->monto_pagado,
                    ]);
                }

                // Actualizar fecha de salida en los check-ins
                foreach ($checkins as $checkin) {
                    $checkin->update(['fecha_salida' => $fechaSalida]);
                }

                $checkinsCreados++;
                DB::commit();
                $this->command->info("✅ Check-in creado para reserva {$reserva->id} con check-out registrado.");
            } catch (Exception $e) {
                DB::rollBack();
                $this->command->error("❌ Error al crear check-in para reserva {$reserva->id}: {$e->getMessage()}");
            }
        }

        // Resumen
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info("   ✅ Check-ins creados: {$checkinsCreados}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Check-ins y Check-outs completado!');
    }
}
