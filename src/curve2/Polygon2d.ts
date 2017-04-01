import {IVector2d, Vector2d} from "../types/Vector2d";
import MathUtil from "../util/MathUtil"
import * as g3 from "../g3";


export interface Polygon2d
{
    VertexCount() : number;
    GetVertex(index: number) : Vector2d;
    SetVertex(index: number, value: Vector2d);

    Start() : Vector2d;
    End() : Vector2d;

    AppendVertex(v : IVector2d);
    AppendArray(v: Array<number>);

    Reverse();
    SignedArea() : number;
    IsClockwise() : boolean;
    Perimeter() : number;
    ContainsPoint(vTest : IVector2d) : boolean;
}


export class DefaultPolygon2d implements Polygon2d
{
    vertices: Vector2d[];
    Timestamp: number;

    constructor(count: number = 0) {
        this.vertices = new Array<Vector2d>(count);
        this.Timestamp = 0;
    }

    VertexCount() : number {
        return this.vertices.length;
    }

    GetVertex(index: number) : Vector2d {
        return this.vertices[index].clone();
    }
    SetVertex(index: number, value: Vector2d) {
        let p = this.vertices[index];
        p.x = value.x; p.y = value.y;
        this.Timestamp++;
    }

    Start() : Vector2d {
        return this.vertices[0].clone();
    }
    End() : Vector2d {
        return this.vertices[this.vertices.length - 1].clone();
    }

    AppendVertex(v : IVector2d) {
        this.vertices.push( g3.Vector2d(v.x, v.y) );
    }  

    AppendArray(v: Array<number>) {
        if ( v.length % 2 != 0) {
            throw "Polygon2d.Append: array size is not even";
        }
        let N = v.length / 2;
        for (let i = 0; i < N; ++i ) {
            this.vertices.push( g3.Vector2d(v[2*i], v[2*i+1] ) );
        }
    }

    Reverse() {
        this.vertices.reverse();
        this.Timestamp++;
    }


    // GetTangent()
    // GetBounds()


    SignedArea() : number {
        let fArea = 0;
        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let j = (i+1) % N;
            let v1 = this.vertices[i];
            let v2 = this.vertices[j];
            fArea += v1.x * v2.y - v1.y * v2.x;
        }
        return fArea / 2;	        
    }
    IsClockwise() : boolean {
        return this.SignedArea() < 0;
    }


    Perimeter() : number {
        let fPerim = 0;
        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let j = (i+1) % N;
            let dx = this.vertices[j].x - this.vertices[i].x;
            let dy = this.vertices[j].y - this.vertices[i].y;
            fPerim += Math.sqrt(dx*dx + dy*dy);            
        }
        return fPerim;        
    }


    ContainsPoint(vTest : IVector2d) : boolean
    {
        let nWindingNumber = 0;   // winding number counter

        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let iNext = (i+1) % N;

            if (this.vertices[i].y <= vTest.y) {         
                // start y <= P.y
                if (this.vertices[iNext].y > vTest.y) {                         // an upward crossing
                    if (MathUtil.IsLeft( this.vertices[i], this.vertices[iNext], vTest) > 0)  // P left of edge
                        ++nWindingNumber;                                      // have a valid up intersect
                }
            } else {                       
                // start y > P.y (no test needed)
                if (this.vertices[iNext].y <= vTest.y) {                        // a downward crossing
                    if (MathUtil.IsLeft( this.vertices[i], this.vertices[iNext], vTest) < 0)  // P right of edge
                        --nWindingNumber;                                      // have a valid down intersect
                }
            }
        }

        return nWindingNumber != 0;
    }



    // [TODO] need Intersects() 
    // Contains(o: Polygon2d) : boolean {
    //     let N = o.VertexCount();
    //     for ( let i = 0; i < N; ++i ) {
    //         if ( this.Contains( o.Vertex(i) ) == false )
    //             return false;
    //     }

    //     if ( Intersects(o) )
    //         return false;

    //     return true;        
    // }


}