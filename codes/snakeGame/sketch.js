var scl = 40;
var score = 0;
var bestScore = 0;
let s;
let food;
var cols;
var rows;

function setup() {
  let h = window.innerHeight * 0.9;
  let w = h / 3 * 4;
  if (w > window.innerWidth) {
    w = window.innerWidth;
    h = w / 4 * 3;
  }
  floor(w);
  floor(h);
  scl = floor(w / 32);
  createCanvas(w, h);
  cols = floor(width / scl);
  rows = floor(height / scl);
  s = new Snake();
  food = new Food(s);
  frameRate(7);

  let space = (window.innerHeight - height) / 2;
  let cnv = document.getElementsByClassName('p5Canvas');
  cnv[0].style.marginTop = space + "px";
  cnv[0].style.marginBottom = space + "px";
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