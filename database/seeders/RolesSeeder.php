<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $roles = [
            'administrador',
            'usuario',
            'cliente',
            'recepcionista',
        ];
        
        foreach($roles as $roleName){
            Role::firstOrCreate(['name' => $roleName]);
        }
        
        $this->command->info('Roles (administrador, usuario, cliente, recepcionista) creados con éxito en PostgreSQL.');
    }
}
