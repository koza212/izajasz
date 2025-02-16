
class Entity {
    constructor(x = 0, y = 0, vx = 0, vy = 0, width = 32, height = 32) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

class Player extends Entity {
    constructor(x, y, canvasWidth, canvasHeight, render,map) {
        super(x, y);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.render = render;

        this.id = render.createImage("./images/player.png",this.x,this.y);
        this.posRenderUpdate(this.id,render);

        for(var i = 0; i < map.roomsPlaced;i++){
            
        }
        this.roomCurrently = 0;

        this.hp = 6; 
        this.speed = 2;
        this.damage = 3.5;
        this.fireRate = 1; 
        this.range = 100;
        this.shotSpeed = 4;
        this.luck = 0;

        this.items = [];
        this.coins = 0;
        this.keys = 0;
        this.bombs = 0;
    }

    move(dx, dy) {
        this.vx = dx * this.speed;
        this.vy = dy * this.speed;
    }

    checkBounds() {
        this.x = Math.max(0, Math.min(this.canvasWidth - this.width, this.x));
        this.y = Math.max(0, Math.min(this.canvasHeight - this.height, this.y));
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }

    heal(amount) {
        this.hp = Math.min(12, this.hp + amount); 
    }

    addItem(item) {
        this.items.push(item);
    }

    update() {
        super.update();
        this.checkBounds();
    }

    moveInstant(x,y){
        this.x = x;
        this.y = y;
        this.posRenderUpdate(this.id,this.render);
    }

    posRenderUpdate(id){
        this.render.renderArr[id-1].x = this.x;
        this.render.renderArr[id-1].y = this.y;
    }
}

export default Player;
