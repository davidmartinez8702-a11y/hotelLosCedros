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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes');
            $table->foreignId('promo_id')->nullable()->constrained('promos');
            $table->integer('total_cantidad_adultos')->default(0);
            $table->integer('total_cantidad_infantes')->default(0);
            $table->date('fecha_reserva');
            $table->string('dias_estadia');
            $table->string('estado')->default('pendiente');
            $table->string('tipo_reserva',100);
            $table->decimal('porcentaje_descuento',8,2)->default(0);
            $table->decimal('monto_total',10,2)->default(0);
            $table->decimal('pago_inicial',10,2)->default(0);
            $table->string('tipo_viaje',100);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
