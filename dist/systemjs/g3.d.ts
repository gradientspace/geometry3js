declare module "types/Vector2d" {
    /**
     * Basic 2d-vector interface. Wherever possible, functions that just
     * need to access .x and .y should take this interface instead of Vector2d.
     * Then you can call it with {x: , y: } syntax, as well as any other object
     * that provides .x and .y (including via a get/set)
     */
    export interface IVector2d {
        x: number;
        y: number;
    }
    export interface ICopyableVector2d extends IVector2d {
        clone(): any;
    }
    /**
     * This is the "full" Vector2d, that has all the various functions
     */
    export interface Vector2d extends ICopyableVector2d {
        Length(): number;
        LengthSquared(): number;
        at(i: number): number;
        set(b: IVector2d): Vector2d;
        addv(b: IVector2d): Vector2d;
        subv(b: IVector2d): Vector2d;
        mulf(s: number): Vector2d;
        divf(s: number): Vector2d;
    }
    /**
     * "Normal" implementation of Vector2d, has .x and .y properties
     */
    export class g3Vector2d implements Vector2d {
        x: number;
        y: number;
        constructor(x: any, y: any);
        toString(): string;
        clone(): g3Vector2d;
        Length(): number;
        LengthSquared(): number;
        at(i: number): number;
        set(b: IVector2d): Vector2d;
        addv(b: IVector2d): Vector2d;
        subv(b: IVector2d): Vector2d;
        mulf(f: number): Vector2d;
        divf(f: number): Vector2d;
    }
    /**
     * This is a Vector2d that provides an indexing interface,
     * ie v[0], v[1]. It does this by subclassing Array.
     * setter/getters are used to provide .x and .y.
     * This is *much* slower than a class with .x and .y properties, unfortunately.
     * However some algorithms are much easier to code with indices!!
     */
    export class IndexedVector2d extends Array<number> implements Vector2d {
        constructor(x: any, y: any);
        clone(): IndexedVector2d;
        x: number;
        y: number;
        Length(): number;
        LengthSquared(): number;
        at(i: number): number;
        set(b: IVector2d): Vector2d;
        addv(b: IVector2d): Vector2d;
        subv(b: IVector2d): Vector2d;
        mulf(f: number): Vector2d;
        divf(f: number): Vector2d;
    }
    /**
     * This is a Vector2d to use for constants. unfortunately
     * javascript really doesn't support this kind of thing very well!
     * We throw exceptions so that hopefully you can find the problems in your code.
     */
    export class Vector2dConstant implements ICopyableVector2d {
        private readonly xx;
        private readonly yy;
        constructor(x: any, y: any);
        toString(): string;
        clone(): g3Vector2d;
        x: number;
        y: number;
    }
}
declare module "util/Constants" {
    import { Vector2dConstant } from "types/Vector2d";
    import { AxisAlignedBox2d } from "types/AxisAlignedBox2d";
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
}
declare module "util/MathUtil" {
    import { IVector2d } from "types/Vector2d";
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
}
declare module "types/AxisAlignedBox2d" {
    import { Vector2d, ICopyableVector2d, IVector2d } from "types/Vector2d";
    export interface IAxisAlignedBox2d {
        Min: Vector2d;
        Max: Vector2d;
    }
    export interface ICopyableAxisAlignedBox2d extends IAxisAlignedBox2d {
        clone(): any;
    }
    export interface AxisAlignedBox2d extends ICopyableAxisAlignedBox2d {
        readonly Width: number;
        readonly Height: number;
        readonly Area: number;
        readonly DiagonalLength: number;
        readonly MaxDim: number;
        readonly Diagonal: Vector2d;
        readonly Center: Vector2d;
        /** ccw from bottom-left, 0 == bottom-left, 1 = bottom-right, 2 == top-right, 3 == top-left */
        Corner(i: number): Vector2d;
        Expand(f: number): any;
        Contract(f: number): any;
        /** values are all added. this is a weird function... */
        Pad(left: number, right: number, bottom: number, top: number): any;
        Translate(v: IVector2d): any;
        ContainPoint(v: IVector2d): any;
        ContainBox(b: IAxisAlignedBox2d): any;
        Intersect(b: IAxisAlignedBox2d): AxisAlignedBox2d;
        ContainsPoint(v: IVector2d): boolean;
        ContainsBox(b: IAxisAlignedBox2d): boolean;
        Intersects(b: IAxisAlignedBox2d): boolean;
        /** returns 0 if point is inside box */
        Distance(v: IVector2d): number;
    }
    export class g3AxisAlignedBox2d implements AxisAlignedBox2d {
        Min: Vector2d;
        Max: Vector2d;
        constructor(min?: ICopyableVector2d, max?: ICopyableVector2d);
        clone(): AxisAlignedBox2d;
        readonly Width: number;
        readonly Height: number;
        readonly Area: number;
        readonly DiagonalLength: number;
        readonly MaxDim: number;
        readonly Diagonal: Vector2d;
        readonly Center: Vector2d;
        /** ccw from bottom-left, 0 == bottom-left, 1 = bottom-right, 2 == top-right, 3 == top-left */
        Corner(i: number): Vector2d;
        Expand(f: number): void;
        Contract(f: number): void;
        /** values are all added. this is a weird function... */
        Pad(left: number, right: number, bottom: number, top: number): void;
        Translate(v: IVector2d): void;
        ContainPoint(v: IVector2d): void;
        ContainBox(b: IAxisAlignedBox2d): void;
        Intersect(box: IAxisAlignedBox2d): AxisAlignedBox2d;
        ContainsPoint(v: IVector2d): boolean;
        ContainsBox(box2: IAxisAlignedBox2d): boolean;
        Intersects(box: IAxisAlignedBox2d): boolean;
        /** returns 0 if point is inside box */
        Distance(v: IVector2d): number;
        toString(): string;
    }
}
declare module "curve2/Polygon2d" {
    import { IVector2d, Vector2d } from "types/Vector2d";
    import { AxisAlignedBox2d } from "types/AxisAlignedBox2d";
    export interface Polygon2d {
        clone(): any;
        readonly VertexCount: number;
        GetVertex(index: number): Vector2d;
        SetVertex(index: number, value: Vector2d): any;
        AppendVertex(v: IVector2d): any;
        AppendArray(v: Array<number>): any;
        readonly Start: Vector2d;
        readonly End: Vector2d;
        readonly Bounds: AxisAlignedBox2d;
        readonly SignedArea: number;
        readonly IsClockwise: boolean;
        readonly Perimeter: number;
        Reverse(): any;
        ContainsPoint(vTest: IVector2d): boolean;
    }
    export class g3Polygon2d implements Polygon2d {
        vertices: Vector2d[];
        Timestamp: number;
        constructor(count?: number);
        clone(): g3Polygon2d;
        readonly VertexCount: number;
        GetVertex(index: number): Vector2d;
        SetVertex(index: number, value: Vector2d): void;
        readonly Start: Vector2d;
        readonly End: Vector2d;
        readonly Bounds: AxisAlignedBox2d;
        AppendVertex(v: IVector2d): void;
        AppendArray(v: Array<number>): void;
        Reverse(): void;
        readonly SignedArea: number;
        readonly IsClockwise: boolean;
        readonly Perimeter: number;
        ContainsPoint(vTest: IVector2d): boolean;
    }
}
declare module "curve2/GeneralPolygon2d" {
    import { Polygon2d } from "curve2/Polygon2d";
    import { AxisAlignedBox2d } from "types/AxisAlignedBox2d";
    export interface GeneralPolygon2d {
        Outer: Polygon2d;
        Holes: Polygon2d[];
        readonly OuterIsClockwise: boolean;
        AddHole(hole: Polygon2d): any;
        readonly HasHoles: boolean;
        readonly Area: number;
        readonly Perimeter: number;
        readonly Bounds: AxisAlignedBox2d;
    }
    export class g3GeneralPolygon2d implements GeneralPolygon2d {
        private outer;
        Holes: Polygon2d[];
        OuterIsClockwise: boolean;
        constructor();
        Outer: Polygon2d;
        AddHole(hole: Polygon2d, bCheck?: boolean): void;
        readonly HasHoles: boolean;
        readonly Area: number;
        readonly Perimeter: number;
        readonly Bounds: AxisAlignedBox2d;
    }
}
declare module "g3" {
    import { Vector2d, ICopyableVector2d } from "types/Vector2d";
    import { AxisAlignedBox2d } from "types/AxisAlignedBox2d";
    import { Polygon2d } from "curve2/Polygon2d";
    import { GeneralPolygon2d } from "curve2/GeneralPolygon2d";
    export function Vector2d(x: number, y: number): Vector2d;
    export function Vector2dIndexable(x: number, y: number): Vector2d;
    export function AxisAlignedBox2d(min?: ICopyableVector2d, max?: ICopyableVector2d): AxisAlignedBox2d;
    export function Polygon2d(n?: number): Polygon2d;
    export function GeneralPolygon2d(): GeneralPolygon2d;
    export function addv2(a: Vector2d, b: Vector2d): Vector2d;
    export function addv(a: any, b: any): any;
}
