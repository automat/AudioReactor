(function(){

    window.Float32Array = window.Float32Array || window.Array;

    var audioGrapher,
        audioHandler;

    var parent;

    var loaderPop   = document.createElement('div'),
        loaderFrame = document.createElement('div'),
        loaderInner = document.createElement('div');

        loaderPop.id   = 'loaderPop';
        loaderFrame.id = 'loaderFrame';
        loaderInner.id = 'loaderInner';

        loaderInner.innerHTML = 'Loading Audio Data ...';

        loaderFrame.appendChild(loaderInner);
        loaderPop.appendChild(loaderFrame);

    /*---------------------------------------------------------------------------------*/


    window.onload = function()
    {

        audioGrapher = new AudioGrapher(document.getElementById('musicGrapher'));
        audioHandler = new AudioHandler();

        /*---------------------------------------------------------------------------------*/

        var updateParametricFunc0 = audioGrapher.updateParametricFunction0.bind(audioGrapher),
            updateParametricFunc1 = audioGrapher.updateParametricFunction1.bind(audioGrapher);

        var resetFuncTarget0Translate = function ()
            {
                audioGrapher.functionXTarget0TranslateString = '0';
                audioGrapher.functionYTarget0TranslateString = '0';
                audioGrapher.functionZTarget0TranslateString = '0';
            },
            resetFuncTarget1Translate = function ()
            {
                audioGrapher.functionXTarget1TranslateString = '0';
                audioGrapher.functionYTarget1TranslateString = '0';
                audioGrapher.functionZTarget1TranslateString = '0';
            };

        var resetFuncTarget0Scale = function ()
            {
                audioGrapher.functionXTarget0ScaleString = '1';
                audioGrapher.functionYTarget0ScaleString = '1';
                audioGrapher.functionZTarget0ScaleString = '1';
            },
            resetFuncTarget1Scale = function ()
            {
                audioGrapher.functionXTarget1ScaleString = '1';
                audioGrapher.functionYTarget1ScaleString = '1';
                audioGrapher.functionZTarget1ScaleString = '1';
            };

        var controlKit = new ControlKit.Kit();

        var panel = controlKit.addPanel({width: 200, align: 'right', label: 'Settings Object'});
        var group = panel.addGroup({label: 'GL Object'});
        group.addSubGroup({label: 'General'})
            .addCheckbox(   audioGrapher, 'geomRender',   {label: 'render'})
            .addCheckbox(   audioGrapher, 'normalRender', {label: 'Normals'})
            .addCheckbox(   audioGrapher, 'uvMaterial',   {label: 'UV Material'})
            .addSubGroup({label: 'Parametric Base'})
            .addSelect(     audioGrapher, 'presetTarget',           {label: 'Preset f0(x)', onChange: function(index){audioGrapher.applyParametricPresetTarget0(index);}})
            .addStringInput(audioGrapher, 'functionXTarget0String', {label: 'f0(x)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionYTarget0String', {label: 'f0(y)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionZTarget0String', {label: 'f0(z)', onChange: updateParametricFunc0})
            .addRange(      audioGrapher, 'uRangeTarget0',          {label: 'f0 R U'})
            .addRange(      audioGrapher, 'vRangeTarget0',          {label: 'f0 R V'})
            .addSelect(     audioGrapher, 'presetTarget',           {label: 'Preset f1(x)', onChange: function(index){audioGrapher.applyParametricPresetTarget1(index);}})
            .addStringInput(audioGrapher, 'functionXTarget1String', {label: 'f1(x)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionYTarget1String', {label: 'f1(y)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionZTarget1String', {label: 'f1(z)', onChange: updateParametricFunc1})
            .addRange(      audioGrapher, 'uRangeTarget1',          {label: 'f1 R U'})
            .addRange(      audioGrapher, 'vRangeTarget1',          {label: 'f1 R V'})
            .addSlider(     audioGrapher, 'geomTarget0Target1Intrpl', 'geomTarget0Target1IntrplMinMax', {label: 'f0 -> f1'})
            .addSubGroup({label: 'Translation'})
            .addStringInput(audioGrapher, 'functionXTarget0TranslateString', {label: 'f0(x)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionYTarget0TranslateString', {label: 'f0(y)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionZTarget0TranslateString', {label: 'f0(z)', onChange: updateParametricFunc0})
            .addButton('reset', resetFuncTarget0Translate)
            .addStringInput(audioGrapher, 'functionXTarget1TranslateString', {label: 'f1(x)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionYTarget1TranslateString', {label: 'f1(y)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionZTarget1TranslateString', {label: 'f1(z)', onChange: updateParametricFunc1})
            .addButton('reset', resetFuncTarget1Translate)
            .addSubGroup({label: 'Scale'})
            .addStringInput(audioGrapher, 'functionXTarget0ScaleString', {label: 'f0(x)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionYTarget0ScaleString', {label: 'f0(y)', onChange: updateParametricFunc0})
            .addStringInput(audioGrapher, 'functionZTarget0ScaleString', {label: 'f0(z)', onChange: updateParametricFunc0})
            .addButton('reset', resetFuncTarget0Scale)
            .addStringInput(audioGrapher, 'functionXTarget1ScaleString', {label: 'f1(x)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionYTarget1ScaleString', {label: 'f1(y)', onChange: updateParametricFunc1})
            .addStringInput(audioGrapher, 'functionZTarget1ScaleString', {label: 'f1(z)', onChange: updateParametricFunc1})
            .addButton('reset', resetFuncTarget1Scale);

        panel = controlKit.addPanel({width: 220, align: 'left', label: 'Settings GL'});
        group = panel.addGroup({label: 'GL Environment', enable: false});
        group.addSubGroup({label: 'Grid & Background', enable: false})
            .addColor(      audioGrapher, 'colorBg',      {label: 'Bg', colorMode: 'rgbfv'})
            .addCheckbox(   audioGrapher, 'enableGrid',   {label: 'Grid'})
            .addNumberInput(audioGrapher, 'gridSize',     {label: 'Size'})
            .addColor(      audioGrapher, 'gridColor',    {label: 'Color', colorMode: 'rgbfv'})
            .addNumberInput(audioGrapher, 'gridAlpha',    {label: 'Alpha'})
            .addSubGroup({label: 'Light', enable: false})
            .addCheckbox(   audioGrapher, 'lightEnabled', {label: 'enable', onChange: function(){if(audioGrapher.lightEnabled)audioGrapher._enableLighting();
            else audioGrapher._disableLighting();}})
            .addColor(      audioGrapher, 'lightColorAmbient',  {label: 'Ambient',   colorMode: 'rgbfv'})
            .addColor(      audioGrapher, 'lightColorDiffuse',  {label: 'Diffuse',   colorMode: 'rgbfv'})
            .addColor(      audioGrapher, 'lightColorSpecular', {label: 'Specular',  colorMode: 'rgbfv'})
            .addNumberInput(audioGrapher, 'lightShininess',     {label: 'Shininess', step: 0.1})
            .addSubGroup({label: 'Camera'})
            .addCheckbox(   audioGrapher, 'cameraAutoRotate',               {label: 'auto'})
            .addNumberInput(audioGrapher, 'cameraLocX',                     {label: 'X'})
            .addNumberInput(audioGrapher, 'cameraLocY',                     {label: 'Y'})
            .addNumberInput(audioGrapher, 'cameraLocZ',                     {label: 'Z'})
            .addSlider(     audioGrapher, 'cameraZoom', 'cameraZoomMinMax', {label: 'Zoom'})
            .addRange(      audioGrapher, 'cameraZoomMinMax',               {label: ' '});

        panel = controlKit.addPanel({width: 200, align: 'right', label: 'Settings Audio'});
        group = panel.addGroup({label:'Audio Control'});
        group.addSubGroup({label:'File'})
            .addButton('Load mp3',function(){parent.postMessage({type:'LOAD'},'*')},{label:'none'})
            .addButton('play',audioHandler.play.bind(audioHandler),{label:'none'})
            .addButton('stop',audioHandler.stop.bind(audioHandler),{label:'none'})
            .addSlider(audioHandler,'volume','volMinMax',{onChange:function(){audioHandler.updateVolume()}})
            .addSubGroup({label:'Magnitude'})
            .addValuePlotter(audioHandler,'magnitudeAvg',{label:'Avg',height:150})
            .addNumberInput( audioHandler,'magnitudeMax',{label:'Norm Val'});


        /*---------------------------------------------------------------------------------*/

        function loop()
        {
            webkitRequestAnimationFrame(loop);
            controlKit.update();
            audioGrapher.setMagnitudeAvg(audioHandler.magnitudeAvg);
            audioGrapher.update();
            audioHandler.update();
        }

        loop();

    };

    window.addEventListener('message',function(event)
    {
        var eventType   = event.data.type;
        parent = event.source;

        switch(eventType)
        {
            case 'FILE_LOADED':
            {
                document.body.appendChild(loaderPop);
                audioHandler.loadAudioData(event.data.audioData,function(){document.body.removeChild(loaderPop)});

            }
                break;

            case 'NO_FILE_LOADED' :
            {

            }
                break;


        }
    });

}());


