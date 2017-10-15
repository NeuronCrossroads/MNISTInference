var gridInterval;
var inkSpread = 4.5;

function setup() {
  if ( windowWidth < windowHeight) {
    createCanvas(0.75*windowWidth,0.75*windowWidth);
  }
  else {
    createCanvas(0.75*windowHeight,0.75*windowHeight);
  }
  gridInterval = width/28;
  strokeWeight(5);
  rect(1,1,width-5,height-5);
  fill(0,0,0);
}

var gridPosX, gridPosY;

function draw() {
  if (mouseIsPressed) {
    gridPosX = mouseX;
    gridPosY = mouseY;
    a = gridPosX % gridInterval;
    gridPosX = round((gridPosX-a)/gridInterval,1);
    b = gridPosY % gridInterval;
    gridPosY = round((gridPosY-b)/gridInterval,1);

    if ( gridPosX < 28 && gridPosX >= 0 && gridPosY < 28 && gridPosY >= 0) {
      if ( !keyIsDown(UP_ARROW)) {
        fillCircle(gridPosX,gridPosY);
      }
    }
  }
  if ( touches.length > 0 ) {
    gridPosX = touches[0].x;
    gridPosY = touches[0].y;
    a = gridPosX % gridInterval;
    gridPosX = round((gridPosX-a)/gridInterval,1);
    b = gridPosY % gridInterval;
    gridPosY = round((gridPosY-b)/gridInterval,1);

    if ( gridPosX < 28 && gridPosX >= 0 && gridPosY < 28 && gridPosY >= 0) {
      if ( !keyIsDown(UP_ARROW)) {
        fillCircle(gridPosX,gridPosY);
      }
    }
  }
}

function fillCircle(gridPosX, gridPosY) {
  noStroke();
  //Center
  data.setValue(gridPosX,gridPosY,maxm(data.getValue(gridPosX,gridPosY)+125,255));
  fill(0,0,0,255/2);
  rect(gridPosX*(gridInterval),gridPosY*(gridInterval), gridInterval, gridInterval);
  //Right
  if ( gridPosX+1 < 28 ) {
    //1 right
    data.setValue(gridPosX+1,gridPosY,maxm(data.getValue(gridPosX+1,gridPosY)+85,255));
    fill(0,0,0,255/3);
    rect((gridPosX+1)*(gridInterval),gridPosY*(gridInterval), gridInterval, gridInterval);
  }
  //Left
  if ( gridPosX-1 >= 0 ) {
    //1 left
    data.setValue(gridPosX-1,gridPosY,maxm(data.getValue(gridPosX-1,gridPosY)+85,255));
    fill(0,0,0,255/3);
    rect((gridPosX-1)*(gridInterval),gridPosY*(gridInterval), gridInterval, gridInterval);
  }
  //Up
  if ( gridPosY-1 >= 0 ) {
    //1 left
    data.setValue(gridPosX,gridPosY-1,maxm(data.getValue(gridPosX,gridPosY-1)+85,255));
    fill(0,0,0,255/3);
    rect(gridPosX*(gridInterval),(gridPosY-1)*(gridInterval), gridInterval, gridInterval);
  }
  //Down
  if ( gridPosY+1 < 28 ) {
    //1 left
    data.setValue(gridPosX,gridPosY+1,maxm(data.getValue(gridPosX,gridPosY+1)+0.33,1));
    fill(0,0,0,255/3);
    rect(gridPosX*(gridInterval),(gridPosY+1)*(gridInterval), gridInterval, gridInterval);
  }
}
function keyTyped() {
  if (key == "r") {
    alert("I predict this is a "+inference(data.getArray()));
    data = new Array2D(28,28);
    data.initZeros();
    fill(255);
    strokeWeight(5);
    rect(1,1,width-5,height-5);
  }
}
