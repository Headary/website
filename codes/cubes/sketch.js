var data;

function preload() {
  data = loadJSON("cubes.json");
}

function setup() {
  noCanvas();
  for (let i = 0; i < data.games.length; i++) {
    let game = data.games[i];

    let div = createDiv();
    div.id("item_container_" + i);
    div.class("item_container button");
    div.parent("grid_container");
    div.mouseClicked(function() {
      divPressed(i);
    })

    let name = createP(game.name);
    name.class("game_name");
    name.parent("item_container_" + i);
  }
}

function divPressed(index) {
  let folder = data.games[index].folder;
  window.open(window.location.href + folder, "_self");
}

function switchTheme(checkbox) {
  if (checkbox.checked) {
    document.getElementById('theme').setAttribute('href', 'css/light.css');
    console.log("light " + this.checked);
  } else {
    document.getElementById('theme').setAttribute('href', 'css/dark.css');
    console.log("dark " + this.checked);
  }
}
