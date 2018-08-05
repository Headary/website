class Arc {
  constructor(s, e, p) {
    this.start = s;
    this.end = e;
    this.phase = p;
    this.dist = abs(e - s);
  }

  show() {
    let x = (this.start + this.end) / 2;
    if (this.phase == 0) {
      arc(x, 0, this.dist, this.dist, PI, TWO_PI);
    } else {
      arc(x, 0, this.dist, this.dist, 0, PI);
    }
  }
}