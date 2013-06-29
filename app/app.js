window.onload = function()
{
    var sampleUrl = chrome.runtime.getURL('app/resource/sample.mp3');
    var sandbox   = document.getElementById('sandbox');

    var request = new XMLHttpRequest();
        request.overrideMimeType('application/octet-stream');
        request.open('GET',sampleUrl,true);
        request.responseType = 'arraybuffer';
        request.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                var response = this.response;
                if(response){sandbox.contentWindow.postMessage({type:'INIT',audioData:response},'*');}
            }
        };

        request.send();
};

window.addEventListener('message',function(event)
{
    if(event.data.type != 'LOAD')return;

    chrome.fileSystem.chooseEntry(
        {
            type: 'openFile', accepts:[{
            extensions: ['mp3']
        }]
        },
        function(fileEntry)
        {

        });

});