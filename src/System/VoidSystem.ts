import System from '../System';

/**
 * This System only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */
export default abstract class VoidSystem extends System {

    /**
     * update System
     */
    public abstract update(): void;
}
