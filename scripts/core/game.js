// Rooms
import FloorGenerator from "../rooms/floorGeneration.js";

// Entities
import Player from "../entities/player.js";

// Core
import Renderer from "./rendering.js";
import KeyGetter from "./keyGetter.js";

// Utils
import XOrShift from "../utils/math.js";

class Game {
  constructor() {
    this.FPS = 60;
    this.rng = new XOrShift();
    
    this.gen = new FloorGenerator(1, this.rng);
    this.map = this.gen.generateFloorMap();

    var height = window.innerHeight;
    var width = height * (16/9);

    var scale = height / 1080;

    this.render = new Renderer(this.map,width,height,scale);
    this.render.render();

    this.canvasHeight = this.render.getCanvasHeight();
    this.canvasWidth = this.render.getCanvasWidth();

    this.player = new Player(
      this.canvasWidth / 8,
      this.canvasHeight / 8,
      1,
      this.canvasWidth,
      this.canvasHeight,
      this.render,
      this.map,
      scale
    );

    this.keyGetter = new KeyGetter(this.render, this.player);
    window.addEventListener("keydown", this.keyGetter.keyPress);
  }

  start() {
    setInterval(() => {
      this.render.render();
      this.player.update();
      this.keyGetter.shootCooldown();
    }, 1000 / this.FPS);
  }
}

export default Game;