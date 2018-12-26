let bird;
let pipes = [];

let counter = 0;
let score = 0;

function setup() {
  createCanvas(windowWidth*0.8, windowHeight*0.8);
  bird = new Bird();
}

function draw() {
  background(51);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].x < -this.w * 2) pipes.splice(i, 1);

    if(bird.x >= pipes[i].x-pipes[i].speed/2 && bird.x <= pipes[i].x+pipes[i].speed/2) score++;

    if (pipes[i].hits(bird)) {
      hit();
      break;
    }

  }

  bird.show();
  bird.update();

  if (counter % 120 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  stroke(51);
  textSize(35);
  text(score,20,50 );

  noLoop();
}

function hit() {
  console.log("Hit.");
  counter = 0;
  bird = new Bird();
  pipes = [];
  score = 0;
}

function keyPressed() {
  if (key == ' ') {
    bird.jump();
  }
}
