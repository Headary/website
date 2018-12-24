function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // return sigmoid(x) * (1-sigmoid(x));
  return y * (1 - y);
}

var m;
var n;

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.learning_rate = 1;
  }

  feedforward(input_array) {
    //Generating hidden output
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    //actiovation
    hidden.map(sigmoid);

    let output = Matrix.mult(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }

  train(input_array, target_array) {
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    //actiovation
    hidden.map(sigmoid);

    let outputs = Matrix.mult(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    let targets = Matrix.fromArray(target_array);

    let output_errors = Matrix.subtract(targets, outputs);

    //Calc gradient
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.mult(output_errors);
    gradients.mult(this.learning_rate);

    //calc deltas
    let hidden_T = Matrix.transpoze(hidden);
    let weights_ho_deltas = Matrix.mult(gradients, hidden_T);

    // Add deltas
    this.weights_ho.add(weights_ho_deltas);
    this.bias_o.add(gradients);

    // Calc hidden layers
    let who_t = Matrix.transpoze(this.weights_ho);
    let hidden_errors = Matrix.mult(who_t, output_errors);

    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.mult(hidden_errors);
    hidden_gradient.mult(this.learning_rate);

    let inputs_T = Matrix.transpoze(inputs);
    let weights_ih_deltas = Matrix.mult(hidden_gradient, inputs_T);

    //??? Right? RIGHT?
    this.weights_ih.add(weights_ih_deltas);
    this.bias_h.add(hidden_gradient);
  }
}
