<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Semestre extends Model
{
    public function annee() {
        return $this->belongsToMany('App\Annee');
    }
    public function groupe() {
        return $this->belongsToMany('App\Groupe');
    }
}
