<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\AuthCode;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\RegisterStaffRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StaffController extends Controller
{
    //
    public function register(RegisterStaffRequest $request)
    {
        try {
            // Check if the auth code is valid and not used
            $authCode = AuthCode::where('code', $request->auth_code)->firstOrFail();

            if ($authCode->used) {
                return response()->json([
                    'status' => false,
                    'message' => 'Authentication code has already been used.',
                ], 400); // 400 Bad Request
            }

            // Handle the file upload and Base64 encoding
            $idPhotoBase64 = null;
            $idPhotoMimeType = null; // Variable to store MIME type

            if ($request->hasFile('id_photo')) {
                $file = $request->file('id_photo');

                // Check if the file is a valid image
                if (!$file->isValid()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Uploaded ID photo is invalid.',
                    ], 422); // 422 Unprocessable Entity
                }

                // Get the file's MIME type
                $idPhotoMimeType = $file->getMimeType();

                // Store the image temporarily (optional)
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads/id_photos', $fileName, 'public');

                // Convert the file to Base64
                $fullFilePath = storage_path('app/public/' . $filePath);
                $idPhotoBase64 = base64_encode(file_get_contents($fullFilePath));
            }

            // Generate a unique employee number
            $employeeNumber = 'EMP-' . Str::random(8);

            // Store the new staff member with Base64 encoded photo and MIME type
            $staff = Staff::create([
                'surname' => $request->surname,
                'other_names' => $request->other_names,
                'dob' => $request->dob,
                'id_photo' => $idPhotoBase64,  // Save Base64 encoded image
                'id_photo_mime_type' => $idPhotoMimeType, // Save MIME type
                'auth_code' => $request->auth_code,
                'employee_number' => $employeeNumber,
            ]);

            // Mark the auth code as used
            $authCode->update(['used' => true]);

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Registration successful',
                    'staff' => $staff,  // Return the newly created staff member data including photo and MIME type
                ],
                201
            ); // 201 Created

        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Invalid authentication code.',
                ],
                404
            ); // 404 Not Found

        } catch (\Exception $e) {
            // Log the error for debugging (optional)
            Log::error('Registration error: ' . $e->getMessage());

            return response()->json(
                [
                    'status' => false,
                    'message' => 'An error occurred during registration. Please try again later.',
                    'error' => env('APP_DEBUG') ? $e->getMessage() : null,
                ],
                500
            ); // 500 Internal Server Error
        }
    }




    /**
     * Get staff details by employee number, or return all staff if no employee number is provided.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStaff(Request $request)
    {
        try {
            // Check if employee_number is provided as a query parameter
            $employeeNumber = $request->query('employee_number');

            if ($employeeNumber) {
                // Find the staff member by employee number
                $staff = Staff::where('employee_number', $employeeNumber)->first();

               

        

                // Return the staff details
                return response()->json([
                    'status' => true,
                    'staff' => $staff,
                ], 200); // 200 OK
            }

            // If no employee number is provided, return all staff
            $allStaff = Staff::all();

        

            return response()->json([
                'status' => true,
                'staff' => $allStaff,
            ], 200); // 200 OK

        } catch (\Exception $e) {
            // Log the error for debugging (optional)
            Log::error('Error fetching staff: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching staff details. Please try again later.',
                'error' => $e->getMessage(), // Optionally include this in dev/debug mode, but not in production
            ], 500); // 500 Internal Server Error
        }
    }


    /**
     * Update staff details (Date of Birth and ID Photo).
     *
     * @param Request $request
     * @param string $employee_number
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStaff(Request $request, $employee_number)
    {
        // Log the request data for debugging
        Log::info('Request data: ', $request->all());

        try {
            // Find the staff member by employee number
            $staff = Staff::where('employee_number', $employee_number)->first();

            // Return a 404 response if the staff member is not found
            if (!$staff) {
                return response()->json([
                    'success' => false,
                    'message' => 'Staff member not found.',
                ], 404);
            }

            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'dob' => 'nullable|date|date_format:Y-m-d', // ISO 8601 standard date
                'id_photo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', // Max size 2MB for ID photo
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                ], 422); // 422 Unprocessable Entity
            }

            // Update Date of Birth if provided
            if ($request->has('dob')) {
                $staff->dob = $request->dob;
            }

            // Update ID Photo if provided
            if ($request->hasFile('id_photo')) {
                $file = $request->file('id_photo');

                // Check if the file is valid
                if ($file->isValid()) {
                    $idPhotoBase64 = base64_encode(file_get_contents($file));
                    $staff->id_photo = $idPhotoBase64; // Update the staff member's ID photo
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Uploaded ID photo is invalid.',
                    ], 422); // 422 Unprocessable Entity
                }
            }

            // Save the updated staff information
            $staff->save();

            return response()->json([
                'success' => true,
                'message' => 'Staff details updated successfully.',
                'staff' => $staff,
            ], 200); // 200 OK

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Staff update error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating staff details. Please try again later.',
            ], 500); // 500 Internal Server Error
        }
    }


}
