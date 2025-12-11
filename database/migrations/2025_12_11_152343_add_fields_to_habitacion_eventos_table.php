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
        Schema::table('habitacion_eventos', function (Blueprint $table) {
            // Modificar estado para incluir más opciones
            $table->dropColumn('estado');
        });

        Schema::table('habitacion_eventos', function (Blueprint $table) {
            $table->enum('estado', [
                'disponible',
                'ocupada',
                'limpieza',
                'mantenimiento',
                'bloqueada',
                'fuera_de_servicio'
            ])->default('disponible')->after('codigo');

            // Campos adicionales
            $table->string('piso', 10)->nullable()->after('estado');
            $table->string('ala_seccion', 50)->nullable()->after('piso');
            $table->string('vista', 100)->nullable()->after('ala_seccion');
            $table->text('notas_internas')->nullable()->after('vista');
            $table->boolean('requiere_mantenimiento')->default(false)->after('notas_internas');
            $table->timestamp('ultima_limpieza')->nullable()->after('requiere_mantenimiento');
            $table->integer('orden_limpieza')->nullable()->after('ultima_limpieza');

            // Soft deletes
            $table->softDeletes();

            // Índices para búsquedas rápidas
            $table->index(['tipo_habitacion_id', 'estado']);
            $table->index('estado');
            $table->index('piso');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('habitacion_eventos', function (Blueprint $table) {
            $table->dropColumn([
                'piso',
                'ala_seccion',
                'vista',
                'notas_internas',
                'requiere_mantenimiento',
                'ultima_limpieza',
                'orden_limpieza'
            ]);
            
            $table->dropIndex(['tipo_habitacion_id', 'estado']);
            $table->dropIndex(['estado']);
            $table->dropIndex(['piso']);
            
            $table->dropSoftDeletes();
            $table->dropColumn('estado');
        });

        Schema::table('habitacion_eventos', function (Blueprint $table) {
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
        });
    }
};
