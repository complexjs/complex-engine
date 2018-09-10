"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract System. A System is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
var System = /** @class */ (function () {
    function System() {
        this.world = null;
    }
    /**
     * get notified when System is added to world
     */
    System.prototype.addedToWorld = function () {
    };
    /**
     * get notified when entity is added to world
     */
    System.prototype.added = function (entity) {
    };
    /**
     * get notified when entity is removed from world
     */
    System.prototype.removed = function (entity) {
    };
    System.prototype.setWorld = function (value) {
        this.world = value;
    };
    return System;
}());
exports.default = System;
//# sourceMappingURL=System.js.map