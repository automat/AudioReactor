function Surface(size)
{
    GLKit.ParametricSurface.apply(this,arguments);
}

Surface.prototype = Object.create(GLKit.ParametricSurface.prototype);