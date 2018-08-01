class Snake {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
  }

  update() {
    if (this.total == this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }

    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    let maxX = (cols - 1) * scl;
    let maxY = (rows - 1) * scl;
    this.x = constrain(this.x, 0, maxX)
    this.y = constrain(this.y, 0, maxY)
  }

  show() {
    stroke(51);
    strokeWeight(1);
    for (let i = 0; i < this.tail.length; i++) {
      let a = map(i, 0, this.total + 1, 100, 255);
      fill(255, a);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(255);
    rect(this.x, this.y, scl, scl);
  }

  eat(Fx, Fy) {
    if (Fx == this.x && Fy == this.y) {
      this.total++;
      score++;
      return true;
    } else return false;
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  death() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x == this.x && this.tail[i].y == this.y) {
        this.total = 0;
        this.tail = [];
        score = 0;
      }
    }
  }
}
