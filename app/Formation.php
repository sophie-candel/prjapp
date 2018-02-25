<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    public function departement() {
        return $this->belongsTo('App\Departement');
    }

    public function annee() {
        return $this->belongsToMany('App\Annee');
    }
}
