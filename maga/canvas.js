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
        console.log("Quote: “" + randomQuote[0] + " " + randomQuote[1] + " " + randomQuote[2] + "”");

        var randomColors = colors[Math.floor(Math.random()*colors.length)];
        console.log("Colours: " + randomColors[0] + ", " + randomColors[1] +", " + randomColors[2]);

        // Background colour
        ctx.fillStyle = randomColors[0];
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.beginPath();
        ctx.strokeStyle = randomColors[1];
        ctx.lineWidth = "5";
        ctx.rect(canvasLeftPadding, canvasTopPadding, canvasRightPadding, canvasBottomPadding);
        ctx.stroke();

        // Star-background colour
        ctx.fillStyle = randomColors[0];
        ctx.fillRect((canvasWidth / 2) - 130, 0, 260, canvasHeight);

        // Add text
        ctx.textBaseline="alphabetic";
        ctx.textAlign="center";
        ctx.fillStyle = randomColors[2]

        var fontSizeRandomQuoteSansSerif = 60;
        var fontSizeRandomQuoteSerif = 30;

        var fontNameSansSerif = "Montserrat"
        var fontNameSerif = "Prata"

        ctx.font = fontSizeRandomQuoteSansSerif + "px '" + fontNameSansSerif + "'";

        ctx.font = fontSizeRandomQuoteSerif + "px '" + fontNameSerif + "'";
        while (ctx.measureText(randomQuote[1]).width < 600) {
            ctx.font = fontSizeRandomQuoteSerif + "px '" + fontNameSerif + "'";
            fontSizeRandomQuoteSerif++;
        }

        var textBlockHeight = (2 * fontSizeRandomQuoteSansSerif) + fontSizeRandomQuoteSerif;

        // Function to create stars
        function strokeStar(x, y, r, n, inset) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.moveTo(0,0-r);
            for (var i = 0; i < n; i++) {
                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - (r*inset));
                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        strokeStar((canvasWidth / 2), canvasTopPadding, 8, 5, 2);
        strokeStar((canvasWidth / 2) - 50, canvasTopPadding, 8, 5, 2);
        strokeStar((canvasWidth / 2) - 100, canvasTopPadding, 8, 5, 2);
        strokeStar((canvasWidth / 2) + 50, canvasTopPadding, 8, 5, 2);
        strokeStar((canvasWidth / 2) + 100, canvasTopPadding, 8, 5, 2);

        strokeStar((canvasWidth / 2), canvasBottomPadding + 32, 8, 5, 2);
        strokeStar((canvasWidth / 2) - 50, canvasBottomPadding + 32, 8, 5, 2);
        strokeStar((canvasWidth / 2) - 100, canvasBottomPadding + 32, 8, 5, 2);
        strokeStar((canvasWidth / 2) + 50, canvasBottomPadding + 32, 8, 5, 2);
        strokeStar((canvasWidth / 2) + 100, canvasBottomPadding + 32, 8, 5, 2);

        // Set start drawing position for text and shapes
        var drawHeight = (canvasHeight / 2) - (textBlockHeight / 2) + (fontSizeRandomQuoteSansSerif / 4);

        ctx.fillStyle = randomColors[1]
        // Draw first line
        ctx.font = fontSizeRandomQuoteSansSerif + "px '" + fontNameSansSerif + "'";
        ctx.fillText(randomQuote[0].toUpperCase(), (canvasWidth / 2), drawHeight);

        // Set start drawing position for text and shapes
        var drawHeight = drawHeight + fontSizeRandomQuoteSerif + (fontSizeRandomQuoteSansSerif / 3);

        // Draw first line
        ctx.font = fontSizeRandomQuoteSerif + "px '" + fontNameSerif + "'";
        ctx.fillText(randomQuote[1].toUpperCase(), (canvasWidth / 2), drawHeight);

        // Set start drawing position for text and shapes
        var drawHeight = drawHeight + fontSizeRandomQuoteSansSerif + (fontSizeRandomQuoteSansSerif / 2);

        // Draw first line
        ctx.font = fontSizeRandomQuoteSansSerif + "px '" + fontNameSansSerif + "'";
        ctx.fillText(randomQuote[2].toUpperCase(), (canvasWidth / 2), drawHeight);

        const buffer = deptcanvas.toBuffer('image/png');
        fs.writeFileSync('./output/output.png', buffer)
    }

}