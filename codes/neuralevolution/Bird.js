class Bird {

  constructor() {
    this.y = height / 2;
    this.x = width / 4;
    this.r = 12;

    this.gravity = 0.25;
    this.velocity = 0;
    this.velocity_max = (2*windowHeight) / sqrt((2*windowHeight)/this.gravity);
    this.lift = -6;

    this.brain = new NeuralNetwork(5, 5, 2);

    this.score = 0;
    this.fitness = 0;
  }

  show() {
    fill(255,100);
    stroke(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;
    // if (this.y + this.r > height) {
    //   this.y = height - this.r;
    //   this.velocity = 0;
    //   // hit();
    // }
    if (this.y - this.r < 0) {
      this.y = this.r;
      this.velocity = 0;
    }
  }

  think(pipes) {
    let closest = null;
    let closestDist = Infinity;
    for (var i = 0; i < pipes.length; i++) {
      let d = (pipes[i].x + pipes[i].w) - (this.x - this.r);
      if (d < closestDist && d > 0) {
        closest = pipes[i];
        closestDist = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = this.velocity / this.velocity_max;
    inputs[2] = closest.top / height;
    inputs[3] = closest.bottom / height;
    inputs[4] = closest.x / width

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.jump();
    }
  }

  jump() {
    if (this.velocity >= 0)
      this.velocity = this.lift;
    // print("Jump!");
  }
}
