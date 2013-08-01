function Surface(size)
{
    GLKit.ParametricSurface.apply(this,arguments);
}

Surface.prototype = Object.create(GLKit.ParametricSurface.prototype);



GLKit.ParametricSurface.prototype.applyFunctions = function()
{
    var bu = new Array(this.size),
        bv = new Array(this.size);

    var i = -1;
    while(++i < this.size){bu[i] = bv[i] = 0.0;}

    this.applyFunctionsWithArgs(0,0,bv,bu);
};

GLKit.ParametricSurface.prototype.applyFunctionsWithArgs = function(t,m,bu,bv)
{
    var size  = this.size;

    var funcX = this.funcX,
        funcY = this.funcY,
        funcZ = this.funcZ;

    var urLower = this.ur[0],
        urUpper = this.ur[1],
        vrLower = this.vr[0],
        vrUpper = this.vr[1];

    var i, j, u, v;

    var vertices = this.vertices;

    var index,indexVertices;

    var temp0 = urUpper - urLower,
        temp1 = vrUpper - vrLower,
        temp2 = size - 1;

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

            vertices[indexVertices    ] = funcX(u,v,t,m,bu,bv);
            vertices[indexVertices + 1] = funcY(u,v,t,m,bu,bv);
            vertices[indexVertices + 2] = funcZ(u,v,t,m,bu,bv);
        }
    }
};