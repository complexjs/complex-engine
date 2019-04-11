'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This System only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */
var VoidSystem = /** @class */ (function () {
    function VoidSystem() {
        this.world = null;
    }
    VoidSystem.prototype.added = function (entity) {
    };
    ;
    VoidSystem.prototype.addedToWorld = function () {
    };
    ;
    VoidSystem.prototype.removed = function (entity) {
    };
    VoidSystem.prototype.setWorld = function (world) {
        this.world = world;
    };
    return VoidSystem;
}());
exports.default = VoidSystem;
//# sourceMappingURL=VoidSystem.js.map