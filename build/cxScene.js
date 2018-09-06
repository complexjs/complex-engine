"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cxWorld_1 = __importDefault(require("./cxWorld"));
/**
 * The current scene with is rendered on screen.
 */
var cxScene = /** @class */ (function () {
    function cxScene(name) {
        this.name = name;
        this.world = new cxWorld_1.default();
    }
    /**
     * Updates the world object
     */
    cxScene.prototype.update = function () {
        this.world.update();
    };
    return cxScene;
}());
exports.default = cxScene;
