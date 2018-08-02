function cSliders() {
  let windowDiv = createDiv();
  windowDiv.class("wrapper");

  let windowLab = createP("Window");
  windowLab.class("label");
  windowLab.parent(windowDiv);

  let botDiv = createDiv();
  botDiv.class("wrapper");

  let botLab = createP("Bot");
  botLab.class("label");
  botLab.parent(botDiv);

  let ballDiv = createDiv();
  ballDiv.class("wrapper");

  let ballLab = createP("Ball");
  ballLab.class("label");
  ballLab.parent(ballDiv);

  let paddleDiv = createDiv();
  paddleDiv.class("wrapper");

  let paddleLab = createP("Paddles");
  paddleLab.class("label");
  paddleLab.parent(paddleDiv);

  let labels = [];

  labels[0] = createP("Radius: ");
  slider[0] = createSlider(1, 80, 12, 1);
  tVals[0] = createP();

  labels[1] = createP("Speed: ");
  slider[1] = createSlider(1, 20, 7, 1);
  tVals[1] = createP();

  for (let i = 0; i < 2; i++) {
    let div = createDiv();
    div.parent(ballDiv);
    div.class("item-container");
    labels[i].parent(div);
    slider[i].parent(div);
    tVals[i].parent(div);
    slider[i].input(function() {
      updateTVal(i);
      changeBall();
    });
  }

  labels[2] = createP("Left height: ");
  slider[2] = createSlider(1, height / 2, left.h, 1);
  tVals[2] = createP();

  labels[3] = createP("Right height: ");
  slider[3] = createSlider(1, height / 2, right.h, 1);
  tVals[3] = createP();

  labels[4] = createP("Left width: ");
  slider[4] = createSlider(1, width / 16, left.w, 1);
  tVals[4] = createP();

  labels[5] = createP("Right width: ");
  slider[5] = createSlider(1, width / 16, right.w, 1);
  tVals[5] = createP();

  labels[6] = createP("Left speed: ");
  slider[6] = createSlider(1, 80, left.speed, 1);
  tVals[6] = createP();

  labels[7] = createP("Right speed: ");
  slider[7] = createSlider(1, 80, right.speed, 1);
  tVals[7] = createP();

  for (let i = 2; i < 8; i++) {
    let div = createDiv();
    div.parent(paddleDiv);
    div.class("item-container");
    labels[i].parent(div);
    slider[i].parent(div);
    tVals[i].parent(div);
    slider[i].input(function() {
      updateTVal(i);
      changePaddle();
    });
  }

  labels[8] = createP("Width: ")
  slider[8] = createSlider(50, window.innerWidth, width);
  tVals[8] = createP();

  labels[9] = createP("Height: ")
  slider[9] = createSlider(50, window.innerHeight, height);
  tVals[9] = createP();

  for (let i = 8; i < 10; i++) {
    let div = createDiv();
    div.parent(windowDiv);
    div.class("item-container");
    labels[i].parent(div);
    slider[i].parent(div);
    tVals[i].parent(div);
    slider[i].input(function() {
      updateTVal(i);
      changeWinSize();
    });
  }

  lBot = createCheckbox("Left Paddle Bot", false);
  rBot = createCheckbox("Right Paddle Bot", false);
  lBot.parent(botDiv);
  rBot.parent(botDiv);
  lBot.input(function() {
    if (this.checked()) left.enableBot = true;
    else left.enableBot = false;
  })
  rBot.input(function() {
    if (this.checked()) right.enableBot = true;
    else right.enableBot = false;
  })

  let button = createDiv();
  button.class("button");
  let butText = createP("Reset game and apply changes.");
  butText.parent(button);
  button.mousePressed(resetGame);
}

function updateTVal(index) {
  tVals[index].html(floor(slider[index].value()));
}

function changeWinSize() {
  let w = slider[8].value();
  let h = slider[9].value();
  cnv.size(w, h);
  right.x = width - right.w;
}

function changeBall() {
  ball.r = slider[0].value();
  ball.speed = slider[1].value();
}

function changePaddle() {
  left.h = slider[2].value();
  right.h = slider[3].value();
  left.speed = slider[6].value();
  right.speed = slider[7].value();
}