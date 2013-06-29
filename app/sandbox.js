
window.Float32Array = window.Float32Array || window.Array;

var reactor = {musicGrapher:null,musicHandler:null};

window.addEventListener('message',function(event)
{
    var eventType   = event.data.type;

    var loaderPop = document.getElementById('loaderPop');

    switch(eventType)
    {
        case 'INIT':
        {
            /*---------------------------------------------------------------------------------*/

            reactor.musicGrapher = new MusicGrapher(document.getElementById('musicGrapher'));
            reactor.musicHandler = new MusicHandler();

            var musicGrapher = reactor.musicGrapher,
                musicHandler = reactor.musicHandler;

            reactor.musicHandler.loadAudioData(event.data.audioData,function()
            {
                loaderPop.parentNode.removeChild(loaderPop);



                /*---------------------------------------------------------------------------------*/

                var updateParametricFunc0 = musicGrapher.updateParametricFunction0.bind(musicGrapher),
                    updateParametricFunc1 = musicGrapher.updateParametricFunction1.bind(musicGrapher);

                var resetFuncTarget0Translate = function ()
                    {
                        musicGrapher.functionXTarget0TranslateString = '0';
                        musicGrapher.functionYTarget0TranslateString = '0';
                        musicGrapher.functionZTarget0TranslateString = '0';
                    },
                    resetFuncTarget1Translate = function ()
                    {
                        musicGrapher.functionXTarget1TranslateString = '0';
                        musicGrapher.functionYTarget1TranslateString = '0';
                        musicGrapher.functionZTarget1TranslateString = '0';
                    };

                var resetFuncTarget0Scale = function ()
                    {
                        musicGrapher.functionXTarget0ScaleString = '1';
                        musicGrapher.functionYTarget0ScaleString = '1';
                        musicGrapher.functionZTarget0ScaleString = '1';
                    },
                    resetFuncTarget1Scale = function ()
                    {
                        musicGrapher.functionXTarget1ScaleString = '1';
                        musicGrapher.functionYTarget1ScaleString = '1';
                        musicGrapher.functionZTarget1ScaleString = '1';
                    };

                var controlKit = new ControlKit.Kit();

                var panel = controlKit.addPanel({width: 350, align: 'right', label: 'Settings Object'});
                var group = panel.addGroup({label: 'GL Object'});
                    group.addSubGroup({label: 'General'})
                            .addCheckbox(   musicGrapher, 'geomRender',   {label: 'render'})
                            .addCheckbox(   musicGrapher, 'normalRender', {label: 'Normals'})
                            .addCheckbox(   musicGrapher, 'uvMaterial',   {label: 'UV Material'})
                          .addSubGroup({label: 'Parametric Base'})
                            .addSelect(     musicGrapher, 'presetTarget',           {label: 'Preset f0(x)', onChange: function(index){musicGrapher.applyParametricPresetTarget0(index);}})
                            .addStringInput(musicGrapher, 'functionXTarget0String', {label: 'f0(x)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionYTarget0String', {label: 'f0(y)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionZTarget0String', {label: 'f0(z)', onChange: updateParametricFunc0})
                            .addRange(      musicGrapher, 'uRangeTarget0',          {label: 'f0 R U'})
                            .addRange(      musicGrapher, 'vRangeTarget0',          {label: 'f0 R V'})
                            .addSelect(     musicGrapher, 'presetTarget',           {label: 'Preset f1(x)', onChange: function(index){musicGrapher.applyParametricPresetTarget1(index);}})
                            .addStringInput(musicGrapher, 'functionXTarget1String', {label: 'f1(x)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionYTarget1String', {label: 'f1(y)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionZTarget1String', {label: 'f1(z)', onChange: updateParametricFunc1})
                            .addRange(      musicGrapher, 'uRangeTarget1',          {label: 'f1 R U'})
                            .addRange(      musicGrapher, 'vRangeTarget1',          {label: 'f1 R V'})
                            .addSlider(     musicGrapher, 'geomTarget0Target1Intrpl', 'geomTarget0Target1IntrplMinMax', {label: 'f0 -> f1'})
                         .addSubGroup({label: 'Translation'})
                            .addStringInput(musicGrapher, 'functionXTarget0TranslateString', {label: 'f0(x)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionYTarget0TranslateString', {label: 'f0(y)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionZTarget0TranslateString', {label: 'f0(z)', onChange: updateParametricFunc0})
                            .addButton('reset', resetFuncTarget0Translate)
                            .addStringInput(musicGrapher, 'functionXTarget1TranslateString', {label: 'f1(x)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionYTarget1TranslateString', {label: 'f1(y)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionZTarget1TranslateString', {label: 'f1(z)', onChange: updateParametricFunc1})
                            .addButton('reset', resetFuncTarget1Translate)
                         .addSubGroup({label: 'Scale'})
                            .addStringInput(musicGrapher, 'functionXTarget0ScaleString', {label: 'f0(x)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionYTarget0ScaleString', {label: 'f0(y)', onChange: updateParametricFunc0})
                            .addStringInput(musicGrapher, 'functionZTarget0ScaleString', {label: 'f0(z)', onChange: updateParametricFunc0})
                            .addButton('reset', resetFuncTarget0Scale)
                            .addStringInput(musicGrapher, 'functionXTarget1ScaleString', {label: 'f1(x)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionYTarget1ScaleString', {label: 'f1(y)', onChange: updateParametricFunc1})
                            .addStringInput(musicGrapher, 'functionZTarget1ScaleString', {label: 'f1(z)', onChange: updateParametricFunc1})
                            .addButton('reset', resetFuncTarget1Scale);

                    panel = controlKit.addPanel({width: 220, align: 'left', label: 'Settings GL'});
                    group = panel.addGroup({label: 'GL Window', enable: false});
                    group.addSubGroup()
                            .addNumberOutput(musicGrapher, 'width',  {label: 'Width'})
                            .addNumberOutput(musicGrapher, 'height', {label: 'Height'})
                            .addButton('Fullscreen on/off', null,    {label: 'none'});

                    group = panel.addGroup({label: 'GL Environment', enable: false});
                    group.addSubGroup({label: 'Grid & Background', enable: false})
                            .addColor(      musicGrapher, 'colorBg',      {label: 'Bg', colorMode: 'rgbfv'})
                            .addCheckbox(   musicGrapher, 'enableGrid',   {label: 'Grid'})
                            .addNumberInput(musicGrapher, 'gridSize',     {label: 'Size'})
                            .addColor(      musicGrapher, 'gridColor',    {label: 'Color', colorMode: 'rgbfv'})
                            .addNumberInput(musicGrapher, 'gridAlpha',    {label: 'Alpha'})
                            .addSubGroup({label: 'Light', enable: false})
                            .addCheckbox(   musicGrapher, 'lightEnabled', {label: 'enable', onChange: function(){if(musicGrapher.lightEnabled)musicGrapher._enableLighting();
                                                                                                                 else musicGrapher._disableLighting();}})
                            .addColor(      musicGrapher, 'lightColorAmbient',  {label: 'Ambient',   colorMode: 'rgbfv'})
                            .addColor(      musicGrapher, 'lightColorDiffuse',  {label: 'Diffuse',   colorMode: 'rgbfv'})
                            .addColor(      musicGrapher, 'lightColorSpecular', {label: 'Specular',  colorMode: 'rgbfv'})
                            .addNumberInput(musicGrapher, 'lightShininess',     {label: 'Shininess', step: 0.1})
                            .addSubGroup({label: 'Camera'})
                            .addCheckbox(   musicGrapher, 'cameraAutoRotate',               {label: 'auto'})
                            .addNumberInput(musicGrapher, 'cameraLocX',                     {label: 'X'})
                            .addNumberInput(musicGrapher, 'cameraLocY',                     {label: 'Y'})
                            .addNumberInput(musicGrapher, 'cameraLocZ',                     {label: 'Z'})
                            .addSlider(     musicGrapher, 'cameraZoom', 'cameraZoomMinMax', {label: 'Zoom'})
                            .addRange(      musicGrapher, 'cameraZoomMinMax',               {label: ' '});

                    panel = controlKit.addPanel({width: 200, align: 'right', label: 'Settings Audio'});
                    group = panel.addGroup({label:'Audio Control'});
                    group.addSubGroup({label:'File',useLabels:false})
                            .addButton('Load mp3',function(){event.source.postMessage({type:'LOAD'},'*')})
                            .addButton('play',musicHandler.play.bind(musicHandler))
                            .addButton('stop',musicHandler.stop.bind(musicHandler))
                        .addSubGroup({label:'Magnitude'})
                            .addValuePlotter(musicHandler,'magnitudeAvg',{label:'Avg',height:150})
                            .addNumberInput( musicHandler,'magnitudeMax',{label:'Norm Val'});


                /*---------------------------------------------------------------------------------*/

                function loop()
                {
                    webkitRequestAnimationFrame(loop);
                    controlKit.update();
                    musicGrapher.setMagnitudeAvg(musicHandler.magnitudeAvg);
                    musicGrapher.update();
                    musicHandler.update();
                }

                loop();

                /*---------------------------------------------------------------------------------*/
            });



        }
            break;

        case 'LOAD':
        {
            //document.appendChild(loaderPop);



            //musicHandler.loadAudioData(event.data.audioData,function(){console.log('bing')})

        }
            break;
    }



});
