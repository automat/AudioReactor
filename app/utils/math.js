/*
 *
 * math.js
 *
 * Created by henryk Wollik on 05.11.12.
 *
 */


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
    return 1-4*abs(0.5-frac(0.5*value+0.25));
}

//FIX
function rect(value)
{
    var a = abs(value);
    return (a > 0.5) ? 0 : (a == 0.5) ? 0.5 : (a < 0.5) ? 1 : -1;
}


function frac(value)
{
    return value - Math.floor(value);
}

function sgn(value)
{
    return value / abs(value);
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



function vec3Make()
{
    var v = new Float32Array([0,0,0]);

    if(arguments.length == 3)
    {
        v[0] = arguments[0];
        v[1] = arguments[1];
        v[2] = arguments[2];
    }

    return v;
}

function vec3Set(v,x,y,z)
{
    v[0] = x;
    v[1] = y;
    v[2] = z;

    return v;
}

function vec3SetVec3(v0,v1)
{
    v0[0] = v1[0];
    v0[1] = v1[1];
    v0[2] = v1[2];

    return v0;
}

function vec3Copy(v)
{
    return vec3SetVec3(vec3Make(),v);
}

function vec3Dot(v0,v1)
{
    return v0[0]*v1[0] + v0[1]*v1[1] + v0[2]*v1[2];
}

function vec3Cross(v0,v1)
{
    var x0 = v0[0],
        y0 = v0[1],
        z0 = v0[2],
        x1 = v1[0],
        y1 = v1[1],
        z1 = v1[2];

    return vec3Make(y0*z1-y1*z0,z0*x1-z1*x0,x0*y1-x1*y0);
}

function vec3Sub(v0,v1,t)
{
    t = t || v0;

    t[0] = v0[0] - v1[0];
    t[1] = v0[1] - v1[1];
    t[2] = v0[2] - v1[2];

    return t;
}

function vec3Add(v0,v1,t)
{
    t = t || v0;

    t[0] = v0[0] + v1[0];
    t[1] = v0[1] + v1[1];
    t[2] = v0[2] + v1[2];

    return t;
}

function vec3Length(v)
{
    var x = v[0],
        y = v[1],
        z = v[2];

    return Math.sqrt(x*x+y*y+z*z);
}

function vec3LengthSq(v)
{
    var x = v[0],
        y = v[1],
        z = v[2];

    return x*x+y*y+z*z;
}

function vec3Dist(v0,v1)
{
    return vec3Length(vec3Sub(v0,v1,vec3Make()));
}

function vec3Scale(v,s)
{
    v[0]*=s;
    v[1]*=s;
    v[2]*=s;

    return s;
}

function vec3Limit(v,limit)
{
    var lsq = vec3LengthSq(v);

    if((lsq > limit * limit) && (lsq > 0))
    {
        vec3Scale(v,limit / Math.sqrt(lsq));

    }

    return v;
}

function vec3Limited(v,limit)
{
    return vec3Limit(vec3Copy(v),limit);

}

function vec3Invert(v)
{
    return vec3Scale(v,-1);
}

function vec3Normalize(v)
{
    return vec3Scale(v,1/vec3Length(v));
}

function vec3Normalized(v)
{
    return vec3Scale(vec3Copy(v),1/vec3Length(v));
}





function vec4Make()
{
    var v = new Float32Array([0,0,0,1]);

    switch (arguments.length)
    {
        case 3:
            v[0] = arguments[0];
            v[1] = arguments[1];
            v[2] = arguments[2];
            break;
        case 4:
            v[0] = arguments[0];
            v[1] = arguments[1];
            v[2] = arguments[2];
            v[3] = arguments[3];
            break;
    }

    return v;
}

function vec4FromVec3(v)
{
    return vec4Set(vec4Make(),v[0],v[1],v[2],1.0);
}

function vec4Set(v,x,y,z,w)
{
    w = w || 1.0;
    v[0] = x;
    v[1] = y;
    v[2] = z;
    v[3] = w;

    return v;
}

function vec4SetVec4(v0,v1)
{
    v0[0] = v1[0];
    v0[1] = v1[1];
    v0[2] = v1[2];
    v0[3] = v1[3];

    return v0;
}

function vec4Length(v)
{
    var v0 = v[0],
        v1 = v[1],
        v2 = v[2],
        v3 = v[3];

    return Math.sqrt(v0*v0+v1*v1+v2*v2+v3*v3);
}

function vec4LengthSq(v)
{
    var v0 = v[0],
        v1 = v[1],
        v2 = v[2],
        v3 = v[3];

    return v0*v0 + v1*v1 + v2*v2 + v3*v3;
}

function vec4Norm(v)
{
    var l = 1/vec4Length(v);

    v[0]*=l;
    v[1]*=l;
    v[2]*=l;
    v[3]*=l;

    return v;
}


function vec4Copy(v)
{
    return vec4SetVec4(vec4Make(),v);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SX  0  0  0      0  1  2  3
//  0 SY  0  0      4  5  6  7
//  0  0 SZ  0      8  9 10 11
// TX TY TZ  1     12 13 14 15

function mat44Make()
{
    return new Float32Array([ 1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1 ]);
}

function mat44Identity(m)
{
    m[ 0] = 1; m[ 1] = m[ 2] = m[ 3] = 0;
    m[ 5] = 1; m[ 4] = m[ 6] = m[ 7] = 0;
    m[10] = 1; m[ 8] = m[ 9] = m[11] = 0;
    m[15] = 1; m[12] = m[13] = m[14] = 0;

    return m;
}

function mat44Scale(sx,sy,sz)
{
    var m = mat44Make();

    m[0]  = sx;
    m[5]  = sy;
    m[10] = sz;

    return m;

}

function mat44Translate(tx,ty,tz)
{
    var m = mat44Make();

    m[12] = tx;
    m[13] = ty;
    m[14] = tz;

    return m;
}

function mat44RotationX(a)
{
    var m = mat44Make();

    var sin = Math.sin(a),
        cos = Math.cos(a);

    m[5]  = cos;
    m[6]  = -sin;
    m[9]  = sin;
    m[10] = cos;

    return m;

}

function mat44RotationY(a)
{
    var m = mat44Make();

    var sin = Math.sin(a),
        cos = Math.cos(a);

    m[0] = cos;
    m[2] = sin;
    m[8] = -sin;
    m[10]= cos;

    return m;

}

function mat44RotationZ(a)
{
    var m = mat44Make();

    var sin = Math.sin(a),
        cos = Math.cos(a);

    m[0] = cos;
    m[1] = sin;
    m[4] = -sin;
    m[5] = cos;

    return m;
}

function mat44RotatationXYZ(ax,ay,az)
{
    var m = mat44Make();

    var cosx = Math.cos(ax),
        sinx = Math.sin(ax),
        cosy = Math.cos(ay),
        siny = Math.sin(ay),
        cosz = Math.cos(az),
        sinz = Math.sin(az);

    m[ 0] =  cosy*cosz;
    m[ 1] = -cosx*sinz+sinx*siny*cosz;
    m[ 2] =  sinx*sinz+cosx*siny*cosz;

    m[ 4] =  cosy*sinz;
    m[ 5] =  cosx*cosz+sinx*siny*sinz;
    m[ 6] = -sinx*cosz+cosx*siny*sinz;

    m[ 8] = -siny;
    m[ 9] =  sinx*cosy;
    m[10] =  cosx*cosy;


    return m;
}

function mat44RotationAroundAxis(axis,a)
{

}

function mat44Copy(m)
{
    return mat44SetMat44(mat44Make(),m);
}

function mat44SetMat44(m0,m1)
{
    m0[ 0] = m1[ 0];m0[ 1] = m1[ 1];m0[ 2] = m1[ 2];m0[ 3] = m1[ 3];
    m0[ 4] = m1[ 4];m0[ 5] = m1[ 5];m0[ 6] = m1[ 6];m0[ 7] = m1[ 7];
    m0[ 8] = m1[ 8];m0[ 9] = m1[ 9];m0[10] = m1[10];m0[11] = m1[11];
    m0[12] = m1[12];m0[13] = m1[13];m0[14] = m1[14];m0[15] = m1[15];

    return m0;
}

function mat44MultPre(m0,m1)
{
    var m = mat44Make();

    var m000 = m0[ 0],m001 = m0[ 1],m002 = m0[ 2],m003 = m0[ 3],
        m004 = m0[ 4],m005 = m0[ 5],m006 = m0[ 6],m007 = m0[ 7],
        m008 = m0[ 8],m009 = m0[ 9],m010 = m0[10],m011 = m0[11],
        m012 = m0[12],m013 = m0[13],m014 = m0[14],m015 = m0[15];

    var m100 = m1[ 0],m101 = m1[ 1],m102 = m1[ 2],m103 = m1[ 3],
        m104 = m1[ 4],m105 = m1[ 5],m106 = m1[ 6],m107 = m1[ 7],
        m108 = m1[ 8],m109 = m1[ 9],m110 = m1[10],m111 = m1[11],
        m112 = m1[12],m113 = m1[13],m114 = m1[14],m115 = m1[15];

    m[ 0] = m000*m100 + m001*m104 + m002*m108 + m003*m112;
    m[ 1] = m000*m101 + m001*m105 + m002*m109 + m003*m113;
    m[ 2] = m000*m102 + m001*m106 + m002*m110 + m003*m114;
    m[ 3] = m000*m103 + m001*m107 + m002*m111 + m003*m115;

    m[ 4] = m004*m100 + m005*m104 + m006*m108 + m007*m112;
    m[ 5] = m004*m101 + m005*m105 + m006*m109 + m007*m113;
    m[ 6] = m004*m102 + m005*m106 + m006*m110 + m007*m114;
    m[ 7] = m004*m103 + m005*m107 + m006*m111 + m007*m115;

    m[ 8] = m008*m100 + m009*m104 + m010*m108 + m011*m112;
    m[ 9] = m008*m101 + m009*m105 + m010*m109 + m011*m113;
    m[10] = m008*m102 + m009*m106 + m010*m110 + m011*m114;
    m[11] = m008*m103 + m009*m107 + m010*m111 + m011*m115;

    m[12] = m012*m100 + m013*m104 + m014*m108 + m015*m112;
    m[13] = m012*m101 + m013*m105 + m014*m109 + m015*m113;
    m[14] = m012*m102 + m013*m106 + m014*m110 + m015*m114;
    m[15] = m012*m103 + m013*m107 + m014*m111 + m015*m115;

    return m;
}

function mat44Mult(m0,m1)
{
    return mat44MultPre(m0,m1);
}

function mat44MultPost(m0,m1)
{
    return mat44MultPre(m1,m0);
}

function mat44Inverted(m)
{
    var inv = mat44Make();
    inv[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15]
        + m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    inv[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15]
        - m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    inv[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15]
        + m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    inv[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14]
        - m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    inv[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15]
        - m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    inv[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15]
        + m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    inv[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15]
        - m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    inv[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14]
        + m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    inv[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15]
        + m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    inv[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15]
        - m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    inv[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15]
        + m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    inv[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14]
        - m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    inv[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11]
        - m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    inv[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11]
        + m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    inv[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11]
        - m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    inv[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10]
        + m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];
    var det = m[0]*inv[0] + m[1]*inv[4] + m[2]*inv[8] + m[3]*inv[12];
    if( det == 0 )
    {
        return null;
    }
    det = 1.0 / det;
    var out = mat44Make();
    for( var i=0; i<16; ++i )
    {
        out[i] = inv[i] * det;
    }
    return out;
}

function mat44Transposed(a)
{
    var out = mat44Make();

    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];

    return out;
}

function mat44Str(m)
{
    return m[ 0] + ", " + m[ 1] + ", " + m[ 2] + ", " + m[ 3] + ", " +
        m[ 4] + ", " + m[ 5] + ", " + m[ 6] + ", " + m[ 7] + ", " +
        m[ 8] + ", " + m[ 9] + ", " + m[10] + ", " + m[11] + ", " +
        m[12] + ", " + m[13] + ", " + m[14] + ", " + m[15];
}

function mat33Make()
{
    var m =  new Float32Array([1,0,0,0,1,0,0,0,1]);
    return m;
}

function mat33FromMat44(m)
{
    var o = mat33Make();

    o[0] = m[0];
    o[1] = m[1];
    o[2] = m[2];
    o[3] = m[4];
    o[4] = m[5];
    o[5] = m[6];
    o[6] = m[8];
    o[7] = m[9];
    o[8] = m[10];

    return o;
}

function mat33Inversed(a)
{
    var out = mat44Make();

    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

    // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;

}

function mat33Transposed(m)
{
    var o = mat33Make();

    var a01 = m[1], a02 = m[2], a12 = m[5];
    m[1] = m[3];
    m[2] = m[6];
    m[3] = a01;
    m[5] = m[7];
    m[6] = a02;
    m[7] = a12;

    return o;
}

function mat44Perspective(m,fov,aspect,near,far)
{
    var f  = 1.0 / Math.tan(fov*0.5),
        nf = 1.0 / (near-far);

    m[0] = f / aspect;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = f;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = (2 * far * near) * nf;
    m[15] = 0;

    return m;

}

function mat44Frustum(m,left,right,bottom,top,near,far)
{
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);


    m[ 0] = (near * 2) * rl;
    m[ 1] = 0;
    m[ 2] = 0;
    m[ 3] = 0;
    m[ 4] = 0;
    m[ 5] = (near * 2) * tb;
    m[ 6] = 0;
    m[ 7] = 0;
    m[ 8] = (right + left) * rl;
    m[ 9] = (top + bottom) * tb;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = (far * near * 2) * nf;
    m[15] = 0;

    return m;

}

function mat44TransformedVec4(m,v)
{
    var c = vec4Copy(v),
        x = v[0],
        y = v[1],
        z = v[2],
        w = v[3];

    c[0] = m[ 0] * x + m[ 4] * y + m[ 8] * z + m[12] * w;
    c[1] = m[ 1] * x + m[ 5] * y + m[ 9] * z + m[13] * w;
    c[2] = m[ 2] * x + m[ 6] * y + m[10] * z + m[14] * w;
    c[3] = m[ 3] * x + m[ 7] * y + m[11] * z + m[15] * w;

    return c;
}

function mat44TransformedVec3(m,v)
{
    var c = vec3Copy(v),
        x = v[0],
        y = v[1],
        z = v[2];

    c[0] = m[ 0] * x + m[ 4] * y + m[ 8] * z + m[12];
    c[1] = m[ 1] * x + m[ 5] * y + m[ 9] * z + m[13];
    c[2] = m[ 2] * x + m[ 6] * y + m[10] * z + m[14];

    return c;
}



function mat44LookAt(m,eye,target,up)
{
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        targetx = target[0],
        tartety = target[1],
        targetz = target[2];

    if (Math.abs(eyex - targetx) < 0.000001 &&
        Math.abs(eyey - tartety) < 0.000001 &&
        Math.abs(eyez - targetz) < 0.000001) {
        return mat44Identity(m);
    }

    z0 = eyex - targetx;
    z1 = eyey - tartety;
    z2 = eyez - targetz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    m[ 0] = x0;
    m[ 1] = y0;
    m[ 2] = z0;
    m[ 3] = 0;
    m[ 4] = x1;
    m[ 5] = y1;
    m[ 6] = z1;
    m[ 7] = 0;
    m[ 8] = x2;
    m[ 9] = y2;
    m[10] = z2;
    m[11] = 0;
    m[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    m[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    m[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    m[15] = 1;

    return m;

}

function mat44Camera(px,py,pz)
{
    var cm = mat44Translate(px,py,pz);

    return cm;
}

function vec4TransformedByMat44(v,m)
{
    return mat44TransformedVec4(m,v);
}

function vec3TransformedByMat44(v,m)
{
    return mat44TransformedVec3(m,v);
}



