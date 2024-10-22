const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score-display');
const highScoresList = document.getElementById('high-scores-list');

const gridSize = 20;
const tileCount = 20;
const tileSize = canvas.width / tileCount;

let snake, food, dx, dy, score, gameInterval;
let highScores = [];

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

function startGame() {
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    food = getRandomFoodPosition();
    dx = 1;
    dy = 0;
    score = 0;
    updateScoreDisplay();
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
    
    startButton.disabled = true;
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    }
}

function gameLoop() {
    if (hasGameEnded()) {
        endGame();
        return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > tileCount - 1;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > tileCount - 1;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function endGame() {
    clearInterval(gameInterval);
    updateHighScores();
    startButton.disabled = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
        score++;
        updateScoreDisplay();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateHighScores() {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    
    highScoresList.innerHTML = '';
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = score;
        highScoresList.appendChild(li);
    });
}

clearCanvas();
