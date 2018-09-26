"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Complex Core. This class handles the rendering of the current scene.
 */
var Core = /** @class */ (function () {
    function Core() {
        this.scene = null;
        this.logger = console.log;
    }
    Core.getInstance = function () {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    };
    /**
     *
     */
    Core.prototype.log = function (tag) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [tag].concat(data));
    };
    /**
     * load a scene to be rendered
     */
    Core.prototype.loadScene = function (scene) {
        this.scene = scene;
        Core.getInstance().log("Core", "Scene " + scene.getName() + " loaded");
        this.scene.load();
        this.scene.run();
    };
    /**
     * render the loaded scene
     */
    Core.prototype.update = function () {
        if (this.scene) {
            this.scene.update();
        }
    };
    Core.prototype.getScene = function () {
        return this.scene;
    };
    Core.instance = null;
    return Core;
}());
exports.default = Core;
;
//# sourceMappingURL=Core.js.map