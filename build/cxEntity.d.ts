import cxComponent from './cxComponent';
import { cxWorld } from './Complex';
/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */
export default class cxEntity {
    protected name: string;
    protected components: cxComponent[];
    protected alive: boolean;
    protected remove: boolean;
    protected world: cxWorld | null;
    private index;
    constructor(name?: string);
    /**
     * Add a component to the entity
     */
    addComponent(component: cxComponent): void;
    /**
     * Get a component from the entity by its tag name
     */
    getComponents(componentName: string): cxComponent[];
    /**
     * Get a component from the entity by its tag name
     */
    hasComponent(componentName: string): boolean;
    /**
     * remove a component from the entity
     */
    removeComponent(componentName: string): void;
    /**
     * Get all components from the entity
     */
    getAllComponents(): cxComponent[];
    /**
     * Reuses old component slots in the array
     */
    private _getFreeSlot;
    /**
     * Kills the entity
     */
    destroy(): void;
    /**
     * Get the worl object from the entity
     */
    getWorld(): cxWorld | null;
    /**
     * Set the worldobject
     */
    setWorld(world: cxWorld): void;
    setIndex(index: number): void;
    getIndex(): number | null;
    isAlive(): boolean;
    isRemove(): boolean;
}
