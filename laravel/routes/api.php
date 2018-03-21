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

Route::post('import', 'EtudiantsCtr@import');

Route::get('dep', 'DepartementsCtr@index');

Route::get('trombi/{formation}/{periode}', 'EtudiantsCtr@trombi');

Route::get('search', 'EtudiantsCtr@search');

Route::get('for', 'FormationsCtr@index');
Route::resource('etu', 'EtudiantsCtr');