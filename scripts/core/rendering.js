class Renderer{
    constructor(map,width, height, scale){
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.MapToggled = false;
        this.map = map;
        this.renderArr = [];
        this.id = 0;

        this.roomWidth = 1800;
        this.roomHeight = 1200; 

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;

        this.x = 0;  

        this.roomAmount = 0;
        this.currentRoom = 0;

        this.finished = false;

        this.interfaceSprites = 2;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage("./assets/images/map/background.png");
        this.createImage("./assets/images/minimap/bigMapBackground.png");
    }

    // animationArr should have: time for switching, animationFrames, frameWidth, frameHeight, framesInRow, height
    // switch=0, frames=1, frWidth=2, frHeight=3, frRow=4, height=5

    createImage(path, x = 0,y = 0,w = 100, h = 100, type = "object",constans = true, animationArr = null, currentState = 0){
        const img = new Image();
        img.src = path;
        this.id = this.id + 1;
        var id = this.id;
        if(animationArr != null){
            var delay = 0;
            this.renderArr.push({image: img, x, y, w, h, type, constans, animationArr, currentState, delay, id});
        }
        else{
            this.renderArr.push({image: img, x, y, w, h, type, constans, id});  // w = width | h = height
        }
        return this.id;
    }
    
    drawCoin(x, y, scale) {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(
            this.canvas.width / 2,
            this.canvas.height / 2,
            40 * scale, 
            0, 2 * Math.PI
        );
        ctx.fill();
        ctx.restore();
    }

    CreateMapImages(){
        var roomMaxLeft = this.map.length;
        var roomMaxRight = 0;
        var roomMaxTop = this.map.length;
        var roomMaxBottom = 0;
        if(!this.finished){
            for(var i = 0; i < this.map.length; i++){
                for(var j = 0; j < this.map[i].length; j++){
                    if(this.map[i][j] != '-'){
                        if(roomMaxLeft > j){
                            roomMaxLeft = j;
                        }
                        if(roomMaxRight < j){
                            roomMaxRight = j;
                        }
                        if(roomMaxTop > i){
                            roomMaxTop = i;
                        }
                        if(roomMaxBottom < i){
                            roomMaxBottom = i;
                        }
                    }
                }   
            }
            roomMaxRight++;
            if(!this.MapToggled){
                this.renderMap(30,50,45,30,roomMaxLeft,roomMaxTop);
            }
            else{
                var height = (((roomMaxBottom*66 - roomMaxTop*66)) / 2 + 260);
                var width = (((roomMaxRight*100 - roomMaxLeft*100)) / 2 + 350);
                console.log(width , height);
                this.renderMap(height,width,100,66,roomMaxLeft,roomMaxTop);
            }
        }
        this.finished = true;
    }

    renderMap(marginTop,marginRow,width,height,roomMaxLeft,roomMaxTop){
        for(var i = 0; i < this.map.length; i++){
            for(var j = 0; j < this.map[i].length; j++){
                if(this.map[j][i] !== '-'){
                    this.roomAmount++;
                    this.createImage(
                        "./assets/images/minimap/room.png",
                        -(roomMaxLeft*width) + (i * width) + marginRow, 
                        -(roomMaxTop*height) + (j * height) + marginTop, 
                        width, 
                        height, 
                        "smallMapRoom", 
                        false
                    );
                }
            }   
        }
    }

    shouldGenMap(){
        if(!this.MapToggled){
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(this.renderArr[i].constans == false){
                    this.renderArr.splice(i,1);
                }
            }
            this.finished = false;
            this.roomAmount = 0;
            this.CreateMapImages();
        }
        else{
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(this.renderArr[i].constans == false){
                    this.renderArr.splice(i,1);
                }
            }
            this.finished = false;
            this.roomAmount = 0;
            this.CreateMapImages();
        }
    }

    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas
        this.ctx.drawImage(this.renderArr[0].image, 0, 0, this.width, this.height); // drawing the background
            //console.log("rendered background");
        
        //Rendering other sprites that are not fe. the UI
        for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
            if(this.renderArr[i].constans == true){
                if(this.renderArr[i].animationArr != null){

                    // animationArr should have: time for switching, animationFrames, frameWidth, frameHeight, framesInRow, height
                    // switch=0, frames=1, frWidth=2, frHeight=3, frRow=4, height=5
                        
                    if( this.x < this.renderArr[i].animationArr[this.renderArr[i].currentState][1]-1){
                        this.renderArr[i].delay++;
                        if(this.renderArr[i].delay > this.renderArr[i].animationArr[this.renderArr[i].currentState][0]){
                            this.x++;
                            this.renderArr[i].delay = 0;
                        }   
                    }
                    else{
                        this.renderArr[i].delay++;
                        if(this.renderArr[i].delay == this.renderArr[i].animationArr[this.renderArr[i].currentState][0]){
                            this.x = 0;
                            this.renderArr[i].delay = 0;
                        }   
                    }
                    this.ctx.drawImage(this.renderArr[i].image
                    , (this.renderArr[i].animationArr[this.renderArr[i].currentState][2]*this.x) 
                    , (this.renderArr[i].animationArr[this.renderArr[i].currentState][5])
                    , (this.renderArr[i].animationArr[this.renderArr[i].currentState][2])
                    , (this.renderArr[i].animationArr[this.renderArr[i].currentState][3])
                    , this.renderArr[i].x * this.scale
                    , this.renderArr[i].y * this.scale
                    , this.renderArr[i].w * this.scale
                    , this.renderArr[i].h * this.scale);
                    }
                    
                }
                else{
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
        // Rendering the smaller map if the bigger is not used
        if(!this.MapToggled){
            this.shouldGenMap();
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(!this.renderArr[i].constans){
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
        }
        else{
            this.ctx.drawImage(this.renderArr[1].image, 0, 0, this.width, this.height);
            this.shouldGenMap();
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(!this.renderArr[i].constans){
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
            // tutaj bedzie duza mapa ale teraz mi sie nie chce jej dodac ;)
        }
    }

    drawPlayerStats(players) {
        const ctx = this.ctx;
        ctx.save();
        ctx.font = "20px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        let x = this.canvas.width - 20;
        let y = 20;
        players.forEach((player, idx) => {
            ctx.fillStyle = player.finished ? "#888" : "#222";
            ctx.fillText(
                `P${idx+1}: HP ${player.hp} | Coins ${player.coins}`,
                x, y + idx * 28
            );
        });
        ctx.restore();
    }

    getCanvasWidth(){
        return this.canvas.width;
    }
    
    getCanvasHeight(){
        return this.canvas.height;
    }

};


export default Renderer;