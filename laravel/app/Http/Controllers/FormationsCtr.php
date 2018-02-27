<?php

namespace App\Http\Controllers;

use App\Formation;
use App\Departement;
use App\Http\Resources\FormationRsc;
use Illuminate\Http\Request;

class FormationsCtr extends Controller
{
    function index(){
        //$formations = Formation::all();
        //return FormationRsc::collection($formations);
        //return Formation::all();

        return Formation::with('departement')->get();   
    }

    function show($id) {

        // $formation = Formation::query()
        //     ->join('departements', 'formations.id', '=', 'departements.formation_id')
        //     ->get();
        // return $formation;


        //return Formation::findOrFail($id);
        // $departements = Departement::all();
        // $result = [];
        // foreach ($departements as $departement){
        //     $formations = Formation::where('departement_id', '=', $departement->id)->get();
        //     $liste_for = FormationResource::collection($formations);
        //     $result[] = [
        //         'formation' => $formations
        //         'departement_id' => $departement->id,
        //         'nom' => $departement->nom,
        //         'couleur' => $departement->couleur,
        //     ];
        // }
        // return $result;


        $formation = Formation::findOrFail($id);
        $departement = Departement::where('id', '=', $formation->departement_id)->get();
        
        $result[] = [
            'formation' => $formation,
            'departement' => $departement
        ];
        return $result;
    }
}
