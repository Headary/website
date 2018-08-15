let ball;
let left, right;

var lscore, rscore;
var slider = [];
var tVals = [];

var cnv;

function setup() {
  let w = window.innerWidth * 0.8;
  let h = w * 3 / 4;
  cnv = createCanvas(w, h);
  ball = new Ball();
  left = new Paddle(true);
  right = new Paddle(false);
  lscore = 0;
  rscore = 0;

  cSliders();
  for (var i = 0; i < slider.length; i++) {
    updateTVal(i);
  }
}

function draw() {
  background(51);

  ball.checkPaddleLeft(left, right);
  ball.checkPaddleRight(right, left);

  left.update(ball);
  left.show();
  right.update(ball);
  right.show();

  ball.show();
  ball.update();
  ball.edges();

  fill(255);
  textSize(32);
  text("" + lscore, 32, 40);
  text("" + rscore, width - 64, 40);
}

function keyPressed() {
  if (key == 'w' || key == 'W') left.move(-left.speed);
  else if (key == 's' || key == 'S') left.move(left.speed);

  if (key == 'i' || key == 'I') right.move(-right.speed);
  else if (key == 'k' || key == 'K') right.move(right.speed);

  if (key == 'R') resetGame();
}

function keyReleased() {
  if (key == 'w' || key == 's' || key == 'W' || key == 'S') left.move(0);
  if (key == 'i' || key == 'I' || key == 'k' || key == 'K') right.move(0);
}

function resetGame() {
  left.w = slider[4].value();
  right.w = slider[5].value();

  left.reset(true);
  right.reset(false);
  ball.reset();

  lscore = rscore = 0;
}