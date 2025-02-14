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
    constructor(x, y, canvasWidth, canvasHeight) {
        super(x, y);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

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
}

export default Player;
