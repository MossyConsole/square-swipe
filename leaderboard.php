<!doctype html>
<!-- 
Author: Benoit Thompson. 
Date created: March 31st
Purpose: CSS stylesheet for the javascript game lab 7.2. 
-->
<?php
include 'connect.php';

// validate http parameters
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$validEmail = true;

if ($email === null or $email == false){
    $validEmail = false;
}
?>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="css/styles.css">
    <?php
    if ($validEmail) {
        echo '<script src="js/leaderboard.js"></script>';
    }
    ?>
    <title>Square Swipe!</title>
</head>

<body id="b">
    <div id="container">
        <div id="header">
            <?php
            if ($validEmail) {
                echo "<h1> Welcome! </h1>";
                echo "<h2>To the leaderboard (I promise)</h2>";
            } else {
                echo "<h1>Hello there!<h1>";
                echo "<h2>Something went wrong.</h2>";
            }
            ?>
        </div>
        <div id="subheader">
            <h3 id="swipeCount"></h3>
        </div>
        <div id="content">
            
            <?php    
            if ($validEmail) {
                ?>
                    
        
                    <div id='canvas_equivalent' display='none'>
                        <div class='textbox'>
                            <p>Click 'Continue' to go back to the game.</p>
                            <form action='play.php' method='post'>
                                <input type="hidden" name='email' value="<?php echo $email; ?>" autocomplete="off">
                                <input type="hidden" name='help' value="false" autocomplete="off">
                                <input type='submit' class="menu" value="Continue">
                            </form>
                        </div>
                    </div>
                <?php
            } else {
                ?>
                <div id='canvas_equivalent' display='none'>
                    <div class='textbox'>
                        <p>Parameter error: email not entered.</p>
                        <p>Click 'Return' to go back and log in.</p>
                        <input class='menu' type='button' id='return' value='Return' onclick='window.location.href="index.php"'>
                    </div>
                </div>
                <?php
                echo "<p></p>";
            }
            ?>
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>