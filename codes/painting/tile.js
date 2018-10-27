class Tile {
  constructor(x, y, w, colType, scl) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = colType;
    this.indexFontSize = min(13 / textWidth(this.color.index) * this.w, 13 / (textDescent() + textAscent()) * this.w);
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

    textSize(this.w / 3.25);
    textAlign(CENTER, CENTER);
    fill(this.color.r, this.color.g, this.color.b);
    textLeading(this.w / 3.5);
    text(
      (('00' + this.color.r.toString(16)).slice(-2) + "\n" +
        ('00' + this.color.g.toString(16)).slice(-2) + "\n" +
        ('00' + this.color.b.toString(16)).slice(-2)).toUpperCase(), this.x, this.y - this.w / 4, this.w, this.w);
    pop();
  }

  showIndex() {
    push();
    translate(scl / 2, scl / 2);
    stroke(this.color.r, this.color.g, this.color.b);
    fill(51);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w, this.w * 0.1);

    textSize(this.indexFontSize);
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
