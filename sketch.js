let canvasX = window.innerWidth;
let canvasY = window.innerHeight;

let circleRadius = 100;
let circleDiarmeter = circleRadius*2;
let circleX = randint(circleRadius/2, canvasX-(circleDiarmeter/2));
let circleY = randint(circleRadius/2, canvasY-(circleDiarmeter/2));

let score = 0;
let combo = 0;
let accuracy = 100.0;
let health = accuracy/2;

let comicSansMS;


function randint(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function generateCirclePos() {
  circleX = randint(circleRadius/2, canvasX-(circleDiarmeter/2));
  circleY = randint(circleRadius/2, canvasY-(circleDiarmeter/2));
}


function preload() {
  comicSansMS = loadFont('assets/Comic Sans MS.ttf');
}

function setup() {
  createCanvas(canvasX, canvasY);
}

function draw() {
  background(220);

  circle(circleX, circleY, circleRadius);

  textSize(25);
  textFont(comicSansMS);
  text(`Accuracy: ${accuracy}`, 30, canvasY-90);
  text(`Score: ${score}`, 30, canvasY-60);
  text(`Combo: ${combo}`, 30, canvasY-30);
}

function mouseClicked() {
  let d = dist(mouseX, mouseY, circleX, circleY);

  if (d <= circleRadius && d > (circleRadius/4)*3) {
    generateCirclePos();
    score += 50;
    combo += 1;
    accuracy += 0.5;
  } else if (d <= (circleRadius/4)*3 && d > (circleRadius/4)*2) {
    generateCirclePos();
    score += 100;
    combo += 1;
    accuracy += 2.5;
  } else if (d <= (circleRadius/4)*2) {
    generateCirclePos();
    score += 300;
    combo += 1;
    accuracy += 5.0;
  } else {
    generateCirclePos();
    combo = 0;
    accuracy -= 2.5;
  }

  if (accuracy > 100.0) accuracy = 100.0;
  health = Math.floor(accuracy)/2;
  if (health > 50) health = 50;
  if (health <= 5) noLoop();
}

function windowResized() {
  canvasX = window.innerWidth;
  canvasY = window.innerHeight;
  resizeCanvas(canvasX, canvasY);
}