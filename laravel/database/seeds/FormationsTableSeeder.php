<?php

use Illuminate\Database\Seeder;

class FormationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formations')->insert([ 'nom' => 'DUT MMI 1', 'departement_id' => 1,]);
        DB::table('formations')->insert([ 'nom' => 'DUT MMI 2', 'departement_id' => 1,]);
        DB::table('formations')->insert([ 'nom' => 'LP TAIS', 'departement_id' => 1,]);
        DB::table('formations')->insert([ 'nom' => 'DUT QLIO 1', 'departement_id' => 2,]);
        DB::table('formations')->insert([ 'nom' => 'DUT QLIO 2', 'departement_id' => 2,]);
        DB::table('formations')->insert([ 'nom' => 'LP LPI', 'departement_id' => 2,]);
        DB::table('formations')->insert([ 'nom' => 'LP MEQ', 'departement_id' => 2,]);
        DB::table('formations')->insert([ 'nom' => 'DUT GEII 1', 'departement_id' => 3,]);
        DB::table('formations')->insert([ 'nom' => 'DUT GEII 2', 'departement_id' => 3,]);
        DB::table('formations')->insert([ 'nom' => 'LP SERI', 'departement_id' => 3,]);
    }
}
