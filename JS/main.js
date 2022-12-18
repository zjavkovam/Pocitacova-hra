
//VIEW - vykresľovanie
function draw(){
     context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     for (i in scene) { 
         scene[i].ondraw()
         if(scene[i].x < 0){
            const index = scene.indexOf(this);
            if (index > -1) {
                scene.splice(index, 1);
            }
         }
     }
}

var poziacia_zeme = 300;
function move(dt) {
    for (var i in scene) {
        if(scene[i]!=undefined){
            scene[i].move(dt);
        }        
    }
}


//CONTROLLER

function mouseClick(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    for (var i in buttons) {
        if(buttons[i]!=undefined){
            buttons[i].click(x,y);
        }
      }

  }

window.onkeydown = function(event) {
    keys[event.keyCode] = true;
}
window.onkeyup = function(event) { 
    keys[event.keyCode] = false;
}

//MODEL 
var scene=[];
var buttons=[];
var keys = {};
var diery=[];

function insert(){
    for (var i in scene) {
        if(scene[i]!=undefined){
            if(scene[i].x + scene[i].width < 0){
                const index = scene.indexOf(scene[i]);
                if (index > -1) {
                    scene.splice(index, 1);
                  }
            }
        }        
    }
}

var uroven=1.5; var posledne_zrychlenie=0; var posledne_vykreslenie=0; var duration=0
//MAIN LOOP hry
function gameloop(){

    if(obrazovka == "p"){
        return;
    }

    //čas   
    var now = Date.now();
    var dt = (now - time) / 100;
    time = now;  

    

    duration = ((now-start_time)/1000).toFixed(1);
    //console.log(duration);
    if(duration%5==0 &&posledne_zrychlenie!= duration){
        posledne_zrychlenie=duration;
        uroven+=0.3;
    }
    
    var dlzka = scene.length;
    if(dlzka < 9){
        prekazky();
    }

    insert();
    move(dt);
    draw();

    requestAnimationFrame(gameloop);
}


//INICIALIZÁCIA
var time; var kitty;
var start_time;
window.onload = function(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.onclick = mouseClick;
    music=new Sound("Zvuky/Hudba.mp3");	
    music.sound.volume=0.1;	
    collecting = new Sound("Zvuky/coin.mp3");
    collecting.sound.volume=0.3;
    gameov = new Sound("Zvuky/gameover.wav");

    scene = menu();
    time = Date.now();
    start_time = time;
    requestAnimationFrame(gameloop);
}