<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Platillo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class PlatilloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $platillosData = [
            // Desayuno
            [
                'categoria_nombre' => 'Desayuno',
                'nombre' => 'Huevos Rancheros',
                'descripcion' => 'Dos huevos fritos sobre tortillas de maíz, bañados en salsa roja y acompañados de frijoles refritos.',
                'ingredientes' => 'Huevos, tortilla de maíz, salsa roja, frijoles, queso, aguacate.',
                'image_url' => 'https://www.comedera.com/wp-content/uploads/2021/04/huevos-rancheros.jpg',
            ],
            [
                'categoria_nombre' => 'Desayuno',
                'nombre' => 'Chilaquiles Rojos',
                'descripcion' => 'Totopos de maíz bañados en salsa roja picante, con crema, queso, cebolla y cilantro. Puedes añadir pollo o huevo.',
                'ingredientes' => 'Totopos, salsa roja, crema, queso, cebolla, cilantro, pollo (opcional), huevo (opcional).',
                'image_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhY5H9c2_A3fB6k3o7_J6M_F7q_Z5k_L7q_w&s',
            ],
            [
                'categoria_nombre' => 'Desayuno',
                'nombre' => 'Panqueques con Frutas',
                'descripcion' => 'Suaves panqueques caseros servidos con frutas frescas de temporada y miel de maple.',
                'ingredientes' => 'Harina, huevos, leche, azúcar, frutas de temporada, miel de maple.',
                'image_url' => 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/4d603a1f9a6564619d7a2202613ce456.jpg?itok=z7tB195C',
            ],
            // Almuerzo
            [
                'categoria_nombre' => 'Almuerzo',
                'nombre' => 'Ensalada César con Pollo',
                'descripcion' => 'Lechuga romana fresca, crutones, queso parmesano y aderezo César cremoso, con pechuga de pollo a la parrilla.',
                'ingredientes' => 'Lechuga, pollo, crutones, queso parmesano, aderezo César.',
                'image_url' => 'https://www.paulinacocina.net/wp-content/uploads/2023/07/ensalada-cesar-con-pollo.jpg',
            ],
            [
                'categoria_nombre' => 'Almuerzo',
                'nombre' => 'Sopa de Tortilla',
                'descripcion' => 'Caldo de tomate y chile pasilla, con tiras de tortilla frita, aguacate, queso y crema.',
                'ingredientes' => 'Tortilla, caldo de pollo, tomate, chile pasilla, aguacate, queso, crema.',
                'image_url' => 'https://www.comedera.com/wp-content/uploads/2022/07/sopa-de-tortilla.jpg',
            ],
            [
                'categoria_nombre' => 'Almuerzo',
                'nombre' => 'Tacos al Pastor',
                'descripcion' => 'Tortillas de maíz rellenas de carne de cerdo marinada y cocinada en trompo, con piña, cebolla y cilantro.',
                'ingredientes' => 'Carne de cerdo, tortilla de maíz, piña, cebolla, cilantro, salsa.',
                'image_url' => 'https://assets.unileversolutions.com/recipes-v2/34293.jpg',
            ],
            // Cena
            [
                'categoria_nombre' => 'Cena',
                'nombre' => 'Salmón a la Plancha con Vegetales',
                'descripcion' => 'Filete de salmón fresco a la plancha, acompañado de una selección de vegetales al vapor.',
                'ingredientes' => 'Salmón, brócoli, zanahoria, espárragos, limón, hierbas finas.',
                'image_url' => 'https://cdn.shopify.com/s/files/1/0550/6652/3592/files/salmon-a-la-plancha-con-verduras.jpg',
            ],
            [
                'categoria_nombre' => 'Cena',
                'nombre' => 'Pasta Alfredo con Camarones',
                'descripcion' => 'Pasta fettuccine bañada en salsa Alfredo cremosa, con tiernos camarones salteados.',
                'ingredientes' => 'Pasta fettuccine, camarones, crema, queso parmesano, ajo, mantequilla.',
                'image_url' => 'https://www.allrecipes.com/thmb/p-9z_lXyW20Xg56K7jP-1f5kR9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228394-fettuccine-alfredo-with-shrimp-DDMFS-4x3-3766-3d2315fa403144c29759c869ea766a2f.jpg',
            ],
            [
                'categoria_nombre' => 'Cena',
                'nombre' => 'Mole Poblano',
                'descripcion' => 'Pechuga de pollo bañada en la tradicional salsa mole poblano, acompañada de arroz rojo.',
                'ingredientes' => 'Pollo, chiles secos, especias, chocolate, semillas, arroz.',
                'image_url' => 'https://www.mexicanplease.com/wp-content/uploads/2021/04/chicken-mole-poblano-recipe-scaled.jpg',
            ],
            // Postres
            [
                'categoria_nombre' => 'Postres',
                'nombre' => 'Flan Casero',
                'descripcion' => 'Delicioso y suave flan de huevo con caramelo, una receta tradicional.',
                'ingredientes' => 'Huevos, leche, azúcar, vainilla.',
                'image_url' => 'https://www.comedera.com/wp-content/uploads/2017/07/flan-casero.jpg',
            ],
            [
                'categoria_nombre' => 'Postres',
                'nombre' => 'Arroz con Leche',
                'descripcion' => 'Postre cremoso de arroz cocido en leche con canela y cáscara de limón.',
                'ingredientes' => 'Arroz, leche, azúcar, canela, cáscara de limón.',
                'image_url' => 'https://www.cocinafacil.com.mx/wp-content/uploads/2018/02/receta-arroz-con-leche-cremoso.jpg',
            ],
            [
                'categoria_nombre' => 'Postres',
                'nombre' => 'Churros con Chocolate',
                'descripcion' => 'Crujientes churros fritos espolvoreados con azúcar y canela, servidos con salsa de chocolate caliente.',
                'ingredientes' => 'Harina, agua, azúcar, canela, chocolate, aceite.',
                'image_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sD6j43l5g5_p2b-Q8y_y0Y7i_S4_B0s2YQ&s',
            ],
            // Bebidas
            [
                'categoria_nombre' => 'Bebidas',
                'nombre' => 'Agua Fresca de Jamaica',
                'descripcion' => 'Refrescante bebida a base de flor de jamaica, endulzada naturalmente.',
                'ingredientes' => 'Flor de jamaica, agua, azúcar.',
                'image_url' => 'https://www.comedera.com/wp-content/uploads/2022/07/agua-de-jamaica.jpg',
            ],
            [
                'categoria_nombre' => 'Bebidas',
                'nombre' => 'Horchata de Arroz',
                'descripcion' => 'Bebida tradicional mexicana hecha con arroz, canela y vainilla.',
                'ingredientes' => 'Arroz, agua, canela, vainilla, leche (opcional).',
                'image_url' => 'https://www.comedera.com/wp-content/uploads/2022/07/horchata-de-arroz.jpg',
            ],
            [
                'categoria_nombre' => 'Bebidas',
                'nombre' => 'Café Americano',
                'descripcion' => 'Café expreso diluido con agua caliente, suave y aromático.',
                'ingredientes' => 'Café, agua.',
                'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Coffee_cup_with_water_and_coffee_beans.jpg/1200px-Coffee_cup_with_water_and_coffee_beans.jpg',
            ],
        ];

        Log::info('PlatilloSeeder: Starting to create realistic platillos...');

        foreach ($platillosData as $data) {
            // Find the category ID based on the category name
            $categoria = Categoria::firstWhere('nombre', $data['categoria_nombre']);

            if (!$categoria) {
                Log::warning("PlatilloSeeder: Category '{$data['categoria_nombre']}' not found for platillo '{$data['nombre']}'. Skipping.");
                continue;
            }

            $platilloData = [
                'categoria_id' => $categoria->id,
                'nombre' => $data['nombre'],
                'descripcion' => $data['descripcion'],
                'ingredientes' => $data['ingredientes'],
                'image_url' => $data['image_url'],
                'precio' => rand(500, 2500) / 100, // Price between 5.00 and 25.00
                'estado' => 'disponible', // Default state
            ];

            $platillo = Platillo::firstOrCreate(
                ['nombre' => $data['nombre']], // Check for existing platillo by name
                $platilloData // Data to create if not found
            );

            if ($platillo->wasRecentlyCreated) {
                Log::info("PlatilloSeeder: Created platillo '{$platillo->nombre}' (ID: {$platillo->id}) linked to category '{$categoria->nombre}'.");
            } else {
                Log::info("PlatilloSeeder: Platillo '{$platillo->nombre}' already exists (ID: {$platillo->id}). No new record created.");
            }
        }

        Log::info('PlatilloSeeder: Finished creating/checking realistic platillos.');

    }
}