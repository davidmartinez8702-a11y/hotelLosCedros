<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Servicio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { 
        //DB::disableQueryLog();

        $this->command->info("Obteniendo IDs de Categorías...");
        
        // Mapear los nombres de categorías a sus IDs para asegurar la relación
        $categoriaMap = Categoria::pluck('id', 'nombre')->toArray();

        // ---------------------------------------------
        // Definición de los servicios a crear
        // ---------------------------------------------
        $serviciosData = [
            [
                'categoria_nombre' => 'Spa',
                'nombre' => 'Masaje Terapéutico Completo',
                'descripcion' => 'Sesión de 60 minutos de masaje descontracturante y relajante en todo el cuerpo.',
                'precio' => 250.00,
                'estado' => 'activo',
            ],
            [
                'categoria_nombre' => 'Gimnasio',
                'nombre' => 'Acceso Diario al Gimnasio',
                'descripcion' => 'Pase de un día para el uso completo de las instalaciones y equipos del gimnasio.',
                'precio' => 50.00,
                'estado' => 'activo',
            ],
            [
                'categoria_nombre' => 'Lavandería',
                'nombre' => 'Servicio de Lavado y Planchado Express',
                'descripcion' => 'Lavado, secado y planchado de hasta 5 prendas con entrega en 4 horas.',
                'precio' => 80.50,
                'estado' => 'activo',
            ],
            [
                'categoria_nombre' => 'Room Service',
                'nombre' => 'Desayuno Americano en Habitación',
                'descripcion' => 'Huevos, tostadas, jugo de naranja, café y fruta, servido en su habitación.',
                'precio' => 75.00,
                'estado' => 'activo',
            ],
            [
                'categoria_nombre' => 'Transporte',
                'nombre' => 'Traslado Aeropuerto VIP',
                'descripcion' => 'Servicio de traslado privado desde/hacia el aeropuerto en vehículo de lujo.',
                'precio' => 180.00,
                'estado' => 'activo',
            ],
            [
                'categoria_nombre' => 'Spa',
                'nombre' => 'Exfoliación Corporal y Facial',
                'descripcion' => 'Tratamiento completo de renovación de piel, dejando la piel suave y luminosa.',
                'precio' => 150.00,
                'estado' => 'inactivo', // Inactivo para pruebas
            ],
            [
                'categoria_nombre' => 'Gimnasio',
                'nombre' => 'Sesión de Yoga Personalizada',
                'descripcion' => 'Clase privada de yoga de 45 minutos adaptada a su nivel.',
                'precio' => 95.00,
                'estado' => 'activo',
            ],
        ];

        $this->command->info("Seeding servicios...");

        foreach ($serviciosData as $data) {
            $categoriaNombre = $data['categoria_nombre'];
            
            if (!isset($categoriaMap[$categoriaNombre])) {
                $this->command->error("Categoría '{$categoriaNombre}' no encontrada. Omite este servicio.");
                continue;
            }

            $servicio = Servicio::firstOrCreate(
                ['nombre' => $data['nombre']],
                [
                    'categoria_id' => $categoriaMap[$categoriaNombre], // Asignación por ID
                    'descripcion' => $data['descripcion'],
                    'precio' => $data['precio'],
                    'estado' => $data['estado'],
                ]
            );

            if ($servicio->wasRecentlyCreated) {
                $this->command->info("Servicio '{$data['nombre']}' creado y asociado a '{$categoriaNombre}'.");
            } else {
                $this->command->line("Servicio '{$data['nombre']}' ya existente.");
            }
        }

        $this->command->info("Seeding de servicios completado.");
    }
}
