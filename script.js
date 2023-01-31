// Reference Canvas
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

// Defining Variables
let x = canvas.width / 2
let y = canvas.height - 30


// Move The Ball
function draw(){
    ctx.beginPath()
    ctx.arc(50, 50, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()

}
setInterval(draw, 10)

