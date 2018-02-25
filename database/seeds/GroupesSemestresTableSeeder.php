<?php

use Illuminate\Database\Seeder;

class GroupesSemestresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groupes_semestres')->insert([ 'groupe_id' => 1, 'semestre_id' => 5]);
        DB::table('groupes_semestres')->insert([ 'groupe_id' => 2, 'semestre_id' => 5]);
        DB::table('groupes_semestres')->insert([ 'groupe_id' => 3, 'semestre_id' => 5]);
    }
}
