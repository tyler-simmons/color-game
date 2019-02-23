var numSquares = 6;
var pickedColor;
var colors = [];
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//add click event listeners to mode buttons (easy, hard)
	setupModeButtons();
	//add game logic to squares
	setupSquares();
	//add click listener to reset button
	resetButton.addEventListener("click", function() {
		reset();
	});
	//color and reset ui
	reset();
}

//add click event listeners to mode buttons (easy, hard)
function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			//on click
			//reset both displays of selected class
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			//add selected class to clicked button
			this.classList.add("selected");
			//check which button, modify numSquares so reset colors 
			//squares accordingly
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

//add game logic to squares
function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of clicked squares
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

//reset ui buttons and color the correct number of squares
function reset(){
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		//if there's that many colors
		if (colors[i]){
			//make sure that all of the squares show
			squares[i].style.display = "block"
			//assign the color
			squares[i].style.background = colors[i];
		} else {
			//no color need be assigned, hide the element
			squares[i].style.display = "none";
		}
	}
	//recolor top as defautl color
	h1.style.background = "steelblue";
}



/*						
 ************************
 *	Utility functions	*
 ************************
 */

//used on win condition -> chagnes all colors to arg color
function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

//Precondition of colors array populated
//Picks one of the colors to be the "winning" color
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//used for setting color array, builds an array
//of num random colors (formatted as "rgb(#, #, #)") and returns
function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to arr
	for(var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

//builds a formatted rgb string of 3 random values for
//an rgb color (used in generateRandomColors())
function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}