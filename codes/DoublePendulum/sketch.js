let r1 = 150,
  r2 = 150;
let m1 = 40,
  m2 = 40;

let a1 = 0,
  a2 = 0;
let a1_v, a2_v;

let g = 1;

var sliders = [];
var textVal = [];

let center;

function setup() {
  center = document.getElementById('center');
  let cnv = createCanvas(windowWidth, 0.9 * windowHeight);
  cnv.style('display', 'block');
  cSliders();
  reset();
}

function draw() {

  translate(width / 2, height / 2);
  background(51);

  calcute();

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);
  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  fill(255);
  stroke(255);
  strokeWeight(2);
  line(0, 0, x1, y1);
  ellipse(x1, y1, 24, 24);
  line(x1, y1, x2, y2);
  ellipse(x2, y2, 24, 24);

  for (let i = 0; i < textVal.length; i++) {
    textVal[i].html(nf(sliders[i].value(), 0, 2));
  }
}

function reset() {
  r1 = sliders[0].value();
  r2 = sliders[1].value();
  m1 = sliders[2].value();
  m2 = sliders[3].value();
  a1 = (sliders[4].value() * PI) / 180;
  a2 = (sliders[5].value() * PI) / 180;
  g = sliders[6].value();
  a1_v = 0;
  a2_v = 0;
}

function calcute() {
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
}

function cSliders() {

  let title = createP("Properties");
  title.class("title");

  let mainDiv = createDiv();
  mainDiv.class("mainDiv");

  let labels = [];

  labels[0] = createP("1. radius: ");
  sliders[0] = createSlider(10, 180, 150);
  textVal[0] = createP();

  labels[1] = createP("2. radius: ");
  sliders[1] = createSlider(10, 180, 150);
  textVal[1] = createP();

  labels[2] = createP("1. mass: ");
  sliders[2] = createSlider(0.5, 150, 40, 0.1);
  textVal[2] = createP();

  labels[3] = createP("2. mass: ");
  sliders[3] = createSlider(0.5, 150, 40, 0.1);
  textVal[3] = createP();

  labels[4] = createP("1. start angle: ");
  sliders[4] = createSlider(-180, 180, 90, 1);
  textVal[4] = createP();

  labels[5] = createP("1. start angle: ");
  sliders[5] = createSlider(-180, 180, 90, 1);
  textVal[5] = createP();

  labels[6] = createP("gravity: ");
  sliders[6] = createSlider(0.1, 2.2, 1, 0.05);
  textVal[6] = createP();

  for (let i = 0; i < labels.length; i++) {
    let div = createDiv();
    div.class("wrapper");
    div.parent(mainDiv);
    labels[i].parent(div);
    sliders[i].parent(div);
    textVal[i].parent(div);
  }

  let div = createDiv();
  div.class("buttondiv wrapper");
  div.parent(mainDiv);
  let buttonT = createP("Reset Pendulum and apply changes.");
  div.mousePressed(reset);
  buttonT.parent(div);
}
