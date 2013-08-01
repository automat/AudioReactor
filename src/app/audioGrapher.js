function AudioGrapher(element)
{
    GLKit.Application.apply(this,arguments);

    this.setSize(window.innerWidth,window.innerHeight);
    this.setTargetFPS(60.0);

    /*---------------------------------------------------------------------------------*/


    var light0 = this._light0 = new GLKit.Light(this.gl.LIGHT_0);
        light0.setAmbient3f(0,0,0);
        light0.setDiffuse3f(0.8,0.8,0.8);
        light0.setSpecular3f(1,1,1);
        light0.setPosition3f(0,0.25,0);

    var light1 = this._light1 = new GLKit.Light(this.gl.LIGHT_1);
        light1.setAmbient3f(0,0,0);
        light1.setDiffuse3f(0.8,0.8,0.8);
        light1.setSpecular3f(1,1,1);
        light1.setPosition3f(1,1,1);

    var light2 = this._light2 = new GLKit.Light(this.gl.LIGHT_2);
        light2.setAmbient3f(0,0,0);
        light2.setDiffuse3f(0.8,0.8,0.8);
        light2.setSpecular3f(1,1,1);
        light2.setPosition3f(1,1,1);

    var material = this._material0 = new GLKit.Material();
        material.setDiffuse3f(0.7,0.7,0.7);
        material.setAmbient3f(0.7,0.7,0.7);
        material.setSpecular3f(1,1,1);
        material.shininess = 20.0;

    /*---------------------------------------------------------------------------------*/

    this.backgroundColor = [13/255,67/255,79/255];
    this.gridEnabled     = true;
    this.gridAxesEnabled = true;
    this.gridCubeEnabled = true;
    this.gridSize        = 20;
    this.gridColor       = [161/255,161/255,161/255];
    this.gridAlpha       = 0.9;

    this.timeScale       = 1.0;
    this.timeScaleRange  = [0.0,2.0];

    this.lightEnabled                = true;

    this.lightGlobalPresets = ['Preset 1','Preset 2'];

    this.lightSetPosGlobal           = true;
    this.lightPosGlobalX             = 0;
    this.lightPosGlobalY             = 0;
    this.lightPosGlobalZ             = 0;
    this.lightSetColorAmbientGlobal  = true;
    this.lightColorAmbientGlobal     = [0.8,0.8,0.8];
    this.lightSetColorDiffuseGlobal  = true;
    this.lightColorDiffuseGlobal     = [1,1,1];
    this.lightSetColorSpecularGlobal = true;
    this.lightColorSpecularGlobal     = [1,1,1];
    this.lightSetAttConstantGlobal   = true;
    this.lightAttConstantGlobal      = 1.0;
    this.lightSetAttLinearGlobal     = true;
    this.lightAttLinearGlobal        = 0.0;
    this.lightSetAttQuadraticGlobal  = true;
    this.lightAttQuadraticGlobal     = 0.0;

    this.lightPresets = ['Preset 1','Preset 2'];

    this.light0Enabled      = true;
    this.light0Show         = false;
    this.light0Ambient      = [light0.ambient[0],light0.ambient[1],light0.ambient[2]];
    this.light0Diffuse      = [light0.diffuse[0],light0.diffuse[1],light0.diffuse[2]];
    this.light0Specular     = [light0.specular[0],light0.specular[1],light0.specular[2]];

    this.light1Enabled      = false;
    this.light1Show         = false;
    this.light1Ambient      = [light1.ambient[0],light1.ambient[1],light1.ambient[2]];
    this.light1Diffuse      = [light1.diffuse[0],light1.diffuse[1],light1.diffuse[2]];
    this.light1Specular     = [light1.specular[0],light1.specular[1],light1.specular[2]];

    this.light2Enabled      = false;
    this.light2Show         = false;
    this.light2Ambient      = [light2.ambient[0],light2.ambient[1],light2.ambient[2]];
    this.light2Diffuse      = [light2.diffuse[0],light2.diffuse[1],light2.diffuse[2]];
    this.light2Specular     = [light2.specular[0],light2.specular[1],light2.specular[2]];


    this.light0FuncXString = light0.position[0] + '';
    this.light0FuncYString = light0.position[1] + '';
    this.light0FuncZString = light0.position[2] + '';
    this.light0FuncAttConString = light0.constantAttentuation + '';
    this.light0FuncAttLinString = light0.linearAttentuation   + '';
    this.light0FuncAttQuaString = light0.quadricAttentuation  + '';
    this._light0i = 0;

    this.light1FuncXString = light1.position[0] + '';
    this.light1FuncYString = light1.position[1] + '';
    this.light1FuncZString = light1.position[2] + '';
    this.light1FuncAttConString = light1.constantAttentuation + '';
    this.light1FuncAttLinString = light1.linearAttentuation   + '';
    this.light1FuncAttQuaString = light1.quadricAttentuation  + '';
    this._light1i = 1/3;

    this.light2FuncXString = light2.position[0] + '';
    this.light2FuncYString = light2.position[1] + '';
    this.light2FuncZString = light2.position[2] + '';
    this.light2FuncAttConString = light2.constantAttentuation + '';
    this.light2FuncAttLinString = light2.linearAttentuation   + '';
    this.light2FuncAttQuaString = light2.quadricAttentuation  + '';
    this._light2i = 2/3;

    this._light0FuncX = this.light0FuncY = this._light0FuncZ =
    this._light1FuncX = this.light1FuncY = this._light1FuncZ =
    this._light2FuncX = this.light2FuncY = this._light2FuncZ = null;

    this.updateLight0FuncPos();
    this.updateLight1FuncPos();
    this.updateLight2FuncPos();

    this._light0FuncAttCon = this._light0FuncAttLin = this._light0FuncAttQua =
    this._light1FuncAttCon = this._light1FuncAttLin = this._light1FuncAttQua =
    this._light2FuncAttCon = this._light2FuncAttLin = this._light2FuncAttQua = null;

    this.updateLight0FuncAtt();
    this.updateLight1FuncAtt();
    this.updateLight2FuncAtt();





    var camera = this.camera;

    this.cameraZoom = 1.0;
    this.cameraZoomMinMax = [-20,20];
    this.cameraAutoRotate = true;

    this.cameraLocX = camera.position[0];
    this.cameraLocY = camera.position[1];
    this.cameraLocZ = camera.position[2];


    this.materialColorAmbient  = [material.ambient[0],material.ambient[1],material.ambient[2]];
    this.materialColorDiffuse  = [material.diffuse[0],material.diffuse[1],material.diffuse[2]];
    this.materialColorSpecular = [material.specular[0],material.specular[1],material.specular[2]];
    this.materialShininess     = material.shininess;


    /*---------------------------------------------------------------------------------*/

    this.surfaceRenderWireframe = false;
    this.surfaceRenderGeometry  = true;
    this.surfaceRenderNormals   = false;

    this.surfaceIntrpl       = 0.0;
    this.surfaceIntrplMinMax = [0.0,1.0];

    this.surfacePresets = ['Preset 1','Preset 2'];

    this._surfacePresetsParams = {};

    this._surfaceFuncX = this._surfaceFuncY = this._surfaceFuncZ =
    this._surface1FuncX = this._surface1FuncY = this._surface1FuncZ = null;

    this.surface0FuncYString = this.surface1FuncYString = '0';

    this.surface0FuncXString = this.surface1FuncXString = 'u';
    this.surface0FuncZString = this.surface1FuncZString = 'v';

    this.surface0FuncScaleXString = this.surface0FuncScaleYString = this.surface0FuncScaleZString =
    this.surface1FuncScaleXString = this.surface1FuncScaleYString = this.surface1FuncScaleZString = '1';

    this.surface0FuncTransXString = this.surface0FuncTransYString = this.surface0FuncTransZString =
    this.surface1FuncTransXString = this.surface1FuncTransYString = this.surface1FuncTransZString = '0';

    this.surface0URange = [-1,1];
    this.surface0VRange = [-1,1];
    this.surface1URange = [-1,1];
    this.surface1VRange = [-1,1];

    this._surfaceURange = null;
    this._surfaceVRange = null;



    var surfaceSize = this.surfaceSize = 100;
    var surface     = this._surface    = new Surface(surfaceSize);

    this.updateSurfaceFunc();

    surface.applyFunctions();
    surface.updateVertexNormals();


    this._magnitudeAvg    = 1;
    this._magnitudeBuffer0 = new Array(surfaceSize);
    this._magnitudeBuffer1 = new Array(surfaceSize);

    var i = -1;while(++i<surfaceSize){this._magnitudeBuffer0[i]=this._magnitudeBuffer1[i]=0.0;}


}



AudioGrapher.prototype = Object.create(GLKit.Application.prototype);

/*---------------------------------------------------------------------------------*/


AudioGrapher.prototype.update = function()
{
    var gl        = this.gl,
        cam       = this.camera,
        time      = this.getSecondsElapsed() * this.timeScale,
        timeDelta = this.getTimeDelta();

    var light0 = this._light0,
        light1 = this._light1,
        light2 = this._light2;

    var material0 = this._material0;

    var magAvg = this._magnitudeAvg;

    var surface = this._surface;

    var zoom = this.cameraZoom = GLKit.Math.lerp(this.cameraZoom, 1 + this.getMouseWheelDelta() * 0.25, timeDelta * 0.0025);


    var camRotX,camRotY;

    /*---------------------------------------------------------------------------------*/


    //TODO:FIX
    if(this.isMouseDown())
    {
        camRotX = ( -1 + this.mouse.getX() / this.glWindow.getWidth() * 2.0 ) * Math.PI;
        camRotY = ( -1 + this.mouse.getY() / this.glWindow.getHeight() * 2.0) * Math.PI * 0.5;

        GLKit.Vec3.lerp3f(cam.position,
            Math.cos(camRotX) * zoom,
            Math.sin(camRotY) * zoom,
            Math.sin(camRotX) * zoom,
            timeDelta * 0.25);
    }
    else
    {
        camRotX = time * 0.25;

        cam.setPosition3f(Math.cos(camRotX) * zoom,
            zoom,
            Math.sin(camRotX) * zoom);

    }

    cam.setPosition3f(Math.cos(time)*zoom,zoom,Math.sin(time)*zoom);

    /*---------------------------------------------------------------------------------*/

    var backgroundColor = this.backgroundColor;

    gl.clear3f(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
    gl.loadIdentity();

    gl.drawMode(gl.LINES);

    cam.setTarget3f(0,0,0);
    cam.updateMatrices();

    /*---------------------------------------------------------------------------------*/


    var gridSize = this.gridSize <= 0 ? 1 : this.gridSize;

    if(this.gridCubeEnabled)
    {
        gl.color1f(0.15);
        GLKit.GLUtil.drawGridCube(gl,gridSize,1);
    }

    if(this.gridEnabled)
    {
        var gridColor = this.gridColor;

        gl.color3f(gridColor[0],gridColor[1],gridColor[2])
        gl.pushMatrix();
        {
            gl.translate3f(0,-0.01,0);
            GLKit.GLUtil.drawGrid(gl,gridSize,1);
        }
        gl.popMatrix();
    }

    if(this.gridAxesEnabled)
    {
        GLKit.GLUtil.drawAxes(gl,gridSize*0.5);
    }


    /*---------------------------------------------------------------------------------*/

    gl.drawMode(gl.TRIANGLES);

    gl.color1f(1);

    if(this.light0Enabled && this.light0Show)
    {
        gl.pushMatrix();
        {
            gl.translate(light0.position);
            GLKit.GLUtil.octahedron(gl,0.025);
        }
        gl.popMatrix();
    }

    if(this.light1Enabled && this.light1Show)
    {
        gl.pushMatrix();
        {
            gl.translate(light1.position);
            GLKit.GLUtil.octahedron(gl,0.025);
        }
        gl.popMatrix();
    }

    if(this.light2Enabled && this.light2Show)
    {
        gl.pushMatrix();
        {
            gl.translate(light2.position);
            GLKit.GLUtil.octahedron(gl,0.025);
        }
        gl.popMatrix();
    }

    gl.useLighting(this.lightEnabled);

    if(this.light0Enabled)
    {
        var light0i = this._light0i;

        try
        {
            light0.position[0] = this._light0FuncX(time,magAvg,light0i);
            light0.position[1] = this._light0FuncY(time,magAvg,light0i);
            light0.position[2] = this._light0FuncZ(time,magAvg,light0i);

            light0.constantAttentuation = this._light0FuncAttCon(time,magAvg,light0i);
            light0.linearAttentuation   = this._light0FuncAttLin(time,magAvg,light0i);
            light0.quadricAttentuation  = this._light0FuncAttQua(time,magAvg,light0i);
        }
        catch(e){}

        gl.light(light0);
    }
    else
    {
        gl.disableLight(light0)
    }

    if(this.light1Enabled)
    {
        var light1i = this._light1i;

        try
        {
            light1.position[0] = this._light1FuncX(time,magAvg,light1i);
            light1.position[1] = this._light1FuncY(time,magAvg,light1i);
            light1.position[2] = this._light1FuncZ(time,magAvg,light1i);

            light1.constantAttentuation = this._light1FuncAttCon(time,light1i);
            light1.linearAttentuation   = this._light1FuncAttLin(time,light1i);
            light1.quadricAttentuation  = this._light1FuncAttQua(time,light1i);
        }
        catch(e){}

        gl.light(light1);
    }
    else
    {
       gl.disableLight(light1)
    }

    if(this.light2Enabled)
    {
        var light2i = this._light2i;

        try
        {
            light2.position[0] = this._light2FuncX(time,magAvg,light2i);
            light2.position[1] = this._light2FuncY(time,magAvg,light2i);
            light2.position[2] = this._light2FuncZ(time,magAvg,light2i);

            light2.constantAttentuation = this._light2FuncAttCon(time,magAvg,light2i);
            light2.linearAttentuation   = this._light2FuncAttLin(time,magAvg,light2i);
            light2.quadricAttentuation  = this._light2FuncAttQua(time,magAvg,light2i);
        }
        catch(e){}

        gl.light(light2);
    }
    else
    {
       gl.disableLight(light2)
    }

    /*---------------------------------------------------------------------------------*/

    gl.useMaterial(true);

    try
    {
        surface.applyFunctionsWithArgs(time,magAvg,this._magnitudeBuffer0,this._magnitudeBuffer1);
    }catch(e){}

    surface.updateVertexNormals();


    if(this.surfaceRenderGeometry)
    {
        gl.material(material0);
        gl.drawMode(gl.TRIANGLES);
        gl.drawGeometry(surface);
    }

    if(this.surfaceRenderWireframe)
    {
        gl.useLighting(false);
        gl.useMaterial(false);

        gl.pushMatrix();
        gl.translate3f(0,0.01,0);
        gl.drawMode(gl.LINES);
        gl.color1f(1.0);
        gl.fillColorBuffer(gl.getColorBuffer(),surface.colors);
        gl.drawGeometry(surface);
        gl.popMatrix();

        gl.useMaterial(true);
        gl.useLighting(this.lightEnabled);
    }

    if(this.surfaceRenderNormals)
    {

    }



    /*---------------------------------------------------------------------------------*/


    gl.useMaterial(false);
    gl.useLighting(false);
};



AudioGrapher.prototype.setMagnitudeAvg = function(val)
{
    var buffer0 = this._magnitudeBuffer0,
        buffer1 = this._magnitudeBuffer1,
        len     = buffer0.length;

    buffer0[buffer0.length-1] = this._magnitudeAvg = val;

    var i = 0;
    while(++i<len)
    {
        buffer1[i-1] = buffer0[i];
        buffer0[i-1] = buffer1[i-1];
    }
};

AudioGrapher.prototype.onSurfaceSizeChange = function()
{
    this.surfaceSize = this.surfaceSize < 1 ? 1 : this.surfaceSize;

    var surface = this._surface;
        surface.setSize(this.surfaceSize);
        surface.applyFunctions();
        surface.updateVertexNormals();
};

AudioGrapher.prototype.updateLight0Color = function()
{
    var light    = this._light0,
        ambient  = this.light0Ambient,
        diffuse  = this.light0Diffuse,
        specular = this.light0Specular;

    light.ambient[0] = ambient[0];
    light.ambient[1] = ambient[1];
    light.ambient[2] = ambient[2];

    light.diffuse[0] = diffuse[0];
    light.diffuse[1] = diffuse[1];
    light.diffuse[2] = diffuse[2];

    light.specular[0] = specular[0];
    light.specular[1] = specular[1];
    light.specular[2] = specular[2];
};

AudioGrapher.prototype.updateLight1Color = function()
{
    var light    = this._light1,
        ambient  = this.light1Ambient,
        diffuse  = this.light1Diffuse,
        specular = this.light1Specular;

    light.ambient[0] = ambient[0];
    light.ambient[1] = ambient[1];
    light.ambient[2] = ambient[2];

    light.diffuse[0] = diffuse[0];
    light.diffuse[1] = diffuse[1];
    light.diffuse[2] = diffuse[2];

    light.specular[0] = specular[0];
    light.specular[1] = specular[1];
    light.specular[2] = specular[2];
};

/*---------------------------------------------------------------------------------*/


AudioGrapher.prototype.updateLight2Color = function()
{
    var light    = this._light2,
        ambient  = this.light2Ambient,
        diffuse  = this.light2Diffuse,
        specular = this.light2Specular;

    light.ambient[0] = ambient[0];
    light.ambient[1] = ambient[1];
    light.ambient[2] = ambient[2];

    light.diffuse[0] = diffuse[0];
    light.diffuse[1] = diffuse[1];
    light.diffuse[2] = diffuse[2];

    light.specular[0] = specular[0];
    light.specular[1] = specular[1];
    light.specular[2] = specular[2];
};

AudioGrapher.prototype.updateLight0FuncPos = function()
{
    try
    {
        this._light0FuncX = new Function('t','m','i','return ' + this.light0FuncXString);
        this._light0FuncY = new Function('t','m','i','return ' + this.light0FuncYString);
        this._light0FuncZ = new Function('t','m','i','return ' + this.light0FuncZString);

    }catch(e){}
};

AudioGrapher.prototype.updateLight0FuncAtt = function()
{
    try
    {
        this._light0FuncAttCon = new Function('t','m','i','return ' + this.light0FuncAttConString );
        this._light0FuncAttLin = new Function('t','m','i','return ' + this.light0FuncAttLinString );
        this._light0FuncAttQua = new Function('t','m','i','return ' + this.light0FuncAttQuaString );

    }catch(e){}
};

AudioGrapher.prototype.updateLight1FuncPos = function()
{
    try
    {
        this._light1FuncX = new Function('t','m','i','return ' + this.light1FuncXString );
        this._light1FuncY = new Function('t','m','i','return ' + this.light1FuncYString );
        this._light1FuncZ = new Function('t','m','i','return ' + this.light1FuncZString );

    }catch(e){}
};

AudioGrapher.prototype.updateLight1FuncAtt = function()
{
    try
    {
        this._light1FuncAttCon = new Function('t','m','i','return ' + this.light1FuncAttConString );
        this._light1FuncAttLin = new Function('t','m','i','return ' + this.light1FuncAttLinString );
        this._light1FuncAttQua = new Function('t','m','i','return ' + this.light1FuncAttQuaString );
    }
    catch(e){}
};

AudioGrapher.prototype.updateLight2FuncPos = function()
{
    try
    {
        this._light2FuncX = new Function('t','m','i','return ' + this.light2FuncXString );
        this._light2FuncY = new Function('t','m','i','return ' + this.light2FuncYString );
        this._light2FuncZ = new Function('t','m','i','return ' + this.light2FuncZString );

    }catch(e){}
};

AudioGrapher.prototype.updateLight2FuncAtt = function()
{
    try
    {
        this._light2FuncAttCon = new Function('t','m','i','return ' + this.light2FuncAttConString );
        this._light2FuncAttLin = new Function('t','m','i','return ' + this.light2FuncAttLinString );
        this._light2FuncAttQua = new Function('t','m','i','return ' + this.light2FuncAttQuaString );

    }catch(e){}
};

AudioGrapher.prototype.updateSurfaceFunc = function()
{
    var intrpl = this.surfaceIntrpl;

    if(intrpl == 0.0)
    {
        try
        {
            this._surfaceFuncX = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface0FuncXString + ')' + '*' + '(' + this.surface0FuncScaleXString + ')' + '+' + '(' + this.surface0FuncTransXString + ')');
            this._surfaceFuncY = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface0FuncYString + ')' + '*' + '(' + this.surface0FuncScaleYString + ')' + '+' + '(' + this.surface0FuncTransYString + ')');
            this._surfaceFuncZ = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface0FuncZString + ')' + '*' + '(' + this.surface0FuncScaleZString + ')' + '+' + '(' + this.surface0FuncTransZString + ')');

        }catch(e){}


        this._surfaceURange = this.surface0URange;
        this._surfaceVRange = this.surface0VRange;

    }
    else if(intrpl == 1.0)
    {
        try
        {
            this._surfaceFuncX = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface1FuncXString + ')' + '*' + '(' + this.surface1FuncScaleXString + ')' + '+' + '(' + this.surface1FuncTransXString + ')');
            this._surfaceFuncY = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface1FuncYString + ')' + '*' + '(' + this.surface1FuncScaleYString + ')' + '+' + '(' + this.surface1FuncTransYString + ')');
            this._surfaceFuncZ = new Function('u','v','t','m','bu','bv','return ' + '(' + this.surface1FuncZString + ')' + '*' + '(' + this.surface1FuncScaleZString + ')' + '+' + '(' + this.surface1FuncTransZString + ')');

        }catch(e){}

        this._surfaceURange = this.surface1URange;
        this._surfaceVRange = this.surface1VRange;
    }
    else
    {
        try
        {
            var surface0FuncXString = '(' + this.surface0FuncXString + ')' + '*' + '(' + this.surface0FuncScaleXString + ')' + '+' + '(' + this.surface0FuncTransXString + ')',
                surface0FuncYString = '(' + this.surface0FuncYString + ')' + '*' + '(' + this.surface0FuncScaleYString + ')' + '+' + '(' + this.surface0FuncTransYString + ')',
                surface0FuncZString = '(' + this.surface0FuncZString + ')' + '*' + '(' + this.surface0FuncScaleZString + ')' + '+' + '(' + this.surface0FuncTransZString + ')';

            var surface1FuncXString = '(' + this.surface1FuncXString + ')' + '*' + '(' + this.surface1FuncScaleXString + ')' + '+' + '(' + this.surface1FuncTransXString + ')',
                surface1FuncYString = '(' + this.surface1FuncYString + ')' + '*' + '(' + this.surface1FuncScaleYString + ')' + '+' + '(' + this.surface1FuncTransYString + ')',
                surface1FuncZString = '(' + this.surface1FuncZString + ')' + '*' + '(' + this.surface1FuncScaleZString + ')' + '+' + '(' + this.surface1FuncTransZString + ')';

            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + '(' + surface0FuncXString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncXString + ')' + '*' + intrpl);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + '(' + surface0FuncYString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncYString + ')' + '*' + intrpl);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + '(' + surface0FuncZString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncZString + ')' + '*' + intrpl);

        }catch(e){}

        this._surfaceURange = [(this.surface0URange[0] + this.surface1URange[0]) * 0.5,(this.surface0URange[1] + this.surface1URange[1]) * 0.5];
        this._surfaceVRange = [(this.surface0VRange[0] + this.surface1VRange[0]) * 0.5,(this.surface0VRange[1] + this.surface1VRange[1]) * 0.5];

    }

    this._surface.setFunctions(this._surfaceFuncX,this._surfaceFuncY,this._surfaceFuncZ,this._surfaceURange,this._surfaceVRange);
};

AudioGrapher.prototype.updateSurfaceMaterial = function()
{
    var material = this._material0;

    var ambient   = this.materialColorAmbient,
        diffuse   = this.materialColorDiffuse,
        specular  = this.materialColorSpecular,
        shininess = this.materialShininess;

    material.setAmbient3f(ambient[0],ambient[1],ambient[2]);
    material.setDiffuse3f(diffuse[0],diffuse[1],diffuse[2]);
    material.setSpecular3f(specular[0],specular[1],specular[2]);
    material.shininess = shininess;

}

AudioGrapher.prototype.onWindowResize = function(){this.setSize(window.innerWidth,window.innerHeight);};

/*---------------------------------------------------------------------------------*/


//Quickfix
GLKit.GL.prototype.disableLight = function(light)
{
    var id = light.getId(),
        gl = this._gl;

    gl.uniform3fv(this._uLightAmbient[id],  new Float32Array([0,0,0]));
    gl.uniform3fv(this._uLightDiffuse[id],  new Float32Array([0,0,0]));
    gl.uniform3fv(this._uLightSpecular[id], new Float32Array([0,0,0]));

    gl.uniform1f(this._uLightAttenuationConstant[id], 1.0);
    gl.uniform1f(this._uLightAttenuationLinear[id],   0.0);
    gl.uniform1f(this._uLightAttenuationQuadratic[id],0.0);
};
