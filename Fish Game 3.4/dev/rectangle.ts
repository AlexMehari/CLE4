/**
 * Rectangle
 * tip: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
class Rectangle {
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    
    constructor(x:number, y:number, w:number, h:number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    
    public hitsBigFish(rec1: Rectangle): boolean {
         if((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y)==true){
                 return true;
         }
         else{
             return false;
         }
    }    
    
    public hitsSmallFish(rec1: Rectangle): boolean {
         if((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y)==true){
                 return true;
         }
         else{
             return false;
         }
    }
    
    public hitsBox(rec1: Rectangle): boolean {
         if((this.x < rec1.x + rec1.width && this.x + this.width > rec1.x && this.y < rec1.y + rec1.height && this.height + this.y > rec1.y)==true){
                 return true;
         }
         else{
             return false;
         }
    }
}