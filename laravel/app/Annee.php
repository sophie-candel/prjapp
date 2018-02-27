<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Annee extends Model
{
    public function formations() {
        return $this->belongsToMany('App\Formation');
    }

    public function semestres() {
        return $this->belongsToMany('App\Semestre', 'annees_semestres');
    }
}
