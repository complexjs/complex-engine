'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Complex Core. This class handles the rendering of the current scene.
 */
var cxCore = /** @class */ (function () {
    function cxCore() {
        this.scene = null;
    }
    cxCore.getInstance = function () {
        if (!cxCore.instance) {
            cxCore.instance = new cxCore();
        }
        return cxCore.instance;
    };
    /**
     * load a scene to be rendered
     */
    cxCore.prototype.loadScene = function (scene) {
        this.scene = scene;
        this.scene.load();
        this.scene.run();
    };
    /**
     * render the loaded scene
     */
    cxCore.prototype.update = function () {
        if (this.scene) {
            this.scene.update();
        }
    };
    cxCore.prototype.getScene = function () {
        return this.scene;
    };
    cxCore.instance = null;
    return cxCore;
}());
exports.default = cxCore;
;
//# sourceMappingURL=cxCore.js.map