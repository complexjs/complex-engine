import World from './World';

/**
 * The current scene with is rendered on screen.
 */
class Scene {

    /**
     * @param {string} name
     */
    constructor(name) {
        /** @var {string} */
        this.name = name;
        /** @var {World} */
        this.world = new World();
    }

    /**
     * Is called as soon you use this scene
     */
    prepare(){
        this.world.init();
        this.load();
    }


    /**
     * Called when the world is loaded by the ComplexCore. In this method your stage should be loaded/created
     * @abstract
     */
    load() {
    }


    /**
     * Updates the world object
     */
    update() {
        this.world.update();
    }
}

export default Scene;
