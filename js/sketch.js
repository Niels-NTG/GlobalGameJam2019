let player;
let playerImage;
let isPlayerGrounded = true;

let counterImage;
let counterTop;

let microwaveImage;
let microwave;

let kitchenObjects;
let kitchenClutter;

let cabinets;
let cabinetsImage;

let clock;
let clockImage;
let clockFont;
let clockText;

let sink;
let sinkImage;

let cleanSink;
let cleanSinkImage;

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

let stovePanDirty;
let stovePanImageDirty;

let stains;
let stainsImage;

let rack;
let rackImage;

let ladle1;
let ladle1Image;


let ladle2;
let ladle2Image;

let ladle3;
let ladle3Image;

var detected;
var lost;
var win;
var overlapFire = 0;
var time = 1;

let fire;
let fireImages;

const counterHeight = 40;

const GRAVITY = 1;
const JUMP = 25;
const ACCELERATION = 10;
const MAX_SPEED = 10;
const FRICTION = 1;

const FLASHLIGHT_RADIUS = 400;

let flashlightDestination;

let currentLevel = 4;
let currentFullness = 3;

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
	stovePanDirtyImage = loadImage('../img/pan.png');
	stainsImage = loadImage('../img/dirtlayer_counter.png');
	cleanSinkImage = loadImage('../img/somewhat_clean_sink.png');
	rackImage = loadImage('../img/cutlery_rack_base.png');
	ladle1Image = loadImage('../img/hanging_ladle01.png');
	ladle2Image = loadImage('../img/hanging_ladle02.png');
	ladle3Image = loadImage('../img/hanging_ladle03.png');
	clockImage = loadImage('../img/alarmclock.png');
	clockFont = loadFont ('../fonts/alarm_clock.ttf');

    playerMovementSpritesWine = loadSpriteSheet('../img/bottle_walk_wine.png', 82, 160, 8);
    playerMovementAnimationWine = loadAnimation(playerMovementSpritesWine);
    playerStandingSpritesWine = loadSpriteSheet('../img/bottle_walk_wine.png', 82, 160, 1);
    playerStandingAnimationWine = loadAnimation(playerStandingSpritesWine);

	playerMovementSpritesWine2 = loadSpriteSheet('../img/bottle_walk_wine2.png', 86, 160, 8);
    playerMovementAnimationWine2 = loadAnimation(playerMovementSpritesWine2);
    playerStandingSpritesWine2 = loadSpriteSheet('../img/bottle_walk_wine2.png', 86, 160, 1);
    playerStandingAnimationWine2 = loadAnimation(playerStandingSpritesWine2);

	playerMovementSpritesWine3 = loadSpriteSheet('../img/bottle_walk_wine3.png', 90, 160, 8);
    playerMovementAnimationWine3 = loadAnimation(playerMovementSpritesWine3);
    playerStandingSpritesWine3 = loadSpriteSheet('../img/bottle_walk_wine3.png', 90, 160, 1);
    playerStandingAnimationWine3 = loadAnimation(playerStandingSpritesWine3);

	playerMovementSpritesWine4 = loadSpriteSheet('../img/bottle_walk_wine4.png', 60, 150, 1);
    playerMovementAnimationWine4 = loadAnimation(playerMovementSpritesWine4);
    playerStandingSpritesWine4 = loadSpriteSheet('../img/bottle_walk_wine4.png', 60, 150, 1);
    playerStandingAnimationWine4 = loadAnimation(playerStandingSpritesWine4);

	playerDeadAnimation = loadImage('../img/bottle_dead.png');
	playerDeadAnimation = loadImage('../img/bottle_dead.png');
	//playerDeadSheet = loadSpriteSheet('../img/bottle_walk_wine4.png', 360, 166, 1);
    //playerDeadAnimation = loadAnimation(playerDeadSheet);

	playerJumpSheet = loadSpriteSheet('../img/bottle_jump.png', 73, 150, 4);
    playerJump = loadAnimation(playerJumpSheet);

	fireImages = loadSpriteSheet('../img/sprite_stovefire_v1.png', 306/4, 223/2, 2);
    fireMove = loadAnimation(fireImages);

	bottleFullness = loadAnimation();
	bottleFullness.playing = false;
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

	stains = createSprite(width/2, height-240, width, stainsImage.height);
    stainsImage.resize(width, 0);
    stains.addImage(stainsImage);
	stains.colliderOptions = stains.setCollider('rectangle', 0, 0, 0, 0);
    stains.levels = [1, 2, 3, 4, 5];
	
	clock = createSprite(500, 150, clockImage.width, clockImage.height);
	clockImage.resize(clockImage.width/2, 0);
	clock.addImage(clockImage);
		

	shelf1 = createSprite(680, 480, shelfImage.width, shelfImage.height);
    shelfImage.resize(shelfImage.width/2, 0);
    shelf1.addImage(shelfImage);
	shelf1.setCollider('rectangle',0,-20,shelfImage.width, shelfImage.height-60)

	shelf2 = createSprite(1350, 650, shelfImage.width, shelfImage.height);
    shelf2.addImage(shelfImage);
	shelf2.setCollider('rectangle',0,-20,shelfImage.width, shelfImage.height-60);

	rack = createSprite(1750, 430, rackImage.width, rackImage.height);
	rackImage.resize(rackImage.width/2, 0);
	rack.addImage(rackImage);
	rack.setCollider('rectangle', 0, 0, rackImage.width,rackImage.height);

	ladle1 = createSprite(1750, 500, ladle1Image.width, ladle1Image.height);
	ladle1Image.resize(ladle1Image.width/2, 0);
	ladle1.addImage(ladle1Image);
	//ladle1.setCollider('rectangle', 0, ladle1Image.height-100, ladle1Image.width,ladle1Image.height/4);

	ladle2 = createSprite(1820, 520, ladle2Image.width, ladle2Image.height);
	ladle2Image.resize(ladle2Image.width/2, 0);
	ladle2.addImage(ladle2Image);

	ladle3 = createSprite(1680, 480, ladle3Image.width, ladle3Image.height);
	ladle3Image.resize(ladle3Image.width/2, 0);
	ladle3.addImage(ladle3Image);

    dishes= createSprite(750,height-120-195,dishesImage.width, dishesImage.height);
    dishesImage.resize(dishesImage.width/2,0);
    dishes.addImage(dishesImage);
    dishes.colliderOptions = dishes.setCollider('rectangle', 0, 0, dishesImage.width, dishesImage.height);
    dishes.levels = [1, 2];

	sink= createSprite(width-700,height-120-160,sinkImage.width, sinkImage.height);
    sinkImage.resize(sinkImage.width/2,0);
    sink.addImage(sinkImage);
   //sink.setCollider('circle', 0, sinkImage.height/2, sinkImage.height);
	sink.colliderOptions = sink.setCollider('circle', 0, sinkImage.height/2, sinkImage.height);
    sink.levels = [1, 2, 3, 4];

	cleanSink= createSprite(width-700,height-120-160,cleanSinkImage.width, cleanSinkImage.height);
    cleanSinkImage.resize(cleanSinkImage.width/2,0);
    cleanSink.addImage(cleanSinkImage);
   //cleanSink.setCollider('circle', 0, cleanSinkImage.height/2, cleanSinkImage.height);
	cleanSink.colliderOptions = cleanSink.setCollider('circle', 0, cleanSinkImage.height/2, cleanSinkImage.height);
    cleanSink.levels = [5,6];

	microwave = createSprite(300, height-120-195, microwaveImage.width, microwaveImage.height);
    microwaveImage.resize(microwaveImage.width/2, 0);
    microwave.addImage(microwaveImage);
    microwave.setCollider('rectangle', 25, 0, microwaveImage.width-45, microwaveImage.height);

    stove = createSprite(width-250, height-120, stoveImage.width, stoveImage.height);
    stoveImage.resize(stoveImage.width/2, 0);
    stove.addImage(stoveImage);

	fire = createSprite(width-320, height-240, 306/4, 226/2);
    fire.addAnimation('fire',fireMove);
    fire.setCollider('rectangle', 0, 25, 306/4, 50);

	stovePan = createSprite(width-190, height-250, stovePanImage.width, stovePanImage.height);
    stovePanImage.resize(stovePanImage.width/2, 0);
    stovePan.addImage(stovePanImage);
    stovePan.setCollider('rectangle', 0, 0, stovePanImage.width-20, stovePanImage.height-40);
	stovePan.colliderOptions = stovePan.setCollider('rectangle', 0, 0, stovePanImage.width-20, stovePanImage.height-40);
	stovePan.levels = [4,5,6];

	stovePanDirty = createSprite(1710, 800, stovePanDirtyImage.width, stovePanDirtyImage.height);
    stovePanDirtyImage.resize(stovePanDirtyImage.width/2, 0);
    stovePanDirty.addImage(stovePanDirtyImage);
	stovePanDirty.colliderOptions = stovePanDirty.setCollider('rectangle', 20, 0, stovePanDirtyImage.width-100, stovePanDirtyImage.height-45);
    stovePanDirty.levels = [1, 2, 3];

    table= createSprite(width/2, height, tableImage.width, tableImage.height);
    tableImage.resize(width, 0);
    table.addImage(tableImage);

	tableFG= createSprite(width/2, height, tableFGImage.width, tableFGImage.height);
    tableFGImage.resize(width, 0);
    tableFG.addImage(tableFGImage);
	tableFG.depth = 499;

    player = createSprite(33, 780);
    player.addAnimation('moving3', playerMovementAnimationWine);
    player.addAnimation('standing3', playerStandingAnimationWine);
	player.addAnimation('moving2', playerMovementAnimationWine2);
    player.addAnimation('standing2', playerStandingAnimationWine2);
	player.addAnimation('moving1', playerMovementAnimationWine3);
    player.addAnimation('standing1', playerStandingAnimationWine3);
	player.addAnimation('moving0', playerMovementAnimationWine4);
    player.addAnimation('standing0', playerStandingAnimationWine4);
	player.addAnimation('jump', playerJump);
	player.addAnimation('broken', playerDeadAnimation);
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
	kitchenObjects.add(rack);

    kitchenClutter = new Group();
	kitchenClutter.add(dishes);
	kitchenClutter.add(sink);
	kitchenClutter.add(stovePanDirty);

	for (const sprite of kitchenClutter){
		sprite.depth += 100;
	}
}

function draw() {

    clear();
	

	if(detected){
		time=1;
		currentFullness--;
		flashlight.position.x = random(0, width);
		flashlight.position.y = 0;
		flashlightDestination = null;
		flashlight.visible = false;
		detected=false;
		currentLevel--;
		if (currentLevel == 0 || currentFullness == 0){
			lost = true;
		}
		flashlight.visible = true;
    }

	if (currentLevel == 6){
		win=true;
	}
	applyMovement();

	fireDetection();

	if (!lost && !win){

		if (time % 3540 == 0){
			time=1;
			currentLevel++;
			time++;
		}

        hide();

		time++;

        detection();

        flashlightMovement();

	}

    for (const sprite of allSprites) {
        if (sprite === flashlight) {
            blendMode(SCREEN);
        } else {
            blendMode(BLEND);
        }
        if (!sprite.hasOwnProperty('levels') || sprite.levels.includes(currentLevel)) {
            sprite.display();
            if (sprite.colliderOptions) {
                sprite.collider = sprite.colliderOptions;
            }
        } else {
            sprite.setCollider('circle', 0, 0, 0);
        }
    }
	
	
	blendMode(BLEND);
    image(vignetteImage, 0, 0, width, height);
	
	fill(0, 255,0);
	textFont(clockFont);
	textSize(50);
	text('00:'+(Math.floor(time/60)).toString().padStart(2,'0'),435, 160);
	
}

function fireDetection(){
	if(player.overlap(fire)){
		overlapFire++;
	}
	if (overlapFire>=100){
		player.changeAnimation('broken');
		player.setDefaultCollider();
		lost=true;

	}
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

    if (keyWentDown('h') && player.overlap(kitchenClutter)){
		if(player.depth > 100){
			player.depth = 20;
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

    // Apply GRAVITY
    player.velocity.y += GRAVITY;

    // Cancel horizontal velocity.
    player.velocity.x = 0;

    // Cancel vertical velocity when touching top or bottom of another collider.
    if (player.collide(kitchenObjects) && (player.touching.top || player.touching.bottom)) {
        player.velocity.y = 0;
        isPlayerGrounded = player.touching.bottom;
    }

    if (keyWentDown('space') && isPlayerGrounded) {
        player.velocity.y = -JUMP;
        isPlayerGrounded = false;
    }

    // Apply velocity.
    if (
        player.position.x > 0 &&
        (keyDown('a') || keyDown(LEFT_ARROW))
    ) {
        player.velocity.x = -MAX_SPEED;
    } else if (
        player.position.x < width &&
        (keyDown('d') || keyDown(RIGHT_ARROW))
    ) {
        player.velocity.x = MAX_SPEED;
    }

    // Apply animations depending on velocity values.
    if (player.velocity.y < 0) {
        player.changeAnimation('jump');
        playerJump.nextFrame();
    } else if (player.velocity.x === 0) {
        player.changeAnimation('standing' + currentFullness.toString());
    } else if (player.velocity.x !== 0) {
        player.changeAnimation('moving' + currentFullness.toString());
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
