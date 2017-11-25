

var Conv1_Weights,Conv1_Biases,Conv2_Weights,Conv2_Biases,FC1_Weights,FC1_Biases;
function generate_variables() {
  Conv1_Weights = deeplearn.Array4D.new([5,5,1,32],Parameters["Conv1/Weights"]);
  Conv1_Biases = deeplearn.Array1D.new(Parameters["Conv1/Biases"]);
  Conv2_Weights = deeplearn.Array4D.new([5,5,32,64],Parameters["Conv2/Weights"]);
  Conv2_Biases = deeplearn.Array1D.new(Parameters["Conv2/Biases"]);
  FC1_Weights = deeplearn.Array2D.new([256,10],Parameters["FC1/Weights"]);
  FC1_Biases = deeplearn.Array1D.new(Parameters["FC1/Biases"]);
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
    var input = track(deeplearn.Array3D.new([28,28,1],inputs));

    //Conv 1
    conv1 = track(math.conv2d(input,Conv1_Weights,Conv1_Biases,[2,2],"same"));
    conv1_relu = math.relu(conv1);
    //Pool 1
    pool1 = math.maxPool(conv1_relu,[2,2],[2,2],"same");
    //Conv 2
    conv2 = math.conv2d(pool1,Conv2_Weights,Conv2_Biases,[2,2],"same");
    conv2_relu = math.relu(conv2);
    //Pool 2
    pool2 = math.maxPool(conv2_relu,[2,2],[2,2],"same");
    //Flatten
    flattened = pool2.flatten();
    multiply = math.vectorTimesMatrix(flattened,FC1_Weights);
    added = math.add(multiply,FC1_Biases);
    a3 = math.softmax(added)
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
