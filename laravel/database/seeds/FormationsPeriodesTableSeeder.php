<?php

use Illuminate\Database\Seeder;

class FormationsPeriodesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formations_periodes')->insert([ 'formation_id' => 1, 'periode_id' => 1,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 1, 'periode_id' => 2,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 2, 'periode_id' => 3,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 2, 'periode_id' => 4,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 3, 'periode_id' => 5,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 4, 'periode_id' => 1,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 4, 'periode_id' => 2,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 5, 'periode_id' => 3,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 5, 'periode_id' => 4,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 6, 'periode_id' => 5,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 7, 'periode_id' => 5,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 8, 'periode_id' => 1,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 8, 'periode_id' => 2,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 9, 'periode_id' => 3,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 9, 'periode_id' => 4,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 10, 'periode_id' => 5,]);

        DB::table('formations_periodes')->insert([ 'formation_id' => 1, 'periode_id' => 6,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 1, 'periode_id' => 7,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 2, 'periode_id' => 8,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 2, 'periode_id' => 9,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 3, 'periode_id' => 10,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 4, 'periode_id' => 6,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 4, 'periode_id' => 7,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 5, 'periode_id' => 8,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 5, 'periode_id' => 9,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 6, 'periode_id' => 10,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 7, 'periode_id' => 10,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 8, 'periode_id' => 6,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 8, 'periode_id' => 7,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 9, 'periode_id' => 8,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 9, 'periode_id' => 9,]);
        DB::table('formations_periodes')->insert([ 'formation_id' => 10, 'periode_id' => 10,]);
    }
}
