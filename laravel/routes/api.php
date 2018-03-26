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
// Route::post('export', 'EtudiantsCtr@export');
Route::get('trombi/{formation}/{periode}/export', 'EtudiantsCtr@export');

Route::get('dep', 'DepartementsCtr@index');

Route::get('trombi/{formation}/{periode}', 'EtudiantsCtr@trombi');
Route::get('migrate/{formation}/{periode}', 'EtudiantsCtr@migrate');

Route::get('search', 'EtudiantsCtr@search');

Route::get('for', 'FormationsCtr@index');
Route::resource('etu', 'EtudiantsCtr');


// Route::get('index', 'EtudiantsCtr@index');
// Route::get('etu/{id}', 'EtudiantsCtr@show');
// Route::put('etu/{id}', 'EtudiantsCtr@update');
// Route::post('store', 'EtudiantsCtr@store');
// Route::delete('destroy', 'EtudiantsCtr@destroy/{id}');