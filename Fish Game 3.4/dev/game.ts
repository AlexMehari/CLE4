/// <reference path="level.ts"/>
class Game { 
    private level:Level;
     
    constructor() {
        this.level = new Level(this);
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    private gameLoop(){ 
        this.level.update();
        this.level.draw();
                
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this));
    }
} 

