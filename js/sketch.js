let player;
let playerImage;

let counterImage;
let counterTop;

let microwaveImage;
let microwave;

let kitchenObjects;
let kitchenClutter;

let cabinets;
let cabinetsImage;

let sink;
let sinkImage;

let dishes;
let dishesImage;

let shelf1;
let shelfImage;

let vignetteImage;

let tilesImage;
let tiles;

let table;
let tableImage;

let tableFG;
let tableFGImage;

let flashlight;
let flashlightImage;

let sprite_sheet;
let playerMovement;

let stove;
let stoveImage;

let stovePan;
let stovePanImage;

var detected;

const counterHeight = 40;

const GRAVITY = 1;
const JUMP = 20;
const ACCELERATION = 10;
const MAX_SPEED = 10;
const FRICTION = 1;

const FLASHLIGHT_RADIUS = 400;

let flashlightDestination;

function preload() {
    flashlightImage = loadImage('../img/flashlight.png');
    dishesImage = loadImage('../img/dishes.png');
    tilesImage = loadImage('../img/tiles.png');
    tableImage = loadImage('../img/table.png');
	tableFGImage = loadImage('../img/table2.png');
    counterImage = loadImage('../img/counter.png');
    playerImage = loadImage('../img/bottle.png');
    microwaveImage = loadImage('../img/microwave.png')
    cabinetsImage = loadImage('../img/cabinets_top.png');
	vignetteImage = loadImage('../img/vignette.png');
	shelfImage = loadImage('../img/shelf.png');
	stoveImage = loadImage('../img/stove_base.png');
    sinkImage = loadImage('../img/sink.png');
    stovePanImage = loadImage('../img/pan_on_stove.png');

    playerMovementSpritesBeer = loadSpriteSheet('../img/bottle_walk_beer.png', 140, 330, 8);
    playerMovementAnimationBeer = loadAnimation(playerMovementSpritesBeer);
    playerMovementSpritesWine = loadSpriteSheet('../img/bottle_walk_wine.png', 165, 320, 8);
    playerMovementAnimationWine = loadAnimation(playerMovementSpritesWine);
    playerStandingSpritesWine = loadSpriteSheet('../img/bottle_standing_wine.png', 165, 320, 1);
    playerStandingAnimationWine = loadAnimation(playerStandingSpritesWine);

}

function setup() {
    createCanvas(1920, 1080);

    tiles= createSprite(width/2,520,dishesImage.width, dishesImage.height);
    tilesImage.resize(width*1.2, 0);
    tiles.addImage(tilesImage);

    counterTop = createSprite(width / 2, height-100, width, counterImage.height);
    counterImage.resize(width, 0);
    counterTop.addImage(counterImage);
    counterTop.setCollider('rectangle', 0, 0, tableImage.width, tableImage.height-150);

    cabinets = createSprite(width/2, 70, width, cabinetsImage.height);
    cabinetsImage.resize(width, 0);
    cabinets.addImage(cabinetsImage);

	shelf1 = createSprite(700, 500, shelfImage.width, shelfImage.height);
    shelfImage.resize(shelfImage.width/2, 0);
    shelf1.addImage(shelfImage);
	shelf1.setCollider('rectangle',0,-20,shelfImage.width, shelfImage.height-60)

	shelf2 = createSprite(1350, 650, shelfImage.width, shelfImage.height);
    shelf2.addImage(shelfImage);
	shelf2.setCollider('rectangle',0,-20,shelfImage.width, shelfImage.height-60);

	//shelf3 = createSprite(280, cabinetsImage.height+shelfImage.height-20, shelfImage.width, shelfImage.height);
  //  shelf3.addImage(shelfImage);
	//shelf3.setCollider('rectangle',0,-20,shelfImage.width, shelfImage.height-60);

    dishes= createSprite(750,height-120-195,dishesImage.width, dishesImage.height);
    dishesImage.resize(dishesImage.width/2,0);
    dishes.addImage(dishesImage);
    dishes.setCollider('rectangle', 0, 0, dishesImage.width, dishesImage.height);

	sink= createSprite(width-700,height-120-160,sinkImage.width, sinkImage.height);
    sinkImage.resize(sinkImage.width/2,0);
    sink.addImage(sinkImage);
    sink.setCollider('circle', 0, sinkImage.height/2, sinkImage.height);

	microwave = createSprite(300, height-120-195, microwaveImage.width, microwaveImage.height);
    microwaveImage.resize(microwaveImage.width/2, 0);
    microwave.addImage(microwaveImage);
    microwave.setCollider('rectangle', 25, 0, microwaveImage.width-45, microwaveImage.height);

    stove = createSprite(width-250, height-120, stoveImage.width, stoveImage.height);
    stoveImage.resize(stoveImage.width/2, 0);
    stove.addImage(stoveImage);
    //stove.setCollider('rectangle', 25, 0, stoveImage.width-45, stoveImage.height);

	stovePan = createSprite(width-200, height-250, stovePanImage.width, stovePanImage.height);
    stovePanImage.resize(stovePanImage.width/2, 0);
    stovePan.addImage(stovePanImage);
    stovePan.setCollider('rectangle', 0, 0, stovePanImage.width-20, stovePanImage.height-40);

    table= createSprite(width/2, height, tableImage.width, tableImage.height);
    tableImage.resize(width, 0);
    table.addImage(tableImage);

	tableFG= createSprite(width/2, height, tableFGImage.width, tableFGImage.height);
    tableFGImage.resize(width, 0);
    tableFG.addImage(tableFGImage);
	tableFG.depth = 499;

    player = createSprite(33, 780);
    player.addAnimation('movement', playerMovementAnimationWine);
    player.addAnimation('standing', playerStandingAnimationWine);
    player.setDefaultCollider();
	player.depth = 200;

    flashlight = createSprite(0, 0);
    flashlightImage.resize(FLASHLIGHT_RADIUS * 2, FLASHLIGHT_RADIUS * 2);
    flashlight.addImage(flashlightImage);
    flashlight.setCollider('circle', 0, 0, FLASHLIGHT_RADIUS / 4);
    flashlight.friction = 0.09;
    flashlight.maxSpeed = MAX_SPEED * 1.5;
	flashlight.depth = 500;

    for (const sprite of allSprites) {
        sprite.debug = true;
    }

    kitchenObjects = new Group();
    kitchenObjects.add(counterTop);
    kitchenObjects.add(microwave);
	kitchenObjects.add(shelf1);
	kitchenObjects.add(shelf2);
	kitchenObjects.add(stovePan);

    kitchenClutter = new Group();
	kitchenClutter.add(dishes);
	kitchenClutter.add(sink);

	for (const sprite of kitchenClutter){
		sprite.depth += 100;
	}
}

function draw() {
    clear();

	applyMovement();

	hide();

	detection();

	flashlightMovement();

	/*if(detected){
		flashlight.position.x = 0;
		flashlight.position.y = 0;
		sleep(1000);
		flashlight.depth=500;
		detected=false;
    } */

    for (const sprite of allSprites) {
        if (sprite === flashlight) {
            blendMode(SCREEN);
        } else {
            blendMode(BLEND);
        }
        sprite.display();
    }
	blendMode(BLEND);
    image(vignetteImage, 0, 0, width, height);
}

function detection() {

    if (player.overlap(flashlight) && player.depth > 100) {
		detected = true;
        player.shapeColor = color(255, 0, 0);
    } else {
		detected = false;
        player.shapeColor = color(0, 255, 0);
    }
}

function hide(){

	if (keyWentDown('h')  && player.overlap(kitchenClutter)){
		if(player.depth>100){
			player.depth = 4;
			drawSprites();
		}
		else{
			player.depth = 200;
			drawSprites();
		}
	}
	if (player.depth<100 && !player.overlap(kitchenClutter)){
		player.depth = 200;
		drawSprites();
	}

}

function applyMovement() {

    player.velocity.y += GRAVITY;

    player.velocity.x = 0;

    if (player.collide(kitchenObjects)) {
        player.velocity.y = 0;
    }



    if (keyWentDown('space') && player.position.y > 0 && player.overlap(kitchenObjects)) {
        player.velocity.y = -JUMP;
    }
    if (
        (
            keyDown('a') || keyDown(LEFT_ARROW)
        ) &&
        player.position.x > 0
    ) {
        player.velocity.x = -MAX_SPEED;
        player.changeAnimation('movement');

    } else if ((
        keyDown('d') || keyDown(RIGHT_ARROW)
    ) &&
        player.position.x < width
    ) {
        player.velocity.x = MAX_SPEED;
        player.changeAnimation('movement');
    } else {
        player.changeAnimation('standing');
   }
}

function flashlightMovement() {

    if (!flashlightDestination) {
        flashlightDestination = p5.Vector.random2D();
        flashlightDestination.x = map(flashlightDestination.x, -1, 1, 0, width);
        flashlightDestination.y = map(flashlightDestination.y, -1, 1, 0, height);
    }

    flashlight.velocity.x = (flashlightDestination.x - flashlight.position.x) * 0.2;
    flashlight.velocity.y = (flashlightDestination.y - flashlight.position.y) * 0.2;

    if (flashlight.position.dist(flashlightDestination) < 10) {
        flashlightDestination = null;
    }
}

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }
