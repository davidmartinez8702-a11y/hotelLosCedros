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
     * Pisos disponibles en el hotel
     */
    private array $pisos = ['1', '2', '3', '4', '5', 'PB'];

    /**
     * Alas/Secciones del hotel
     */
    private array $alas = ['Torre Norte', 'Torre Sur', 'Ala Este', 'Ala Oeste', 'Edificio Principal'];

    /**
     * Tipos de vista
     */
    private array $vistas = ['Mar', 'Jardín', 'Ciudad', 'Montaña', 'Piscina', 'Interior'];

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
                // ✅ Generar código más legible
                $prefijo = $tipo->tipo === 'habitacion' ? '' : 'S';
                $numeroHabitacion = str_pad($contadorGlobal, 3, '0', STR_PAD_LEFT);
                $codigo = $prefijo ? "{$prefijo}-{$numeroHabitacion}" : $numeroHabitacion;

                try {
                    $habitacionExistente = HabitacionEvento::where('codigo', $codigo)->first();

                    if ($habitacionExistente) {
                        // Ya existe, NO actualizar (mantener datos actuales)
                        $actualizados++;
                        $this->command->warn("      🔄 [{$contadorGlobal}] Ya existe: {$codigo} - {$tipo->nombre} [{$habitacionExistente->estado}]");
                    } else {
                        // ✅ Crear con todos los nuevos campos
                        $esHabitacion = $tipo->tipo === 'habitacion';
                        
                        $data = [
                            'codigo' => $codigo,
                            'tipo_habitacion_id' => $tipo->id,
                            'nombre' => $tipo->nombre, // ✅ Heredar nombre del tipo
                            'estado' => $this->getEstadoAleatorio(),
                        ];

                        // ✅ Solo agregar ubicación física para habitaciones (no salones)
                        if ($esHabitacion) {
                            $data['piso'] = $this->pisos[array_rand($this->pisos)];
                            $data['ala_seccion'] = $this->alas[array_rand($this->alas)];
                            $data['vista'] = $this->vistas[array_rand($this->vistas)];
                        } else {
                            // Salones están en ubicaciones específicas
                            $data['piso'] = 'PB';
                            $data['ala_seccion'] = 'Edificio Principal';
                            $data['vista'] = null;
                        }

                        // ✅ Notas internas aleatorias (10% probabilidad)
                        if (rand(1, 10) === 1) {
                            $data['notas_internas'] = $this->getNotaAleatoria();
                            $data['requiere_mantenimiento'] = rand(0, 1) === 1;
                        }

                        // ✅ Última limpieza (80% tiene registro)
                        if (rand(1, 10) <= 8) {
                            $data['ultima_limpieza'] = now()->subDays(rand(0, 7));
                        }

                        HabitacionEvento::create($data);
                        $creados++;
                        
                        $ubicacion = $esHabitacion 
                            ? "Piso {$data['piso']} - {$data['ala_seccion']} - Vista {$data['vista']}"
                            : "Salón en {$data['ala_seccion']}";
                        
                        $this->command->info("      ✅ [{$contadorGlobal}] Creado: {$codigo} - {$tipo->nombre} [{$data['estado']}]");
                        $this->command->line("         📍 {$ubicacion}");
                    }

                    $contadorGlobal++;

                } catch (Exception $e) {
                    $this->command->error("      ❌ Error en {$codigo}: {$e->getMessage()}");
                    Log::error("Error creando habitación {$codigo}", [
                        'mensaje' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
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
     * Genera un estado aleatorio con distribución realista
     */
    private function getEstadoAleatorio(): string
    {
        $estadosConPeso = [
            'disponible' => 50,      // 50% disponibles
            'ocupada' => 25,         // 25% ocupadas
            'limpieza' => 15,        // 15% en limpieza
            'mantenimiento' => 5,    // 5% mantenimiento
            'bloqueada' => 3,        // 3% bloqueadas
            'fuera_de_servicio' => 2 // 2% fuera de servicio
        ];

        $total = array_sum($estadosConPeso);
        $rand = rand(1, $total);
        $acumulado = 0;

        foreach ($estadosConPeso as $estado => $peso) {
            $acumulado += $peso;
            if ($rand <= $acumulado) {
                return $estado;
            }
        }

        return 'disponible'; // fallback
    }

    /**
     * Genera notas internas aleatorias
     */
    private function getNotaAleatoria(): string
    {
        $notas = [
            'Aire acondicionado revisado el ' . now()->subDays(rand(1, 30))->format('Y-m-d'),
            'Cliente VIP solicitó almohadas extra',
            'Minibar requiere reabastecimiento',
            'TV con control remoto nuevo',
            'Solicitar revisión de ducha',
            'Cambiar cortinas próximamente',
            'Cliente alérgico a plumas - usar almohadas sintéticas',
            'Grifo con ligera fuga - revisar',
            'Puerta requiere ajuste de cerradura',
            'Última fumigación: ' . now()->subDays(rand(30, 90))->format('Y-m-d'),
        ];

        return $notas[array_rand($notas)];
    }
}
