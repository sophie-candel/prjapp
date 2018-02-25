<?php

use Illuminate\Database\Seeder;

class DepartementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('departements')->insert([ 'nom' => 'MMI', 'couleur' => '#8ad562',]);
        DB::table('departements')->insert([ 'nom' => 'QLIO', 'couleur' => '#00a6ea',]);
        DB::table('departements')->insert([ 'nom' => 'GEII', 'couleur' => '#ff4813',]);
    }
}
