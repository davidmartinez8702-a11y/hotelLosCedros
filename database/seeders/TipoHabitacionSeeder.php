<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TipoHabitacion;
use App\Models\Categoria;
use Illuminate\Support\Facades\Log;
use Exception;

class TipoHabitacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏨 Iniciando seeder de Tipos de Habitación...');
        $this->command->newLine();

        // Verificar que existan categorías
        $categorias = Categoria::where('tipo', 'habitacion')->get();

        if ($categorias->isEmpty()) {
            $this->command->error('❌ No se encontraron categorías de habitación. Ejecute primero CategoriaSeeder.');
            return;
        }

        $this->command->info("📋 Encontradas {$categorias->count()} categorías de habitación");
        $this->command->newLine();

        // Crear mapa de categorías por nombre
        $categoriasMap = $categorias->pluck('id', 'nombre')->toArray();

        $tiposHabitacion = [
            // Habitaciones Estándar
            [
                'categoria' => 'Estándar',
                'nombre' => 'Habitación Estándar Simple',
                'descripcion' => 'Habitación acogedora con una cama individual, ideal para viajeros solitarios. Incluye baño privado, TV, WiFi y escritorio.',
                'estado' => 'activo',
                'capacidad_adultos' => 1,
                'capacidad_infantes' => 0,
                'capacidad_total' => 1,
                'precio' => 250.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Estándar',
                'nombre' => 'Habitación Estándar Doble',
                'descripcion' => 'Habitación confortable con cama matrimonial o dos camas individuales. Perfecta para parejas o amigos. Incluye baño privado, TV, WiFi y minibar.',
                'estado' => 'activo',
                'capacidad_adultos' => 2,
                'capacidad_infantes' => 1,
                'capacidad_total' => 3,
                'precio' => 350.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Estándar',
                'nombre' => 'Habitación Estándar Triple',
                'descripcion' => 'Habitación espaciosa con tres camas o una cama matrimonial y una individual. Ideal para familias pequeñas o grupos de amigos.',
                'estado' => 'activo',
                'capacidad_adultos' => 3,
                'capacidad_infantes' => 1,
                'capacidad_total' => 4,
                'precio' => 450.00,
                'tipo' => 'habitacion',
            ],

            // Habitaciones Deluxe
            [
                'categoria' => 'Deluxe',
                'nombre' => 'Habitación Deluxe',
                'descripcion' => 'Habitación premium con cama king size, sala de estar, baño de lujo con bañera, TV de pantalla grande, minibar premium y vista panorámica.',
                'estado' => 'activo',
                'capacidad_adultos' => 2,
                'capacidad_infantes' => 2,
                'capacidad_total' => 4,
                'precio' => 650.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Familiar',
                'nombre' => 'Habitación Deluxe Familiar',
                'descripcion' => 'Habitación amplia con dos habitaciones conectadas, ideal para familias. Incluye cama king y dos camas individuales, dos baños y sala de estar.',
                'estado' => 'activo',
                'capacidad_adultos' => 4,
                'capacidad_infantes' => 2,
                'capacidad_total' => 6,
                'precio' => 850.00,
                'tipo' => 'habitacion',
            ],

            // Suites
            [
                'categoria' => 'Suite',
                'nombre' => 'Suite Junior',
                'descripcion' => 'Suite elegante con dormitorio separado, sala de estar, baño de lujo con jacuzzi, balcón privado, minibar premium y servicio de habitación 24/7.',
                'estado' => 'activo',
                'capacidad_adultos' => 2,
                'capacidad_infantes' => 2,
                'capacidad_total' => 4,
                'precio' => 950.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Ejecutiva',
                'nombre' => 'Suite Ejecutiva',
                'descripcion' => 'Suite de lujo con dormitorio principal, sala de estar, comedor, oficina equipada, dos baños completos, terraza privada y acceso al lounge ejecutivo.',
                'estado' => 'activo',
                'capacidad_adultos' => 3,
                'capacidad_infantes' => 2,
                'capacidad_total' => 5,
                'precio' => 1250.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Presidencial',
                'nombre' => 'Suite Presidencial',
                'descripcion' => 'La suite más exclusiva del hotel. Incluye dos dormitorios principales, sala de estar de lujo, comedor para 8 personas, cocina completa, tres baños de mármol, jacuzzi, terraza panorámica y mayordomo personal.',
                'estado' => 'activo',
                'capacidad_adultos' => 4,
                'capacidad_infantes' => 3,
                'capacidad_total' => 7,
                'precio' => 2500.00,
                'tipo' => 'habitacion',
            ],

            // Habitaciones Especiales
            [
                'categoria' => 'Matrimonial',
                'nombre' => 'Habitación Luna de Miel',
                'descripcion' => 'Habitación romántica con cama king size, decoración especial, jacuzzi privado, champagne de cortesía, pétalos de rosa y vista al jardín.',
                'estado' => 'activo',
                'capacidad_adultos' => 2,
                'capacidad_infantes' => 0,
                'capacidad_total' => 2,
                'precio' => 1100.00,
                'tipo' => 'habitacion',
            ],
            [
                'categoria' => 'Accesible',
                'nombre' => 'Habitación Accesible',
                'descripcion' => 'Habitación adaptada para personas con movilidad reducida. Incluye baño accesible, cama ajustable, puertas amplias y sistema de emergencia.',
                'estado' => 'activo',
                'capacidad_adultos' => 2,
                'capacidad_infantes' => 1,
                'capacidad_total' => 3,
                'precio' => 400.00,
                'tipo' => 'habitacion',
            ],

            // Espacios para Eventos
            [
                'categoria' => 'Salón de Eventos',
                'nombre' => 'Salón de Conferencias Pequeño',
                'descripcion' => 'Sala equipada para reuniones de hasta 20 personas. Incluye proyector, pantalla, pizarra, WiFi de alta velocidad y servicio de café.',
                'estado' => 'activo',
                'capacidad_adultos' => 20,
                'capacidad_infantes' => 0,
                'capacidad_total' => 20,
                'precio' => 500.00,
                'tipo' => 'evento',
            ],
            [
                'categoria' => 'Salón de Eventos',
                'nombre' => 'Salón de Conferencias Mediano',
                'descripcion' => 'Sala versátil para eventos de hasta 50 personas. Incluye sistema de audio/video completo, iluminación profesional, WiFi y servicio de catering.',
                'estado' => 'activo',
                'capacidad_adultos' => 50,
                'capacidad_infantes' => 0,
                'capacidad_total' => 50,
                'precio' => 1200.00,
                'tipo' => 'evento',
            ],
            [
                'categoria' => 'Salón de Eventos',
                'nombre' => 'Salón de Eventos Grande',
                'descripcion' => 'Salón principal para bodas, conferencias y eventos corporativos de hasta 200 personas. Incluye escenario, sistema de sonido profesional, iluminación LED, cocina de servicio y área de recepción.',
                'estado' => 'activo',
                'capacidad_adultos' => 200,
                'capacidad_infantes' => 0,
                'capacidad_total' => 200,
                'precio' => 3500.00,
                'tipo' => 'evento',
            ],
            [
                'categoria' => 'Salón de Eventos',
                'nombre' => 'Salón de Banquetes',
                'descripcion' => 'Elegante salón para cenas de gala y eventos sociales de hasta 150 personas. Incluye mesas redondas, sillas chiavari, mantelería de lujo, iluminación ambiental y servicio de catering premium.',
                'estado' => 'activo',
                'capacidad_adultos' => 150,
                'capacidad_infantes' => 0,
                'capacidad_total' => 150,
                'precio' => 2800.00,
                'tipo' => 'evento',
            ],
            [
                'categoria' => 'Salón de Eventos',
                'nombre' => 'Terraza para Eventos',
                'descripcion' => 'Espacio al aire libre con vista panorámica para eventos de hasta 80 personas. Incluye carpas, mobiliario, iluminación decorativa y sistema de sonido.',
                'estado' => 'activo',
                'capacidad_adultos' => 80,
                'capacidad_infantes' => 0,
                'capacidad_total' => 80,
                'precio' => 1800.00,
                'tipo' => 'evento',
            ],
        ];

        $creados = 0;
        $actualizados = 0;
        $errores = 0;
        $total = count($tiposHabitacion);

        $this->command->info("📋 Procesando {$total} tipos de habitación/evento...");
        $this->command->newLine();

        foreach ($tiposHabitacion as $index => $tipo) {
            $numero = $index + 1;
            $categoriaNombre = $tipo['categoria'];
            unset($tipo['categoria']);

            try {
                // Obtener categoria_id
                $categoriaId = $categoriasMap[$categoriaNombre] ?? null;

                if (!$categoriaId) {
                    $errores++;
                    $this->command->error("   ❌ [{$numero}/{$total}] Categoría no encontrada: {$categoriaNombre} para {$tipo['nombre']}");
                    continue;
                }

                $tipo['categoria_id'] = $categoriaId;

                $existe = TipoHabitacion::where('nombre', $tipo['nombre'])->exists();

                $tipoHabitacion = TipoHabitacion::updateOrCreate(
                    ['nombre' => $tipo['nombre']],
                    $tipo
                );

                if ($existe) {
                    $actualizados++;
                    $this->command->warn("   🔄 [{$numero}/{$total}] Actualizado: {$tipo['nombre']} → {$categoriaNombre}");
                } else {
                    $creados++;
                    $this->command->info("   ✅ [{$numero}/{$total}] Creado: {$tipo['nombre']} → {$categoriaNombre}");
                }

                Log::info("TipoHabitacionSeeder: " . ($existe ? "Actualizado" : "Creado"), [
                    'id' => $tipoHabitacion->id,
                    'nombre' => $tipo['nombre'],
                    'categoria' => $categoriaNombre,
                    'tipo' => $tipo['tipo'],
                    'precio' => $tipo['precio']
                ]);

            } catch (Exception $e) {
                $errores++;
                $this->command->error("   ❌ [{$numero}/{$total}] Error: {$tipo['nombre']} - {$e->getMessage()}");
            }
        }

        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN DEL SEEDER');
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info("   ✅ Tipos creados:      {$creados}");
        $this->command->info("   🔄 Tipos actualizados: {$actualizados}");
        $this->command->info("   ❌ Errores:            {$errores}");
        $this->command->info("   📦 Total procesados:   {$total}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();

        // Estadísticas por categoría
        $this->mostrarEstadisticas();

        $this->command->info('🎉 Seeder de Tipos de Habitación completado!');
    }

    /**
     * Muestra estadísticas por categoría
     */
    private function mostrarEstadisticas(): void
    {
        $this->command->info('📈 TIPOS POR CATEGORÍA:');
        $this->command->info('───────────────────────────────────────────────────');

        $categorias = Categoria::where('tipo', 'habitacion')
            ->withCount('tipoHabitaciones')
            ->get();

        foreach ($categorias as $categoria) {
            $cantidad = $categoria->tipo_habitaciones_count;
            $barra = str_repeat('█', $cantidad);
            $this->command->info("   🏷️  {$categoria->nombre}: {$cantidad} {$barra}");
        }

        $this->command->info('───────────────────────────────────────────────────');
        $this->command->newLine();
    }
}
