chrome.app.runtime.onLaunched.addListener(function() {

    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width  = 1024;
    var height =  768;

    chrome.app.window.create('index.html', {
        bounds: {
            width: width,
            height: height,
            left: screenWidth,
            top: 0
        }
    });
});