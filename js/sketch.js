

function preload() {

}

function setup() {
    createCanvas(displayWidth, displayHeight);
}

function draw() {
    clear();

    fill(random(255));
    square(mouseX, mouseY, 40, 40);
}
