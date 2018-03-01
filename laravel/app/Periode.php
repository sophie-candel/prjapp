<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    public function etudiants() {
        return $this->belongsToMany('App\Etudiant', 'inscriptions');
    }

    public function formations() {
        return $this->belongsToMany('App\Formation', 'inscriptions');
    }
}
