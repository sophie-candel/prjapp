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
        DB::table('groupes')->insert([ 'nom' => 'DWEB',]);
        DB::table('groupes')->insert([ 'nom' => 'CREAVI',]);
        DB::table('groupes')->insert([ 'nom' => 'VIDNUM',]);
    }
}
