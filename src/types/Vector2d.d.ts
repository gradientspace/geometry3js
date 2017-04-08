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
export declare class g3Vector2d implements Vector2d {
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
export declare class IndexedVector2d extends Array<number> implements Vector2d {
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
export declare class Vector2dConstant implements ICopyableVector2d {
    private readonly xx;
    private readonly yy;
    constructor(x: any, y: any);
    toString(): string;
    clone(): g3Vector2d;
    x: number;
    y: number;
}
