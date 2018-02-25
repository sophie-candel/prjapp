<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    public function formations() {
        return $this->hasMany('App\Formation');
    }
}
