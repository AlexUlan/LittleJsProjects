const showRulesBtn = document.querySelector("#rules-btn");
const closeRulesBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

let score = 0;

const countcolumn = 9;
const countRow = 5;

//инициализация шарика
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//инициализация ракетки

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// инициализация кирпичика

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];

function creatBricks() {
  for (let i = 0; i < countcolumn; i++) {
    bricks[i] = [];
    for (let j = 0; j < countRow; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, ...brickInfo };
    }
  }
}

creatBricks();

// draw brick
function drawBriks() {
  bricks.forEach((row) => {
    row.forEach((columnItem) => {
      ctx.beginPath();
      ctx.rect(columnItem.x, columnItem.y, columnItem.w, columnItem.h);
      ctx.fillStyle = columnItem.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

//draw paddle

function drawPuddle() {
  ctx.beginPath();
  ctx.fillStyle = "#0095dd";
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fill();
  ctx.closePath();
}

// draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// рисуем счет
function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillText(`score:${score}`, canvas.width - 100, 30);
}

showRulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});
closeRulesBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});

function moveActionPuddle() {
  paddle.x += paddle.dx;
  if (paddle.x <= 0) {
    paddle.x = 0;
  }
  if (paddle.x + paddle.w >= canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
}

function moveActionBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // wall collision (left/right)

  if (ball.x === 0 || ball.x + ball.size > canvas.width) {
    ball.dx *= -1;
  }
  // wall collision (top/bottom)
  if (ball.y === 0 || ball.y + ball.size > canvas.height) {
    ball.dy *= -1;
  }

  //paddle colistion
  if (
    ball.x + ball.size > paddle.x &&
    ball.x < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //collistion with briks

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x + ball.size > brick.x && //left brick
          ball.x - ball.size < brick.x + brick.w && //rigth brick
          ball.y - ball.size < brick.y + brick.h && //botton brick
          ball.y + ball.size > brick.y // top brick
        ) {
          brick.visible = false;
          ball.dy *= -1;
          increateScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    score = 0;
    showAllbreacks();
  }
}

// подсчет очков
function increateScore() {
  score++;

  if (score % (countcolumn * countRow) === 0) {
    showAllbreacks();
  }
}

function showAllbreacks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

// Рисуем все
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPuddle();
  drawBall();
  drawScore();
  drawBriks();
}

//Update canvas drawing and animation
function update() {
  moveActionPuddle();
  moveActionBall();
  draw();
  //Задаем перерисование канвас при изменений обьектов
  window.requestAnimationFrame(update);
}

function movePuddle(e) {
  if (e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
  if (e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  }
}

function stopPuddle(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    paddle.dx = 0;
  }
}

document.addEventListener("keydown", movePuddle);
document.addEventListener("keyup", stopPuddle);

update();
