<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Recepcionista;
use Spatie\Permission\Models\Role;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // -----------------------------------------------------------------
        // 1️⃣  Roles (ensure they exist – RolesSeeder also does this, but we
        //     keep a safety net in case this seeder runs alone)
        // -----------------------------------------------------------------
        $adminRole        = Role::firstOrCreate(['name' => 'administrador']);
        $clienteRole      = Role::firstOrCreate(['name' => 'cliente']);
        $recepcionistaRole = Role::firstOrCreate(['name' => 'recepcionista']);

        // -----------------------------------------------------------------
        // 2️⃣  Administradores (solo usuarios, sin tabla extra)
        // -----------------------------------------------------------------
        $admins = [
            [
                'name'               => 'Ana Administradora',
                'username'           => 'ana_admin',
                'email'              => 'ana.admin@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
            [
                'name'               => 'Luis Administrador',
                'username'           => 'luis_admin',
                'email'              => 'luis.admin@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
        ];

        foreach ($admins as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                $data
            );
            // Assign role only if not already present
            if (! $user->hasRole($adminRole)) {
                $user->assignRole($adminRole);
            }
        }

        // -----------------------------------------------------------------
        // 3️⃣  Clientes (usuario + registro en tabla `clientes`)
        // -----------------------------------------------------------------
        $clientes = [
            [
                'name'               => 'Carlos Cliente',
                'username'           => 'carlos_cliente',
                'email'              => 'carlos.cliente@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
            [
                'name'               => 'María Cliente',
                'username'           => 'maria_cliente',
                'email'              => 'maria.cliente@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
            [
                'name'               => 'Pedro Cliente',
                'username'           => 'pedro_cliente',
                'email'              => 'pedro.cliente@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
        ];

        foreach ($clientes as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                $data
            );
            if (! $user->hasRole($clienteRole)) {
                $user->assignRole($clienteRole);
            }
            // Create Cliente record only if it does not exist yet
            if (! Cliente::find($user->id)) {
                Cliente::create(['id' => $user->id]);
            }
        }

        // -----------------------------------------------------------------
        // 4️⃣  Recepcionistas (usuario + registro en tabla `recepcionistas`)
        // -----------------------------------------------------------------
        $recepcionistas = [
            [
                'name'               => 'Laura Recepcionista',
                'username'           => 'laura_recep',
                'email'              => 'laura.recep@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
            [
                'name'               => 'Jorge Recepcionista',
                'username'           => 'jorge_recep',
                'email'              => 'jorge.recep@gmail.com',
                'password'           => Hash::make('123456789'),
                'tipo_nacionalidad' => 'nacional',
            ],
        ];

        foreach ($recepcionistas as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                $data
            );
            if (! $user->hasRole($recepcionistaRole)) {
                $user->assignRole($recepcionistaRole);
            }
            // Create Recepcionista record only if missing
            if (! Recepcionista::find($user->id)) {
                Recepcionista::create(['id' => $user->id]);
            }
        }
    }
}
