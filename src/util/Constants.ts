
import { Vector2dConstant } from "../types/Vector2d";
import { AxisAlignedBox2d, g3AxisAlignedBox2d } from "../types/AxisAlignedBox2d";

export default class Constants
{
    static readonly MaxDouble = Number.MAX_VALUE;
    static readonly MinDouble = Number.MIN_VALUE;
    static readonly MaxInt = Number.MAX_SAFE_INTEGER;
    static readonly MinInt = Number.MIN_SAFE_INTEGER;

    static readonly Deg2Rad = (Math.PI / 180.0);
    static readonly Rad2Deg = (180.0 / Math.PI);
    static readonly TwoPI = 2.0 * Math.PI;
    static readonly HalfPI = 0.5 * Math.PI;
    static readonly ZeroTolerance = 1e-08;
    static readonly Epsilon = 2.2204460492503131e-016;


    static readonly Vector2d_Zero = new Vector2dConstant(0,0);
    static readonly Vector2d_One = new Vector2dConstant(1,1);
    static readonly Vector2d_AxisX = new Vector2dConstant(1,0); 
    static readonly Vector2d_AxisY = new Vector2dConstant(0,1);  
    static readonly Vector2d_Max = new Vector2dConstant(Constants.MaxDouble, Constants.MaxDouble);
    static readonly Vector2d_Min = new Vector2dConstant(Constants.MinDouble, Constants.MinDouble);

    static get AxisAlignedBox2d_Empty(): AxisAlignedBox2d {
        return new g3AxisAlignedBox2d();
    }
         
}