<?php

/*
 * Author: Benoit Thompson. 
 * Date created: March 28th
 * Purpose: CSS stylesheet for the javascript game lab 7.2. 
 */

try {
    
    $dbh = new PDO(
        "mysql:host=localhost;dbname=thompb31_db",
        "root",
        ""
    );
    /*
    $dbh = new PDO(
        "mysql:host=localhost;dbname=thompb31_db",
        "thompb31_local",
        "I!yuw3.Y"
    );
    */
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}