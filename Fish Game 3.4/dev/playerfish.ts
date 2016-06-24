/// <reference path="gameobject.ts" />
/**
 * Player
 */
class Player extends GameObject {
    private downKey : number;
    private upKey : number;
    private leftKey : number;
    private rightKey : number;
    
    private downSpeed : number = 0;
    private upSpeed : number = 0;
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private speed : number = 1;

    private inputLeft : boolean;
    private inputRight : boolean;
    private inputDown : boolean;
    private inputUp : boolean;

    private gp:boolean = false;
    
    private player : number;
    private randomDirection : number = Math.random();
    
    constructor(l:Level, x:number, y:number, width:number, height:number, tagName:string, player:number) {
        super(l, x, y, width, height, tagName);
        
        if(player==1){
            this.upKey=87;
            this.downKey=83;
            this.leftKey=65;
            this.rightKey=68;
        }
        else{
            
            this.upKey = 38;
            this.downKey = 40;
            this.leftKey = 37;
            this.rightKey = 39;
        }
        
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        
        this.player = player;
    }

    private checkGamepad(player:number){
        var gp = navigator.getGamepads()[player];
        if(gp){
            this.gp=true;
            var axeLF = gp.axes[0];
            var axeLF2 = gp.axes[1];

            if(axeLF < -0.5) {
                this.inputLeft = true;
                this.inputRight = false;
            } else if(axeLF > 0.5) {
                this.inputLeft = false;
                this.inputRight = true;
            } else {
                this.inputLeft = false;
                this.inputRight = false;
            }

            if(axeLF2 < -0.5) {
                this.inputDown = true;
                this.inputUp = false;
            } else if(axeLF2 > 0.5) {
                this.inputDown = false;
                this.inputUp = true;
            } else {
                this.inputDown = false;
                this.inputUp = false;
            }
        }
    }
    
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upKey:
            this.upSpeed = 7.5;
            break;
        case this.downKey:
            this.downSpeed = -7.5;
            break;
        case this.leftKey:
            this.leftSpeed = -10;
            this.setDirection(-1);
            break;
        case this.rightKey:
            this.rightSpeed = 10;
            this.setDirection(1);
            break;
        }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upKey:
            this.upSpeed = 0;
            break;
        case this.downKey:
            this.downSpeed = 0;
            break;
        case this.leftKey:
            this.leftSpeed = 0;
            break;
        case this.rightKey:
            this.rightSpeed = 0;
            break;
        }
    }
    
    public update() : void {  
        if(this.player===1){
            this.checkGamepad(0);
        } 
        else if(this.player===2){
            this.checkGamepad(1);
        }       

        if(this.gp){
            if(this.inputLeft){
                if(this.x+this.leftSpeed<=0){
                this.leftSpeed=0;
                this.x=0;
                }
                else{
                    this.leftSpeed = -10;
                }
                this.setDirection(-1);
            }
            else{
                this.leftSpeed=0;
            }

            if(this.inputRight){
                if(this.x+this.rightSpeed>=innerWidth-this.width){
                    this.rightSpeed=0;
                    this.x=innerWidth-this.width;
                }
                else{
                    this.rightSpeed = 10;
                }
                this.setDirection(1);
            }
            else{
                this.rightSpeed=0;
            }

            if(this.inputDown){
                if(this.y+this.downSpeed<=10){
                    this.downSpeed=0;
                    this.y=0;
                }
                else{
                    this.downSpeed = 7.5;
                }
            }
            else{
                this.downSpeed=0;
            }

            if(this.inputUp){
                if(this.y+this.upSpeed>=innerHeight-this.height){
                    this.upSpeed=0;
                    this.y=innerHeight-this.height;
                }
                else{
                    this.upSpeed = -7.5;
                }
            }
            else{
                this.upSpeed=0;
            }
        }

        if(!this.gp){
            if(this.x+this.leftSpeed<=0){
            this.leftSpeed=0;
            }
            else if(this.x+this.rightSpeed>=innerWidth-this.width){
                this.rightSpeed=0;
            }
            else if(this.y+this.upSpeed<=0){
                this.upSpeed=0;
            }
            else if(this.y+this.downSpeed>=innerHeight-this.height){
                this.downSpeed=0;
            }
        }
        
        this.x+=(this.leftSpeed+this.rightSpeed)*this.speed;
        this.y-=(this.upSpeed+this.downSpeed)*this.speed;    
        
        if(this.speed>1.25) this.speed-=0.001;
        else if(this.speed>1) this.speed-=0.1;
        else if(this.speed<0.75) this.speed+=0.001;
        else if(this.speed<1) this.speed+=0.1;        
    }
    
    public speedUp() : void{
        this.speed=1.5;
    }
    
    public slowDown() : void{
        this.speed=0.5;
    } 
    
    public getPlayer() : number{
        return this.player;
    }
    
    public autoSwim(winner:boolean) : void {    
        let multiplier:number;
        if(winner){
            multiplier=1;
        }
        else{
            multiplier=0.25;
        }
             
        if(this.randomDirection<0.5){       
            this.x-=10*multiplier;              
            this.direction=-1;
            if(this.x < 0 - this.width){
                this.randomDirection=1;
                
                if(winner){
                    this.y = (innerHeight-this.height)/2*Math.random();
                }
                else{
                    this.y = (innerHeight-this.height)/2+((innerHeight-this.height)/2*Math.random());
                }
                
            }
        }
        else{
            this.x+=10*multiplier;
            this.direction=1;
            if(this.x > innerWidth){
                this.randomDirection=0;
                
                if(winner){
                    this.y = (innerHeight-this.height)/2*Math.random();
                }
                else{
                    this.y = (innerHeight-this.height)/2+((innerHeight-this.height)/2*Math.random());
                }
            }
        }
    }
}