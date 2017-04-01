import { Vector2d } from "./Vector2d";
import Constants from "../util/Constants";
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
        this.Min = g3.Vector2d(Constants.MaxDouble, Constants.MaxDouble);
        this.Max = g3.Vector2d(Constants.MinDouble, Constants.MinDouble);
    }    
}