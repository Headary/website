var data;

function preload() {
  data = loadJSON("games.json");
}

function setup() {
  noCanvas();
  for (let i = 0; i < data.games.length; i++) {
    let game = data.games[i];

    let div = createDiv();
    div.id("item_container_" + i);
    div.class("item_container");
    div.parent("grid_container");
    div.mousePressed(function () {divPressed(i);})

    let name = createP(game.name);
    name.class("game_name");
    name.parent("item_container_" + i);

    let desc = createP(game.description);
    desc.class("game_desc");
    desc.parent("item_container_" + i);
  }
}

function divPressed(index) {
  let folder = data.games[index].folder;
  window.open("https://headary.github.io/website/" + folder);
}
