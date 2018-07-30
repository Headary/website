class Bird {

  constructor() {
    this.y = height / 2;
    this.x = width / 4;
    this.r = 12;
    this.gravity = 0.35;
    this.velocity = 0;
    this.lift = -8;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.y + this.r > height) {
      this.y = height - this.r;
      this.velocity = 0;
    }
  }

  jump() {
    if (this.velocity >= 0)
      this.velocity = this.lift;
    // print("Jump!");
  }
}
