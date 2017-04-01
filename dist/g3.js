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
const Vector2d_1 = __webpack_require__(2);
const Polygon2d_1 = __webpack_require__(1);
function Vector2d(x, y) {
    return new Vector2d_1.Vector2dValue(x, y);
}
exports.Vector2d = Vector2d;
class Types {
    static Polygon2d(n = 0) {
        return new Polygon2d_1.default(n);
    }
}
exports.Types = Types;
function addv2(a, b) {
    return new Vector2d_1.Vector2dValue(a[0] + b[0], a[1] + b[1]);
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
        return Math.sign(((P1[0] - P0[0]) * (P2[1] - P0[1]) - (P2[0] - P0[0]) * (P1[1] - P0[1])));
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
class Polygon2d {
    constructor(count = 0) {
        this.vertices = new Array(count);
        this.Timestamp = 0;
    }
    VertexCount() {
        return this.vertices.length / 2;
    }
    Vertex(index) {
        return g3.Vector2d(this.vertices[2 * index], this.vertices[2 * index + 1]);
    }
    Start() {
        return this.Vertex(0);
    }
    End() {
        return this.Vertex(this.vertices.length / 2 - 1);
    }
    AppendVertex(v) {
        this.vertices.push(v[0]);
        this.vertices.push(v[1]);
    }
    Append(v) {
        if (v.length % 2 != 0) {
            throw "Polygon2d.Append: array size is not even";
        }
        this.vertices.push(...v);
    }
    Reverse() {
        let n = this.vertices.length / 2;
        for (let i = 0; i < n / 2; ++i) {
            let j = n - 1 - i;
            let tmpx = this.vertices[2 * i];
            let tmpy = this.vertices[2 * i + 1];
            this.vertices[2 * i] = this.vertices[2 * j];
            this.vertices[2 * i + 1] = this.vertices[2 * j + 1];
            this.vertices[2 * j] = tmpx;
            this.vertices[2 * j + 1] = tmpy;
        }
    }
    // GetTangent()
    // GetBounds()
    SignedArea() {
        let fArea = 0;
        let N = this.vertices.length / 2;
        for (let i = 0; i < N; ++i) {
            let j = (i + 1) % N;
            let v1x = this.vertices[2 * i], v1y = this.vertices[2 * i + 1];
            let v2x = this.vertices[2 * j], v2y = this.vertices[2 * j + 1];
            fArea += v1x * v2y - v1y * v2x;
        }
        return fArea / 2;
    }
    IsClockwise() {
        return this.SignedArea() < 0;
    }
    Perimeter() {
        let fPerim = 0;
        let N = this.vertices.length / 2;
        for (let i = 0; i < N; ++i) {
            let j = (i + 1) % N;
            let dx = this.vertices[2 * j] - this.vertices[2 * i];
            let dy = this.vertices[2 * j + 1] - this.vertices[2 * i + 1];
            fPerim += Math.sqrt(dx * dx + dy * dy);
        }
        return fPerim;
    }
    Contains(vTest) {
        let nWindingNumber = 0; // winding number counter
        let N = this.VertexCount();
        for (let i = 0; i < N; ++i) {
            let iNext = (i + 1) % N;
            if (this.vertices[2 * i + 1] <= vTest[1]) {
                // start y <= P.y
                if (this.vertices[2 * iNext + 1] > vTest[1]) {
                    if (g3.MathUtil.IsLeft(this.Vertex(i), this.Vertex(iNext), vTest) > 0)
                        ++nWindingNumber; // have a valid up intersect
                }
            }
            else {
                // start y > P.y (no test needed)
                if (this.vertices[2 * iNext + 1] <= vTest[1]) {
                    if (g3.MathUtil.IsLeft(this.Vertex(i), this.Vertex(iNext), vTest) < 0)
                        --nWindingNumber; // have a valid down intersect
                }
            }
        }
        return nWindingNumber != 0;
    }
}
exports.default = Polygon2d;
//# sourceMappingURL=Polygon2d.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector2dBase extends Array {
    // implement methods for Array here
    constructor(x, y) {
        super(2);
        this[0] = x;
        this[1] = y;
    }
    x() {
        return this[0];
    }
    y() {
        return this[1];
    }
    Length() {
        return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
    }
    LengthSquared() {
        return this[0] * this[0] + this[1] * this[1];
    }
}
exports.Vector2dBase = Vector2dBase;
class Vector2dValue extends Vector2dBase {
    clone() {
        return new Vector2dValue(this[0], this[1]);
    }
    sumv(b) {
        return new Vector2dValue(this[0] + b[0], this[1] + b[1]);
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
exports.Vector2dValue = Vector2dValue;
class Vector2dConstant extends Vector2dBase {
    clone() {
        return new Vector2dConstant(this[0], this[1]);
    }
    sumv(b) {
        throw "called Add on constant!";
    }
    addv(b) {
        throw "called AddTo on constant!";
    }
    subv(b) {
        throw "called AddTo on constant!";
    }
    mulf(f) {
        throw "called AddTo on constant!";
    }
    divf(f) {
        throw "called AddTo on constant!";
    }
}
exports.Vector2dConstant = Vector2dConstant;
//# sourceMappingURL=Vector2d.js.map

/***/ })
/******/ ]);