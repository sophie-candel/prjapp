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

    public function groupes() {
        return $this->belongsToMany('App\Groupe', 'etudiants_groupes');
    }

    public function formations() {
        return $this->belongsToMany('App\Formation', 'inscriptions');
    }

    public function periodes() {
        return $this->belongsToMany('App\Periode', 'inscriptions');
    }
}
