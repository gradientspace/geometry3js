import {Vector2d, Vector2dValue, Vector2dConstant} from "./types/Vector2d";
import Polygon2d from "./curve2/Polygon2d";

export function Vector2d(x: number, y: number) : Vector2d {
    return new Vector2dValue(x,y);
}



export class Types 
{
    static Polygon2d(n: number = 0) : Polygon2d {
        return new Polygon2d(n);
    }

}


export function addv2(a : Vector2d, b: Vector2d) : Vector2d {
    return new Vector2dValue(a[0]+b[0], a[1]+b[1]);
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
    static IsLeft( P0, P1, P2 ) : number
    {
        return Math.sign( ( (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P2[0] - P0[0]) * (P1[1] - P0[1]) ) );
    }

}


export class Constants
{
    static readonly Vector2d_Zero = new Vector2dConstant(0,0);
}