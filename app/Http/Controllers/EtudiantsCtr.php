<?php

namespace App\Http\Controllers;

use App\Etudiant;
use App\Annee;
use App\Semestre;
use App\Departement;
use App\Formation;
use App\Groupe;
use Illuminate\Http\Request;

class EtudiantsCtr extends Controller
{
    function index(){
        return Etudiant::all();

        $query = Etudiant::getQuery();

        if (request()->has('groupe_id')) {
            $groupeId = request()->get('groupe_id');
            $query->whereHas('groupes', function ($query) use($groupeId){
                $query->where('id', $groupeId);
            });
        }
        return $query->all();
    }

    public function trombi($formation, $annee, $semestre)
    {
        $etu = \DB::table('etudiants')
        ->select(
            'etudiants.id as id',
            'etudiants.nom as nom',
            'etudiants.prenom as prenom',
            'etudiants.alternant as alternant',
            'etudiants.mail as mail',
            'etudiants.photo as photo',
            'etudiants.pre_diplome as pre_diplome',
            'groupes.nom as groupe')
        //GROUPE
        ->join('etudiants_groupes', 'etudiants.id', '=', 'etudiants_groupes.etudiant_id')
        //SEMESTRE
        ->join('groupes', 'etudiants_groupes.groupe_id', '=', 'groupes.id')
        ->join('groupes_semestres', 'groupes.id', '=', 'groupes_semestres.groupe_id')
        ->join('semestres', 'groupes_semestres.semestre_id', '=', 'semestres.id')
        ->where('semestres.nom', '=', $semestre)
        //ANNEE
        ->join('annees_semestres', 'semestres.id', '=', 'annees_semestres.semestre_id')
        ->where('annees.nom', '=', $annee)
        //FORMATION
        ->join('annees', 'annees_semestres.annee_id', '=', 'annees.id')
        ->join('annees_formations', 'annees.id', '=', 'annees_formations.annee_id')
        //NOM FORMATION
        ->join('formations', 'annees_formations.formation_id', '=', 'formations.id')
        ->where('formations.nom', '=', $formation)

        ->distinct()
        ->get();

        //pour permettre les choix utilisateurs
        $for = Formation::all();
        $dep = Departement::all();
        $annees = Annee::all();
        $semestres = Semestre::all();
        $groupes = Groupe::all();


        $dep_actuel = \DB::table('departements')
        ->join('formations', 'formations.departement_id', '=', 'departements.id')
        ->where('formations.nom', '=', $formation)
        ->get();
      
        $result = [
            'departement' => $dep,
            'formation'   => $for,
            'etudiants'   => $etu,
            'annees'      => $annees,
            'semestres'   => $semestres,
            'groupes'     => $groupes,
            'dep_actuel'  => $dep_actuel
        ];

        return $result;

    }



    function show($id){
        return Etudiant::findOrFail($id);
    }

    public function store()
    {
        // $etudiant = $request->isMethod('put') ? Etudiant::findOrFail($id) : new Etudiant;

        // $etudiant->nom = $request->input('nom');
        // $etudiant->prenom = $request->input('prenom');
        // $etudiant->alternant = $request->input('alternant');
        // $etudiant->mail = $request->input('mail');
        // $etudiant->photo = $request->input('photo');
        // $etudiant->pre_diplome = $request->input('pre_diplome');

        // if($etudiant->save()){
        //     return $etudiant;
        // }
    }

    // function update(Request $request){
    //     $etudiant = Etudiant::findOrFail($id);

    //     $etudiant->nom = $request->input('nom');
    //     $etudiant->prenom = $request->input('prenom');
    //     $etudiant->alternant = $request->input('alternant');
    //     $etudiant->mail = $request->input('mail');
    //     $etudiant->photo = $request->input('photo');
    //     $etudiant->pre_diplome = $request->input('pre_diplome');

    //     if($etudiant->save()){
    //         return $etudiant;
    //     }

    // }
    function delete(){

    }
}
