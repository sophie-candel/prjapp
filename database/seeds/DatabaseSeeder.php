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
        $this->call(AnneesTableSeeder::class);
        $this->call(DepartementsTableSeeder::class);
        $this->call(FormationsTableSeeder::class);
        $this->call(GroupesTableSeeder::class);
        $this->call(EtudiantsTableSeeder::class);
        $this->call(SemestresTableSeeder::class);
        $this->call(EtudiantsGroupesTableSeeder::class);
        $this->call(GroupesSemestresTableSeeder::class);
        $this->call(AnneesSemestresTableSeeder::class);
        $this->call(AnneesFormationsTableSeeder::class);
    }
}
