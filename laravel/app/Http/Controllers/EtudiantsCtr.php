<?php

namespace App\Http\Controllers;

use App\Etudiant;
use App\Annee;
use App\Semestre;
use App\Departement;
use App\Formation;
use App\Groupe;
use App\Periode;
use Illuminate\Http\Request;

class EtudiantsCtr extends Controller {
    function index(){
        return Etudiant::with('groupes')
        ->get();
    }

    function show($id){
        $etu = Etudiant::with('groupes')
        ->where('etudiants.id', '=', $id)
        ->get();
        $result = [
            'etudiant' => $etu
        ];
        return $result;
    }

    function store(Request $request) {
        $request->validate([
            'nom'=>'required|string',
            'prenom'=>'required|string',
            'alternant' => 'filled|boolean', 
            'mail' => 'required|string',
            'photo' => 'required|string',
            'pre_diplome' => 'required|string'
        ]);
        $etudiant = new Etudiant;
        $etudiant->nom = $request->input('nom');
        $etudiant->prenom = $request->input('prenom');
        $etudiant->alternant = $request->input('alternant');
        $etudiant->mail = $request->input('mail');
        // $etudiant->photo = $request->input('photo');
        $etudiant->pre_diplome = $request->input('pre_diplome');
        $etudiant->save();

        return $etudiant;
    }

    private function concatGroupes($etu) {
        $map = []; // correspondance entre la clé dans $res et l'identifiant de l'utilisateur
        $res = []; 
        $compteur = 0;
        $etu = json_decode(json_encode($etu), true); //transforme l'objet en array
        foreach ($etu as $e) {
            // si c'est un élève qu'on a déjà vu...
            if (isset($map[$e["id"]])) {
                // ...on lui ajoute le groupe en question
                $res[$map[$e["id"]]]["groupes"][] = $e["groupes"];
            } else {
                // sinon on ajoute l'élève
                $map[$e["id"]] = $compteur;
                $res[$compteur] = $e;
                $res[$compteur]["groupes"] = []; // un tableau pour les groupes
                if (isset($e["groupes"])) {
                    $res[$compteur]["groupes"][] = $e["groupes"];
                }
                $compteur++;
            }
        }
        return $res;
    }


    public function trombi($id_formation, $id_periode) {

        // if(isset($id_periode) && !empty($id_periode)) {
        //     $id_periode = $id_periode;
        // }
        // else {
        // // calculer la période en cours
        //     $id_periode = "5";
        // }

        // FORMATION
        $for_actuelle = Formation::with('departement')
        ->where('formations.id', '=', $id_formation)
        ->get();

        // PERIODE 
        // $periode = Periode::where('periodes.id', '=', $id_periode)
        // ->select(
        //     'periodes.annee as annee',
        //     'periodes.semestre as semestre'
        // )
        // ->get();

        $periode = \DB::table('periodes')
        ->selectRaw('CONCAT(annee, \' S\', semestre) AS periode, id')
        //->where('id', '=', $id_periode)
        ->orderBy('periode')
        ->distinct()
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
        ->where('periodes.id', '=', $id_periode)

        ->orderBy('nom')
        ->get();


        //SELECT DISTINCT CONCAT(annee, "-", annee_fin) AS annee FROM periodes ORDER BY annee DESC)
        // SELECT DISTINCT annee-debut, CONCAT(annee, "-", annee_fin) AS annee FROM periodes ORDER BY annee DESC;
        
        $liste_periodes = \DB::table('periodes')
        ->get();
        
        
        // $liste_annees = \DB::table('periodes')
        // ->select(
        //     'periodes.annee as annee'
        // )
        // ->orderBy('annee')
        // ->distinct()
        // ->get();

        // $liste_semestres = \DB::table('periodes')
        // ->select(
        //     'periodes.semestre as semestre'
        // )
        // ->distinct()
        // ->get();

        $liste_groupes = \DB::table('groupes')
        ->select('groupes.nom as groupe')
        ->where('groupes.formation_id', '=', $id_formation)
        ->get();

        $result = [
            'formation'     => $for_actuelle,
            //'periode' => $periode,
            'etudiants'     => $this->concatGroupes($etu),
            // 'annees' => $liste_annees,
            // 'semestres' => $liste_semestres,
            'periodes' => $liste_periodes,
            'groupes' => $liste_groupes
        ];
        return $result;
    }


}
