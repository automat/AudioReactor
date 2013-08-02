self.addEventListener('message',function(e)
{
    var data    = e.data;

    var vertices    = data[0],
        normals     = data[1];

    var funcXString = data[2],
        funcYString = data[3],
        funcZString = data[4];

    var funcX,funcY,funcZ;

    try
    {
        funcX = new Function('u','v','t','m','bu','bv','return ' + funcXString);
        funcY = new Function('u','v','t','m','bu','bv','return ' + funcYString);
        funcZ = new Function('u','v','t','m','bu','bv','return ' + funcZString);

    }catch(e){}



    var ur = data[5],
        vr = data[6];

    var urLower = ur[0],
        urUpper = ur[1],
        vrLower = vr[0],
        vrUpper = vr[1];

    var size = data[7];

    var i, j, u, v;

    var index, indexVertices;

    var temp0 = urUpper - urLower,
        temp1 = vrUpper - vrLower,
        temp2 = size - 1;

    var bu,bv;

    var buffer = data[8],
        m      = data[9],
        t      = data[10];

    try
    {
        i = -1;
        while(++i < size)
        {
            j = -1;
            while(++j < size)
            {
                index = (j + size * i);
                indexVertices = index * 3;

                u = (urLower + temp0 * (j / temp2));
                v = (vrLower + temp1 * (i / temp2));

                bu = buffer[j];
                bv = buffer[i];

                vertices[indexVertices    ] = funcX(u,v,t,m,bu,bv);
                vertices[indexVertices + 1] = funcY(u,v,t,m,bu,bv);
                vertices[indexVertices + 2] = funcZ(u,v,t,m,bu,bv);
            }
        }

    }catch(e){}



    postMessage([vertices,normals]);


},false);

var PI         = Math.PI,
    HALF_PI    = Math.PI * 0.5,
    QUARTER_PI = Math.PI*0.25;
TWO_PI     = Math.PI * 2;

var EPSILON = 0.0001;

function lerp(a,b,v)
{
    return (a*v)+(b*(1-v));
}

function stepSmooth(n)
{
    return n*n*(3-2*n);
}

function stepSmoothSquared(n)
{
    return stepSmooth(n)*stepSmooth(n);
}

function stepSmoothInvSquared(n)
{
    return 1-(1-stepSmooth(n))*(1-stepSmooth(n));
}

function stepSmoothCubed(n)
{
    return stepSmooth(n)*stepSmooth(n)*stepSmooth(n)*stepSmooth(n);
}

function stepSmoothInvCubed(n)
{
    return 1-(1-stepSmooth(n))*(1-stepSmooth(n))*(1-stepSmooth(n))*(1-stepSmooth(n));
}

function stepSquared(n)
{
    return n*n;
}

function stepInvSquared(n)
{
    return 1-(1-n)*(1-n);
}

function stepCubed(n)
{
    return n*n*n*n;
}

function stepInvCubed(n)
{
    return 1-(1-n)*(1-n)*(1-n)*(1-n);
}

function catmullrom(v,p0,p1,p2,p3)
{
    return 0.5 * ((2 * p1) + (-p0 + p2) * v + (2 * p0 - 5 * p1 + 4 * p2 - p3) * v * v + (-p0 + 3 * p1 - 3 * p2 + p3) * v * v *v);
}

function randomFloat()
{
    var r;

    switch (arguments.length)
    {
        case 0:
            r = Math.random();
            break;
        case 1:
            r = Math.random() * arguments[0];
            break;
        case 2:
            r = arguments[0] + (arguments[1]-arguments[0]) * Math.random();
            break;
    }

    return r;
}

function randomInteger()
{
    var r;

    switch (arguments.length)
    {
        case 0:
            r =  0.5 + Math.random();
            break;
        case 1:
            r = 0.5 + Math.random()*arguments[0];
            break;
        case 2:
            r = arguments[0] + ( 1 + arguments[1] - arguments[0]) * Math.random();
            break;

    }

    return Math.floor(r);
}

function constrain()
{
    var r;

    switch (arguments.length)
    {
        case 2:
            arguments[0] = (arguments[0] > arguments[1]) ? arguments[1] : arguments[0];
            break;
        case 3:
            arguments[0] = (arguments[0] > arguments[2]) ? arguments[2] :
                (arguments[0] < arguments[1]) ? arguments[1] :
                    arguments[0];
            break;
    }

    return arguments[0];
}

function normalize(value,start,end)
{
    return (value - start) / (end - start);
}

function rect(value)
{
    var a = Math.abs(value);
    return (a > 0.5) ? 0 : (a == 0.5) ? 0.5 : (a < 0.5) ? 1 : -1;
}

function map(value,inStart,inEnd,outStart,outEnd)
{
    return outStart + (outEnd - outStart) * normalize(value,inStart,inEnd);
}

function sin(value)
{
    return Math.sin(value);
}

function cos(value)
{
    return Math.cos(value);
}

function saw(value)
{
    return 2 * (value  - Math.floor(0.5 + value ));
}

function tri(value)
{
    return 1-4*Math.abs(0.5-frac(0.5*value+0.25));
}


function frac(value)
{
    return value - Math.floor(value);
}

function sgn(value)
{
    return value / Math.abs(value);
}


function abs(x)
{
    return Math.abs(x);
}

function min(x)
{
    return Math.min(x);
}

function max(x)
{
    return Math.max(x);
}

function atan(x)
{
    return Math.atan(x);
}

function atan2(y,x)
{
    return Math.atan2(y,x);
}

function round(x)
{
    return Math.round(x);
}

function floor(x)
{
    return Math.floor(x);
}

function tan(x)
{
    return Math.tan(x);
}

function rad2deg(radians)
{
    return radians * (180 / PI);
}

function deg2rad(degree)
{
    return degree * (PI / 180);
}

function sqrt(x)
{
    return Math.sqrt(x);
}

function GreatestCommonDivisor(a,b)
{
    return (b == 0) ? a : GreatestCommonDivisor(b, a % b)
}

function isFloatEqual(a,b)
{
    return (Math.abs(a-b) < EPSILON);
}

function isPowerOfTwo(a)
{
    return (a&(a-1))==0;
}

function swap(a,b)
{
    var t = a;a = b;b = a;
}

function pow(x,y)
{
    return Math.pow(x,y);
}

function log(x)
{
    return Math.log(x);
}

function cosh(x)
{
    return (Math.pow(Math.E,x) + Math.pow(Math.E,-x))*0.5;
}

function exp(x)
{
    return Math.exp(x);
}
