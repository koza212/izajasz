class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
};

class Player extends Entity {
    constructor(x, y, moveSpeed, canvasWidth, canvasHeight, render, map, scale, adjList) {
        super(x, y);
        this.y = 450;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.moveSpeed = moveSpeed;
        this.render = render;
        this.scale = scale;
        this.adjList = adjList;
        this.finished = false;

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
        this.updateID();
        this.posRenderUpdate(this.realID);

        this.roomCurrently = 0;

        this.hp = 3; 
        this.coins = 0;

        this.timer = 0; 
    }

    move(direction) {
        switch (direction) {
            case 'right':
                this.speedX = 8;
                this.render.renderArr[this.realID-1].currentState = 4;
                break;
            case 'left':
                this.speedX = -8;
                this.render.renderArr[this.realID-1].currentState = 3;
                break;
            case 'up':
                this.speedY = -8;
                this.render.renderArr[this.realID-1].currentState = 2;
                break;
            case 'down':
                this.speedY = 8;
                this.render.renderArr[this.realID-1].currentState = 1;
                break;
            default:
                this.render.renderArr[this.realID-1].currentState = 0;
        }
        this.posRenderUpdate(this.realID);
    }

    gainCoin(){
        this.coins += 1;
    }

    takeDamage() {
        this.hp -= 1;
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

    update() {
        super.update();
        this.checkBounds();
        this.checkForDoors();
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
        this.render.renderArr[id-1].roomX = this.posRoom.x;
        this.render.renderArr[id-1].roomY = this.posRoom.y;
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
        else if(this.y < 160 && (this.x > 800 && this.x < 920)){
            console.log("top door");
            var key = `${this.posRoom.x-1},${this.posRoom.y}`;
            if(this.adjList.has(key)){
                this.posRoom.x -= 1;
                console.log("succesfully used top door");
                this.y = 740;
            }
        }
        else if(this.y > 740 && (this.x > 800 && this.x < 920)){
            console.log("bottom door");
            var key = `${this.posRoom.x+1},${this.posRoom.y}`;
            if(this.adjList.has(key)){
                this.posRoom.x += 1;
                console.log("succesfully used bottom door");
                this.y = 170;
            }
        }

        if (typeof window.game !== "undefined") {
            window.game.currentRoomX = this.posRoom.x;
            window.game.currentRoomY = this.posRoom.y;
        }
    }
}