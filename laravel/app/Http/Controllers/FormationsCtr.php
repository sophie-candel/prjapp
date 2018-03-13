<?php

namespace App\Http\Controllers;

use App\Formation;
use App\Departement;
use App\Http\Resources\FormationRsc;
use Illuminate\Http\Request;

class FormationsCtr extends Controller
{
    function index(){
        return Formation::with('departement', 'groupes', 'etudiants', 'periodes')
        ->distinct()
        ->get();   
    }

    function show($id) {
        $formation = Formation::findOrFail($id);
        $departement = Departement::where('id', '=', $formation->departement_id)->get();
        
        $result[] = [
            'formation' => $formation,
            'departement' => $departement
        ];
        return $result;
    }

    // SELECT DISTINCT CONCAT(annee, ' S', semestre) AS periode, id FROM periodes ORDER BY periode;

}
