// NOTE
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
// ANCHOR Show/Close DOM selectors
const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
// ANCHOR Canvas DOM selectors
const canvas = document.getElementById('canvas')
const ctx = document.getElementById('2d')
// TODO
/**
 * 1. Create canvas context
 * 2. Create and draw ball
 * 3. Create and draw paddle
 * 4. Create bricks
 * 5. Draw score
 * 6. Add update function to animate
 * 7. Function for animation frame
 * 8. Move paddle
 * 9. Keyboard event handles to move paddle
 * 10. Move ball
 * 11. Add wall boundaries
 * 12. Increase score when bricks break
 * 13. Lose - redraw bricks, reset score
 */

let score = 0               // Setting out score board to zero

const brickRowCount = 9;    // Setting 9 bricks on a row
const brickColumnCount = 5; // Setting 5 bricks on a colunm

// Create ball props
const ball = {
    x: canvas.width / 2,    // Start in the middle 
    y: canvas.height / 2,   // Start in the middle
    size: 10,               // Ball
    speed: 4,               // Animation speed prop
    dx: 4,                  // Animation direction
    dy: -4                  // Animations direction with - so it does not move down
}

// Create brick props
const brickInfo = {
    w: 70,                  // Bricks sharing the same props
    h: 20,
    padding: 10,
    offsetX: 45,            // postion on the x-axes
    offsetY: 60,            // postion ont the y-axes
    visible: true           // When hit the brick it will be removed
}

// Create bricks
const bricks = []                                                           // init bricks array
for (let i = 0; i < brickRowCount; i++) {                                   // Loop through array row
    bricks[i] = []                                                          // Set the row bricks array iteration to an empty array
    for (let j = 0; j < brickColumnCount; j++) {                            // Loop through array column
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX // i is the row iteration for each brick
        const x = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsety // We are looping and getting postion
        bricks[i][j] = { x, y, ...brickInfo }                               // Copy and paste the array 2D and give it the values of x,y with the object values
    }
}

console.log(brick)

// Draw ball on canvas - check MDN canvas drawing paths
function drawBall() {
    ctx.beginPath()                                     // Create a path
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)  // Draw an arc to build a circle
    ctx.fillStyle = '#0095dd'                           // Sytle the property
    ctx.fill()
    ctx.closePath()
}

// Drwa paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.getClientRects(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

// Draw the score board
function drawScore() {
    ctx.front = '20px Arial'
    ctx.fillText(`Scorce: ${score}`, canvas.width - 100, 30)
}

// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => { // For columns
        column.forEach(brick => {
            ctx.beginPath()
            ctx.getClientRects(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'; // This will be conditional
            ctx.fill()
            ctx.closePath()
        })
    })
}

// REVIEW Move padlle on canvas
function movePaddle() {         // Every time draw on the canvas with can re-draw with certain element
    paddle.x += paddle.dx       // Paddle will not move until we use the keyboards events
    
    // Wall detection
    if(paddle.x + paddle.w > canvas.width) {    // Entire width of the canvas
        paddle.x = canvas.width - paddle.w      // Minus the paddle width
    }

    if(paddle.x < 0) {          // 0 from the x-axes and this is for the borders detection
        paddle.x = 0
    }
}

// Move ball on canvas
function moveBall() {
    ball.x += ball.dx;          // Append the ball on x-axes
    ball.y += ball.dy;          // Append the ball on y-axes

    // Wall collisoin (right/left)
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) { // Right and left walls
        ball.dx *= -1; // Flip the balls direction so it bounces
    }

    // Wall collision (top/bottom)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1; // Flip the balls direction so it bounces
    }

    // Paddle collision
    if(
        ball.x - ball.size > paddle.x &&                // Always to in consideration the object size of ball and this check
        ball.x + ball.size < paddle.x + paddle.w &&     // checking the right side
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed; // Reverse the balls speed so it bouces 
    }
}