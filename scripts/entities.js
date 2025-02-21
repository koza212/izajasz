
class Entity {
    constructor(x = 0, y = 0,moveSpeed = 1, width = 32, height = 32) {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
        this.id;
        this.realID;
    }

    update() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        if( this.speedX > 0 ){
            this.speedX = (this.speedX - 1);
        }
        else if( this.speedX < 0 ){
            this.speedX = (this.speedX + 1);
        }
        if( this.speedY > 0 ){
            this.speedY = (this.speedY - 1);
        }
        else if( this.speedY < 0 ){
            this.speedY = (this.speedY + 1);
        }
        this.updateID();
        this.posRenderUpdate(this.realID);
        console.log(this.id);
        this.checkIfPlayerMoving();
    }
}

class Player extends Entity {
    constructor(x, y, moveSpeed, canvasWidth, canvasHeight, render, map) {
        super(x, y);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.moveSpeed = moveSpeed;

        this.render = render;

        this.animationArr = [

             // animationArr should have: time for switching, animationFrames, frameWidth, frameHeight, framesInRow, height
            // switch=0, frames=1, frWidth=2, frHeight=3, frRow=4, height=5
            
            [25,8,28,32,1,0], // standing
            [10,5,28,34,1,1*32], // walking towards camera
            [10,5,28,34,1,66], // walking backwards to camera 
            [10,8,28,33,1,100], // walking left
            [10,8,28,34,1,133]  // walking right

        ];

        this.id = render.createImage("./images/entities/player.png", this.x, this.y, 150, 150,"player", true, this.animationArr, 0);
        this.updateID();
        this.posRenderUpdate(this.realID);

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

    move(dir) {
        if(dir == 1){
            if(this.speedX < 10){
                this.speedX = (this.speedX + 3);
                this.render.renderArr[this.realID-1].currentState = 4;
            }

        }
        else if(dir == 2){
            if(this.speedY > (-10)){
                this.speedY = (this.speedY - 3);
                this.render.renderArr[this.realID-1].currentState = 2;
            }
        }
        else if(dir == 3){
            if(this.speedX > (-10)){
                this.speedX = (this.speedX - 3);
                this.render.renderArr[this.realID-1].currentState = 3;  
            }
        }
        else if(dir == 4){
            if(this.speedY < 10){
                this.speedY = (this.speedY + 3);
                this.render.renderArr[this.realID-1].currentState = 1;
            }
        }
        this.posRenderUpdate(this.realID);
    }

    checkIfPlayerMoving(){
        if( this.speedX == 0 && this.speedY == 0 ){
            this.render.renderArr[this.realID-1].currentState = 0;
            this.render.renderArr[this.realID-1].delay = 0;
        }
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
        this.posRenderUpdate(this.realID);
    }

    updateID(){
        for(var i = 0; i < this.render.renderArr.length; i++){
            if(this.id == this.render.renderArr[i].id){
                this.realID = i+1;
            }
        }
    }

    posRenderUpdate(id){
        this.render.renderArr[id-1].x = this.x;
        this.render.renderArr[id-1].y = this.y;
    }
}

export default Player;
