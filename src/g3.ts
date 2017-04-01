import {IVector2d, Vector2d, DefaultVector2d, IndexedVector2d, Vector2dConstant} from "./types/Vector2d";
import {Polygon2d, DefaultPolygon2d} from "./curve2/Polygon2d";
import {AxisAlignedBox2d, DefaultAxisAlignedBox2d} from "./types/AxisAlignedBox2d";


/*
 * Type factories
 */

export function Vector2d(x: number, y: number) : Vector2d {
    return new DefaultVector2d(x,y);
}
export function Vector2dIndexable(x: number, y: number) : Vector2d {
    return new IndexedVector2d(x,y);
}

export function AxisAlignedBox2d() : AxisAlignedBox2d {
    return new DefaultAxisAlignedBox2d();
}

export function Polygon2d(n: number = 0) : Polygon2d {
    return new DefaultPolygon2d(n);
}



/*
 * top-level math functions
 */



export function addv2(a : Vector2d, b: Vector2d) : Vector2d {
    return new DefaultVector2d(a.x+b.x, a.y+b.y);
}
export function addv(a, b) {
    return a.clone().addv(b);
}

