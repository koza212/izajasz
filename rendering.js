class Renderer{
    constructor(){
        this.imageArray = [];
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1920;
        this.canvas.height = 1080;

        this.render = this.render.bind(this); // binding so in render it doesnt lose context

        this.createImage("");
        this.createImage("");
    }

//    let imgObj = new Image();
    
    createImage(path){
        this.img = new Image();
        this.img.src = path;
        this.imageArray.push(this.img);
    }

    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // cleaning the canvas
        if (this.img) {
            this.ctx.drawImage(this.imageArray[0], 0, 0); // drawing
            console.log("rendered object");
        }
        requestAnimationFrame(this.render); // loop
    }
};

export default Renderer;