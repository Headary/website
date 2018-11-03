let list_colors;

function setupUI() {
  list_colors = select("#list_colors");
}

function addToList(colorType) {
  let container = createDiv().parent(list_colors).class("item");
  createP(colorType.name).parent(container);
  createP(colorType.r + ", " + colorType.g + ", " + colorType.b).parent(container);
  createP(colorType.index).parent(container);
}

function addDefaultColors() {
  let ct1 = new ColorType("Černá", 00, 00, 00, colors.length);
  colors.push(ct1);
  addToList(ct1);
  let ct2 = new ColorType("Červená", 255, 00, 00, colors.length);
  colors.push(ct2);
  addToList(ct2);
  let ct3 = new ColorType("Zelená", 00, 255, 00, colors.length);
  colors.push(ct3);
  addToList(ct3);
  let ct4 = new ColorType("Modrá", 00, 00, 255, colors.length);
  colors.push(ct4);
  addToList(ct4);
  let ct5 = new ColorType("Bílá", 255, 255, 255, colors.length);
  colors.push(ct5);
  addToList(ct5);
}

function colFieldChange() {
  let colPickName = "#" +
   (('0000' + parseInt(input_colR.value, 10).toString(16)).slice(-2) +
    ('0000' + parseInt(input_colG.value, 10).toString(16)).slice(-2) +
    ('0000' + parseInt(input_colB.value, 10).toString(16)).slice(-2)).toUpperCase();
  colorPick.style.backgroundColor = colPickName;
}

function colLabelChange(label, value) {
  document.getElementById(label).innerHTML = value.toString();
  console.log("Change value in " + label);
}
