<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Request;
// use GuzzleHttp\Psr7\Request;


class GoogleAuthController extends Controller
{
    // Redirect user to Google login page
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle callback from Google
    public function handleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Cari user berdasarkan email
            $user = User::where('email', $googleUser->getEmail())->first();

            // Jika user tidak ditemukan, buat user baru
            if (!$user) {
                return redirect('/login')->with('error', 'account does not exist!');
            }

            // Login user
            Auth::login($user);

            // Redirect to the dashboard
            return redirect('/home')->with('success', 'Successfully logged in with Google!');
            // \Log::info('Session data:', session()->all());

        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Failed to log in with Google, please try again!');
        }
    }
}
