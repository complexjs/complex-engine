"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cxManager = /** @class */ (function () {
    function cxManager() {
        this.tag = null;
        this.world = null;
    }
    cxManager.prototype.getTag = function () {
        return this.tag;
    };
    cxManager.prototype.getWorld = function () {
        return this.world;
    };
    cxManager.prototype.setWorld = function (world) {
        this.world = world;
    };
    return cxManager;
}());
exports.default = cxManager;
