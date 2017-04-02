
import { Polygon2d } from "./Polygon2d";
import { AxisAlignedBox2d } from "../types/AxisAlignedBox2d";

export interface GeneralPolygon2d
{
    Outer: Polygon2d;
    Holes: Polygon2d[];
    readonly OuterIsClockwise: boolean;

    AddHole(hole: Polygon2d);
    readonly HasHoles: boolean;

    readonly Area: number;
    readonly Perimeter: number;

    readonly Bounds: AxisAlignedBox2d;
}


export class g3GeneralPolygon2d implements GeneralPolygon2d
{
    private outer: Polygon2d;
    public Holes: Polygon2d[];
    public OuterIsClockwise: boolean;
    
    constructor() {
        this.Holes = [];
    }


    get Outer() : Polygon2d {
        return this.outer;
    }
    set Outer(p: Polygon2d) {
        this.outer = p;
        this.OuterIsClockwise = p.IsClockwise;
    }


    AddHole( hole: Polygon2d, bCheck: boolean = true) {
        if ( this.outer == null )
            throw "GeneralPolygon2d.AddHole: outer polygon not set!";
        
        // need to implement these functions
        // if ( bCheck ) {
        //     if ( this.outer.Contains(hole) == false )
        //         throw "GeneralPolygon2d.AddHole: outer does not contain hole!";

        //     // [RMS] segment/segment intersection broken?
        //     for ( let hole1 in this.holes ) {
        //         if ( hole.Intersects(hole2) )
        //             throw "GeneralPolygon2D.AddHole: new hole intersects existing hole!";
        //     }
        // }

        let holecw = hole.IsClockwise;
        if ( this.OuterIsClockwise == holecw )
            throw "GeneralPolygon2D.AddHole: new hole has same orientation as outer polygon!";

        this.Holes.push(hole);
    }


    get HasHoles() : boolean {
        return this.Holes.length > 0;
    }

    get Area() : number {
        let sign = (this.OuterIsClockwise) ? -1.0 : 1.0;
        let dArea = sign * this.outer.SignedArea;
        for ( let i = 0; i < this.Holes.length; ++i ) {
            dArea += sign * this.Holes[i].SignedArea;
        }
        return dArea;
    }

    get Perimeter() : number {
        let perim = this.outer.Perimeter;
        for ( let i = 0; i < this.Holes.length; ++i ) {
            perim += this.Holes[i].Perimeter;
        }
        return perim;
    }

    get Bounds() : AxisAlignedBox2d {
        let box = this.outer.Bounds;
        for ( let i = 0; i < this.Holes.length; ++i ) {
            box.ContainBox( this.Holes[i].Bounds );
        }
        return box;
    }

}