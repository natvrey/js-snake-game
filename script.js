const blockSize = 25;
let total_row = 17; //total row number
let total_col; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of columns based on screen size
function setBoardSize() {
	total_col = Math.floor(window.innerWidth / 35);
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
	setBoardSize();
	window.addEventListener("resize", setBoardSize); // Update board size on window resize
	placeFood();
	document.addEventListener("keyup", changeDirection); //for movements
	// Set snake speed
	setInterval(update, 1000 / 10);

}

function displayGameOverModal() {
	const modal = document.getElementById("game-over-modal");
	modal.style.display = "block"; // Show the modal
  
	// Add an event listener to the restart button
	const restartButton = document.getElementById("restart-button");
	restartButton.addEventListener("click", () => {
	  window.location.reload();
	});
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
	context.beginPath();
	context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
	context.fill();
	context.closePath();

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

	context.fillStyle = "red";
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
		displayGameOverModal();
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			// Snake eats own body
			gameOver = true;
			displayGameOverModal();
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
