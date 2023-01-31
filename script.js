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
const brickRowCount = 4
const brickColumnCount = 5 
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

// Create Array of Bricks
const bricks = []
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickRowCount; j++){
        bricks[i][j] = { x: 0, y: 0}
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
   

//Draw Bricks
function drawBricks() {
 for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
 // draw bricks in different spots
      const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft
      const brickY = j * (brickHeight + brickPadding) + brickOffsetTop
        bricks[i][j].x = 0
        bricks[i][j].y = 0
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#0095DD"
        ctx.fill()
        ctx.closePath()
    }
 }
}

// Draw The Ball
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}
// Draw Paddle
    function drawPaddle() {
        ctx.beginPath()
        ctx.rect(paddleX, canvas.height - paddleHeight, 
                paddleWidth, paddleHeight)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()

    }
// Move The Ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
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

const interval = setInterval(draw, 10)

