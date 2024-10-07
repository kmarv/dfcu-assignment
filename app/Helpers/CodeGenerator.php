<?php

namespace App\Helpers;

use App\Models\AuthCode;

class CodeGenerator
{
    public static function generateUniqueCode()
    {
        do {
            // Generate a 10-digit random number
            $code = str_pad(rand(0, 9999999999), 10, '0', STR_PAD_LEFT);
        } while (AuthCode::where('code', $code)->exists()); // Ensure uniqueness

        return $code;
    }
}
