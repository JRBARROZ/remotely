<?php

namespace App\Http\Controllers;

use App\Models\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
	public function index()
	{
		return User::all();
	}

	public function store(Request $request)
	{
		User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => sha1($request->password),
		]);
	}

	public function update(Request $request, $id)
	{
		$user = User::find($id);
		$user->name = $request->name;
		$user->email = $request->email;

		$user->save();

	}

	public function remove($id)
	{
		$user = User::find($id);
		echo 'user: ' . $user;
		// if ($user) $user->delete();
		$user->delete();

		return response()->json([
			'message' => 'Usuário removido com sucesso!'
		]);
	}

	/**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
