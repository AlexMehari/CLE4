/// <reference path="gameobject.ts" />
/**
 * Small Fish
 */
class SmallFish extends GameObject {  
    private randomDirection : number;
    private multiplier : number = (5*Math.random())+2.5;
    private speed: number = 1;
    private boost: boolean;
    private fishIsBoost:number=0;
    private show:boolean;
    
    constructor(l:Level, x:number, y:number, width:number, height:number, tagName:string, randomDirection:number, boost:boolean) {
        super(l, x, y, width, height, tagName);
        
        this.randomDirection = randomDirection;
        this.boost=boost;
        this.show=boost;
    }
    
    public update() : void {
        if(this.boost){   
            if((!this.x && !this.y)|| !this.y && this.show){
                let randomizerX : number = Math.random();
                let randomizerY : number = Math.random();
                
                if(!this.y && this.show){
                    this.speed=1;
                }
                
                if(randomizerX<0.5){
                    this.x=innerWidth+this.width;
                    this.randomDirection = 0;
                }
                else{
                    this.x=0-this.width;
                    this.randomDirection = 1;
                }
                this.y=(innerHeight-this.height)*randomizerY;
                this.multiplier=(5*Math.random())+2.5;
            }                    
                            
            if(this.randomDirection<0.5){                        
                this.x-=this.multiplier*this.speed;
                if(this.speed<0.25) this.speed+=0.001;
                else if(this.speed<1) this.speed+=0.1;
                if(this.x < 0 - this.width){
                    this.x = innerWidth+this.width;
                    this.y = (innerHeight-this.height)*Math.random();
                    this.multiplier=(5*Math.random())+2.5;
                }
            }
            else{
                this.x+=this.multiplier*this.speed;
                if(this.speed<0.25) this.speed+=0.001;
                else if(this.speed<1) this.speed+=0.1;
                if(this.x > innerWidth){
                    this.x = 0-this.width;
                    this.y = (innerHeight-this.height)*Math.random();
                    this.multiplier=(5*Math.random())+2.5;
                }
            }
        }
        else{
            this.x=0-this.width;
            this.y=0;
            this.show=true;
        }
    }
    
    public getDirection():number{
        return this.randomDirection;
    }
    
    public getBoost(){
        return this.boost;
    }
    
    public getFishIsBoost(){
        return this.fishIsBoost;
    }
    
    public setBoost(boost:boolean, type:number){
        this.boost=boost;
        this.fishIsBoost=type;
    }
    
    public eaten() : void{
        this.x=0;
        this.y=0;
    }
    
    public slowDown() : void{
        this.speed=0;
    }
}