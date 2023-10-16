const blockSize = 25;
let total_row = 17; //total row number
let total_col; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

 // Set the total number of columns based on screen size
 function setBoardSize() {
    total_col = Math.floor(window.innerWidth / blockSize);
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
}

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate.
let speedY = 0; //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    board = document.getElementById("game-board");
    context = board.getContext("2d");

    // Disable image smoothing to prevent font blurriness
    context.imageSmoothingEnabled = false;
    setBoardSize();
    window.addEventListener("resize", setBoardSize); // Update board size on window resize

	placeFood();
	document.addEventListener("keyup", changeDirection); //for movements
	// Set snake speed
	setInterval(update, 1000 / 10);

    // Get the canvas element and its 2D rendering context
    let title = document.getElementById('game-title');
    const ctx = title.getContext('2d');

    // Set the font style and size
    ctx.font = '2rem Arial';


    // Define the text and its colors
    let text = "nats-gateway";
    let colors = ["red", "orange", "salmon", "green", "blue", "purple"];
    let x = 75; // X-coordinate for the starting point of the text

    // Loop through the text and draw each character with a different color
    for (let i = 0; i < text.length; i++) {
        ctx.fillStyle = colors[i % colors.length]; // Cycle through the colors
        ctx.fillText(text[i], x, 20); // Y-coordinate for the text
        x += ctx.measureText(text[i]).width; // Move the starting point based on the character width
    }
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "green";
	context.fillRect(0, 0, board.width, board.height);

	// Set food color and position
	context.fillStyle = "yellow";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
	}

	// body of snake will grow
	for (let i = snakeBody.length - 1; i > 0; i--) {
		// it will store previous part of snake to the current part
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "white";
	snakeX += speedX * blockSize; //updating Snake position in X coordinate.
	snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0 
		|| snakeX > total_col * blockSize 
		|| snakeY < 0 
		|| snakeY > total_row * blockSize) { 
		
		// Out of bound condition
		gameOver = true;
		alert("Game Over");
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
			
			// Snake eats own body
			gameOver = true;
			alert("Game Over");
		}
	}
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) { 
		// If up arrow key pressed with this condition...
		// snake will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) { 
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
}

// Randomly place food
function placeFood() {

	// in x coordinates.
	foodX = Math.floor(Math.random() * total_col) * blockSize; 
	
	//in y coordinates.
	foodY = Math.floor(Math.random() * total_row) * blockSize; 
}
