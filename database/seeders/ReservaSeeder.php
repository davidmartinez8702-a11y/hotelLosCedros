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
use Carbon\Carbon;
use Exception;

class ReservaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('📅 Iniciando seeder de Reservas...');
        $this->command->newLine();

        $clientes = Cliente::all();
        $tiposHabitacion = TipoHabitacion::all();
        $tipoPagos = TipoPago::whereIn('nombre', ['qr', 'efectivo', 'stripe'])->get();

        if ($clientes->isEmpty() || $tiposHabitacion->isEmpty() || $tipoPagos->isEmpty()) {
            $this->command->error('❌ Faltan datos necesarios (clientes, tipos de habitación o tipos de pago).');
            return;
        }

        $this->command->info("👥 Clientes encontrados: {$clientes->count()}");
        $this->command->info("🏨 Tipos de habitación/evento encontrados: {$tiposHabitacion->count()}");
        $this->command->info("💳 Tipos de pago encontrados: {$tipoPagos->count()}");
        $this->command->newLine();

        $reservasCreadas = 0;

        foreach ($clientes as $cliente) {
            $reservasPorCliente = rand(10, 20); // Crear entre 10 y 20 reservas por cliente

            for ($i = 0; $i < $reservasPorCliente; $i++) {
                DB::beginTransaction(); // Iniciar transacción

                try {
                    // Generar datos aleatorios para la reserva
                    $tipoReserva = ['habitacion', 'evento'][array_rand(['habitacion', 'evento'])];
                    $fechaReserva = Carbon::create(rand(2023, 2025), rand(1, 12), rand(1, 28));
                    $diasEstadia = rand(1, 15);
                    $cantidadAdultos = rand(1, 4);
                    $cantidadInfantes = $tipoReserva === 'habitacion' ? rand(0, 2) : 0;

                    // Seleccionar tipos de habitación/evento aleatorios
                    $tiposSeleccionados = $tiposHabitacion->random(rand(1, 3));
                    $montoTotal = 0;

                    // Crear hospedajes asociados y calcular el monto total
                    $hospedajes = [];
                    foreach ($tiposSeleccionados as $tipo) {
                        $cantidad = rand(1, 3);
                        $montoTotal += $tipo->precio * $cantidad;

                        $hospedajes[] = [
                            'tipo_habitacion_id' => $tipo->id,
                            'cantidad' => $cantidad,
                        ];
                    }
                    $montoTotal = $montoTotal * $diasEstadia;
                    // Generar pago inicial random
                    $pagoInicialRandom = rand(0, $montoTotal);

                    // Lógica para calcular porcentaje y decidir si se crea un garante
                    $porcentajeDescuento = 0; // Por defecto
                    $crearGarante = false; // Por defecto

                    if ($pagoInicialRandom === 0) {
                        // Caso 1: Pago inicial es 0
                        $porcentajeDescuento = 0;
                        $crearGarante = true; // Obligatorio crear garante
                    } elseif ($pagoInicialRandom === $montoTotal) {
                        // Caso 2: Pago inicial es igual al monto total
                        $porcentajeDescuento = 0;
                        $crearGarante = rand(0, 1) === 1; // Opcional crear garante
                    } else {
                        // Caso 3: Pago inicial es menor al monto total
                        $porcentajeDescuento = rand(10, 30); // Generar porcentaje aleatorio (10%, 20%, 30%)
                        $pagoInicialRandom = $montoTotal * ($porcentajeDescuento / 100); // Calcular pago inicial
                    }

                    // Crear la reserva
                    $reserva = Reserva::create([
                        'cliente_id' => $cliente->id,
                        'promo_id' => null, // Sin promoción por defecto
                        'total_cantidad_adultos' => $cantidadAdultos,
                        'total_cantidad_infantes' => $cantidadInfantes,
                        'fecha_reserva' => $fechaReserva,
                        'dias_estadia' => $diasEstadia,
                        'estado' => ['pendiente', 'confirmada', 'cancelada'][array_rand(['pendiente', 'confirmada', 'cancelada'])],
                        'tipo_reserva' => $tipoReserva,
                        'porcentaje_descuento' => $porcentajeDescuento,
                        'monto_total' => $montoTotal,
                        'pago_inicial' => $pagoInicialRandom,
                        'tipo_viaje' => ['negocios', 'vacaciones', 'familiar'][array_rand(['negocios', 'vacaciones', 'familiar'])],
                    ]);

                    // Asociar hospedajes a la reserva
                    foreach ($hospedajes as $hospedaje) {
                        Hospedaje::create([
                            'reserva_id' => $reserva->id,
                            'tipo_habitacion_id' => $hospedaje['tipo_habitacion_id'],
                            'cantidad' => $hospedaje['cantidad'],
                        ]);
                    }

                    // Crear factura
                    $tipoPago = $tipoPagos->random();
                    $factura = Factura::create([
                        'reserva_id' => $reserva->id,
                        'tipo_pago_id' => $tipoPago->id,
                        'monto_total' => $montoTotal,
                        'monto_relativo' => $pagoInicialRandom,
                        'estado' => 'pendiente',
                        'checkin_id' => null,
                        'cuenta_id' => null,
                    ]);

                    // Crear pago
                    Pago::create([
                        'factura_id' => $factura->id,
                        'pago_id' => $tipoPago->nombre === 'qr' ? 'QR-' . uniqid() : null,
                        'monto' => $pagoInicialRandom,
                    ]);

                    // Crear garante si corresponde
                    if ($crearGarante) {
                        Garante::create([
                            'reserva_id' => $reserva->id,
                            'tipo_tarjeta' => ['Visa', 'MasterCard', 'Amex'][array_rand(['Visa', 'MasterCard', 'Amex'])],
                            'nro_tarjeta' => Crypt::encryptString('1234'), // Número de tarjeta encriptado
                        ]);
                        $this->command->info("      🔒 Garante creado para la reserva {$reserva->id}");
                    }

                    DB::commit(); // Confirmar transacción
                    $reservasCreadas++;
                    $this->command->info("✅ Reserva creada para cliente {$cliente->id} con factura {$factura->id}");
                } catch (Exception $e) {
                    DB::rollBack(); // Revertir transacción en caso de error
                    $this->command->error("❌ Error al crear reserva para cliente {$cliente->id}: {$e->getMessage()}");
                }
            }
        }

        // Resumen
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Reservas creadas: {$reservasCreadas}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Reservas completado!');
    }
}