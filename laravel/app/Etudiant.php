<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    public function groupe() {
        return $this->belongsToMany('App\Groupe', 'etudiants_groupes');
    }
}
