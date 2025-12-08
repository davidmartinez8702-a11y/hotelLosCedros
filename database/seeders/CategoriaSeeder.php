<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Exception;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('📂 Iniciando seeder de Categorías...');
        $this->command->newLine();

        $categorias = [
            // Categorías para Habitaciones
            [
                'nombre' => 'Estándar',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Deluxe',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Suite',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Familiar',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Matrimonial',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Ejecutiva',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Presidencial',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Accesible',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Salón de Eventos',
                'tipo' => 'habitacion',
                'estado' => 'activo',
            ],

            // Categorías para Platillos
            [
                'nombre' => 'Desayuno',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Almuerzo',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Cena',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Entradas',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Platos Fuertes',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Postres',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Bebidas',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Bebidas Alcohólicas',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Snacks',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Menú Infantil',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Menú Vegetariano',
                'tipo' => 'platillo',
                'estado' => 'activo',
            ],

            // Categorías para Servicios
            [
                'nombre' => 'Spa',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Gimnasio',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Lavandería',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Room Service',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Transporte',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Estacionamiento',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Piscina',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Sauna',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Masajes',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Niñera',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Tours',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Alquiler de Equipos',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Business Center',
                'tipo' => 'servicio',
                'estado' => 'activo',
            ],
        ];

        $creados = 0;
        $yaExisten = 0;
        $errores = 0;
        $total = count($categorias);

        $this->command->info("📋 Procesando {$total} categorías...");
        $this->command->newLine();

        // Agrupar por tipo para mostrar
        $porTipo = ['habitacion' => [], 'platillo' => [], 'servicio' => []];

        foreach ($categorias as $index => $data) {
            $numero = $index + 1;

            try {
                $existe = Categoria::where('nombre', $data['nombre'])
                    ->where('tipo', $data['tipo'])
                    ->exists();

                if ($existe) {
                    $yaExisten++;
                    $this->command->warn("   🔄 [{$numero}/{$total}] Ya existe: {$data['nombre']} ({$data['tipo']})");
                } else {
                    Categoria::create($data);
                    $creados++;
                    $emoji = $this->getEmojiPorTipo($data['tipo']);
                    $this->command->info("   ✅ [{$numero}/{$total}] Creado: {$emoji} {$data['nombre']} ({$data['tipo']})");
                }

                $porTipo[$data['tipo']][] = $data['nombre'];

            } catch (Exception $e) {
                $errores++;
                $this->command->error("   ❌ [{$numero}/{$total}] Error: {$data['nombre']} - {$e->getMessage()}");
            }
        }

        // Resumen
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Creados:      {$creados}");
        $this->command->info("   🔄 Ya existían:  {$yaExisten}");
        $this->command->info("   ❌ Errores:      {$errores}");
        $this->command->info("   📦 Total:        {$total}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();

        // Estadísticas por tipo
        $this->mostrarEstadisticas();

        $this->command->info('🎉 Seeder de Categorías completado!');
    }

    /**
     * Obtiene emoji según el tipo de categoría
     */
    private function getEmojiPorTipo(string $tipo): string
    {
        return match($tipo) {
            'habitacion' => '🛏️',
            'platillo' => '🍽️',
            'servicio' => '🛎️',
            default => '📁',
        };
    }

    /**
     * Muestra estadísticas de las categorías
     */
    private function mostrarEstadisticas(): void
    {
        $this->command->info('📈 CATEGORÍAS POR TIPO:');
        $this->command->info('───────────────────────────────────────────────────');

        $tipos = ['habitacion', 'platillo', 'servicio'];

        foreach ($tipos as $tipo) {
            $cantidad = Categoria::where('tipo', $tipo)->count();
            $emoji = $this->getEmojiPorTipo($tipo);
            $barra = str_repeat('█', $cantidad);
            $this->command->info("   {$emoji} " . ucfirst($tipo) . ": {$cantidad} {$barra}");
        }

        $total = Categoria::count();
        $this->command->info('───────────────────────────────────────────────────');
        $this->command->info("   📦 Total: {$total}");
        $this->command->newLine();
    }
}
