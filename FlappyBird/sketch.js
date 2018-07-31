let bird;
let pipes = [];

let gameOver = false;

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  // pipes.push(new Pipe());
}

function draw() {
  background(51);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("Hit.");
      gameOver = true;
    }

    if (pipes[i].x < -this.w * 2) pipes.splice(i, 1);
  }

  bird.show();
  bird.update();

  if (frameCount % 120 == 0) {
    pipes.push(new Pipe());
  }

  if (gameOver) {
    fill(0, 150);
    noStroke();
    rect(0, 0, width, height);
    stroke(255);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game over, press F5 to reset.", 0, 0, width, height);
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.jump();
  }
}
