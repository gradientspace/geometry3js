import { Vector2dConstant } from "../types/Vector2d";
import { AxisAlignedBox2d } from "../types/AxisAlignedBox2d";
export default class Constants {
    static readonly MaxDouble: number;
    static readonly MinDouble: number;
    static readonly MaxInt: number;
    static readonly MinInt: number;
    static readonly Deg2Rad: number;
    static readonly Rad2Deg: number;
    static readonly TwoPI: number;
    static readonly HalfPI: number;
    static readonly ZeroTolerance: number;
    static readonly Epsilon: number;
    static readonly Vector2d_Zero: Vector2dConstant;
    static readonly Vector2d_One: Vector2dConstant;
    static readonly Vector2d_AxisX: Vector2dConstant;
    static readonly Vector2d_AxisY: Vector2dConstant;
    static readonly Vector2d_Max: Vector2dConstant;
    static readonly Vector2d_Min: Vector2dConstant;
    static readonly AxisAlignedBox2d_Empty: AxisAlignedBox2d;
}
