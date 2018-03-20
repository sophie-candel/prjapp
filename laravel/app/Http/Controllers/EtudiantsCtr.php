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
    public function index(){
        return Etudiant::with('groupes')
        ->get();
    }

    public function show($id){
        $etu = Etudiant::with('groupes')
        ->where('etudiants.id', '=', $id)
        ->get();
        $result = [
            'etudiant' => $etu
        ];
        return $result;
    }


    public function store(Request $request) {
        $request->validate([
            'nom'=>'required|string',
            'prenom'=>'required|string',
            //'photo' => 'filled|string',
            'mail' => 'required|string',
            'diplome' => 'required|string',
            //'alt' => 'boolean',
            'groupe' => 'required|integer',
            'periode' => 'required|integer',
            'formation' => 'required|integer',
            'file' => 'filled|file|mimetypes:image/jpeg,image/png'
        ]);
        $groupe = $request->groupe;
        $periode = $request->periode;
        $formation = $request->formation;

        $etudiant = new Etudiant;
        $etudiant->nom = $request->input('nom');
        $etudiant->prenom = $request->input('prenom');
        $etudiant->mail = $request->input('mail');
        $etudiant->pre_diplome = $request->input('diplome');
        //$etudiant->alternant = $request->input('alt', 0);
        
        // RENOMMER PHOTO
        $photoName = $etudiant->nom.$etudiant->prenom;
        $photoExtension = $request->file->getClientOriginalExtension();
        $photoPath = "./sources/img/";
        $etudiant->photo = $photoPath.$photoName.'.'.$photoExtension;


        $etudiant->save();
        $request->file->storeAs('', $photoName.'.'.$photoExtension, 'photos');


        // PIVOT TABLES
        $etudiant->groupes()->attach($groupe);
        
        $etudiant->formations()->attach(
            $etudiant->id, 
            array(
                "formation_id"=>$formation, 
                "periode_id"=>$periode)
        );

        return $etudiant;

        

    }

    public function destroy($id) {
        $etudiant = \App\Etudiant::findOrFail($id);
        $etudiant->delete();
        //Storage::delete('public/assets/'.$etudiant->filename);
        //return ;
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

        // FORMATION
        $for_actuelle = Formation::with('departement')
        ->where('formations.id', '=', $id_formation)
        ->get();

        // PERIODE EN COURS
        $periode_actuelle = Periode::where('id', '=', $id_periode)
        ->get();

        // ETUDIANTS
        $etudiants = \DB::table('etudiants')
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


        // SELECT PERIODES
        $liste_periodes = \DB::table('periodes')
        ->selectRaw('CONCAT(annee, \' - Semestre \', semestre) AS periode, periodes.id as id')
        ->join ('formations_periodes', 'periodes.id', 'formations_periodes.periode_id')
        ->where('formations_periodes.formation_id', '=', $id_formation)
        ->get();


        // SELECT GROUPES
        $liste_groupes = Groupe::select('groupes.nom as groupe', 'groupes.id as id')
        ->where('groupes.formation_id', '=', $id_formation)
        ->get();

        $result = [
            'formation'     => $for_actuelle,
            'periode' => $periode_actuelle,
            'etudiants'     => $this->concatGroupes($etudiants),
            'periodes' => $liste_periodes,
            'groupes' => $liste_groupes
        ];
        return $result;
    }


    // public function search(Request $request) {
    //     $query = $request->get('query');
    //     $etudiants = Etudiant::where('nom', 'LIKE', '%query%')->get();
    //     return $etudiants;
    // }

    public function search() {
        $etudiants = Etudiant::all();
        $formations = Formation::all();

        $result = [
            'etudiants' => $etudiants,
            'formations' => $formations
        ];

        return $result;
    }

}
