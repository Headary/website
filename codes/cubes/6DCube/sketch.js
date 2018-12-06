var points = [];
var testpoints = [];
var distance = 4;

let angle = 0;
let scale = 1;
function setup() {

  let index = 0;

  for (var d = 0; d < 2; d++) {
    let t = ((d == 0) ? 1 : -1);
    for (var c = 0; c < 2; c++) {
      let u = ((c == 0) ? 1 : -1);
      for (var b = 0; b < 2; b++) {
        let w = ((b == 0) ? 1 : -1);
        for (var a = 0; a < 2; a++) {
          let z = ((a == 0) ? 1 : -1);
          points[index++] = new P6Vector(-1, 1, z, w, u, t);
          points[index++] = new P6Vector(1, 1, z, w, u, t);
          points[index++] = new P6Vector(1, -1, z, w, u, t);
          points[index++] = new P6Vector(-1, -1, z, w, u, t);
        }
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
    let projected5d = points[i].rotate("ZT", angle).project();
    let projected4d = projected5d.project();
    let projected3d = projected4d.project();
    let projected2d = projected3d.rotate("XZ", angle / 8).rotate("YZ", -PI / 16).project().mult(scale*2.5);
    stroke(255);
    strokeWeight(16);
    noFill();
    point(projected2d.x, projected2d.y);
    // stroke(0);
    // strokeWeight(8);
    // textSize(16);
    // fill(255, 0, 0);
    // text(i, projected2d.x, projected2d.y)
    projected[i] = projected2d;
  }

  createConnections(projected);

  angle += 0.02;
  // noLoop();
}

function createConnections(mat) {
  stroke(255);
  let n = points.length;
  for (var j = 0; j < 2; j++) {
    for (var i = 0; i < 4; i++) {
      strokeWeight(2);
      for (var k = 0; k < 8; k++) {
        connect(i + k * 4 + j*n/2, ((i + 1) % 4) + k * 4 + j*n/2, mat);
      }

      connect(i + j*n/2, i + j*n/2 + 4, mat);
      connect(i + j*n/2 + 8, i + j*n/2+ 12, mat);
      connect(i + j*n/2 + 16, i + j*n/2+ 16 + 4, mat);
      connect(i + j*n/2 + 16 + 8, i + j*n/2 + 16 + 12, mat);
    }

    for (var i = 0; i < 8; i++) {
      connect(i + j*n/2, i + j*n/2 + 8, mat);
      connect(i + j*n/2+ 16, i + j*n/2+ 16 + 8, mat);
      connect(i + j*n/2, i + j*n/2+ 16, mat);
      connect(i + j*n/2 + 8, i + j*n/2 + 8 + 16, mat);
    }
  }

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 4; j++) {
      connect(i + j*8, i+n/2+j*8, mat);
    }
  }
}

function connect(a, b, mat) {
  line(mat[a].x, mat[a].y, mat[b].x, mat[b].y);
}
