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

let dishes;
let dishesImage;

let tilesImage;
let tiles;

let table;
let tableImage;

let flashlight;
let flashlightImage;

let sprite_sheet;
let playerMovement;

const counterHeight = 40;

const GRAVITY = 1;
const JUMP = 25;
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
    counterImage = loadImage('../img/counter.png');
    playerImage = loadImage('../img/bottle.png');
    microwaveImage = loadImage('../img/microwave.png')
    cabinetsImage = loadImage('../img/cabinets_top.png');

    sprite_sheet = loadSpriteSheet('../img/bottle_walk.png', 1156/8 , 330, 8);
    playerMovement = loadAnimation(sprite_sheet);
}

function setup() {
    createCanvas(1920, 1080);

    tiles= createSprite(width/2,550,dishesImage.width, dishesImage.height);
    tilesImage.resize(width, 0);
    tiles.addImage(tilesImage);

    counterTop = createSprite(width / 2, height-(tableImage.height/2)+20, width, counterImage.height);
    counterImage.resize(width, 0);
    counterTop.addImage(counterImage);
    counterTop.setCollider('rectangle', 0, 0, tableImage.width, tableImage.height-150);

    cabinets = createSprite(width/2, cabinetsImage.height/4, width, cabinetsImage.height);
    cabinetsImage.resize(width, 0);
    cabinets.addImage(cabinetsImage);

    dishes= createSprite(dishesImage.width/2,height-(tableImage.height/2)-(counterImage.height/2),dishesImage.width, dishesImage.height);
    dishesImage.resize(dishesImage.width/2,0);
    dishes.addImage(dishesImage);
    dishes.setCollider('rectangle', 0, 0, dishesImage.width, dishesImage.height);

    microwave = createSprite(width-250, height-(tableImage.height/2)-(counterImage.height/2), microwaveImage.width, microwaveImage.height);
    microwaveImage.resize(microwaveImage.width/2, 0)
    microwave.addImage(microwaveImage)
    microwave.setCollider('rectangle', 25, 0, microwaveImage.width-45, microwaveImage.height);

    table= createSprite(width/2, height, tableImage.width, tableImage.height);
    tableImage.resize(width, 0);
    table.addImage(tableImage);

    player = createSprite(0, 0, playerImage.width, playerImage.height);
    playerImage.resize(playerImage.width/2, 0); //playerImage.width/2
//    player.addAnimation('standing',playerImage);
//    player.addAnimation('movement', playerMovement);
	player.addImage(playerImage);
    player.setDefaultCollider();
	player.depth = 200;

    flashlight = createSprite(0, 0);
    flashlightImage.resize(FLASHLIGHT_RADIUS * 2, FLASHLIGHT_RADIUS * 2);
    flashlight.addImage(flashlightImage);
    flashlight.setCollider('circle', 0, 0, FLASHLIGHT_RADIUS / 2);
    flashlight.friction = 0.09;
    flashlight.maxSpeed = MAX_SPEED * 1.5;
	flashlight.depth = 500;

    for (const sprite of allSprites) {
        sprite.debug = true;
    }

    kitchenObjects = new Group();
    kitchenObjects.add(counterTop);
    kitchenObjects.add(microwave);

    kitchenClutter = new Group();
//    kitchenClutter.add(microwave);
	kitchenClutter.add(dishes);
	
	for (const sprite of kitchenClutter){
		sprite.depth += 100;
	}
}

function draw() {
    // clear();
    background(0);

    detection();
	
	hide();

    applyMovement();

    flashlightMovement();
    

    for (const sprite of allSprites) {
        if (sprite === flashlight) {
            blendMode(SCREEN);
        } else {
            blendMode(BLEND);
        }
        sprite.display();
    }
    
}

function detection() {

    if (player.overlap(flashlight) && player.depth>100) {
        player.shapeColor = color(255, 0, 0);
    } else {
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
//        player.changeAnimation('movement');
    } //else{
//        player.changeAnimation('standing');
//    }


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
