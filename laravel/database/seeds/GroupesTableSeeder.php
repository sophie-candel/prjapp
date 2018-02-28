<?php

use Illuminate\Database\Seeder;

class GroupesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groupes')->insert([ 'nom' => 'DWEB','formation_id' => 3,]);
        DB::table('groupes')->insert([ 'nom' => 'CREAVI', 'formation_id' => 3,]);
        DB::table('groupes')->insert([ 'nom' => 'VIDNUM', 'formation_id' => 3,]);
    }
}
