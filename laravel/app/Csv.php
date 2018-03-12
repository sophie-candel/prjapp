<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Csv extends Model
{
    public $fillable = ['nom', 'prenom', 'alternant', 'mail', 'photo', 'pre_diplome'];
}
