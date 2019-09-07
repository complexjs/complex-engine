import Scene from './Scene';
import SimpleScene from './SimpleScene';

/**
 * Complex Engine. This class handles the rendering of the current scene.
 */
class Engine {

    constructor() {
        /** @var {Scene | null} */
        this.scene = null;

        /** @var {Engine | null} */
        this.instance = null;
    }

    /**
     * Gets current instance
     * @returns {Engine}
     */
    static getInstance() {
        if (!Engine.instance) {
            Engine.instance = new Engine();
        }
        return Engine.instance;
    }

    /**
     * Compose a simple scene for a very quick start
     * @param {function} setupFunction
     * @return {Engine}
     */
    simpleScene(setupFunction) {
        const scene = new SimpleScene();
        setupFunction.bind(scene)();
        this.useScene(scene);
        return this;
    }

    /**
     * load a scene to be rendered
     * @param {Scene} scene
     * @deprecated
     * @return {this}
     */
    loadScene(scene) {
        this.scene = scene;
        this.scene.load();
        this.scene.run();
        return this;
    }

    /**
     * Use a scene
     * @param scene
     * @return {Engine}
     */
    useScene(scene) {
        this.scene = scene;
        this.scene.prepare();
        return this;
    }

    /**
     * Start the rendering loop. This updates automatically with requestAnimationFrame
     * @return {Engine}
     */
    start() {
        this._render();
        return this;
    }

    /**
     * Render the scene and world. Updates with requestAnimationFrame
     * @private
     */
    _render() {
        this.update();
        requestAnimationFrame(() => {
            this._render();
        });
    }

    /**
     * render the loaded scene
     * @return {Engine}
     */
    update() {
        if (this.scene) {
            this.scene.update();
        }
        return this;
    }

    /**
     * @returns {Scene | null}
     */
    getScene() {
        return this.scene;
    }
}

export default Engine;
