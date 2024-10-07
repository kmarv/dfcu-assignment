<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PulseUserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pulse', function () {
    return view('vendor.pulse.dashboard');
});
Route::get('/', function () {
    return view('auth.login');
});

Route::get('/pulseLogin', [PulseUserController::class, 'showLoginForm'])->name('pulseLogin');
Route::post('/pulseLogin', [PulseUserController::class, 'pulseLogin']);
Route::post('/logout', [PulseUserController::class, 'logout'])->name('logout');

