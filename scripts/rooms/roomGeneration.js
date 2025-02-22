class RoomGenerator{
    constructor(floorNum, rng){
        this.floorNum = floorNum;
        this.floors = ["floor1"];

        this.rng = rng;

        this.roomLayouts;
    }

    async loadRoomLayouts() {
        if(this.roomLayouts) return;
        const imports = this.floors.map(floor =>
            fetch(`../../assets/rooms/${floor}.json`)
                .then(response => response.json()) 
                .catch(err => console.error(`Failed to load ${floor} layout`, err))
        );
    
        const loadedFiles = await Promise.all(imports);

        this.roomLayouts = Object.fromEntries(
            this.floors.map((floor, index) => [floor, loadedFiles[index]])
        );;
    }

    getNextRoom(){
        if (!this.roomLayouts) {
            console.warn("room layouts not loaded");
            return null;
        }
        const floorKey = `floor${this.floorNum}`;
        const rooms = this.roomLayouts[floorKey].rooms;
        let room = rooms[Math.floor(this.rng.next() * rooms.length)];

        room.entities.forEach((entity, index) => {
            if(entity.type === "pickup" && entity.subtype === "random"){
                const pickupType = this.getRandomPickupType();

                room.entities[index] = {
                    type: "pickup",
                    subtype: pickupType,
                    x: entity.x,
                    y: entity.y
                }
            }
        });
        return room;
    }

    getRandomPickupType() {
        const randomValue = this.rng.next();
        if (randomValue < 0.6) {
            return "coin"; 
        } else if (randomValue < 0.8) {
            return "key"; 
        } else {
            return "bomb"; 
        }
    }


}

export default RoomGenerator;