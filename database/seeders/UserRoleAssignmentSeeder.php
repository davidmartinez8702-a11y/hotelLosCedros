<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRoleAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // El array define el rol a asignar para cada usuario
        $usersToCreate = [
            ['name' => 'fernando', 'email' => 'fernando@gmail.com', 'password' => '123456789', 'role' => 'administrador'],
            ['name' => 'junior', 'email' => 'junior@gmail.com', 'password' => '123456789', 'role' => 'usuario'],
            ['name' => 'erick', 'email' => 'erick@gmail.com', 'password' => '123456789', 'role' => 'administrador'],
            ['name' => 'cliente', 'email' => 'cliente@gmail.com', 'password' => '123456789', 'role' => 'cliente'],
            ['name' => 'recepcionista', 'email' => 'recepcionista@gmail.com', 'password' => '123456789', 'role' => 'recepcionista'],
        ];

        foreach ($usersToCreate as $userData) {
            // 1. Crear o encontrar el usuario
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                ]
            );

            $user->assignRole($userData['role']);

            $this->command->info("Usuario '{$userData['name']}' creado/actualizado y asignado a rol '{$userData['role']}'");
        }
    }
}
