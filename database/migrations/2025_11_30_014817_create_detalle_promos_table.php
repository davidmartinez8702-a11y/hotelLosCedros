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
        Schema::create('detalle_promos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promo_id')->constrained('promos');
            $table->foreignId('tipo_habitacion_id')->constrained('tipo_habitacions');
            $table->foreignId('servicio_id')->constrained('servicios');
            $table->foreignId('platillo_id')->constrained('platillos');
            $table->string('detalle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_promos');
    }
};
