const keysPressed = {};

class KeyGetter {
    constructor(render, player) {
        this.player = player;
        this.render = render;
        this.mapOpened = false;
        this.updateRenderValue = this.updateRenderValue.bind(this);
        this.keyPress = this.keyPress.bind(this);
        
        document.addEventListener("keydown", (event) => {
            keysPressed[event.key] = true;
        });

        document.addEventListener("keyup", (event) => {
            delete keysPressed[event.key];
        });

        this.movementKeys();

        this.shootingChangableCooldown = 30;
        this.fireCooldown = 0;
    }

    shootCooldown(){
        if(this.fireCooldown > 0){
            this.fireCooldown--;
            console.log(this.fireCooldown);
        }
    }

    movementKeys() {
        const update = () => {
            if (keysPressed["w"]) {
                this.player.move(2);
                console.log("w");
            }
            if (keysPressed["a"]) {
                this.player.move(3);
                console.log("a");
            }
            if (keysPressed["s"]) {
                this.player.move(4);
                console.log("s");
            }
            if (keysPressed["d"]) {
                this.player.move(1);
                console.log("d");
            }
            if (keysPressed["ArrowUp"]) {
                if(this.fireCooldown == 0){
                    this.fireCooldown = this.shootingChangableCooldown;
                    this.player.shooting(1);
                }
                console.log("ArrowUp");
            }
            if (keysPressed["ArrowLeft"]) {
                if(this.fireCooldown == 0){
                    this.fireCooldown = this.shootingChangableCooldown;
                    this.player.shooting(2);
                }
                console.log("ArrowLeft");
            }
            if (keysPressed["ArrowDown"]) {
                if(this.fireCooldown == 0){
                    this.fireCooldown = this.shootingChangableCooldown;
                    this.player.shooting(3);
                }
                console.log("ArrowDown");
            }
            if (keysPressed["ArrowRight"]) {
                if(this.fireCooldown == 0){
                    this.fireCooldown = this.shootingChangableCooldown;
                    this.player.shooting(4);
                }
                console.log("ArrowRight");
            }
            requestAnimationFrame(update);
        };

        update();
    }

    updateRenderValue() {
        this.render.MapToggled = this.mapOpened;
    }

    keyPress(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.mapOpened = !this.mapOpened;
            this.updateRenderValue();
        }
    }
};

export default KeyGetter;
