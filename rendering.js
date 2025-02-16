class Renderer{
    constructor(){
        this.renderArr = [];
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage = this.createImage.bind(this);

        this.createImage("./images/background.png");
        //this.createImage("");
    }

//    let imgObj = new Image();
    
    createImage(path, x = 0,y = 0,w = 100, h = 100){
        const img = new Image();
        img.src = path;
        this.renderArr.push({image: img, x, y, w, h}); // w = width | h = height
        return this.renderArr.length;
    }

    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas
        this.ctx.drawImage(this.renderArr[0].image, 0, 0, window.innerWidth, window.innerHeight); // drawing
            //console.log("rendered background");
        for(var i = 1; i < this.renderArr.length; i++){
            this.ctx.drawImage(this.renderArr[i].image, this.renderArr[i].x, this.renderArr[i].y, this.renderArr[i].w, this.renderArr[i].h); // drawing
            //console.log("rendered object");
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