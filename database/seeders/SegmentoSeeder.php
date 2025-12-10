<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Segmento;
use Exception;

class SegmentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🎯 Iniciando seeder de Segmentos...');
        $this->command->newLine();

        $segmentos = [
            [
                'nombre' => 'Cliente VIP',
                'descripcion' => 'Clientes de alto valor con gasto promedio superior a Bs. 2000, alta frecuencia de visitas y preferencia por habitaciones premium.',
                'color' => '#FFD700', // Dorado
                'activo' => true,
            ],
            [
                'nombre' => 'Cliente Premium',
                'descripcion' => 'Clientes con gasto promedio entre Bs. 1000-2000, buena frecuencia de visitas y solicitudes especiales frecuentes.',
                'color' => '#C0C0C0', // Plateado
                'activo' => true,
            ],
            [
                'nombre' => 'Cliente Frecuente',
                'descripcion' => 'Clientes regulares con gasto promedio de Bs. 500-1000 y visitas periódicas al hotel.',
                'color' => '#87CEEB', // Azul cielo
                'activo' => true,
            ],
            [
                'nombre' => 'Cliente Ocasional',
                'descripcion' => 'Clientes con visitas esporádicas, gasto promedio menor a Bs. 500 y baja anticipación en reservas.',
                'color' => '#90EE90', // Verde claro
                'activo' => true,
            ],
            [
                'nombre' => 'Cliente Corporativo',
                'descripcion' => 'Clientes de negocios con reservas frecuentes de corta duración y preferencia por servicios ejecutivos.',
                'color' => '#4169E1', // Azul real
                'activo' => true,
            ],
            [
                'nombre' => 'Cliente Familiar',
                'descripcion' => 'Clientes que viajan en familia, reservan habitaciones múltiples y estadías más largas.',
                'color' => '#FF69B4', // Rosa
                'activo' => true,
            ],
        ];

        $creados = 0;
        $actualizados = 0;
        $errores = 0;

        foreach ($segmentos as $segmento) {
            try {
                $existe = Segmento::where('nombre', $segmento['nombre'])->exists();

                Segmento::updateOrCreate(
                    ['nombre' => $segmento['nombre']],
                    $segmento
                );

                if ($existe) {
                    $actualizados++;
                    $this->command->warn("   🔄 Actualizado: {$segmento['nombre']}");
                } else {
                    $creados++;
                    $this->command->info("   ✅ Creado: {$segmento['nombre']}");
                }

            } catch (Exception $e) {
                $errores++;
                $this->command->error("   ❌ Error: {$segmento['nombre']} - {$e->getMessage()}");
            }
        }

        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Segmentos creados:      {$creados}");
        $this->command->info("   🔄 Segmentos actualizados: {$actualizados}");
        $this->command->info("   ❌ Errores:                {$errores}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Segmentos completado!');
    }
}
