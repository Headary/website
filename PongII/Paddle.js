
class Paddle {
  constructor(left) {
    this.y = height / 2;
    this.w = 12;
    this.h = 90;
    this.deltaY = 0;
    if (left) this.x = this.w;
    else this.x = width - this.w;
  }

  show() {
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  //Movement
  move(steps) {
    if (steps != null)
      this.deltaY = steps;
    // print("Move!!");
  }

  update() {
    this.y += this.deltaY;
    this.y = constrain(this.y, 0 + this.h / 2, height - this.h / 2);
  }
}
