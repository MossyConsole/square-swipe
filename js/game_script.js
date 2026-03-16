/* 
Author: Benoit Thompson. 
Date created: March 2nd
Purpose: JS for the javascript game lab 7.2. 
*/

/*
    Resources
    Inspiration: https://freefrontend.com/code/interactive-sliding-grid-puzzle-game-2026-03-02/
    Swiping motion capture guide: https://www.geeksforgeeks.org/javascript/simple-swipe-with-vanilla-javascript/
 */

const SQUARE_SIZE = 40; // in px
const MAX_WIDTH  = 320; // 8 squares wide
const MAX_HEIGHT = 320; // 8 squares long

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
            // console.log(this.col_message);
            return true;
        }
        return false;
    }
}

class player extends square {
    constructor(x, y, colour) {
        super(x, y, colour);
    }
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

class goal extends square {
    constructor(x, y, colour) {
        super(x, y, colour);
    }
};

// "error: wall is not a constructor"
class wall extends square {
    constructor(x, y, colour) {
        super(x, y, colour);
    }
};

class map {
    constructor(id, grid, playerx, playery, goalx, goaly, moves3star) {
        this.id = id;
        this.grid = grid;
        this.px = playerx * SQUARE_SIZE;
        this.py = playery * SQUARE_SIZE;
        this.gx = goalx * SQUARE_SIZE;
        this.gy = goaly * SQUARE_SIZE;
        this.moves3 = moves3star;
        this.moves2 = Math.ceil(moves3star * 5 / 3);
    };
};

// object in place of an enum
const gameState = {
    play: 'play',
    pause: 'pause',
    end: 'end'
};

function initWalls(map) {
    let walls = [];
    for (let i = 0; i < MAX_HEIGHT / SQUARE_SIZE; i++) {
        for (let j = 0; j < MAX_WIDTH / SQUARE_SIZE; j++) {
            if (map[i][j] == 1) {
                const w = new square(j * SQUARE_SIZE, i * SQUARE_SIZE, "rgb(10, 60, 120)");
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

function fontSet(ctx, size) {
    let txtSize = "" + size;
    ctx.fillStyle = "#19091a";
    ctx.font = txtSize + "px sans-serif"; 
    ctx.font = txtSize + "px Arial";
    ctx.font = txtSize + 'px Arial Narrow';
    ctx.font = txtSize + 'px Franklin Gothic Medium';
}

// Start executing
window.addEventListener("load", function(event) {
    const c = this.document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const clear = this.document.getElementById("clear");
    const levelID = this.document.getElementById("levelID");
    const swipeCounter = this.document.getElementById("swipeCount");
    const swipeRecord = this.document.getElementById("swipeRecord");
    const nextLevel = this.document.getElementById("levels");
    const help = this.document.getElementById("help");

    let startX, startY, endX, endY, dir;
    let swipeCount = 0;
    let game = gameState.play;
    let mapIndex = 0;
    let animating = false;
    let timerId;            // holds the id of the timer
    const x_offset = c.getBoundingClientRect().x;
    const y_offset = c.getBoundingClientRect().y;
    const restart = this.document.getElementById("restart");
    
    // grids and maps
    const grid1 = [
                 [1, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 1, 1, 1, 1],
                 [1, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 0, 0, 0, 0, 1],
                 [1, 0, 1, 1, 1, 0, 0, 1],
                 [0, 0, 1, 1, 0, 0, 1, 1],
                 [0, 0, 0, 1, 0, 0, 0, 0],
                 [1, 1, 1, 1, 1, 0, 0, 1],
                ]
    const m1 = new map(1, grid1, 5, 3, 2, 6, 9);
    const grid2 = [
                 [1, 1, 0, 0, 0, 1, 1, 0],
                 [0, 0, 0, 1, 0, 1, 1, 0],
                 [0, 0, 1, 1, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1],
                 [0, 0, 0, 0, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 0, 1, 0, 0, 0, 1],
                 [1, 1, 1, 1, 0, 0, 1, 1],
                ]
    const m2 = new map(2, grid2, 1, 1, 7, 0, 7);
    const grid3 = [
                 [0, 0, 0, 1, 1, 1, 0, 0],
                 [0, 0, 0, 0, 1, 1, 1, 0],
                 [0, 1, 1, 1, 1, 0, 0, 0],
                 [0, 0, 1, 0, 0, 0, 0, 1],
                 [1, 0, 0, 0, 1, 0, 1, 1],
                 [0, 0, 1, 0, 0, 0, 0, 0],
                 [0, 1, 1, 0, 1, 0, 0, 0],
                 [0, 0, 0, 0, 1, 0, 0, 0],
                ]
    const m3 = new map(3, grid3, 2, 1, 7, 7, 13);

    const maps = [m1, m2, m3];
    let cm = maps[mapIndex]; // current map
    let walls = initWalls(cm.grid);

    // entities on maps
    const p = new player(cm.px, cm.py, "rgb(167, 63, 161)");
    const g = new goal(cm.gx, cm.gy, "rgb(0, 180, 90)");

    // swiping listeners
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
                if (game == gameState.play) {
                    updateSwipeCount();
                    startAnimation();
                    return;
                }
            }
            if (game == gameState.pause){
                    game = gameState.play;
                    drawScreen();
                    return;
                }
            if (game == gameState.end){
                game = gameState.play;
                gameInit(true);
            }
        }
    });

    // navbar buttons
    clear.addEventListener("click", function() {
        sessionStorage.removeItem(cm.id);
        swipeCount = -1;
        updateSwipeCount();
    });
    restart.addEventListener("click", function() {
        gameInit();
    });
    nextLevel.addEventListener("click", function() {
        gameInit(true);
    });
    help.addEventListener("click", function() {
        game = gameState.pause;
        drawHelpScreen();
    });

    // Animation functions
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
    function stopAnimation() {
        clearTimeout(timerId);
        animating = false;

        document.getElementById("b").style["overflow"] = "visible"; // let the body element move again, on a swipe
        // console.log("Animation Stopped")
    }

    // Drawing functions
    function drawScreen() {
        ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        ctx.fillStyle = "rgb(182, 222, 255)";
        ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        g.draw(ctx);
        p.draw(ctx);

        for (w of walls) {
            w.draw(ctx);
        }
    }
    function drawEndScreen(record) {
        drawScreen();
        stopAnimation();
        ctx.fillStyle = "rgba(182, 222, 255, 0.8)";
        ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        // level 1 complete
        let txt = "Level " + cm.id + " Complete!";
        fontSet(ctx, 36);
        let txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 120);
        
        // new record
        if (record) {
            let txt2 = "NEW RECORD !!";
            fontSet(ctx, 24);
            let txtlen2 = Math.floor(ctx.measureText(txt2).width);
            ctx.fillText(txt2, 160 - txtlen2/2, 160);
        }

        // swipe to continue
        let txt3 = "(Swipe to Continue)";
        fontSet(ctx, 24);
        let txtlen3 = Math.floor(ctx.measureText(txt3).width);
        ctx.fillText(txt3, 160 - txtlen3/2, 200);
    }
    function drawHelpScreen() {
        drawScreen();
        stopAnimation();
        ctx.fillStyle = "rgba(182, 222, 255, 0.8)";
        ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        let txt = "Welcome To";
        fontSet(ctx, 24);
        let txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 40);

        txt = "Square Swipe!";
        fontSet(ctx, 36);
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 70);

        txt = "Move the purple square by swiping";
        fontSet(ctx, 16);
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 100);

        txt = "with your finger. Try to reach the green";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 120);

        txt = "square in the least number of swipes!";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 140);

        txt = "Press 'Menu' to return to the Menu.";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 170);

        txt = "Press 'Clear' to clear this level's record.";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 190);

        txt = "Press 'Restart' to try this level again.";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 210);
        
        txt = "Press 'Next' to move on to the next level.";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 230);
        
        txt = "Press 'Help' to see this info again!";
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 250);

        // swipe to continue
        txt = "(Swipe to Continue)";
        fontSet(ctx, 24);
        txtlen = Math.floor(ctx.measureText(txt).width);
        ctx.fillText(txt, 160 - txtlen/2, 280);
    }

    // Update functions
    function updateBallAnimation() {
        // 1. Update the position of the ball
        p.moveOneStep(dir);
        if (p.checkCollision(g, "Goal reached")) {
            let r = false;
            if (sessionStorage.getItem(cm.id)) {
                let record = sessionStorage.getItem(cm.id);
                if (record > swipeCount) {
                    sessionStorage.setItem(cm.id, swipeCount);
                    r = true;
                }
            } else {
                sessionStorage.setItem(cm.id, swipeCount);
                r = true;
            }
            
            gameEnd(r);
            return;
        }
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
        if (sessionStorage.getItem(cm.id)) {
            let record = sessionStorage.getItem(cm.id);
            swipeRecord.innerHTML = "Record: " + record;
        }
        else {
            swipeRecord.innerHTML = "Record: " + 0;
        }
    }

    // Game state changes
    function gameInit(increment) {
        let inc = increment || false;
        if (inc){
            stopAnimation();
            if(mapIndex < 2) {
                mapIndex++;
            }
            else {
                mapIndex = 0;
            }
        }
        game = gameState.play;
        cm = maps[mapIndex]; // current map
        levelID.innerHTML = "Level " + cm.id;
        p.posx = cm.px;
        p.posy = cm.py;
        g.posx = cm.gx;
        g.posy = cm.gy;
        swipeCount = -1;
        walls = initWalls(cm.grid);
        updateSwipeCount();
        drawScreen();
    }
    function gameEnd(record) {
        game = gameState.end;
        swipeCount -= 1;
        updateSwipeCount();
        drawEndScreen(record);
    }

    // Initial stuff
    gameInit();
    game = gameState.pause;
    drawHelpScreen();
});
