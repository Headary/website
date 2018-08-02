class Paddle {
  constructor(left) {
    this.h = 90;
    this.speed = 10;
    this.enableBot = false;
    this.w = 14;
    this.reset();
    if (left) this.x = this.w;
    else this.x = width - this.w;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  //Movement
  move(steps) {
    if (steps != null)
      this.deltaY = steps;
    // print("Move!!");
  }

  update(ball) {
    this.y += this.deltaY;
    if (this.enableBot) this.y = ball.y;
    this.y = constrain(this.y, 0 + this.h / 2, height - this.h / 2);
  }

  reset(left) {
    this.y = height / 2;
    this.deltaY = 0;
    if (left) this.x = this.w;
    else this.x = width - this.w;
  }
}