var r, g, b;
var colPick;
var x;

function createUI() {
  for (var i = 0; i < colors.length; i++) {
    addOption(colors[i]);
  }

  r = document.getElementById("rrange");
  g = document.getElementById("grange");
  b = document.getElementById("brange");
  colPick = document.getElementById("colorPick");
}

function addOption(col) {
  var option = document.createElement("option");
  //option.text = option.value = "Kiwi";
  option.text =
    col.name +
    " (#" +
    (('0000' +
        col.r.toString(16)).slice(-2) +
      ('0000' + col.g.toString(16)).slice(-2) +
      ('0000' + col.b.toString(16)).slice(-2)).toUpperCase() +
    ") N.: " + col.index;
  option.setAttribute("class", "option");
  x.add(option);
}

function btnDownload() {
  var btnDwn = document.getElementById('btn-download');
  btnDwn.href = canvas.toDataURL("image/png");
}

function colFill() {
  var i = document.getElementById('colselect').selectedIndex;
  for (var x = 0; x < tilesCount; x++) {
    for (var y = 0; y < tilesCount; y++) {
      grid[x][y].changeColor(colors[i]);
    }
  }
}

function addColor() {
  colors.push(new ColorType(document.getElementById("colname").value, parseInt(r.value, 10), parseInt(g.value, 10), parseInt(b.value, 10), colors.length));
  addOption(colors[colors.length - 1]);
  // console.log(colors[colors.length - 1]);
}

function colFieldChange() {
  let colPickName = "#" +
   (('0000' + parseInt(r.value, 10).toString(16)).slice(-2) +
    ('0000' + parseInt(g.value, 10).toString(16)).slice(-2) +
    ('0000' + parseInt(b.value, 10).toString(16)).slice(-2)).toUpperCase();
  colorPick.style.backgroundColor = colPickName;
}

function colLabelChange(label, value) {
  document.getElementById(label).innerHTML = value.toString();
  console.log("Change value in " + label);
}
