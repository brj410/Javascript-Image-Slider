;
(function() {
    'use strict';

    function Slider(parentId, imageArray) {

        var parent = document.getElementById(parentId);
        var canvas = document.createElement("canvas");
        parent.appendChild(canvas);

        var width = 960;
        var height = 400;

        //960 x 400
        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext("2d");
        var tiles = [];

        var imageObj = new Image();
        var images = imageArray;
        var currentImageIndex = 0;

        imageObj.src = images[currentImageIndex];

        var fps = 15;
        var row = 0;
        var col = 0;
        var slideInterval;

        var sWidth = width / 8;
        var sHeight = height / 4;

        var currentDrawType = 1;
        var effRan = [];

        var checkIfElementExistsInArray = function(array, element) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === element)
                    return true;
            }
            return false;
        };

        var drawRandom = function() {
            if (effRan.length === 3) {
                effRan.splice(0, 3);
            }
            var check = true;
            while (check === true) {
                currentDrawType = Math.floor((Math.random() * 3) + 1); // random 1 - 2
                if (checkIfElementExistsInArray(effRan, currentDrawType) === false) {
                    effRan.push(currentDrawType);
                    check = false;
                }
            }


        };

        var draw = function() {
            switch (currentDrawType) {
                case 1:
                    {
                        console.log(currentDrawType)
                        drawType1();
                    }
                case 2:
                    {
                        console.log(currentDrawType)
                        drawType2();
                    }
            }
        }

        var drawType1 = function() {
            var sourceX = col * 120;
            var sourceY = row * 100;
            // console.log(col,row);
            var destWidth = sWidth;
            var destHeight = sHeight;
            var destX = col * 120;
            var destY = row * 100;
            // console.log(destX,destY);           
            context.drawImage(imageObj, sourceX, sourceY, sWidth, sHeight, destX, destY, destWidth, destHeight);

            tiles.push({
                sourceX, sourceY, sWidth, sHeight
            });

            if (col < 8) {
                col = col + 1;
            }
            if (col === 8 && row < 3) {

                row = row + 1;
                col = 0;
            }
            if (col === 8 && row === 3) {
                currentImageIndex++;
                if (currentImageIndex >= images.length) {
                    currentImageIndex = 0;
                }
                imageObj.src = images[currentImageIndex];
                transition();
            }
        };

        var drawType2 = function() {
            var sourceX = col * 120;
            var sourceY = row * 100;
            // console.log(col,row);
            var destWidth = sWidth;
            var destHeight = sHeight;
            var destX = col * 120;
            var destY = row * 100;
            // console.log(destX,destY);           
            context.drawImage(imageObj, sourceX, sourceY, sWidth, sHeight, destX, destY, destWidth, destHeight);

            tiles.push({
                sourceX, sourceY, sWidth, sHeight
            });

            if (col < 8) {
                col = col + 1;
            }
            if (col === 8 && row < 3) {

                row = row + 1;
                col = 0;
            }
            if (col === 8 && row === 3) {
                currentImageIndex++;
                if (currentImageIndex >= images.length) {
                    currentImageIndex = 0;
                }
                imageObj.src = images[currentImageIndex];
                transition();
            }
        }


        var transition = function() {
            clearInterval(slideInterval);
            drawRandom();
            slideInterval = setInterval(draw, 1000 / fps);
            row = 0;
            col = 0;
            tiles = [];
            // tiles.push(imageObj);
            // console.log(tiles);
            // console.log(tiles[y]);
        }
        imageObj.onload = transition;
    }

    window.Slider = Slider;
})();