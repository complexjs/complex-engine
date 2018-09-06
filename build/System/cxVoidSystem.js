"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cxSystem_1 = __importDefault(require("../cxSystem"));
/**
 * This system only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */
var cxVoidSystem = /** @class */ (function (_super) {
    __extends(cxVoidSystem, _super);
    function cxVoidSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return cxVoidSystem;
}(cxSystem_1.default));
exports.default = cxVoidSystem;
