const imgCanvas = document.getElementById('imgCanvas');
const ctx = imgCanvas.getContext('2d');
imgCanvas.width = window.innerWidth;
imgCanvas.height = window.innerHeight;

const image = new Image();
image.src = '/src/images/minions.jpg';

image.onload = function() {
    ctx.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
};


// var image = document.getElementById('img1');
var canvas = document.getElementById('canvas');
var rect={};
var handleRadius = 10
var dragTL = dragBL = dragTR = dragBR = false;
var dragWholeRect = false;

canvas.onmousedown = function (e) {
    console.log(`${e.x} and ${e.y}`);
}

window.addEventListener('load',init)


function init(){
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    initCanvas();
    initRect();
    drawRectInCanvas();
}


//Setup canvas, Setup and draw selection box

function initCanvas(){

    //Set height and width of canvas same as that of image.
    canvas.height = image.height;
    canvas.width = image.width;

    //Set Top and left fpr the Canvas
    canvas.style.top = image.offsetTop + "px";;
    canvas.style.left = image.offsetLeft + "px";

}

function initRect(){

  //Set H,W,T,L for the bounding box.
  rect.height = 200;
  rect.width = 200;
  // rect.top = canvas.height/2;
  // rect.left= canvas.width/2;
  rect.left = (window.innerWidth - rect.width) / 2;
  rect.top = (window.innerHeight - rect.height) / 2;
  console.log("Rect",rect);

}

function drawRectInCanvas()
{
  //Initialize canvas with context
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = "6";
  ctx.fillStyle = "rgba(199, 87, 231, 0.2)";
  ctx.strokeStyle = "#c757e7";
  ctx.rect(rect.left, rect.top, rect.width, rect.height);
  ctx.fill();
  ctx.stroke();
  //Draw call
  drawHandles();
}

function drawHandles() {
    drawCircle(rect.left, rect.top, handleRadius);
    drawCircle(rect.left + rect.width, rect.top, handleRadius);
    drawCircle(rect.left + rect.width, rect.top + rect.height, handleRadius);
    drawCircle(rect.left, rect.top + rect.height, handleRadius);
}

function drawCircle(x, y, radius) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#c757e7";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}


//Mouse Interactions

function mouseDown(e) {
  var pos = getMousePos(this,e);
  mouseX = pos.x;
  mouseY = pos.y;

  // mouseX = e.x;
  // mouseY = e.y;

  // 0. inside movable rectangle
  if (checkInRect(mouseX, mouseY, rect)){
      dragWholeRect=true;
      startX = mouseX;
      startY = mouseY;
  }
  // 1. top left
  else if (checkCloseEnough(mouseX, rect.left) && checkCloseEnough(mouseY, rect.top)) {
      dragTL = true;
  }
  // 2. top right
  else if (checkCloseEnough(mouseX, rect.left + rect.width) && checkCloseEnough(mouseY, rect.top)) {
      dragTR = true;
  }
  // 3. bottom left
  else if (checkCloseEnough(mouseX, rect.left) && checkCloseEnough(mouseY, rect.top + rect.height)) {
      dragBL = true;
  }
  // 4. bottom right
  else if (checkCloseEnough(mouseX, rect.left + rect.width) && checkCloseEnough(mouseY, rect.top + rect.height)) {
      dragBR = true;
  }
  // (5.) none of them
  else {
      // handle not resizing
  }
  drawRectInCanvas();
}

function getMousePos(canvas,evt) {
  var clx, cly;
  clx = evt.clientX;
  cly = evt.clientY;

  var boundingRect = canvas.getBoundingClientRect();
  return {
    x: clx - boundingRect.left,
    y: cly - boundingRect.top
  };
}

function checkInRect(x, y, r) {
  return (x>r.left && x<(r.width+r.left)) && (y>r.top && y<(r.top+r.height));
}

function checkCloseEnough(p1, p2) {
  return Math.abs(p1 - p2) < handleRadius;
}


function mouseMove(e) { 
  var pos = getMousePos(this,e);
  mouseX = pos.x;
  mouseY = pos.y;
  if (dragWholeRect) {
      e.preventDefault();
      e.stopPropagation();
      dx = mouseX - startX;
      dy = mouseY - startY;
      if ((rect.left+dx)>0 && (rect.left+dx+rect.width)<canvas.width){
        rect.left += dx;
      }
      if ((rect.top+dy)>0 && (rect.top+dy+rect.height)<canvas.height){
        rect.top += dy;
      }
      startX = mouseX;
      startY = mouseY;
  } else if (dragTL) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left+rect.width - mouseX)+Math.abs(rect.height + rect.top - mouseY))/2;
      if (newSide>150){
        rect.left = rect.left + rect.width - newSide;
        rect.top = rect.height + rect.top - newSide;
        rect.width = rect.height = newSide;
      }
  } else if (dragTR) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(mouseX-rect.left)+Math.abs(rect.height + rect.top - mouseY))/2;
      if (newSide>150){
          rect.top = rect.height + rect.top - newSide;
          rect.width = rect.height = newSide;
      }
  } else if (dragBL) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left+rect.width - mouseX)+Math.abs(rect.top - mouseY))/2;
      if (newSide>150)
      {
        rect.left = rect.left + rect.width - newSide;
        rect.width = rect.height = newSide;
      }
  } else if (dragBR) {
      e.preventDefault();
      e.stopPropagation();
      var newSide = (Math.abs(rect.left - mouseX)+Math.abs(rect.top - mouseY))/2;
      if (newSide>150)
      {
       rect.width = rect.height = newSide;
      }      
  }
  drawRectInCanvas();
}

function mouseUp(e) {
  dragTL = dragTR = dragBL = dragBR = false;
  dragWholeRect = false;
}