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
        Schema::create('checkins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reserva_id')->nullable()->constrained('reservas');
            $table->foreignId('recepcionista_id')->constrained('recepcionistas');
            $table->foreignId('cliente_id')->constrained('clientes');
            $table->foreignId('habitacion_evento_id')->constrained('habitacion_eventos');
            $table->date('fecha_entrada');
            $table->date('fecha_salida')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkins');
    }
};
