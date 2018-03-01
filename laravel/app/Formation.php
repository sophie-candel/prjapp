<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    public function departement() {
        return $this->belongsTo('App\Departement');
    }

    

    public function groupes() {
        return $this->hasMany('App\Groupe');
    }


    public function etudiants() {
        return $this->belongsToMany('App\Etudiant', 'inscriptions');
    }
}
