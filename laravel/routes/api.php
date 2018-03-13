<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::get('importExport', 'CsvCtr@importExport');
// Route::get('downloadExcel/{type}', 'MaatwebsiteDemoController@downloadExcel');
Route::post('importCsv', 'CsvCtr@importCsv');


// -------------------------------------------------------- //
//  FORMATIONS //
// -------------------------------------------------------- //
//Route::get('dep', 'DepartementsCtr@index')->middleware('auth:api');
Route::get('dep', 'DepartementsCtr@index');


//Route::get('trombi/{formation}/{annee}/{semestre}', 'EtudiantsCtr@trombi');
Route::get('trombi/{formation}/{periode}', 'EtudiantsCtr@trombi');


Route::get('for', 'FormationsCtr@index');


// -------------------------------------------------------- //
//  ETUDIANTS //
// -------------------------------------------------------- //
Route::resource('etu', 'EtudiantsCtr');

