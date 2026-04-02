<?php

$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$bday = filter_input(INPUT_POST, "bday", FILTER_SANITIZE_SPECIAL_CHARS);