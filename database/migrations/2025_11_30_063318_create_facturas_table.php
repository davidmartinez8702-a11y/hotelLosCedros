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
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('cuenta_id')->nullable()->constrained('cuentas'); 
            $table->foreignId('reserva_id')->nullable()->constrained('reservas');
            $table->foreignId('checkin_id')->nullable()->constrained('checkins');
            $table->foreignId('tipo_pago_id')->constrained('tipo_pagos');
            $table->decimal('monto_total',10,2)->default(0);
            $table->decimal('monto_relativo',10,2)->default(0);
            $table->string('estado',100)->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
