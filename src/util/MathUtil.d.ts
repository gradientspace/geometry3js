import { IVector2d } from "../types/Vector2d";
export default class MathUtil {
    static IsFinite(d: number): boolean;
    static EpsilonEqual(a: number, b: number, epsilon?: number): boolean;
    static PrecisionEqual(a: number, b: number, digits: number): boolean;
    static Clamp(f: number, low: number, high: number): number;
    static RangeClamp(fValue: number, fMinMaxValue: number): number;
    static SignedClamp(f: number, fMax: number): number;
    static SignedClamp2(f: number, fMin: number, fMax: number): number;
    static ClampAngleDeg(theta: number, min: number, max: number): number;
    static WrapSignedIndex(val: number, mod: number): number;
    static InvSqrt(f: number): number;
    static Atan2Positive(y: number, x: number): number;
    static Lerp(a: number, b: number, t: number): number;
    static IsLeft(P0: IVector2d, P1: IVector2d, P2: IVector2d): number;
}
