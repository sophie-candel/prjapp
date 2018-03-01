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
        $this->call(EtudiantsTableSeeder::class);
        $this->call(GroupesTableSeeder::class);
        $this->call(EtudiantsGroupesTableSeeder::class);
        $this->call(PeriodesTableSeeder::class);
        $this->call(InscriptionsTableSeeder::class);
    }
}
