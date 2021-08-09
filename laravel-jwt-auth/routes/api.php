<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
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
	Route::get('/', [AuthController::class, 'home']);
	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/register', [AuthController::class, 'register']);
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::post('/forgot', [AuthController::class, 'forgotPassword']);
	Route::post('/refresh', [AuthController::class, 'refresh']);
	Route::get('/user-profile', [AuthController::class, 'userProfile']);
	//TODO log in user when registered and show verify email view
	Route::get('/email/verify', [AuthController::class, 'verifyEmail'])->name('verification.notice');
	Route::post('/email/verify/resend', function (Request $request) {
		$request->user()->sendEmailVerificationNotification();
		return back()->with('message', 'Verification link sent!');
	})->middleware(['throttle:6,1'])->name('verification.send');
});

// Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware(['signed'])->name('verification.verify');
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
	->middleware(['signed', 'throttle:6,1'])
	->name('verification.verify');

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

Route::group([
	'middleware' => 'api',
	'prefix' => 'task'
], function($router){
	Route::post('/add', [TaskController::class, 'store']);
	Route::get('/list', [TaskController::class, 'getList']);
	Route::delete('/{id}', [TaskController::class, 'destroy']);
	Route::put('/update', [TaskController::class, 'update']);
});