/* 
Author: Benoit Thompson. 
Date created: March 15th
Purpose: JS for the javascript game lab 7.2. 
*/

/*
    Resources
    Inspiration: https://freefrontend.com/code/interactive-sliding-grid-puzzle-game-2026-03-02/
    Swiping motion capture guide: https://www.geeksforgeeks.org/javascript/simple-swipe-with-vanilla-javascript/
 */

// Start executing
window.addEventListener("load", function(event) {
    const SQUARE_SIZE = 40; // in px
    const MAX_WIDTH  = 320; // 8 squares wide
    const MAX_HEIGHT = 320; // 8 squares long

    function handleSwipe(x1, y1, x2, y2) {
        let swipeThreshold = 50; // min pixels required to swipe
        let deltax = Math.abs(x2 - x1);
        let deltay = Math.abs(y2 - y1);
        let direction = 'n';
        let distance = (Math.sqrt(Math.pow(deltax, 2) + Math.pow(deltay, 2)));
        if (distance > swipeThreshold) {
                if (deltax > deltay) { direction = (x2 > x1) ? 'r' : 'l'; }
                else                 { direction = (y2 > y1) ? 'd' : 'u'; }
        }
        // console.log(direction);
        return direction;
    }

    function fontSet(ctx, size) {
        let txtSize = "" + size;
        ctx.fillStyle = "#19091a";
        ctx.font = txtSize + "px sans-serif"; 
        ctx.font = txtSize + "px Arial";
        ctx.font = txtSize + 'px Arial Narrow';
        ctx.font = txtSize + 'px Franklin Gothic Medium';
    }
    
    const c = this.document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const hidden = this.document.getElementById("hidden");
    const swipeCounter = this.document.getElementById("swipeCount");

    let startX, startY, endX, endY, dir;
    let posx = SQUARE_SIZE * 3 + SQUARE_SIZE/2;
    let posy = 200;
    let swipeCount = 0;
    let animating = false;
    let finished_intro = false;
    let timerId;            // holds the id of the timer
    const x_offset = c.getBoundingClientRect().x;
    const y_offset = c.getBoundingClientRect().y;
    let txt = "Square Swipe!"
    let txts = 1;

    // touch handling
    c.addEventListener('touchstart', function (event) {
        startX = Math.round(event.touches[0].clientX - x_offset);
        startY = Math.round(event.touches[0].clientY - y_offset);
        // console.log("start at " + startX + "," + startY);

        document.getElementById("b").style["overflow"] = "hidden"; // stop the body element from moving
    });
    c.addEventListener('touchend', function (event) {
        if (!animating) {
            endX = Math.round(event.changedTouches[0].clientX - x_offset);
            endY = Math.round(event.changedTouches[0].clientY - y_offset);
            // console.log("end at " + endX + "," + endY);
            
            dir = handleSwipe(startX, startY, endX, endY);
            if (dir != 'n') { 
                updateSwipeCount();
                startAnimation(); 
            }
        }
    });

    // animation
    function startAnimation() {
        // 16  milliseconds works out to 62.5 frames per second.
        // for games, 60 frames per second is standard
        let FPS = 58;
        let ms = 1000 / FPS;
        if (!finished_intro) {
            timerId  = setInterval(updateIntroAnimation);
        }
        else {
            timerId = setInterval(updateBallAnimation, ms);
        }
        animating = true;
        // console.log("Animation Started")
    }
    function stopAnimation() {
        clearTimeout(timerId);
        if (!finished_intro) {
            finished_intro = true;
        }
        animating = false;
        document.getElementById("b").style["overflow"] = "visible"; // let the body element move again, on a swipe
        // console.log("Animation Stopped")
    }

    // draw
    function drawScreen() {
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        ctx.fillStyle = "rgb(182, 222, 255)";
        ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        let txtSize = "" + Math.floor(txts);
        ctx.fillStyle = "#19091a";
        fontSet(ctx, txtSize);
        let txtlen = Math.floor(ctx.measureText(txt).width);

        ctx.fillText(txt, 160 - txtlen/2, 80);

        if (finished_intro) {
            ctx.fillStyle = "rgb(167, 63, 161)";
            ctx.fillRect(posx, posy, SQUARE_SIZE, SQUARE_SIZE);

            let subtext = "(Swipe right!)"
            fontSet(ctx, 20);
            let txtlen2 = Math.floor(ctx.measureText(subtext).width);

            ctx.fillText(subtext, 160 - txtlen2/2, 110);


            // notice
            let txt3 = "Note: this app only works on mobile or in";
            fontSet(ctx, 10);
            let txtlen3 = Math.floor(ctx.measureText(txt3).width);
            ctx.fillText(txt3, 160 - txtlen3/2, 305);

            txt3 = "inspect mode with mobile emulation enabled.";
            txtlen3 = Math.floor(ctx.measureText(txt3).width);
            ctx.fillText(txt3, 160 - txtlen3/2, 315);
        }
    }

    // updaters
    function updateIntroAnimation() {   
        if (txts < 40) {
            txts += 0.36;
            txts *= 1.02;
        }
        else {
            txts = 40;
            stopAnimation();
        }
        drawScreen();
    }
    function updateBallAnimation() {
        // Border collision detection: stop the animation if the player is at the edge of the canvas
        if (dir == 'r'){
            posx += SQUARE_SIZE / 2;
            if (posx >= c.width) {
                stopAnimation();
                // console.log("bye!");
                hidden.click();
            }
        }
        else if (dir != 'r') {
            stopAnimation();
        }

        drawScreen();
    }
    function updateSwipeCount() {
        swipeCount++;
        swipeCounter.innerHTML = "Swipes: " + swipeCount;
    }

    swipeCount = -1;
    updateSwipeCount();
    drawScreen();
    startAnimation();
});
