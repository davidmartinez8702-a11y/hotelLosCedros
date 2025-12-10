<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('segmento_promo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('segmento_id')->constrained('segmentos')->onDelete('cascade');
            $table->foreignId('promo_id')->constrained('promos')->onDelete('cascade');
            
            // ✅ Estado de la relación
            $table->enum('estado', ['activa', 'pausada', 'finalizada'])->default('activa');
            
            // ✅ Configuración
            $table->boolean('aplicacion_automatica')->default(true); // Si se aplica automáticamente
            $table->integer('prioridad')->default(0); // Orden de aplicación (si hay múltiples promos)
            $table->decimal('descuento_adicional', 5, 2)->nullable(); // % extra para este segmento
            
            // ✅ Vigencia
            $table->date('fecha_inicio')->nullable(); // Cuándo inicia esta promo para este segmento
            $table->date('fecha_fin')->nullable(); // Cuándo termina
            
            // ✅ Límites
            $table->integer('usos_maximos')->nullable(); // Cuántas veces se puede usar
            $table->integer('usos_actuales')->default(0); // Cuántas veces se usó
            
            $table->timestamps();

            $table->unique(['segmento_id', 'promo_id']);
            $table->index(['estado', 'fecha_inicio', 'fecha_fin']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segmento_promo');
    }
};
