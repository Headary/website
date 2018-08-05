let showArcs = true;
let deltaAngle = 15;

let angle = 0;

let arcs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  sequnce.push(current);
  step();
  console.log(sequnce);
}

function draw() {
  translate(20, height / 2);
  background(51);
  scale(width / (biggest * 1.05));
  stroke(255);
  noFill();
  strokeWeight(0.5);

  if (showArcs)
    for (let a of arcs) {
      a.show();
    }

  //Animate last arc
  let X = (current + prev) / 2;
  let d = abs(current - prev);
  if (count % 2 == 0) {
    if (prev < current) arc(X, 0, d, d, PI, PI + toRadians(angle));
    else arc(X, 0, d, d, TWO_PI - radians(angle), TWO_PI);
  } else {
    if (prev < current) arc(X, 0, d, d, PI - radians(angle), PI);
    else arc(X, 0, d, d, 0, radians(angle));
  }

  angle += deltaAngle;
  if (angle > 180) {
    angle = 0.01;
    arcs.push(new Arc(prev, current, count % 2));
    step();
  };

}

let count = 1;
let prev = 0;
let current = 0;
let next = 0;
let sequnce = [];
let biggest = 30;

function step() {
  next = current - count;
  if (next >= 0) {
    for (let i of sequnce) {
      if (next == i) next = current + count;
    }
  } else {
    next = current + count;
  }

  prev = current;
  current = next;
  sequnce.push(next);
  count++;
  if (current > biggest) {
    biggest = current;
    // console.log(biggest);
  }
}

let toRadians = function(angle) {
  return angle * PI / 180;
}