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
var canvasHeight = 675;

// Set the padding
var canvasPadding = 35;

var cropping = "wide"; // "wide" or "square"

if (cropping == "square") {
    // Set the padding
    var canvasPadding = 35;
    var canvasTopPadding = canvasPadding;
    var canvasBottomPadding = canvasHeight - (2 * canvasPadding);
    var canvasLeftPadding = (canvasWidth * 0.25);
    var canvasRightPadding = (canvasWidth * 0.5);
} else {
    // Set the padding
    var canvasPadding = 35;
    var canvasTopPadding = canvasPadding;
    var canvasBottomPadding = canvasHeight - (2 * canvasPadding);
    var canvasLeftPadding = canvasPadding;
    var canvasRightPadding = canvasWidth - (2 * canvasPadding);
}

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
    for (var i = 0; i < 14; i++) {

        ctx.fillStyle = randomColors[0];
        ctx.beginPath();
        ctx.moveTo((canvasWidth / 2), -500 + ((i - 1)*100));
        ctx.lineTo(-200, 300 + ((i - 1)*100));
        ctx.lineTo((canvasWidth + 200), 300 + ((i - 1)*100));
        ctx.fill();

        ctx.fillStyle = randomColors[1];
        ctx.beginPath();
        ctx.moveTo((canvasWidth / 2), -450 + ((i - 1)*100));
        ctx.lineTo(-200, 350 + ((i - 1)*100));
        ctx.lineTo((canvasWidth + 200), 350 + ((i - 1)*100));
        ctx.fill();

    }
    
	// Inner padded square
    ctx.fillStyle = randomColors[1];
    ctx.fillRect(canvasLeftPadding, canvasTopPadding, canvasRightPadding, canvasBottomPadding);

	// Add text
    ctx.textBaseline="alphabetic";
    ctx.textAlign="center";
	ctx.fillStyle = randomColors[2]

    var fontSizeRandomQuote0 = 30;
    var fontSizeRandomQuote1 = 30;
    var fontSizeRandomQuote2 = 30;
    var fontSizeRandomQuote3 = 30;

    ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[0]).width < 300) {
        ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
        fontSizeRandomQuote0++;
    }

    ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[1]).width < 300) {
        ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
        fontSizeRandomQuote1++;
    }

    ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[2]).width < 300) {
        ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
        fontSizeRandomQuote2++;
    }

    ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
    while (ctx.measureText(randomQuote[3]).width < 300) {
        ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
        fontSizeRandomQuote3++;
    }

    var downwardsTrianglePadding = 40;
    var downwardsTriangles = 30;

    var textBlockHeight = fontSizeRandomQuote0 + fontSizeRandomQuote1 + fontSizeRandomQuote2 + fontSizeRandomQuote3 + (2 * downwardsTriangles) + (4 * downwardsTrianglePadding) + 20;

    // Set start drawing position for text and shapes
    var drawHeight = (canvasHeight / 2) - (textBlockHeight / 2) + fontSizeRandomQuote0;

    // Draw first line
    ctx.font = fontSizeRandomQuote0 + "px 'Gudea'";
    ctx.fillText(randomQuote[0].toUpperCase(), (canvasWidth / 2), drawHeight);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + (2 * downwardsTrianglePadding) + downwardsTriangles + fontSizeRandomQuote1;

    // Draw second line 
    ctx.font = fontSizeRandomQuote1 + "px 'Gudea'";
    ctx.fillText(randomQuote[1].toUpperCase(), (canvasWidth / 2), drawHeight - 20);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + fontSizeRandomQuote2;

    // Drawn third line
    ctx.font = fontSizeRandomQuote2 + "px 'Gudea'";
    ctx.fillText(randomQuote[2].toUpperCase(), (canvasWidth / 2), drawHeight);

    // Update start drawing position for text and shapes
    var drawHeight = drawHeight + (2 * downwardsTrianglePadding) + downwardsTriangles + fontSizeRandomQuote3;

    // Draw fourth line
    ctx.font = fontSizeRandomQuote3 + "px 'Gudea'";
    ctx.fillText(randomQuote[3].toUpperCase(), (canvasWidth / 2), drawHeight);

    // Set start drawing position for text and shapes
    var drawHeight = (canvasHeight / 2) - (textBlockHeight / 2) + fontSizeRandomQuote0 + downwardsTrianglePadding + downwardsTriangles;

    // Draw first downward triangle  (top)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo((canvasWidth / 2), drawHeight);
    ctx.lineTo((canvasWidth / 2) - 50, drawHeight - downwardsTriangles);
    ctx.lineTo((canvasWidth / 2) + 50, drawHeight - downwardsTriangles);
    ctx.fill();

    // Set start drawing position for text and shapes
    var drawHeight = drawHeight + downwardsTriangles + (2 * downwardsTrianglePadding) + fontSizeRandomQuote1 + fontSizeRandomQuote2;

    // Draw second triangle  (bottom)
    ctx.fillStyle = randomColors[0];
    ctx.beginPath();
    ctx.moveTo((canvasWidth / 2), drawHeight);
    ctx.lineTo((canvasWidth / 2) - 50, drawHeight - downwardsTriangles);
    ctx.lineTo((canvasWidth / 2) + 50, drawHeight - downwardsTriangles);
    ctx.fill();

    ctx.scale(2,2);

}

// TWITTER AUTH
// Create a variable that holds the Twitter API credentials
var T = new Twit(config);

function sendTweet() {

	// call the function to draw the canvas
	createCanvasImage();


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
