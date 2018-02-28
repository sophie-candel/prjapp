<?php

namespace App\Http\Controllers;

use App\Inscription;
use Illuminate\Http\Request;

class InscriptionsCtr extends Controller
{
    function index(){
        return Inscription::all();
    }

    public function trombi() {
        

        // ETUDIANTS
        $etu = \DB::table('etudiants')
        ->select(
            'etudiants.id as id',
            'etudiants.nom as nom',
            'etudiants.prenom as prenom',
            'etudiants.alternant as alternant',
            'etudiants.mail as mail',
            'etudiants.photo as photo',
            'etudiants.pre_diplome as pre_diplome')
        
        ->join('etudiants', 'inscriptions.etudiant_id', '=', 'etudiants.id')
        
        // ->where('semestres.id', '=', 5)
        // ->where('annees.id', '=', $id_annee)
        
        //->where('formations.id', '=', $id_formation)
        ->orderBy('nom')
        
        ->get();
        
        
        // LISTE ANNEES, SEMESTRES, GROUPES
        // $annees     = Annee::all();
        // $semestres  = Semestre::all();
        // $groupes    = Groupe::all();

        // $result = [
        //     'formation'     => $for_actuelle,
        //     'etudiants'   => $etu,
        //     'annees'        => $annees,
        //     'semestres'     => $semestres,
        //     'groupes'       => $groupes
        // ];
        return $etu;
    }
}
