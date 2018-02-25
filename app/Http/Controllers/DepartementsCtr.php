<?php

namespace App\Http\Controllers;

use App\Departement;
use Illuminate\Http\Request;

class DepartementsCtr extends Controller
{
    function index() {
        $departements = Departement::with('formations')->get();
        return $departements;
    }
}

