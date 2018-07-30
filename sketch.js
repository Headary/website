
let ball;
let left, right;

var lscore, rscore;

function setup() {
  createCanvas(800, 600);
  ball = new Ball();
  left = new Paddle(true);
  right = new Paddle(false);
	lscore = 0;
	rscore = 0;
}

function draw() {
  background(51);

	ball.checkPaddleLeft(left);
	ball.checkPaddleRight(right);

  left.update();
  left.show();
  right.update();
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
  if (key == 'w' || key == 'W') left.move(-10);
  else if (key == 's' || key == 'S') left.move(10);

  if (keyCode == UP_ARROW) right.move(-10);
  else if (keyCode == DOWN_ARROW) right.move(10);
}

function keyReleased() {
  if (key == 'w' || key == 's' || key == 'W' || key == 'S') left.move(0);
  if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) right.move(0);
}
