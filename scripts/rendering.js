class Renderer{
    constructor(map){
        this.MapToggled = false;
        this.map = map;
        this.renderArr = [];
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.roomAmount = 0;
        this.currentRoom = 0;

        this.finished = false;

        this.interfaceSprites = 2;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage("./images/background.png");
        this.createImage("./images/mapBackground.png", 10,10,300,300);

        //this.createImage("");
    }

//    let imgObj = new Image();
    
    createImage(path, x = 0,y = 0,w = 100, h = 100, constans = true){
        const img = new Image();
        img.src = path;
        this.renderArr.push({image: img, x, y, w, h, constans}); // w = width | h = height
        return this.renderArr.length;
    }

    CreateMapImages(){
        var roomMaxLeft = 0;
        if(!this.finished){
            for(var i = 0; i < this.map.length; i++){
                for(var j = 0; j < this.map[i].length; j++){
                    if(this.map[j][i] !== '-'){
                        if(roomMaxLeft < i){
                            roomMaxLeft = i;
                        }
                    }
                }   
            }
            console.log(roomMaxLeft)
            for(var i = 0; i < this.map.length; i++){
                for(var j = 0; j < this.map[i].length; j++){
                    if(this.map[j][i] !== '-'){
                        //if(this.roomAmount == )
                        this.roomAmount++;
                        console.log(this.renderArr);
                        this.createImage("./images/room.png",-(roomMaxLeft*17)+i*45,-60+j*35,45,35, false);
                    }
                }   
            }
        }
        this.finished = true;
    }

    shouldGenMap(){
        if(!this.MapToggled){
            this.CreateMapImages();
            console.log(this.MapToggled);
        }
        else{
            console.log(this.MapToggled);
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(this.renderArr[i].constans == false){
                    this.renderArr.splice(i,1);
                    console.log(this.renderArr);
                }
            }
            this.finished = false;
            this.roomAmount = 0;
        }
    }

    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas
        this.ctx.drawImage(this.renderArr[0].image, 0, 0, window.innerWidth, window.innerHeight); // drawing the background
            //console.log("rendered background");
        
        //Rendering other sprites that are not fe. the UI+
        for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
            if(this.renderArr[i].constans){
                this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x, this.renderArr[i].y, this.renderArr[i].w, this.renderArr[i].h);
            }
        }
        // Rendering the smaller map if the bigger is not used
        if(!this.MapToggled){
            this.ctx.drawImage(this.renderArr[1].image, this.renderArr[1].x, this.renderArr[1].y, this.renderArr[1].w, this.renderArr[1].h);
            this.shouldGenMap();
    
            for(var i = this.interfaceSprites; i < this.renderArr.length; i++){
                if(!this.renderArr[i].constans){
                    this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x, this.renderArr[i].y, this.renderArr[i].w, this.renderArr[i].h);
                }
            }
        }
        else{
            // tutaj bedzie duza mapa ale teraz mi sie nie chce jej dodac ;)
        }
        requestAnimationFrame(this.render); // loop
    }

    getCanvasWidth(){
        return this.canvas.width;
    }
    
    getCanvasHeight(){
        return this.canvas.height;
    }

};


export default Renderer;