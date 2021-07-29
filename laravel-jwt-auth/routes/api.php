<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProjectController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/forgot', [AuthController::class, 'forgotPassword']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

// Route::resource('organization', OrganizationController::class);

Route::group([
    'middleware' => 'api',
    'prefix' => 'organization'
], function($router){
    Route::post('/add', [OrganizationController::class, 'store']);
    Route::get('/list', [OrganizationController::class, 'getList']);
    Route::delete('/{id}', [OrganizationController::class, 'destroy']);
    Route::put('/update', [OrganizationController::class, 'update']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'project'
], function($router){
    Route::post('/add', [ProjectController::class, 'store']);
    Route::get('/list', [ProjectController::class, 'getList']);
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
    Route::put('/update', [ProjectController::class, 'update']);
});