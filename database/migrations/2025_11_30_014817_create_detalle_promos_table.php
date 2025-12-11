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
            $table->foreignId('tipo_habitacion_id')->nullable()->constrained('tipo_habitacions');
            $table->foreignId('servicio_id')->nullable()->constrained('servicios');
            $table->foreignId('platillo_id')->nullable()->constrained('platillos');
            $table->string('detalle')->nullable();
            $table->string('tipo_item', 50)->after('promo_id')
                ->comment('habitacion, servicio, platillo');
            $table->integer('cantidad')->default(1)->after('tipo_item');
            $table->integer('noches')->nullable()->after('cantidad')
                ->comment('Para habitaciones');
            $table->decimal('descuento_porcentaje', 5, 2)->nullable()->after('noches');
            $table->decimal('descuento_monto', 10, 2)->nullable()->after('descuento_porcentaje');
            $table->decimal('precio_especial', 10, 2)->nullable()->after('descuento_monto');
            $table->boolean('es_gratis')->default(false)->after('precio_especial');
            $table->integer('orden')->default(1)->after('es_gratis');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detalle_promos', function (Blueprint $table) {
            $table->dropColumn([
                'tipo_item',
                'cantidad',
                'noches',
                'descuento_porcentaje',
                'descuento_monto',
                'precio_especial',
                'es_gratis',
                'orden',
            ]);
        });
        Schema::dropIfExists('detalle_promos');
    }
};
