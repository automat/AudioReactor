function AudioHandler()
{
    this._context          = null;
    this._source           = null;
    this._nodeAnalyser     = null;
    this._nodeAnalyserData = null;

    this._ready = false;

    this.modes = ['MP3','MIC'];
    this.mode = this.modes[0];


    var context      = this._context      = new webkitAudioContext();
    /*
    var source       = this._source       = context.createBufferSource();
    var nodeGain     = this._nodeGain     = context.createGain();
    */

    var nodeAnalyser = this._nodeAnalyser = context.createAnalyser();
        nodeAnalyser.fftSize = 2048;

    this._nodeAnalyserData = new Uint8Array(nodeAnalyser.frequencyBinCount);



    if(this.mode == this.modes[1])this.loadCaptureSource();






    /*
    navigator.webkitGetUserMedia({audio:true},function(stream)
    {


        self._context = new webkitAudioContext();
        self._nodeAnalyser = self._context.createAnalyser();
        self._nodeAnalyser.fftSize = 2048;



        self._source  = self._context.createMediaStreamSource(stream);
        self._source.connect(self._nodeAnalyser);


        self._nodeAnalyserData = new Uint16Array(self._nodeAnalyser.frequencyBinCount);

        self._ready = true;

        console.log('done');



    },null);
    */




    /*

        source.connect(context.destination);
        source.connect(nodeGain);
        source.connect(nodeAnalyser);
        source.loop = true;
        */

    //FIXME
    this.magnitudeAvg = 0;
    this.magnitudeMax = 200;
}

AudioHandler.prototype.loadCaptureSource = function()
{
    this._ready = false;

    navigator.webkitGetUserMedia({audio:true},function(stream)
    {
        this._source = this._context.createMediaStreamSource(stream); //lazy
        this._source.connect(this._nodeAnalyser);
        this._ready = true;

    }.bind(this));
};



AudioHandler.prototype.loadAudioDataSource = function(data,callback)
{
    this._ready = false;

    this._context.decodeAudioData(data,function(buffer)
    {
        this._source = this._context.createBufferSource(); //lazy
        this._source.buffer = buffer;
        this._source.connect(this._context.destination);
        this._source.connect(this._nodeAnalyser);
        this._source.loop = true;
        this._source.start(0);
        this._ready = true;

        callback();

    }.bind(this));
};

AudioHandler.prototype.update = function()
{
    if(!this._ready)return;
    this._getAverageMagnitude();
};

AudioHandler.prototype._getAverageMagnitude = function()
{
   var dataAnalyser = this._nodeAnalyserData,
       dataLen      = dataAnalyser.length;

   this._nodeAnalyser.getByteFrequencyData(dataAnalyser);

    //FIXME
   var magnitudeMax = this.magnitudeMax;

   this.magnitudeAvg = 0;
   var i = -1;while(++i < dataLen){this.magnitudeAvg+=(dataAnalyser[i])/magnitudeMax;}
   this.magnitudeAvg /= dataLen;
};

AudioHandler.prototype.switchModeWithIndex = function(index)
{
    this.mode = this.modes[index];
    console.log(this.mode);

    if(this.mode = this.modes[1])this.loadCaptureSource();

};
