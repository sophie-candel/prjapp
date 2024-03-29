<?php

namespace App\Http\Controllers;

use Excel;
use App\Etudiant;
use App\Annee;
use App\Semestre;
use App\Departement;
use App\Formation;
use App\Groupe;
use App\Periode;
use Illuminate\Http\Request;
use Illumnate\Support\Collection;


use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

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

    // ********** MODIFICATION ETUDIANT ********** //
    public function update(Request $request, $id) {
        $request->validate([
            'nom'=>'filled|string',
            'prenom'=>'filled|string',
            'mail' => 'filled|string',
            'diplome' => 'filled|string',
            'alt' => 'filled|boolean',
            'groupe' => 'filled|integer',
            // 'periode' => 'require|integer',
            // 'formation' => 'require|integer',
            'file' => 'filled|file|mimetypes:image/jpeg,image/png'
        ]);

        $groupe = $request->groupe;
        $periode = $request->periode;
        $formation = $request->formation;

        $etudiant = Etudiant::findOrFail($id);
        $etudiant->nom = $request->input('nom');
        $etudiant->prenom = $request->input('prenom');
        $etudiant->mail = $request->input('mail');
        $etudiant->pre_diplome = $request->input('diplome');
        $etudiant->alternant = $request->input('alt', 0);
        
        // RENOMMER PHOTO
        if (isset($request->file) && !empty($request->file)) {
            $photoName = $etudiant->nom.$etudiant->prenom;
            $photoExtension = $request->file->getClientOriginalExtension();
            $photoPath = "./sources/img/";

            $etudiant->photo = $photoPath.$photoName.'.'.$photoExtension;
            $request->file->storeAs('', $photoName.'.'.$photoExtension, 'photos');
        }
        
        $etudiant->save();
        

        // PIVOT TABLES
        $etudiant->groupes()->attach($groupe);
        
        // $etudiant->formations()->attach(
        //     $etudiant->id, 
        //     array(
        //         "formation_id"=>$formation, 
        //         "periode_id"=>$periode)
        // );

        return $etudiant;

        //return $request->alt;
    }   


    // ********** CREATION ETUDIANT ********** //
    public function store(Request $request) {
        $request->validate([
            'nom'=>'required|string',
            'prenom'=>'required|string',
            'mail' => 'filled|string',
            'diplome' => 'filled|string',
            'alt' => 'boolean',
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
        $etudiant->alternant = $request->input('alt', 0);
        
        // RENOMMER PHOTO
        if (isset($request->file) && !empty($request->file)) {
            $photoName = $etudiant->nom.$etudiant->prenom;
            $photoExtension = $request->file->getClientOriginalExtension();
            $photoPath = "./sources/img/";

            $etudiant->photo = $photoPath.$photoName.'.'.$photoExtension;
            $request->file->storeAs('', $photoName.'.'.$photoExtension, 'photos');
        }
        
        $etudiant->save();
        

        // PIVOT TABLES
        $etudiant->groupes()->attach($groupe);
        
        $etudiant->formations()->attach(
            $etudiant->id, 
            array(
                "formation_id"=>$formation, 
                "periode_id"=>$periode)
        );

        return $etudiant;

        //return $request->alt;
    }

    // ********** SUPPRESSION ETUDIANT ********** //
    public function destroy($id) {
        $etudiant = \App\Etudiant::findOrFail($id);
        $etudiant->delete();
        //Storage::disk('photos')->delete($etudiant->photo);
        //return $etudiant->photo;
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


    public function migrate($id_formation, $id_periode) {

        //ETUDIANTS
        $etudiants = \DB::table('etudiants')
        ->select(
            'inscriptions.etudiant_id as id',
            'inscriptions.periode_id as periode',
            'inscriptions.formation_id as formation'
        )
        ->join('inscriptions', 'etudiants.id', '=', 'inscriptions.etudiant_id')
        ->where('inscriptions.formation_id', '=', $id_formation)
        ->where('inscriptions.periode_id', '=', $id_periode)
        ->get();

        foreach ($etudiant as $e) {
            
        }
        
        $result = [
            'formation actuelle' => $id_formation,
            'periode actuelle' => $id_periode,
            'etudiants' => $etudiants
        ];

        return $result;
    }
    // ********** AFFICHAGE TROMBI ********** //
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


    // ********** BARRE DE RECHERCHE ********** //

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


    // ********** IMPORT LISTE CSV ********** //
    public function import(Request $request) {
        $request->validate([
            'file' => 'required|file',
            //'file' => 'required|file|mimetypes:text/csv'
            'periode' => 'required|integer',
            'formation' => 'required|integer',
        ]);

        $periode = $request->periode;
        $formation = $request->formation;

        Excel::load($request->file)->each(function ($csvLine) use($periode, $formation){
            $etudiant = Etudiant::create([
                'nom' => $csvLine->get('nom'),
                'prenom' => $csvLine->get('prenom'),
                'alternant' => $csvLine->get('statut'),
                'mail' => $csvLine->get('mail'),
                'photo' => './sources/img/etu.png',
                'pre_diplome' => $csvLine->get('pre_diplome')
            ]);

            // PIVOT TABLES
            $etudiant->groupes()->attach(
                $etudiant->id, 
                array(
                    "groupe_id"=>$csvLine->get('groupe')
                )
            );

            $etudiant->formations()->attach(
                $etudiant->id, 
                array(
                    "formation_id"=>$formation, 
                    "periode_id"=>$periode
                )
            );
        });
       
    }


    // ********** EXPORT PDF ********** //
    public function export($id_formation, $id_periode) {
        try {
            $trombi = $this->trombi($id_formation, $id_periode);

            if (isset($trombi['formation'][0]['nom'])) {
                $content = '<h1>' . $trombi['formation'][0]['nom'] . '</h1>';
            } else {
                $content = '<h1>Trombinoscope</h1>';
            }
            $content .= '<table><tr>';
            $compteur = 0;
            foreach ($trombi['etudiants'] as $e) {
                if ($compteur++ % 5 == 0) $content .= '</tr><tr>';
                $content .= '<td>';
                $content .= '<img width="147" src="' . base_path() . '/../dist/' . $e['photo']. '"><br>';
                $content .= $e['prenom']." ".$e['nom'];
                $content .= '</td>';
            }
            $content .= '</tr></table>';                                
        
            $html2pdf = new \Spipu\Html2Pdf\Html2Pdf('P', 'A4', 'fr'); 
            $html2pdf->writeHTML($content);
            $html2pdf->output('trombi.pdf', 'D');

            return $trombi;
        }
        catch (Html2PdfException $e) {
            $html2pdf->clean();
            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
}
