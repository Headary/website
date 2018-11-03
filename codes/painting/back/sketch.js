
var grid = [];
var scl;

var inputString;
var colors = [];
var gridSize = 8;

var input_colName;
var input_colR;
var input_colG;
var input_colB;

let codes_slicedString;
let codes_multiplies = [];
let codes_individualId = [];

function setup() {
  let smaller = windowHeight;
  if (windowHeight > windowWidth) smaller = windowWidth;
  let size = floor((smaller / gridSize) * 0.65) * gridSize;

  createCanvas(size,size).parent("#canvas");
  background(51);

  scl = size / gridSize;
  let tileWidth = scl * 0.9;

  for (let x = 0; x < gridSize; x++) {
    grid[x] = [];
    for (let y = 0; y < gridSize; y++) {
      grid[x][y] = new Tile(x * scl, y * scl, tileWidth, new ColorType("Default", 255, 255, 255, 999), scl);
      grid[x][y].show();
    }
  }

  setupUI();

  input_colName = document.getElementById("col_name");
  input_colR = document.getElementById("col_r");
  input_colG = document.getElementById("col_g");
  input_colB = document.getElementById("col_b");

  colFieldChange();
  colLabelChange('colLabelr', input_colR.value);
  colLabelChange('colLabelg', input_colG.value);
  colLabelChange('colLabelb', input_colB.value);
}

function addColor() {
  let name = input_colName.value;
  let r = input_colR.value;
  let g = input_colG.value;
  let b = input_colB.value;
  let ct = new ColorType(name, r,g,b, colors.length);
  colors.push(ct);
  addToList(ct);
}

// ------ Slice inputString to individual parts -----
class repColor {
  constructor(count, index) {
    this.count = count;
    this.index = index;
  }
}
function genCodes() {
  inputString = document.getElementById("input_string").value;
  codes_slicedString = inputString.split(", ");
  // console.table(codes_slicedString);
  // console.log(parseInt(codes_slicedString[3],16).toString(2));
  let binaryPlaces = colors[colors.length - 1].index.toString(2).length;
  for(let i = 0; i < codes_slicedString.length; i++) {
    let binary = parseInt(codes_slicedString[i],16).toString(2);
    let color_count = parseInt(binary.slice(0, binary.length - binaryPlaces),2);
    let color_index = parseInt(binary.slice(-binaryPlaces),2);
    codes_multiplies[i] = new repColor(color_count, color_index);
  }

  for (var i = 0; i < codes_multiplies.length; i++) {
    for (var j = 0; j < codes_multiplies[i].count; j++) {
      codes_individualId.push(codes_multiplies[i].index);
    }
  }
  // console.table(codes_individualId);

  for (var i = 0; i < codes_individualId.length; i++) {
    let x = i % gridSize;
    let y = floor(i/gridSize);
    grid[x][y].changeColor(colors[codes_individualId[i]]);
  }
}
