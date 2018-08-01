class Food {
  constructor() {
    this.pickLocation(s);
  }

  pickLocation(snake) {
    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
    for (let i = 0; i < snake.tail.length; i++) {
      if (snake.tail[i].x == this.x && snake.tail[i].y == this.y) {
        this.pickLocation(snake);
        return;
      }
    }
    if (snake.x == this.x && snake.y == this.y) {
      this.pickLocation(snake);
    }
  }

  show() {
    fill(255, 80, 80);
    stroke(51);
    rect(this.x, this.y, scl, scl);
  }
}
