<?php

use Illuminate\Database\Seeder;

class AnneesFormationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 1]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 2]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 3]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 4]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 5]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 6]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 7]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 8]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 9]);
        DB::table('annees_formations')->insert([ 'annee_id' => 2, 'formation_id' => 10]);
    }
}
