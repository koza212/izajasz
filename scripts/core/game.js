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

    var height = window.innerHeight;
    var width = height * (16/9);
    var scale = height / 1080;

    this.render = new Renderer(this.map, width, height, scale);
    this.render.render();

    this.canvasHeight = this.render.getCanvasHeight();
    this.canvasWidth = this.render.getCanvasWidth();

    this.players = [];
    for (let i = 0; i < 4; i++) {
      this.players.push(new Player(
        this.canvasWidth / 8 + i * 50, 
        this.canvasHeight / 8,
        1,
        this.canvasWidth,
        this.canvasHeight,
        this.render,
        this.map,
        scale,
        this.gen.adjList
      ));
    }
    this.currentPlayerIndex = 0;

    this.keyGetter = new KeyGetter(this.render, this.players[this.currentPlayerIndex]);
    window.addEventListener("keydown", this.keyGetter.keyPress);

    this.roomCoins = {}; 
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y] !== '-' && this.map[x][y] !== "Start") {
          this.roomCoins[`${x},${y}`] = true;
        }
      }
    }

    this.questions = prepareQuestions([
      {
        question: "What is 2+2?",
        answers: ["3", "4", "5", "6"],
        correctAnswer: 1
      },
      {
        question: "What is the capital of France?",
        answers: ["Berlin", "London", "Paris", "Rome"],
        correctAnswer: 2
      },
    ]);
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  triggerQuiz(key) {
    if (this.currentPlayer.inQuiz) return;
    this.currentPlayer.inQuiz = true;
    const questionObj = this.questions[Math.floor(Math.random() * this.questions.length)];
    showQuizModal(questionObj, (answeredCorrectly) => {
      if (answeredCorrectly) {
        this.currentPlayer.gainCoin();
      } else {
        this.currentPlayer.takeDamage();
      }
      this.roomCoins[key] = false; // Remove coin after answering
      this.currentPlayer.inQuiz = false;
      this.checkPlayerEnd();
      this.nextTurn();
    });
  }

  checkPlayerEnd() {
    if (this.currentPlayer.hp <= 0) {
      this.currentPlayer.finished = true;
    }
    if (this.currentPlayer.coins >= 3) {
      this.currentPlayer.finished = true;
    }
  }

  nextTurn() {
    let startIdx = this.currentPlayerIndex;
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      if (!this.players[this.currentPlayerIndex].finished && this.players[this.currentPlayerIndex].hp > 0) {
        break;
      }
    } while (this.currentPlayerIndex !== startIdx);

    this.keyGetter.player = this.players[this.currentPlayerIndex];
  }

  start() {
    setInterval(() => {
        this.render.render();
        this.render.drawPlayerStats(this.players);

        let pos = this.currentPlayer.posRoom;
        let key = `${pos.x},${pos.y}`;

        if (this.roomCoins[key]) {
            this.render.drawCoin(pos.x, pos.y, this.render.scale);

            const playerX = this.currentPlayer.x;
            const playerY = this.currentPlayer.y;

            const roomCenterX = this.canvasWidth / 2;
            const roomCenterY = this.canvasHeight / 2;
            const coinRadius = 40 * this.render.scale;
            
            const dx = playerX - roomCenterX;
            const dy = playerY - roomCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (
                distance < coinRadius &&
                !this.currentPlayer.inQuiz &&
                !this.currentPlayer.finished
            ) {
                this.triggerQuiz(key);
            }
        }

        this.currentPlayer.update();

    }, 1000 / this.FPS);
  }
}