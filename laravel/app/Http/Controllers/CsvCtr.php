<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Csv;
use Excel;

class CsvCtr extends Controller
{
    public function importExport() {
        //return view('importExport');
    }



    /** Import file into database Code **/
    public function importCsv(Request $request) {

        if($request->hasFile('import_csv')) {
            $path = $request->file('import_csv')->getRealPath();
            // <input type="file" name="import_csv">


            $data = Excel::load($path, function($reader) {})->get();


            if(!empty($data) && $data->count()){

                foreach ($data->toArray() as $key => $value) {
                    if(!empty($value)){
                        foreach ($value as $v) {
                            $insert[] = [
                                'nom' => $v['nom'], 
                                'prenom' => $v['prenom'],
                                'alternant' => $v['alternant'],
                                'photo' => $v['photo'],
                                'mail' => $v['mail'],
                                'pre_diplome' => $v['pre_diplome'],
                            ];
                        }
                    }
                }

                if(!empty($insert)){
                    Csv::insert($insert);
                    return back()->with('success','Insertion réussie');
                }

            }
        }

        return back()->with('error','Erreur lors de l\'importation du fichier');
    }
}
