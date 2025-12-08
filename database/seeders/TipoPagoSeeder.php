<?php

namespace Database\Seeders;

use App\Models\TipoPago;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('💳 Iniciando seeder de Tipos de Pago...');

        $tiposDePago = [
            ['nombre' => 'qr', 'estado' => 'activo'],
            ['nombre' => 'efectivo', 'estado' => 'activo'],
            ['nombre' => 'stripe', 'estado' => 'activo'],
        ];

        foreach ($tiposDePago as $tipo) {
            TipoPago::firstOrCreate(['nombre' => $tipo['nombre']], $tipo);
            $this->command->info("✅ Tipo de pago '{$tipo['nombre']}' creado o ya existente.");
        }

        $this->command->info('🎉 Seeder de Tipos de Pago completado!');
    }
}
