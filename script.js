var image, canvas;

image = document.getElementById('img1');
canvas = document.getElementById('canvas');

canvas.height = image.height;
canvas.width = image.width;



canvas.onmousedown = function (e) {
    console.log(`${e.x} and ${e.y}`);
}

// canvas.addEventListener('mousedown', mouseDown, false);

