<?php

namespace App\Http\Controllers;

//use Carbon\Carbon;
use App\Departement;
use Illuminate\Http\Request;

class DepartementsCtr extends Controller {

    private $first_semestre_start = 9;

    // retourne l'année scolaire en cours
    private function getCurrentYear() {
        $month = date('n'); // 1..12
        $year = date('Y'); // année actuelle

        // si on est après spetembre dans l'année
        if ($month >= $this->first_semestre_start) {
            return $year . '-' . ($year + 1);
        } else {
            return ($year - 1) . '-' . $year;
        }
    }

    // enlève toutes les périodes inutiles
    private function cleanPeriodes($array) {
        $currentYear = $this->getCurrentYear();
        $month = date('n'); // 1..12
        $isSemestreOk = true;

        // pour tous le semestres sauf le 5
        if (isset($array['semestre']) && $array['semestre'] !=5 ) {
            if ($month >= $this->first_semestre_start) {
                $isSemestreOk = (($array['semestre']) % 2 == 1); // semestre impair
            } else {
                $isSemestreOk = (($array['semestre']) % 2 == 0); // semestre pair
            }
        }

        
        // s'il y a bien une année définie, et si elle correspond à l'année courante
        // et si le semestre est bon, alors on garde la période; sinon on retire
        return isset($array['annee']) && ($array['annee'] == $currentYear) && $isSemestreOk;  
    }
    
    // assigne la période à la formation
    private function getPeriode($departements) {

        // on parcourt chaque département
        foreach ($departements as $depKey => $dep) {
            if (isset($dep['formations'])) {
                // on parcourt chaque formation
                foreach ($dep['formations'] as $formationKey => $formation) {
                    $delete = false; // permettra de savoir s'il faut la supprimer à la fin
                    if (isset($formation['periodes']) && is_array($formation['periodes'])) {

                        // on récupère un array avec la/les bonnes périodes; et on reset les index
                        $periodes = array_values(
                            array_filter($formation['periodes'], [$this, "cleanPeriodes"])
                        );

                        if (count($periodes) > 0 && isset($periodes[0]['pivot']['periode_id'])) {
                            $departements[$depKey]['formations'][$formationKey]['periode'] = $periodes[0]['pivot']['periode_id'];
                        } else {
                            $delete = true; // pas de période courante, on retire de la listes
                        }
                        
                        unset($departements[$depKey]['formations'][$formationKey]['periodes']);
                    } else {
                        $delete = true; // pas de période dispo; on supprime de la liste
                    }
                    // si on doit supprimer la formation...
                    if ($delete) unset($departements[$depKey]['formations'][$formationKey]);
                }
            }
        }

        return $departements;
    }


    public function index() {
        $departements = Departement::with('formations', 'formations.periodes')
        ->get()
        ->toArray(); 

        return $this->getPeriode($departements);
    }
}




