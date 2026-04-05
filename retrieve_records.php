<?php

/*
 * Author: Benoit Thompson. 
 * Date created: April 4th
 * Purpose: select from the records table
 */
include 'connect.php';

$email = filter_input(INPUT_GET, "email", FILTER_SANITIZE_EMAIL);
$level = filter_input(INPUT_GET, "level", FILTER_SANITIZE_NUMBER_INT);
$table = [];

if ($email === null or $email == false or 
    $level === null or $level == false) {
} else {
    // echo json_encode("HI");
    
    $command = "SELECT `email`, `level`, `record`, `time` FROM `squareswipe_records` WHERE `level` = ? ORDER BY `record` ASC, `time` ASC LIMIT 3";
    $stmt = $dbh->prepare($command);
    $args = [$level];
    $success = $stmt->execute($args);

    if ($success) {
        $i = 0;
        while ($row = $stmt->fetch()) {
            $table += [];
            $table[$i] = ["email" => $row["email"], "level" => $row["level"], "record" => $row["record"], "time" => $row["time"]];
            $i++;
        }
        echo json_encode($table);
    } else {
        echo "Something wrong";
    }
}
