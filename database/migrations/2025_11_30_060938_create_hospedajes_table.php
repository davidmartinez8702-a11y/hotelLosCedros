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
        Schema::create('hospedajes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reserva_id')->constrained('reservas');
            $table->foreignId('tipo_habitacion_id')->constrained('tipo_habitacions');
            $table->integer('cantidad_adultos')->default(0);
            $table->integer('cantidad_infantes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospedajes');
    }
};
