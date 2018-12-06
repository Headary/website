var points = [];
var testpoints = [];
var distance = 4;

let angle = 0;
let scale = 1;

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
  scale = min(width,height);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  let projected = [];
  for (let i = 0; i < points.length; i++) {
    let projected4d = points[i].rotate("ZU",angle).project();
    let projected3d = projected4d.project();
		let projected2d = projected3d.rotate("XZ",PI/8).rotate("YZ",-PI/16).project().mult(scale*1.5);
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

  createConnections(projected);

  angle += 0.02;
  // noLoop();
}

function createConnections(mat) {
  stroke(255);
  for (var i = 0; i < 4; i++) {
		strokeWeight(2);
    for (var k = 0; k < 8; k++) {
      connect(i + k * 4, ((i + 1) % 4) + k * 4, mat);
    }

		connect(i, i + 4, mat);
    connect(i + 8, i + 12, mat);
    connect(i + 16, i + 16 + 4, mat);
    connect(i + 16 + 8, i + 16 + 12, mat);
  }

  for (var i = 0; i < 8; i++) {
    connect(i,i+8,mat);
    connect(i+16,i+16+8,mat);
    connect(i,i+16,mat);
    connect(i+8,i+8+16,mat);
  }
}

function connect(a, b, mat) {
  line(mat[a].x, mat[a].y, mat[b].x, mat[b].y);
}
