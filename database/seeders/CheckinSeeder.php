<?php

namespace Database\Seeders;

use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Checkin;
use App\Models\Reserva;
use App\Models\Recepcionista;
use App\Models\HabitacionEvento;
use App\Models\Hospedaje;
use App\Models\Cliente;
use Carbon\Carbon;

class CheckinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏨 Iniciando seeder de Check-ins...');
        $this->command->newLine();

        $reservas = Reserva::whereIn('estado', ['confirmada', 'pendiente'])->get();
        $recepcionistas = Recepcionista::all();

        if ($reservas->isEmpty() || $recepcionistas->isEmpty()) {
            $this->command->error('❌ Faltan datos necesarios (reservas o recepcionistas).');
            return;
        }

        $this->command->info("📋 Reservas encontradas: {$reservas->count()}");
        $this->command->info("👤 Recepcionistas encontrados: {$recepcionistas->count()}");
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

                // Validar fechas
                if ($fechaSalida <= $fechaEntrada) {
                    $this->command->error("❌ Fechas inválidas para la reserva {$reserva->id}.");
                    continue; // Pasar a la siguiente reserva
                }

                // Determinar la cantidad de asistentes (aleatorio entre 1 y el total registrado en la reserva)
                $totalAsistentes = rand(1, $reserva->total_cantidad_adultos + $reserva->total_cantidad_infantes);

                // Decidir aleatoriamente si el cliente principal asiste
                $clientePrincipalAsiste = rand(0, 1) === 1;

                // Obtener los clientes registrados en la reserva
                $clientesRegistrados = collect();
                if ($clientePrincipalAsiste) {
                    $clientesRegistrados->push($reserva->cliente_id); // Incluir al cliente principal si asiste
                }
                $clientesAdicionales = Cliente::inRandomOrder()
                    ->take($reserva->total_cantidad_adultos + $reserva->total_cantidad_infantes - 1)
                    ->pluck('id');
                $clientesRegistrados = $clientesRegistrados->merge($clientesAdicionales);

                // Seleccionar aleatoriamente a los asistentes
                $asistentes = $clientesRegistrados->random($totalAsistentes);

                // Obtener hospedajes asociados a la reserva
                $hospedajes = Hospedaje::where('reserva_id', $reserva->id)->get();

                if ($hospedajes->isEmpty()) {
                    $this->command->error("❌ No hay hospedajes asociados a la reserva {$reserva->id}.");
                    continue; // Pasar a la siguiente reserva
                }

                // Crear check-ins para los asistentes seleccionados
                $checkins = [];
                foreach ($hospedajes as $hospedaje) {
                    // Validar cantidad de habitaciones en el hospedaje
                    if ($hospedaje->cantidad <= 0) {
                        $this->command->error("❌ La cantidad de habitaciones en el hospedaje de la reserva {$reserva->id} no es válida.");
                        continue; // Pasar al siguiente hospedaje
                    }

                    // Obtener habitaciones disponibles para el tipo de habitación reservado
                    $habitaciones = HabitacionEvento::where('tipo_habitacion_id', $hospedaje->tipo_habitacion_id)
                        ->where('estado', 'disponible')
                        ->take($hospedaje->cantidad)
                        ->get();

                    if ($habitaciones->isEmpty()) {
                        $this->command->error("❌ No hay habitaciones disponibles para el tipo de habitación reservado en la reserva {$reserva->id}.");
                        continue; // Pasar al siguiente hospedaje
                    }

                    foreach ($habitaciones as $habitacion) {
                        // Determinar cuántas personas caben en esta habitación
                        $capacidadHabitacion = $hospedaje->cantidad; // Número de personas que caben en esta habitación
                        $personasEnHabitacion = min($capacidadHabitacion, $asistentes->count());

                        for ($i = 0; $i < $personasEnHabitacion; $i++) {
                            if ($asistentes->isEmpty()) {
                                break 2; // Salir si ya se han creado todos los check-ins necesarios
                            }

                            // Seleccionar un cliente aleatorio de los asistentes
                            $clienteId = $asistentes->random();

                            $checkins[] = Checkin::create([
                                'reserva_id' => $reserva->id,
                                'recepcionista_id' => $recepcionista->id,
                                'cliente_id' => $clienteId, // Asociar al cliente seleccionado
                                'habitacion_evento_id' => $habitacion->id,
                                'fecha_entrada' => $fechaEntrada,
                                'fecha_salida' => null, // Se actualizará en el check-out
                            ]);
                        }
                    }
                }

                $checkinsCreados += count($checkins);
                DB::commit();
                $this->command->info("✅ Check-ins creados para reserva {$reserva->id}: " . count($checkins));
            } catch (Exception $e) {
                DB::rollBack();
                $this->command->error("❌ Error al crear check-ins para reserva {$reserva->id}: {$e->getMessage()}");
            }
        }

        // Resumen
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info("   ✅ Check-ins creados: {$checkinsCreados}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Check-ins completado!');
    }
}