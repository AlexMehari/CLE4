/// <reference path="gameobject.ts" />
/**
 * Big Fish
 */
class BigFish extends GameObject {
    private randomDirection : number;
    private speed : number = 1;
    private multiplier:number = (5*Math.random())+5;
    
    constructor(l:Level, x:number, y:number, width:number, height:number, tagName:string, fishNumber:number) {
        super(l, x, y, width, height, tagName);

        if(fishNumber%2==0){
            this.randomDirection = 1;    
        }
        else{
            this.randomDirection = 0;   
        }
    }
    
    public update() : void {         
        if(this.randomDirection<0.5){                        
            this.x-=this.multiplier*this.speed;
            if(this.speed<0.25) this.speed+=0.001;
            else if(this.speed<1) this.speed+=0.1;
            if(this.x < 0 - this.width){
                this.randomDirection=1;
                this.y = (innerHeight-this.height)*Math.random();
                this.multiplier=(5*Math.random())+5;
            }
        }
        else{
            this.x+=this.multiplier*this.speed;
            if(this.speed<0.25) this.speed+=0.001;
            else if(this.speed<1) this.speed+=0.1;
            if(this.x > innerWidth){
                this.randomDirection=0;
                this.y = (innerHeight-this.height)*Math.random();
                this.multiplier=(5*Math.random())+5;
            }
        }
    }
    
    public getDirection():number{
        return this.randomDirection;
    }
    
    public slowDown():void{
        this.speed=0;
    }
}