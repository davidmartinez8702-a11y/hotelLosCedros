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
        Schema::create('cliente_segmento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('segmento_id')->constrained('segmentos')->onDelete('cascade');
            
            // ✅ Datos del microservicio
            $table->integer('cluster_id'); // 0, 1, 2, 3, 4, 5 (del modelo ML)
            $table->timestamp('fecha_clasificacion'); // Fecha que devuelve el endpoint
            
            // ✅ Características del cluster (JSON con datos del entrenamiento)
            $table->json('cluster_data')->nullable(); // revenue, adr, total_nights, etc.
            
            // ✅ Metadatos adicionales
            $table->integer('total_reservas_analizadas')->default(0);
            $table->decimal('confianza', 5, 2)->default(0); // % de certeza
            $table->string('version_modelo')->default('1.0'); // Por si cambias el modelo
            
            $table->timestamps();

            // Un cliente solo puede estar en un segmento a la vez
            $table->unique('cliente_id');
            $table->index(['segmento_id', 'cluster_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cliente_segmento');
    }
};
