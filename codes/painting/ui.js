function createUI() {
  for (var i = 0; i < colors.length; i++) {
    addOption(colors[i]);
  }
}

function addOption(col) {
  var x = document.getElementById("select");
  var option = document.createElement("option");
  //option.text = option.value = "Kiwi";
  option.text =
    col.name +
    " (#" +
    (('00' +
      col.r.toString(16)).slice(-2) +
    ('00' + col.g.toString(16)).slice(-2) +
    ('00' + col.b.toString(16)).slice(-2)).toUpperCase() +
    ") N.: " + col.index;
  option.setAttribute("class", "option");
  x.add(option);
}
