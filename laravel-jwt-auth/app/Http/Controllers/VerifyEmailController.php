<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use App\Models\User;

class VerifyEmailController extends Controller
{
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke(Request $request)
	{
		$user = User::find($request->route('id'));

		if ($user->hasVerifiedEmail()) {
			return response()->json(['message' => 'email already verified'], 200);
		}

		if ($user->markEmailAsVerified()) {
			event(new Verified($user));
		}

		return redirect('http://localhost:8080/#/email/verify/middleware?token=' . $request->route('hash'));
	}

	public function hasEmailVerified(Request $request) {
		$users = User::all();
		$verifiedAt = null;

		foreach ($users as $user) {
			if (sha1($user->email) == $request->query('email')) {
				$verifiedAt = $user->email_verified_at;
				break;
			}
		}

		if($verifiedAt != null) {
			return $user->email_verified_at != null 
			?	response()->json(['hasEmailVerified' => true], 200)
			: response()->json(['hasEmailVerified' => false], 400);
		}
		return response()->json(['message' => 'user not found'], 404);
	}
}
