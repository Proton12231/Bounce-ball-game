const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvaswidth = c.width;
const ctx = c.getContext("2d");

let circle_x = 160;
let circle_y = 60;
radius = 20;

function drawCircle() {
  ctx.fillStyle = "#272727";
  ctx.fillRect(0, 0, canvaswidth, canvasHeight);

  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle(), 25);
