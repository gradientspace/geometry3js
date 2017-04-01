//import { Vector2dImpl, Vector2d } from "./VectorTypes/Vector2d";
import * as g3 from "../src/g3";
import Constants from "../src/util/Constants";




class Startup {
	public static main(): number {

		let v1 = g3.Vector2d(5,6);
		let v2 = g3.Vector2d(2,3);
		let vadd = g3.addv2(v1,v2);
		let n = v1.Length();

		vadd.addv( Constants.Vector2d_AxisX);
	
		console.log(vadd.toString());	


		this.test_Polygon2d();

		return 0;
	}




	static test_Polygon2d() {
		let poly = g3.Polygon2d();
		poly.AppendVertex(g3.Vector2d(0,0));
		poly.AppendVertex( {x: 1, y: 0} );
		poly.AppendArray([1,1, 0,1]);

		let ptIn = g3.Vector2d(0.5, 0.5);
		let ptOut = g3.Vector2d(2,2);

		console.log("count ", poly.VertexCount(), 
				   " area ", poly.SignedArea(),  " perimeter ", poly.Perimeter(),
				   " ptIn ", poly.ContainsPoint(ptIn), " ptOut ", poly.ContainsPoint(ptOut) );

		poly.Reverse();

		console.log("reversed count ", poly.VertexCount(), 
				   " area ", poly.SignedArea(),  " perimeter ", poly.Perimeter(),
				   " ptIn ", poly.ContainsPoint(ptIn), " ptOut ", poly.ContainsPoint(ptOut) );	
	}

}

Startup.main();
