// Import frameworks from package.json
var 	fs = require('fs'),
		path = require('path')

const 	{ 
	registerFont, 
	createCanvas, 
	Canvas 
//	Image 
} = require('canvas')

// Import modules
quotes = require(path.join(__dirname, 'quotes.js'));
colors = require(path.join(__dirname, 'colors.js'));

// A function to import font files from the /assets/fonts/ folder
function fontFile(name) {
	return path.join(__dirname, '/assets/fonts/', name)
}

// Register the fonts
registerFont(fontFile('Gudea-Bold.ttf'), { family: 'Gudea' })

// CANVAS VARIABLES
// Pick a quote and colours at random
var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
console.log("First: “" + randomQuote[0] + "” Second “" + randomQuote[1] + " " + randomQuote[2]+"” Third: “" + randomQuote[3] + "”");

var randomColors = colors[Math.floor(Math.random()*colors.length)];
console.log("Background: " + randomColors[0] + " Foreground: " + randomColors[1] +" Text: " + randomColors[2]);

// Set sizes of the canvas
var canvasWidth = 1200;
var canvasHeight = 1200;

// Set the padding
var canvasPadding = 65;

// Set the size of the full canvas, minus padding on each side
var canvasWidthPadding = (canvasWidth - (canvasPadding * 2));
var canvasHeightPadding = (canvasHeight - (canvasPadding * 2));

// Generate a blank canvas canvas
const 	deptcanvas = createCanvas(canvasWidth, canvasHeight)
		deptcanvas instanceof Canvas

// A function to generate the Twitter image via the HTML Canvas API
function createCanvasImage() {

	// Set the width and height of the canvas
	deptcanvas.width = (canvasWidth);
	deptcanvas.height = (canvasHeight);

	// This tells the API that the canvas is 2 dimensional
	var ctx = deptcanvas.getContext('2d');

	// Background colour
    ctx.fillStyle = randomColors[1];
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Foreground pattern
    for (var i = 0; i < 8; i++) {

        ctx.fillStyle = randomColors[0];
        ctx.beginPath();
        ctx.moveTo(600, -200 + ((i - 1)*200));
        ctx.lineTo(-200, 500 + ((i - 1)*200));
        ctx.lineTo(1400, 500 + ((i - 1)*200));
        ctx.fill();

        ctx.fillStyle = randomColors[1];
        ctx.beginPath();
        ctx.moveTo(600, -100 + ((i - 1)*200));
        ctx.lineTo(-200, 600 + ((i - 1)*200));
        ctx.lineTo(1400, 600 + ((i - 1)*200));
        ctx.fill();

    }
    
	// Inner padded square
    ctx.fillStyle = randomColors[1];
    ctx.fillRect(canvasPadding, canvasPadding, canvasWidthPadding, canvasHeightPadding);

    // Downward triangles  (top)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo(600, 360);
    ctx.lineTo(500, 315);
    ctx.lineTo(700, 315);
    ctx.fill();

    // Downward triangles  (bottom)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo(600, 885);
    ctx.lineTo(500, 840);
    ctx.lineTo(700, 840);
    ctx.fill();

	// Add text
    ctx.textBaseline="middle";
    ctx.textAlign="center";
	ctx.fillStyle = randomColors[2]

    var fontSize = 10

    ctx.font = fontSize + "px 'Gudea'";
    while (ctx.measureText(randomQuote[0]).width < 700) {
        fontSize++;
        ctx.font = fontSize + "px 'Gudea'";
    }
    ctx.fillText(randomQuote[0].toUpperCase(), 600, 200);

    var fontSize = 10

    ctx.font = fontSize + "px 'Gudea'";
    while (ctx.measureText(randomQuote[1]).width < 700) {
        fontSize++;
        ctx.font = fontSize + "px 'Gudea'";
    }
    ctx.fillText(randomQuote[1].toUpperCase(), 600, 520);

    var fontSize = 10

    ctx.font = fontSize + "px 'Gudea'";
    while (ctx.measureText(randomQuote[2]).width < 700) {
        fontSize++;
        ctx.font = fontSize + "px 'Gudea'";
    }
    ctx.fillText(randomQuote[2].toUpperCase(), 600, 720);

    var fontSize = 10

    ctx.font = fontSize + "px 'Gudea'";
    while (ctx.measureText(randomQuote[3]).width < 700) {
        fontSize++;
        ctx.font = fontSize + "px 'Gudea'";
    }
    ctx.fillText(randomQuote[3].toUpperCase(), 600, 1000);

    const buffer = deptcanvas.toBuffer('image/png')
    fs.writeFileSync('./output/stay-alert.png', buffer)
    
}

createCanvasImage();