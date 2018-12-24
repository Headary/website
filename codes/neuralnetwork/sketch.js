let training_data = [{
    inputs: [0, 0],
    targets: [1]
  },
  {
    inputs: [0, 1],
    targets: [0]
  },
  {
    inputs: [1, 0],
    targets: [0]
  },
  {
    inputs: [1, 1],
    targets: [1]
  }
];

let nn;

function setup() {
  nn = new NeuralNetwork(2, 4, 1);
  createCanvas(400, 400);
  background(0);
}

function draw() {
  for (var i = 0; i < 200; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }

  for (var i = 0; i < width/10; i++) {
    for (var j = 0; j < height/10; j++) {
      let x = i / (width/10);
      let y = j / (height/10);
      let val = nn.feedforward([x,y]);
      fill(val*255);
      noStroke();
      rect(i*10,j*10,10,10);
    }
  }
}
