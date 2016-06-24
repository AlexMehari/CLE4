/// <reference path="gameobject.ts" />
/**
 * Box
 */
class Box extends GameObject {  
    private type:string;
    private multiplier:number;
    
    constructor(l:Level, x:number, y:number, width:number, height:number, tagName:string) {
        super(l, x, y, width, height, tagName);
        this.type=tagName;
    }
    
    public update(multiplier:number) : void {                                    
        this.y+=2.5;
        this.multiplier=multiplier;
        
        let counter = 2500*Math.random()+2500;
        if(this.y>counter){
            let randomizerX : number = Math.random();
            this.x=(innerWidth)*randomizerX;
            
            let randomizerY=(-innerHeight*Math.random()*this.multiplier)-innerHeight;
            this.y=randomizerY;
        }
    }
    
    public getBoxType():string{
        return this.type;
    }    
    
    public eaten() : void{
        let randomizerX : number = Math.random();
        this.x=innerWidth*randomizerX;
        
        let randomizerY=(-innerHeight*Math.random()*this.multiplier)-innerHeight;
        this.y=randomizerY*this.multiplier;
    }
}