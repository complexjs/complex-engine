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
 * This systems renders only entities that match the required components.
 */
var cxEntitySystem = /** @class */ (function (_super) {
    __extends(cxEntitySystem, _super);
    function cxEntitySystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.components = [];
        return _this;
    }
    cxEntitySystem.prototype.processEntities = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            this.update(entities[i]);
        }
    };
    cxEntitySystem.prototype.getComponents = function () {
        return this.components;
    };
    return cxEntitySystem;
}(cxSystem_1.default));
exports.default = cxEntitySystem;
