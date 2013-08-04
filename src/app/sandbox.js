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
            group.addSubGroup({label:'Basic'})
                 .addColor(audioGrapher,'backgroundColor',{label:'BG Color',colorMode:'rgbfv'})
                 .addCheckbox(audioGrapher,'gridEnabled',{label:'Grid'})
                 .addColor(audioGrapher,'gridColor',{colorMode:'rgbfv',label:'color'})
                 .addCheckbox(audioGrapher,'gridAxesEnabled',{label:'Axes'})
                 .addCheckbox(audioGrapher,'gridCubeEnabled',{label:'Room'})
                 .addNumberInput(audioGrapher,'gridSize',{label:'Size'})

            group.addSubGroup({label:'Camera'})
                 .addSelect(audioGrapher,'cameraPresets',{label:'Preset',onChange:function(index){audioGrapher.updateCameraWithPreset(index)}})
                 .addCheckbox(audioGrapher,'cameraParametric',{label:'parametric'})
                 .addStringInput(audioGrapher,'cameraFuncXString',{label:'fx (t,m)',onChange:audioGrapher.updateCameraFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'cameraFuncYString',{label:'fy (t,m)',onChange:audioGrapher.updateCameraFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'cameraFuncZString',{label:'fz (t,m)',onChange:audioGrapher.updateCameraFunc.bind(audioGrapher)})
                 .addNumberInput(audioGrapher,'cameraTimeDeltaScale',{label:'delta'})

        group.addSubGroup({label:'Room'})
                 .addCheckbox(audioGrapher,'solidRoomEnabled',{label:'enable'})
                 .addColor(audioGrapher,'solidRoomMaterialColorAmbient',{label:'C Amb',colorMode:'rgbfv'})
                 .addColor(audioGrapher,'solidRoomMaterialColorDiffuse',{label:'C Dif',colorMode:'rgbfv'})
                 .addColor(audioGrapher,'solidRoomMaterialColorSpecular',{label:'C Spe',colorMode:'rgbfv'})
                 .addNumberInput(audioGrapher,'solidRoomMaterialShininess',{label:'Shi'});

            group.addSubGroup({label:'Time'})
                 .addSlider(audioGrapher,'timeScale','timeScaleRange');

            group = panel.addGroup({label:'Lighting'});
            group.addSubGroup()
                 .addCheckbox(audioGrapher,'lightEnabled',{label:'enable'})

            group.addSubGroup({label:'Light 0'})
                 .addCheckbox(audioGrapher,'light0Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light0Show',{label:'debug'})
                    .addSelect(audioGrapher,'lightPresets',{label:'Preset',onChange:function(index){audioGrapher.updateLight0WithPreset(index);}})
                    .addStringInput(audioGrapher,'light0FuncXString',{label:'fx(t,m,i)',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncYString',{label:'fy(t,m,i)',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncZString',{label:'fz(t,m,i)',onChange:audioGrapher.updateLight0FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light0Ambient', {label:'C Amb',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light0Diffuse', {label:'C Dif',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light0Specular',{label:'C Spe',colorMode:'rgbfv'})
                    .addStringInput(audioGrapher,'light0FuncAttConString',{label:'fac(t,m,i)',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncAttLinString',{label:'fal(t,m,i)',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light0FuncAttQuaString',{label:'faq(t,m,i)',onChange:audioGrapher.updateLight0FuncAtt.bind(audioGrapher)});

            group.addSubGroup({label:'Light 1'})
                 .addCheckbox(audioGrapher,'light1Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light1Show',{label:'debug'})
                    .addSelect(audioGrapher,'lightPresets',{label:'Preset',onChange:function(index){audioGrapher.updateLight1WithPreset(index);}})
                    .addStringInput(audioGrapher,'light1FuncXString',{label:'fx(t,m,i)',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncYString',{label:'fy(t,m,i)',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncZString',{label:'fz(t,m,i)',onChange:audioGrapher.updateLight1FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light1Ambient', {label:'C Amb',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light1Diffuse', {label:'C Dif',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light1Specular',{label:'C Spe',colorMode:'rgbfv'})
                    .addStringInput(audioGrapher,'light1FuncAttConString', {label:'fac(t,m,i)',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncAttLinString',   {label:'fal(t,m,i)',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light1FuncAttQuaString',{label:'faq(t,m,i)',onChange:audioGrapher.updateLight1FuncAtt.bind(audioGrapher)});

            group.addSubGroup({label:'Light 2'})
                 .addCheckbox(audioGrapher,'light2Enabled',{label:'enable'})
                    .addCheckbox(audioGrapher,'light2Show',{label:'debug'})
                    .addSelect(audioGrapher,'lightPresets',{label:'Preset',onChange:function(index){audioGrapher.updateLight2WithPreset(index);}})
                    .addStringInput(audioGrapher,'light2FuncXString',{label:'fx(t,m,i)',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncYString',{label:'fy(t,m,i)',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncZString',{label:'fz(t,m,i)',onChange:audioGrapher.updateLight2FuncPos.bind(audioGrapher)})
                    .addColor(audioGrapher,'light2Ambient', {label:'C Amb',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light2Diffuse', {label:'C Dif',colorMode:'rgbfv'})
                    .addColor(audioGrapher,'light2Specular',{label:'C Spe',colorMode:'rgbfv'})
                    .addStringInput(audioGrapher,'light2FuncAttConString', {label:'fac(t,m,i)',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncAttLinString',   {label:'fal(t,m,i)',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)})
                    .addStringInput(audioGrapher,'light2FuncAttQuaString',{label:'faq(t,m,i)',onChange:audioGrapher.updateLight2FuncAtt.bind(audioGrapher)});

            panel = controlKit.addPanel({label:'Settings Surface',width:300,align:'right'});
            group = panel.addGroup({label:'General',enable:false});
            group.addSubGroup({label:'Render'})
                 .addCheckbox(audioGrapher,'surfaceRenderGeometry',{label:'Surface'})
                 .addCheckbox(audioGrapher,'surfaceRenderWireframe',{label:'Wireframe'})
                 .addCheckbox(audioGrapher,'surfaceRenderNormals',  {label:'Normals'})
                 .addNumberInput(audioGrapher,'surfaceSize',{label:'size',onChange:audioGrapher.onSurfaceSizeChange.bind(audioGrapher)})
                 .addSubGroup().addSlider(audioGrapher,'surfaceIntrpl','surfaceIntrplMinMax',{label:'Morph'})
                 .addSubGroup({label:'Material'})
                 .addColor(audioGrapher,'materialColorAmbient', {label:'C Amb',colorMode:'rgbfv'})
                 .addColor(audioGrapher,'materialColorDiffuse', {label:'C Dif',colorMode:'rgbfv'})
                 .addColor(audioGrapher,'materialColorSpecular',{label:'C Spe',colorMode:'rgbfv'})
                 .addNumberInput(audioGrapher,'materialShininess',    {label:'Shi'});

            group.addSubGroup({label:'Object Transformation'})
                 .addStringInput(audioGrapher,'surfaceObjRotXString',{label:'frx (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surfaceObjRotYString',{label:'fry (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surfaceObjRotZString',{label:'frz (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surfaceObjTransXString',{label:'ftx (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surfaceObjTransYString',{label:'fty (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surfaceObjTransZString',{label:'ftz (t,m)',onChange:audioGrapher.updateSurfaceObjFunc.bind(audioGrapher)})


            group = panel.addGroup({label:'Surface 0'});
            group.addSubGroup().addSelect(audioGrapher,'surfacePresets',{label:'Preset',onChange:function(index){audioGrapher.updateSurface0WithPreset(index)}});
            group.addSubGroup({label:'f(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addRange(audioGrapher,'surface0URange',{label:'u',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addRange(audioGrapher,'surface0VRange',{label:'v',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});
            group.addSubGroup({label:'fs(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncScaleXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncScaleYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncScaleZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});
            group.addSubGroup({label:'ft(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface0FuncTransXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncTransYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface0FuncTransZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});

            group = panel.addGroup({label:'Surface 1',enable:false});
            group.addSubGroup().addSelect(audioGrapher,'surfacePresets',{label:'Preset',onChange:function(index){audioGrapher.updateSurface1WithPreset(index)}});
            group.addSubGroup({label:'f(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addRange(audioGrapher,'surface1URange',{label:'u',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addRange(audioGrapher,'surface1VRange',{label:'v',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});
            group.addSubGroup({label:'fs(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncScaleXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncScaleYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncScaleZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});

            group.addSubGroup({label:'ft(u,v,t,m,bu,bv)'})
                 .addStringInput(audioGrapher,'surface1FuncTransXString',{label:'x',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncTransYString',{label:'y',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)})
                 .addStringInput(audioGrapher,'surface1FuncTransZString',{label:'z',onChange:audioGrapher.updateSurfaceFunc.bind(audioGrapher)});


        panel = controlKit.addPanel({width: 200, align: 'right', label: 'Settings Audio'});
        group = panel.addGroup({label:'Audio Control'});

        group.addSubGroup({label:'File'})
            .addButton('Load mp3',function(){parent.postMessage({type:'LOAD'},'*')},{label:'none'})
            .addSubGroup({label:'Magnitude'})
            .addValuePlotter(audioHandler,'magnitudeAvg',{label:'Avg',height:150})
            .addNumberOutput(audioHandler,'magnitudeAvg',{dp: 4})
            .addNumberInput( audioHandler,'magnitudeMax',{label:'Norm'})



        /*---------------------------------------------------------------------------------*/

        //iframe and so
        var divControlKit = document.getElementById('controlKit');
            divControlKit.addEventListener('mousemove',audioGrapher._onGLCanvasMouseMove.bind(audioGrapher));
            divControlKit.addEventListener('mousedown',audioGrapher._onGLCanvasMouseDown.bind(audioGrapher));
            divControlKit.addEventListener('mouseup',  audioGrapher._onGLCanvasMouseUp.bind(audioGrapher));
            divControlKit.addEventListener('mousewheel',audioGrapher._onGLCanvasMouseWheel.bind(audioGrapher));

            document.addEventListener('keydown',audioGrapher._onGLCanvasKeyDown.bind(audioGrapher));
            document.addEventListener('keyup', audioGrapher._onGLCanvasKeyUp.bind(audioGrapher));

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


