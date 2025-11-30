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
        Schema::create('habitacion_caracteristicas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_habitacion_id')->constrained('tipo_habitacions');
            $table->foreignId('caracteristica_id')->constrained('caracteristicas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habitacion_caracteristicas');
    }
};
