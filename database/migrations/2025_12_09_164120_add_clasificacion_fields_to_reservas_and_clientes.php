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
        Schema::table('reservas', function (Blueprint $table) {
            // Agregar campos necesarios para clasificación
            $table->integer('numero_adultos')->default(1)->after('tipo_habitacion_id');
            $table->integer('numero_ninos')->default(0)->after('numero_adultos');
            $table->integer('numero_bebes')->default(0)->after('numero_ninos');
        });

        Schema::table('clientes', function (Blueprint $table) {
            // Agregar campo país si no existe
            if (!Schema::hasColumn('clientes', 'pais')) {
                $table->string('pais')->default('Bolivia')->after('documento_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->dropColumn(['numero_adultos', 'numero_ninos', 'numero_bebes']);
        });

        Schema::table('clientes', function (Blueprint $table) {
            if (Schema::hasColumn('clientes', 'pais')) {
                $table->dropColumn('pais');
            }
        });
    }
};
