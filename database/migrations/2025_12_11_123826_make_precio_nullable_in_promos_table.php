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
        Schema::table('promos', function (Blueprint $table) {
            $table->decimal('precio_total_paquete', 10, 2)->nullable()->change();
            $table->decimal('precio_normal', 10, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('promos', function (Blueprint $table) {
            $table->decimal('precio_total_paquete', 10, 2)->nullable(false)->change();
            $table->decimal('precio_normal', 10, 2)->nullable(false)->change();
        });
    }
};
