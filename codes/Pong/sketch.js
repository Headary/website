let ball;
let left, right;

var lscore, rscore;
var slider = [];
var tVals = [];

var cnv;

function setup() {
  cnv = createCanvas(800, 600);
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
}

function keyReleased() {
  if (key == 'w' || key == 's' || key == 'W' || key == 'S') left.move(0);
  if (key == 'i' || key == 'I' || key == 'k' || key == 'K') right.move(0);
}

function resetGame() {
  left.w = slider[4].value();
  right.w = slider[5].value();

  let w = slider[8].value();
  let h = slider[9].value();
  cnv.size(w, h);
  right.x = width - right.w;

  left.reset(true);
  right.reset(false);
  ball.reset();

  lscore = rscore = 0;
}