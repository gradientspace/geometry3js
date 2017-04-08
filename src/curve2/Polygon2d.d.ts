import { IVector2d, Vector2d } from "../types/Vector2d";
import { AxisAlignedBox2d } from "../types/AxisAlignedBox2d";
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
export declare class g3Polygon2d implements Polygon2d {
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
