// A function to generate the Twitter image via the HTML Canvas API
module.exports = {

    createCanvasImage: function (deptcanvas, canvasWidth, canvasHeight) {

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

        // Set the width and height of the canvas
        deptcanvas.width = canvasWidth;
        deptcanvas.height = canvasHeight;

        // This tells the API that the canvas is 2 dimensional
        var ctx = deptcanvas.getContext('2d');

        // CANVAS VARIABLES
        // Pick a quote and colours at random
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
        console.log("First: “" + randomQuote[0] + "” Second “" + randomQuote[1] + "” Third: “" + randomQuote[2]+"” Icons: “" + randomQuote[3] + randomQuote[4] + randomQuote[5] + "”");

        var randomColors = colors[Math.floor(Math.random()*colors.length)];
        console.log("Foreground: " + randomColors[0] + " Background: " + randomColors[1] +" Text: " + randomColors[2]);


        // Background colour
        ctx.fillStyle = randomColors[1];
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add text
        ctx.textBaseline="alphabetic";
        ctx.textAlign="center";
        ctx.fillStyle = randomColors[2]

        var fontSizeRandomQuote = 50;
        var fontSizeRandomIcon = 100;
        var fontName = "Frutiger 57Cn"
        var fontIconsName = "NotoEmoji-Regular"

        ctx.font = fontSizeRandomQuote + "px '" + fontName + "'";

        // Draw first line
        ctx.fillText(randomQuote[0].toUpperCase(), (canvasWidth * 0.2), (canvasHeight * 0.8));
        // Draw second line 
        ctx.fillText(randomQuote[1].toUpperCase(), (canvasWidth * 0.5), (canvasHeight * 0.8));
        // Drawn third line
        ctx.fillText(randomQuote[2].toUpperCase(), (canvasWidth * 0.8), (canvasHeight * 0.8));

        ctx.beginPath();
        ctx.arc((canvasWidth * 0.8), (canvasHeight * 0.45), (canvasHeight * 0.2), 0, 2 * Math.PI);
        ctx.arc((canvasWidth * 0.5), (canvasHeight * 0.45), (canvasHeight * 0.2), 0, 2 * Math.PI);
        ctx.arc((canvasWidth * 0.2), (canvasHeight * 0.45), (canvasHeight * 0.2), 0, 2 * Math.PI);
        ctx.fillStyle = randomColors[0];
        ctx.fill();

        ctx.font = fontSizeRandomIcon + "px '" + fontIconsName + "'";
        ctx.fillStyle = randomColors[1];

        // Draw first symbol
        ctx.fillText(randomQuote[3], (canvasWidth * 0.2), (canvasHeight * 0.5));
        // Draw second symbol 
        ctx.fillText(randomQuote[4], (canvasWidth * 0.5), (canvasHeight * 0.5));
        // Drawn third symbol
        ctx.fillText(randomQuote[5], (canvasWidth * 0.8), (canvasHeight * 0.5));

        const buffer = deptcanvas.toBuffer('image/png');
        fs.writeFileSync('./output/output.png', buffer)
    }

}