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
        Schema::create('promo_reservas', function (Blueprint $table) {
            $table->id();
            
            // Relaciones
            $table->foreignId('promo_id')->constrained('promos')->onDelete('cascade');
            $table->foreignId('reserva_id')->constrained('reservas')->onDelete('cascade');
            $table->foreignId('cliente_id')->nullable()->constrained('clientes')->onDelete('set null');
            
            // Datos del descuento aplicado
            $table->decimal('monto_original', 10, 2);
            $table->decimal('monto_descuento', 10, 2);
            $table->decimal('monto_final', 10, 2);
            $table->string('tipo_descuento'); // 'porcentaje', 'fijo', 'paquete'
            $table->decimal('valor_descuento', 10, 2)->nullable();
            
            // Metadatos
            $table->string('codigo_usado')->nullable(); // Si usó código promocional
            $table->timestamp('aplicado_en')->useCurrent();
            $table->json('snapshot_promo')->nullable(); // Copia de la promo al momento de aplicarla
            
            $table->timestamps();
            
            // Índices
            $table->index(['promo_id', 'reserva_id']);
            $table->index(['cliente_id', 'promo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_reservas');
    }
};
