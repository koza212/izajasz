import XOrShift from "./scripts/utils/math.js";
import FloorGenerator from "./scripts/floorGeneration.js";

import Renderer from "./scripts/rendering.js";
import Player from "./scripts/entities.js";

import KeyGetter from "./scripts/keyGetter.js";

let rng = new XOrShift();
let gen = new FloorGenerator(1, rng);
let map = gen.generateFloorMap();

var render = new Renderer(map);
var keyGetter = new KeyGetter(render);

window.addEventListener("keydown",keyGetter.keyPress);


    render.render();

console.log(map);


const canvasHeight = render.getCanvasHeight();
const canvasWidth = render.getCanvasWidth();
const player = new Player(canvasWidth / 8, canvasHeight / 8, canvasWidth, canvasHeight, render,map);

