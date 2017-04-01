import {Vector2d} from "../types/Vector2d";
import * as g3 from "../g3";

export default class Polygon2d
{
    vertices: number[];
    Timestamp: number;

    constructor(count: number = 0) {
        this.vertices = new Array<number>(count);
        this.Timestamp = 0;
    }

    VertexCount() : number {
        return this.vertices.length / 2;
    }

    Vertex(index: number) : Vector2d {
        return g3.Vector2d(this.vertices[2*index], this.vertices[2*index+1]);
    }

    Start() : Vector2d {
        return this.Vertex(0);
    }
    End() : Vector2d {
        return this.Vertex(this.vertices.length/2 - 1);
    }

    AppendVertex(v) {
        this.vertices.push(v[0]);
        this.vertices.push(v[1]);
    }

    Append(v: Array<number>) {
        if ( v.length % 2 != 0) {
            throw "Polygon2d.Append: array size is not even";
        }
        this.vertices.push(...v);
    }

    Reverse() {
        let n = this.vertices.length / 2;
        for ( let i = 0; i < n/2; ++i ) {
            let j = n-1-i;
            let tmpx = this.vertices[2*i];
            let tmpy = this.vertices[2*i+1];
            this.vertices[2*i] = this.vertices[2*j];
            this.vertices[2*i+1] = this.vertices[2*j+1];
            this.vertices[2*j] = tmpx;
            this.vertices[2*j+1] = tmpy;
        }
    }


    // GetTangent()
    // GetBounds()


    SignedArea() : number {
        let fArea = 0;
        let N = this.vertices.length/2;
        for (let i = 0; i < N; ++i) {
            let j = (i+1) % N;
            let v1x = this.vertices[2*i], v1y = this.vertices[2*i+1];
            let v2x = this.vertices[2*j], v2y = this.vertices[2*j+1];
            fArea += v1x * v2y - v1y * v2x;
        }
        return fArea / 2;	        
    }
    IsClockwise() : boolean {
        return this.SignedArea() < 0;
    }


    Perimeter() : number {
        let fPerim = 0;
        let N = this.vertices.length/2;
        for (let i = 0; i < N; ++i) {
            let j = (i+1) % N;
            let dx = this.vertices[2*j] - this.vertices[2*i];
            let dy = this.vertices[2*j+1] - this.vertices[2*i+1];
            fPerim += Math.sqrt(dx*dx + dy*dy);            
        }
        return fPerim;        
    }


    Contains(vTest) : boolean
    {
        let nWindingNumber = 0;   // winding number counter

        let N = this.VertexCount();
        for (let i = 0; i < N; ++i) {
            let iNext = (i+1) % N;

            if (this.vertices[2*i+1] <= vTest[1]) {         
                // start y <= P.y
                if (this.vertices[2*iNext+1] > vTest[1]) {                         // an upward crossing
                    if (g3.MathUtil.IsLeft( this.Vertex(i), this.Vertex(iNext), vTest) > 0)  // P left of edge
                        ++nWindingNumber;                                      // have a valid up intersect
                }
            } else {                       
                // start y > P.y (no test needed)
                if (this.vertices[2*iNext+1] <= vTest[1]) {                        // a downward crossing
                    if (g3.MathUtil.IsLeft( this.Vertex(i), this.Vertex(iNext), vTest) < 0)  // P right of edge
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