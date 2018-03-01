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


// -------------------------------------------------------- //
//  FORMATIONS //
// -------------------------------------------------------- //



Route::get('dep', 'DepartementsCtr@index');
Route::resource('insc', 'InscriptionsCtr');

// Route::get('trombi/{formation}/{annee}/{semestre}', 'EtudiantsCtr@trombi');
Route::get('trombi/{formation}/{annee}/{semestre}', 'EtudiantsCtr@trombi');
Route::get('grp', 'GroupesCtr@index');
Route::get('for', 'FormationsCtr@index');
// Route::get('trombi', 'InscriptionsCtr@trombi');


// -------------------------------------------------------- //
//  ETUDIANTS //
// -------------------------------------------------------- //
Route::resource('etu', 'EtudiantsCtr');

