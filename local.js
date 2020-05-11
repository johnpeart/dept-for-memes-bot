// Import frameworks from package.json
fs = require('fs');
path = require('path');

const 	{ 
	registerFont, 
	createCanvas, 
	Canvas 
//	Image 
} = require('canvas');

// Import modules
style = require(path.join(__dirname, './styles.js'));

var randomStyle = style[Math.floor(Math.random()*style.length)];
console.log("Chosen style is: “" + randomStyle + "”");

quotes = require(path.join(__dirname, './' + randomStyle + '/quotes.js'));
colors = require(path.join(__dirname, './' + randomStyle + '/colors.js'));
canvasImage = require(path.join(__dirname, './' + randomStyle + '/canvas.js'));

// A function to import font files from the /assets/fonts/ folder
function fontFile(name) {
	return path.join(__dirname, './assets/fonts/', name)
}

// Register the fonts
registerFont(fontFile('stay-alert.ttf'), { family: 'Frutiger 57Cn' });
registerFont(fontFile('maga-sans.ttf'), { family: 'Montserrat' });
registerFont(fontFile('maga-serif.ttf'), { family: 'Prata' });

// Set global sizes for the canvas
var canvasWidth = 1200;
var canvasHeight = 675;

// Generate a blank canvas canvas
const 	deptcanvas = createCanvas(canvasWidth, canvasHeight)
		deptcanvas instanceof Canvas

// Call canvas function
canvasImage.createCanvasImage(deptcanvas, canvasWidth, canvasHeight);