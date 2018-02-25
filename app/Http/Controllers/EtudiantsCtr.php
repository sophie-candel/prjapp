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

    public function trombi()
    {
        $etu = Etudiant::with('groupe')
        
            // ->join('etudiants_groupes', 'etudiants.id', '=', 'etudiants_groupes.etudiant_id')
            // ->join('groupes', 'etudiants_groupes.groupe_id', '=', 'groupes.id')
            // ->join('groupes_semestres', 'groupes.id', '=', 'groupes_semestres.groupe_id')
            // ->join('semestres', 'groupes_semestres.semestre_id', '=', 'semestres.id')
            // ->join('annees_semestres', 'semestres.id', '=', 'annees_semestres.semestre_id')
            // ->join('annees', 'annees_semestres.annee_id', '=', 'annees.id')
            // ->join('annees_formations', 'annees.id', '=', 'annees_formations.annee_id')
            // ->join('formations', 'annees_formations.formation_id', '=', 'formations.id')
            // ->where('annees.nom', '=', date('Y'))
            // ->where('annees.nom', '=', '2017-2018')
            // ->select(
            //     'etudiants.id as id',
            //     'etudiants.nom as nom',
            //     'etudiants.prenom as prenom',
            //     'groupe.id as groupe_id',
            //     'groupe.nom as groupe')
            //->distinct()
            ->get();

        $for = Formation::query()
            // ->select(
            //     'formations.id as id_for',
            //     'formations.nom as nom')
            // ->distinct()
            ->get();

        $dep = Departement::query()->get();

        $result = [
            'departement' => $dep,
            'formation' => $for,
            'etudiants' => $etu
        ];

        //dd($etu);
        //$annee = date('Y');
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
