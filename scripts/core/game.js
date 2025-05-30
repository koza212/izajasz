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

    this.render = new Renderer(this.map, width, height, scale, this.gen.adjList, this.gen.randRooms);
    this.render.render();

    this.canvasHeight = this.render.getCanvasHeight();
    this.canvasWidth = this.render.getCanvasWidth();

    let playerCount = parseInt(localStorage.getItem('playerCount'), 10);
    if (![2, 3, 4].includes(playerCount)) playerCount = 4;

    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player(
        200,
        600 +( 170 * i),
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

    this.roomCoins = {}; 
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y] !== '-' && this.map[x][y] !== "Start") {
          const marginX = this.canvasWidth * 0.25;
          const marginY = this.canvasHeight * 0.25;
          const coinX = Math.random() * (this.canvasWidth - 2 * marginX) + marginX;
          const coinY = Math.random() * (this.canvasHeight - 2 * marginY) + marginY;
          this.roomCoins[`${x},${y}`] = { active: true, x: coinX, y: coinY };
        }
      }
    }

    this.questions = prepareQuestions(questions);

    this.heldDirection = null;

    const setDirection = dir => {
      this.heldDirection = dir;
    };
    const clearDirection = dir => {
      if (this.heldDirection === dir) this.heldDirection = null;
    };

    document.getElementById('move-up').onmousedown = () => setDirection('up');
    document.getElementById('move-down').onmousedown = () => setDirection('down');
    document.getElementById('move-left').onmousedown = () => setDirection('left');
    document.getElementById('move-right').onmousedown = () => setDirection('right');

    document.getElementById('move-up').onmouseup = () => clearDirection('up');
    document.getElementById('move-down').onmouseup = () => clearDirection('down');
    document.getElementById('move-left').onmouseup = () => clearDirection('left');
    document.getElementById('move-right').onmouseup = () => clearDirection('right');

    document.getElementById('move-up').ontouchstart = e => { e.preventDefault(); setDirection('up'); };
    document.getElementById('move-down').ontouchstart = e => { e.preventDefault(); setDirection('down'); };
    document.getElementById('move-left').ontouchstart = e => { e.preventDefault(); setDirection('left'); };
    document.getElementById('move-right').ontouchstart = e => { e.preventDefault(); setDirection('right'); };

    document.getElementById('move-up').ontouchend = () => clearDirection('up');
    document.getElementById('move-down').ontouchend = () => clearDirection('down');
    document.getElementById('move-left').ontouchend = () => clearDirection('left');
    document.getElementById('move-right').ontouchend = () => clearDirection('right');

    window.addEventListener('mouseup', () => this.heldDirection = null);
    window.addEventListener('touchend', () => this.heldDirection = null);

    document.getElementById('map-btn').onclick = () => {
        this.render.MapToggled = !this.render.MapToggled;
    };
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
      this.roomCoins[key] = false; 
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
    this.checkGameOver();
}

  nextTurn() {
    let startIdx = this.currentPlayerIndex;
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      if (!this.players[this.currentPlayerIndex].finished && this.players[this.currentPlayerIndex].hp > 0) {
        break;
      }
    } while (this.currentPlayerIndex !== startIdx);

    this.currentRoomX = this.currentPlayer.posRoom.x;
    this.currentRoomY = this.currentPlayer.posRoom.y;

    this.keyGetter.player = this.players[this.currentPlayerIndex];
  }

  handleMove(direction) {
    if (this.currentPlayer.inQuiz || this.currentPlayer.finished) return;
    // Play walking sound
    const walkSound = document.getElementById('walkSound');
    if (walkSound) {
      walkSound.currentTime = 0;
      walkSound.play();
    }
    switch (direction) {
      case 'up':
        this.currentPlayer.move(0, -1);
        break;
      case 'down':
        this.currentPlayer.move(0, 1);
        break;
      case 'left':
        this.currentPlayer.move(-1, 0);
        break;
      case 'right':
        this.currentPlayer.move(1, 0);
        break;
    }
  }
  
  start() {
    setInterval(() => {
        this.render.render(this.currentPlayer.posRoom.x, this.currentPlayer.posRoom.y, this.currentPlayer.id);
        this.render.drawPlayerStats(this.players, this.currentPlayerIndex);

        if (!this.currentPlayer.finished) {
          if(!this.currentPlayer.inQuiz){
            this.currentPlayer.move(this.heldDirection);
          }
          this.currentPlayer.timer += 1 / this.FPS; 
        } else {
            this.currentPlayer.move(null); 
        }

        let pos = this.currentPlayer.posRoom;
        let key = `${pos.x},${pos.y}`;

        const coinData = this.roomCoins[key];
        if (coinData && coinData.active) {
            this.render.drawCoin(coinData.x, coinData.y, this.render.scale);

            const playerX = this.currentPlayer.x;
            const playerY = this.currentPlayer.y;

  
            const coinRadius = 100 * this.render.scale; // Increased from 60 to 100

            const dx = playerX - coinData.x;
            const dy = playerY - coinData.y;
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

  showGameOver() {
    const winners = this.players.filter(p => p.coins >= 3);
    const losers = this.players.filter(p => p.coins < 3);

    winners.sort((a, b) => a.timer - b.timer);
    losers.sort((a, b) => a.timer - b.timer);
    let html = '';
    html += `<div class="leaderboard-section">
        <div class="leaderboard-section-title">🏆 Zwycięzcy</div>
        <ul class="leaderboard-list">
            ${winners.length ? winners.map((p, i) => `
                <li class="winner">${p.name || `P${this.players.indexOf(p)+1}`} <span>⏱️ ${p.timer.toFixed(1)}s</span></li>
            `).join('') : '<li style="color:#aaa;">Brak</li>'}
        </ul>
    </div>`;
    html += `<div class="leaderboard-section">
        <div class="leaderboard-section-title">💀 Przegrani</div>
        <ul class="leaderboard-list">
            ${losers.length ? losers.map((p, i) => `
                <li class="loser">${p.name || `P${this.players.indexOf(p)+1}`} <span>⏱️ ${p.timer.toFixed(1)}s</span></li>
            `).join('') : '<li style="color:#aaa;">Brak</li>'}
        </ul>
    </div>`;

    document.getElementById('leaderboard').innerHTML = html;
    document.getElementById('gameOverModal').classList.add('active');
    document.body.classList.add('gameover-active'); 
}

  checkGameOver() {
    if (this.players.every(p => p.finished)) {
      this.showGameOver();
    }
  }
}