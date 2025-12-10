<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cliente;
use Faker\Factory as Faker;
use Exception;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('👥 Iniciando seeder de Clientes...');
        $this->command->newLine();

        $faker = Faker::create('es_ES');
        
        $paises = [
            'Bolivia', 'Argentina', 'Brasil', 'Chile', 'Colombia', 
            'Ecuador', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela',
            'España', 'Portugal', 'México', 'Estados Unidos', 
            'Reino Unido', 'Francia', 'Alemania', 'Italia'
        ];

        $cantidadClientes = 50; // Crear 50 clientes
        $creados = 0;
        $errores = 0;

        $this->command->info("📋 Creando {$cantidadClientes} clientes...");
        $this->command->newLine();

        for ($i = 1; $i <= $cantidadClientes; $i++) {
            try {
                $email = $faker->unique()->safeEmail();
                
                Cliente::create([
                    'nombre' => $faker->firstName(),
                    'apellido' => $faker->lastName(),
                    'email' => $email,
                    'celular' => $faker->numerify('7########'),
                    'pais' => $faker->randomElement($paises),
                    'ciudad' => $faker->city(),
                    'documento_identidad' => $faker->unique()->numerify('########'),
                    'tipo_documento' => $faker->randomElement(['CI', 'Pasaporte', 'DNI']),
                    'fecha_nacimiento' => $faker->dateTimeBetween('-60 years', '-18 years'),
                    'genero' => $faker->randomElement(['masculino', 'femenino']),
                ]);

                $creados++;
                
                if ($i % 10 === 0) {
                    $this->command->info("   ✅ Creados: {$i}/{$cantidadClientes}");
                }

            } catch (Exception $e) {
                $errores++;
                $this->command->error("   ❌ Error al crear cliente #{$i}: {$e->getMessage()}");
            }
        }

        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Clientes creados: {$creados}");
        $this->command->info("   ❌ Errores:          {$errores}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();
        $this->command->info('🎉 Seeder de Clientes completado!');
    }
}
