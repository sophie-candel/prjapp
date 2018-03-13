<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Departement;
use Illuminate\Http\Request;

class DepartementsCtr extends Controller {

    private function getPeriode($departements) {
        
        // retourne l'année scolaire en cours
        function getCurrentYear() {
            $first_semestre_start  = 9;
            $month = date('n'); // 1..12
            $year = date('Y'); // année actuelle

            // si on est après spetembre dans l'année
            if ($month >= $first_semestre_start) {
                return $year . '-' . ($year + 1);
            } else {
                return ($year - 1) . '-' . $year;
            }
        }
        getCurrentYear();

        // enlève toutes les périodes inutiles
        function cleanPeriodes($array) {
            $currentYear = getCurrentYear();
            $month = date('n'); // 1..12

            // pour tester sur les semestres
            $isSemestreOk = true;
            if (isset($array->semestre)) {
                if ($month >= $first_semestre_start) {
                $isSemestreOk = (($array->semestre) % 2 == 1); // semestre impair
                } else {
                $isSemestreOk = (($array->semestre) % 2 == 0); // semestre pair
                }
            }

            // s'il y a bien une année définie, et si elle correspond à l'année courante
            // et si le semestre est bon, alors on garde la période; sinon on retire
            return isset($array->annee) && ($array->annee == $currentYear) && $isSemestreOk;  
        }
        cleanPeriodes($departements);

        function currentPeriode($departements) {

            // si le JSON est vide, on sort de la fonction
            if (empty($departements)) {
                return null;
            }
            
            // on parcourt chaque département
            foreach ($departements as $dep) {
                if (isset($departement->formations)) {
                // on parcourt chaque formation
                    foreach ($dep->formations as $key => $formation) {
                        $delete = false; // permettra de savoir s'il faut la supprimer à la fin
                        if (isset($formation->periodes) && is_array($formation->periodes)) {

                        // on récupère un array avec la/les bonnes périodes; et on reset les index
                        $periodes = array_values(array_filter($formation->periodes, "cleanPeriodes"));

                        if (count($periodes) > 0 && isset($periodes[0]->id)) {
                            $formation->periode = $periodes[0]->id;
                        } else {
                            $delete = true; // pas de période courante, on retire de la listes
                        }
                        unset($formation->periodes); // on enlève le tableau des périodes
                        } else {
                        $delete = true; // pas de période dispo; on supprime de la liste
                        }
                        // si on doit supprimer la formation...
                        if ($delete) unset($dep->formations[$key]);
                    }
                }
            }

            return $departements;
        }

        $json = json_decode($departements);
        $result = currentPeriode($json);
    }



    public function index() {
        $departements = Departement::with('formations', 'formations.periodes')
        ->get();
        return $this->getPeriode($departements);
        //return $departements;

        //$departements = \DB::table('departements')
        // ->select(
        //     'departements.id as id',
        //     'departements.nom as nom',
        //     'departements.couleur as couleur', 
        //     'formations.id as id_formation',
        //     'formations.nom as nom_formation',
        //     'periodes.id as id_periode'
        // )
        // ->join ('formations', 'departements.id', '=', 'formations.departement_id')
        // ->join ('formations_periodes', 'formations.id', '=', 'formations_periodes.formation_id')
        // ->join ('periodes', 'formations_periodes.periode_id', '=', 'periodes.id')
        // ->get();
        
        // $now = Carbon::now();
        // $year = $now->year;
        // $month = $now->month;
        // $result = [
        //     'departements'  => $departements,
        //     'periode' => $now,
        //     'année' => $year,
        //     'mois' => $month
        // ];

        // $departements = Departement::with('formations', 'formations.periodes')
        // ->get();
        // return $departements;
            //$departements = Departement::all();

            // $formations = \DB::table('formations')
            // ->select(
            //     'formations.id as id_for',
            //     'formations.nom as nom_for'
            // )
            // ->join ('departements', 'formations.departement_id', '=', 'departements.id')
            // ->get();

            // $periodes = \DB::table('periodes')
            // // ->select(
            // //     'periodes.id as id_periode',
            // //     'periodes.annee as annee',
            // //     'periodes.semestre as semestre'
            // // )
            // ->selectRaw('CONCAT(annee, \' S\', semestre) AS periode, periodes.id AS id_periode')
            // ->join ('formations_periodes', 'periodes.id', '=', 'formations_periodes.periode_id')
            // ->join ('formations', 'formations_periodes.formation_id', '=', 'formations.id')
            // //->distinct()
            // ->orderBy('id_periode', 'DESC')->first();
            // // ->get();

            // $result = [
            //     'departements'  => $departements,
            //     //'formations' => $formations,
            //     'periodes' => $periodes
            // ];

            //return $result;
    }
}




