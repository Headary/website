var tilesCount = 8; //Numbur of tiles on each side
var grid = [];
var scl;

var colors = [];
var selectedColor;

var colorGridOn;

function setup() {
  let smaller = windowHeight;
  if (windowHeight > windowWidth) smaller = windowWidth;
  let size = floor((smaller / tilesCount) * 0.8) * tilesCount;
  createCanvas(size, size).parent(document.getElementById('paint'));
  background(51);

  colors.push(new ColorType("Černá", 00, 00, 00, colors.length));
  colors.push(new ColorType("Červená", 255, 00, 00, colors.length));
  colors.push(new ColorType("Zelená", 00, 255, 00, colors.length));
  colors.push(new ColorType("Modrá", 00, 00, 255, colors.length));
  colors.push(new ColorType("Bílá", 255, 255, 255, colors.length));

  //----Main Grid----
  scl = size / tilesCount;
  let tileWidth = scl * 0.9;
  for (let x = 0; x < tilesCount; x++) {
    grid[x] = [];
    for (let y = 0; y < tilesCount; y++) {
      grid[x][y] = new Tile(x * scl, y * scl, tileWidth, colors[4]);
      grid[x][y].show();
      //console.log("Tile!" + x + " | " +y);
    }
  }
  colorGridOn = true;

  createUI();
  setCol();
}

function mousePressed() {
  let x = round((mouseX - scl / 2) / scl);
  let y = round((mouseY - scl / 2) / scl);
  // console.log(x + " | " + y);
  if (x < tilesCount && y < tilesCount && x > -1 && y > -1) {
    grid[x][y].changeColor(selectedColor);
    if (colorGridOn == false) showColorGrid();
  }
}

function setCol() {
  var i = document.getElementById('select').selectedIndex;
  selectedColor = colors[i];
  //console.log("set col");
}

function showColorGrid() {
  background(51);
  colorGridOn = true;
  for (let x = 0; x < tilesCount; x++) {
    for (let y = 0; y < tilesCount; y++) {
      grid[x][y].show();
    }
  }
}

function showHexaGrid() {
  background(51);
  colorGridOn = false;
  for (let x = 0; x < tilesCount; x++) {
    for (let y = 0; y < tilesCount; y++) {
      grid[x][y].showHexa();
    }
  }
}

function showIndexGrid() {
  background(51);
  colorGridOn = false;
  for (let x = 0; x < tilesCount; x++) {
    for (let y = 0; y < tilesCount; y++) {
      grid[x][y].showIndex();
    }
  }
}
