import XOrShift from "./scripts/utils/math.js";
import FloorGenerator from "./scripts/floorGeneration.js";

import Renderer from "./rendering.js";
import Player from "./scripts/entities.js";

var GameRunning = true; 

var render = new Renderer;

    render.render();

const canvasHeight = render.getCanvasHeight();
const canvasWidth = render.getCanvasWidth();
//const player = new Player(canvasWidth / 8, canvasHeight / 8, canvasWidth, canvasHeight, render);


let rng = new XOrShift();
let gen = new FloorGenerator(1, rng);
let map = gen.generateFloorMap();
console.log(map);

