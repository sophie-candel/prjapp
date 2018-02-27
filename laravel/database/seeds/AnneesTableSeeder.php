<?php

use Illuminate\Database\Seeder;

class AnneesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('annees')->insert([ 'nom' => '2016-2017',]);
        DB::table('annees')->insert([ 'nom' => '2017-2018',]);
    }
}
