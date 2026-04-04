<!doctype html>
<!-- 
Author: Benoit Thompson. 
Date created: March 24th
Purpose: CSS stylesheet for the javascript game lab 7.2. 
-->
<?php
include 'connect.php';

// control flow variables
$hereBefore = false;
$correctInfo = false;

// validate http parameters
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$bday = filter_input(INPUT_POST, "bday", FILTER_SANITIZE_SPECIAL_CHARS);

if ($email === null or $email == false or $bday === null or $bday == false){
    echo "<p>Parameter error</p>";
} else {

    // prepare and execute a SELECT command to retrieve an existing user from the db
    $command = "SELECT `birthdate` FROM `squareswipe_accounts` WHERE `email` = ?";
    $stmt = $dbh->prepare($command);
    $params = [$email];
    $success = $stmt->execute($params);

    // if the user is found
    if ($success && ($user_row = $stmt->fetch())) {
        if ($user_row["birthdate"] == $bday) {
            $correctInfo = true;
            $hereBefore = true;
        }
    } 
    // if the user was not found but the query succeded
    else if ($success) {
        // The email is new
        $correctInfo = true;

        $command = "INSERT INTO `squareswipe_accounts` (`email`,`birthdate`) VALUES (?, ?)";
        $stmt = $dbh->prepare($command);
        $params = [$email, $bday];
        $success = $stmt->execute($params);

        if (!$success) {
            echo "<p>INSERT query error</p>";
        }
            
    } 
    else {
        echo "<p>SELECT query error</p>";
    }
}
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
            if ($correctInfo) {
                if ($hereBefore) {
                    echo "<h1> Welcome Back! </h1>";
                } else {
                    echo "<h1> Welcome! </h1>";
                }
                echo "<h2>To a very fun game (I promise)</h2>";
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
            if ($correctInfo) {
                ?>    
                <canvas id='canvas' width='320' height='320'></canvas>
                
                <form class='hide' action='play.php' method='post'>
                    <input name='email' value="<?php echo $email; ?>" autocomplete="off">
                    <input id='hidden' type='submit'>
                </form>
                <?php
            } else {
                ?>
                <div id='canvas_equivalent' display='none'>
                    <div class='textbox'>
                        <p>This email is taken and the birthday entered does not match up with our records.</p>
                        <p>Click 'Return' to go back and log in.</p>
                        <input class='menu' type='button' id='return' value='Return' onclick='window.location.href="index.php"'>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>