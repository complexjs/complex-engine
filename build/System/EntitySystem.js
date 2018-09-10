"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var System_1 = __importDefault(require("../System"));
/**
 * This systems renders only entities that match the required components.
 */
var EntitySystem = /** @class */ (function (_super) {
    __extends(EntitySystem, _super);
    function EntitySystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.components = [];
        return _this;
    }
    EntitySystem.prototype.processEntities = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            this.update(entities[i]);
        }
    };
    EntitySystem.prototype.getComponents = function () {
        return this.components;
    };
    return EntitySystem;
}(System_1.default));
exports.default = EntitySystem;
//# sourceMappingURL=EntitySystem.js.map