import { Polygon2d } from "./Polygon2d";
import { AxisAlignedBox2d } from "../types/AxisAlignedBox2d";
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
export declare class g3GeneralPolygon2d implements GeneralPolygon2d {
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
