<!doctype html>
<!-- 
Author: Benoit Thompson. 
Date created: March 24th
Purpose: CSS stylesheet for the javascript game lab 7.2. 
-->
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/game_script.js"></script>
    <title>Square Swipe!</title>
</head>

<body id="b">
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
            <canvas id="canvas" width="320" height="320"></canvas>
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>