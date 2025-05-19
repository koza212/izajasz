function randomName() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
}

function setupNames(playerCount, callback) {
    const modal = document.getElementById('nameSetupModal');
    document.body.classList.add('namesetup-active');
    const list = document.getElementById('nameSetupList');
    const startBtn = document.getElementById('startGameBtn');
    const names = Array(playerCount).fill("").map(() => randomName());
    const confirmed = Array(playerCount).fill(false);

    function render() {
        list.innerHTML = names.map((name, i) => `
            <div class="name-tile${confirmed[i] ? ' confirmed' : ''}">
                <div>Gracz ${i+1}</div>
                <div class="nick-box">${name}</div>
                <div>
                    <button class="tile-btn" id="randomBtn${i}" ${confirmed[i] ? "disabled" : ""}>Losuj</button>
                    <button class="tile-btn" id="confirmBtn${i}" ${confirmed[i] ? "disabled" : ""}>Zatwierdź</button>
                </div>
                ${confirmed[i] ? '<div class="confirmed-label">✔ Zatwierdzono</div>' : ''}
            </div>
        `).join('');
        startBtn.disabled = !confirmed.every(Boolean);
    }
    render();

    list.onclick = function(e) {
        for (let i = 0; i < playerCount; i++) {
            if (e.target.id === `randomBtn${i}`) {
                names[i] = randomName();
                render();
            }
            if (e.target.id === `confirmBtn${i}`) {
                confirmed[i] = true;
                render();
            }
        }
    };
    
    startBtn.onclick = function() {
        modal.classList.remove('active');
        document.body.classList.remove('namesetup-active'); 
        callback(names);
    };
}

window.onload = function() {
    const playerCount = parseInt(localStorage.getItem('playerCount'), 10) || 4;
    setupNames(playerCount, function(playerNames) {
        var game = new Game();

        for (let i = 0; i < playerNames.length; i++) {
            if (game.players[i]) game.players[i].name = playerNames[i];
        }
        game.start();
        document.getElementById('backToMenuBtn').onclick = function() {
            window.location.href = "index.html";
        };
    });
};