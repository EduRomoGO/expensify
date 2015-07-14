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

use App\Expense;

Route::get('/expenses', function () {
    return '';
});

Route::post('/expenses', function () {
	  $input = Request::all();
	  Expense::create($input);
});
