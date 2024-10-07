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
        Schema::create('staff', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('surname');
            $table->string('other_names');
            $table->date('dob'); // ISO 8601 date format
            $table->longText('id_photo')->nullable(); // Base64-encoded ID photo
            $table->string('id_photo_mime_type')->nullable();
            $table->string('employee_number')->unique(); // Unique Employee Number
            $table->string('auth_code')->unique(); // The unique 10-digit code
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
