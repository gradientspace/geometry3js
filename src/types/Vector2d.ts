

/**
 * Basic 2d-vector interface. Wherever possible, functions that just
 * need to access .x and .y should take this interface instead of Vector2d.
 * Then you can call it with {x: , y: } syntax, as well as any other object
 * that provides .x and .y (including via a get/set)
 */
export interface IVector2d
{
    x: number;
    y: number;   
}


export interface ICopyableVector2d extends IVector2d
{
    clone(); 
}

/**
 * This is the "full" Vector2d, that has all the various functions
 */
export interface Vector2d extends ICopyableVector2d
{
    // these are the standard Vector2d functions that
    // mirror other geometry3 libraries
    Length(): number;
    LengthSquared(): number;

    // these are the weird things we have to do in javascript!
    at(i: number) : number;

    // these *modify* the Vector2d, and end with "return this;"
    set(b: IVector2d) : Vector2d;
    addv(b: IVector2d) : Vector2d;
    subv(b: IVector2d) : Vector2d;
    mulf(s: number) : Vector2d;
    divf(s: number) : Vector2d;
}



/**
 * "Normal" implementation of Vector2d, has .x and .y properties
 */
export class g3Vector2d implements Vector2d
{
    x: number;
    y: number;

    // implement methods for Array here
    public constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() : string {
        return "[" + this.x + "," + this.y + "]";
    }

    clone() {
        return new g3Vector2d(this.x, this.y);
    }

    Length() : number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    LengthSquared() : number {
        return this.x*this.x + this.y*this.y;
    }

    at(i: number) : number {
        return (i == 0) ? this.x : this.y;
    }

    set(b: IVector2d) : Vector2d {
        this.x = b.x;
        this.y = b.y;
        return this;
    }

    addv(b: IVector2d) : Vector2d {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    subv(b: IVector2d) : Vector2d {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }    

    mulf(f: number) : Vector2d {
        this.x *= f;
        this.y *= f;
        return this;
    }

    divf(f: number) : Vector2d {
        this.x /= f;
        this.y /= f;
        return this;
    }  

}




/**
 * This is a Vector2d that provides an indexing interface,
 * ie v[0], v[1]. It does this by subclassing Array.
 * setter/getters are used to provide .x and .y.
 * This is *much* slower than a class with .x and .y properties, unfortunately.
 * However some algorithms are much easier to code with indices!!
 */
export class IndexedVector2d extends Array<number> implements Vector2d
{
    // implement methods for Array here
    public constructor(x, y) {
        super(2);
        this[0] = x; this[1] = y;
    }

    clone() {
        return new IndexedVector2d(this[0],this[1]);
    }

    get x() : number {
        return this[0];
    }
    set x(f : number) {
        this[0] = f;
    }

    get y() : number {
        return this[1];
    }
    set y(f : number) {
        this[1] = f;
    }

    Length() : number {
        return Math.sqrt(this[0]*this[0] + this[1]*this[1]);
    }
    LengthSquared() : number {
        return this[0]*this[0] + this[1]*this[1];
    }

    at(i: number) : number {
        return this[i];
    }

    set(b: IVector2d) : Vector2d {
        this[0] = b.x;
        this[1] = b.y;
        return this;
    }

    addv(b: IVector2d) : Vector2d {
        this[0] += b.x;
        this[1] += b.y;
        return this;
    }

    subv(b: IVector2d) : Vector2d {
        this[0] -= b[0];
        this[1] -= b[1];
        return this;
    }    

    mulf(f: number) : Vector2d {
        this[0] *= f;
        this[1] *= f;
        return this;
    }

    divf(f: number) : Vector2d {
        this[0] /= f;
        this[1] /= f;
        return this;
    }    
}







/**
 * This is a Vector2d to use for constants. unfortunately
 * javascript really doesn't support this kind of thing very well!
 * We throw exceptions so that hopefully you can find the problems in your code.
 */
export class Vector2dConstant implements ICopyableVector2d
{
    private readonly xx: number;
    private readonly yy: number;

    // implement methods for Array here
    public constructor(x, y) {
        this.xx = x;
        this.yy = y;
    }

    toString() : string {
        return "[" + this.xx + "," + this.yy + "]";
    }

    clone() {
        return new g3Vector2d(this.xx, this.yy);
    }

    get x() : number {
        return this.xx;
    }
    set x(f : number) {
        throw "called x= on constant!";
    }

    get y() : number {
        return this.yy;
    }
    set y(f : number) {
        throw "called y= on constant!";
    }   
}

