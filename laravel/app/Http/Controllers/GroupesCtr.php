<?php

namespace App\Http\Controllers;


use App\Groupe;
//use App\Etudiant;
use Illuminate\Http\Request;

class GroupesCtr extends Controller
{
    function index(){
        return Groupe::all();
    }
}
