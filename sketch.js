
function setup() {
  noCanvas();
  var container = select('#grid_container');
  let divs = [];
  for(let i = 0; i < 5; i++) {
    let div = createDiv();
    div.id("item_container" + i);
    div.class("item_container");
    divs[i] = div;

    let text = createP("Click!");
    text.class("game_names");
    text.parent("item_container" + i);

    let button = createButton("Play Game!");
    button.class("buttons");
    button.parent("item_container" + i);
  }
}
