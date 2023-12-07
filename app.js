const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvaswidth = c.width;
const ctx = c.getContext("2d");

let circle_x = 160;
let circle_y = 60;
radius = 20;

let ground_x = 100;
let ground_y = 500;
let groundHeight = 5;
let groundWidth = 150;

let xSpeed = 20;
let ySpeed = 20;

//定义一个防止砖块的空数组
let brickArray = [];

//设定砖块坐标随机获取函数
function getRandomARbitiry(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.visible = true;
    brickArray.push(this);
  }

  drawBrick() {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//设定随机画砖块的循环
for (let i = 0; i <= 10; i++) {
  new Brick(getRandomARbitiry(0, 950), getRandomARbitiry(0, 450));
}
//设定长条移动监听器
c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  //移动球
  circle_x += xSpeed;
  circle_y += ySpeed;

  //设定背景刷新
  ctx.fillStyle = "#272727";
  ctx.fillRect(0, 0, canvaswidth, canvasHeight);

  //画出可控制长条
  ctx.fillStyle = "lightGreen";
  ctx.fillRect(ground_x, ground_y, groundWidth, groundHeight);
  ctx.strokeRect(ground_x, ground_y, groundWidth, groundHeight);

  //画出砖块
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  //画出圆球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();

  //增加小球碰到长条反弹
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + groundWidth + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }
  if (circle_x >= canvaswidth - radius) {
    //设置小球上下左右边界
    xSpeed *= -1;
  }
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  if (circle_y <= radius) {
    ySpeed *= -1;
  }

  //设定移动长条
}

let game = setInterval(drawCircle, 25);
