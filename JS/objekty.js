gif=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]
class Objekt{
    constructor(x,y,width,height,id) {
        this.x=x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.image = document.getElementById(id);
      }
    move(dt){}

    ondraw(){
        context.save()
        context.translate(this.x, this.y)      
        context.drawImage(this.image, 0, 0, this.width, this.height); 
        context.restore()
    }
}

class Background extends Objekt{
    constructor(x,y,width, height,id){
        super(x,y,width,height);
        this.image = document.getElementById(id);
    }
}

var p=0;
var n=0;
var walked = 0;
class Cat extends Objekt{
    constructor(x,y,width,height,zem){
        super(x,y,width,height);
        this.gravity = 1.5;
        this.dy=0; 
        this.dx=0;
        this.jump = false;
        this.falling = false;
        this.zem = zem;
    }
    
    ondraw(){
        if(n%3==0 && this.y<this.zem+10){
            this.image=document.getElementById(gif[p]);
            p++;
            if(p==17){
                p=0;
            }
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else{
            context.save();
            context.translate(this.x, this.y);
            context.drawImage(this.image, 0, 0, this.width, this.height);
            context.restore();
        }
        n++;
    }

    // Movement logic
    move(dt) {

        if (keys[37]) 
            this.dx -= 3.5;
        if (keys[39])
            this.dx += 3;
        if (keys[38] && this.jump == false) {
            this.dy -= 70;
            this.jump=true
        }
        if(this.x+this.width>canvas.width-this.width){
            this.dx-=1;
        }
        this.dy += this.gravity; //gravitácia
        this.x += this.dx * dt * uroven/2
        this.y += this.dy * dt;
        this.dx *= 0.95;// friction
        this.dy *= 0.95;// friction
        this.x-=4 * uroven;

        if(diery!=[]){
            for(i in diery){
                if((this.x+50>=diery[i].x) && (this.x<=diery[i].x+diery[i].width)){
                    this.falling=true;
                }
    
                if((this.x>=diery[i].x+diery[i].width-this.width+10 || this.x+50<=diery[i].x) && this.y<this.zem+10){
                    this.falling=false;
                }
            }
        }

        if(this.y>=this.zem+15 || this.x-this.width>canvas.width){
            this.dx=0;
        }

        if (this.y > this.zem && this.falling == false) {
            this.jump = false;
            this.y = this.zem;
            this.dy = 0;
        }

        if(this.x<10 || this.y>canvas.height){
            diery=[];
            p=0;
            n=0;
            scene = gameover();
        }
    }
}

class Button extends Objekt{
    constructor(id,x,y,width,height){
        super(x,y,width,height);
        this.id=id;
        this.pressed = false;
        this.image = document.getElementById(id);
    }
    move(dt) {}
    click(x,y){
        if(x>this.x && y>this.y && x<(this.x+this.width) && y<(this.y+this.height)){
            if(this.id=="startg" || this.id=="startagain"){
                music.play();
                music.playing=true;
                buttons=[];
                scene = startgame();	
            }

            if(this.id=="instructions"){
                scene = instructions();
            }

            if(this.id=="return"){
                music.stop();
                music.playing=false;
                scene=menu();
            }

            if(this.id=="zvuk" || this.id=="vypnuty_zvuk"){
                if(music.playing){
                    music.stop();
                    scene.pop();
                    scene.push(vypnuty_zvuk)
                    music.playing=false;
                }
                else{
                    music.play();
                    scene.pop();
                    scene.push(zvuk);
                    music.playing=true;
                }
            }

            if(this.id=="highscore"){
                scene = body();
                var person = prompt("Please enter your name", "...");
                vloz(person);
                for(var i=1; i<=5 ; i++){
                    if(bod[i-1][0] != "" ){
                        scene.push(new Text(565,240+i*50,i+'.  '+bod[i-1][0] + ": " + bod[i-1][1]));
                    }
                }
            }

            if(this.id == "pause"){
                if(this.pressed == false){
                    this.pressed = true;
                    var text = new Text(625,500,"GAME IS PAUSED");
                    text.ondraw();
                    obrazovka = "p";
                }
                else{
                    this.pressed = false;
                    obrazovka = "hra";
                    gameloop();
                }
            }
        }
    }
}

class Sound{
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);	
        this.playing = false;
    }
    play(){
        this.sound.play();         
    }
    stop(){
        this.sound.pause();
    }

    refresh(){
        this.sound.currentTime = 0;
    }
}

class Hole extends Objekt{
    constructor(x,y,width,height,id){
        super(x,y,width,height);
        this.id=id;
        this.image=document.getElementById(id);
        this.falling = false;
    }
    move(dt){
        this.x-=5*uroven;
        diery[0][0]-=5;
        for(var i in diery){
            if(diery[i].x < 0){
                const index = diery.indexOf(this);
                if (index > -1) {
                    diery.splice(index, 1);
                }
             }
        }
    }
}


class Coin extends Objekt{
    constructor(x,y,width, height,id){
        super(x,y,width,height);
        this.image = document.getElementById(id);
        this.image.style.opacity = "0.5";
    }
    move(dt){
        this.x-=5*uroven;
        if(this.x < kitty.x + kitty.width-30 && this.x + 15 >kitty.x-30 &&
            this.y < kitty.y-30 + kitty.height-30 && this.y + 15 > kitty.y-30){
                coin++;
                collecting.play();
                const index = scene.indexOf(this);
                if (index > -1) {
                    scene.splice(index, 1);
                  }
        }
    }
}

class Text extends Objekt{
    constructor(x,y,text){
        super(x,y);
        context.font = "28px Book Antiqua";
        context.fillStyle = "FFDD99";
        this.text= text;
    }
    ondraw(){
        context.fillText(this.text, this.x, this.y);
    }
}

class Text_mince extends Objekt{
    constructor(x,y){
        super(x,y);
        context.font = "28px Book Antiqua";
        context.fillStyle = "FFDD99";
        this.text=0;
    }
    ondraw(){
        this.text=coin;
        context.fillText(this.text, this.x, this.y);
    }
}

class Prekazka extends Objekt{
    constructor(x,y,width, height,id){
        super(x,y,width,height);
        this.image = document.getElementById(id); 
    }
    move(dt){
        this.x-=5*uroven;
        if(this.x < kitty.x + kitty.width-50 && this.x >kitty.x &&
        this.y < kitty.y + kitty.height-100 && this.y > kitty.y){
            diery=[];
            p=0;
            n=0;
            scene = gameover();
        }
    }
}