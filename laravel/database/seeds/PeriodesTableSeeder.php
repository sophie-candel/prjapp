<?php

use Illuminate\Database\Seeder;

class PeriodesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('periodes')->insert([ 'annee' => '2017-2018',  'semestre' => 1]);
        DB::table('periodes')->insert([ 'annee' => '2017-2018',  'semestre' => 2]);
        DB::table('periodes')->insert([ 'annee' => '2017-2018',  'semestre' => 3]);
        DB::table('periodes')->insert([ 'annee' => '2017-2018',  'semestre' => 4]);
        DB::table('periodes')->insert([ 'annee' => '2017-2018',  'semestre' => 5]);
        DB::table('periodes')->insert([ 'annee' => '2018-2019',  'semestre' => 1]);
        DB::table('periodes')->insert([ 'annee' => '2018-2019',  'semestre' => 2]);
        DB::table('periodes')->insert([ 'annee' => '2018-2019',  'semestre' => 3]);
        DB::table('periodes')->insert([ 'annee' => '2018-2019',  'semestre' => 4]);
        DB::table('periodes')->insert([ 'annee' => '2018-2019',  'semestre' => 5]);
    }
}
