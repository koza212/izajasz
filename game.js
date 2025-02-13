import XOrShift from "./scripts/utils/math.js";

let rng = new XOrShift(9481290);
for(let i = 0; i<100; i++){
    console.log(rng.next());
}