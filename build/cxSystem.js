"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract System. A system is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
var cxSystem = /** @class */ (function () {
    function cxSystem() {
        this.world = null;
    }
    /**
     * get notified when system is added to world
     */
    cxSystem.prototype.addedToWorld = function () { };
    /**
     * get notified when entity is added to world
     */
    cxSystem.prototype.added = function (entity) { };
    /**
     * get notified when entity is removed from world
     */
    cxSystem.prototype.removed = function (entity) { };
    cxSystem.prototype.setWorld = function (value) {
        this.world = value;
    };
    return cxSystem;
}());
exports.default = cxSystem;
//# sourceMappingURL=cxSystem.js.map