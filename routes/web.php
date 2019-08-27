<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    return redirect('v1/dashboard');
});

Route::get('/v1/{any}', 'SpaController@index')->where('any', '.*');
Route::get('/v2/{any}', 'SpaController@product')->where('any', '.*');
