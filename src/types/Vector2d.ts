

export interface Vector2d 
{
    // indexer means that only an array subclass can be a Vector2d...
    [position: number]: number;
    
    // implement these as get/set
    x: number;
    y: number;

    Length(): number;
    LengthSquared(): number;

    clone();

    // these *modify* the Vector2d, and end with "return this;"
    addv(b) : Vector2d;
    subv(b) : Vector2d;
    mulf(s) : Vector2d;
    divf(s) : Vector2d;
}




export class Vector2dBase extends Array<number> 
{
    // implement methods for Array here
    public constructor(x, y) {
        super(2);
        this[0] = x; this[1] = y;
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

}




export class Vector2dValue extends Vector2dBase implements Vector2d 
{
    clone() {
        return new Vector2dValue(this[0],this[1]);
    }

    sumv(b): Vector2d {
        return new Vector2dValue(this[0]+b[0], this[1]+b[1]);
    }

    addv(b) : Vector2d {
        this[0] += b[0];
        this[1] += b[1];
        return this;
    }

    subv(b) : Vector2d {
        this[0] -= b[0];
        this[1] -= b[1];
        return this;
    }    

    mulf(f) : Vector2d {
        this[0] *= f;
        this[1] *= f;
        return this;
    }

    divf(f) : Vector2d {
        this[0] /= f;
        this[1] /= f;
        return this;
    }    
}






export class Vector2dConstant extends Vector2dBase implements Vector2d 
{
    clone() {
        return new Vector2dConstant(this[0],this[1]);
    }

    sumv(b): Vector2d {
        throw "called Add on constant!";
    }

    addv(b) : Vector2d {
        throw "called AddTo on constant!";
    }
    subv(b) : Vector2d {    
        throw "called AddTo on constant!";
    }
    mulf(f) : Vector2d {
        throw "called AddTo on constant!";
    }    
    divf(f) : Vector2d {
        throw "called AddTo on constant!";
    }      
}

