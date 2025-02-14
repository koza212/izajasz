class Renderer{
    constructor(){
        this.renderArr = [];
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage("./images/background.png");
        //this.createImage("");
    }

//    let imgObj = new Image();
    
    createImage(path){
        this.img = new Image();
        this.img.src = path;
        this.renderArr.push(this.img);
    }

    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas
        for(var i = 0; i < this.renderArr.length; i++){
            this.ctx.drawImage(this.renderArr[i], 0, 0, window.innerWidth, window.innerHeight); // drawing
            console.log("rendered object");
        }
        requestAnimationFrame(this.render); // loop
    }
};

export default Renderer;