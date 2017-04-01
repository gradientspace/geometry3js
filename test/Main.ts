//import { Vector2dImpl, Vector2d } from "./VectorTypes/Vector2d";
import * as g3 from "../src/g3";



class Zector2
{
	constructor() {
		this[0] = 0;
		this[1] = 1;
	}

    get x() : number {
        return this[0];
    }
    set x(f : number) {
        this[0] = f;
    }

    get y() : number {
        return this[1];
    }
    set y(f : number) {
        this[1] = f;
    }

}


class Startup {
	public static main(): number {

		let x = new Zector2();
		x.x = 1;
		x[1] = 2;

		let v1 = g3.Vector2d(5,6);
		let v2 = g3.Vector2d(2,3);
		let vadd = g3.addv2(v1,v2);
		let n = v1.Length();


		vadd.addv( g3.Constants.Vector2d_Zero );
	
		console.log(vadd.toString());	


		this.test_Polygon2d();

		return 0;
	}




	static test_Polygon2d() {
		let poly = g3.Types.Polygon2d();
		poly.AppendVertex([0,0]);
		poly.AppendVertex([1,0]);
		poly.Append([1,1, 0,1]);

		let ptIn = g3.Vector2d(0.5, 0.5);
		let ptOut = g3.Vector2d(2,2);

		console.log("count ", poly.VertexCount(), 
				   " area ", poly.SignedArea(),  " perimeter ", poly.Perimeter(),
				   " ptIn ", poly.Contains(ptIn), " ptOut ", poly.Contains(ptOut) );

		poly.Reverse();

		console.log("reversed count ", poly.VertexCount(), 
				   " area ", poly.SignedArea(),  " perimeter ", poly.Perimeter(),
				   " ptIn ", poly.Contains(ptIn), " ptOut ", poly.Contains(ptOut) );	
	}

}

Startup.main();
