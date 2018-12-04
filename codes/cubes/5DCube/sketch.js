var points = [];
var testpoints = [];
var distance = 4;

let angle = 0;

function setup() {

  let index = 0;

  for (var c = 0; c < 2; c++) {
    let u = ((c == 0) ? 1 : -1);
    for (var b = 0; b < 2; b++) {
      let w = ((b == 0) ? 1 : -1);
      for (var a = 0; a < 2; a++) {
        let z = ((a == 0) ? 1 : -1);
        points[index++] = new P5Vector(-1, 1, z, w, u);
        points[index++] = new P5Vector(1, 1, z, w, u);
        points[index++] = new P5Vector(1, -1, z, w, u);
        points[index++] = new P5Vector(-1, -1, z, w, u);
      }
    }
  }

  createCanvas(windowWidth, windowHeight);
  calc();
}

function draw() {
  calc();
}

function calc() {
  background(51);
  translate(width / 2, height / 2);

  let projected = [];
  for (let i = 0; i < points.length; i++) {
    let projected4d = points[i].rotateZU(angle).project();
    let projected3d = projected4d.project();
		let projected2d = projected3d.rotateXZ(angle/4).rotateYZ(-PI/16).project().mult(800);
    stroke(255);
    strokeWeight(16);
    noFill();
    point(projected2d.x, projected2d.y);
    // stroke(0);
    // strokeWeight(8);
    // textSize(32);
    // fill(255);
    // text(i, projected2d.x, projected2d.y)
    projected[i] = projected2d;
  }


	stroke(255);
  for (var i = 0; i < 4; i++) {
		strokeWeight(2);
    for (var k = 0; k < 8; k++) {
      connect(i + k * 4, ((i + 1) % 4) + k * 4, projected);
      connect(i + k * 4, ((i + 1) % 4) + k * 4, projected);
    }

		connect(i, i + 4, projected);
    connect(i + 8, i + 12, projected);
    connect(i + 16, i + 16 + 4, projected);
    connect(i + 16 + 8, i + 16 + 12, projected);

		// strokeWeight(2);
    // stroke(255,0,0);
    // stroke(0,0,255);
    // stroke(0,255,0);
    connect(i, i + 8, projected);
    connect(i + 4, i + 12, projected);
    //
    // stroke(255,255,0);
    // stroke(0,255,255);
    connect(i+ 16, i + 8 + 16, projected);
    connect(i + 4 + 16, i + 12 + 16, projected);
    //
    // stroke(230, 170, 30);
    // strokeWeight(8);
    connect(i+8,i+16,projected);
    connect(i+4+8,i+4+16,projected);
  }
  angle += 0.02;
}

function connect(a, b, mat) {
  line(mat[a].x, mat[a].y, mat[b].x, mat[b].y);
}
