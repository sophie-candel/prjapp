<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    public function etudiants() {
        return $this->belongsToMany('App\Etudiant');
    }

    public function groupes() {
        return $this->belongsToMany('App\Groupe');
    }

}
