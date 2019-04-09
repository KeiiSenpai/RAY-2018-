var game_canvas;
var game_context;
var game_loaded = false;
var tittle = "Jump game";
var backgroundColor = "red";
var fontColor = "black";
var cloudx;
var currentState = 0;
var myGamePiece;
var myObstacles = [];
var myScore;

function drawText (posx, posy, text) {
    game_context.fillStyle = fontColor;
    game_context.font = "16px Arial";
    game_context.fillText(text, posx, posy);

}
function drawPanel (posx, posy, width, height) {
    game_context.fillStyle = backgroundColor;
    game_context.fillRect(posx, posy, width, height);
}

function initGame() {
    game_canvas = document.getElementById("gameCanvas");
    game_context = game_canvas.getContext("2d");

    
    
    if(!game_loaded) {
        document.addEventListener('keydown', function(event) {
            captureGameInputs (event);
        });
        
        setInterval(updateGame, 15);
        
        game_loaded = true;
    }
    
    console.log("GameLoaded");

}

function splashScreen () {
    drawPanel(50, 120,380, 80)
    drawText(50, 150, "Destruye el mundo con un cubito amarillo, o te mato");
    drawText(150, 170, "Dale a la maldita S o te mato");
}

function initScreen () {
    drawPanel(50, 120,380, 80)
    drawText(180, 150, "Prepare ur anus");
    drawText(140, 170, "Dale a X para mayor placer");

}

function splashScreenInputs (event) {
    if(event.keyCode == 83) 
        {
        currentState = 1;
    }
}
function initScreenInputs (event) {
    if(event.keyCode == 88) 
        {
        currentState = 2;
            startGame();
    }
}
function captureGameInputs (event) {
    switch(currentState) {
        case 0:
            splashScreenInputs (event);
            break;
        case 1:
            initScreenInputs (event);
            break;
        case 2:
            pauseScreenInputs (event);
            break;
    }
}

function drawGameScene () {
    game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);
    
    switch(currentState) {
        case 0:
            splashScreen ();
            break;
        case 1:
            initScreen ();
            break;
        case 2:
            pauseScreen ();
            break;
        default:
            break;
    }
}

function updateGame () {
    drawGameScene ();
}


function startGame() {
    myGamePiece = new component(25, 20, "yellow", 400, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 220, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById("gameCanvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        game_canvas = myGameArea.context;
        if (this.type == "text") {
            game_canvas.font = this.width + " " + this.height;
            game_canvas.fillStyle = color;
            game_canvas.fillText(this.text, this.x, this.y);
        } else {
            game_canvas.fillStyle = color;
            game_canvas.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;

        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 175;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 40;
        maxGap = 190;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(20, height, "red", 0, 0));
        myObstacles.push(new component(20, x - height - gap, "red", 0, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += 1;
        myObstacles[i].update();
    }
    myScore.text="Puntuación: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}