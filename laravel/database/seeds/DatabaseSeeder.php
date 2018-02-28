<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DepartementsTableSeeder::class);
        $this->call(FormationsTableSeeder::class);
        $this->call(GroupesTableSeeder::class);
        $this->call(EtudiantsTableSeeder::class);
        $this->call(InscriptionsTableSeeder::class);
    }
}
