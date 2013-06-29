
(function(){

    var fsOptions = {type:'openFile',accepts:[{extensions:['mp3']}]};

    var sandbox;

    window.onload = function (){sandbox = document.getElementById('sandbox');postMessage({type:'INIT'});};
    window.addEventListener('message', function (event)
    {
        switch(event.data.type)
        {
            case 'LOAD':

                chrome.fileSystem.chooseEntry(fsOptions,function (fileEntry)
                {
                    if (fileEntry){fileEntry.file(function(file)
                    {
                        var reader = new FileReader();
                        reader.onload = function(e)
                        {
                            postMessage({type: 'FILE_LOADED', fileName:fileEntry.name, audioData: e.target.result});
                        };

                        reader.readAsArrayBuffer(file);


                    })}
                    else postMessage({type: 'NO_FILE_LOADED'});
                });

                break;

            case 'ENTER_FULLSCREEN':

                sandbox.webkitRequestFullScreen();

                break;

            case 'EXIT_FULLSCREEN' :

                document.webkitCancelFullScreen();

                break;
        }
    });

    function postMessage(msg){sandbox.contentWindow.postMessage(msg,'*');}

}());