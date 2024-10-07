<?php

namespace App\Http\Controllers;

use App\Models\AuthCode;
use App\Mail\AuthCodeMail;
use Illuminate\Http\Request;
use App\Helpers\CodeGenerator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthCodeController extends Controller
{
    public function generateAndSendCode(Request $request)
    {
        // Validate the request inputs
        $validator = Validator::make($request->all(), [
            'email' => 'required|email', // Add validation rules for email
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Generate unique 10-digit code
            $code = CodeGenerator::generateUniqueCode();

            // Store it in the database
            $authCode = AuthCode::create([
                'code' => $code,
            ]);

            // Dispatch the email to the queue
            Mail::to($request->email)->queue(new AuthCodeMail($code));

            return response()->json([
                'success' => true,
                'message' => 'Code generated successfully',
                'code' => $authCode->code, // Return the code (for testing purposes)
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions that may occur
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while generating the code',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
}
