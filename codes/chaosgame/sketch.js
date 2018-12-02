let pointCount = 3;
let percent = 0.5;
let points = [];
let pen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  let radius = (windowWidth < windowHeight) ? windowWidth * 0.45 : windowHeight * 0.45;

  url_string = window.location.href;
  url = new URL(url_string);
  let c = url.searchParams.get("c");
  if(c) pointCount = c;
  let p = url.searchParams.get("p");
  if(p) percent = p;

  stroke(255, 0, 255);
  strokeWeight(2);
  noFill();
  for (var i = 0; i < pointCount; i++) {
    let angle = i * (TWO_PI / pointCount) - radians(90);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    let v = createVector(x, y);
    points.push(v);
    v.add(width / 2, height / 2);
    // stroke(255);
    // strokeWeight(16);
    // point(v.x,v.y);
  }
  pen = createVector(random(width), random(height));
}

function draw() {
  for (var i = 0; i < 40; i++) {
    newPoint();
  }
  if (frameCount % 1000 == 0) {
    background(51);
    pen = createVector(random(width), random(height));
  }
}

function newPoint() {
  let next = floor(random(pointCount));
  pen.x = lerp(pen.x, points[next].x, percent);
  pen.y = lerp(pen.y, points[next].y, percent);
  stroke(255, 0, 255);
  strokeWeight(1);
  point(pen.x, pen.y);
}
