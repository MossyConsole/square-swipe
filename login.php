<!doctype html>
<!-- 
Author: Benoit Thompson. 
Date created: March 24th
Purpose: CSS stylesheet for the javascript game lab 7.2. 
-->
<?php

$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$bday = filter_input(INPUT_POST, "bday", FILTER_SANITIZE_SPECIAL_CHARS);

$hereBefore = false;
$correctInfo = true;
?>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="css/styles.css">
    <?php
    if ($correctInfo) {
        echo '<script src="js/animation.js"></script>';
    }
    ?>
    <title>Square Swipe!</title>
</head>

<body id="b">
    <div id="container">
        <div id="header">
            <?php
            if ($hereBefore) {
                echo "<h1> Welcome Back! </h1>";
            } else {
                echo "<h1> Welcome! </h1>";
            }
            ?>
            <h2>To a very fun game (I promise)</h2>
        </div>
        <div id="subheader">
            <h3 id="swipeCount"></h3>
        </div>
        <div id="content">
            <?php
            if ($correctInfo) {
                echo "<canvas id='canvas' width='320' height='320'></canvas>";
            } else {
                echo "<div id='canvas_equivalent' display='none'>";
                echo    "<div class='textbox'>";
                echo        "<p>This email is taken and the birthday entered does not match up with our records.</p>";
                echo        "<p>Click 'Return' to go back and log in.</p>";
                echo        "<input class='menu' type='button' id='return' value='Return' onclick='window.location.href=\"index.php\"'>";
                echo "</div></div>";
            }
            ?>
            
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>