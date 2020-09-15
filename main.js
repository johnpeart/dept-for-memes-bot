// Import frameworks from package.json
Twit = require('twit');
fs = require('fs');
path = require('path');

const 	{ 
	registerFont, 
	createCanvas, 
	Canvas 
//	Image 
} = require('canvas');

// Import global modules
config = require(path.join(__dirname, './config.js'));
style = require(path.join(__dirname, './styles.js'));

// Choose style (requires 'style' above)
var randomStyle = style[Math.floor(Math.random()*style.length)];
console.log("Chosen style is: “" + randomStyle + "”");

// Import style dependent modules
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
registerFont(fontFile('emoji.ttf'), { family: 'NotoEmoji-Regular' });

// Set global sizes for the canvas
var canvasWidth = 1200;
var canvasHeight = 675;

// Generate a blank canvas canvas
const 	deptcanvas = createCanvas(canvasWidth, canvasHeight)
        deptcanvas instanceof Canvas
        
// TWITTER AUTH
// Create a variable that holds the Twitter API credentials
var T = new Twit(config);

function sendTweet() {

	// call the function to draw the canvas
    canvasImage.createCanvasImage(deptcanvas, canvasWidth, canvasHeight);

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
