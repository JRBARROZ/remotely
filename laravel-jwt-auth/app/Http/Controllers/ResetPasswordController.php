<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
	function resetPassword (Request $request) {
		$request->validate([
			'token' => 'required',
			'email' => 'required|email',
			'password' => 'required|min:6|confirmed',
		]);
		echo "request " . ($request->token);
		$status = Password::reset(
			$request->only('email', 'password', 'password_confirmation', 'token'),
			function ($user, $password) {
				$user->forceFill([
						'password' => bcrypt($password)
				])->setRememberToken(Str::random(60));

				$user->save();

				event(new PasswordReset($user));
			}
		);

		return $status === Password::PASSWORD_RESET
			? response()->json(['message' => 'success'], 200)
			: response()->json(['email' => [__($status)]], 400);
	}

	function sendPasswordResetLink (Request $request) {
		$request->validate(['email' => 'required|email']);
	
		$status = Password::sendResetLink(
			$request->only('email')
		);
	
		return $status === Password::RESET_LINK_SENT
			? response()->json(['message' => 'E-mail de recuperação de senha enviado!', 'user' => $request->email], 202)
			: response()->json(['message' => 'Usuário não encontrado'], 400);
	}
}
