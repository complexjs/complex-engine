import Scene from './Scene';

/**
 * Complex Core. This class handles the rendering of the current scene.
 */
class Core {

    constructor() {
        /** @var {Scene | null} */
        this.scene = null;

        /** @var {Core | null} */
        this.instance = null;
    }

    /**
     * @returns {Core}
     */
    static getInstance() {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }

    /**
     * load a scene to be rendered
     * @param {Scene} scene
     */
    loadScene(scene) {
        this.scene = scene;
        this.scene.load();
        this.scene.run();
    }

    /**
     * render the loaded scene
     */
    update() {
        if (this.scene) {
            this.scene.update();
        }
    }

    /**
     * @returns {Scene | null}
     */
    getScene() {
        return this.scene;
    }
}

export default Core;