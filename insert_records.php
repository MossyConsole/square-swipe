<?php

/*
 * Author: Benoit Thompson. 
 * Date created: April 3rd
 * Purpose: insert into the records table
 */
include 'connect.php';

$email = filter_input(INPUT_GET, "email", FILTER_SANITIZE_EMAIL);
$level = filter_input(INPUT_GET, "level", FILTER_SANITIZE_NUMBER_INT);
$record = filter_input(INPUT_GET, "swipes", FILTER_SANITIZE_NUMBER_INT);
$time = filter_input(INPUT_GET, "time", FILTER_SANITIZE_NUMBER_INT);

$records = ["email" => $email, "level" => $level, "record" => $record, "time" => $time];

if ($email === null or $email == false or 
    $level === null or $level == false or 
    $record === null or $record == false) {
} else {
    $command = "INSERT INTO `squareswipe_records` (`email`, `level`, `record`, `time`) VALUES (?,?,?,?)";
    $stmt = $dbh->prepare($command);
    $args = [$email, $level, $record, $time];
    $success = $stmt->execute($args);

    if ($success) {
        echo "Data inserted";
    } else {
        echo "Something wrong";
    }
    // echo json_encode($records);
}
