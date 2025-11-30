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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};
