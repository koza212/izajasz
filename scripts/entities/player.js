import Entity from "./entity.js";

class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
};

class Player extends Entity {
    constructor(x, y, moveSpeed, canvasWidth, canvasHeight, render, map, scale, adjList) {
        super(x, y);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.moveSpeed = moveSpeed;
        this.render = render;
        this.scale = scale;
        this.adjList = adjList;

        this.posRoom = new Position(6,6);

        this.animationArr = [

             // animationArr should have: time for switching, animationFrames, frameWidth, frameHeight, framesInRow, height
            // switch=0, frames=1, frWidth=2, frHeight=3, frRow=4, height=5
            
            [25,8,28,32,1,0], // standing
            [10,5,28,34,1,1*32], // walking towards camera
            [10,5,28,34,1,66], // walking backwards to camera 
            [10,8,28,33,1,100], // walking left
            [10,8,28,34,1,133]  // walking right

        ];

        this.id = render.createImage("./assets/images/entities/player.png", this.x, this.y, 150, 150,"player", true, this.animationArr, 0);
        this.shadowID = render.createImage("./assets/images/entities/shadow.png", this.x, (this.y - 20), 150, 150,"shadow", true);
        this.updateID();
        this.posRenderUpdate(this.realID);

        for(var i = 0; i < map.roomsPlaced;i++){
            
        }
        this.roomCurrently = 0;

        this.maxhp=6;
        this.hp = 6; 
        this.speed = 1;
        this.damage = 3.5;
        this.fireRate = 1; 
        this.range = 100;
        this.shotSpeed = 4;
        this.luck = 0;

        this.items = [];
        this.coins = 0;
        this.keys = 0;
        this.bombs = 0;

        this.bulletsArr = [];
    }

    move(dir) {
        if(dir == 1){
            if(this.speedX < 10){
                this.speedX = (this.speedX + 2);
                this.render.renderArr[this.realID-1].currentState = 4;
            }

        }
        else if(dir == 2){
            if(this.speedY > (-10)){
                this.speedY = (this.speedY - 2);
                if( this.speedX == 0){
                    this.render.renderArr[this.realID-1].currentState = 2;
                }
            }
        }
        else if(dir == 3){
            if(this.speedX > (-10)){
                this.speedX = (this.speedX - 2);
                this.render.renderArr[this.realID-1].currentState = 3;  
            }
        }
        else if(dir == 4){
            if(this.speedY < 10){
                this.speedY = (this.speedY + 2);
                if( this.speedX == 0){
                    this.render.renderArr[this.realID-1].currentState = 1;
                }
            }
        }
        this.posRenderUpdate(this.realID);
    }

    shooting(dir){
        if(dir == 1){
            var bullet = new Entity("./images/entities/ball.png",this.x, this.y, 5, 30, 30);
            this.bulletsArr.push(bullet);
            console.log("fired");
        }
        else if(dir == 2){
            
        }
        else if(dir == 3){
            
        }
        else if(dir == 4){
            
        }
    }

    checkIfPlayerMoving(){
        if( this.speedX == 0 && this.speedY == 0 ){
            this.render.renderArr[this.realID-1].currentState = 0;
            this.render.renderArr[this.realID-1].delay = 0;
        }
    }

    checkBounds() {
        this.x = Math.max(200, Math.min(1580, this.x));
        this.y = Math.max(100, Math.min(750, this.y));
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
        console.log(this.posRoom);
        console.log(this.adjList);

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

    // das volk das sind wir

    checkForDoors(){
        if(this.x < 230 && (this.y > 380 && this.y < 530)){
            console.log("left door");
            var key = `${this.posRoom.x},${this.posRoom.y-1}`;
            if(this.adjList.has(key)){
                this.posRoom.y -= 1;
                console.log("succesfully used left door");
                this.x = 1430;
            }
        }
        else if(this.x > 1540 && (this.y > 380 && this.y < 530)){
            console.log("right door");
            var key = `${this.posRoom.x},${this.posRoom.y+1}`;
            if(this.adjList.has(key)){
                this.posRoom.y += 1;
                console.log("succesfully used right door");
                this.x = 270;
            }
        }
        else if(this.y < 160 && (this.x > 850 && this.x < 970)){
            console.log("top door");
            var key = `${this.posRoom.x-1},${this.posRoom.y}`;
            if(this.adjList.has(key)){
                this.posRoom.x -= 1;
                console.log("succesfully used top door");
                this.y = 740;
            }
        }
        else if(this.y > 740 && (this.x > 850 && this.x < 970)){
            console.log("bottom door");
            var key = `${this.posRoom.x+1},${this.posRoom.y}`;
            if(this.adjList.has(key)){
                this.posRoom.x += 1;
                console.log("succesfully used bottom door");
                this.y = 170;
            }
        }
    }




}

export default Player;
