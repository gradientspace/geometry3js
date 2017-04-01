
import { Vector2dConstant } from "../types/Vector2d";

export default class Constants
{
    static readonly MaxDouble = Number.MAX_VALUE;
    static readonly MinDouble = Number.MIN_VALUE;
    static readonly MaxInt = Number.MAX_SAFE_INTEGER;
    static readonly MinInt = Number.MIN_SAFE_INTEGER;

    static readonly Vector2d_Zero = new Vector2dConstant(0,0);
    static readonly Vector2d_One = new Vector2dConstant(1,1);
    static readonly Vector2d_AxisX = new Vector2dConstant(1,0); 
    static readonly Vector2d_AxisY = new Vector2dConstant(0,1);     
    
         
}