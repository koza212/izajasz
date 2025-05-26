class Renderer{
    constructor(map,width, height, scale, adjList, randRooms){
        this.height = height;
        this.width = width;
        this.scale = scale;
        this.adjList = adjList;
        this.randRooms = randRooms;
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

        this.interfaceSprites = 7;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage("./assets/images/map/background.png");
        this.createImage("./assets/images/map/background2.png");
        this.createImage("./assets/images/minimap/bigMapBackground.png");
        this.createImage("./assets/images/map/doors/top.png");
        this.createImage("./assets/images/map/doors/left.png");
        this.createImage("./assets/images/map/doors/right.png");
        this.createImage("./assets/images/map/doors/bottom.png");
        this.id_ghost = this.createImage("./assets/images/entities/player_not_active.png");
    }

    // animationArr should have: time for switching, animationFrames, frameWidth, frameHeight, framesInRow, height
    // switch=0, frames=1, frWidth=2, frHeight=3, frRow=4, height=5

    createImage(path, x = 0,y = 0,w = 100, h = 100, type = "object",constans = true, animationArr = null, currentState = 0, roomX = 6, roomY = 6){
        const img = new Image();
        img.src = path;
        this.id = this.id + 1;
        var id = this.id;
        if(animationArr != null){
            var delay = 0;
            this.renderArr.push({image: img, x, y, w, h, type, constans, animationArr, currentState, delay, id, roomX, roomY});
        }
        else{
            this.renderArr.push({image: img, x, y, w, h, type, constans, id, roomX, roomY});  // w = width | h = height
        }
        return this.id;
    }
    
    drawCoin(x, y, scale) {
        const ctx = this.ctx;
        const img = this.coinImg || (this.coinImg = new Image());
        if (!img.src) img.src = "assets/images/zeton.png";
        const coinSize = 80 * scale;
        if (img.complete) {
            ctx.drawImage(img, (x - coinSize/2) * this.scale, (y - coinSize/2) * this.scale, coinSize, coinSize);
        } else {
            img.onload = () => {
                ctx.drawImage(img, (x - coinSize/2) * this.scale, (y - coinSize/2) * this.scale, coinSize, coinSize);
            };
        }
    }

    CreateMapImages(currentRoomX, currentRoomY){
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
                this.renderMap(30,50,45,30,roomMaxLeft,roomMaxTop, currentRoomX, currentRoomY);
            }
            else{
                var height = (((roomMaxBottom*66 - roomMaxTop*66)) / 2 + 260);
                var width = (((roomMaxRight*100 - roomMaxLeft*100)) / 2 + 350);
                this.renderMap(height,width,100,66,roomMaxLeft,roomMaxTop, currentRoomX, currentRoomY);
            }
        }
        this.finished = true;
    }

    renderMap(marginTop,marginRow,width,height,roomMaxLeft,roomMaxTop, currentRoomX, currentRoomY){
        for(var i = 0; i < this.map.length; i++){
            for(var j = 0; j < this.map[i].length; j++){
                if(j == currentRoomX && i == currentRoomY){
                    this.roomAmount++;
                    this.createImage(
                        "./assets/images/minimap/roomWithPlayer.png",
                        -(roomMaxLeft*width) + (i * width) + marginRow, 
                        -(roomMaxTop*height) + (j * height) + marginTop, 
                        width, 
                        height, 
                        "smallMapRoom", 
                        false
                    );
                }
                else if(this.map[j][i] !== '-'){
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

    shouldGenMap(currentRoomX, currentRoomY){
        if(!this.MapToggled){
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(this.renderArr[i].constans == false){
                    this.renderArr.splice(i,1);
                }
            }
            this.finished = false;
            this.roomAmount = 0;
            this.CreateMapImages(currentRoomX, currentRoomY);
        }
        else{
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(this.renderArr[i].constans == false){
                    this.renderArr.splice(i,1);
                }
            }
            this.finished = false;
            this.roomAmount = 0;
            this.CreateMapImages(currentRoomX, currentRoomY);
        }
    }

    render(currentRoomX, currentRoomY, currentID){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas

        var key = `${currentRoomX},${currentRoomY}`;

        if(this.randRooms.has(key)){
            if(this.randRooms.get(key) == 1){
                this.ctx.drawImage(this.renderArr[0].image, 0, 0, this.width, this.height); // drawing the background
            }
            else{
                this.ctx.drawImage(this.renderArr[1].image, 0, 0, this.width, this.height); // drawing the background
            }

        }

        if(this.adjList.has(key)){
            var arr = this.adjList.get(key);
            console.log(arr);
            arr.forEach(element => {
                var coords = element.split(",");
                if(coords[0] == currentRoomX && coords[1] < currentRoomY){
                    this.ctx.drawImage(this.renderArr[4].image, 50 * this.scale, 400 * this.scale, 140 * this.scale, 250 * this.scale);
                }
                if(coords[0] == currentRoomX && coords[1] > currentRoomY){
                    this.ctx.drawImage(this.renderArr[5].image, 1725 * this.scale, 400 * this.scale, 140 * this.scale, 250 * this.scale);
                }
                if(coords[0] > currentRoomX && coords[1] == currentRoomY){
                    this.ctx.drawImage(this.renderArr[6].image, 835 * this.scale, 910 * this.scale, 250 * this.scale, 107 * this.scale);
                }
                if(coords[0] < currentRoomX && coords[1] == currentRoomY){
                    this.ctx.drawImage(this.renderArr[3].image, 835 * this.scale, 50 * this.scale, 250 * this.scale, 120 * this.scale);
                }
            });
        }


            //console.log("rendered background");
        
        //Rendering other sprites that are not fe. the UI
        for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
            if(this.renderArr[i].constans == true){
                if(this.renderArr[i].animationArr != null && currentRoomX == this.renderArr[i].roomX && currentRoomY == this.renderArr[i].roomY){

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
                    if(this.renderArr[i].id != currentID){
                        this.ctx.drawImage(this.renderArr[this.id_ghost-1].image
                        , (this.renderArr[i].animationArr[this.renderArr[i].currentState][2]*this.x) 
                        , (this.renderArr[i].animationArr[this.renderArr[i].currentState][5])
                        , (this.renderArr[i].animationArr[this.renderArr[i].currentState][2])
                        , (this.renderArr[i].animationArr[this.renderArr[i].currentState][3])
                        , this.renderArr[i].x * this.scale
                        , this.renderArr[i].y * this.scale
                        , this.renderArr[i].w * this.scale
                        , this.renderArr[i].h * this.scale);
                        }
                    else{
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
                    
                }
                else{
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
        // Rendering the smaller map if the bigger is not used
        if(!this.MapToggled){
            this.shouldGenMap(currentRoomX, currentRoomY);
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(!this.renderArr[i].constans){
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
        }
        else{
            this.ctx.drawImage(this.renderArr[2].image, 0, 0, this.width, this.height);
            this.shouldGenMap(currentRoomX, currentRoomY);
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(!this.renderArr[i].constans){
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x * this.scale, this.renderArr[i].y * this.scale, this.renderArr[i].w * this.scale, this.renderArr[i].h * this.scale);
                }
            }
        }
    }

    drawPlayerStats(players, currentPlayerIndex) {
        const statsDiv = document.getElementById('player-stats');
        if (!statsDiv) return;

        const coinIcon = 'assets/images/zeton.png';
        const hpIcon = 'assets/images/heart.png';
        const timerIcon = 'assets/images/clock.png'; 

        statsDiv.innerHTML = players.map((player, idx) => `
            <div class="player-stats-row${idx === currentPlayerIndex ? ' active-player' : ''}" style="opacity:${player.finished ? 0.5 : 1}">
                <span class="player-label">${player.name || `P${idx+1}`}</span>
                <img class="stat-icon heart" src="${hpIcon}" alt="HP">
                <span class="stat-value">${player.hp}</span>
                <img class="stat-icon" src="${coinIcon}" alt="Coins">
                <span class="stat-value">${player.coins}</span>
                <img class="stat-icon" src="${timerIcon}" alt="Timer">
                <span class="stat-value">${player.timer.toFixed(1)}s</span>
            </div>
        `).join('');
    }

    getCanvasWidth(){
        return this.canvas.width;
    }
    
    getCanvasHeight(){
        return this.canvas.height;
    }

};