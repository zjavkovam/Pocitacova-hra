var obrazovka;
function menu(){
    obrazovka = "n";
    var sceneObjects = []
    sceneObjects.push(new Background(0,0,window.innerWidth, window.innerHeight,"menu_pozadie"));
    start = new Button("startg",616,310,230,50);
    inst = new Button("instructions",605,400,250,50);
    sceneObjects.push(start);
    sceneObjects.push(inst);
    buttons.push(start);
    buttons.push(inst);
    return sceneObjects;
}

var zvuk; var vypnuty_zvuk; var pauza;
function startgame(){
    obrazovka = "hra"; uroven=1.5;
    console.log(t);
    var sceneObjects = [];
    coin = 0; walked = 0;
    sceneObjects.push(new Background(0,0,window.innerWidth, window.innerHeight,"pozadie"));
    sceneObjects.push(new Background(0,600,window.innerWidth,300,"fg"));
    sceneObjects.push(new Objekt(30,15,50,50,"coin"));
    sceneObjects.push(new Text_mince(80,50));

    //PAUZA
    pauza = new Button("pause",1300, 755, 40,40);
    sceneObjects.push(pauza);
    buttons.push(pauza);

    //CAT
    kitty = new Cat(500,560,200,170,585);
    sceneObjects.push(kitty);

    //ZVUK
    zvuk = new Button("zvuk",1350,750,50,50);
    vypnuty_zvuk = new Button("vypnuty_zvuk",1350,750,50,50);
    sceneObjects.push(zvuk);
    buttons.push(zvuk);
    return sceneObjects;
}


function instructions(){
    obrazovka = "n";
    var sceneObjects = []
    sceneObjects.push(new Background(0,0,window.innerWidth, window.innerHeight,"instruction_bg"));
    ret = new Button("return",600,550,230,50);
    sceneObjects.push(ret);
    buttons.push(ret);
    return sceneObjects;
}

var score;
function gameover(){
    gameov.play();
    obrazovka = "n";
    var sceneObjects = []
    sceneObjects.push(new Background(0,0,window.innerWidth, window.innerHeight,"gameover_bg"));
    sceneObjects.push(new Objekt(770,370,50,50,"coin"));
    sceneObjects.push(new Text_mince(830,405));
    sceneObjects.push(new Text(565,405," YOUR SCORE: "));

    start = new Button("startagain",600,450,230,50);
    sceneObjects.push(start);
    buttons.push(start);
    ret = new Button("return",600,515,230,50);
    sceneObjects.push(ret);
    buttons.push(ret);
    score = new Button("highscore",598,580,230,50);
    sceneObjects.push(score);
    buttons.push(score);
    return sceneObjects;
}

var bod = [
    ["", 0],
    ["", 0],
    ["", 0],
    ["", 0],
    ["", 0]
  ];

function body(){
    obrazovka = "n";
    var sceneObjects = []
    sceneObjects.push(new Background(0,0,window.innerWidth, window.innerHeight,"score_bg"));

    ret = new Button("return",600,515,230,50);
    sceneObjects.push(ret);
    buttons.push(ret);
    return sceneObjects;
}

function vloz(meno){
    var vlozene=0;
    for(var i=0; i<5; i++){
        if(bod[i][1]<coin && vlozene==0){
            for(var a=3; a>=i; a--){
                bod[a+1][1]=bod[a][1];
                bod[a+1][0]=bod[a][0];
            }
            bod[i][1]=coin;
            bod[i][0]=meno;
            vlozene++;
        }
    }
}