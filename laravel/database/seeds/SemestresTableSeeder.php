<?php

use Illuminate\Database\Seeder;

class SemestresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('semestres')->insert([ 'nom' => 'Semestre 1',]);
        DB::table('semestres')->insert([ 'nom' => 'Semestre 2',]);
        DB::table('semestres')->insert([ 'nom' => 'Semestre 3',]);
        DB::table('semestres')->insert([ 'nom' => 'Semestre 4',]);
        DB::table('semestres')->insert([ 'nom' => 'Semestre 5',]);
    }
}
