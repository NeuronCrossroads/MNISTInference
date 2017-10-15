document.ontouchmove = function(event){
    event.preventDefault();
}

//Compute when the page loads
var data;
function startUp() {
  compute_parameters();
  data = new Array2D(28,28);
  data.initZeros();
}

//Array must be length 784
function inference(array) {
  var inference = predict(array);  //<= Runs Input through neural network and returns and array of length 10. Each value has the probability of being each digit(array index)
  var digit = findGreatestIndex(inference); //<= Finds which digit has the highest probability
  return digit;  //<= The digit that is predicted
}

//Row object
//Shape1: Superior Array shape(#rows)
//Shape2: Secondary Array shape(#columns)
class Array2D {
  constructor(shape1, shape2) {
    this.rows = shape1;
    this.columns = shape2;
    this.values = new Array();
  }

  //This will initialize all the values of the matrix to be 0
  initZeros() {
    var n = this.rows*this.columns;
    for (var i = 0; i < n; i++) {
      this.values.push(0);
    }
  }

  //returns 1D matrix that is fed into the predict function
  getArray() {
    return this.values;
  }

  //returns single value in matrix
  getValue(x,y) {
    return this["values"][this["rows"]*y + x];
  }

  //Use this to set the
  setValue(x,y,val) {
    var shape1 = this.rows;
    this["values"][shape1*y + x] = val;
  }
}
