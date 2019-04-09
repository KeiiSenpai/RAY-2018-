var game_canvas;
var game_context;

var currentpanel=0;

var game_loaded = false;

var title ="Jumping";
var backgroundcolor = "black";

function initGame () {
    
      game_canvas = document.getElementById("gameCanvas");
      game_context = game_canvas.getContext("2d"); 
    
    
    if (!game_loaded) {
      setInterval(updategame,10);
    game_loaded = true ;
    document.addEventListener('keydown', function(event){
        captureGameInputs (event);
    });    
    }
    console.log("juego cargado");
    
}


function carameloDeLimon (event) {
    var pulpo = event.keyCode;
    if (pulpo == 27) {
        alert ("Joder loco")

    
       
    }
}

function captureGameInputs (event) {
    switch(currentpanel) {
    case 0:
        splashScreenInputs (event);
        break;
    case 1:
        initScreenInputs (event);
        break;
    case 2: 
        pauseScreenInputs (event);
        break;
    case 3: 
        gameScreenInputs (event);
        break;
    case 4: 
        helpScreenInputs (event);
        break;
    case 5:
        creditScreenInputs (event);
        break;   
}
}
function splashScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 49) {
       currentpanel = 1;
    }if (pulpo == 50) {
        currentpanel = 2;
    
    }if (pulpo == 51) {
        currentpanel= 3;
}    
}

function initScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 27) {
      currentpanel= 0;
}
}
function pauseScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 27) {
       currentpanel = 0;
}
}
function gameScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 27) {
       
}
}
function helpScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 27) {
       
}
}
function creditScreenInputs (event) {
     var pulpo = event.keyCode;
    if (pulpo == 27) {
        
}
}

function gameFPS() {
    var Pelicano2 = Date.now();
    var fps = (Pelicano2 - Pelicano);
    Pelicano = Pelicano2;
    game_context.fillStyle = "black";
        game_context.font = "16px Arial";
        game_context.fillText("fps"+ fps, game_canvas.width - 75, 15);
        
    }

function updategame () {
     game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);

     
    switch(currentpanel) {
        case 0 :
            splashScreen ();
            break;
        case 1 :
            initScreen ();
            break;
        case 2 :
            pauseScreen ();
            break;
      
    }
}
function splashScreen () {
    
    drawheadercomponent ();
    drawdescriptioncomponent ("1: Secuoya");
    drawVelocimetro ("2: Pino");
}

function drawheadercomponent (){
    drawpanel(0,0,480,35);
    drawtext(title,14,28);

}

function drawdescriptioncomponent (description) {
    drawarbol (0, 35, 480, 250)
    drawtext (description, 14, 50)

}

function drawVelocimetro (patata) {
    drawtext (patata, 14, 65)
   
}

function drawpanel(posx,posy,width ,height) {
   game_context.fillStyle = "yellow"; 
    game_context.fillRect(posx, posy, width, height); 
}
function drawarbol(posx,posy,width,height) {
    game_context.fillStyle = "purple"
    game_context.fillRect(posx, posy,width, height);
}
function drawtext(posx,posy,text) {
    game_context.fillStyle= "black";
    game_context.font="16px Arial";
    game_context.fillText(posx,posy,text)
    game_context.fillText
}

function initScreen () {
    
    drawheadercomponent ();
    drawdescriptioncomponent ("Secuoya");
    
}


function pauseScreen () {
    
    drawheadercomponent ();
    drawdescriptioncomponent ("Pino");
}

function helpScreen () {
      drawheadercomponent ();
    drawdescriptioncomponent ("Abedul");
}


function drawGameScene () {
    game_context.context.clearRect(0,0,game_context.canvas.width, game_context.canvas.height)
    switch(currentpanel) {
        case 0:
        splashScreen();
        break;
    case 1:
        initScreen ();
        break;
    case 2:
        pauseScreen ();
        break;
    case 3: 
        gameScreen ();
        break;
    case 4: 
        helpScreen ();
        break;
    case 5: 
        creditScreen ();
        break;
    default:
    //console.log("sin definir");//
        break; 
    }
}

