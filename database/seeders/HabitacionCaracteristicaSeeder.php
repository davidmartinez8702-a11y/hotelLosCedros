<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoHabitacion;
use App\Models\Caracteristica;
use App\Models\HabitacionCaracteristica;
use Exception;
use Illuminate\Support\Facades\DB;

class HabitacionCaracteristicaSeeder extends Seeder
{
    /**
     * Configuración de características por tipo de habitación
     */
    private array $caracteristicasPorTipo = [
        'Habitación Estándar Simple' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'TV por Cable',
            'Baño Privado',
            'Teléfono',
            'Secador de Pelo',
            'Artículos de Tocador',
            'Servicio de Limpieza Diario',
            'Camas Individuales',
            'No Fumadores',
        ],
        'Habitación Estándar Doble' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'TV por Cable',
            'Baño Privado',
            'Teléfono',
            'Secador de Pelo',
            'Artículos de Tocador',
            'Servicio de Limpieza Diario',
            'Minibar',
            'Cama Queen Size',
            'No Fumadores',
            'Escritorio de Trabajo',
        ],
        'Habitación Estándar Triple' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'TV por Cable',
            'Baño Privado',
            'Teléfono',
            'Secador de Pelo',
            'Artículos de Tocador',
            'Servicio de Limpieza Diario',
            'Minibar',
            'Camas Individuales',
            'Sofá Cama',
            'No Fumadores',
        ],
        'Habitación Deluxe' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Escritorio de Trabajo',
            'Teléfono',
            'Secador de Pelo',
            'Plancha y Tabla',
            'Cafetera/Tetera',
            'Albornoz y Pantuflas',
            'Amenities Premium',
            'Cama King Size',
            'Vista a la Ciudad',
            'Baño Privado',
            'Bañera',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'No Fumadores',
            'Insonorización',
        ],
        'Habitación Deluxe Familiar' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Teléfono',
            'Secador de Pelo',
            'Plancha y Tabla',
            'Cafetera/Tetera',
            'Amenities Premium',
            'Cama King Size',
            'Camas Individuales',
            'Cuna Disponible',
            'Sala de Estar',
            'Baño Privado',
            'Bañera',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'No Fumadores',
        ],
        'Suite Junior' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Escritorio de Trabajo',
            'Teléfono',
            'Secador de Pelo',
            'Plancha y Tabla',
            'Cafetera/Tetera',
            'Albornoz y Pantuflas',
            'Amenities Premium',
            'Cama King Size',
            'Vista a la Ciudad',
            'Balcón Privado',
            'Sala de Estar',
            'Baño Privado',
            'Jacuzzi Privado',
            'Ducha de Lluvia',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'Servicio de Lavandería',
            'No Fumadores',
            'Insonorización',
            'Piso Alto',
        ],
        'Suite Ejecutiva' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Escritorio de Trabajo',
            'Teléfono',
            'Secador de Pelo',
            'Plancha y Tabla',
            'Cafetera/Tetera',
            'Albornoz y Pantuflas',
            'Amenities Premium',
            'Cama King Size',
            'Vista a la Ciudad',
            'Terraza',
            'Sala de Estar',
            'Comedor',
            'Baño Privado',
            'Jacuzzi Privado',
            'Ducha de Lluvia',
            'Bañera',
            'Bidé',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'Servicio de Lavandería',
            'Servicio de Planchado',
            'Conserjería',
            'No Fumadores',
            'Insonorización',
            'Piso Alto',
            'Late Check-out',
            'Early Check-in',
        ],
        'Suite Presidencial' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Escritorio de Trabajo',
            'Teléfono',
            'Secador de Pelo',
            'Plancha y Tabla',
            'Cafetera/Tetera',
            'Albornoz y Pantuflas',
            'Amenities Premium',
            'Cama King Size',
            'Vista a la Ciudad',
            'Vista al Mar',
            'Terraza',
            'Balcón Privado',
            'Sala de Estar',
            'Comedor',
            'Cocina Equipada',
            'Baño Privado',
            'Jacuzzi Privado',
            'Bañera de Hidromasaje',
            'Ducha de Lluvia',
            'Bañera',
            'Bidé',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'Servicio de Lavandería',
            'Servicio de Planchado',
            'Conserjería',
            'Mayordomo Personal',
            'No Fumadores',
            'Insonorización',
            'Piso Alto',
            'Late Check-out',
            'Early Check-in',
            'Transfer Aeropuerto',
            'Desayuno Incluido',
        ],
        'Habitación Luna de Miel' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Calefacción',
            'Smart TV',
            'Minibar',
            'Caja Fuerte',
            'Teléfono',
            'Secador de Pelo',
            'Albornoz y Pantuflas',
            'Amenities Premium',
            'Cama King Size',
            'Vista al Jardín',
            'Balcón Privado',
            'Baño Privado',
            'Jacuzzi Privado',
            'Bañera de Hidromasaje',
            'Ducha de Lluvia',
            'Artículos de Tocador',
            'Room Service 24h',
            'Servicio de Limpieza Diario',
            'No Fumadores',
            'Insonorización',
            'Late Check-out',
            'Desayuno Incluido',
        ],
        'Habitación Accesible' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'TV por Cable',
            'Minibar',
            'Teléfono',
            'Secador de Pelo',
            'Artículos de Tocador',
            'Cama Queen Size',
            'Baño Privado',
            'Acceso para Silla de Ruedas',
            'Baño Accesible',
            'Barras de Apoyo',
            'Ducha a Nivel del Suelo',
            'Alarma Visual',
            'Servicio de Limpieza Diario',
            'No Fumadores',
        ],
        'Salón de Conferencias Pequeño' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Proyector',
            'Pantalla de Proyección',
            'Sistema de Audio',
            'Micrófono Inalámbrico',
            'Pizarra/Rotafolio',
            'Videoconferencia',
            'Catering Incluido',
        ],
        'Salón de Conferencias Mediano' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Proyector',
            'Pantalla de Proyección',
            'Sistema de Audio',
            'Micrófono Inalámbrico',
            'Pizarra/Rotafolio',
            'Videoconferencia',
            'Iluminación Profesional',
            'Catering Incluido',
        ],
        'Salón de Eventos Grande' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Proyector',
            'Pantalla de Proyección',
            'Sistema de Audio',
            'Micrófono Inalámbrico',
            'Pizarra/Rotafolio',
            'Videoconferencia',
            'Iluminación Profesional',
            'Escenario',
            'Catering Incluido',
            'Decoración Personalizada',
        ],
        'Salón de Banquetes' => [
            'WiFi Gratuito',
            'Aire Acondicionado',
            'Sistema de Audio',
            'Micrófono Inalámbrico',
            'Iluminación Profesional',
            'Catering Incluido',
            'Decoración Personalizada',
        ],
        'Terraza para Eventos' => [
            'WiFi Gratuito',
            'Sistema de Audio',
            'Micrófono Inalámbrico',
            'Iluminación Profesional',
            'Catering Incluido',
            'Decoración Personalizada',
            'Vista a la Ciudad',
            'Vista al Jardín',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🔗 Iniciando seeder de Habitación-Características...');
        $this->command->newLine();

        $tiposHabitacion = TipoHabitacion::all();
        $caracteristicas = Caracteristica::all();

        if ($tiposHabitacion->isEmpty()) {
            $this->command->error('❌ No se encontraron tipos de habitación. Ejecute primero TipoHabitacionSeeder.');
            return;
        }

        if ($caracteristicas->isEmpty()) {
            $this->command->error('❌ No se encontraron características. Ejecute primero CaracteristicaSeeder.');
            return;
        }

        $this->command->info("📋 Encontrados {$tiposHabitacion->count()} tipos de habitación");
        $this->command->info("📋 Encontradas {$caracteristicas->count()} características");
        $this->command->newLine();

        // Crear mapa de características por nombre => id
        $caracteristicasMap = $caracteristicas->pluck('id', 'nombre')->toArray();

        $creados = 0;
        $yaExisten = 0;
        $noEncontradas = 0;
        $errores = 0;

        foreach ($tiposHabitacion as $tipo) {
            $caracteristicasDelTipo = $this->caracteristicasPorTipo[$tipo->nombre] ?? [];

            if (empty($caracteristicasDelTipo)) {
                $this->command->warn("   ⚠️  Sin configuración para: {$tipo->nombre}");
                continue;
            }

            $this->command->info("📦 Procesando: {$tipo->nombre} (" . count($caracteristicasDelTipo) . " características)");

            foreach ($caracteristicasDelTipo as $nombreCaracteristica) {
                try {
                    DB::beginTransaction();
                    $caracteristicaId = $caracteristicasMap[$nombreCaracteristica] ?? null;

                    if (!$caracteristicaId) {
                        $noEncontradas++;
                        $this->command->warn("      ⚠️  No encontrada: {$nombreCaracteristica}");
                        continue;
                    }

                    // Verificar si ya existe usando el modelo
                    $existe = HabitacionCaracteristica::where('tipo_habitacion_id', $tipo->id)
                        ->where('caracteristica_id', $caracteristicaId)
                        ->exists();

                    if ($existe) {
                        $yaExisten++;
                        $this->command->line("      🔄 Ya existe: {$nombreCaracteristica}");
                    } else {
                        HabitacionCaracteristica::create([
                            'tipo_habitacion_id' => $tipo->id,
                            'caracteristica_id' => $caracteristicaId,
                        ]);
                        $creados++;
                        $this->command->info("      ✅ Vinculado: {$nombreCaracteristica}");
                    }
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    $errores++;
                    $this->command->error("      ❌ Error: {$nombreCaracteristica} - {$e->getMessage()}");
                }
            }

            $this->command->newLine();
        }

        // Resumen
        $total = $creados + $yaExisten;
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Creados:         {$creados}");
        $this->command->info("   🔄 Ya existían:     {$yaExisten}");
        $this->command->info("   ⚠️  No encontradas: {$noEncontradas}");
        $this->command->info("   ❌ Errores:         {$errores}");
        $this->command->info("   📦 Total:           {$total}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Habitación-Características completado!');
    }
}
