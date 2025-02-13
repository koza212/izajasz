// Scope - <0, 1)
class XOrShift{
    constructor(seed = Date.now()){
        this.state = seed;
    }

    next(){
        let x = this.state;
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        this.state = x;
        return (x >>> 0) / 2 ** 32;
    }
}

export default XOrShift;