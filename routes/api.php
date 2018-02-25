<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// -------------------------------------------------------- // 
//  FORMATIONS //
// -------------------------------------------------------- // 

//Route::get('for', 'FormationsCtr@index');
Route::resource('for', 'FormationsCtr');

Route::get('dep', 'DepartementsCtr@index');

Route::get('grp', 'GroupesCtr@index');

Route::get('ann', 'AnneesCtr@index');

Route::get('sem', 'SemestresCtr@index');

Route::get('trombi', 'EtudiantsCtr@trombi');

//Route::get('for/liste', 'FormationsCtr@liste');
// Route::get('for', 'FormationsCtr@index');


// -------------------------------------------------------- // 
//  ETUDIANTS //
// -------------------------------------------------------- // 
Route::resource('etu', 'EtudiantsCtr');




