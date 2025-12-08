<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HabitacionEvento;
use App\Models\TipoHabitacion;
use Exception;
use Illuminate\Support\Facades\Log;

class HabitacionEventoSeeder extends Seeder
{
    /**
     * Configuración fija de cantidad por tipo de habitación
     * Esto garantiza idempotencia (mismo resultado en cada ejecución)
     */
    private array $cantidadPorTipo = [
        'Habitación Estándar Simple' => 4,
        'Habitación Estándar Doble' => 4,
        'Habitación Estándar Triple' => 3,
        'Habitación Deluxe' => 3,
        'Habitación Deluxe Familiar' => 2,
        'Suite Junior' => 2,
        'Suite Ejecutiva' => 2,
        'Suite Presidencial' => 1,
        'Habitación Luna de Miel' => 2,
        'Habitación Accesible' => 2,
        'Salón de Conferencias Pequeño' => 2,
        'Salón de Conferencias Mediano' => 2,
        'Salón de Eventos Grande' => 1,
        'Salón de Banquetes' => 1,
        'Terraza para Eventos' => 1,
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏠 Iniciando seeder de Habitaciones y Eventos...');
        $this->command->newLine();

        $tiposHabitacion = TipoHabitacion::all();

        if ($tiposHabitacion->isEmpty()) {
            $this->command->error('❌ No se encontraron tipos de habitación. Ejecute primero TipoHabitacionSeeder.');
            Log::error('HabitacionEventoSeeder: No hay tipos de habitación disponibles');
            return;
        }

        $this->command->info("📋 Encontrados {$tiposHabitacion->count()} tipos de habitación/evento");
        $this->command->newLine();

        $creados = 0;
        $actualizados = 0;
        $contadorGlobal = 1;

        foreach ($tiposHabitacion as $tipo) {
            // Cantidad fija desde configuración (default 2 si no está definido)
            $cantidadHabitaciones = $this->cantidadPorTipo[$tipo->nombre] ?? 2;
            
            $this->command->info("📦 Procesando: {$tipo->nombre} ({$cantidadHabitaciones} unidades)");

            for ($i = 1; $i <= $cantidadHabitaciones; $i++) {
                $prefijo = $tipo->tipo === 'habitacion' ? 'HAB' : 'EVT';
                $codigo = "{$prefijo}-{$tipo->id}-{$i}";

                try {
                    $habitacionExistente = HabitacionEvento::where('codigo', $codigo)->first();

                    if ($habitacionExistente) {
                        // Ya existe, NO actualizar estado (mantener el actual)
                        $actualizados++;
                        $this->command->warn("      🔄 [{$contadorGlobal}] Ya existe: {$codigo} - {$tipo->nombre} [{$habitacionExistente->estado}]");
                    } else {
                        // No existe, crear con estado aleatorio
                        $estado = $this->getEstadoAleatorio();
                        HabitacionEvento::create([
                            'codigo' => $codigo,
                            'tipo_habitacion_id' => $tipo->id,
                            'nombre' => $tipo->nombre,
                            'estado' => $estado,
                        ]);
                        $creados++;
                        $this->command->info("      ✅ [{$contadorGlobal}] Creado: {$codigo} - {$tipo->nombre} [{$estado}]");
                    }

                    $contadorGlobal++;

                } catch (Exception $e) {
                    $this->command->error("      ❌ Error en {$codigo}: {$e->getMessage()}");
                }
            }

            $this->command->newLine();
        }

        // Resumen
        $total = $creados + $actualizados;
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Creados:      {$creados}");
        $this->command->info("   🔄 Ya existían: {$actualizados}");
        $this->command->info("   📦 Total:       {$total}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder completado!');
    }

    /**
     * Genera un estado aleatorio
     */
    private function getEstadoAleatorio(): string
    {
        $estados = ['activo','inactivo', 'limpieza', 'mantenimiento'];
        return $estados[array_rand($estados)];
    }
}
