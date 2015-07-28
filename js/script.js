;(function() {
    "use strict";

    function Animation() {
        var type;
        var imageObj;
        var row;
        var col;
        var context;
        var callback;
        var intervalLoop;
        var fps = 150;
        var sw;
        var sh;
        this.init = function(type1, rowValue, colValue, width, height, context1, imageObj1, callback1) {
            type = type1;
            row = rowValue;
            col = colValue;
            context = context1;
            imageObj = imageObj1;
            callback = callback1;
            sw = width;
            sh = height;
            intervalLoop = setInterval(updateAnimation, 10000 / fps);
        };
        var updateAnimation = function() {
            var swidth;
            var sheight;
            var dwidth;
            var dheight;

            this.draw = function(swidth, sheight, dwidth, dheight) {
                var sourceX = col * swidth;
                var sourceY = row * sheight;
                var destX = col * dwidth;
                var destY = row * dheight;
                context.drawImage(imageObj, sourceX, sourceY, swidth, sheight, destX, destY, dwidth, dheight);
            };

            if (type === 1) {
                swidth = sw / 5;
                sheight = sh / 5;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (col < 5) {
                    col = col + 1;
                }
                if (col === 5 && row < 5) {
                    row = row + 1;
                    col = 0;
                }
            }
            if (type === 2) {
                swidth = sw / 5;
                sheight = sh / 5;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (row < 5) {
                    row = row + 1;
                }
                if (row === 5 && col < 5) {
                    col = col + 1;
                    row = 0;
                }
            }
            if (type === 3) {
                swidth = sw / 5;
                sheight = sh / 5;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (row >= 0 && col < 5) {
                    col = col + 1;
                    if (col === 5 && row > 0) {
                        row = row - 1;
                        col = 0;
                    }
                }
            }
            if (type === 4) {
                swidth = sw / 5;
                sheight = sh / 5;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (col >= 0 || col === 5) {
                    col = col - 1;
                }
                if (col < 0 && row > 0) {
                    row = row - 1;
                    col = 5;
                }
            }
            if (type === 5) {
                swidth = sw / 10;
                sheight = sh;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (col <= 16) {
                    col = col + 1;
                }
            }
            if (type === 6) {
                swidth = sw;
                sheight = sh / 10;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (row <= 10) {
                    row = row + 1;
                }
            }
            if (type === 7) {
                swidth = sw / 10;
                sheight = sh;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (col >= 0) {
                    col = col - 1;
                }
            }
            if (type === 8) {
                swidth = sw;
                sheight = sh / 10;
                dwidth = swidth;
                dheight = sheight;
                draw(swidth, sheight, dwidth, dheight);
                if (row >= 0) {
                    row = row - 1;
                }
            }

            if (type === 1) {
                if (col === 5 && row === 5) {
                    clearInterval(intervalLoop);
                    console.log('Effect 1');
                    setTimeout(callback, 800);
                }
            }
            if (type === 2) {
                if (col === 5 && row === 5) {
                    clearInterval(intervalLoop);
                    console.log('Effect 2');
                    setTimeout(callback, 600);
                }
            }
            if (type === 3) {
                if (col === 5 && row === 0) {
                    clearInterval(intervalLoop);
                    console.log('Effect 3');
                    setTimeout(callback, 600);
                }
            }
            if (type === 4) {
                if (col < 0 && row === 0) {
                    clearInterval(intervalLoop);
                    console.log('Effect 4');
                    setTimeout(callback, 600);
                }
            }
            if (type === 5) {
                if (col === 16) {
                    clearInterval(intervalLoop);
                    console.log('Effect 5');
                    setTimeout(callback, 600);
                }
            }
            if (type === 6) {
                if (row === 10) {
                    clearInterval(intervalLoop);
                    console.log('Effect 6');
                    setTimeout(callback, 600);
                }
            }
            if (type === 7) {
                if (col < 0) {
                    clearInterval(intervalLoop);
                    console.log('Effect 7');
                    setTimeout(callback, 600);
                }
            }
            if (type === 8) {
                if (row < 0) {
                    clearInterval(intervalLoop);
                    console.log('Effect 8');
                    setTimeout(callback, 600);
                }
            }
        };
    }

    function Slider(options) {
        var className = 'slider';

        if (options && options.className) {
            className = options.className;
        }
        var animation = new Animation();
        var imageArray = [];
        var imgArr = [];
        var indexArr = [];
        var captionArray = [];
        var capArr = [];
        var effArr = [];
        var currentImageIndex = 0;
        var currentPos = 0;
        var viewDuration = 2000;
        var nextAnimation;
        var animationStarted = false;
        

        var parent = document.getElementsByClassName(className)[0];
        var slideHolder = parent.children[0];
        var slides = parent.children[0].children;
        var indexWrap = parent.children[4];
        var captionWrap = document.getElementById('captionbar');

        indexWrap.style.bottom = '0px';
        indexWrap.style.padding = '10px';

        /*Extraction of image source and captions*/
        for (var i = 0; i < slides.length; i++) {
            imageArray.push(slides[i]);
            imgArr.push(slides[i].children[0]);
            captionArray.push(slides[i].children[1]);
            capArr.push(captionArray[i].innerHTML);

        }
        var width = imgArr[currentImageIndex].width;
        var height = imgArr[currentImageIndex].height;
        // console.log(width, height);
        parent.style.width = width + 'px';
        parent.style.height = height + 'px';

        slideHolder.style.width = width + 'px';
        slideHolder.style.height = height + 'px';

        var btnLeft = parent.children[1];
        btnLeft.style.position = 'absolute';
        btnLeft.style.width = 60 + 'px';
        btnLeft.style.height = 60 + 'px';
        btnLeft.style.left = '0px';
        btnLeft.style.top = ((height - 60) / 2) + 'px';
        btnLeft.style.zIndex = 2;

        var btnRight = parent.children[2];
        btnRight.style.position = 'absolute';
        btnRight.style.width = 60 + 'px';
        btnRight.style.height = 60 + 'px';
        btnRight.style.right = '0px';
        btnRight.style.top = ((height - 60) / 2) + 'px';
        btnRight.style.zIndex = 1;
        parent.appendChild(btnLeft);
        parent.appendChild(btnRight);

        captionWrap.style.width = ((width / 5) - 20) + 'px';
        captionWrap.style.minHeight = (height) + 'px';
        captionWrap.style.paddingTop =(height/3) + 'px';
        captionWrap.style.left = 0 + 'px';

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        parent.appendChild(canvas);

        var inQueue = false;
        btnLeft.onclick = function() {
            if (!inQueue) {
                inQueue = true;
                console.log(currentImageIndex);
                if (currentImageIndex === 0) {
                    currentImageIndex = imageArray.length - 1;
                } else {
                    currentImageIndex--;
                }
                // console.log(currentImageIndex);
                if (!animationStarted) {
                    clearInterval(nextAnimation);
                    startAnimation();
                }
            }
            console.log('left button clicked');
            updateIndex();
        };
        btnRight.onclick = function() {
            if (!inQueue) {
                inQueue = true;
                if (currentImageIndex === (imageArray.length - 1)) {
                    currentImageIndex = 0;
                } else {
                    currentImageIndex++;
                }
                if (!animationStarted) {
                    clearInterval(nextAnimation);
                    startAnimation();

                }
            }
            console.log('right button clicked');
            updateIndex();
        };
        var index = function() {
            for (var i = 1; i <= imageArray.length; i++) {
                var indexIcon = document.createElement('div');
                indexIcon.className = 'index' + i;
                indexIcon.id = 'index';
                indexIcon.style.width = '20px';
                indexIcon.style.height = '20px';
                indexIcon.style.float = 'left';

                if (i <= imageArray.length - 1) {
                    indexIcon.style.marginRight = '5px';
                }
                indexIcon.style.background = 'url(images/circle-default.png)';

                indexIcon.onclick = (function(i) {
                    var curIndx = i;
                    return function() {

                        if (!inQueue) {
                            inQueue = true;
                            currentImageIndex = i - 1;
                        }
                        console.log(currentImageIndex);
                        if (!animationStarted) {
                            clearInterval(nextAnimation);
                            startAnimation();

                        }
                        updateIndex();
                    };

                })(i);

                indexIcon.onmouseenter = (function() {
                    var curIndx = i;
                    return function() {
                        if (curIndx - 1 != currentImageIndex) {
                            indexArr[curIndx - 1].style.background = 'url(images/circle-select.png)';
                            indexArr[curIndx - 1].style.opacity = 0.7;
                        }
                    }
                })();
                indexIcon.onmouseleave = (function() {
                    var curIndx = i;
                    return function() {
                        if (curIndx - 1 != currentImageIndex) {
                            indexArr[curIndx - 1].style.background = 'url(images/circle-default.png)';
                            indexArr[curIndx - 1].style.opacity = 0.5;
                        }
                    }
                })();
                indexArr.push(indexIcon);
                indexWrap.appendChild(indexIcon);
            }
            var indexWidth = indexWrap.offsetWidth;
            indexWrap.style.right = '0px';
            // indexWrap.style.marginLeft = (canvas.width - indexWidth - 5) / 2 + 'px';
        };
        var updateIndex = function() {
            for (var j = 0; j <= indexArr.length - 1; j++) {
                if (j != currentImageIndex) {
                    indexArr[j].style.background = 'url(images/circle-default.png)';
                    indexArr[j].style.opacity = '0.5';
                } else {
                    indexArr[j].style.background = 'url(images/circle-select.png)';
                    indexArr[j].style.opacity = '1';
                }
            }
        };
         var startAnimation = function() {
            if (inQueue) {
                inQueue = false;
            } else {
                currentImageIndex++;
                if (currentImageIndex >= imageArray.length) {
                    currentImageIndex = 0;
                }
            }
            captionWrap.innerHTML = capArr[currentImageIndex];
            
            var imageObj = new Image();
            var rowValue;
            var colValue;
            var effRan=[];
            imageObj.src = imgArr[currentImageIndex].getAttribute('src');

           
            var checkIfElementExistsinArray = function(array, element) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === element) {
                        return true;
                    }
                }
                return false;
            };
            var check = true;
            do {
                var type = Math.floor((Math.random() * 8) + 1);
                if (checkIfElementExistsinArray(effRan, type) === false) {
                    effRan.push(type);
                    check = false;
                }
            } while (check === true);

        
            if (type === 1 || type === 2 || type === 5 || type === 6) {
                rowValue = 0;
                colValue = 0;
            }

            if (type === 3) {
                rowValue = 5;
                colValue = 0;
            }

            if (type === 4) {
                rowValue = 5;
                colValue = 5;
            }
            if (type === 7) {
                rowValue = 0;
                colValue = 16;
            }
            if (type === 8) {
                rowValue = 10;
                colValue = 0;
            }

            animation.init(type, rowValue, colValue, width, height, context, imageObj, function() {
                animationStarted = false;
                if (inQueue) {
                    startAnimation();
                    inQueue = false;
                } else {
                    nextAnimation = setTimeout(startAnimation, viewDuration);
                }
            });
            animationStarted = true;
            updateIndex();
        };
        index();
        updateIndex();
        startAnimation();
    }
    window.Slider = Slider;
    //window.Slider = Slider1;
    

})();