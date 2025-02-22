// Rooms
import FloorGenerator from "../rooms/floorGeneration.js";
import RoomGenerator from "../rooms/roomGeneration.js";

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

    this.floorNum = 1;
    this.gen = new FloorGenerator(this.floorNum, this.rng);
    const startX = 6, startY = 6;
    this.map = this.gen.generateFloorMap(startX, startY);

    this.currentRoomX = startX;
    this.currentRoomY = startY;
    this.currentRoom = this.map[this.currentRoomX][this.currentRoomY];
    this.roomGen = new RoomGenerator(this.floorNum, this.rng);
    this.roomGen.loadRoomLayouts().then(() =>{
      console.log(this.roomGen.getNextRoom());
    })
    

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