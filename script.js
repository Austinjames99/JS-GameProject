// Reference Canvas
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

// Defining Variables
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2 
let dy = -2
const ballRadius = 10
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
     // brick variables 
const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30
let score = 0


// Create Array of Bricks (Nested loop for Rows & Columns)
const bricks = []
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowCount; j++){
        bricks[i][j] = { x: 0, y: 0, status: 1}
    }
}



// Figure Out if keys are being pressed
document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

// Figure out when keys are released 
function keyDownHandler(e){
    if (e.key === 'Right' || e.key === "ArrowRight") {
       rightPressed = true
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
       leftPressed = true
    }
 }
   
   
function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === "ArrowRight") {
        rightPressed = false
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
    }
 }

  // Brick Collision
  function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
        const b = bricks[i][j]
        if (b.status === 1){
            if (
                x > b.x &&
                x < b.x + brickWidth &&
                y > b.y &&
                y < b.y + brickHeight
            ) {
            dy = -dy
            b.status = 0
            score++
            if (score === brickRowCount * brickColumnCount){
                alert("YOU WIN, CONGRATULATIONS!")
                document.location.reload()
                clearInterval(interval)
            }
          }
       }
    }
}
}
  
//color scheme randomizer
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
var color = random_rgba()
// Draw The Ball
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}
// Draw Paddle
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, 
            paddleWidth, paddleHeight)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()

}


//Draw Bricks
function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
       for (let j = 0; j < brickRowCount; j++) {
           if(bricks[i][j].status == 1){
    // draw bricks in different spots
         const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft
         const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop
           bricks[i][j].x = brickX
           bricks[i][j].y = brickY
           ctx.beginPath()
           ctx.rect(brickX, brickY, brickWidth, brickHeight)
           ctx.fillStyle = color
           ctx.fill()
           ctx.closePath()
       }
    }
   }
}
// Scoreboard
function drawScore() {
    ctx.font = "16px Arial"
    ctx.fillstyle = color
    ctx.fillText(`Score: ${score}`, 8, 20)
}

   
// Game Start
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
    drawScore()
    collisionDetection()
 // Wall Collision
    if (x + dx > canvas.width - ballRadius) {
        dx = -dx
    }
    if (x + dx < ballRadius) {
        dx = -dx
    }
    if (y + dy < ballRadius) {
        dy = -dy
        // Paddle hitbox
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy
        // game over screen
      } else {
        alert("GAME OVER")
        document.location.reload()
        clearInterval(interval)
      }
    }


    // Paddle Speed
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0)
    }

    x += dx
    y += dy
}
// Game update speed
const interval = setInterval(draw, 10)

