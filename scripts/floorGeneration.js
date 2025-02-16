class FloorGenerator {
    constructor(floorNumber = 1, rng) {
        if (floorNumber > 5) {
            console.assert("Trying to generate floor deeper than 5");
        }
        this.floorNumber = floorNumber;
        this.rng = rng;
        this.roomCount = Math.min(Math.floor(3.33 * floorNumber + Math.round(rng.next() + 5)), 20);
    }

    generateFloorMap(startX = 6, startY = 6) {
        this.startX = startX;
        this.startY = startY;
        this.gridSize = 13;
        this.grid = [];
        this.fillGrid(this.gridSize, '-', this.grid);
        this.grid[startX][startY] = "Start";

        const directions = [
            [0, 1], [-1, 0], [0, -1], [1, 0]
        ];

        let roomsPlaced = 0;
        outerWhile:
        while (roomsPlaced < this.roomCount) {
            let visited = [];
            this.fillGrid(this.gridSize, false, visited);
            let queue = [{ x: startX, y: startY }];

            while (queue.length !== 0) {
                let { x, y } = queue.shift();
                if (visited[x][y]) continue;
                visited[x][y] = true;
                for (const [directionX, directionY] of directions) {
                    let newX = directionX + x, newY = directionY + y;
                    if ((newX < 0 || newX >= this.gridSize) || (newY < 0 || newY >= this.gridSize)) continue;
                    if (visited[newX][newY] || this.grid[newX][newY] != '-') continue;

                    // Rng gives num between 0 and 1 so there is 75% odds that number will be lower and we will build room in the place
                    let odds = 0.75;
                    if (this.rng.next() < odds) {
                        roomsPlaced += 1;
                        if (roomsPlaced > this.roomCount) break outerWhile;
                        this.grid[newX][newY] = "Room";
                        queue.push({ x: newX, y: newY });
                    }
                }
            }
        }
        this.adjList = this.findAdjacencyList(this.grid);
        let farthestBossRoom = null;
        let maxDistance = 0;

        for (let [key, value] of this.adjList) {
            if (value.length === 1) {
                let [x, y] = key.split(',').map(Number);
                let distance = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                if (distance > maxDistance) {
                    maxDistance = distance;
                    farthestBossRoom = { x, y };
                }
            }
        }
        if (!farthestBossRoom) {
            console.log("Regenerating map");
            return this.generateFloorMap(this.startX, this.startY);
        }
        this.grid[farthestBossRoom.x][farthestBossRoom.y] = "Boss";

        if (this.fillSpecialRooms()) {
            console.log("Returning map");
            return this.grid;
        }
        console.log("Regenerating map");
        return this.generateFloorMap(this.startX, this.startY);
    }

    fillSpecialRooms() {
        let specialRooms = ["Treasure", "Shop"];
        if (Math.round(this.rng.next()) == 1) {
            specialRooms.push("Curse");
        }

        this.shuffleArray(specialRooms);
        let i = 0;

        for (let [key, value] of this.adjList) {
            if (value.length === 1 && i < specialRooms.length) {
                let [x, y] = key.split(',').map(Number);
                if (this.grid[x][y] !== "Boss" && this.grid[x][y] !== "Start") {
                    this.grid[x][y] = specialRooms[i];
                    i++;
                }
            }
        }
        return i === specialRooms.length;
    }

    findAdjacencyList(grid) {
        let visited = [];
        this.fillGrid(this.gridSize, false, visited);
        const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
        let adjList = new Map();
        let queue = [{ x: this.startX, y: this.startY }];

        while (queue.length !== 0) {
            let { x, y } = queue.shift();
            if (visited[x][y]) continue;
            visited[x][y] = true;

            let key = `${x},${y}`;
            if (!adjList.has(key)) {
                adjList.set(key, []);
            }

            for (const [directionX, directionY] of directions) {
                let newX = x + directionX, newY = y + directionY;
                if (newX < 0 || newX >= this.gridSize || newY < 0 || newY >= this.gridSize) continue;
                if (visited[newX][newY]) continue;
                if (grid[newX][newY] == '-') continue;

                let neighborKey = `${newX},${newY}`;
                if (!adjList.has(neighborKey)) {
                    adjList.set(neighborKey, []);
                }
                adjList.get(key).push(neighborKey);
                adjList.get(neighborKey).push(key);
                queue.push({ x: newX, y: newY });
            }
        }
        return adjList;
    }

    fillGrid(size, value, grid) {
        for (let i = 0; i < size; i++) {
            grid[i] = new Array(size).fill(value);
        }
    }

    shuffleArray(array) {
        for (let i = 0; i < array.length; i++) {
            let index = Math.floor(this.rng.next() * array.length);
            [array[i], array[index]] = [array[index], array[i]];
        }
    }
}

export default FloorGenerator;
