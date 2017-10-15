var gridInterval;
var inkSpread = 4.5;

function setup() {
  if ( windowWidth < windowHeight) {
    createCanvas(windowWidth,windowWidth);
  }
  else {
    createCanvas(windowHeight,windowHeight);
  }
  gridInterval = width/28;
  rect(1,1,width-2,height-2);
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
        data.setValue(gridPosX,gridPosY,maxm(data.getValue(gridPosX,gridPosY)+0.4,1));
        noStroke();
        fill(0,0,0,255/5);
        rect(gridPosX*(gridInterval),gridPosY*(gridInterval), gridInterval, gridInterval);
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
        data.setValue(gridPosX,gridPosY,maxm(data.getValue(gridPosX,gridPosY)+0.4,1));
        noStroke();
        fill(0,0,0,255/5);
        rect(gridPosX*(gridInterval),gridPosY*(gridInterval), gridInterval, gridInterval);
      }
    }
  }
}

function keyTyped() {
  if (key == "r") {
    alert("I predict this is a "+inference(data.getArray()));
    data = new Array2D(28,28);
    data.initZeros();
    fill(255);
    strokeWeight(1);
    rect(1,1,width-2,height-2);
  }
}
