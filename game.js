import XOrShift from "./scripts/utils/math.js";
import FloorGenerator from "./scripts/floorGeneration.js";

import Renderer from "./scripts/rendering.js";
import Player from "./scripts/entities.js";

import KeyGetter from "./scripts/keyGetter.js";

let rng = new XOrShift();
let gen = new FloorGenerator(1, rng);
let map = gen.generateFloorMap();

var height = window.innerHeight;
var width = height * (16/9);

var scale = height / 1080;

const FPS = 60;

var render = new Renderer(map, width, height, scale);
render.render();

const canvasHeight = render.getCanvasHeight();
const canvasWidth = render.getCanvasWidth();
const player = new Player(canvasWidth / 8, canvasHeight / 8, 1, canvasWidth, canvasHeight, render,map);

var keyGetter = new KeyGetter(render,player);

player.moveInstant(700*scale,500*scale);

window.addEventListener("keydown",keyGetter.keyPress);
setInterval(() => {
    render.render();
    player.update();
    console.log(player.x + player.y);
}, 17); 

