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

    var fullscreen = false;

    /*---------------------------------------------------------------------------------*/

    window.onload = function()
    {

        audioGrapher = new AudioGrapher(document.getElementById('musicGrapher'));
        audioHandler = new AudioHandler();

        /*---------------------------------------------------------------------------------*/

        var controlKit = new ControlKit.Kit();

        var panel = controlKit.addPanel({width:225,align:'left',label:'Settings World'});
        var group = panel.addGroup({label:'Environment'});
            group.addSubGroup()
                 .addColor(audioGrapher,'backgroundColor',{label:'BG Color',colorMode:'rgbfv'})
                 .addCheckbox(audioGrapher,'gridEnabled',{label:'Grid'})
                 .addColor(audioGrapher,'gridColor',{colorMode:'rgbfv',label:'color'})
                 .addCheckbox(audioGrapher,'gridAxesEnabled',{label:'Axes'})
                 .addCheckbox(audioGrapher,'gridCubeEnabled',{label:'Room'})
                 .addNumberInput(audioGrapher,'gridSize',{label:'Size'})

            group.addSubGroup({label:'Time'})
                 .addSlider(audioGrapher,'timeScale','timeScaleRange');

            group = panel.addGroup({label:'Lighting'});
            group.addSubGroup({label:'Global',enable:false})
                 .addCheckbox(audioGrapher,'lightEnabled',{label:'enable'})
                 .addCheckbox(audioGrapher,'lightSetPosGlobal',{label:'Position'})
                    .addNumberInput(audioGrapher,'lightPosGlobalX',{label:'X'})
                    .addNumberInput(audioGrapher,'lightPosGlobalY',{label:'Y'})
                    .addNumberInput(audioGrapher,'lightPosGlobalZ',{label:'Z'})
                 .addCheckbox(audioGrapher,'lightSetColorAmbientGlobal',{label:'C Amb'})
                    .addColor(audioGrapher,'lightColorAmbientGlobal',{label:' ',colorMode:'rgbfv'})
                 .addCheckbox(audioGrapher,'lightSetColorDiffuseGlobal',{label:'C Dif'})
                    .addColor(audioGrapher,'lightColorDiffuseGlobal',{label:' ',colorMode:'rgbfv'})
                 .addCheckbox(audioGrapher,'lightSetColorSpecularGlobal',{label:'C Spe'})
                    .addColor(audioGrapher,'lightColorSpecularGlobal',{label:' ',colorMode:'rgbfv'})
                 .addCheckbox(audioGrapher,'lightSetAttConstantGlobal',{label:'Att Con'})
                    .addNumberInput(audioGrapher,'lightAttConstantGlobal',{label:' '})
                 .addCheckbox(audioGrapher,'lightSetAttLinearGlobal',{label:'Att Lin'})
                    .addNumberInput(audioGrapher,'lightAttLinearGlobal',{label:' '})
                 .addCheckbox(audioGrapher,'lightSetAttQuadraticGlobal',{label:'Att Qua'})
                    .addNumberInput(audioGrapher,'lightAttQuadraticGlobal',{label:' '});

            group.addSubGroup({label:'Light 0'})
                 .addCheckbox(audioGrapher,'light0Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light0Show',{label:'debug'})
                    .addStringInput(audioGrapher,'light0FuncXString',{label:'X',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncYString',{label:'Y',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncZString',{label:'Z',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light0Ambient', {label:'C Amb',colorMode:'rgbfv',onChange:audioGrapher.updateLight0Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light0Diffuse', {label:'C Dif',colorMode:'rgbfv',onChange:audioGrapher.updateLight0Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light0Specular',{label:'C Spe',colorMode:'rgbfv',onChange:audioGrapher.updateLight0Color.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncAttConString',{label:'Att Con',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncAttLinString',{label:'Att Con',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncAttQuaString',{label:'Att Con',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)});

            group.addSubGroup({label:'Light 1'})
                 .addCheckbox(audioGrapher,'light1Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light1Show',{label:'debug'})
                    .addStringInput(audioGrapher,'light1FuncXString',{label:'X',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncYString',{label:'Y',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncZString',{label:'Z',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light1Ambient', {label:'C Amb',colorMode:'rgbfv',onChange:audioGrapher.updateLight1Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light1Diffuse', {label:'C Dif',colorMode:'rgbfv',onChange:audioGrapher.updateLight1Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light1Specular',{label:'C Spe',colorMode:'rgbfv',onChange:audioGrapher.updateLight1Color.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncAttConString', {label:'Att Con',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncAttLinString',   {label:'Att Con',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncAttQuaString',{label:'Att Con',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)});

            group.addSubGroup({label:'Light 2'})
                 .addCheckbox(audioGrapher,'light2Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light2Show',{label:'debug'})
                    .addStringInput(audioGrapher,'light2FuncXString',{label:'X',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncYString',{label:'Y',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncZString',{label:'Z',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light2Ambient', {label:'C Amb',colorMode:'rgbfv',onChange:audioGrapher.updateLight2Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light2Diffuse', {label:'C Dif',colorMode:'rgbfv',onChange:audioGrapher.updateLight2Color.bind(audioGrapher)})
                    .addColor(audioGrapher,'light2Specular',{label:'C Spe',colorMode:'rgbfv',onChange:audioGrapher.updateLight2Color.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncAttConString', {label:'Att Con',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncAttLinString',   {label:'Att Con',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncAttQuaString',{label:'Att Con',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)});

            panel = controlKit.addPanel({label:'Settings Surface',width:220,align:'right'});
            group = panel.addGroup({label:'General'});
            group.addSubGroup({label:'Render'})
                 .addCheckbox(audioGrapher,'surfaceRenderGeometry',{label:'Surface'})
                 .addCheckbox(audioGrapher,'surfaceRenderWireframe',{label:'Wireframe'})
                 .addCheckbox(audioGrapher,'surfaceRenderNormals',  {label:'Normals'})
                 .addNumberInput(audioGrapher,'surfaceSize',{label:'size',onChange:audioGrapher.onSurfaceSizeChange.bind(audioGrapher)})

            group = panel.addGroup({label:'Surface 0'});
            group.addSubGroup({label:'f(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface0FuncYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface0FuncZString',{label:'z'});
            group.addSubGroup({label:'fs(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncScaleXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface0FuncScaleYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface0FuncScaleZString',{label:'z'});
            group.addSubGroup({label:'ft(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncTransXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface0FuncTransYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface0FuncTransZString',{label:'z'});

            group = panel.addGroup({label:'Surface 1'});
            group.addSubGroup({label:'f(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface1FuncYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface1FuncZString',{label:'z'});
            group.addSubGroup({label:'fs(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncScaleXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface1FuncScaleYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface1FuncScaleZString',{label:'z'});
            group.addSubGroup({label:'ft(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncTransXString',{label:'x'})
                 .addStringInput(audioGrapher,'surface1FuncTransYString',{label:'y'})
                 .addStringInput(audioGrapher,'surface1FuncTransZString',{label:'z'});



        /*
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
        group = panel.addGroup();
        group.addSubGroup({label: 'Grid & Background', enable: false})
                .addButton('fullscreen on/off',function(){fullscreen=!fullscreen;parent.postMessage({type:fullscreen ? 'ENTER_FULLSCREEN' : 'EXIT_FULLSCREEN'},'*')})
                .addColor(      audioGrapher, 'colorBg',      {label: 'Bg',    colorMode: 'rgbfv'})
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
                .addSubGroup({label:'Magnitude'})
                .addValuePlotter(audioHandler,'magnitudeAvg',{label:'Avg',height:150})
                .addNumberInput( audioHandler,'magnitudeMax',{label:'Norm Val'});

        */

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
        var eventType = event.data.type;
            parent    = event.source;

        switch(eventType)
        {
            case 'FILE_LOADED':
            {
                document.body.appendChild(loaderPop);

                var data = event.data;
                audioHandler.loadAudioData(data.audioData,function(){document.body.removeChild(loaderPop);});

            }
                break;

            case 'NO_FILE_LOADED' :
            {

            }
                break;


        }
    });

}());


