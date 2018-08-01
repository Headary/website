var scl = 30;
var score = 0;
var bestScore = 0;
let s;
let food;
var cols;
var rows;

function setup() {
  createCanvas(900, 600);
  cols = floor(width/scl);
  rows = floor(height/scl);
  s = new Snake();
  food = new Food(s);
  frameRate(7);
}

function draw() {
  background(51);

  s.update();
  s.death();

  if (s.eat(food.x, food.y))
    food.pickLocation(s);

  food.show();
  s.show();

  if (score > bestScore) bestScore = score;
  stroke(51);
  fill(255);
  strokeWeight(2);
  textSize(24);
  text("Score: " + score, 10, 30);
  text("Best Score: " + bestScore, 10, 60);
}

function keyPressed() {
  if (s.yspeed == 0) {
  if (key == 'W' || keyCode == UP_ARROW)
    s.dir(0, -1);
  else if (key == 'S' || keyCode == DOWN_ARROW)
    s.dir(0, 1);
} else {
  if (key == 'A' || keyCode == LEFT_ARROW)
    s.dir(-1, 0);
  else if (key == 'D' || keyCode == RIGHT_ARROW)
    s.dir(1, 0);
}

// if (key == 'B') s.total++;
}
