import {IVector2d, Vector2d, DefaultVector2d, IndexedVector2d, Vector2dConstant} from "./types/Vector2d";
import {Polygon2d, DefaultPolygon2d} from "./curve2/Polygon2d";

export function Vector2d(x: number, y: number) : Vector2d {
    return new DefaultVector2d(x,y);
}
export function Polygon2d(n: number = 0) : Polygon2d {
    return new DefaultPolygon2d(n);
}


export function addv2(a : Vector2d, b: Vector2d) : Vector2d {
    return new DefaultVector2d(a.x+b.x, a.y+b.y);
}
export function addv(a, b) {
    return a.clone().addv(b);
}



export class MathUtil
{


    // code adapted from http://softsurfer.com/Archive/algorithm_0103/algorithm_0103.htm
    //    Return: >0 for P2 left of the line through P0 and P1
    //            =0 for P2 on the line
    //            <0 for P2 right of the line
    static IsLeft( P0: IVector2d, P1: IVector2d, P2: IVector2d ) : number
    {
        return Math.sign( ( (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y) ) );
    }

}


export class Constants
{
    static readonly Vector2d_Zero = new Vector2dConstant(0,0);
}