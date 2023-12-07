const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvaswidth = c.width;
const ctx = c.getContext("2d");
//统计小球击到的砖块数
let count = 0;

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

  //返回一个布尔值来确定球是否碰到了砖块
  touchingBall(ball_x, ball_y) {
    return (
      ball_x >= this.x - radius &&
      ball_x <= this.x + radius + this.width &&
      ball_y >= this.y - radius &&
      ball_y <= this.y + radius + this.height
    );
  }
}

//设定随机画砖块的循环
for (let i = 0; i < 10; i++) {
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

  brickArray.forEach((brick, index) => {
    if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
      count++;
      //碰到了小球后砖块不可见
      brick.visible = false;
      //设定球碰到砖块反弹
      if (
        circle_y >= brick.y + radius ||
        circle_y < brick.y + brick.height + radius
      ) {
        ySpeed *= -1;
      } else if (
        circle_x >= brick.x + radius ||
        circle_x <= brick.x + brick.width + radius
      ) {
        xSpeed *= -1;
      }
      if (count == 10) {
        alert("游戏结束");
        clearInterval(game);
      }
    }
  });

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
  //设置小球上下左右边界
  if (circle_x >= canvaswidth - radius) {
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
