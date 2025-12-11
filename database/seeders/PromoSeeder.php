<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promo;
use App\Models\DetallePromo;
use App\Models\Segmento;
use App\Models\TipoHabitacion;
use App\Models\Servicio;
use App\Models\Platillo;
use Carbon\Carbon;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🎁 Iniciando seeder de Promociones...');
        $this->command->newLine();

        // Obtener datos necesarios
        $segmentos = Segmento::all()->keyBy('nombre');
        $tiposHabitacion = TipoHabitacion::all()->keyBy('nombre');
        $servicios = Servicio::all()->keyBy('nombre');
        $platillos = Platillo::all()->keyBy('nombre');

        // ═══════════════════════════════════════════════════════════
        // 1️⃣ PROMOCIÓN GENERAL: Verano 2025
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Verano 2025 (30% OFF)');
        
        $verano = Promo::create([
            'nombre' => 'Verano 2025',
            'descripcion' => '30% de descuento en habitaciones estándar. Válido para estadías mínimas de 2 noches.',
            'tipo_promo' => 'descuento_porcentual',
            'descuento_porcentaje' => 30,
            'segmento_id' => null, // Para todos
            'aplica_a' => 'todos',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::now()->addDays(1),
            'fecha_fin' => Carbon::now()->addMonths(3),
            'minimo_noches' => 2,
            'minimo_personas' => 1,
            'prioridad' => 5,
            'image_url' => '/images/promos/verano-2025.jpg',
        ]);

        // Aplicar a habitaciones estándar
        foreach (['Habitación Estándar Simple', 'Habitación Estándar Doble', 'Habitación Estándar Triple'] as $nombre) {
            if ($tipo = $tiposHabitacion->get($nombre)) {
                DetallePromo::create([
                    'promo_id' => $verano->id,
                    'tipo_item' => 'habitacion',
                    'tipo_habitacion_id' => $tipo->id,
                    'cantidad' => 1,
                    'descuento_porcentaje' => 30,
                    'orden' => 1,
                ]);
            }
        }

        // ═══════════════════════════════════════════════════════════
        // 2️⃣ PROMOCIÓN VIP: Exclusivo Alto Valor
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Exclusivo VIP (Suite + Spa gratis)');
        
        $segmentoVIP = $segmentos->get('Clientes de Alto Valor');
        
        $vip = Promo::create([
            'nombre' => 'Exclusivo VIP',
            'descripcion' => 'Suite Presidencial con precio especial + Spa y Desayuno gratis. Solo para nuestros clientes VIP.',
            'tipo_promo' => 'paquete',
            'precio_total_paquete' => 1800,
            'precio_normal' => 2500,
            'segmento_id' => $segmentoVIP?->id,
            'aplica_a' => 'todos',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addYear(),
            'minimo_noches' => 1,
            'incluye_upgrade' => true,
            'prioridad' => 10,
            'image_url' => '/images/promos/vip-exclusivo.jpg',
        ]);

        // Detalle 1: Suite Presidencial
        if ($suite = $tiposHabitacion->get('Suite Presidencial')) {
            DetallePromo::create([
                'promo_id' => $vip->id,
                'tipo_item' => 'habitacion',
                'tipo_habitacion_id' => $suite->id,
                'cantidad' => 1,
                'noches' => 1,
                'precio_especial' => 1800,
                'orden' => 1,
            ]);
        }

        // Detalle 2: Spa gratis
        if ($spa = $servicios->get('Spa')) {
            DetallePromo::create([
                'promo_id' => $vip->id,
                'tipo_item' => 'servicio',
                'servicio_id' => $spa->id,
                'cantidad' => 1,
                'es_gratis' => true,
                'orden' => 2,
            ]);
        }

        // Detalle 3: Desayuno gratis
        if ($desayuno = $servicios->get('Desayuno')) {
            DetallePromo::create([
                'promo_id' => $vip->id,
                'tipo_item' => 'servicio',
                'servicio_id' => $desayuno->id,
                'cantidad' => 2,
                'es_gratis' => true,
                'orden' => 3,
            ]);
        }

        // ═══════════════════════════════════════════════════════════
        // 3️⃣ PROMOCIÓN REACTIVACIÓN: Te extrañamos
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Te extrañamos (40% OFF)');
        
        $segmentoDormidos = $segmentos->get('Clientes Inactivos');
        
        $reactivacion = Promo::create([
            'nombre' => 'Te Extrañamos',
            'descripcion' => '¡Vuelve con nosotros! 40% de descuento en tu próxima reserva + Upgrade gratis si disponible.',
            'codigo_promocional' => 'TEEXTRANAMOS2025',
            'tipo_promo' => 'descuento_porcentual',
            'descuento_porcentaje' => 40,
            'segmento_id' => $segmentoDormidos?->id,
            'aplica_a' => 'registrados',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonths(6),
            'dias_desde_ultima_visita' => 180,
            'incluye_upgrade' => true,
            'minimo_noches' => 1,
            'usos_por_cliente' => 1,
            'prioridad' => 8,
            'image_url' => '/images/promos/te-extranamos.jpg',
        ]);

        // Aplicar a todas las habitaciones
        foreach ($tiposHabitacion as $tipo) {
            DetallePromo::create([
                'promo_id' => $reactivacion->id,
                'tipo_item' => 'habitacion',
                'tipo_habitacion_id' => $tipo->id,
                'cantidad' => 1,
                'descuento_porcentaje' => 40,
                'orden' => 1,
            ]);
        }

        // ═══════════════════════════════════════════════════════════
        // 4️⃣ PAQUETE ROMÁNTICO: San Valentín
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Paquete Romántico (San Valentín)');
        
        $romantico = Promo::create([
            'nombre' => 'Paquete Luna de Miel',
            'descripcion' => 'Especial San Valentín: Habitación romántica + Cena + Champagne + Decoración especial.',
            'tipo_promo' => 'paquete',
            'precio_total_paquete' => 2500,
            'precio_normal' => 3200,
            'segmento_id' => null,
            'aplica_a' => 'todos',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::create(2025, 2, 10),
            'fecha_fin' => Carbon::create(2025, 2, 16),
            'minimo_noches' => 2,
            'minimo_personas' => 2,
            'cantidad_maxima_usos' => 20,
            'prioridad' => 9,
            'image_url' => '/images/promos/paquete-romantico.jpg',
        ]);

        // Detalle 1: Habitación Luna de Miel
        if ($lunaMiel = $tiposHabitacion->get('Habitación Luna de Miel')) {
            DetallePromo::create([
                'promo_id' => $romantico->id,
                'tipo_item' => 'habitacion',
                'tipo_habitacion_id' => $lunaMiel->id,
                'cantidad' => 1,
                'noches' => 2,
                'precio_especial' => 1800,
                'orden' => 1,
            ]);
        }

        // Detalle 2: Cena romántica
        if ($cena = $servicios->get('Cena')) {
            DetallePromo::create([
                'promo_id' => $romantico->id,
                'tipo_item' => 'servicio',
                'servicio_id' => $cena->id,
                'cantidad' => 1,
                'descuento_porcentaje' => 50,
                'orden' => 2,
            ]);
        }

        // Detalle 3: Champagne
        if ($champagne = $platillos->get('Champagne')) {
            DetallePromo::create([
                'promo_id' => $romantico->id,
                'tipo_item' => 'platillo',
                'platillo_id' => $champagne->id,
                'cantidad' => 1,
                'es_gratis' => true,
                'orden' => 3,
            ]);
        }

        // Detalle 4: Decoración romántica
        if ($decoracion = $servicios->get('Decoración')) {
            DetallePromo::create([
                'promo_id' => $romantico->id,
                'tipo_item' => 'servicio',
                'servicio_id' => $decoracion->id,
                'cantidad' => 1,
                'es_gratis' => true,
                'orden' => 4,
            ]);
        }

        // ═══════════════════════════════════════════════════════════
        // 5️⃣ EARLY BIRD: Reserva Anticipada
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Early Bird (25% OFF)');
        
        $earlyBird = Promo::create([
            'nombre' => 'Reserva Anticipada',
            'descripcion' => 'Planifica tu viaje con tiempo y ahorra 25%. Reserva con 60 días de anticipación.',
            'codigo_promocional' => 'EARLYBIRD2025',
            'tipo_promo' => 'descuento_porcentual',
            'descuento_porcentaje' => 25,
            'segmento_id' => null,
            'aplica_a' => 'todos',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addYear(),
            'dias_anticipacion_minimo' => 60,
            'minimo_noches' => 3,
            'requiere_pago_completo' => true,
            'prioridad' => 6,
            'image_url' => '/images/promos/early-bird.jpg',
        ]);

        // Aplicar a todas las habitaciones
        foreach ($tiposHabitacion as $tipo) {
            DetallePromo::create([
                'promo_id' => $earlyBird->id,
                'tipo_item' => 'habitacion',
                'tipo_habitacion_id' => $tipo->id,
                'cantidad' => 1,
                'descuento_porcentaje' => 25,
                'orden' => 1,
            ]);
        }

        // ═══════════════════════════════════════════════════════════
        // 6️⃣ CLIENTES FRECUENTES: Programa de Puntos
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Programa Lealtad (5ta noche gratis)');
        
        $segmentoLeales = $segmentos->get('Clientes Leales');
        
        $lealtad = Promo::create([
            'nombre' => 'Programa de Lealtad',
            'descripcion' => '¡Tu fidelidad tiene recompensa! En tu 5ta visita, una noche completamente gratis.',
            'tipo_promo' => 'descuento_porcentual',
            'descuento_porcentaje' => 100,
            'segmento_id' => $segmentoLeales?->id,
            'aplica_a' => 'registrados',
            'estado' => 'activa',
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addYear(),
            'minimo_noches' => 1,
            'usos_por_cliente' => 1,
            'prioridad' => 7,
            'image_url' => '/images/promos/lealtad.jpg',
        ]);

        // Aplicar a habitaciones estándar y deluxe
        foreach (['Habitación Estándar Doble', 'Habitación Deluxe', 'Habitación Deluxe Familiar'] as $nombre) {
            if ($tipo = $tiposHabitacion->get($nombre)) {
                DetallePromo::create([
                    'promo_id' => $lealtad->id,
                    'tipo_item' => 'habitacion',
                    'tipo_habitacion_id' => $tipo->id,
                    'cantidad' => 1,
                    'noches' => 1,
                    'es_gratis' => true,
                    'orden' => 1,
                ]);
            }
        }

        // ═══════════════════════════════════════════════════════════
        // 7️⃣ BLACK FRIDAY: Super Descuento
        // ═══════════════════════════════════════════════════════════
        $this->command->info('📦 Creando: Black Friday (50% OFF)');
        
        $blackFriday = Promo::create([
            'nombre' => 'Black Friday Hotel 2025',
            'descripcion' => '¡Solo por 3 días! 50% de descuento en TODAS las habitaciones. Stock limitado.',
            'codigo_promocional' => 'BLACKFRIDAY2025',
            'tipo_promo' => 'descuento_porcentual',
            'descuento_porcentaje' => 50,
            'segmento_id' => null,
            'aplica_a' => 'todos',
            'estado' => 'pausada', // Se activará en la fecha
            'fecha_inicio' => Carbon::create(2025, 11, 28),
            'fecha_fin' => Carbon::create(2025, 11, 30),
            'cantidad_maxima_usos' => 100,
            'minimo_noches' => 2,
            'requiere_pago_completo' => true,
            'prioridad' => 10,
            'image_url' => '/images/promos/black-friday.jpg',
        ]);

        // Aplicar a todas las habitaciones
        foreach ($tiposHabitacion as $tipo) {
            DetallePromo::create([
                'promo_id' => $blackFriday->id,
                'tipo_item' => 'habitacion',
                'tipo_habitacion_id' => $tipo->id,
                'cantidad' => 1,
                'descuento_porcentaje' => 50,
                'orden' => 1,
            ]);
        }

        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('   ✅ Promociones creadas: ' . Promo::count());
        $this->command->info('   ✅ Detalles creados: ' . DetallePromo::count());
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();

        $this->command->info('🎉 Seeder de Promociones completado!');
    }
}
