import Component from './Component';
import { World } from './Complex';
/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */
export default class Entity {
    protected name: string;
    protected components: Component[];
    protected alive: boolean;
    protected remove: boolean;
    protected world: World | null;
    private index;
    constructor(name?: string);
    /**
     * Add a Component to the entity
     */
    addComponent(component: Component): void;
    /**
     * Get a Component from the entity by its tag name
     */
    getComponents<T>(component: Function): T[];
    /**
     * Get a Component from the entity by its tag name
     */
    hasComponent(component: Function): boolean;
    /**
     * remove a Component from the entity
     */
    removeComponent(component: Function): void;
    /**
     * Get all components from the entity
     */
    getAllComponents(): Component[];
    /**
     * Reuses old Component slots in the array
     */
    private _getFreeSlot;
    /**
     * Kills the entity
     */
    destroy(): void;
    /**
     * Get the worl object from the entity
     */
    getWorld(): World | null;
    /**
     * Set the worldobject
     */
    setWorld(world: World): void;
    setIndex(index: number): void;
    getIndex(): number | null;
    isAlive(): boolean;
    isRemove(): boolean;
}
