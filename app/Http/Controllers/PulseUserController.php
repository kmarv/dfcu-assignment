<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PulseUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PulseUserController extends Controller
{
    /**
     * Store a newly created user in the Pulse database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        try {
            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'userName' => 'required|string|max:255|unique:pulse_users,userName',
                'password' => 'required|string|min:8',
            ]);

            // Check if validation fails
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
            }

            // Create the user
            $user = PulseUser::create([
                'userName' => $request->userName,
                'password' => Hash::make($request->password),
            ]);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $th) {
            Log::error($th);
            return response()->json(['error' => 'Error Occurred']);
        }
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function pulseLogin(Request $request)
    {
        // Validate the input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user with username and password
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info($user);

            session(['user_id' => $user->id]); 

            // Check if the user has the required role or status
            // Compare role as a string
            if ($user->role === "1") { // Use string comparison
                // Authentication passed, redirect to Pulse dashboard
                return redirect()->intended('/pulse');
            } else {
                // Log out the user and redirect to login with error
                Auth::logout();
                return redirect()->back()->withErrors([
                    'email' => 'You do not have permission to access this application.',
                ]);
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }


    public function logout(Request $request)
    {
        Auth::logout();

        // Redirect to login page after logout
        return redirect()->route('pulseLogin');
    }


    public function storeUser(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
         User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'role'=> 1,
            'password' => Hash::make($validatedData['password']),
        ]);

        // Redirect to a specific page or show a success message
        return redirect()->route('user.create')->with('success', 'User created successfully!');
    }
}
