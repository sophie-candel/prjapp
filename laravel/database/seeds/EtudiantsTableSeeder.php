<?php

use Illuminate\Database\Seeder;

class EtudiantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('etudiants')->insert([ 'nom' => 'Antenat', 'prenom' => 'Laetitia', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Besse', 'prenom' => 'Kevin', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Billy', 'prenom' => 'Edouard', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Bleger', 'prenom' => 'Yann', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Bouyer', 'prenom' => 'Marcelin', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Buchart', 'prenom' => 'Tiphaine', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Candel', 'prenom' => 'Sophie', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Cosson', 'prenom' => 'Pierre-Louis', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Crochot', 'prenom' => 'Nolan', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Di Gregorio', 'prenom' => 'Justine', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Dietrich', 'prenom' => 'Arnaud', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Erbida', 'prenom' => 'Anthea', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Feidt', 'prenom' => 'Raphaël', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Ferreira', 'prenom' => 'Thomas', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Fischer', 'prenom' => 'Cyril', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Fritsch', 'prenom' => 'Lisa', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Fuchs', 'prenom' => 'Cyrielle', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Genevois', 'prenom' => 'Valentin', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Haas', 'prenom' => 'Arnaud', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Heinis', 'prenom' => 'Dylane', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Hoffmann', 'prenom' => 'Paul', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Holz', 'prenom' => 'Cyndy', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Kocher', 'prenom' => 'Hélène', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Lamane', 'prenom' => 'Noemi', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Leininger', 'prenom' => 'Tiphaine', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Lima', 'prenom' => 'Patrick', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Louis', 'prenom' => 'Robin', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Mesini', 'prenom' => 'Emma', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Meyer', 'prenom' => 'Alexia', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Ostermann', 'prenom' => 'Alexis', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Perea', 'prenom' => 'Gauthier', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Peslier', 'prenom' => 'Lucien', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Pozza', 'prenom' => 'Axel', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Quatrelivre', 'prenom' => 'Antoine', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Scarlatella', 'prenom' => 'Mathieu', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Schlagdenhaufen', 'prenom' => 'Marie', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Schotter', 'prenom' => 'Florian', 'alternant' => false, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Seme', 'prenom' => 'Mael-Thi', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Stohr', 'prenom' => 'Dominique', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Thirion', 'prenom' => 'Anthony', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
        DB::table('etudiants')->insert([ 'nom' => 'Tischmacher', 'prenom' => 'Virginie', 'alternant' => true, 'mail' => 'etu@mail.fr', 'photo' => 'etu.png', 'pre_diplome' => 'DUT MMI',]);
    }
}
