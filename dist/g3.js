var g3 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2d_1 = __webpack_require__(3);
const Polygon2d_1 = __webpack_require__(1);
const AxisAlignedBox2d_1 = __webpack_require__(2);
function Vector2d(x, y) {
    return new Vector2d_1.DefaultVector2d(x, y);
}
exports.Vector2d = Vector2d;
function Polygon2d(n = 0) {
    return new Polygon2d_1.DefaultPolygon2d(n);
}
exports.Polygon2d = Polygon2d;
function AxisBox2d() {
    return new AxisAlignedBox2d_1.DefaultAxisAlignedBox2d();
}
exports.AxisBox2d = AxisBox2d;
function addv2(a, b) {
    return new Vector2d_1.DefaultVector2d(a.x + b.x, a.y + b.y);
}
exports.addv2 = addv2;
function addv(a, b) {
    return a.clone().addv(b);
}
exports.addv = addv;
class MathUtil {
    // code adapted from http://softsurfer.com/Archive/algorithm_0103/algorithm_0103.htm
    //    Return: >0 for P2 left of the line through P0 and P1
    //            =0 for P2 on the line
    //            <0 for P2 right of the line
    static IsLeft(P0, P1, P2) {
        return Math.sign(((P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y)));
    }
}
exports.MathUtil = MathUtil;
class Constants {
}
Constants.Vector2d_Zero = new Vector2d_1.Vector2dConstant(0, 0);
exports.Constants = Constants;
//# sourceMappingURL=g3.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const g3 = __webpack_require__(0);
class DefaultPolygon2d {
    constructor(count = 0) {
        this.vertices = new Array(count);
        this.Timestamp = 0;
    }
    VertexCount() {
        return this.vertices.length;
    }
    GetVertex(index) {
        return this.vertices[index].clone();
    }
    SetVertex(index, value) {
        let p = this.vertices[index];
        p.x = value.x;
        p.y = value.y;
        this.Timestamp++;
    }
    Start() {
        return this.vertices[0].clone();
    }
    End() {
        return this.vertices[this.vertices.length - 1].clone();
    }
    AppendVertex(v) {
        this.vertices.push(g3.Vector2d(v.x, v.y));
    }
    AppendArray(v) {
        if (v.length % 2 != 0) {
            throw "Polygon2d.Append: array size is not even";
        }
        let N = v.length / 2;
        for (let i = 0; i < N; ++i) {
            this.vertices.push(g3.Vector2d(v[2 * i], v[2 * i + 1]));
        }
    }
    Reverse() {
        this.vertices.reverse();
        this.Timestamp++;
    }
    // GetTangent()
    // GetBounds()
    SignedArea() {
        let fArea = 0;
        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let j = (i + 1) % N;
            let v1 = this.vertices[i];
            let v2 = this.vertices[j];
            fArea += v1.x * v2.y - v1.y * v2.x;
        }
        return fArea / 2;
    }
    IsClockwise() {
        return this.SignedArea() < 0;
    }
    Perimeter() {
        let fPerim = 0;
        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let j = (i + 1) % N;
            let dx = this.vertices[j].x - this.vertices[i].x;
            let dy = this.vertices[j].y - this.vertices[i].y;
            fPerim += Math.sqrt(dx * dx + dy * dy);
        }
        return fPerim;
    }
    Contains(vTest) {
        let nWindingNumber = 0; // winding number counter
        let N = this.vertices.length;
        for (let i = 0; i < N; ++i) {
            let iNext = (i + 1) % N;
            if (this.vertices[i].y <= vTest.y) {
                // start y <= P.y
                if (this.vertices[iNext].y > vTest.y) {
                    if (g3.MathUtil.IsLeft(this.vertices[i], this.vertices[iNext], vTest) > 0)
                        ++nWindingNumber; // have a valid up intersect
                }
            }
            else {
                // start y > P.y (no test needed)
                if (this.vertices[iNext].y <= vTest.y) {
                    if (g3.MathUtil.IsLeft(this.vertices[i], this.vertices[iNext], vTest) < 0)
                        --nWindingNumber; // have a valid down intersect
                }
            }
        }
        return nWindingNumber != 0;
    }
}
exports.DefaultPolygon2d = DefaultPolygon2d;
//# sourceMappingURL=Polygon2d.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const g3 = __webpack_require__(0);
class DefaultAxisAlignedBox2d {
    constructor() {
        this.Min = g3.Vector2d(Number.MAX_VALUE, Number.MAX_VALUE);
        this.Max = g3.Vector2d(Number.MIN_VALUE, Number.MIN_VALUE);
    }
}
exports.DefaultAxisAlignedBox2d = DefaultAxisAlignedBox2d;
//# sourceMappingURL=AxisAlignedBox2d.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * "Normal" implementation of Vector2d, has .x and .y properties
 */
class DefaultVector2d {
    // implement methods for Array here
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "[" + this.x + "," + this.y + "]";
    }
    clone() {
        return new DefaultVector2d(this.x, this.y);
    }
    Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    LengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    addv(b) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }
    subv(b) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }
    mulf(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    divf(f) {
        this.x /= f;
        this.y /= f;
        return this;
    }
}
exports.DefaultVector2d = DefaultVector2d;
/**
 * This is a Vector2d that provides an indexing interface,
 * ie v[0], v[1]. It does this by subclassing Array.
 * setter/getters are used to provide .x and .y.
 * This is *much* slower than a class with .x and .y properties, unfortunately.
 * However some algorithms are much easier to code with indices!!
 */
class IndexedVector2d extends Array {
    // implement methods for Array here
    constructor(x, y) {
        super(2);
        this[0] = x;
        this[1] = y;
    }
    clone() {
        return new IndexedVector2d(this[0], this[1]);
    }
    get x() {
        return this[0];
    }
    set x(f) {
        this[0] = f;
    }
    get y() {
        return this[1];
    }
    set y(f) {
        this[1] = f;
    }
    Length() {
        return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    }
    LengthSquared() {
        return this[0] * this[0] + this[1] * this[1];
    }
    sumv(b) {
        return new IndexedVector2d(this[0] + b[0], this[1] + b[1]);
    }
    addv(b) {
        this[0] += b[0];
        this[1] += b[1];
        return this;
    }
    subv(b) {
        this[0] -= b[0];
        this[1] -= b[1];
        return this;
    }
    mulf(f) {
        this[0] *= f;
        this[1] *= f;
        return this;
    }
    divf(f) {
        this[0] /= f;
        this[1] /= f;
        return this;
    }
}
exports.IndexedVector2d = IndexedVector2d;
/**
 * This is a Vector2d to use for constants. unfortunately
 * javascript really doesn't support this kind of thing very well!
 * We throw exceptions so that hopefully you can find the problems in your code.
 */
class Vector2dConstant {
    // implement methods for Array here
    constructor(x, y) {
        this.xx = x;
        this.yy = y;
    }
    toString() {
        return "[" + this.xx + "," + this.yy + "]";
    }
    clone() {
        return new Vector2dConstant(this.xx, this.yy);
    }
    get x() {
        return this.xx;
    }
    set x(f) {
        throw "called x= on constant!";
    }
    get y() {
        return this.yy;
    }
    set y(f) {
        throw "called y= on constant!";
    }
    Length() {
        return Math.sqrt(this.xx * this.xx + this.yy * this.yy);
    }
    LengthSquared() {
        return this.xx * this.xx + this.yy * this.yy;
    }
    addv(b) {
        throw "called addv on constant!";
    }
    subv(b) {
        throw "called subv on constant!";
    }
    mulf(f) {
        throw "called mulf on constant!";
    }
    divf(f) {
        throw "called divf on constant!";
    }
}
exports.Vector2dConstant = Vector2dConstant;
//# sourceMappingURL=Vector2d.js.map

/***/ })
/******/ ]);