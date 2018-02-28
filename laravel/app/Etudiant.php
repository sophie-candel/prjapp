<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    // public function groupe() {
    //     return $this->belongsToMany('App\Groupe', 'etudiants_groupes');
    // }

    // public function formations() {
    //     return $this->hasMany('App\Formation');
    // }

    public function inscriptions() {
        return $this->belongsToMany('App\Inscription');
    }
}
