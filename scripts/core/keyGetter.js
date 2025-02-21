const keysPressed = {};

class KeyGetter{
    constructor(render,player){
        this.player = player;
        this.render = render;
        this.mapOpened = false;
        this.updateRenderValue = this.updateRenderValue.bind(this);
        this.keyPress = this.keyPress.bind(this);

        document.addEventListener("keydown", (event) => {
            keysPressed[event.key] = true;
            if (keysPressed["w"]) {
                player.move(2);
                console.log("w");
            }
            if (keysPressed["a"]) {
                player.move(3);
                console.log("a");
            }
            if (keysPressed["s"]) {
                player.move(4);
                console.log("s");
            }
            if (keysPressed["d"]) {
                player.move(1);
                console.log("d");
            }
        });
        
        document.addEventListener("keyup", (event) => {
            delete keysPressed[event.key]; 
        });
    }

    updateRenderValue(){
        this.render.MapToggled = this.mapOpened;
    }

    keyPress(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if(this.mapOpened){
                this.mapOpened = false;
            }
            else{
                this.mapOpened = true;
            }
            this.updateRenderValue();
        }
    }
};
export default KeyGetter;