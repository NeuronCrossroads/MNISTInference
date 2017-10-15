var ct_weights_1 = [];
var ct_biases_1 = [];
var ct_weights_2 = [];
var ct_biases_2 = [];
var ct_weights_3 = [];
var ct_biases_3 = [];

var W1,b1,W2,b2,W3,b3;

//Following Function gets 2D arrays and concatenates then into a 1D Arrays
function compute_parameters() {
  ct_weights_1 = [];
  ct_biases_1 = [];
  ct_weights_2 = [];
  ct_biases_2 = [];
  ct_weights_3 = [];
  ct_biases_3 = [];
  //Layer 1
  for ( var i = 0; i < weights1.length;i++){
    ct_weights_1 = ct_weights_1.concat(weights1[i]);
  }
  for ( var i = 0; i < biases1.length;i++){
    ct_biases_1 = ct_biases_1.concat(biases1[i]);
  }
  //The deeplearn.Arrays are created from the concatenated arrays for the computation
  W1 = deeplearn.Array2D.new([weights1.length, weights1[0].length], ct_weights_1);
  b1 = deeplearn.Array1D.new(ct_biases_1);
  //Layer 2
  for ( var i = 0; i < weights2.length;i++){
    ct_weights_2 = ct_weights_2.concat(weights2[i]);
  }
  for ( var i = 0; i < biases2.length;i++){
    ct_biases_2 = ct_biases_2.concat(biases2[i]);
  }
  W2 = deeplearn.Array2D.new([weights2.length, weights2[0].length], ct_weights_2);
  b2 = deeplearn.Array1D.new(ct_biases_2);
  //Layer 3
  for ( var i = 0; i < weights3.length;i++){
    ct_weights_3 = ct_weights_3.concat(weights3[i]);
  }
  for ( var i = 0; i < biases3.length;i++){
    ct_biases_3 = ct_biases_3.concat(biases3[i]);
  }
  W3 = deeplearn.Array2D.new([weights3.length, weights3[0].length], ct_weights_3);
  b3 = deeplearn.Array1D.new(ct_biases_3);
}

//Finds the index number of the greatest probability
function findGreatestIndex(array) {
  var greatest = 0;
  var index = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > greatest) {
      greatest = array[i];
      index = i;
    }
  }
  return index;
}

function predict(inputs) {
  //Initialize CPU Math node
  var math = new deeplearn.NDArrayMathCPU();

  //Create empty variable to return for the prediction
  var prediction;

  //Computations must be run in the math scope. Variables are disposed at the end
  var network = math.scope((keep,track) => {
    var input = track(deeplearn.Array1D.new(inputs));
    //input = track(math.arrayDividedByScalar(input, deeplearn.Scalar.new(255)));

    //Hidden layer 1
    var m1 = math.vectorTimesMatrix(input,W1);
    var z1 = math.add(m1,b1);
    var a1 = math.relu(z1);

    //Hidden layer 2
    var m2 = math.vectorTimesMatrix(a1,W2);
    var z2 = math.add(m2,b2);
    var a2 = math.relu(z2);

    //Output layer(Hint: softmax)
    var m3 = math.vectorTimesMatrix(a2,W3);
    var z3 = math.add(m3,b3);
    var a3 = math.softmax(z3);

    //.getValues(); converts WebGLTexture to array
    prediction = a3.getValues();
  });
  return prediction;
}

//Rounding function
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


//maximum value function
function maxm(input, max) {
  if ( input > max ) {
    input = max;
  }
  return input;
}
