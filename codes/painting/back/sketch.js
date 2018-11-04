var grid = [];
var scl;
var tileWidth;

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
let grid_pixelarray = [];

function setup() {

  gridSize = document.getElementById("input_gridsize").value;

  var smaller = windowHeight;
  if (windowHeight > windowWidth) smaller = windowWidth;
  var size = floor((smaller / gridSize) * 0.65) * gridSize;

  createCanvas(size, size).parent("#canvas");
  background(51);

  scl = size / gridSize;
  tileWidth = scl * 0.9;

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
  let ct = new ColorType(name, r, g, b, colors.length);
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
  codes_multiplies = [];
  codes_individualId = [];

  let smaller = windowHeight;
  if (windowHeight > windowWidth) smaller = windowWidth;
  let size = floor((smaller / gridSize) * 0.65) * gridSize;

  gridSize = parseInt(document.getElementById("input_gridsize").value);
  scl = size / gridSize;
  tileWidth = scl * 0.9;
  grid = [];
  for (let x = 0; x < gridSize; x++) {
    grid[x] = [];
    for (let y = 0; y < gridSize; y++) {
      grid[x][y] = new Tile(x * scl, y * scl, tileWidth, new ColorType("Default", 255, 255, 255, 999), scl);
    }
  }

  inputString = document.getElementById("input_string").value;
  if (!inputString) {
    window.alert("Zadejte hexadecimální kód");
    return;
  }
  codes_slicedString = inputString.split(", ");

  let binaryPlaces = 0;
  if (colors.length != 0) {
    binaryPlaces = colors[colors.length - 1].index.toString(2).length;
  } else {
    window.alert("Nastavte barvy v obrázku do tabulky");
    return;
  }

  for (let i = 0; i < codes_slicedString.length; i++) {
    let binary = parseInt(codes_slicedString[i], 16).toString(2);
    let color_count = parseInt(binary.slice(0, binary.length - binaryPlaces), 2);
    let color_index = parseInt(binary.slice(-binaryPlaces), 2);
    codes_multiplies[i] = new repColor(color_count, color_index);
  }

  for (var i = 0; i < codes_multiplies.length; i++) {
    for (var j = 0; j < codes_multiplies[i].count; j++) {
      codes_individualId.push(codes_multiplies[i].index);
    }
  }
  // console.table(codes_individualId);

  grid_pixelarray = []
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid_pixelarray.push(grid[x][y]);
    }
  }

  let count = min(codes_individualId.length, grid_pixelarray.length);

  background(51);
  for (let i = 0; i < count; i++) {
    if (colors.length - 1 >= codes_individualId[i])
      grid_pixelarray[i].changeColor(colors[codes_individualId[i]]);
    else {
      window.alert("Vložte VŠECHNY barvy do tabulky.");
      return;
    }
  }
}
