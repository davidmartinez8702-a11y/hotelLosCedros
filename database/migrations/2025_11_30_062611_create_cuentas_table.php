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
        Schema::create('cuentas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('checkin_id')->constrained('checkins')->unique();
            $table->decimal('monto_total',10,2)->default(0);
            $table->decimal('monto_pagado',10,2)->default(0);
            $table->decimal('saldo',10,2)->default(0);
            $table->string('estado',100)->default('pendiente');
            $table->date('fecha_pago')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuentas');
    }
};
