function AudioGrapher(div)
{
    this._glCanvas = document.createElement('canvas');

    this.gl = null;

    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var i = -1;
    while(++i<names.length)
    {
        try{this.gl = this._glCanvas.getContext(names[i],{ antialias:true});}
        catch(e){throw ("WebGL context could not be initialized");}
        if(this.gl){break;}
    }

    var gl = this.gl;

    this._vertexShader = this._loadShader(

        "attribute vec3 VertexPosition;" +
            "attribute vec3 VertexNormal;" +
            "attribute vec4 VertexColor;" +
            "attribute vec2 VertexUV;"+

            "varying vec4 vVertexPosition;" +
            "varying vec3 vVertexNormal;" +
            "varying vec4 vVertexColor;" +
            "varying vec2 vVertexUV;" +

            "varying vec4 vColor;" +

            "uniform mat4 ModelViewMatrix;" +
            "uniform mat4 ProjectionMatrix;" +

            "uniform float PointSize;" +

            "void main()" +
            "{" +

            "vVertexColor    = VertexColor;" +
            "vVertexNormal   = VertexNormal;" +
            "vVertexPosition = ModelViewMatrix * vec4(VertexPosition,1.0);" +
            "vVertexUV       = VertexUV;" +

            "gl_Position  = ProjectionMatrix * vVertexPosition;;" +
            "gl_PointSize = PointSize;" +
            "}"

        ,gl.VERTEX_SHADER);

    this._fragmentShader = this._loadShader(

        "precision mediump float;" +

            "varying vec4 vColor;" +

            "varying vec2 vVertexUV;" +
            "varying vec4 vVertexPosition;" +
            "varying vec4 vVertexColor;" +
            "varying vec3 vVertexNormal;" +

            "uniform float UseLighting;" +

            "struct Light " +
            "{" +
            "vec3  position;" +
            "vec3  colorAmbient;" +
            "vec3  colorDiffuse;" +
            "vec3  colorSpecular;" +
            "float shininess;" +
            "};" +

            "vec4 phongModel(vec4 vP, vec3 vN, vec4 vC, Light aLight) " +
            "{" +
            "vec3 s        = normalize(aLight.position - vP.xyz); " +
            "vec3 v        = normalize(-vP.xyz);" +
            "vec3 r        = reflect(-s, vN);" +
            "float sDotN   = max(dot(s, vN), 0.0);" +
            "vec3 ambient  = aLight.colorAmbient * vC.rgb;" +
            "vec3 diffuse  = aLight.colorDiffuse * vC.rgb * sDotN;" +
            "vec3 specular = (sDotN > 0.0) ? aLight.colorSpecular * pow(max(dot(r, v), 0.0), aLight.shininess) : vec3(0.0);" +
            "return vec4(ambient + diffuse + specular,vC.a);" +
            "}" +

            "uniform Light Lights;" +
            "uniform mat3 NormalMatrix;" +


            "void main() " +
            "{" +
            "vec3 tVertexNormal = (gl_FrontFacing ? -1.0 : 1.0) * normalize(NormalMatrix * vVertexNormal);" +
            "gl_FragColor = (UseLighting) * phongModel(vVertexPosition,tVertexNormal,vVertexColor,Lights) + (1.0-UseLighting) * vVertexColor;"+
            "}"

        ,gl.FRAGMENT_SHADER);

    var program = this._program = this._loadProgram(this._vertexShader,this._fragmentShader);

    gl.useProgram(program);

    this._aVertexPosition   = gl.getAttribLocation(program,"VertexPosition");
    this._aVertexNormal     = gl.getAttribLocation(program,"VertexNormal");
    this._aVertexColor      = gl.getAttribLocation(program,"VertexColor");
    this._aVertexUV         = gl.getAttribLocation(program,"VertexUV");

    this._uUseLighting      = gl.getUniformLocation(program,"UseLighting");

    this._uModelViewMatrix   = gl.getUniformLocation(program,"ModelViewMatrix");
    this._uPerspectiveMatrix = gl.getUniformLocation(program,"ProjectionMatrix");
    this._uNormalMatrix      = gl.getUniformLocation(program,"NormalMatrix");

    this._uPointSize         = gl.getUniformLocation(program,"PointSize");

    this._light0 = new AudioGrapher.Light().set([0,0,0],
                                                [26.0/255.0,52.0/255.0,38.0/255.0],
                                                [204.0/255.0,230.0/255.0,242.0/255.0],
                                                [140.0/255.0,217.0/255.0,115.0/255.0],2.0);

    this._light0.uPosition      = gl.getUniformLocation(program,"Lights.position");
    this._light0.uColorAmbient  = gl.getUniformLocation(program,"Lights.colorAmbient");
    this._light0.uColorDiffuse  = gl.getUniformLocation(program,"Lights.colorDiffuse");
    this._light0.uColorSpecular = gl.getUniformLocation(program,"Lights.colorSpecular");
    this._light0.uShininess     = gl.getUniformLocation(program,"Lights.shininess");

    this._abo  = gl.createBuffer();
    this._eabo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,        this._abo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this._eabo);

    gl.enableVertexAttribArray(this._aVertexPosition);
    gl.enableVertexAttribArray(this._aVertexNormal);
    gl.enableVertexAttribArray(this._aVertexColor);
    gl.enableVertexAttribArray(this._aVertexUV);

    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);

    this._enableLighting();

    this._POINTS         = gl.POINTS;
    this._LINES          = gl.LINES;
    this._LINE_LOOP      = gl.LINE_LOOP;
    this._TRIANGLES      = gl.TRIANGLES;
    this._TRIANGLE_FAN   = gl.TRIANGLE_FAN;
    this._TRIANGLE_STRIP = gl.TRIANGLE_STRIP;

    this._SIZE_OF_VERTEX = 3;
    this._SIZE_OF_NORMAL = 3;
    this._SIZE_OF_COLOR  = 4;
    this._SIZE_OF_UV     = 2;
    this._SIZE_OF_FACE   = 3;


    this._mModelView   = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    this._mPerspective = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    this._mNormal      = new Float32Array([1,0,0,0,1,0,0,0,1]);
    this._mTemp        = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    this._mArcBall     = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    this._mStack       = [];

    this._camLoc    = vec3Make(0,5,0);
    this._camTarget = vec3Make();
    this._camUp     = vec3Make(0,1,0);

    this._lighting = true;

    /*---------------------------------------------------------------------------------*/

    this.colorBg    = [13/255,67/255,79/255];
    this.enableGrid =  true;
    this.gridSize   = 20;
    this.gridColor  = [161/255,161/255,161/255];
    this.gridAlpha  = 0.09;

    this.lightEnabled       = true;
    this.lightColorAmbient  = [0.0,0.0,0.0];
    this.lightColorDiffuse  = [0.8,0.8,0.8];
    this.lightColorSpecular = [1.0,1.0,1.0];
    this.lightShininess     = 10.0;
    this.lightCubeRender    = false;
    this.lightRotate        = true;

    this.uvMaterial = true;

    this.cameraLocX = this._camLoc[0];
    this.cameraLocY = this._camLoc[1];
    this.cameraLocZ = this._camLoc[2];

    this.cameraAutoRotate = true;
    this.cameraZoom       = 1.0;
    this.cameraZoomMinMax = [-10.0,10.0];

    this.geomRender = true;
    this.normalRender = false;
    this.geomResX   = this.geomResY   = 100;

    this.presetTarget  = ['Sphere',
                          'Plane',
                          'Blobby Sphere',
                          'Drop',
                          'Jellyfish',
                          'Diffuse Plane'];

    this._presetValues = [{uRange:[-PI,PI],vRange:[0,2*PI],x:"cos(u)*cos(v)",y:"sin(u)",z:"cos(u)*sin(v)"},
                          {uRange:[-1,1],  vRange:[-1,1],  x:"u",y:"0",z:"v"},
                          {uRange:[-PI,PI],vRange:[0,2*PI],x:"cos(u)*cos(v)*(1+0.15*sin(u*5+10*t)*sin(v*5+10*t))",y:"sin(u)*(1+0.15*sin(u*5+10*t)*sin(v*5+10*t))",z:"cos(u)*sin(v)*(1+0.15*sin(u*5+10*t)*sin(v*5+10*t))"},
                          {uRange:[0,2],   vRange:[0,2*PI],x:"u*cos(v)",y:"exp(-u*u*2*sin(t))*(sin(2*PI*u+t*10) - u*cos(3*v+t*10))",z:"u*sin(v)"},
                          {uRange:[-PI,PI],vRange:[0,2*PI],x:"cos(u)*cos(v)",y:"sin(u)",z:"cos(u)*sin(v)",scaleX:'1+sin(u+t*4)*0.5+1',scaleY:'1+sin(u+t*4)*sin(v*10)*0.5+1',scaleZ:'1+sin(u+t*4)*0.5+1'},
                          {uRange:[-1,1],  vRange:[-1,1],  x:"u",y:"1",z:"v",scaleX:'-10+3*m',scaleY:'1+sin(bv*bu*20)*cos(v)',scaleZ:'10-3*m'}];

    this.uRangeTarget0 = [-Math.PI,Math.PI];
    this.vRangeTarget0 = [0,2*Math.PI];

    this.uRangeTarget1 = [-Math.PI,Math.PI];
    this.vRangeTarget1 = [0,2*Math.PI];

    /*---------------------------------------------------------------------------------*/

    this.functionXTarget0String = '';
    this.functionYTarget0String = '';
    this.functionZTarget0String = '';
    this.functionXTarget1String = '';
    this.functionYTarget1String = '';
    this.functionZTarget1String = '';

    this.functionXTarget0TranslateString = '0';
    this.functionYTarget0TranslateString = '0';
    this.functionZTarget0TranslateString = '0';
    this.functionXTarget1TranslateString = '0';
    this.functionYTarget1TranslateString = '0';
    this.functionZTarget1TranslateString = '0';

    this.functionXTarget0ScaleString = '1';
    this.functionYTarget0ScaleString = '1';
    this.functionZTarget0ScaleString = '1';
    this.functionXTarget1ScaleString = '1';
    this.functionYTarget1ScaleString = '1';
    this.functionZTarget1ScaleString = '1';

    this.functionXTarget0 = null;
    this.functionYTarget0 = null;
    this.functionZTarget0 = null;
    this.functionXTarget1 = null;
    this.functionYTarget1 = null;
    this.functionZTarget1 = null;

    this._functionXTarget0Base = null;
    this._functionYTarget0Base = null;
    this._functionZTarget0Base = null;
    this._functionXTarget1Base = null;
    this._functionYTarget1Base = null;
    this._functionZTarget1Base = null;

    this._magnitudeAvg    = 1;
    this._magnitudeBuffer0 = new Array(this.geomResX);
    this._magnitudeBuffer1 = new Array(this.geomResX);

    i = -1;while(++i<this.geomResX){this._magnitudeBuffer0[i]=this._magnitudeBuffer1[i]=0.0;}

    this.geomTarget0Target1Intrpl = 0.0;
    this.geomTarget0Target1IntrplMinMax = [0.0,1.0];

    /*---------------------------------------------------------------------------------*/

    this._bColorBg = new Float32Array([0.8,0.8,0.8,1.0]);
    this._bColor4f = new Float32Array([1,1,1,1]);
    this._bColor   = new Float32Array([1,1,1,1]);

    this._bVertexLine  = new Float32Array(2 * this._SIZE_OF_VERTEX);
    this._bColorLine   = new Float32Array(2 * this._SIZE_OF_COLOR);
    this._bVertexPoint = new Float32Array(    this._SIZE_OF_VERTEX);
    this._bColorPoint  = new Float32Array(    this._SIZE_OF_COLOR);
    this._bVertexRect  = new Float32Array(4 * this._SIZE_OF_VERTEX);
    this._bColorRect   = new Float32Array(4 * this._SIZE_OF_COLOR);
    this._bNormalRect  = new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]);

    this._bVertexCube  = new Float32Array([-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5,
                                           -0.5,-0.5,-0.5,-0.5, 0.5,-0.5, 0.5, 0.5,-0.5, 0.5,-0.5,-0.5,
                                           -0.5, 0.5,-0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,-0.5,
                                           -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5, 0.5,-0.5,-0.5, 0.5,
                                            0.5,-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5,
                                           -0.5,-0.5,-0.5,-0.5,-0.5, 0.5,-0.5, 0.5, 0.5,-0.5, 0.5,-0.5]);

    this._bColorCube   = new Float32Array( this._bVertexCube.length / this._SIZE_OF_VERTEX * this._SIZE_OF_COLOR);

    this._bNormalCube  = new Float32Array([ 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
                                            0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0,
                                            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
                                            0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0,
                                            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                                           -1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0,-1.0, 0.0, 0.0]);

    this._bIndexCube   = new Uint16Array([  0, 1, 2, 0, 2, 3,
                                            4, 5, 6, 4, 6, 7,
                                            8, 9,10, 8,10,11,
                                            12,13,14,12,14,15,
                                            16,17,18,16,18,19,
                                            20,21,22,20,22,23]);

    var uvResTotal = this.geomResX * this.geomResY;

    this._uvVertices = new Float32Array(uvResTotal * this._SIZE_OF_VERTEX);
    this._uvNormals  = new Float32Array(uvResTotal * this._SIZE_OF_NORMAL);
    this._uvColors   = new Float32Array(uvResTotal * this._SIZE_OF_COLOR);
    this._uvIndices  = [];

    this._uvShowNormalsVertices = new Float32Array(this._uvVertices.length*2);
    this._uvShowNormalsColors   = new Float32Array(this._uvShowNormalsVertices.length*2);

    this._timer = 0.0;


    /*---------------------------------------------------------------------------------*/

    this.width = this.height = 0;
    console.log(div.offsetHeight);

    this.setSize(window.innerWidth,window.innerHeight);

    this.setupSurface();
    this.applyParametricPresetTarget0(0);
    this.applyParametricPresetTarget1(1);

    div.appendChild(this._glCanvas);

    window.addEventListener('resize',function(){this.setSize(window.innerWidth,window.innerHeight)}.bind(this));
}

/*---------------------------------------------------------------------------------*/

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

AudioGrapher.prototype.update = function()
{
    this._timer+=0.01;

    this._clearColorAndDepthBuffer();
    this._resetBlendFunc();
    this._resetPointSize();
    this._loadIdentity();

    this._updateLight();

    if(this.cameraAutoRotate)
    {
        this._autoRotateCamera();
    }

    this._updateCamera();
    this._updateCameraMatrix();

    if(this.enableGrid)
    {
        this._disableLighting();
        this._drawGrid();
        this._enableLighting();
    }

    if(this.lightCubeRender)
    {
        this._drawLight();
    }

    this._applyPlotFunction();

    if(!this._pararmetricPlotFunctionIsValid())return;

    this._pushMatrix();
    this._updateSurfaceNormals();
    this._drawElements(this._uvVertices,
                       this._uvNormals,
                       this._uvColors,
                       null,
                       this._uvIndices,
                       this._TRIANGLES);

    if(this.normalRender)
    {
        this._showSurfaceNormals();
    }

    this._popMatrix();

};

AudioGrapher.prototype._applyPlotFunction = function()
{
    var uvResX = this.geomResX,
        uvResY = this.geomResY,
        uvResTotal = uvResX * uvResY;


    var uvVertices = this._uvVertices,
        uvColors   = this._uvColors;
    var index,indexVertices,indexColors;

    var iResX = 1 / (uvResX-1),
        iResY = 1 / (uvResY-1);

    var uRangeLower,uRangeUpper,
        vRangeLower,vRangeUpper;

    var funcX,funcY,funcZ;

    var i, j, u, v;

    var t = this._timer;

    var uvMaterial = this.uvMaterial;

    var intrpl    = this.geomTarget0Target1Intrpl,
        invIntrpl = 1.0 - intrpl;

    var temp0,temp1;

    var m = this._magnitudeAvg,
        b = this._magnitudeBuffer0;

    var bu,bv;

    if(intrpl == 0.0)
    {
        uRangeLower = this.uRangeTarget0[0] * 0.5;
        uRangeUpper = this.uRangeTarget0[1] * 0.5;
        vRangeLower = this.vRangeTarget0[0] * 0.5;
        vRangeUpper = this.vRangeTarget0[1] * 0.5;

        funcX = this.functionXTarget0;
        funcY = this.functionYTarget0;
        funcZ = this.functionZTarget0;

        temp0 = iResX * uRangeUpper;
        temp1 = iResY * vRangeUpper;

        i = -1;
        while(++i < uvResY)
        {
            j = -1;
            while(++j < uvResX)
            {
                index = (j     + uvResX * i) ;
                indexVertices = index * 3;

                u = uRangeLower + (j * temp0)*2;
                v = vRangeLower + (i * temp1)*2;

                bv = b[i];
                bu = b[j];

                uvVertices[indexVertices  ] = funcX(u,v,t,m,bu,bv);
                uvVertices[indexVertices+1] = funcY(u,v,t,m,bu,bv);
                uvVertices[indexVertices+2] = funcZ(u,v,t,m,bu,bv);

                if(uvMaterial)
                {
                    indexColors = index*4;

                    uvColors[indexColors  ] = uvVertices[indexVertices+1]*0.5;
                    uvColors[indexColors+1] = 0.0;
                    uvColors[indexColors+2] = 0.0;
                    uvColors[indexColors+3] = 1;

                }
            }
        }
    }
    else if(intrpl == 1.0)
    {
        uRangeLower = this.uRangeTarget1[0] * 0.5;
        uRangeUpper = this.uRangeTarget1[1] * 0.5;
        vRangeLower = this.vRangeTarget1[0] * 0.5;
        vRangeUpper = this.vRangeTarget1[1] * 0.5;

        funcX = this.functionXTarget1;
        funcY = this.functionYTarget1;
        funcZ = this.functionZTarget1;

        temp0 = iResX * uRangeUpper;
        temp1 = iResY * vRangeUpper;

        i = -1;
        while(++i < uvResY)
        {
            j = -1;
            while(++j < uvResX)
            {
                index = (j     + uvResX * i) ;
                indexVertices = index * 3;

                u = uRangeLower + (j * temp0)*2;
                v = vRangeLower + (i * temp1)*2;

                bv = b[i];
                bu = b[j];

                uvVertices[indexVertices  ] = funcX(u,v,t,m,bu,bv);
                uvVertices[indexVertices+1] = funcY(u,v,t,m,bu,bv);
                uvVertices[indexVertices+2] = funcZ(u,v,t,m,bu,bv);



                if(uvMaterial)
                {
                    indexColors = index*4;

                    uvColors[indexColors  ] = uvVertices[indexVertices+1]*0.5;
                    uvColors[indexColors+1] = 0.0;
                    uvColors[indexColors+2] = 0.0;
                    uvColors[indexColors+3] = 1;

                }
            }
        }

    }
    else
    {
        var uRangeLower0 = this.uRangeTarget0[0] * 0.5,
            uRangeUpper0 = this.uRangeTarget0[1] * 0.5,
            vRangeLower0 = this.vRangeTarget0[0] * 0.5,
            vRangeUpper0 = this.vRangeTarget0[1] * 0.5;

        var uRangeLower1 = this.uRangeTarget1[0] * 0.5,
            uRangeUpper1 = this.uRangeTarget1[1] * 0.5,
            vRangeLower1 = this.vRangeTarget1[0] * 0.5,
            vRangeUpper1 = this.vRangeTarget1[1] * 0.5;

        var funcX0 = this.functionXTarget0,
            funcY0 = this.functionYTarget0,
            funcZ0 = this.functionZTarget0;

        var funcX1 = this.functionXTarget1,
            funcY1 = this.functionYTarget1,
            funcZ1 = this.functionZTarget1;

        var temp2,temp3;

        temp0 = iResX * uRangeUpper0;
        temp1 = iResY * vRangeUpper0;
        temp2 = iResX * uRangeUpper1;
        temp3 = iResY * vRangeUpper1;

        i = -1;
        while(++i < uvResY)
        {
            j = -1;
            while(++j < uvResX)
            {
                index = (j     + uvResX * i) ;
                indexVertices = index * 3;

                u = (uRangeLower0 + (j * temp0)*2) * invIntrpl + (uRangeLower1 + (j * temp2)*2) * intrpl;
                v = (vRangeLower0 + (i * temp1)*2) * invIntrpl + (vRangeLower1 + (i * temp3)*2) * intrpl;

                bv = b[i];
                bu = b[j];

                uvVertices[indexVertices  ] = funcX0(u,v,t,m,bu,bv) * invIntrpl + funcX1(u,v,t,m,bu,bv) * intrpl;
                uvVertices[indexVertices+1] = funcY0(u,v,t,m,bu,bv) * invIntrpl + funcY1(u,v,t,m,bu,bv) * intrpl;
                uvVertices[indexVertices+2] = funcZ0(u,v,t,m,bu,bv) * invIntrpl + funcZ1(u,v,t,m,bu,bv) * intrpl;

                if(uvMaterial)
                {
                    indexColors = index*4;

                    uvColors[indexColors  ] = uvVertices[indexVertices+1]*0.5;
                    uvColors[indexColors+1] = 0.0;
                    uvColors[indexColors+2] = 0.0;
                    uvColors[indexColors+3] = 1;

                }
            }
        }
    }
};

AudioGrapher.prototype._pararmetricPlotFunctionIsValid = function()
{
    return !isNaN(this._uvVertices[0]) && !isNaN(this._uvVertices[1]) && !isNaN(this._uvVertices[2]);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype.setupSurface = function()
{
    var uvResX = this.geomResX,
        uvResY = this.geomResY,
        uvResTotal = uvResX * uvResY;

    var index,indexVertices,indexNormals,indexColors,indexIndices;

    var uvWidth  = 1 / (uvResX > 1 ? (uvResX - 1) : 1),
        uvHeight = 1 / (uvResY > 1 ? (uvResY - 1) : 1);

    var uvVertices = this._uvVertices,
        uvNormals  = this._uvNormals,
        uvColors   = this._uvColors,
        uvIndices  = this._uvIndices = [];

    var i,j;

    i = -1;
    while(++i < uvResY)
    {
        j = -1;
        while(++j < uvResX)
        {
            index = (j     + uvResX * i) ;
            indexVertices = index * 3;

            uvVertices[indexVertices  ] = (-0.5 + j * uvWidth);
            uvVertices[indexVertices+1] = 0;
            uvVertices[indexVertices+2] = (-0.5 + i * uvHeight);

            indexColors = index * 4;

            uvColors[indexColors  ] = 0.0;
            uvColors[indexColors+1] = 0.0;
            uvColors[indexColors+2] = 0.0;
            uvColors[indexColors+3] = 1;
        }
    }

    var a, b, c, d;

    i = -1;
    while(++i < uvResY -1)
    {
        j = -1;
        while(++j < uvResX -1)
        {
            a = j     + uvResX * i;
            b = (j+1) + uvResX * i;
            c = j     + uvResX * (i+1);
            d = (j+1) + uvResX * (i+1);

            uvIndices.push(a,b,c);
            uvIndices.push(b,d,c);
        }
    }

    this._uvIndices = new Uint16Array(this._uvIndices);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._updateSurfaceNormals = function()
{
    var uvIndices  = this._uvIndices,
        uvVertices = this._uvVertices,
        uvNormals  = this._uvNormals;

    var i;

    var a, b, c, d;

    var e2x,e2y,e2z,e1x,e1y,e1z,nox,noy,noz;

    var e1 = vec3Make(),
        e2 = vec3Make(),
        no = vec3Make();

    var nx,ny,nz,
        vbx,vby,vbz,
        a0,a1,a2,
        b0,b1,b2,
        c0,c1,c2;


    var n;
    i = 0;
    while(i < uvNormals.length)
    {
        uvNormals[i  ] = uvNormals[i+1] = uvNormals[i+2] = 0.0;
        i+=3;
    }

    i = 0;
    while(i < uvIndices.length)
    {
        a = uvIndices[i  ]*3;
        b = uvIndices[i+1]*3;
        c = uvIndices[i+2]*3;

        a0 = a;
        a1 = a+1;
        a2 = a+2;

        b0 = b;
        b1 = b+1;
        b2 = b+2;

        c0 = c;
        c1 = c+1;
        c2 = c+2;

        vbx = uvVertices[b0];
        vby = uvVertices[b1];
        vbz = uvVertices[b2];

        e1x = uvVertices[a0]-vbx;
        e1y = uvVertices[a1]-vby;
        e1z = uvVertices[a2]-vbz;

        e2x = uvVertices[c0]-vbx;
        e2y = uvVertices[c1]-vby;
        e2z = uvVertices[c2]-vbz;

        nx = e1y * e2z - e1z * e2y;
        ny = e1z * e2x - e1x * e2z;
        nz = e1x * e2y - e1y * e2x;

        uvNormals[a0] += nx;
        uvNormals[a1] += ny;
        uvNormals[a2] += nz;

        uvNormals[b0] += nx;
        uvNormals[b1] += ny;
        uvNormals[b2] += nz;

        uvNormals[c0] += nx;
        uvNormals[c1] += ny;
        uvNormals[c2] += nz;

        i+=3;

    }

};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._showSurfaceNormals = function()
{

    var uvVertices = this._uvVertices,
        uvNormals  = this._uvNormals;
    var nVertices  = this._uvShowNormalsVertices,
        nColors    = this._uvShowNormalsColors;

    this._color4f(1,1,1,1);

    var i = 0, j, k  =0, l = this._uvShowNormalsVertices.length;

    while(i < l)
    {
        j = i * 0.5;

        nVertices[i  ] = uvVertices[j  ];
        nVertices[i+1] = uvVertices[j+1];
        nVertices[i+2] = uvVertices[j+2];

        nVertices[i+3] = uvVertices[j  ] - uvNormals[j  ];
        nVertices[i+4] = uvVertices[j+1] - uvNormals[j+1];
        nVertices[i+5] = uvVertices[j+2] - uvNormals[j+2];

        k+=8;
        i+=6;
    }

    this._fillColorBuffer(this._bColor4f,nColors);
    this._drawArrays(nVertices,null,nColors,null,this._LINES,0,nVertices.length/3);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._autoRotateCamera = function()
{
    var t = this._timer;
    this.cameraLocX = cos(t);
    this.cameraLocZ = sin(t);
};

AudioGrapher.prototype._updateCamera = function()
{
    var zoom = this.cameraZoom;

    vec3Set(this._camLoc,this.cameraLocX * zoom,
                         this.cameraLocY * zoom,
                         this.cameraLocZ * zoom);
};

AudioGrapher.prototype._updateLight = function()
{
    var t = this._timer;

    var light0 = this._light0;

    var colorAmbient  = this.lightColorAmbient,
        colorDiffuse  = this.lightColorDiffuse,
        colorSpecular = this.lightColorSpecular,
        colorShininess = this.lightShininess;

    vec3Set(light0.colorAmbient, colorAmbient[0], colorAmbient[1], colorAmbient[2]);
    vec3Set(light0.colorDiffuse, colorDiffuse[0], colorDiffuse[1], colorDiffuse[2]);
    vec3Set(light0.colorSpecular,colorSpecular[0],colorSpecular[1],colorSpecular[2]);
    vec3Set(light0.position,cos(t),2*sin(t),sin(t));


    light0.shininesss = colorShininess;
    this._updateLightUniforms(light0);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._drawGrid = function()
{
    var i,l;
    i = -1;
    l = this.gridSize;
    var lh = l * 0.5;

    var color = this.gridColor,
        alpha = this.gridAlpha;

    this._color4f(color[0],color[1],color[2],alpha);

    this._pushMatrix();
    this._translate(0,-0.01,0);
    while(++i < l+1)
    {
        this._line([-lh,0,-lh + i,lh,0,-lh + i]);
        this._line([-lh+i,0,-lh,-lh+i,0,lh]);

    }
    this._popMatrix();
};

AudioGrapher.prototype._drawLight = function()
{
    var vector = this._light0.position,
        size   = 0.125;

    this._pushMatrix();
    this._translate(vector[0],vector[1],vector[2]);
    this._scale(size,size,size);
    this._drawElements(this._bVertexCube,this._bNormalCube,this._fillColorBuffer(this._bColor,this._bColorCube),null,this._bIndexCube,this._TRIANGLES);
    this._popMatrix();


    this._color4f(1,1,1,1);
    this._line([vector[0],vector[1],vector[2],0,0,0]);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._setPointSize = function(f)
{
    this.gl.uniform1f(this._uPointSize,f);
};

AudioGrapher.prototype._resetPointSize = function()
{
    this.gl.uniform1f(this._uPointSize,1.0);
};


AudioGrapher.prototype._enableLighting = function()
{
    this.gl.uniform1f(this._uUseLighting,1.0);
    this._lighting = true;
};

AudioGrapher.prototype._disableLighting = function()
{
    this.gl.uniform1f(this._uUseLighting,0.0);
    this._lighting = false;
};

AudioGrapher.prototype._updateLightUniforms = function(light)
{
    var gl = this.gl;

    gl.uniform3fv(light.uPosition,      light.position);
    gl.uniform3fv(light.uColorAmbient,  light.colorAmbient);
    gl.uniform3fv(light.uColorDiffuse,  light.colorDiffuse);
    gl.uniform3fv(light.uColorSpecular, light.colorSpecular);
    gl.uniform1f (light.uShininess,     light.shininesss);
};

/*---------------------------------------------------------------------------------*/


AudioGrapher.prototype._cube = function(vector,size)
{
    this._pushMatrix();
    this._translate(vector[0],vector[1],vector[2]);
    this._scale(size,size,size);
    this._drawElements(this._bVertexCube,this._bNormalCube,this._fillColorBuffer(this._bColor,this._bColorCube),null,this._bIndexCube,this._TRIANGLES);
    this._popMatrix();
};

AudioGrapher.prototype._line = function(vertices)
{
    var gl = this.gl;

    var v;

    if(vertices.length == 6)
    {
        v = this._bVertexLine;

        v[0] = vertices[0];
        v[1] = vertices[1];
        v[2] = vertices[2];
        v[3] = vertices[3];
        v[4] = vertices[4];
        v[5] = vertices[5];
    }
    else
    {
        v = new Float32Array(vertices);
    }

    this._drawArrays(v,null,this._fillColorBuffer(this._bColor,this._bColorLine),null,this._LINES,0,2);
};

AudioGrapher.prototype._rect = function(vector,width,height)
{
    var gl = this.gl;

    var xw = vector[0] + width,
        zh = vector[2] + height;

    var v = this._bVertexRect;

    v[ 0] = vector[0];
    v[ 1] = vector[1];
    v[ 2] = vector[2];
    v[ 3] = xw;
    v[ 4] = vector[1];
    v[ 5] = vector[2];
    v[ 6] = xw;
    v[ 7] = vector[1];
    v[ 8] = zh;
    v[ 9] = vector[0];
    v[10] = vector[1];
    v[11] = zh;

    this._drawArrays(v,null,this._fillColorBuffer(this._bColor,this._bColorRect),null,this._LINE_LOOP,0,4);
};

AudioGrapher.prototype._point = function(vector)
{
    var gl = this.gl;

    var v = this._bVertexPoint;

    v[0] = vector[0];
    v[1] = vector[1];
    v[2] = vector[2];

    this._drawArrays(v,null,this._fillColorBuffer(this._bColor,this._bColorPoint),null,this._POINTS,0,1);
};

AudioGrapher.prototype._drawPoint = function(loc,scale)
{
    this._pushMatrix();
    this._color4f(1,0,0,1);
    this._drawVector(loc,[1,0,0],scale);
    this._color4f(0,1,0,1);
    this._drawVector(loc,[0,1,0],scale);
    this._color4f(0,0,1,1);
    this._drawVector(loc,[0,0,1],scale);
    this._popMatrix();

};

AudioGrapher.prototype._drawVector = function(loc,vector,scale)
{
    this._line([loc[0],loc[1],loc[2],loc[0]+vector[0] * scale,loc[1]+vector[1] * scale,loc[2]+vector[2] * scale]);
};

/*---------------------------------------------------------------------------------*/


AudioGrapher.prototype._drawElements = function(vertices,normals,colors,uvs,indices,mode)
{
    mode = mode || this._TRIANGLES;

    this._fillArrayBuffer(vertices,normals,colors,uvs);
    this._setMatricesUniform();

    var gl = this.gl;
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.DYNAMIC_DRAW);
    gl.drawElements(mode,indices.length,gl.UNSIGNED_SHORT,0);

};

AudioGrapher.prototype._drawArrays = function(vertices,normals,colors,uvs,mode,first,count)
{
    this._fillArrayBuffer(vertices,normals,colors,uvs);
    this._setMatricesUniform();
    this.gl.drawArrays(mode,first,count);
};

AudioGrapher.prototype._fillArrayBuffer = function(vertexFloat32Array,normalFloat32Array,colorFloat32Array,uvFloat32Array)
{

    var na  = normalFloat32Array ? true : false,
        uva = uvFloat32Array     ? true : false;

    var gl            = this.gl,
        glArrayBuffer = gl.ARRAY_BUFFER,
        glFloat       = gl.FLOAT;

    var vblen   = vertexFloat32Array.byteLength,
        nblen   = na  ? normalFloat32Array.byteLength : 0,
        cblen   = colorFloat32Array.byteLength,
        uvablen = uva ? uvFloat32Array.byteLength : 0;

    var offsetV  = 0,
        offsetN  = offsetV + vblen,
        offsetC  = offsetN + nblen,
        offsetUV = offsetC + cblen;

    gl.bufferData(glArrayBuffer, vblen + nblen + cblen + uvablen, gl.DYNAMIC_DRAW);

    gl.bufferSubData(glArrayBuffer, offsetV,  vertexFloat32Array);
    gl.bufferSubData(glArrayBuffer, offsetN,  normalFloat32Array);
    gl.bufferSubData(glArrayBuffer, offsetC,  colorFloat32Array);
    gl.bufferSubData(glArrayBuffer, offsetUV, uvFloat32Array);

    var aVertexNormal = this._aVertexNormal,
        aVertexUV     = this._aVertexUV;

    if(!na) gl.disableVertexAttribArray(aVertexNormal); else gl.enableVertexAttribArray(aVertexNormal);
    if(!uva)gl.disableVertexAttribArray(aVertexUV);     else gl.enableVertexAttribArray(aVertexUV);

    gl.vertexAttribPointer(this._aVertexPosition, this._SIZE_OF_VERTEX, glFloat, false, 0, offsetV);
    gl.vertexAttribPointer(aVertexNormal,         this._SIZE_OF_NORMAL, glFloat, false, 0, offsetN);
    gl.vertexAttribPointer(this._aVertexColor,    this._SIZE_OF_COLOR,  glFloat, false, 0, offsetC);
    gl.vertexAttribPointer(aVertexUV,             this._SIZE_OF_UV,     glFloat, false, 0, offsetUV);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._colorv = function(v)
{
    this._bColor = v;
};

AudioGrapher.prototype._color4f = function(r,g,b,a)
{
    var c = this._bColor4f;

    c[0] = r;
    c[1] = g;
    c[2] = b;
    c[3] = a;

    this._bColor = c;
};

AudioGrapher.prototype._fillColorBuffer = function(color,buffer)
{
    var i = 0;

    if(color.length == 4)
    {
        while(i < buffer.length)
        {
            buffer[i]  =color[0];
            buffer[i+1]=color[1];
            buffer[i+2]=color[2];
            buffer[i+3]=color[3];
            i+=4;
        }
    }
    else
    {
        if(color.length != buffer.length)
        {
            throw ("Color array length not equal to number of vertices.");
        }

        while(i < buffer.length)
        {
            buffer[i]   = color[i];
            buffer[i+1] = color[i+1];
            buffer[i+2] = color[i+2];
            buffer[i+3] = color[i+3];
            i+=4;
        }
    }

    return buffer;
};

/*---------------------------------------------------------------------------------*/


AudioGrapher.prototype._updateCameraMatrix = function()
{
    this._mModelView = mat44LookAt(this._mModelView,this._camLoc, this._camTarget, this._camUp);
};

AudioGrapher.prototype._setMatricesUniform = function()
{
    this.gl.uniformMatrix4fv(this._uModelViewMatrix,   false,this._mModelView);
    this.gl.uniformMatrix4fv(this._uPerspectiveMatrix,false,this._mPerspective);

    if(!this._lighting)return;

    mat4.toInverseMat3(this._mModelView,this._mNormal);
    mat3.transpose(this._mNormal,this._mNormal);

    this.gl.uniformMatrix3fv(this._uNormalMatrix,false,this._mNormal);

};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._pushMatrix = function()
{
    this._mStack.push(mat44Copy(this._mModelView));
};

AudioGrapher.prototype._popMatrix = function()
{
    var s = this._mStack;

    if(s.length == 0)throw('Invalid pop!');

    this._mModelView = s.pop();

    return this._mModelView;
};

AudioGrapher.prototype._loadIdentity = function()
{
    mat44Identity(this._mModelView);
};

AudioGrapher.prototype._translate = function(x,y,z)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44Translate(x,y,z));
};

AudioGrapher.prototype._scale = function(x,y,z)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44Scale(x,y,z));
};

AudioGrapher.prototype._rotateX = function(a)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44RotationX(a));
};

AudioGrapher.prototype._rotateY = function(a)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44RotationY(a));
};

AudioGrapher.prototype._rotateZ = function(a)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44RotationZ(a));
};

AudioGrapher.prototype._rotateXYZ = function(ax,ay,az)
{
    this._mModelView = mat44MultPost(this._mModelView,mat44RotatationXYZ(ax,ay,az));
};


/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype.setSize = function(width,height)
{
    var glc = this._glCanvas;

    this.width  = width;
    this.height = height;

    glc.style.width  = width  + 'px';
    glc.style.height = height + 'px';
    glc.width        = width;
    glc.height       = height;

    var gl  = this.gl,
        bgc = this._bColorBg;

    gl.viewport(0,0,width,height);

    this._mPerspective = mat44Perspective(this._mPerspective,45,width/height,0.1,100.0);

    this._clearColorAndDepthBuffer();
};

AudioGrapher.prototype._resetBlendFunc = function()
{
    var gl = this.gl;
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
};

AudioGrapher.prototype._clearColorAndDepthBuffer = function()
{
    var gl  = this.gl,
        bgcfa = this._bColorBg,
        bgc   = this.colorBg;

    bgcfa[0] = bgc[0];
    bgcfa[1] = bgc[1];
    bgcfa[2] = bgc[2];
    bgcfa[3] = bgc[3];

    gl.clearColor(bgc[0],bgc[1],bgc[2],bgc[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype._loadShader = function(source,type)
{
    var gl = this.gl;
    var shader = gl.createShader(type);

    gl.shaderSource(shader,source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
    {
        console.log("Could not compile shader." + _CCC);
        gl.deleteShader(shader);
        shader = null;
    }


    return shader;
};

AudioGrapher.prototype._loadProgram = function(vertexShader,fragmentShader)
{
    var gl = this.gl;
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))
    {
        console.log("Could not link program.");
        gl.deleteProgram(program);
        program = null;
    }

    return program;
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.Light = function()
{
    this.position      = new Float32Array([0,0,0]);
    this.colorAmbient  = new Float32Array([0,0,0]);
    this.colorDiffuse  = new Float32Array([0,0,0]);
    this.colorSpecular = new Float32Array([0,0,0]);
    this.shininesss    = 8.0;

    this.uPosition      = null;
    this.uColorAmbient  = null;
    this.uColorDiffuse  = null;
    this.uColorSpecular = null;
    this.uShininess     = null;
};

AudioGrapher.Light.prototype.set = function(position,colorAmbient,colorDiffuse,colorSpecular,shininess)
{
    vec3SetVec3(this.position,position);
    vec3SetVec3(this.colorAmbient,colorAmbient);
    vec3SetVec3(this.colorDiffuse,colorDiffuse);
    vec3SetVec3(this.colorSpecular,colorSpecular);
    this.shininesss = shininess;

    return this;
};

/*---------------------------------------------------------------------------------*/

AudioGrapher.prototype.applyParametricPresetTarget0 = function(index)
{
    var presetValues = this._presetValues[index];

    this.uRangeTarget0                   = presetValues.uRange;
    this.vRangeTarget0                   = presetValues.vRange;
    this.functionXTarget0String          = presetValues.x;
    this.functionYTarget0String          = presetValues.y;
    this.functionZTarget0String          = presetValues.z;


    this.functionXTarget0TranslateString = presetValues.translateX || '0';
    this.functionYTarget0TranslateString = presetValues.translateY || '0';
    this.functionZTarget0TranslateString = presetValues.translateZ || '0';
    this.functionXTarget0ScaleString     = presetValues.scaleX     || '1';
    this.functionYTarget0ScaleString     = presetValues.scaleY     || '1';
    this.functionZTarget0ScaleString     = presetValues.scaleZ     || '1';


    this.updateParametricFunction0();
};

AudioGrapher.prototype.updateParametricFunction0 = function()
{
    var scaleX = this.functionXTarget0ScaleString != '' ? ('*(' + this.functionXTarget0ScaleString +')'): '',
        scaleY = this.functionYTarget0ScaleString != '' ? ('*(' + this.functionYTarget0ScaleString +')'): '',
        scaleZ = this.functionZTarget0ScaleString != '' ? ('*(' + this.functionZTarget0ScaleString +')'): '';

    var translationX = this.functionXTarget0TranslateString != '' ? '+' + this.functionXTarget0TranslateString : '',
        translationY = this.functionYTarget0TranslateString != '' ? '+' + this.functionYTarget0TranslateString : '',
        translationZ = this.functionZTarget0TranslateString != '' ? '+' + this.functionZTarget0TranslateString : '';

    this._setParametricFunctionTarget0('(' + this.functionXTarget0String + ')' + scaleX + translationX,
                                       '(' + this.functionYTarget0String + ')' + scaleY + translationY,
                                       '(' + this.functionZTarget0String + ')' + scaleZ + translationZ);



};

AudioGrapher.prototype.applyParametricPresetTarget1 = function(index)
{
    var presetValues = this._presetValues[index];

    this.uRangeTarget1                   = presetValues.uRange;
    this.vRangeTarget1                   = presetValues.vRange;
    this.functionXTarget1String          = presetValues.x;
    this.functionYTarget1String          = presetValues.y;
    this.functionZTarget1String          = presetValues.z;

    this.functionXTarget1TranslateString = presetValues.translateX || '0';
    this.functionYTarget1TranslateString = presetValues.translateY || '0';
    this.functionZTarget1TranslateString = presetValues.translateZ || '0';
    this.functionXTarget1ScaleString     = presetValues.scaleX     || '1';
    this.functionYTarget1ScaleString     = presetValues.scaleY     || '1';
    this.functionZTarget1ScaleString     = presetValues.scaleZ     || '1';


    this.updateParametricFunction1();
};

AudioGrapher.prototype.updateParametricFunction1 = function()
{
    var scaleX       = this.functionXTarget1ScaleString     != '' ? ('*(' + this.functionXTarget1ScaleString +')') : '',
        scaleY       = this.functionYTarget1ScaleString     != '' ? ('*(' + this.functionYTarget1ScaleString +')') : '',
        scaleZ       = this.functionZTarget1ScaleString     != '' ? ('*(' + this.functionZTarget1ScaleString +')') : '';
    var translationX = this.functionXTarget1TranslateString != '' ? '+' + this.functionXTarget1TranslateString    : '',
        translationY = this.functionYTarget1TranslateString != '' ? '+' + this.functionYTarget1TranslateString    : '',
        translationZ = this.functionZTarget1TranslateString != '' ? '+' + this.functionZTarget1TranslateString    : '';

    this._setParametricFunctionTarget1('(' + this.functionXTarget1String + ')' + scaleX + translationX,
                                       '(' + this.functionYTarget1String + ')' + scaleY + translationY,
                                       '(' + this.functionZTarget1String + ')' + scaleZ + translationZ);

};

AudioGrapher.prototype._setParametricFunctionTarget0 = function(fx,fy,fz)
{
    try{this.functionXTarget0 = new Function('u','v','t','m','bu','bv','return ' + fx );}catch(e){}
    try{this.functionYTarget0 = new Function('u','v','t','m','bu','bv','return ' + fy );}catch(e){}
    try{this.functionZTarget0 = new Function('u','v','t','m','bu','bv','return ' + fz );}catch(e){}
};

AudioGrapher.prototype._setParametricFunctionTarget1 = function(fx,fy,fz)
{
    try{this.functionXTarget1 = new Function('u','v','t','m','bu','bv','return ' + fx +';');}catch(e){}
    try{this.functionYTarget1 = new Function('u','v','t','m','bu','bv','return ' + fy +';');}catch(e){}
    try{this.functionZTarget1 = new Function('u','v','t','m','bu','bv','return ' + fz +';');}catch(e){}
};

/*---------------------------------------------------------------------------------*/