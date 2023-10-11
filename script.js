
var image = document.getElementById('img1');
var canvas = document.getElementById('canvas');
var effective_image_width = 4032;
var effective_image_height = 3024;

var th_left = 600;
var th_top = 600;
var th_right = 2000;
var th_bottom = 1300;

var th_width = th_right - th_left;
var th_height = th_bottom - th_top;

var rect={};
var handleRadius = 10

//hidden or text inputs
var h_th_left = 164;
var h_th_top = 910;
var h_th_right = 1995;
var h_th_bottom = 2739;


canvas.onmousedown = function (e) {
    console.log(`${e.x} and ${e.y}`);
}

window.addEventListener('load',init)


function init(){
    // canvas.addEventListener('mousedown', mouseDown, false);
    // canvas.addEventListener('mouseup', mouseUp, false);
    // canvas.addEventListener('mousemove', mouseMove, false);
    initCanvas();
    initRect();
    drawRectInCanvas();
}

function initCanvas(){
    canvas.height = image.height;
    canvas.width = image.width;
    canvas.style.top = image.offsetTop + "px";;
    canvas.style.left = image.offsetLeft + "px";
}

function initRect(){
  var ratio_w = canvas.width / effective_image_width;
  var ratio_h = canvas.height / effective_image_height;
//   //BORDER OF SIZE 6!
  rect.height = th_height*ratio_h-6
  rect.width = th_width*ratio_w-6
  rect.top = th_top*ratio_h+3
  rect.left = th_left*ratio_w+3
}

function drawRectInCanvas()
{
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = "6";
  ctx.fillStyle = "rgba(199, 87, 231, 0.2)";
  ctx.strokeStyle = "#c757e7";
  ctx.rect(rect.left, rect.top, rect.width, rect.height);
  ctx.fill();
  ctx.stroke();
  drawHandles();
  updateHiddenInputs()
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

function updateHiddenInputs(){
    var inverse_ratio_w =  effective_image_width / canvas.width;
    var inverse_ratio_h = effective_image_height / canvas.height ;
    h_th_left.value = Math.round(rect.left * inverse_ratio_w)
    h_th_top.value = Math.round(rect.top * inverse_ratio_h)
    h_th_right.value = Math.round((rect.left + rect.width) * inverse_ratio_w)
    h_th_bottom.value = Math.round((rect.top + rect.height) * inverse_ratio_h)
  }

