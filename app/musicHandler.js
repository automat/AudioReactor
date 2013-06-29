function MusicHandler()
{
    var context      = this._context      = new webkitAudioContext();
    var source       = this._source       = context.createBufferSource();
    var nodeGain     = this._nodeGain     = context.createGain();

    var nodeAnalyser = this._nodeAnalyser = context.createAnalyser();
        nodeAnalyser.fftSize = 2048;

    this._dataAnalyser = new Uint8Array(nodeAnalyser.frequencyBinCount);
    this._fftSmoothing = 0.85;

    this._buffer    = null;
    this._volume    = 0.5;
    this._volMinMax = [0,1];

    source.connect(context.destination);
    source.connect(nodeGain);
    source.connect(nodeAnalyser);
    source.loop = true;

    //FIXME
    this.magnitudeAvg = 0;
    this.magnitudeMax = 200;

}

MusicHandler.prototype.loadAudioData = function(data,callback)
{
    this._context.decodeAudioData(data,function(buffer)
    {
        this._source.buffer = this._buffer = buffer;
        callback();

    }.bind(this));
};

MusicHandler.prototype.update = function()
{
    this._getAverageMagnitude();
};

MusicHandler.prototype._getAverageMagnitude = function()
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

MusicHandler.prototype.play      = function(){this._source.start(0);};
MusicHandler.prototype.stop      = function(){this._source.stop(0);}
MusicHandler.prototype.setVolume = function(val){this._nodeGain.gain.value = val;};