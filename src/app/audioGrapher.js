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

    this.backgroundColor        = [0.1,0.1,0.1];
    this.gridEnabled            = false;
    this.gridAxesEnabled        = false;
    this.gridCubeEnabled        = false;
    this.gridSize               = 20;
    this.gridColor              = [161/255,161/255,161/255];
    this.gridAlpha              = 0.9;

    this.solidRoomEnabled               = true;
    this.solidRoomMaterialColorAmbient  = [0.7,0.7,0.7];
    this.solidRoomMaterialColorDiffuse  = [0.7,0.7,0.7];
    this.solidRoomMaterialColorSpecular = [1,1,1];
    this.solidRoomMaterialShininess     = 20.0;

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

    this.lightPresets = ['Purple static float',
                         'Red quad float long',
                         'White cirlce float short'];

    this._lightPresets = [{ambient:[0,0,0],diffuse:[1.0,0,1.0],specular:[1,1,1],
                           funcXString:'0',funcYString:'abs(sin(t))*0.25',funcZString:'0',
                           uncAttConString:'1',funcAttLinString:'0',funcAttQuaString:'0.01'},

                          {ambient:[0,0,0],diffuse:[1.0,0,0],specular:[1,1,1],
                           funcXString:'cos(t*4)*2',funcYString:'abs(sin(t))*0.25',funcZString:'abs(sin(t*4))',
                           funcAttConString:'1',funcAttLinString:'0',funcAttQuaString:'0.01'},

                          {ambient:[0,0,0],diffuse:[204/255,204/255,204/255],specular:[1,1,1],
                           funcXString:'cos(t*8)*0.25',funcYString:'0.01',funcZString:'sin(t*8)*0.25',
                           funcAttConString:'1',funcAttLinString:'0',funcAttQuaString:'0.01'}];

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

    /*---------------------------------------------------------------------------------*/

    var camera = this.camera;

    this.cameraZoom = 1.0;
    this.cameraZoomMinMax     = [-20,20];
    this.cameraAutoRotate     = true;
    this.cameraTimeDeltaScale = 0.25;
    this.cameraParametric     = false;

    this.cameraFuncXString = camera.position[0] + '';
    this.cameraFuncYString = camera.position[1] + '';
    this.cameraFuncZString = camera.position[2] + '';

    this._cameraFuncX = this._cameraFuncY = this._cameraFuncY = null;


    /*---------------------------------------------------------------------------------*/


    this.materialColorAmbient  = [material.ambient[0],material.ambient[1],material.ambient[2]];
    this.materialColorDiffuse  = [material.diffuse[0],material.diffuse[1],material.diffuse[2]];
    this.materialColorSpecular = [material.specular[0],material.specular[1],material.specular[2]];
    this.materialShininess     = material.shininess;

    this.surfaceRenderWireframe = false;
    this.surfaceRenderGeometry  = true;
    this.surfaceRenderNormals   = false;

    this.surfaceIntrpl       = 0.0;
    this.surfaceIntrplMinMax = [0.0,1.0];

    this.surfacePresets = ['Plane','Torus','Sphere','Unnamed'];

    this._surfacePresets =
    [
        {funcXString:'u',funcYString:'0',funcZString:'v',
         funcXScaleString:'1',funcYScaleString:'1',funcZScaleString:'1',
         funcXTransString:'0',funcYTransString:'0',funcZTransString:'0',
         uRange:[-1,1],vRange:[-1,1]},

        {funcXString:'cos(v)*(1+0.25*cos(u))',funcYString:'0.25*sin(u)',funcZString:'sin(v)*(1+0.25*cos(u))',
         funcXScaleString:'1',funcYScaleString:'1',funcZScaleString:'1',
         funcXTransString:'0',funcYTransString:'0',funcZTransString:'0',
         uRange:[0,2*Math.PI],vRange:[0,2*Math.PI]},

        {funcXString:'0.5 * sin(v) * cos(u)',funcYString:'0.5 * sin(v) * sin(u)',funcZString:'0.5 * cos(v)',
         funcXScaleString:'1',funcYScaleString:'1',funcZScaleString:'1',
         funcXTransString:'0',funcYTransString:'0',funcZTransString:'0',
         uRange:[0,Math.PI],vRange:[0,2*Math.PI]},

        {funcXString:'u',funcYString:'1',funcZString:'v',
            funcXScaleString:'10 + 3 * m',funcYScaleString:'1+sin(bv*bu*20)*cos(v)',funcZScaleString:'10 + 3 * m',
            funcXTransString:'0',funcYTransString:'0',funcZTransString:'0',
            uRange:[-1,1],vRange:[-1,1]}
    ];

    this._surfaceFuncX = this._surfaceFuncY = this._surfaceFuncZ = null;

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

    this._surfaceFuncXString = '0';
    this._surfaceFuncYString = '0';
    this._surfaceFuncZString = '0';



    var surfaceSize = this.surfaceSize = 100;
    var surface     = this._surface    = new Surface(surfaceSize);

    this.updateSurfaceFunc();

    //surface.applyFunctions();
   // surface.updateVertexNormals();


    this._magnitudeAvg    = 1;
    this._magnitudeBuffer0 = new Array(surfaceSize);
    this._magnitudeBuffer1 = new Array(surfaceSize);

    var i = -1;while(++i<surfaceSize){this._magnitudeBuffer0[i]=this._magnitudeBuffer1[i]=0.0;}

    /*---------------------------------------------------------------------------------*/




    var webWorkerBlob = new Blob(["self.addEventListener('message',function(e) { var data = e.data; var indices = data[0], vertices = data[1], normals = data[2]; var funcXString = data[3], funcYString = data[4], funcZString = data[5]; var funcX = new Function('u','v','t','m','bu','bv','return ' + funcXString), funcY = new Function('u','v','t','m','bu','bv','return ' + funcYString), funcZ = new Function('u','v','t','m','bu','bv','return ' + funcZString); var ur = data[6], vr = data[7]; var urLower = ur[0], urUpper = ur[1], vrLower = vr[0], vrUpper = vr[1]; var size = data[8]; var i, j, u, v; var index, indexVertices; var temp0 = urUpper - urLower, temp1 = vrUpper - vrLower, temp2 = size - 1; var bu,bv; var buffer = data[9], m = data[10], t = data[11]; try { i = -1; while(++i < size) { j = -1; while(++j < size) { index = (j + size * i); indexVertices = index * 3; u = (urLower + temp0 * (j / temp2)); v = (vrLower + temp1 * (i / temp2)); bu = buffer[j]; bv = buffer[i]; vertices[indexVertices ] = funcX(u,v,t,m,bu,bv); vertices[indexVertices + 1] = funcY(u,v,t,m,bu,bv); vertices[indexVertices + 2] = funcZ(u,v,t,m,bu,bv); } } }catch(e){} postMessage([vertices,normals]); },false); var PI = Math.PI, HALF_PI = Math.PI * 0.5, QUARTER_PI = Math.PI*0.25; TWO_PI = Math.PI * 2; var EPSILON = 0.0001; function lerp(a,b,v) { return (a*v)+(b*(1-v)); } function stepSmooth(n) { return n*n*(3-2*n); } function stepSmoothSquared(n) { return stepSmooth(n)*stepSmooth(n); } function stepSmoothInvSquared(n) { return 1-(1-stepSmooth(n))*(1-stepSmooth(n)); } function stepSmoothCubed(n) { return stepSmooth(n)*stepSmooth(n)*stepSmooth(n)*stepSmooth(n); } function stepSmoothInvCubed(n) { return 1-(1-stepSmooth(n))*(1-stepSmooth(n))*(1-stepSmooth(n))*(1-stepSmooth(n)); } function stepSquared(n) { return n*n; } function stepInvSquared(n) { return 1-(1-n)*(1-n); } function stepCubed(n) { return n*n*n*n; } function stepInvCubed(n) { return 1-(1-n)*(1-n)*(1-n)*(1-n); } function catmullrom(v,p0,p1,p2,p3) { return 0.5 * ((2 * p1) + (-p0 + p2) * v + (2 * p0 - 5 * p1 + 4 * p2 - p3) * v * v + (-p0 + 3 * p1 - 3 * p2 + p3) * v * v *v); } function randomFloat() { var r; switch (arguments.length) { case 0: r = Math.random(); break; case 1: r = Math.random() * arguments[0]; break; case 2: r = arguments[0] + (arguments[1]-arguments[0]) * Math.random(); break; } return r; } function randomInteger() { var r; switch (arguments.length) { case 0: r = 0.5 + Math.random(); break; case 1: r = 0.5 + Math.random()*arguments[0]; break; case 2: r = arguments[0] + ( 1 + arguments[1] - arguments[0]) * Math.random(); break; } return Math.floor(r); } function constrain() { var r; switch (arguments.length) { case 2: arguments[0] = (arguments[0] > arguments[1]) ? arguments[1] : arguments[0]; break; case 3: arguments[0] = (arguments[0] > arguments[2]) ? arguments[2] : (arguments[0] < arguments[1]) ? arguments[1] : arguments[0]; break; } return arguments[0]; } function normalize(value,start,end) { return (value - start) / (end - start); } function map(value,inStart,inEnd,outStart,outEnd) { return outStart + (outEnd - outStart) * normalize(value,inStart,inEnd); } function sin(value) { return Math.sin(value); } function cos(value) { return Math.cos(value); } function saw(value) { return 2 * (value - Math.floor(0.5 + value )); } function tri(value) { return 1-4*abs(0.5-frac(0.5*value+0.25)); } //FIX function rect(value) { var a = abs(value); return (a > 0.5) ? 0 : (a == 0.5) ? 0.5 : (a < 0.5) ? 1 : -1; } function frac(value) { return value - Math.floor(value); } function sgn(value) { return value / abs(value); } function abs(x) { return Math.abs(x); } function min(x) { return Math.min(x); } function max(x) { return Math.max(x); } function atan(x) { return Math.atan(x); } function atan2(y,x) { return Math.atan2(y,x); } function round(x) { return Math.round(x); } function floor(x) { return Math.floor(x); } function tan(x) { return Math.tan(x); } function rad2deg(radians) { return radians * (180 / PI); } function deg2rad(degree) { return degree * (PI / 180); } function sqrt(x) { return Math.sqrt(x); } function GreatestCommonDivisor(a,b) { return (b == 0) ? a : GreatestCommonDivisor(b, a % b) } function isFloatEqual(a,b) { return (Math.abs(a-b) < EPSILON); } function isPowerOfTwo(a) { return (a&(a-1))==0; } function swap(a,b) { var t = a;a = b;b = a; } function pow(x,y) { return Math.pow(x,y); } function log(x) { return Math.log(x); } function cosh(x) { return (Math.pow(Math.E,x) + Math.pow(Math.E,-x))*0.5; } function exp(x) { return Math.exp(x); }"]);


    console.log(surface.funcXString);

    var webWorker =  this._webWorker = new Worker(window.URL.createObjectURL(webWorkerBlob));

        webWorker.postMessage([surface.indices,
                               surface.vertices,
                               surface.normals,

                               surface.funcXString,
                               surface.funcYString,
                               surface.funcZString,

                               surface.ur,
                               surface.vr,

                               surface.size,

                               this._magnitudeBuffer0,
                               this._magnitudeAvg,
                               0.0

                               ]);
        webWorker.addEventListener('message',function(e)
        {
            //console.log(e.data[1]);
           surface.vertices = e.data[0];
           surface.normals  = e.data[1];
        })




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
    if(this.isKeyDown() && this.isMouseDown() )
    {
        camRotX = ( -1 + this.mouse.getX() / this.glWindow.getWidth() * 2.0 ) * Math.PI;
        camRotY = ( -1 + this.mouse.getY() / this.glWindow.getHeight() * 2.0) * Math.PI * 0.5;


        GLKit.Vec3.lerp3f(cam.position,
            Math.cos(camRotX) * zoom,
            Math.sin(camRotY) * zoom,
            Math.sin(camRotX) * zoom,
            timeDelta * this.cameraTimeDeltaScale);
    }
    else if(this.cameraAutoRotate && !this.cameraParametric)
    {
        cam.setPosition3f(Math.cos(time)*zoom,zoom,Math.sin(time)*zoom);

    }
    else if(!this.cameraAutoRotate && this.cameraParametric)
    {
        try
        {
            cam.setPosition3f(this._cameraFuncX(time,magAvg),
                              this._cameraFuncY(time,magAvg),
                              this._cameraFuncZ(time,magAvg));

        }
        catch (e){}

    }



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


    var light;
    var ambient,
        diffuse,
        specular;

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
        try
        {
            var light0i = this._light0i;

            ambient  = this.light0Ambient;
            diffuse  = this.light0Diffuse;
            specular = this.light0Specular;

            light0.ambient[0] = ambient[0];
            light0.ambient[1] = ambient[1];
            light0.ambient[2] = ambient[2];

            light0.diffuse[0] = diffuse[0];
            light0.diffuse[1] = diffuse[1];
            light0.diffuse[2] = diffuse[2];

            light0.specular[0] = specular[0];
            light0.specular[1] = specular[1];
            light0.specular[2] = specular[2];

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
        try
        {
            var light1i = this._light1i;

            ambient  = this.light1Ambient;
            diffuse  = this.light1Diffuse;
            specular = this.light1Specular;

            light1.ambient[0] = ambient[0];
            light1.ambient[1] = ambient[1];
            light1.ambient[2] = ambient[2];

            light1.diffuse[0] = diffuse[0];
            light1.diffuse[1] = diffuse[1];
            light1.diffuse[2] = diffuse[2];

            light1.specular[0] = specular[0];
            light1.specular[1] = specular[1];
            light1.specular[2] = specular[2];

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
        try
        {
            var light2i = this._light2i;

            ambient  = this.light2Ambient;
            diffuse  = this.light2Diffuse;
            specular = this.light2Specular;

            light2.ambient[0] = ambient[0];
            light2.ambient[1] = ambient[1];
            light2.ambient[2] = ambient[2];

            light2.diffuse[0] = diffuse[0];
            light2.diffuse[1] = diffuse[1];
            light2.diffuse[2] = diffuse[2];

            light2.specular[0] = specular[0];
            light2.specular[1] = specular[1];
            light2.specular[2] = specular[2];

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

    var material = this._material0;

    if(this.solidRoomEnabled)
    {
        ambient  = this.solidRoomMaterialColorAmbient;
        diffuse  = this.solidRoomMaterialColorDiffuse;
        specular = this.solidRoomMaterialColorSpecular;

        material.setAmbient3f(ambient[0],ambient[1],ambient[2]);
        material.setDiffuse3f(diffuse[0],diffuse[1],diffuse[2]);
        material.setSpecular3f(specular[0],specular[1],specular[2]);

        material.shininess = this.solidRoomMaterialShininess;

        gl.pushMatrix();
        gl.material(material);
        gl.cube(this.gridSize);
        gl.popMatrix();

    }


    try
    {
        ambient  = this.materialColorAmbient;
        diffuse  = this.materialColorDiffuse;
        specular = this.materialColorSpecular;

        material.setAmbient3f(ambient[0],ambient[1],ambient[2]);
        material.setDiffuse3f(diffuse[0],diffuse[1],diffuse[2]);
        material.setSpecular3f(specular[0],specular[1],specular[2]);
        material.shininess = this.materialShininess;

    }catch(e){}


    try
    {
        /*
        //surface.applyFunctionsWithArgs(time,magAvg,this._magnitudeBuffer0);
        this._webWorker.postMessage([surface.indices,
            surface.vertices,
            surface.normals,
            surface.funcX,
            surface.funcY,
            surface.funcZ,
            surface.ur,
            surface.vr,
            surface.size,
            time,
            this._magnitudeAvg,
            this._magnitudeBuffer0]);
            */

        this._webWorker.postMessage([surface.indices,
                                     surface.vertices,
                                     surface.normals,

                                     surface.funcXString,
                                     surface.funcYString,
                                     surface.funcZString,

                                     surface.ur,
                                surface.vr,

            surface.size,

            this._magnitudeBuffer0,
            this._magnitudeAvg,
            time




        ]);

        surface.updateVertexNormals();

    }catch(e){}




    //this._webWorker.postMessage([surface.indices,surface.vertices,surface.normals]);


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

AudioGrapher.prototype.__update = function()
{

}



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

/*---------------------------------------------------------------------------------*/


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
            this._surfaceFuncXString = '(' + this.surface0FuncXString + ')' + '*' + '(' + this.surface0FuncScaleXString + ')' + '+' + '(' + this.surface0FuncTransXString + ')';
            this._surfaceFuncYString = '(' + this.surface0FuncYString + ')' + '*' + '(' + this.surface0FuncScaleYString + ')' + '+' + '(' + this.surface0FuncTransYString + ')';
            this._surfaceFuncZString = '(' + this.surface0FuncZString + ')' + '*' + '(' + this.surface0FuncScaleZString + ')' + '+' + '(' + this.surface0FuncTransZString + ')';


            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncXString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncYString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncZString);

        }catch(e){}


        this._surfaceURange = this.surface0URange;
        this._surfaceVRange = this.surface0VRange;

    }
    else if(intrpl == 1.0)
    {
        try
        {
            this._surfaceFuncXString = '(' + this.surface1FuncXString + ')' + '*' + '(' + this.surface1FuncScaleXString + ')' + '+' + '(' + this.surface1FuncTransXString + ')';
            this._surfaceFuncYString = '(' + this.surface1FuncYString + ')' + '*' + '(' + this.surface1FuncScaleYString + ')' + '+' + '(' + this.surface1FuncTransYString + ')';
            this._surfaceFuncZString = '(' + this.surface1FuncZString + ')' + '*' + '(' + this.surface1FuncScaleZString + ')' + '+' + '(' + this.surface1FuncTransZString + ')';


            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncXString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncYString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncZString);

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

            this._surfaceFuncXString = '(' + surface0FuncXString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncXString + ')' + '*' + intrpl;
            this._surfaceFuncYString = '(' + surface0FuncYString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncYString + ')' + '*' + intrpl;
            this._surfaceFuncZString = '(' + surface0FuncZString + ')' + '*' + '(1.0 -' + intrpl + ')' + '+' + '(' + surface1FuncZString + ')' + '*' + intrpl;


            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncXString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncYString);
            this._surfaceFuncX =  new Function('u','v','t','m','bu','bv','return ' + this._surfaceFuncZString);

        }catch(e){}

        this._surfaceURange = [(this.surface0URange[0] + this.surface1URange[0]) * 0.5,(this.surface0URange[1] + this.surface1URange[1]) * 0.5];
        this._surfaceVRange = [(this.surface0VRange[0] + this.surface1VRange[0]) * 0.5,(this.surface0VRange[1] + this.surface1VRange[1]) * 0.5];

    }

    var surface = this._surface;
        surface.funcXString = this._surfaceFuncXString;
        surface.funcYString = this._surfaceFuncYString;
        surface.funcZString = this._surfaceFuncZString;
        surface.ur = this._surfaceURange;
        surface.vr = this._surfaceVRange;
    //this._surface.setFunctions(this._surfaceFuncX,this._surfaceFuncY,this._surfaceFuncZ,this._surfaceURange,this._surfaceVRange);
};

AudioGrapher.prototype.updateCameraFunc = function()
{
    try
    {
        this._cameraFuncX =  new Function('t','m','return ' + this.cameraFuncXString);
        this._cameraFuncY =  new Function('t','m','return ' + this.cameraFuncYString);
        this._cameraFuncZ =  new Function('t','m','return ' + this.cameraFuncZString);
    }
    catch (e){}
};

AudioGrapher.prototype.updateLight0WithPreset = function(index)
{

    var preset = this._lightPresets[index];

    this.light0FuncXString = preset.funcXString;
    this.light0FuncYString = preset.funcYString;
    this.light0FuncZString = preset.funcZString;

    this.light0Ambient  = preset.ambient;
    this.light0Diffuse  = preset.diffuse;
    this.light0Specular = preset.specular;

    this.light0FuncAttConString = preset.funcAttConString;
    this.light0FuncAttLinString = preset.funcAttLinString;
    this.light0FuncAttQuaString = preset.funcAttQuaString;

    this.updateLight0FuncAtt();
    this.updateLight0FuncPos();

};

AudioGrapher.prototype.updateLight1WithPreset = function(index)
{

    var preset = this._lightPresets[index];

    this.light1FuncXString = preset.funcXString;
    this.light1FuncYString = preset.funcYString;
    this.light1FuncZString = preset.funcZString;

    this.light1Ambient  = preset.ambient;
    this.light1Diffuse  = preset.diffuse;
    this.light1Specular = preset.specular;

    this.light1FuncAttConString = preset.funcAttConString;
    this.light1FuncAttLinString = preset.funcAttLinString;
    this.light1FuncAttQuaString = preset.funcAttQuaString;

    this.updateLight1FuncAtt();
    this.updateLight1FuncPos();
};

AudioGrapher.prototype.updateSurface0WithPreset = function(index)
{

    var preset = this._surfacePresets[index];

    this.surface0FuncXString = preset.funcXString;
    this.surface0FuncYString = preset.funcYString;
    this.surface0FuncZString = preset.funcZString;

    this.surface0FuncTransXString = preset.funcXTransString;
    this.surface0FuncTransYString = preset.funcYTransString;
    this.surface0FuncTransZString = preset.funcZTransString;

    this.surface0FuncScaleXString = preset.funcXScaleString;
    this.surface0FuncScaleYString = preset.funcYScaleString;
    this.surface0FuncScaleZString = preset.funcZScaleString;

    this.surface0URange = preset.uRange;
    this.surface0VRange = preset.vRange;

    this.updateSurfaceFunc();
};

AudioGrapher.prototype.updateSurface1WithPreset = function(index)
{

    var preset = this._surfacePresets[index];

    this.surface1FuncXString = preset.funcXString;
    this.surface1FuncYString = preset.funcYString;
    this.surface1FuncZString = preset.funcZString;

    this.surface1FuncTransXString = preset.funcXTransString;
    this.surface1FuncTransYString = preset.funcYTransString;
    this.surface1FuncTransZString = preset.funcZTransString;

    this.surface1FuncScaleXString = preset.funcXScaleString;
    this.surface1FuncScaleYString = preset.funcYScaleString;
    this.surface1FuncScaleZString = preset.funcZScaleString;

    this.surface1URange = preset.uRange;
    this.surface1VRange = preset.vRange;

    this.updateSurfaceFunc();
};

AudioGrapher.prototype.updateLight2WithPreset = function(index)
{

    var preset = this._lightPresets[index];

    this.light2FuncXString = preset.funcXString;
    this.light2FuncYString = preset.funcYString;
    this.light2FuncZString = preset.funcZString;

    this.light2Ambient  = preset.ambient;
    this.light2Diffuse  = preset.diffuse;
    this.light2Specular = preset.specular;

    this.light2FuncAttConString = preset.funcAttConString;
    this.light2FuncAttLinString = preset.funcAttLinString;
    this.light2FuncAttQuaString = preset.funcAttQuaString;

    this.updateLight2FuncAtt();
    this.updateLight2FuncPos();
};

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

AudioGrapher.prototype.onMouseMove = function(e)
{
    this.mouse._onMouseMove(e);
};
