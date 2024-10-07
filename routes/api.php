<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthCodeController;
use App\Http\Controllers\StaffController;
use App\Models\Staff;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']);
    Route::middleware('auth:api')->get('user', [AuthController::class, 'getUser']);
});

Route::post('/auth-code/generate', [AuthCodeController::class, 'generateAndSendCode'])->middleware('auth:api');

Route::middleware('auth:api')->prefix('staff')->group(function () {
    Route::post('/register', [StaffController::class, 'register']);
    Route::get('/', [StaffController::class, 'getStaff']);
    Route::put('/{employee_number}', [StaffController::class, 'updateStaff']);
});
