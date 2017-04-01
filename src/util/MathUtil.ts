import { IVector2d } from "../types/Vector2d";

export default class MathUtil
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