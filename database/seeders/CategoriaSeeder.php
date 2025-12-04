<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $categorias = [
            'Desayuno',
            'Almuerzo',
            'Cena',
            'Postres',
            'Bebidas',
            'Spa',
            'Gimnasio',
            'Lavandería',
            'Room Service',
            'Transporte',
        ];

       $this->command->info("Seeding categorías...");
        foreach ($categorias as $categoria) {
            $created = Categoria::firstOrCreate(['nombre' => $categoria]);
            if ($created->wasRecentlyCreated) {
                $this->command->info("Categoría '{$categoria}' creada.");
            } else {
                $this->command->line("Categoría '{$categoria}' ya existente.");
            }
        }

        $this->command->info("Seeding completado.");
    }
}
