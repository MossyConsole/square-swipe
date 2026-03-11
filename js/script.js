/* 
Author: Benoit Thompson. 
Date created: March 2nd
Purpose: JS for the javascript game lab 7.2. 
*/

/*
    Resources
    Swiping motion: https://www.geeksforgeeks.org/javascript/simple-swipe-with-vanilla-javascript/
 */

const SQUARE_SIZE = 40; // in px
const MAX_WIDTH = 320; // 8 squares wide
const MAX_HEIGHT = 400; // 10 squares long

class square {
    constructor(x, y, colour) {
        this.posx = x;
        this.posy = y;
        this.colour = colour;
        this.len = SQUARE_SIZE;
    }
    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.posx, this.posy, this.len, this.len);
    }
    checkCollision(target, message) {
        this.col_message = message || "colliding";
        if (target.posx == this.posx && target.posy == this.posy) {
            console.log(this.col_message);
            return true;
        }
        return false;
    }
}

class player extends square {
    moveOneStep(dir) {
        let direction = "none";
        switch (dir) {
            case 'l':
                direction = "left";
                this.posx -= SQUARE_SIZE;
                break;
            case 'r':
                direction = "right";
                this.posx += SQUARE_SIZE;
                break;
            case 'u':
                direction = "up";
                this.posy -= SQUARE_SIZE;
                break;
            case 'd':
                direction = "down";
                this.posy += SQUARE_SIZE;
                break;
            default:
                direction = "none";
                break;
        }
        // console.log("Going " + direction);
    }
    moveBackOneStep(dir) {
        let direction = "none";
        switch (dir) {
            case 'l':
                direction = "left";
                this.posx += SQUARE_SIZE;
                break;
            case 'r':
                direction = "right";
                this.posx -= SQUARE_SIZE;
                break;
            case 'u':
                direction = "up";
                this.posy += SQUARE_SIZE;
                break;
            case 'd':
                direction = "down";
                this.posy -= SQUARE_SIZE;
                break;
            default:
                direction = "none";
                break;
        }
        // console.log("Going " + direction);
    }
}

class goal extends square {};

class wall extends square {};

class map {
    // have data about
    // starting x and y for the player and goal
    // 2d grid of walls
    // number of moves required for 3 and 2 stars
};

// object in place of an enum
const gameState = {
    menu: 'menu',
    play: 'play',
    levels: 'levels'
};

function parseMap(mapFile) {

}

function initWalls(map) {
    let walls = [];
    for (let i = 0; i < MAX_HEIGHT / SQUARE_SIZE; i++) {
        for (let j = 0; j < MAX_WIDTH / SQUARE_SIZE; j++) {
            if (map[i][j] == 1) {
                const w = new wall(j * SQUARE_SIZE, i * SQUARE_SIZE, "rgb(10, 60, 120)");
                walls.push(w);
            }
        }
    }
    return walls;
}

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
    return direction;
}

window.addEventListener("load", function(event) {
    const c = this.document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const swipeCounter = this.document.getElementById("swipeCount");

    let startX, startY, endX, endY, dir;
    let initx = 40, inity = 40;
    let swipeCount = 0;
    let game = gameState.play;
    let animating = false;
    const x_offset = c.getBoundingClientRect().x;
    const y_offset = c.getBoundingClientRect().y;
    const restart = this.document.getElementById("restart");

    const p = new player(initx, inity, "rgb(100, 100, 120)");
    const g = new goal(280, 360, "rgb(0, 180, 90)")

    const map = [
                 [0, 0, 0, 0, 0, 1, 1, 0],
                 [0, 0, 0, 1, 0, 1, 1, 0],
                 [0, 0, 1, 1, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1],
                 [0, 0, 0, 0, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 1, 0, 0, 0, 0],
                 [0, 0, 0, 1, 0, 0, 1, 0],
                ]
    const walls = initWalls(map);

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

    restart.addEventListener("click", function() {
        p.posx = initx;
        p.posy = inity;
        swipeCount = -1;
        updateSwipeCount();
        drawScreen();
    });

    let timerId;            // holds the id of the timer

    // starts the animation
    function startAnimation() {
        // 16  milliseconds works out to 62.5 frames per second.
        // for games, 60 frames per second is standard
        let FPS = 48;
        let ms = 1000 / FPS;
        if (game == gameState.play) {
            timerId = setInterval(updateBallAnimation, ms);
        }
        animating = true;
        // console.log("Animation Started")
    }
    // stops the animation
    function stopAnimation() {
        clearTimeout(timerId);
        animating = false;

        document.getElementById("b").style["overflow"] = "visible"; // let the body element move again, on a swipe
        // console.log("Animation Stopped")
    }

    function drawScreen() {
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        g.draw(ctx);
        p.draw(ctx);

        for (w of walls) {
            w.draw(ctx);
        }
    }

    // This function is called every 16 milliseconds
    function updateBallAnimation() {
        // 1. Update the position of the ball
        p.moveOneStep(dir);
        p.checkCollision(g, "Goal reached")
        for (wall of walls) {
            if (p.checkCollision(wall, "Wall detected")) {
                p.moveBackOneStep(dir);
                stopAnimation();
            }
        }
        // Border collision detection: stop the animation if the player is at the edge of the canvas
        if ((dir == 'l' || dir == 'r') && (p.posx >= c.width - p.len || p.posx <= 0)) {
            if (p.posx >= c.width - p.len) {
                p.posx = c.width - p.len;
            }
            else {
                p.posx = 0;
            }
            stopAnimation();
        }
        else if ((dir == 'u' || dir == 'd') && (p.posy >= c.height - p.len || p.posy <= 0)) {
            if (p.posy >= c.height - p.len) {
                p.posy = c.height - p.len;
            }
            else {
                p.posy = 0;
            }
            stopAnimation();
        }

        drawScreen();
    }

    function updateSwipeCount() {
        swipeCount++;
        swipeCounter.innerHTML = "Swipes: " + swipeCount;
    }
});
