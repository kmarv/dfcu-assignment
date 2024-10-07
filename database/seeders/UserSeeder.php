<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Adjust this import if your User model is in a different namespace

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin User', // Change this to the desired name
            'role' => 1,            // Assuming 'role' is an integer in the users table
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'), // Ensure you set a password; bcrypt is recommended
        ]);
    }
}
