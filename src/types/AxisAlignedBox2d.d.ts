import { Vector2d, ICopyableVector2d, IVector2d } from "./Vector2d";
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
export declare class g3AxisAlignedBox2d implements AxisAlignedBox2d {
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
