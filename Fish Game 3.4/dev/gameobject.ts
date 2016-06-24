class GameObject {
    protected div: HTMLElement;    
    protected x:number;
    protected y:number;
    protected width:number;
    protected height:number;
    protected level:Level;
    protected direction:number=1;
    
    public getBounds():Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
    
    public setDirection(direction:number){
         this.direction = direction;
    }
    
    public getDirection():number{
        return this.direction;
    }
    
    constructor(l:Level, x:number, y:number, width:number, height:number, tagName:string) {
        this.level = l;
        
        this.div = document.createElement(tagName);
        this.level.div.appendChild(this.div);
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX("+this.direction+")";
    }
    
    public drawreverse() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(-1)";
    }
    
    public playSound(type:string) : void {
        switch (type) {
            case "smallfish":
                var sound = new Howl({urls: ['js/howler.js-master/smallfish.mp3']}).play();
                break;
                
            case "bigfish":
                var sound = new Howl({
                    urls: ['js/howler.js-master/bigfish.mp3'],
                    volume:0.15
                }).play();
                break;    
                
            case "thunder":
                var sound = new Howl({urls: ['js/howler.js-master/thunder.mp3']}).play();
                break;
                
            case "clock":
                var sound = new Howl({urls: ['js/howler.js-master/clock.mp3']}).play();
                break;
                
            case "coin":
                var sound = new Howl({urls: ['js/howler.js-master/coin.mp3']}).play();
                break;
                
            case "coinsmall":
                var sound = new Howl({urls: ['js/howler.js-master/coinsmall.mp3']}).play();
                break;
                
            case "star":
                var sound = new Howl({urls: ['js/howler.js-master/star.mp3']}).play();
                break;
        
            default:
                break;
        }
    }
}