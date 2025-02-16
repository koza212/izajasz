class KeyGetter{
    constructor(render){
        this.render = render;
        this.mapOpened = false;
        this.updateRenderValue = this.updateRenderValue.bind(this);
        this.keyPress = this.keyPress.bind(this);
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