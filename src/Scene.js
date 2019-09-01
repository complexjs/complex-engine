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
     * Called when the world is loaded by the ComplexCore. In this method your stage should be loaded/created
     */
    load() {

    }

    /**
     * Starts the initialisation of the world
     */
    run() {
        this.world.init();
    }

    /**
     * Updates the world object
     */
    update() {
        this.world.update();
    }
}

export default Scene;