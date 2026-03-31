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
    <script src="js/animation.js"></script>
    <title>Square Swipe!</title>
</head>

<body id="b">
    <div id="container">
        <div id="header">
            <?php
            if (true) {
                echo "<h1> Welcome! </h1>";
            } else {
                echo "<h1> Welcome Back! </h1>";
            }
            ?>
            <h2>To a very fun game (I promise)</h2>
        </div>
        <div id="subheader">
            <h3 id="swipeCount"></h3>
        </div>
        <div id="content">
            <canvas id="canvas" width="320" height="320"></canvas>
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>