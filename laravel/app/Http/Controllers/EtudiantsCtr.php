<?php

namespace App\Http\Controllers;

use App\Etudiant;
use App\Annee;
use App\Semestre;
use App\Departement;
use App\Formation;
use App\Groupe;
use Illuminate\Http\Request;

class EtudiantsCtr extends Controller {
    function index(){
        return Etudiant::with('groupes')
        ->get();
    }

    // private function concatGroupes($etu) {
    //     $map = []; // correspondance entre la clé dans $res et l'identifiant de l'utilisateur
    //     $res = []; 
    //     $compteur = 0;

    //     $etu = json_decode(json_encode($etu), true); //transforme l'objet en array

    //     foreach ($etu as $e) {
    //         // si c'est un élève qu'on a déjà vu...
    //         if (isset($map[$e["id"]])) {
    //             // ...on lui ajoute le groupe en question
    //             $res[$map[$e["id"]]]["groupes"][] = $e["groupes"];
    //         } else {
    //             // sinon on ajoute l'élève
    //             $map[$e["id"]] = $compteur;
    //             $res[$compteur] = $e;
    //             $res[$compteur]["groupes"] = []; // un tableau pour les groupes
    //             if (isset($e["groupes"])) {
    //                 $res[$compteur]["groupes"][] = $e["groupes"];
    //             }
    //             $compteur++;
    //         }
    //     }
    //     return $res;
    // }


    public function trombi($id_formation, $id_annee, $id_semestre) {

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

        // PERIODE 
        $periode = \DB::table('periodes')
        ->select(
            'periodes.annee_debut as annee_debut',
            'periodes.annee_fin as annee_fin',
            'periodes.semestre as semestre'
        )
        ->where('periodes.semestre', '=', $id_semestre)
        ->where('periodes.annee_debut', '=', $id_annee)
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
            'groupes.nom as groupes'
        )
        ->join('etudiants_groupes', 'etudiants.id', '=', 'etudiants_groupes.etudiant_id')
        ->join('groupes', 'etudiants_groupes.groupe_id', '=', 'groupes.id')

        ->join('inscriptions', 'etudiants.id', '=', 'inscriptions.etudiant_id')
        ->join('formations', 'inscriptions.formation_id', '=', 'formations.id')
        ->join('periodes', 'inscriptions.periode_id', '=', 'periodes.id')

        ->where('formations.id', '=', $id_formation)
        ->where('periodes.semestre', '=', $id_semestre)
        ->where('periodes.annee_debut', '=', $id_annee)

        ->orderBy('nom')
        ->get();

        $result = [
            'formation'     => $for_actuelle,
            'periode' => $periode,
            'etudiants'   => $etu
            //'etudiants'     => $this->concatGroupes($etu),
            // 'annees'        => $annees,
            // 'semestres'     => $semestres,
            // 'groupes'       => $groupes
        ];
        return $result;
    }

    // public function trombi($id_formation, $id_annee, $id_semestre) {
    //     // DEPARTEMENT
    //     $dep_actuel = \DB::table('departements')
    //     ->select(
    //         'departements.id as id',
    //         'departements.nom as nom',
    //         'departements.couleur as couleur'
    //     )
    //     ->join('formations', 'formations.departement_id', '=', 'departements.id')

    //     ->where('formations.id', '=', $id_formation)
    //     ->get();

    //     // FORMATION
    //     $for_actuelle = \DB::table('formations')
    //     ->select(
    //         'formations.id as id',
    //         'formations.nom as nom',
    //         'departement_id as dep_id',
    //         'departements.nom as dep_nom',
    //         'departements.couleur as dep_couleur',
    //         'annees.nom as annee',
    //         'semestres.nom as semestre'
    //     )
    //     // département
    //     ->join('departements', 'formations.departement_id', '=', 'departements.id')

    //     // année
    //     ->join('annees_formations', 'formations.id', '=', 'annees_formations.formation_id')
    //     ->join('annees', 'annees_formations.annee_id', '=', 'annees.id')

    //     // semestre
    //     ->join('annees_semestres', 'annees.id', '=', 'annees_semestres.annee_id')
    //     ->join('semestres', 'annees_semestres.semestre_id', '=', 'semestres.id')

    //     ->where('formations.id', '=', $id_formation)
    //     ->where('annees.id', '=', $id_annee)
    //     ->where('semestres.id', '=', $id_semestre)
        
    //     ->get();

    //     // ETUDIANTS
    //     $etu = \DB::table('etudiants')
    //     ->select(
    //         'etudiants.id as id',
    //         'etudiants.nom as nom',
    //         'etudiants.prenom as prenom',
    //         'etudiants.alternant as alternant',
    //         'etudiants.mail as mail',
    //         'etudiants.photo as photo',
    //         'etudiants.pre_diplome as pre_diplome',
    //         'groupes.nom as groupes')
    //     //groupe
    //     ->join('etudiants_groupes', 'etudiants.id', '=', 'etudiants_groupes.etudiant_id')
    //     //semestres
    //     ->join('groupes', 'etudiants_groupes.groupe_id', '=', 'groupes.id')
    //     ->join('groupes_semestres', 'groupes.id', '=', 'groupes_semestres.groupe_id')
    //     ->join('semestres', 'groupes_semestres.semestre_id', '=', 'semestres.id')
    //     ->where('semestres.id', '=', $id_semestre)
    //     //annee
    //     ->join('annees_semestres', 'semestres.id', '=', 'annees_semestres.semestre_id')
    //     ->where('annees.id', '=', $id_annee)
    //     //formation
    //     ->join('annees', 'annees_semestres.annee_id', '=', 'annees.id')
    //     ->join('annees_formations', 'annees.id', '=', 'annees_formations.annee_id')
    //     //nom formation
    //     ->join('formations', 'annees_formations.formation_id', '=', 'formations.id')
    //     ->where('formations.id', '=', $id_formation)
    //     ->orderBy('nom')
    //     ->distinct()
    //     ->get();
        
        
    //     // LISTE ANNEES, SEMESTRES, GROUPES
    //     $annees     = Annee::all();
    //     $semestres  = Semestre::all();
    //     $groupes    = Groupe::all();

    //     $result = [
    //         'formation'     => $for_actuelle,
    //         //'etudiants'   => $etu,
    //         'etudiants'     => $this->concatGroupes($etu),
    //         'annees'        => $annees,
    //         'semestres'     => $semestres,
    //         'groupes'       => $groupes
    //     ];
    //     return $result;
    //     //var_dump($result);
    // }

    function show($id){
        return Etudiant::findOrFail($id);
    }


}
