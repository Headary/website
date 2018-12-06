var points = [];
var testpoints = [];
var distance = 4;

let angle = 0;
let scale = 1;

function setup() {
  let index = 0;

  for (var e = 0; e < 2; e++) {
    let s = ((e == 0) ? 1 : -1);
    for (var d = 0; d < 2; d++) {
      let t = ((d == 0) ? 1 : -1);
      for (var c = 0; c < 2; c++) {
        let u = ((c == 0) ? 1 : -1);
        for (var b = 0; b < 2; b++) {
          let w = ((b == 0) ? 1 : -1);
          for (var a = 0; a < 2; a++) {
            let z = ((a == 0) ? 1 : -1);
            points[index++] = new P7Vector(-1, 1, z, w, u, t, s);
            points[index++] = new P7Vector(1, 1, z, w, u, t, s);
            points[index++] = new P7Vector(1, -1, z, w, u, t, s);
            points[index++] = new P7Vector(-1, -1, z, w, u, t, s);
          }
        }
      }
    }
  }

  createCanvas(windowWidth, windowHeight);
  scale = min(width, height);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  let projected = [];
  for (let i = 0; i < points.length; i++) {
    let projected6d = points[i].rotate("ZS", angle).project();
    let projected5d = projected6d.project();
    let projected4d = projected5d.project();
    let projected3d = projected4d.project();
    let projected2d = projected3d.rotate("XZ", angle / 8).rotate("YZ", -PI / 16).project().mult(scale * 5);
    stroke(255);
    strokeWeight(8);
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
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 4; i++) {
      strokeWeight(1);
      for (var k = 0; k < 8; k++) {
        connect(i + k * 4 + j * n / 4, ((i + 1) % 4) + k * 4 + j * n / 4, mat);
      }

      connect(i + j * n / 4, i + j * n / 4 + 4, mat);
      connect(i + j * n / 4 + 8, i + j * n / 4 + 12, mat);
      connect(i + j * n / 4 + 16, i + j * n / 4 + 16 + 4, mat);
      connect(i + j * n / 4 + 16 + 8, i + j * n / 4 + 16 + 12, mat);
    }

    for (var i = 0; i < 8; i++) {
      connect(i + j * n / 4, i + j * n / 4 + 8, mat);
      connect(i + j * n / 4 + 16, i + j * n / 4 + 16 + 8, mat);
      connect(i + j * n / 4, i + j * n / 4 + 16, mat);
      connect(i + j * n / 4 + 8, i + j * n / 4 + 8 + 16, mat);
    }
  }

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 4; j++) {
      connect(i + j * 8, i + n / 4 + j * 8, mat);
      connect(i + j * 8 + n / 2, i + n / 4 + n / 2 + j * 8, mat);
    }
  }

  for (var i = 0; i < 64; i++) {
    connect(i,i+n/2,mat);
  }
}

function connect(a, b, mat) {
  line(mat[a].x, mat[a].y, mat[b].x, mat[b].y);
}
