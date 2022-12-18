var t=0; var c; var diera; var coin;
function prekazky(){

    if(obrazovka == "hra"){
        //COINS
        for(var i=0; i<6; i++){
            c= new Coin(1400+i*60,630,40,40,"coin");
            scene.push(c);
        }

        diera = new Hole(2500,683,250*uroven,170,"diera");
        diery.push(diera);
        scene.splice(2, 0, diera);

        for(var i=0; i<8; i++){
            if(i<=3){
                c= new Coin(2500+i*(31*uroven),630-i*25,40,40,"coin");
            }
            else{
                c= new Coin(2500+i*(31*uroven),450+i*25,40,40,"coin");
            }
            scene.push(c);
        }

        //Oheň
        scene.push(new Prekazka(3000+400*uroven,608,180,100,"ohen"));

        for(var i=0; i<6; i++){
            c= new Coin(3400+250*uroven+i*60+uroven*200,630,40,40,"coin");
            scene.push(c);
        }

        scene.push(new Prekazka(4200+400*uroven,620,100,80,"kamen"));
    }
}