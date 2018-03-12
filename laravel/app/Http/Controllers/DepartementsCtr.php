<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Departement;
use Illuminate\Http\Request;

class DepartementsCtr extends Controller
{
    function index() {
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

            $departements = Departement::with('formations', 'formations.periodes')
            ->get();

            $formations = \DB::table('formations')
            ->select(
                'formations.id as id_for',
                'formations.nom as nom_for'
            )
            ->join ('departements', 'formations.departement_id', '=', 'departements.id')
            ->get();

            $periodes = \DB::table('periodes')
            // ->select(
            //     'periodes.id as id_periode',
            //     'periodes.annee as annee',
            //     'periodes.semestre as semestre'
            // )
            ->selectRaw('CONCAT(annee, \' S\', semestre) AS periode, periodes.id AS id_periode')
            ->join ('formations_periodes', 'periodes.id', '=', 'formations_periodes.periode_id')
            ->join ('formations', 'formations_periodes.formation_id', '=', 'formations.id')
            //->distinct()
            ->orderBy('id_periode', 'DESC')->first();
            // ->get();

            $result = [
                'departements'  => $departements,
                //'formations' => $formations,
                'periodes' => $periodes
            ];

            return $result;

    }

   
}

