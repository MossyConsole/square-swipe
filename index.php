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
    <script src="js/index.js"></script>
    <title>Square Swipe!</title>
</head>

<body id="b">
    <div id="container">
        <div id="header">
            <h1> Square Swipe </h1>
            <h2>Log In / Sign Up to the Game!</h2>
        </div>
        <div id="subheader"> 
            <h3 id="swipeCount"></h3>
        </div>
        <div id="content">
            <div id="canvas_equivalent">
                <form action="login.php" method="post">
                    <div id="grid">
                        <div><label>Email:</label></div>
                        <div><input class="info" id="email" name="email" type="email" placeholder="someone@example.com" required></div>
                        <div><label>Birthday:</label></div>
                        <div><input class="info" name="bday" type="date" required></div>
                    </div>
                    <div>
                        <input type="submit" id="confirm" value="Confirm">
                    </div>
                </form>
            </div>
        </div>
        <div id="footer"><p>&#xA9; Benoit Thompson, CS 1XC3 2025-26<p></div>
    </div>
</body>

</html>