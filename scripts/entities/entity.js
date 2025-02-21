
class Entity {
    constructor(path ,x = 0, y = 0,moveSpeed = 1, width = 32, height = 32) {
        this.path = path;
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
        this.checkIfPlayerMoving();
    }
}

export default Entity