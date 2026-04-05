<!doctype html>
<!-- 
Author: Benoit Thompson. 
Date created: March 24th
Purpose: php for the gameplay
-->

<?php
$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
$help = filter_input(INPUT_POST, "help", FILTER_SANITIZE_EMAIL);
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
        echo '<script src="js/game_script.js"></script>';
    }
    ?>
    <title>Square Swipe!</title>
</head>

<body id="b">
    <form class="hide" action="leaderboard.php" method="post">
        <input type="email" class="hide" id="email" name="email" value="<?php echo $email; ?>" autocomplete="off">
        <input type="hidden" id="wantHelp" value="<?php echo $help; ?>" autocomplete="off">
        <input id="hidden" type="submit">
    </form>
    <div id="container">
        <div id="header">
            <h1>Square Swipe!</h1>
            <h2>A very fun game (I promise)</h2>
        </div>
        <div id="nav">
            <input class="navlink" type="submit" value="Menu" onclick="window.location.href='index.php';">
            <input id="clear" class="navlink" type="submit" value="Clear">
            <input id="restart" class="navlink" type="submit" value="Restart">
            <input id="levels" class="navlink" type="submit" value="Next">
            <input id="help" class="navlink" type="submit" value="Help">
        </div>
        <div id="subheader"> 
            <h2 id="levelID"></h2>
            <div id="info"> 
                <h3 id="swipeCount"></h3>
                <h3 id="swipeRecord"></h3>
            </div>
        </div>
        <div id="content">
            <?php    
            if ($validEmail) {
                echo '<canvas id="canvas" width="320" height="320"></canvas>';
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