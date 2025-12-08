<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comentario;
use App\Models\User;
use Exception;

class ComentarioSeeder extends Seeder
{
    /**
     * Comentarios positivos predefinidos
     */
    private array $comentariosPositivos = [
        'Excelente servicio, muy recomendado. El personal fue muy amable y atento.',
        'Las habitaciones están impecables y muy cómodas. Volveré sin duda.',
        'La ubicación es perfecta, cerca de todo. El desayuno buffet es espectacular.',
        'Increíble experiencia, superó mis expectativas. El spa es de primera.',
        'El mejor hotel en el que me he hospedado. Relación calidad-precio inmejorable.',
        'Atención personalizada y de primera calidad. Me sentí como en casa.',
        'Las vistas desde la habitación son espectaculares. Muy tranquilo y relajante.',
        'El restaurante del hotel tiene una comida deliciosa. Chef de primera.',
        'Perfecta para viajes de negocios y placer. WiFi rápido y estable.',
        'El gimnasio está muy bien equipado. Las instalaciones son modernas.',
        'La piscina es hermosa, ideal para relajarse después de un día largo.',
        'El room service es rápido y eficiente. Comida caliente y bien presentada.',
        'Las camas son súper cómodas, dormí como un bebé todas las noches.',
        'El minibar estaba bien surtido y a precios razonables.',
        'El check-in fue rapidísimo, en menos de 5 minutos estaba en mi habitación.',
    ];

    /**
     * Comentarios neutrales predefinidos
     */
    private array $comentariosNeutrales = [
        'Buena estancia en general, aunque el WiFi podría mejorar.',
        'Habitación correcta, cumple con lo esperado. Nada extraordinario.',
        'El servicio es bueno, pero el desayuno podría tener más variedad.',
        'Ubicación céntrica, aunque hay algo de ruido por las noches.',
        'Relación calidad-precio aceptable. El estacionamiento es limitado.',
        'Las instalaciones están bien, aunque algunas necesitan renovación.',
        'El personal es amable, pero a veces tarda en responder.',
        'La habitación es espaciosa, pero la decoración es algo anticuada.',
    ];

    /**
     * Comentarios con sugerencias predefinidos
     */
    private array $comentariosConSugerencias = [
        'Muy buen hotel, solo sugeriría mejorar la presión del agua en las duchas.',
        'Excelente atención, aunque sería bueno tener más opciones vegetarianas.',
        'Me gustó mucho, pero el aire acondicionado hacía algo de ruido.',
        'Gran experiencia, solo faltaría una cafetera en la habitación.',
        'Todo perfecto excepto que el check-out es muy temprano.',
        'Muy recomendable, aunque las almohadas podrían ser más firmes.',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('💬 Iniciando seeder de Comentarios...');
        $this->command->newLine();

        // Obtener todos los usuarios
        $usuarios = User::all();

        if ($usuarios->isEmpty()) {
            $this->command->error('❌ No se encontraron usuarios. Ejecute primero UserClienteSeeder.');
            return;
        }

        $this->command->info("📋 Encontrados {$usuarios->count()} usuarios");
        $this->command->newLine();

        $creados = 0;
        $yaExisten = 0;
        $errores = 0;
        $contadorGlobal = 1;

        foreach ($usuarios as $usuario) {
            // Generar entre 1 y 3 comentarios por usuario
            $cantidadComentarios = rand(1, 3);
            
            $this->command->info("👤 Procesando: {$usuario->name} ({$cantidadComentarios} comentarios)");

            for ($i = 1; $i <= $cantidadComentarios; $i++) {
                try {
                    // Verificar si ya existe un comentario similar para este usuario
                    $comentariosExistentes = Comentario::where('usuario_id', $usuario->id)->count();
                    
                    if ($comentariosExistentes >= 3) {
                        $yaExisten++;
                        $this->command->warn("      🔄 [{$contadorGlobal}] Ya tiene 3 comentarios");
                        $contadorGlobal++;
                        continue;
                    }

                    $contenido = $this->getComentarioAleatorio();
                    $calificacion = $this->getCalificacionSegunComentario($contenido);
                    $estado = $this->getEstadoAleatorio();

                    Comentario::create([
                        'usuario_id' => $usuario->id,
                        'contenido' => $contenido,
                        'calificacion' => $calificacion,
                        'estado' => $estado,
                    ]);

                    $creados++;
                    $emoji = $this->getEmojiCalificacion($calificacion);
                    $this->command->info("      ✅ [{$contadorGlobal}] Creado: {$emoji} {$calificacion}⭐ - {$estado}");
                    $contadorGlobal++;

                } catch (Exception $e) {
                    $errores++;
                    $this->command->error("      ❌ [{$contadorGlobal}] Error: {$e->getMessage()}");
                    $contadorGlobal++;
                }
            }

            $this->command->newLine();
        }

        // Resumen
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->info('📊 RESUMEN');
        $this->command->info("   ✅ Creados:      {$creados}");
        $this->command->info("   🔄 Omitidos:     {$yaExisten}");
        $this->command->info("   ❌ Errores:      {$errores}");
        $this->command->info('═══════════════════════════════════════════════════');
        $this->command->newLine();

        // Estadísticas de calificaciones
        $this->mostrarEstadisticas();

        $this->command->info('🎉 Seeder de Comentarios completado!');
    }

    /**
     * Obtiene un comentario aleatorio
     */
    private function getComentarioAleatorio(): string
    {
        $tipo = rand(1, 10);
        
        if ($tipo <= 6) {
            // 60% positivos
            return $this->comentariosPositivos[array_rand($this->comentariosPositivos)];
        } elseif ($tipo <= 8) {
            // 20% neutrales
            return $this->comentariosNeutrales[array_rand($this->comentariosNeutrales)];
        } else {
            // 20% con sugerencias
            return $this->comentariosConSugerencias[array_rand($this->comentariosConSugerencias)];
        }
    }

    /**
     * Asigna calificación según el tipo de comentario
     */
    private function getCalificacionSegunComentario(string $contenido): int
    {
        // Si es positivo, calificación alta (4-5)
        if (in_array($contenido, $this->comentariosPositivos)) {
            return rand(4, 5);
        }
        // Si es neutral, calificación media (3-4)
        if (in_array($contenido, $this->comentariosNeutrales)) {
            return rand(3, 4);
        }
        // Si tiene sugerencias, calificación media-alta (3-5)
        return rand(3, 5);
    }

    /**
     * Genera un estado aleatorio
     */
    private function getEstadoAleatorio(): string
    {
        $estados = ['visible', 'visible', 'visible', 'visible', 'oculto'];
        return $estados[array_rand($estados)];
    }

    /**
     * Obtiene emoji según calificación
     */
    private function getEmojiCalificacion(int $calificacion): string
    {
        return match($calificacion) {
            5 => '🌟',
            4 => '⭐',
            3 => '👍',
            2 => '😐',
            1 => '👎',
            default => '❓',
        };
    }

    /**
     * Muestra estadísticas de los comentarios creados
     */
    private function mostrarEstadisticas(): void
    {
        $this->command->info('📈 ESTADÍSTICAS DE CALIFICACIONES:');
        $this->command->info('───────────────────────────────────────────────────');
        
        for ($i = 5; $i >= 1; $i--) {
            $cantidad = Comentario::where('calificacion', $i)->count();
            $emoji = $this->getEmojiCalificacion($i);
            $barra = str_repeat('█', $cantidad);
            $this->command->info("   {$emoji} {$i} estrellas: {$cantidad} {$barra}");
        }
        
        $this->command->info('───────────────────────────────────────────────────');
        
        $visibles = Comentario::where('estado', 'visible')->count();
        $ocultos = Comentario::where('estado', 'oculto')->count();
        
        $this->command->info("   👁️  Visibles: {$visibles}");
        $this->command->info("   🙈 Ocultos:   {$ocultos}");
        $this->command->info('───────────────────────────────────────────────────');
        $this->command->newLine();
    }
}
