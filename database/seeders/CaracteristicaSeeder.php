<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Caracteristica;
use Exception;

class CaracteristicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🏷️ Iniciando seeder de Características...');
        $this->command->newLine();

        $caracteristicas = [
            // Servicios de Habitación
            ['nombre' => 'WiFi Gratuito', 'estado' => 'activo'],
            ['nombre' => 'Aire Acondicionado', 'estado' => 'activo'],
            ['nombre' => 'Calefacción', 'estado' => 'activo'],
            ['nombre' => 'TV por Cable', 'estado' => 'activo'],
            ['nombre' => 'Smart TV', 'estado' => 'activo'],
            ['nombre' => 'Minibar', 'estado' => 'activo'],
            ['nombre' => 'Caja Fuerte', 'estado' => 'activo'],
            ['nombre' => 'Escritorio de Trabajo', 'estado' => 'activo'],
            ['nombre' => 'Teléfono', 'estado' => 'activo'],
            ['nombre' => 'Secador de Pelo', 'estado' => 'activo'],
            ['nombre' => 'Plancha y Tabla', 'estado' => 'activo'],
            ['nombre' => 'Cafetera/Tetera', 'estado' => 'activo'],
            ['nombre' => 'Albornoz y Pantuflas', 'estado' => 'activo'],
            ['nombre' => 'Amenities Premium', 'estado' => 'activo'],
            
            // Tipos de Cama
            ['nombre' => 'Cama King Size', 'estado' => 'activo'],
            ['nombre' => 'Cama Queen Size', 'estado' => 'activo'],
            ['nombre' => 'Camas Individuales', 'estado' => 'activo'],
            ['nombre' => 'Sofá Cama', 'estado' => 'activo'],
            ['nombre' => 'Cuna Disponible', 'estado' => 'activo'],
            
            // Vistas
            ['nombre' => 'Vista al Mar', 'estado' => 'activo'],
            ['nombre' => 'Vista a la Montaña', 'estado' => 'activo'],
            ['nombre' => 'Vista a la Ciudad', 'estado' => 'activo'],
            ['nombre' => 'Vista al Jardín', 'estado' => 'activo'],
            ['nombre' => 'Vista a la Piscina', 'estado' => 'activo'],
            
            // Espacios Adicionales
            ['nombre' => 'Balcón Privado', 'estado' => 'activo'],
            ['nombre' => 'Terraza', 'estado' => 'activo'],
            ['nombre' => 'Sala de Estar', 'estado' => 'activo'],
            ['nombre' => 'Comedor', 'estado' => 'activo'],
            ['nombre' => 'Cocina Equipada', 'estado' => 'activo'],
            ['nombre' => 'Jacuzzi Privado', 'estado' => 'activo'],
            ['nombre' => 'Bañera de Hidromasaje', 'estado' => 'activo'],
            
            // Baño
            ['nombre' => 'Baño Privado', 'estado' => 'activo'],
            ['nombre' => 'Ducha de Lluvia', 'estado' => 'activo'],
            ['nombre' => 'Bañera', 'estado' => 'activo'],
            ['nombre' => 'Bidé', 'estado' => 'activo'],
            ['nombre' => 'Artículos de Tocador', 'estado' => 'activo'],
            
            // Servicios del Hotel
            ['nombre' => 'Room Service 24h', 'estado' => 'activo'],
            ['nombre' => 'Servicio de Limpieza Diario', 'estado' => 'activo'],
            ['nombre' => 'Servicio de Lavandería', 'estado' => 'activo'],
            ['nombre' => 'Servicio de Planchado', 'estado' => 'activo'],
            ['nombre' => 'Recepción 24h', 'estado' => 'activo'],
            ['nombre' => 'Conserjería', 'estado' => 'activo'],
            ['nombre' => 'Servicio de Despertador', 'estado' => 'activo'],
            ['nombre' => 'Mayordomo Personal', 'estado' => 'activo'],
            
            // Accesibilidad
            ['nombre' => 'Acceso para Silla de Ruedas', 'estado' => 'activo'],
            ['nombre' => 'Baño Accesible', 'estado' => 'activo'],
            ['nombre' => 'Barras de Apoyo', 'estado' => 'activo'],
            ['nombre' => 'Ducha a Nivel del Suelo', 'estado' => 'activo'],
            ['nombre' => 'Alarma Visual', 'estado' => 'activo'],
            
            // Instalaciones del Hotel
            ['nombre' => 'Piscina', 'estado' => 'activo'],
            ['nombre' => 'Gimnasio', 'estado' => 'activo'],
            ['nombre' => 'Spa', 'estado' => 'activo'],
            ['nombre' => 'Sauna', 'estado' => 'activo'],
            ['nombre' => 'Restaurante', 'estado' => 'activo'],
            ['nombre' => 'Bar/Lounge', 'estado' => 'activo'],
            ['nombre' => 'Salón de Eventos', 'estado' => 'activo'],
            ['nombre' => 'Centro de Negocios', 'estado' => 'activo'],
            ['nombre' => 'Estacionamiento Gratuito', 'estado' => 'activo'],
            ['nombre' => 'Estacionamiento con Valet', 'estado' => 'activo'],
            
            // Para Eventos
            ['nombre' => 'Proyector', 'estado' => 'activo'],
            ['nombre' => 'Pantalla de Proyección', 'estado' => 'activo'],
            ['nombre' => 'Sistema de Audio', 'estado' => 'activo'],
            ['nombre' => 'Micrófono Inalámbrico', 'estado' => 'activo'],
            ['nombre' => 'Pizarra/Rotafolio', 'estado' => 'activo'],
            ['nombre' => 'Videoconferencia', 'estado' => 'activo'],
            ['nombre' => 'Iluminación Profesional', 'estado' => 'activo'],
            ['nombre' => 'Escenario', 'estado' => 'activo'],
            ['nombre' => 'Catering Incluido', 'estado' => 'activo'],
            ['nombre' => 'Decoración Personalizada', 'estado' => 'activo'],
            
            // Extras
            ['nombre' => 'Mascotas Permitidas', 'estado' => 'activo'],
            ['nombre' => 'No Fumadores', 'estado' => 'activo'],
            ['nombre' => 'Piso Alto', 'estado' => 'activo'],
            ['nombre' => 'Insonorización', 'estado' => 'activo'],
            ['nombre' => 'Desayuno Incluido', 'estado' => 'activo'],
            ['nombre' => 'Transfer Aeropuerto', 'estado' => 'activo'],
            ['nombre' => 'Late Check-out', 'estado' => 'activo'],
            ['nombre' => 'Early Check-in', 'estado' => 'activo'],
        ];

        $creados = 0;
        $yaExisten = 0;
        $errores = 0;
        $total = count($caracteristicas);

        $this->command->info("📋 Procesando {$total} características...");
        $this->command->newLine();

        foreach ($caracteristicas as $index => $data) {
            $numero = $index + 1;

            try {
                $existe = Caracteristica::where('nombre', $data['nombre'])->exists();

                if ($existe) {
                    $yaExisten++;
                    $this->command->warn("   🔄 [{$numero}/{$total}] Ya existe: {$data['nombre']}");
                } else {
                    Caracteristica::create($data);
                    $creados++;
                    $this->command->info("   ✅ [{$numero}/{$total}] Creado: {$data['nombre']}");
                }

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

        // Estadísticas por categoría
        $this->mostrarEstadisticas();

        $this->command->info('🎉 Seeder de Características completado!');
    }

    /**
     * Muestra estadísticas de las características
     */
    private function mostrarEstadisticas(): void
    {
        $this->command->info('📈 ESTADÍSTICAS:');
        $this->command->info('───────────────────────────────────────────────────');
        
        $totalActivas = Caracteristica::where('estado', 'activo')->count();
        $totalInactivas = Caracteristica::where('estado', 'inactivo')->count();
        $total = Caracteristica::count();
        
        $this->command->info("   🟢 Activas:   {$totalActivas}");
        $this->command->info("   🔴 Inactivas: {$totalInactivas}");
        $this->command->info("   📦 Total:     {$total}");
        $this->command->info('───────────────────────────────────────────────────');
        $this->command->newLine();
    }
}
