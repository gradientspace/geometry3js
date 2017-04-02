import { IVector2d, Vector2d, g3Vector2d, IndexedVector2d, Vector2dConstant, ICopyableVector2d } from "./types/Vector2d";
import {AxisAlignedBox2d, g3AxisAlignedBox2d} from "./types/AxisAlignedBox2d";
import {Polygon2d, g3Polygon2d} from "./curve2/Polygon2d";
import { GeneralPolygon2d, g3GeneralPolygon2d } from "./curve2/GeneralPolygon2d";
import Constants from "./util/Constants";


/*
 * Type factories
 */

export function Vector2d(x: number, y: number) : Vector2d {
    return new g3Vector2d(x,y);
}
export function Vector2dIndexable(x: number, y: number) : Vector2d {
    return new IndexedVector2d(x,y);
}

export function AxisAlignedBox2d(min: ICopyableVector2d = Constants.Vector2d_Max, 
                                 max: ICopyableVector2d = Constants.Vector2d_Min) : AxisAlignedBox2d {
    return new g3AxisAlignedBox2d(min, max);
}

export function Polygon2d(n: number = 0) : Polygon2d {
    return new g3Polygon2d(n);
}
export function GeneralPolygon2d() : GeneralPolygon2d {
    return new g3GeneralPolygon2d();
}



/*
 * top-level math functions
 */



export function addv2(a : Vector2d, b: Vector2d) : Vector2d {
    return new g3Vector2d(a.x+b.x, a.y+b.y);
}
export function addv(a, b) {
    return a.clone().addv(b);
}

