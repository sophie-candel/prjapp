<?php

namespace App\Http\Controllers;

use App\Annee;
use App\Semestre;
use Illuminate\Http\Request;

class AnneesCtr extends Controller
{
    function index(){
        // $annees = Annee::all();
        // $semestres = Semestre::all();

        //$annees->semestre()->sync($semestres);

        // return $annees;

        /////////////////

        // foreach ($annee->semestres as $semestre) {
        //     echo $semestre->pivot->created_at;
        // }


        $annees = Annee::with('semestres')->get();
        return $annees;
    }
}
