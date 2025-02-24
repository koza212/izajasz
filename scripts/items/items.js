import Entity from "../entities/entity";

class ItemStats{
    constructor(id, nazwa, path, maxhp, hp, speed, damage, fireRate, range, shotSpeed, luck, coins = 0, keys = 0, bombs = 0, description = '') {
        this.id;
        this.nazwa;
        
        this.path;

        this.maxhp;
        this.hp;
        this.speed;
        this.damage;
        this.fireRate; 
        this.range;
        this.shotSpeed;
        this.luck;

        this.coins = 0;
        this.keys = 0;
        this.bombs = 0;
        this.describtion='';
    }
}

let items =[
    new ItemStats(1, "Sprawdzian Z Algorytmow", "../../images/items/001alg_test.png",0,0,0,0,0.7,20,0,0,0,0,0,"tears up"),
    new ItemStats(2,"Głowa Sarny", "../../images/items/002glowa_sarny.png",0,0,0,2,0,-10,0,0,0,0,0,"Sarna umarła ze stresu [*]"),
    new ItemStats(3, "Makowiec", "../../images/items/003makowiec.png",2,2,0,0,0,0,0,0,0,0,0,"strzelasz z ucha"),
    new ItemStats(4, "kuki","../../images/items/004kuki.png",2,20,0,0,0,0,0,0,0,0,0,"kuki"),
    new ItemStats(5, "Slime Shady","../../images/items/005slime_shady.png",-2,0,0,1,1,20,0,1,0,0,0,"To koniec..."),
    new ItemStats(6,"Kompas","../../images/items/006kompas.png",0,0,0,0,0,0,0,0,0,0,0,"kompas"),
    new ItemStats(7,"Mapa","../../images/items/007mapa.png",0,0,0,0,0,0,0,0,0,0,0,"Widzisz pokoje"),
    new ItemStats(8,"Niebieska Mapa","../../images/items/008bluemap.png",0,0,0,0,0,0,0,0,0,0,0,"Widzisz ukryte pokoje"),
    new ItemStats(9,"Maczeta","../../images/items/009maczeta.png",0,0,0,0,0,0,0,0,0,0,0,"Biegam za nim z maczeta")
];

class item extends Entity {    // classa dla prostych itemow typu statsup te inne sie ogarnie kiedys napewno tralala

    constructor(){
        
        item_stats.nazwa;

        this.render = render;
        
        this.id= render.createimagine();

        item_stats.maxhp;
        item_stats.hp;
        item_stats.speed;
        item_stats.damage;
        item_stats.fireRate; 
        item_stats.range;
        item_stats.shotSpeed;
        item_stats.luck;

        item_stats.coins = 0;
        item_stats.keys = 0;
        item_stats.bombs = 0;
    }

}
