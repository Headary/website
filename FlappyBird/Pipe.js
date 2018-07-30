class Pipe {
  constructor(prevTop) {
    this.w = 40;
    this.x = width;
    this.speed = 2.3;
    this.space = 175;
    this.top = random(30, height - this.space - 30);
    this.bottom = this.top + this.space;
  }

  show() {
    fill(255);
    noStroke();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  hits(bird) {
    if (this.hitX(bird) && this.hitY(bird)) return true;
  }

  hitX(bird) {
    if (bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.w) return true;
    else return false;
  }
  hitY(bird) {
    if (bird.y - bird.r < this.top || bird.y + bird.r > this.bottom) return true;
    else return false;
  }
}
