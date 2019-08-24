<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaController extends Controller
{
    //implemented Single Page Routes

    public function index() {
    	return view('spa');
    }
    public function product() {
    	return view('app');
    }
    
}
