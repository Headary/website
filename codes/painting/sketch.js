var tilesCount = 8; //Numbur of tiles on each side
var grid = [];
var scl;

var colors = [];
var shortenIndexArray = [];
var selectedColor;

var colorGridOn;


var url_string, url, t; // t - tiles count from url
function setup() {
  let smaller = windowHeight;
  if (windowHeight > windowWidth) smaller = windowWidth;
  let size = floor((smaller / tilesCount) * 0.8) * tilesCount;
  createCanvas(size, size).parent(document.getElementById('paint'));
  background(51);

  url_string = window.location.href;
  url = new URL(url_string);
  t = url.searchParams.get("t");
  if(t) tilesCount = t;
  x = document.getElementById("colselect");

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
      grid[x][y] = new Tile(x * scl, y * scl, tileWidth, colors[4], scl);
      grid[x][y].show();
      //console.log("Tile!" + x + " | " +y);
    }
  }
  colorGridOn = true;

  createUI();
  setCol();

  colFieldChange();
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
  var i = document.getElementById('colselect').selectedIndex;
  selectedColor = colors[i];
  //console.log("set col");
}

// Show Grids
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

class ShortenIndex {
  constructor(count, index) {
    this.count = count;
    this.index = index;
  }
}

function countRepeatingIndex() {
  //-----Count-----
  let tileIndexArray = [];
  shortenIndexArray.length = 0;
  let shor
  for (let y = 0; y < tilesCount; y++) {
    for (let x = 0; x < tilesCount; x++) {
      tileIndexArray.push(grid[x][y].color.index);;
    }
  }

  let counter = 1;
  for (var i = 1; i < tileIndexArray.length - 1; i++) {
    if (tileIndexArray[i] == tileIndexArray[i - 1]) {
      counter++;
    } else {
      shortenIndexArray.push(new ShortenIndex(counter, tileIndexArray[i - 1]));
      counter = 1;
    }
  }
  if (tileIndexArray[tileIndexArray.length - 1] == tileIndexArray[tileIndexArray.length - 2]) {
    counter++;
    shortenIndexArray.push(new ShortenIndex(counter, tileIndexArray[tileIndexArray.length - 1]));
    // console.log("Done");
  } else {
    shortenIndexArray.push(new ShortenIndex(counter, tileIndexArray[tileIndexArray.length - 2]));
    shortenIndexArray.push(new ShortenIndex(1, tileIndexArray[tileIndexArray.length - 1]));
    // console.log("Last diff");
  }

  // console.log(shortenIndexArray);

  //----Convert----
  var shortenHexa = "";
  for (var i = 0; i < shortenIndexArray.length; i++) {
    let hexaIndexString = "";

    let longhestId = colors[colors.length - 1].index;
    let longhestIdLen = longhestId.toString(2).length;
    let nulls = "";
    for (var a = 0; a < longhestIdLen; a++) nulls += "0";
    let id2 = (nulls + shortenIndexArray[i].index.toString(2)).slice(-longhestIdLen);
    let ct2 = shortenIndexArray[i].count.toString(2);

    let binary = ct2 + id2;
    //console.log(binary + " | " + Math.ceil(binary.length / 4));
    for (var j = 0; j < Math.ceil(binary.length / 4); j++) {
      let lastFourCharracters = ("0000" + binary).slice(-4);
      binary = ("0000" + binary).slice(0, -4);
      hexaIndexString = parseInt(lastFourCharracters, 2).toString(16).toUpperCase() + hexaIndexString;
    }
    shortenHexa += hexaIndexString + ", ";
    //console.log(shortenIndexArray[i].count + " * " + shortenIndexArray[i].index + " | " + hexaIndexString);
  }
  shortenHexa = shortenHexa.slice(0, -2);
  document.getElementById("shortenHexa").innerHTML = shortenHexa;
}
