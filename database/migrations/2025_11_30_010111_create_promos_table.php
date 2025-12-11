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
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',100);
            $table->string('descripcion')->nullable();
            $table->string('estado')->default('activo');
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('stock')->default(0);
            $table->decimal('precio_promo', 10, 2)->default(0);
            $table->decimal('precio_normal', 10, 2)->default(0);
            #$table->integer('precio_descuento')->default(0);
            
            
            $table->timestamps();
        });
        Schema::table('promos', function (Blueprint $table) {
            // ✅ Agregar campos faltantes
            $table->string('tipo_promo', 50)->default('descuento_porcentual')
                ->after('descripcion')
                ->comment('descuento_porcentual, descuento_fijo, paquete, precio_especial, upgrade');
            
            $table->string('codigo_promocional', 50)->nullable()->unique()->after('nombre');
            
            $table->foreignId('segmento_id')->nullable()
                ->after('estado')
                ->constrained('segmentos')
                ->onDelete('set null')
                ->comment('NULL = todos los clientes');
            
            $table->string('aplica_a', 50)->default('todos')
                ->after('segmento_id')
                ->comment('todos, nuevos, registrados');
            
            // Condiciones
            $table->integer('minimo_noches')->default(1)->after('stock');
            $table->integer('minimo_personas')->default(1)->after('minimo_noches');
            $table->integer('dias_anticipacion_minimo')->default(0)
                ->after('minimo_personas')
                ->comment('Para early bird');
            $table->integer('dias_desde_ultima_visita')->nullable()
                ->after('dias_anticipacion_minimo')
                ->comment('Para reactivación de clientes inactivos');
            
            // Restricciones
            $table->json('dias_semana')->nullable()
                ->after('dias_desde_ultima_visita')
                ->comment('["lunes","martes"] o null para todos');
            $table->boolean('incluye_upgrade')->default(false)->after('dias_semana');
            $table->boolean('requiere_pago_completo')->default(false)->after('incluye_upgrade');
            
            // Límites de uso
            $table->integer('cantidad_maxima_usos')->nullable()
                ->after('requiere_pago_completo')
                ->comment('NULL = ilimitado');
            $table->integer('usos_por_cliente')->default(1)->after('cantidad_maxima_usos');
            $table->integer('cantidad_usos_actual')->default(0)->after('usos_por_cliente');
            
            // Prioridad para ordenar
            $table->integer('prioridad')->default(1)->after('cantidad_usos_actual');
            
            // Renombrar/ajustar campos existentes
            $table->decimal('descuento_porcentaje', 5, 2)->nullable()
                ->after('tipo_promo')
                ->comment('0-100');
            $table->decimal('descuento_monto', 10, 2)->nullable()
                ->after('descuento_porcentaje')
                ->comment('Monto fijo en Bs.');
            
            // Cambiar precio_promo por precio_total_paquete
            $table->renameColumn('precio_promo', 'precio_total_paquete');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('promos', function (Blueprint $table) {
            $table->dropForeign(['segmento_id']);
            $table->dropColumn([
                'tipo_promo',
                'codigo_promocional',
                'segmento_id',
                'aplica_a',
                'minimo_noches',
                'minimo_personas',
                'dias_anticipacion_minimo',
                'dias_desde_ultima_visita',
                'dias_semana',
                'incluye_upgrade',
                'requiere_pago_completo',
                'cantidad_maxima_usos',
                'usos_por_cliente',
                'cantidad_usos_actual',
                'prioridad',
                'descuento_porcentaje',
                'descuento_monto',
            ]);
            $table->renameColumn('precio_total_paquete', 'precio_promo');
        });
    }
};
