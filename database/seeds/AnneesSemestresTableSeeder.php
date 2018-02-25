<?php

use Illuminate\Database\Seeder;

class AnneesSemestresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('annees_semestres')->insert([ 'annee_id' => 1, 'semestre_id' => 1]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 1, 'semestre_id' => 2]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 1, 'semestre_id' => 3]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 1, 'semestre_id' => 4]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 1, 'semestre_id' => 5]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 2, 'semestre_id' => 1]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 2, 'semestre_id' => 2]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 2, 'semestre_id' => 3]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 2, 'semestre_id' => 4]);
        DB::table('annees_semestres')->insert([ 'annee_id' => 2, 'semestre_id' => 5]);
    }
}
