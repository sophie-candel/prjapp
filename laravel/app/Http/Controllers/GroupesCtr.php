<?php

namespace App\Http\Controllers;


use App\Groupe;
//use App\Etudiant;
use Illuminate\Http\Request;

class GroupesCtr extends Controller
{
    function index(){
        // $groupes = Groupe::all();
        // return $groupes;

           

        $grp = Groupe::with('etudiants')->get();
        return $grp;

    }
}
