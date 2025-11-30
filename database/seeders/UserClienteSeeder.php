<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Cliente;
use Carbon\Carbon;

class UserClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // -----------------------------------------------------------------
        // 1️⃣ Crear 3 usuarios normales (cumpliendo con la migración)
        // -----------------------------------------------------------------
        $usersData = [
            [
                // id será asignado automáticamente (auto‑increment)
                'name'               => 'Ana Gómez',
                'username'           => 'ana_gomez',
                'edad'               => 28,
                'sexo'               => 'F',
                'telefono'           => '555-1234',
                'profile_icon'       => null,
                'tipo_nacionalidad' => 'nacional',
                'email'              => 'ana@example.com',
                'email_verified_at' => Carbon::now(),
                'password'           => Hash::make('secret123'), // contraseña de ejemplo
                'remember_token'     => null,
            ],
            [
                'name'               => 'Luis Martínez',
                'username'           => 'luis_martinez',
                'edad'               => 35,
                'sexo'               => 'M',
                'telefono'           => '555-5678',
                'profile_icon'       => null,
                'tipo_nacionalidad' => 'nacional',
                'email'              => 'luis@example.com',
                'email_verified_at' => Carbon::now(),
                'password'           => Hash::make('secret123'),
                'remember_token'     => null,
            ],
            [
                'name'               => 'María Pérez',
                'username'           => 'maria_perez',
                'edad'               => 22,
                'sexo'               => 'F',
                'telefono'           => '555-9012',
                'profile_icon'       => null,
                'tipo_nacionalidad' => 'nacional',
                'email'              => 'maria@example.com',
                'email_verified_at' => Carbon::now(),
                'password'           => Hash::make('secret123'),
                'remember_token'     => null,
            ],
        ];

        // Insertamos los usuarios y guardamos los modelos resultantes
        $createdUsers = [];
        foreach ($usersData as $data) {
            $createdUsers[] = User::create($data);
        }

        // -----------------------------------------------------------------
        // 2️⃣ Crear 2 clientes vinculados a los dos primeros usuarios
        // -----------------------------------------------------------------
        foreach (array_slice($createdUsers, 0, 2) as $user) {
            Cliente::create([
                // La columna `id` en clientes es PK + FK que referencia users.id
                'id' => $user->id,
            ]);
        }
    }
}