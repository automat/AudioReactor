function AudioHandler()
{
    this._context      = null;
    this._source       = null;
    this._nodeGain     = null;
    this._nodeAnalyser = null;
    this._dataAnalyser = null;

    this._ready = false;


    var context      = this._context      = new webkitAudioContext();
    var source       = this._source       = context.createBufferSource();
    var nodeGain     = this._nodeGain     = context.createGain();

    var nodeAnalyser = this._nodeAnalyser = context.createAnalyser();
        nodeAnalyser.fftSize = 2048;


    var self = this;





    /*
    navigator.webkitGetUserMedia({audio:true},function(stream)
    {


        self._context = new webkitAudioContext();
        self._nodeAnalyser = self._context.createAnalyser();
        self._nodeAnalyser.fftSize = 2048;



        self._source  = self._context.createMediaStreamSource(stream);
        self._source.connect(self._nodeAnalyser);


        self._dataAnalyser = new Uint16Array(self._nodeAnalyser.frequencyBinCount);

        self._ready = true;

        console.log('done');



    },null);
    */




    this._dataAnalyser = new Uint8Array(nodeAnalyser.frequencyBinCount);

        source.connect(context.destination);
        source.connect(nodeGain);
        source.connect(nodeAnalyser);
        source.loop = true;

    //FIXME
    this.magnitudeAvg = 0;
    this.magnitudeMax = 200;
}



AudioHandler.prototype.loadAudioData = function(data,callback)
{
    this._context.decodeAudioData(data,function(buffer)
    {
        this._source.buffer = buffer;
        this._source.start(0);
        callback();

    }.bind(this));
};

AudioHandler.prototype.update = function()
{
    this._getAverageMagnitude();
};

AudioHandler.prototype._getAverageMagnitude = function()
{


    var dataAnalyser = this._dataAnalyser,
        dataLen      = dataAnalyser.length;

    this._nodeAnalyser.getByteFrequencyData(dataAnalyser);



    //FIXME
    var magnitudeMax = this.magnitudeMax;

    this.magnitudeAvg = 0;
    var i = -1;while(++i < dataLen){this.magnitudeAvg+=(dataAnalyser[i])/magnitudeMax;}
    this.magnitudeAvg /= dataLen;

};
