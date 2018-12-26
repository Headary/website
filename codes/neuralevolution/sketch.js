const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];

let counter = 0;

let slider;
let slicedPipes = 0;

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  for (var i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  slider = createSlider(1, 50, 1);
}

function draw() {
  background(51);


  //calculation
  for (var n = 0; n < slider.value(); n++) {
    if (counter % 120 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = birds.length - 1; i >= 0; i--) {
      birds[i].think(pipes);
      // birds[i].show();
      birds[i].update();
      if (birds[i].y + birds[i].r > height) birds.splice(i, 1);
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      // pipes[i].show();
      pipes[i].update();

      if (pipes[i].x < -pipes[i].w * 2) {
        pipes.splice(i, 1);
        slicedPipes++;
      }

      // if(bird.x >= pipes[i].x-pipes[i].speed/2 && bird.x <= pipes[i].x+pipes[i].speed/2) score++;

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
          // break;
        }
      }
    }

    if (birds.length == 0) {
      nextGeneration();
    }
  }

  // drawing

  pipes.forEach(pipe => pipe.show());
  birds.forEach(bird => bird.show());
  textSize(35);
  fill(255);
  stroke(51);
  text(slicedPipes,20,50);

  // noLoop();
}

// function hit() {
//   console.log("Hit.");
//   counter = 0;
//   bird = new Bird();
//   pipes = [];
//   score = 0;
// }

function keyPressed() {
  if (key == ' ') {
    bird.jump();
  }
}
