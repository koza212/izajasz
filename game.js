import XOrShift from "./scripts/utils/math.js";
import Renderer from "./rendering.js";
import Player from "./scripts/entities.js";

var GameRunning = true; 

var render = new Renderer;

    render.render();

const canvasHeight = render.getCanvasHeight();
const canvasWidth = render.getCanvasWidth();
const player = new Player(canvasWidth / 8, canvasHeight / 8, canvasWidth, canvasHeight, render);
console.log(player);
player.moveInstant(300,400);

player.x = 1000;
console.log(player.x);
console.log(render.renderArr[1]);


console.log(player);
console.log(player.id);

player.moveInstant(300,800);