<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    // public function semestre() {
    //     return $this->belongsToMany('App\Semestre');
    // }

    // public function etudiants() {
    //     return $this->belongsToMany('App\Etudiant', 'etudiants_groupes');
    // }

    public function inscriptions() {
        return $this->belongsToMany('App\Inscription');
    }

    public function formations() {
        return $this->belongsTo('App\Formation');
    }
}
