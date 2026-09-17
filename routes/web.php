<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// JSON API кабинета: сессионная аутентификация, CSRF-токен из <meta name="csrf-token">.
Route::middleware('auth')->prefix('api/profile')->controller(ProfileController::class)->group(function () {
    Route::get('/', 'show');
    Route::put('/name', 'updateName');
    Route::put('/email', 'updateEmail');
    Route::put('/password', 'updatePassword');
    Route::post('/email/verification', 'sendVerificationCode')->middleware('throttle:3,1');
    Route::post('/email/verification/confirm', 'confirmVerificationCode')->middleware('throttle:10,1');
});

// Остальные URL обрабатывает Vue Router.
Route::middleware('auth')->get('/{any?}', fn () => view('app'))
    ->where('any', '^(?!api|build|images|login|logout).*$');
