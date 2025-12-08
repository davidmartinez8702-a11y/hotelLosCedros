<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Cliente;
use Carbon\Carbon;
use Exception;

class UserClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('👥 Iniciando seeder de Usuarios y Clientes...');
        $this->command->newLine();

        $usersData = [
            [
                'name'               => 'Ana Gómez',
                'username'           => 'ana_gomez',
                'edad'               => 28,
                'sexo'               => 'F',
                'telefono'           => '555-1234',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'anagomez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Luis Martínez',
                'username'           => 'luis_martinez',
                'edad'               => 35,
                'sexo'               => 'M',
                'telefono'           => '555-5678',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'luismartinez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'María Pérez',
                'username'           => 'maria_perez',
                'edad'               => 22,
                'sexo'               => 'F',
                'telefono'           => '555-9012',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'mariaperez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Roberto Sánchez',
                'username'           => 'roberto_sanchez',
                'edad'               => 42,
                'sexo'               => 'M',
                'telefono'           => '555-1001',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'robertosanchez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Carmen López',
                'username'           => 'carmen_lopez',
                'edad'               => 31,
                'sexo'               => 'F',
                'telefono'           => '555-1002',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'carmenlopez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Fernando García',
                'username'           => 'fernando_garcia',
                'edad'               => 29,
                'sexo'               => 'M',
                'telefono'           => '555-1003',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'extranjero',
                'email'              => 'fernandogarcia@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Patricia Rodríguez',
                'username'           => 'patricia_rodriguez',
                'edad'               => 38,
                'sexo'               => 'F',
                'telefono'           => '555-1004',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'patriciarodriguez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Diego Hernández',
                'username'           => 'diego_hernandez',
                'edad'               => 45,
                'sexo'               => 'M',
                'telefono'           => '555-1005',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'extranjero',
                'email'              => 'diegohernandez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Lucía Torres',
                'username'           => 'lucia_torres',
                'edad'               => 26,
                'sexo'               => 'F',
                'telefono'           => '555-1006',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'luciatorres@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Andrés Vargas',
                'username'           => 'andres_vargas',
                'edad'               => 33,
                'sexo'               => 'M',
                'telefono'           => '555-1007',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'andresvargas@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Sofía Ramírez',
                'username'           => 'sofia_ramirez',
                'edad'               => 27,
                'sexo'               => 'F',
                'telefono'           => '555-1008',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'extranjero',
                'email'              => 'sofiaramirez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Miguel Castro',
                'username'           => 'miguel_castro',
                'edad'               => 50,
                'sexo'               => 'M',
                'telefono'           => '555-1009',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'miguelcastro@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Valentina Morales',
                'username'           => 'valentina_morales',
                'edad'               => 24,
                'sexo'               => 'F',
                'telefono'           => '555-1010',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'valentinamorales@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Javier Mendoza',
                'username'           => 'javier_mendoza',
                'edad'               => 36,
                'sexo'               => 'M',
                'telefono'           => '555-1011',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'extranjero',
                'email'              => 'javiermendoza@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Isabella Flores',
                'username'           => 'isabella_flores',
                'edad'               => 30,
                'sexo'               => 'F',
                'telefono'           => '555-1012',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'isabellaflores@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Ricardo Ortiz',
                'username'           => 'ricardo_ortiz',
                'edad'               => 41,
                'sexo'               => 'M',
                'telefono'           => '555-1013',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'ricardoortiz@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Camila Jiménez',
                'username'           => 'camila_jimenez',
                'edad'               => 23,
                'sexo'               => 'F',
                'telefono'           => '555-1014',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'extranjero',
                'email'              => 'camilajimenez@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
            [
                'name'               => 'Eduardo Reyes',
                'username'           => 'eduardo_reyes',
                'edad'               => 48,
                'sexo'               => 'M',
                'telefono'           => '555-1015',
                'profile_icon'       => null,
                'tipo_nacionalidad'  => 'nacional',
                'email'              => 'eduardoreyes@gmail.com',
                'email_verified_at'  => Carbon::now(),
                'password'           => Hash::make('123456789'),
                'es_cliente'         => true,
            ],
        ];

        $creados = 0;
        $yaExisten = 0;
        $errores = 0;
        $total = count($usersData);

        $this->command->info("📋 Procesando {$total} usuarios...");
        $this->command->newLine();

        foreach ($usersData as $index => $data) {
            $numero = $index + 1;
            $esCliente = $data['es_cliente'] ?? false;
            unset($data['es_cliente']);

            try {
                $userExistente = User::where('email', $data['email'])->first();

                if ($userExistente) {
                    $yaExisten++;
                    $this->command->warn("   🔄 [{$numero}/{$total}] Ya existe: {$data['name']} ({$data['email']})");
                    
                    if ($esCliente && !Cliente::find($userExistente->id)) {
                        Cliente::create(['id' => $userExistente->id]);
                        $this->command->info("      └── ✅ Cliente vinculado");
                    }
                } else {
                    $user = User::create($data);
                    $creados++;
                    $this->command->info("   ✅ [{$numero}/{$total}] Creado: {$data['name']} ({$data['email']})");

                    if ($esCliente) {
                        Cliente::create(['id' => $user->id]);
                        $this->command->info("      └── 👤 Cliente vinculado");
                    }
                }
            } catch (Exception $e) {
                $errores++;
                $this->command->error("   ❌ [{$numero}/{$total}] Error: {$data['name']} - {$e->getMessage()}");
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
        $this->command->info('🎉 Seeder de Usuarios y Clientes completado!');
    }
}