/// <reference path="smallfish.ts"/>
/// <reference path="bigfish.ts"/>
/// <reference path="playerfish.ts"/>
/// <reference path="box.ts" />


class Level {
    private game:Game;
    private height:number;
    private width:number;
    private smallFishes: Array<SmallFish>;
    private bigFishes: Array<BigFish>;
    private boxes: Array<Box>;
    private player:Player;
    private player2:Player;
    private gameOver:boolean=false;
    private winner:number;
    
    public div: HTMLElement;
    public display:ScoreDisplay;  
    
    constructor(g:Game) {
        this.game = g;       
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.height=innerHeight;
        this.width=innerWidth;
        this.div.style.height = this.height+"px";
        this.div.style.width = this.width+"px"; 
        this.display = new ScoreDisplay(this);
        this.playSong(this.gameOver);
        
        this.smallFishes = new Array<SmallFish>();
        for(var i=1; i <= 15; i++){           
            let randomizerX : number = Math.random();
            let randomizerY : number = Math.random();
            
            let width = 132;
            let height = 100;
            let x=(innerWidth-width)*randomizerX;
            let y=innerHeight/2*randomizerY;
            let boost:boolean;
            if(i<=10){
                boost=false;
            } 
            else{
                boost=true;
            }
           
            
            this.smallFishes.push(new SmallFish(this, x, y, width, height, "smallfish", randomizerX, boost));
        }
        
        this.bigFishes = new Array<BigFish>();
        for(var i=1; i <= 2; i++){
            let randomizerX : number = Math.random();
            let randomizerY : number = Math.random();
            
            let width = 468;
            let height = 102;
            let x=(innerWidth-width)*randomizerX;
            let y=innerHeight/2*randomizerY;

            this.bigFishes.push(new BigFish(this, x, y, width, height, "bigfish", i));
        }
        
        this.boxes = new Array<Box>();
        for(var i=1; i <= 5; i++){
            let multiplier:number;
            let type:string;
            let width:number;
            let height:number;
            
            switch (i) {
                case 1:
                    type="star";
                    width=96;
                    height=96;
                    multiplier=5;
                    break;
                case 2:
                    type="coin";
                    width=100;
                    height=100; 
                    multiplier=3;      
                    break;
                case 3:
                    type="coinsmall";
                    width=50;
                    height=50;      
                    multiplier=1;
                    break; 
                case 4:
                    type="clock";
                    width=100;
                    height=100;    
                    multiplier=3;  
                    break;  
                case 5:
                    type="thunder";
                    width=45;
                    height=100;      
                    multiplier=3;
                    break;
                default:
                    break;
            }
            
            let randomX : number = innerWidth*Math.random();
            let randomY=(-innerHeight*Math.random()*multiplier)-innerHeight;  
            
            this.boxes.push(new Box(this, randomX, randomY, width, height, type));
        }
        
        let bottomY = innerHeight-185;
        let leftX = innerWidth/4;
        let rightX = innerWidth/4*3
        this.player = new Player(this, leftX, bottomY, 352, 125, "playerfish", 1);
        this.player2 = new Player(this, rightX, bottomY, 352, 125, "playerfish2", 2);
    }
    
    public update() : void {          
        if(!this.gameOver){
            this.player.update();
            this.player2.update();
        }
        else{
            switch (this.winner) {
                case 1:
                    this.player.autoSwim(true);
                    this.player2.autoSwim(false);
                    break;
                case 2:
                    this.player.autoSwim(false);
                    this.player2.autoSwim(true);
                    break;
                default:
                    break;
            }
        }

        let playerBounds:Rectangle = this.player.getBounds();
        let player2Bounds:Rectangle = this.player2.getBounds();
        
        
        for(let fish of this.smallFishes){
            if(!this.gameOver){
                let smallFishBounds:Rectangle = fish.getBounds();
                let hitSmallFish = playerBounds.hitsSmallFish(smallFishBounds);
                let hitSmallFish2 = player2Bounds.hitsSmallFish(smallFishBounds);
                
                if(hitSmallFish || hitSmallFish2){
                    if(hitSmallFish){
                        this.display.updateScores(10,1);
                    }
                    else{
                        this.display.updateScores(10,2);
                    }
                    
                    fish.eaten();
                    fish.playSound("smallfish");
                    let boost = fish.getBoost();
                    let fishIsBoost=fish.getFishIsBoost();
                    if(boost&&fishIsBoost){
                        fish.setBoost(false, 1);
                    }
                }
            }
            
            fish.update();
        }

        for(let fish of this.bigFishes){
            if(!this.gameOver){
                let bigFishBounds:Rectangle = fish.getBounds();
                let hitBigFish = playerBounds.hitsBigFish(bigFishBounds);
                let hitBigFish2 = player2Bounds.hitsBigFish(bigFishBounds);
                
                if(hitBigFish || hitBigFish2){
                    if(hitBigFish){
                        this.display.updateScores(-1,1);
                    }
                    else{
                        this.display.updateScores(-1,2);
                    }
                    fish.playSound("bigfish");
                }
            }   
            fish.update();
        }        
        
        for(let box of this.boxes){
            let type = box.getBoxType();
            if(!this.gameOver){                
                let boxBounds:Rectangle = box.getBounds();
                let hitBox = playerBounds.hitsBox(boxBounds);
                let hitBox2 = player2Bounds.hitsBox(boxBounds);
                
                
                if(hitBox || hitBox2){
                    switch (type) {
                        case "clock":
                            box.eaten();
                            box.playSound("clock");
                            for(let fish of this.bigFishes){
                                fish.slowDown();
                            }
                            for(let fish of this.smallFishes){
                                fish.slowDown();
                            }
                            if(hitBox){
                                this.player.speedUp();
                                this.player2.slowDown();    
                            }
                            else{
                                this.player2.speedUp();
                                this.player.slowDown();
                            }
                            
                            break;
                    
                        case "coin":
                            box.eaten();
                            box.playSound("coin");
                            if(hitBox){
                                this.display.updateScores(100,1);    
                            }
                            else{
                                this.display.updateScores(100,2);    
                            }
                            break;
                            
                        case "coinsmall":
                            box.eaten();
                            box.playSound("coinsmall");
                            if(hitBox){
                                this.display.updateScores(50,1);    
                            }
                            else{
                                this.display.updateScores(50,2);    
                            }
                            break;
                            
                        case "star":
                            box.eaten();
                            box.playSound("star");
                            for(let fish of this.smallFishes){
                                let boost=fish.getBoost();
                                if(!boost){
                                    fish.setBoost(true, 1);
                                }
                            }
                            break;  
                            
                        case "thunder":
                            box.eaten();
                            box.playSound("thunder");
                            for(let fish of this.smallFishes){
                                fish.eaten();
                                if(hitBox){
                                    this.display.updateScores(5,1);    
                                }
                                else{
                                    this.display.updateScores(5,2);    
                                }
                                let boost = fish.getBoost();
                                let fishIsBoost=fish.getFishIsBoost();
                                if(boost&&fishIsBoost){
                                    fish.setBoost(false, 1);
                                    if(hitBox){
                                        this.display.updateScores(5,1);    
                                    }
                                    else{
                                        this.display.updateScores(5,2);    
                                    }
                                }
                            }              
                    } 
                }
            }
            switch (type) {
                case "clock":
                    box.update(3);
                    break;
            
                case "coin":
                    box.update(3);
                    break;
                    
                case "coinsmall":
                    box.update(1);
                    break;
                    
                case "star":
                    box.update(5);
                    break;  
                    
                case "thunder":
                box.update(3); 
                }
            }
    }
    
    public draw() : void {       
        for(let fish of this.smallFishes)
        {
            let direction = fish.getDirection();
            
            if(direction<0.5){
                fish.drawreverse();
            }
            else{
                fish.draw();
            }
        }
        
        for(let fish of this.bigFishes)
        {
            let direction = fish.getDirection();
            
            if(direction<0.5){
                fish.drawreverse();
            }
            else{
                fish.draw();
            }
        }
        
        for(let box of this.boxes){
            box.draw();
        }
        
        this.player.draw();
        this.player2.draw();
    }
    
    public setGameOver(gameOver:boolean, player:number){
        this.gameOver=gameOver;
        this.playSong(gameOver);
        this.winner=player;
    }
    
    public playSong(gameOver:boolean){
        if(!gameOver){
            var sound = new Howl({
                urls: ['js/howler.js-master/background.mp3'],
                loop:true,
            }).play();
        }
        else{
            var sound = new Howl({
                urls: ['js/howler.js-master/gameover.mp3'],
                volume: 1
            }).play();
        }
    }
}