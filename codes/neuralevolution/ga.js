function nextGeneration() {
  calculateFitness();
  pipes = [];
  counter = 0;
  slicedPipes = 0;
  console.log("new generation");

  savedBirds.sort(function(a,b){return - a.fitness + b.fitness});
  for (var i = 0; i < 10; i++) {
    birds.push(copyBird(savedBirds[i]));
    birds.push(new Bird());
  }
  for (var i = 0; i < TOTAL; i++) {
    birds.push(pickOne());
  }
  savedBirds = [];
}

function calculateFitness() {
  let sum = 0;
  savedBirds.forEach(bird => sum += bird.score);
  savedBirds.forEach(bird => bird.fitness = bird.score / sum);
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  let parent = savedBirds[index];
  let child = new Bird();
  child.brain = parent.brain.copy();
  child.brain.mutate(0.1);
  return child;
}

function copyBird(bird) {
  let newB = new Bird();
  newB.brain = bird.brain.copy();
  return newB;
}
