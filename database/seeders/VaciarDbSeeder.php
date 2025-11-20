<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VaciarDbSeeder extends Seeder
{
    /**
     * Run the database seeds.,solo para vaciar usuarios por el momento
     */
    public function run(): void
    {
        // 1. Vaciar la tabla de USUARIOS con opciones de PostgreSQL
        // CASCADE: Elimina registros dependientes en otras tablas (ej. model_has_roles).
        // RESTART IDENTITY: Resetea el contador de la clave primaria (auto-incremento).

        # comentadas para no ejecutarlas accidentalmente
        // DB::statement('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');

        
        
        // $this->command->warn('Tabla [users] vaciada. Las tablas de roles permanecen intactas (pero las relaciones se borran).');
        
        

        // $this->command->info('Tabla de usuarios limpiada.');
    }
}
