<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', function () {
        return Inertia::render('home');
    })->name('home');

    Route::get('updated', function () {
        return Inertia::render('updated');
    })->name('update');

    Route::get('finance', function () {
        return Inertia::render('finance');
    })->name('finance');

    Route::get('assets', function () {
        return Inertia::render('assets');
    })->name('assets');

    Route::get('crewandcast', function () {
        return Inertia::render('crewandcast');
    })->name('crewandcast');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
