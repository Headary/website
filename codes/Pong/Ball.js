class Ball {
  constructor() {
    this.r = 12;
    this.speed = 7;
    this.reset();
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  edges() {
    if (this.y - this.r < 0) {
      this.yspeed *= -1;
      this.y = this.r;
    }

    if (this.y + this.r > height) {
      this.yspeed *= -1;
      this.y = height - this.r;
    }

    if (this.x < 0) {
      this.reset();
      rscore++;
    }

    if (this.x > width) {
      this.reset();
      lscore++;
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    let a = random(-PI / 4, PI / 4);
    this.xspeed = this.speed / 2 * cos(a);
    this.yspeed = this.speed / 2 * sin(a);
    if (random(1) > 0.5) this.xspeed *= -1;
  }

  checkPaddleLeft(p) {
    if (this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2 && this.x - this.r < p.x + p.w / 2) {
      if (this.x > p.x) {
        if (p.enableBot) this.bouncePaddle(p, 1, true);
        else this.bouncePaddle(p, 1, false);
        this.x = p.x + p.w / 2 + this.r;
      }
    }
  }

  checkPaddleRight(p) {
    if (this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2 && this.x + this.r > p.x - p.w / 2) {
      if (this.x < p.x) {
        if (p.enableBot) this.bouncePaddle(p, -1, true);
        else this.bouncePaddle(p, -1, false);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }

  bouncePaddle(p, dir, rnd) {
    var diff = 0;
    if (rnd) diff = random(p.h);
    else diff = this.y - (p.y - p.h / 2);

    let a = map(diff, 0, p.h, -PI / 4, PI / 4);
    this.xspeed = this.speed * cos(a) * dir;
    this.yspeed = this.speed * sin(a);
  }
}