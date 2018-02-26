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

        // $query = Etudiant::getQuery();

        // if (request()->has('groupe_id')) {
        //     $groupeId = request()->get('groupe_id');
        //     $query->whereHas('groupes', function ($query) use($groupeId){
        //         $query->where('id', $groupeId);
        //     });
        // }
        // return $query->all();
    }

private function concatGroupes() {
    
  
  $map = []; // dans ce tableau il y a la correspondance entre la clé dans $res et l'identifiant de l'utilisateur
  $res = []; // le tableau de résultat
  $compteur = 0; // un compteur !
  
  // je parcours tous les éléments du tableau (tous les élèves)
  foreach ($students as $student) {
      // si c'est un élève qu'on a déjà vu...
      if (isset($map[$student["id"]])) {
          // ...je lui ajoute le groupe en question
          $res[$map[$student["id"]]]["groups"][] = $student["group"];
      } else {
          // sinon on ajoute l'élève
          $map[$student["id"]] = $compteur;
          $res[$compteur] = $student;
          $res[$compteur]["groups"] = []; // un tableau pour les groupes
          if (isset($student["group"]) && !empty($student["group"])) {
              $res[$compteur]["groups"][] = $student["group"];
          }
          unset($res[$compteur]["group"]); // juste pour éviter de trimbaler un attribut "group" pour la suite	
          $compteur++;
      }
      echo $student["name"];
  }
  
  
  var_dump($res);
}

    public function trombi($id_formation, $id_annee, $id_semestre)
    {
        // DEPARTEMENT
        // $dep_actuel = \DB::table('departements')
        // ->select(
        //     'departements.id as id',
        //     'departements.nom as nom',
        //     'departements.couleur as couleur'
        // )
        // ->join('formations', 'formations.departement_id', '=', 'departements.id')

        // ->where('formations.id', '=', $id_formation)
        // ->get();

        // FORMATION
        $for_actuelle = \DB::table('formations')
        ->select(
            'formations.id as id',
            'formations.nom as nom',
            'departement_id as dep_id',
            'departements.nom as dep_nom',
            'departements.couleur as dep_couleur'
        )
        ->join('departements', 'formations.departement_id', '=', 'departements.id')
        ->where('formations.id', '=', $id_formation)
        ->get();

        // ETUDIANTS
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
        //groupe
        ->join('etudiants_groupes', 'etudiants.id', '=', 'etudiants_groupes.etudiant_id')
        //semestres
        ->join('groupes', 'etudiants_groupes.groupe_id', '=', 'groupes.id')
        ->join('groupes_semestres', 'groupes.id', '=', 'groupes_semestres.groupe_id')
        ->join('semestres', 'groupes_semestres.semestre_id', '=', 'semestres.id')
        ->where('semestres.id', '=', $id_semestre)
        //annee
        ->join('annees_semestres', 'semestres.id', '=', 'annees_semestres.semestre_id')
        ->where('annees.id', '=', $id_annee)
        //formation
        ->join('annees', 'annees_semestres.annee_id', '=', 'annees.id')
        ->join('annees_formations', 'annees.id', '=', 'annees_formations.annee_id')
        //nom formation
        ->join('formations', 'annees_formations.formation_id', '=', 'formations.id')
        ->where('formations.id', '=', $id_formation)

        ->distinct()
        ->get();

        // LISTE ANNEES, SEMESTRES, GROUPES
        // $for = Formation::all();
        // $dep = Departement::all();
        $annees = Annee::all();
        $semestres = Semestre::all();
        $groupes = Groupe::all();

        $result = [
            // 'departement'  => $dep_actuel,
            'formation' => $for_actuelle,
            'etudiants' => $this->concatGroupes($etu),
            // 'departements' => $dep,
            // 'formations'   => $for,
            'annees'      => $annees,
            'semestres'   => $semestres,
            'groupes'     => $groupes
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
