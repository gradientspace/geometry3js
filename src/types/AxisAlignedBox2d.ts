import { Vector2d } from "./Vector2d";
import * as g3 from "../g3";

export interface AxisAlignedBox2d
{
    Min: Vector2d;
    Max: Vector2d;
}

export class DefaultAxisAlignedBox2d implements AxisAlignedBox2d
{
    Min: Vector2d;
    Max: Vector2d;

    constructor() {
        this.Min = g3.Vector2d(Number.MAX_VALUE, Number.MAX_VALUE);
        this.Max = g3.Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);
    }    
}