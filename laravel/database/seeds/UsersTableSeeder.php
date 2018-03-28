<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([ 'username' => 'Admin',  'password' => Hash::make('secret'), 'niveau' => 1]);
        DB::table('users')->insert([ 'username' => 'Utilisateur',  'password' => Hash::make('secret'), 'niveau' => 0]);
    }
}
