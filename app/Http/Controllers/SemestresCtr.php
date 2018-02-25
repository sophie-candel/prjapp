<?php

namespace App\Http\Controllers;

use App\Semestre;
use Illuminate\Http\Request;

class SemestresCtr extends Controller
{
    function index(){
        return Semestre::all();
    }
}
