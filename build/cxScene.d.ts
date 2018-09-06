import cxWorld from './cxWorld';
/**
 * The current scene with is rendered on screen.
 */
export default abstract class cxScene {
    protected name: string;
    protected world: cxWorld;
    constructor(name: string);
    /**
     * Called when the world is loaded by the ComplexCore. In this method your stage should be loaded/created
     */
    abstract load(): void;
    /**
     * Starts the initialisation of the world
     */
    run(): void;
    /**
     * Updates the world object
     */
    update(): void;
}
