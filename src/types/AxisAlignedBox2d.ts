import { Vector2d, ICopyableVector2d, IVector2d } from "./Vector2d";
import Constants from "../util/Constants";
import * as g3 from "../g3";
import MathUtil from "../util/MathUtil";

export interface IAxisAlignedBox2d
{
    Min: Vector2d;
    Max: Vector2d;
}

export interface ICopyableAxisAlignedBox2d extends IAxisAlignedBox2d
{
    clone();
}

export interface AxisAlignedBox2d extends ICopyableAxisAlignedBox2d
{
    readonly Width: number;
    readonly Height: number;

    readonly Area: number;
    readonly DiagonalLength: number;
    readonly MaxDim: number;

    readonly Diagonal: Vector2d;
    readonly Center: Vector2d;
    
    /** ccw from bottom-left, 0 == bottom-left, 1 = bottom-right, 2 == top-right, 3 == top-left */
    Corner(i: number): Vector2d;


    Expand(f: number);
    Contract(f: number);
    /** values are all added. this is a weird function... */
    Pad(left: number, right: number, bottom: number, top: number);
    Translate(v: IVector2d);

    ContainPoint(v: IVector2d);
    ContainBox(b: IAxisAlignedBox2d);

    Intersect(b: IAxisAlignedBox2d): AxisAlignedBox2d;

    ContainsPoint(v: IVector2d): boolean;
    ContainsBox(b: IAxisAlignedBox2d): boolean;
    Intersects(b: IAxisAlignedBox2d): boolean;

    /** returns 0 if point is inside box */
    Distance(v: IVector2d): number;
}


export class g3AxisAlignedBox2d implements AxisAlignedBox2d
{
    Min: Vector2d;
    Max: Vector2d;

    constructor(min: ICopyableVector2d = Constants.Vector2d_Max, 
                max: ICopyableVector2d = Constants.Vector2d_Min) {
        this.Min = min.clone();
        this.Max = max.clone();
    }    

    clone() {
        return g3.AxisAlignedBox2d(this.Min, this.Max);
    }

    get Width(): number {
        return this.Max.x - this.Min.x;
    }
    get Height(): number {
        return this.Max.y - this.Min.y;
    }

    get Area(): number {
        return (this.Max.x - this.Min.x) * (this.Max.y - this.Min.y);
    }
    get DiagonalLength(): number {
        let dx = this.Max.x - this.Min.x;
        let dy = this.Max.y - this.Min.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
    get MaxDim(): number {
        return Math.max( this.Max.x - this.Min.x, this.Max.y - this.Min.y );
    }

    get Diagonal(): Vector2d {
        return g3.Vector2d(this.Max.x - this.Min.x, this.Max.y - this.Min.y);
    }
    get Center(): Vector2d {
        return g3.Vector2d( 0.5*(this.Max.x + this.Min.x), 0.5*(this.Max.y + this.Min.y));
    }

    /** ccw from bottom-left, 0 == bottom-left, 1 = bottom-right, 2 == top-right, 3 == top-left */
    Corner(i: number): Vector2d {
        return g3.Vector2d((i % 3 == 0) ? this.Min.x : this.Max.x, (i < 2) ? this.Min.y : this.Max.y);
    }


    Expand(f: number) {
        this.Min.x -= f; this.Min.y -= f;
        this.Max.x += f; this.Max.y += f;
    }
    Contract(f: number) {
        f = MathUtil.SignedClamp(this.MaxDim, f);
        this.Expand(-f);
    }
    /** values are all added. this is a weird function... */
    Pad(left: number, right: number, bottom: number, top: number) {
        this.Min.x += left; this.Min.y += bottom;
        this.Max.x += right; this.Max.y += top;        
    }
    Translate(v: IVector2d) {
        this.Min.addv(v);
        this.Max.addv(v);
    }

    ContainPoint(v: IVector2d) {
        this.Min.x = Math.min(this.Min.x, v.x);
        this.Min.y = Math.min(this.Min.y, v.y);
        this.Max.x = Math.max(this.Max.x, v.x);
        this.Max.y = Math.max(this.Max.y, v.y);        
    }
    ContainBox(b: IAxisAlignedBox2d) {
        this.ContainPoint(b.Min);
        this.ContainPoint(b.Max);
    }


    Intersect(box: IAxisAlignedBox2d): AxisAlignedBox2d {
        let minx = Math.max(this.Min.x, box.Min.x);
        let miny = Math.max(this.Min.y, box.Min.y);
        let maxx = Math.min(this.Max.x, box.Max.x);
        let maxy = Math.min(this.Max.y, box.Max.y);
        let width = maxx-minx;
        let height = maxy-miny;
        return (height <= 0 || width <= 0) ? Constants.AxisAlignedBox2d_Empty :
             g3.AxisAlignedBox2d( g3.Vector2d(minx,miny), g3.Vector2d(maxx,maxy));
    }

    ContainsPoint(v: IVector2d): boolean {
        return (this.Min.x < v.x) && (this.Min.y < v.y) && (this.Max.x > v.x) && (this.Max.y > v.y)
    }
    ContainsBox(box2: IAxisAlignedBox2d): boolean {
        return this.ContainsPoint(box2.Min) && this.ContainsPoint(box2.Max);
    }

    Intersects(box: IAxisAlignedBox2d): boolean {
        return !((box.Max.x < this.Min.x) || (box.Min.x > this.Max.x) || (box.Max.y < this.Min.y) || (box.Min.y > this.Max.y));
    }

    /** returns 0 if point is inside box */
    Distance(v: IVector2d): number {
        let cx = 0.5*(this.Max.x + this.Min.x);
        let cy = 0.5*(this.Max.y + this.Min.y)
        let dx = Math.abs(v.x - cx);
        let dy = Math.abs(v.y - cy);
        let fWidth = this.Max.x - this.Min.x;
        let fHeight = this.Max.y - this.Min.y;
        if (dx < fWidth && dy < fHeight) {
            return 0.0;
        } else if (dx > fWidth && dy > fHeight) {
            return Math.sqrt((dx - fWidth) * (dx - fWidth) + (dy - fHeight) * (dy - fHeight));
        } else if (dx > fWidth) {
            return dx - fWidth;
        } else if (dy > fHeight) {
            return dy - fHeight;
        }
        return 0.0;        
    }

    toString(): string {
        return "[" + this.Min.x + "," + this.Max.x + "][" + this.Min.y + "," + this.Max.y + "]";
    }
}