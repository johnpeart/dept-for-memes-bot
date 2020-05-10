// Import frameworks from package.json
var 	Twit = require('twit'),
		fs = require('fs'),
		path = require('path')

const 	{ 
	registerFont, 
	createCanvas, 
	Canvas, 
	Image 
} = require('canvas')

// Import modules
config = require(path.join(__dirname, 'config.js'));
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
function createTwitterImage() {

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

	// Add text
    ctx.textBaseline="alphabetic";
    ctx.textAlign="center";
	ctx.fillStyle = randomColors[2]

    var fontSizeRandomQuote0 = 30;
    var fontSizeRandomQuote1 = 30;
    var fontSizeRandomQuote2 = 30;
    var fontSizeRandomQuote3 = 30;

    ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[0]).width < 650) {
        ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
        fontSizeRandomQuote0++;
    }

    console.log(fontSizeRandomQuote0);

    ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[1]).width < 650) {
        ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
        fontSizeRandomQuote1++;
    }

    console.log(fontSizeRandomQuote1);

    ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[2]).width < 650) {
        ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
        fontSizeRandomQuote2++;
    }

    console.log(fontSizeRandomQuote2);

    ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[3]).width < 650) {
        ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
        fontSizeRandomQuote3++;
    }

    console.log(fontSizeRandomQuote3);

    var downwardsTrianglePadding = 30;
    var downwardsTriangles = 45;

    var textBlockHeight = fontSizeRandomQuote0 + fontSizeRandomQuote1 + fontSizeRandomQuote2 + fontSizeRandomQuote3 + (2 * downwardsTriangles) + (4 * downwardsTrianglePadding) + 20;
    console.log(textBlockHeight + "px");

    // Set start drawing position for text and shapes
    var drawHeight = (canvasHeight / 2) - (textBlockHeight / 2) + fontSizeRandomQuote0;

    // Draw first line
    ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
    ctx.fillText(randomQuote[0].toUpperCase(), 600, drawHeight);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + (2 * downwardsTrianglePadding) + downwardsTriangles + fontSizeRandomQuote1;

    // Draw second line 
    ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
    ctx.fillText(randomQuote[1].toUpperCase(), 600, drawHeight - 20);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + fontSizeRandomQuote2;

    // Drawn third line
    ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
    ctx.fillText(randomQuote[2].toUpperCase(), 600, drawHeight);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + (2 * downwardsTrianglePadding) + downwardsTriangles + fontSizeRandomQuote3 + 20;

    // Draw fourth line
    ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
    ctx.fillText(randomQuote[3].toUpperCase(), 600, drawHeight);

    // Set start drawing position for text and shapes
    var drawHeight = (canvasHeight / 2) - (textBlockHeight / 2) + fontSizeRandomQuote0 + (2 * downwardsTrianglePadding) + downwardsTriangles;

    // Draw first downward triangle  (top)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo(600, drawHeight);
    ctx.lineTo(500, drawHeight - downwardsTriangles);
    ctx.lineTo(700, drawHeight - downwardsTriangles);
    ctx.fill();

    // Set start drawing position for text and shapes
    var drawHeight = drawHeight + downwardsTriangles + (2 * downwardsTrianglePadding) + fontSizeRandomQuote1 + fontSizeRandomQuote2;

    // Draw second triangle  (bottom)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo(600, drawHeight);
    ctx.lineTo(500, drawHeight - downwardsTriangles);
    ctx.lineTo(700, drawHeight - downwardsTriangles);
    ctx.fill();

}

// TWITTER AUTH
// Create a variable that holds the Twitter API credentials
var T = new Twit(config);

function sendTweet() {

	// call the function to draw the canvas
	createTwitterImage();


	// Post the tweet
	T.post('media/upload', { media_data: deptcanvas.toBuffer().toString('base64') }, function (err, data, response) {

		// Sets up references to the image and text
		var mediaIdStr = data.media_id_string
		var params = {
			media_ids: [mediaIdStr]
		}

		// Posts the tweet
		T.post('statuses/update', params, function (err, data, response) {
		    console.log(data)
		})

	})

}

sendTweet();
