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
