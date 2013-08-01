chrome.app.runtime.onLaunched.addListener(function() {

    var width  = 1024,
        height =  768;

    chrome.app.window.create('index.html', {
        bounds: {
            width:  screen.availWidth,
            height:  screen.availHeight,
            left: 1280  + width*0.5,
            top:  screen.availHeight * 0.5 - height*0.5
        }
    });
});