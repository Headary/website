class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)), y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => 1 / Math.tanh(x), y => 1 - (y * y)
);

class NeuralNetwork {
  constructor(a, b, c) {
    if (a instanceof NeuralNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();
      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();

    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();
    }

    this.setLearningRate(0.8);
    this.setActivationFunction(sigmoid);
  }

  setLearningRate(val) {
    this.learning_rate = val;
  }

  setActivationFunction(func) {
    this.activation_function = func
  }

  predict(input_array) {
    //Generating hidden output
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    //actiovation
    hidden.map(this.activation_function.func);

    let outputs = Matrix.mult(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    return outputs.toArray();
  }

  train(input_array, target_array) {
    //Generating hidden output
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    //actiovation
    hidden.map(this.activation_function.func);

    let outputs = Matrix.mult(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    let targets = Matrix.fromArray(target_array);

    let output_errors = Matrix.subtract(targets, outputs);

    //Calc gradient
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
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

    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.mult(hidden_errors);
    hidden_gradient.mult(this.learning_rate);

    let inputs_T = Matrix.transpoze(inputs);
    let weights_ih_deltas = Matrix.mult(hidden_gradient, inputs_T);

    //??? Right? RIGHT?
    this.weights_ih.add(weights_ih_deltas);
    this.bias_h.add(hidden_gradient);
  }

  copy() {
    return new NeuralNetwork(this);
  }

  mutate(rate) {
    function mutate(val) {
      return (Math.random() < rate ? ((val+randomGaussian(0,0.1))) : (val));
    }

    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}
