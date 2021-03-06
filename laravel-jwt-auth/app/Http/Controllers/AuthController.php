<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
	/**
	 * Create a new AuthController instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth:api', ['except' => ['login', 'register', 'forgotPassword', 'home']]);
	}

	public function home(Request $request) {

		return response()->json($request->id, 201);
	}

	public function resendEmail(Request $request) {
		$request->user()->sendEmailVerificationNotification();
		return response()->json(['message', 'E-mail de verificação enviado!'], 200);
	}

	/**
	 * Get a JWT via given credentials.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function forgotPassword(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 422);
		}
		$hasUser = User::where('email', '=', $request->email)->count();
		if ($hasUser > 0) {
			return response()->json(["message" => "E-mail sended"], 200);
		} else {
			return response()->json(["message" => "User not found"], 404);
		}
	}

	/**
	 * Get a JWT via given credentials.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 422);
		}

		if (!$token = auth('api')->attempt($validator->validated())) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}
		return $this->createNewToken($token);
	}

	/**
	 * Register a User.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|between:2,100',
			'email' => 'required|string|email|max:100|unique:users',
			'password' => 'required|string|confirmed|min:6',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors()->toJson(), 400);
		}

		$user = User::create(array_merge(
			$validator->validated(),
			['password' => bcrypt($request->password)]
		));
		
		event(new Registered($user));

		return response()->json([
			'message' => 'Usuário registrado com sucesso! Por favor, verifique sua caixa de entrada para validar seu e-mail.',
			'user' => $user
		], 201);
	}
	
	public function sendMail() {
		return response()->json("Por favor, verifique a caixa de entrada do seu e-mail", 200);
	}

	/**
	 * Log the user out (Invalidate the token).
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function logout()
	{
		auth()->logout();

		return response()->json(['message' => 'User successfully signed out']);
	}

	/**
	 * Refresh a token.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function refresh()
	{
		return $this->createNewToken(auth()->refresh());
	}

	/**
	 * Get the authenticated User.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function userProfile()
	{
		return response()->json(auth()->user());
	}

	/**
	 * Get the token array structure.
	 *
	 * @param  string $token
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected function createNewToken($token)
	{
		$user = auth()->user();
		$hasEmailVerified = $user->email_verified_at == NULL ? false : true;
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth()->factory()->getTTL() * 60,
			'has_email_verified' => $hasEmailVerified,
			'user' => auth()->user()
		]);
	}
}