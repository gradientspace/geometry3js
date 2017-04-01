import { IVector2d } from "../types/Vector2d";
import Constants from "./Constants";

export default class MathUtil
{

    static IsFinite(d: number) : boolean {
        return Number.isFinite(d);
    }
    static EpsilonEqual(a: number, b: number, epsilon: number = Constants.Epsilon) : boolean {
        return Math.abs(a - b) < epsilon;
    }
    static PrecisionEqual(a: number, b: number, digits: number) : boolean {
        let shift = Math.pow(10, digits);
        return Math.round( a * shift ) == Math.round( b * shift );
    }    


    static  Clamp(f: number, low: number, high: number) : number {
        return (f < low) ? low : (f > high) ? high : f;
    }
    static RangeClamp(fValue: number, fMinMaxValue: number ) : number {
        return this.Clamp(fValue, -Math.abs(fMinMaxValue), Math.abs(fMinMaxValue));
    }    
    static SignedClamp(f: number, fMax: number ) : number {
        return this.Clamp(Math.abs(f), 0, fMax) * Math.sign(f);
    } 
    static SignedClamp2(f: number, fMin: number, fMax: number ) : number {
        return this.Clamp(Math.abs(f),fMin, fMax) * Math.sign(f);
    }     



    // clamps theta to angle interval [min,max]. should work for any theta,
    // regardless of cycles, however min & max values should be in range
    // [-360,360] and min < max
    public static ClampAngleDeg(theta: number, min: number, max: number): number
    {
        // convert interval to center/extent - [c-e,c+e]
        let c = (min+max)*0.5;
        let e = max-c;

        // get rid of extra rotations
        theta = theta % 360;

        // shift to origin, then convert theta to +- 180
        theta -= c;
        if ( theta < -180 )
            theta += 360;
        else if ( theta > 180 )
            theta -= 360;

        // clamp to extent
        if ( theta < -e )
            theta = -e;
        else if ( theta > e )
            theta = e;

        // shift back
        return theta + c;
    }



    // for ((i++) % N)-type loops, but where we might be using (i--)
    static WrapSignedIndex(val: number, mod: number): number {
        while (val < 0)
            val += mod;
        return val % mod;
    }



    // there are fast approximations to this...
    static InvSqrt(f: number): number {
        return f / Math.sqrt(f);
    }


    // normal Atan2 returns in range [-pi,pi], this shifts to [0,2pi]
    static Atan2Positive(y: number, x: number): number {
        let theta = Math.atan2(y, x);
        if (theta < 0)
            theta = (2 * Math.PI) + theta;
        return theta;
    }



    static Lerp(a: number, b: number, t: number): number {
        return (1 - t) * a + (t) * b;
    }


    // code adapted from http://softsurfer.com/Archive/algorithm_0103/algorithm_0103.htm
    //    Return: >0 for P2 left of the line through P0 and P1
    //            =0 for P2 on the line
    //            <0 for P2 right of the line
    static IsLeft( P0: IVector2d, P1: IVector2d, P2: IVector2d ) : number
    {
        return Math.sign( ( (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y) ) );
    }

}