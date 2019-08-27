<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
    return redirect('v1/dashboard');
})
Route::get('/v1/{any}', 'SpaController@index')->where('any', '.*');
Route::get('/v2/{any}', 'SpaController@product')->where('any', '.*');
