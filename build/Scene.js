"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = __importDefault(require("./World"));
var Core_1 = __importDefault(require("./Core"));
/**
 * The current scene with is rendered on screen.
 */
var Scene = /** @class */ (function () {
    function Scene(name) {
        this.name = name;
        this.world = new World_1.default();
    }
    /**
     * Starts the initialisation of the world
     */
    Scene.prototype.run = function () {
        Core_1.default.getInstance().log("Scene", "Initializing scene " + this.name);
        this.world.init();
    };
    /**
     * Updates the world object
     */
    Scene.prototype.update = function () {
        this.world.update();
    };
    /**
     * Get scene name
     */
    Scene.prototype.getName = function () {
        return this.name;
    };
    return Scene;
}());
exports.default = Scene;
//# sourceMappingURL=Scene.js.map