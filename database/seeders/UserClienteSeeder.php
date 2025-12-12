<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Segmento;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Exception;

class UserClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('👥 Iniciando seeder de Usuarios-Clientes...');
        $this->command->newLine();

        // PARTE 1: Usuarios específicos (algunos SÍ son clientes, otros NO)
        $this->crearUsuariosEspecificos();

        // PARTE 2: Usuarios masivos (TODOS son clientes)
        $this->generarUsuariosClientesMasivos();

        $this->command->newLine();
        $this->command->info('🎉 Seeder de Usuarios y Clientes completado!');
    }

    /**
     * Crear usuarios específicos (testing/staff)
     * ✅ Algunos son clientes, otros NO (admins, recepcionistas)
     */
    private function crearUsuariosEspecificos(): void
    {
        $this->command->info('📋 Verificando usuarios específicos (VIP/Testing/Staff)...');
        $this->command->newLine();

        $usersData = [
            // ============================
            // CLIENTES (SÍ tienen registro en tabla clientes)
            // ============================
            [
                'name' => 'Ana Gómez',
                'username' => 'ana_gomez',
                'edad' => 28,
                'sexo' => 'F',
                'telefono' => '555-1234',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'anagomez@gmail.com',
                'password' => Hash::make('123456789'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => true, // ✅ SÍ es cliente
            ],
            [
                'name' => 'Luis Martínez',
                'username' => 'luis_martinez',
                'edad' => 35,
                'sexo' => 'M',
                'telefono' => '555-5678',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'luismartinez@gmail.com',
                'password' => Hash::make('123456789'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => true, // ✅ SÍ es cliente
            ],
            [
                'name' => 'María Pérez',
                'username' => 'maria_perez',
                'edad' => 22,
                'sexo' => 'F',
                'telefono' => '555-9012',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'mariaperez@gmail.com',
                'password' => Hash::make('123456789'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => true, // ✅ SÍ es cliente
            ],
            [
                'name' => 'Roberto Sánchez',
                'username' => 'roberto_sanchez',
                'edad' => 42,
                'sexo' => 'M',
                'telefono' => '555-1001',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'robertosanchez@gmail.com',
                'password' => Hash::make('123456789'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => true, // ✅ SÍ es cliente
            ],

            // ============================
            // STAFF (NO son clientes, solo usuarios)
            // ============================
            [
                'name' => 'Admin Principal',
                'username' => 'admin',
                'edad' => 35,
                'sexo' => 'M',
                'telefono' => '555-0000',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'admin@hotel.com',
                'password' => Hash::make('admin123'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => false, // ❌ NO es cliente (es admin)
            ],
            [
                'name' => 'Recepcionista Principal',
                'username' => 'recepcion',
                'edad' => 28,
                'sexo' => 'F',
                'telefono' => '555-0001',
                'tipo_nacionalidad' => 'nacional',
                'email' => 'recepcion@hotel.com',
                'password' => Hash::make('recepcion123'),
                'email_verified_at' => Carbon::now(),
                'es_cliente' => false, // ❌ NO es cliente (es staff)
            ],
        ];

        $creados = 0;
        $yaExisten = 0;

        foreach ($usersData as $data) {
            $esCliente = $data['es_cliente'] ?? false;
            unset($data['es_cliente']);

            try {
                $userExistente = User::where('email', $data['email'])->first();

                if ($userExistente) {
                    $yaExisten++;
                    $tipoUsuario = $esCliente ? '👤 Cliente' : '👨‍💼 Staff';
                    $this->command->warn("   🔄 Ya existe: {$data['name']} ({$tipoUsuario})");
                    
                    // ✅ Si debe ser cliente pero no tiene registro, crearlo
                    if ($esCliente && !Cliente::find($userExistente->id)) {
                        Cliente::create(['id' => $userExistente->id]);
                        $this->command->info("      └── ✅ Cliente vinculado");
                    }
                } else {
                    // Crear nuevo usuario
                    $user = User::create($data);
                    $creados++;
                    $tipoUsuario = $esCliente ? '👤 Cliente' : '👨‍💼 Staff';
                    $this->command->info("   ✅ Creado: {$data['name']} ({$tipoUsuario})");

                    // ✅ Solo crear cliente si corresponde
                    if ($esCliente) {
                        Cliente::create(['id' => $user->id]);
                        $this->command->info("      └── 👤 Registro en tabla clientes");
                    }
                }
            } catch (Exception $e) {
                $this->command->error("   ❌ Error: {$data['name']} - {$e->getMessage()}");
            }
        }

        $this->command->info("   📦 Específicos: {$creados} creados, {$yaExisten} ya existían");
        $this->command->newLine();
    }

    /**
     * Generar usuarios-clientes masivos (TODOS son clientes)
     */
    private function generarUsuariosClientesMasivos(): void
    {
        $faker = Faker::create('es_ES');
        
        // ✅ CONFIGURACIÓN: 2000 usuarios-clientes nuevos
        $cantidadUsuarios = 2000;
        $batchSize = 500;
        $creados = 0;
        $errores = 0;

        $this->command->info("📋 Generando {$cantidadUsuarios} usuarios-clientes masivos...");
        $this->command->info("   ℹ️  Los segmentos se asignarán automáticamente por el sistema");
        $this->command->newLine();

        // Datos bolivianos realistas
        $nombresBolivianos = [
            'Juan', 'María', 'José', 'Carlos', 'Luis', 'Ana', 'Pedro', 'Rosa',
            'Jorge', 'Carmen', 'Miguel', 'Isabel', 'Roberto', 'Patricia', 'Daniel',
            'Gabriela', 'Fernando', 'Laura', 'Ricardo', 'Silvia', 'Andrés', 'Claudia',
            'Diego', 'Marcela', 'Gustavo', 'Daniela', 'Sergio', 'Verónica', 'Pablo', 'Andrea',
            'Javier', 'Lucía', 'Raúl', 'Elena', 'Alejandro', 'Sofía', 'Manuel', 'Carolina'
        ];

        $apellidosBolivianos = [
            'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez',
            'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales',
            'Gutiérrez', 'Ortiz', 'Romero', 'Vargas', 'Castro', 'Jiménez', 'Ramos',
            'Herrera', 'Medina', 'Aguilar', 'Mendoza', 'Rojas', 'Vega', 'Molina', 'Castillo'
        ];

        $dominiosEmail = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];

        // ✅ Obtener emails y usernames existentes
        $emailsUsados = User::pluck('email')->toArray();
        $usernamesUsados = User::pluck('username')->toArray();

        $usersBatch = [];

        for ($i = 1; $i <= $cantidadUsuarios; $i++) {
            try {
                // 60% bolivianos, 40% extranjeros
                $esBoliviano = rand(1, 100) <= 60;
                
                if ($esBoliviano) {
                    $nombre = $nombresBolivianos[array_rand($nombresBolivianos)];
                    $apellido = $apellidosBolivianos[array_rand($apellidosBolivianos)];
                    $tipoNacionalidad = 'nacional';
                    $telefono = '7' . $faker->numerify('#######');
                } else {
                    $nombre = $faker->firstName();
                    $apellido = $faker->lastName();
                    $tipoNacionalidad = 'extranjero';
                    $telefono = $faker->numerify('##########');
                }

                // Username único
                $usernameBase = strtolower(str_replace(' ', '_', $nombre . '_' . $apellido));
                do {
                    $username = $usernameBase . '_' . rand(1000, 9999);
                } while (in_array($username, $usernamesUsados));
                $usernamesUsados[] = $username;

                // Email único
                $emailBase = strtolower(str_replace(' ', '', $nombre . $apellido));
                do {
                    $email = $emailBase . rand(1, 9999) . '@' . $dominiosEmail[array_rand($dominiosEmail)];
                } while (in_array($email, $emailsUsados));
                $emailsUsados[] = $email;

                // Edad realista
                $rangoEdad = rand(1, 100);
                if ($rangoEdad <= 40) {
                    $edad = rand(25, 35); // 40% jóvenes adultos
                } elseif ($rangoEdad <= 70) {
                    $edad = rand(36, 50); // 30% adultos
                } elseif ($rangoEdad <= 90) {
                    $edad = rand(20, 24); // 20% jóvenes
                } else {
                    $edad = rand(51, 70); // 10% seniors
                }

                $sexo = $faker->randomElement(['M', 'F']);
                $emailVerificado = rand(1, 10) <= 8 ? Carbon::now() : null;

                $now = Carbon::now();
                
                $usersBatch[] = [
                    'name' => "{$nombre} {$apellido}",
                    'username' => $username,
                    'edad' => $edad,
                    'sexo' => $sexo,
                    'telefono' => $telefono,
                    'profile_icon' => null,
                    'tipo_nacionalidad' => $tipoNacionalidad,
                    'email' => $email,
                    'email_verified_at' => $emailVerificado,
                    'password' => Hash::make('123456789'),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                // Insertar en lotes
                if (count($usersBatch) >= $batchSize) {
                    $insertados = $this->insertarLote($usersBatch);
                    $creados += $insertados;
                    
                    $porcentaje = round(($creados / $cantidadUsuarios) * 100, 1);
                    $this->command->info("   ✅ Progreso: {$creados}/{$cantidadUsuarios} ({$porcentaje}%)");
                    
                    $usersBatch = [];
                }

            } catch (Exception $e) {
                $errores++;
            }
        }

        // Insertar último lote
        if (!empty($usersBatch)) {
            $insertados = $this->insertarLote($usersBatch);
            $creados += $insertados;
        }

        // Estadísticas finales
        $this->command->newLine();
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN MASIVO');
        $this->command->info("   ✅ Usuarios-Clientes creados: {$creados}");
        $this->command->info("   ❌ Errores:                   {$errores}");
        $this->command->info('═══════════════════════════════════════════════════');
        
        $this->mostrarEstadisticas();
    }

    /**
     * Insertar lote de usuarios + clientes (SIN asignar segmentos)
     */
    private function insertarLote($usersBatch): int
    {
        DB::beginTransaction();
        try {
            // 1️⃣ Insertar usuarios
            DB::table('users')->insert($usersBatch);
            
            // 2️⃣ Obtener IDs de usuarios recién creados
            $ultimosEmails = array_column($usersBatch, 'email');
            $idsUsuarios = User::whereIn('email', $ultimosEmails)->pluck('id')->toArray();
            
            // 3️⃣ Crear clientes (solo ID, created_at, updated_at)
            $clientesBatch = array_map(function($id) {
                return [
                    'id' => $id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }, $idsUsuarios);
            
            DB::table('clientes')->insert($clientesBatch);
            
            // ✅ NO asignamos segmentos aquí
            // El sistema lo hará automáticamente cuando el cliente haga reservas
            
            DB::commit();
            return count($usersBatch);
            
        } catch (Exception $e) {
            DB::rollBack();
            $this->command->error("   ❌ Error en lote: {$e->getMessage()}");
            return 0;
        }
    }

    /**
     * Mostrar estadísticas finales
     */
    private function mostrarEstadisticas(): void
    {
        $this->command->newLine();
        $this->command->info('📈 ESTADÍSTICAS FINALES:');
        
        $totalUsers = User::count();
        $totalClientes = Cliente::count();
        $soloUsuarios = $totalUsers - $totalClientes;
        $verificados = User::whereNotNull('email_verified_at')->count();
        $nacionales = User::where('tipo_nacionalidad', 'nacional')->count();
        $extranjeros = User::where('tipo_nacionalidad', 'extranjero')->count();
        
        $this->command->info("   👥 Total usuarios:         {$totalUsers}");
        $this->command->info("   🎫 Total clientes:         {$totalClientes}");
        $this->command->info("   👨‍💼 Solo usuarios (staff):  {$soloUsuarios}");
        $this->command->info("   ✉️  Verificados:           {$verificados} (" . round(($verificados/$totalUsers)*100, 1) . "%)");
        $this->command->info("   🇧🇴 Nacionales:            {$nacionales} (" . round(($nacionales/$totalUsers)*100, 1) . "%)");
        $this->command->info("   🌍 Extranjeros:           {$extranjeros} (" . round(($extranjeros/$totalUsers)*100, 1) . "%)");
        
        // Verificar segmentos disponibles (sin asignar)
        $segmentosDisponibles = Segmento::where('activo', true)->count();
        $clientesConSegmento = DB::table('cliente_segmento')->distinct('cliente_id')->count();
        $clientesSinSegmento = $totalClientes - $clientesConSegmento;
        
        $this->command->newLine();
        $this->command->info('🎯 SEGMENTACIÓN:');
        $this->command->info("   📊 Segmentos disponibles:     {$segmentosDisponibles}");
        $this->command->info("   ✅ Clientes ya segmentados:   {$clientesConSegmento}");
        $this->command->info("   ⏳ Pendientes de segmentar:   {$clientesSinSegmento}");
        $this->command->warn("   ℹ️  Los segmentos se asignarán automáticamente por el sistema");
    }
}