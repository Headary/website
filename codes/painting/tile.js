class Tile {
  constructor(x, y, w, colType) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = colType;
  }

  show() {
    push();
    translate(scl / 2, scl / 2);
    stroke(this.color.r, this.color.g, this.color.b);
    fill(this.color.r, this.color.g, this.color.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, this.w * 0.1);
    pop();
  }

  showHexa() {
    push();
    translate(scl / 2, scl / 2);
    stroke(this.color.r, this.color.g, this.color.b);
    fill(51);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, this.w * 0.1);

    textSize(scl / 4 );
    textAlign(CENTER, CENTER);
    fill(this.color.r, this.color.g, this.color.b);
    textLeading(scl / 3.75);
    text(
      (('00' + this.color.r.toString(16)).slice(-2) + "\n" +
        ('00' + this.color.g.toString(16)).slice(-2) + "\n" +
        ('00' + this.color.b.toString(16)).slice(-2)).toUpperCase(), this.x, this.y - scl / 4, scl, scl);
    pop();
  }

  showIndex() {
    push();
    translate(scl / 2, scl / 2);
    stroke(this.color.r, this.color.g, this.color.b);
    fill(51);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, this.w * 0.1);

    textSize(min(12/textWidth(this.color.index) *scl, 12/(textDescent()+textAscent()) *scl));
    textAlign(CENTER, CENTER);
    fill(this.color.r, this.color.g, this.color.b);
    text(this.color.index, this.x, this.y);
    pop();
  }

  changeColor(col) {
    this.color = col;
    this.show();
  }
}
