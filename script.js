// Reference Canvas
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

// Defining Variables
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2 
let dy = -2
const ballRadius = 10


// Move The Ball
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    x += dx
    y += dy
 // Wall Collision
    if (x + dx > canvas.width) {
        dx = -dx
    }
    if (x + dx < 0) {
        dx = -dx
    }
    if (y + dy < 0) {
        dy = -dy
    }
    if (y + dy > canvas.height) {
        dy = -dy
    }

}

setInterval(draw, 10)

