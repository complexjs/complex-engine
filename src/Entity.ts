import Component from './Component';
import {World} from './Complex';

/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */
export default class Entity {
    protected name: string;
    protected components: Component[] = [];
    protected alive: boolean = true;
    protected remove: boolean = false;
    protected world: World | null = null;
    private index: number | null = null;

    constructor(name: string = "Entity") {
        this.name = name;
    }

    /**
     * Add a Component to the entity
     */
    public addComponent(component: Component): void {
        let slot = this._getFreeSlot();
        if (slot != null) {
            this.components[slot] = component;
        } else {
            this.components.push(component);
        }
    }

    /**
     * Get a Component from the entity by its tag name
     */
    public getComponents<T>(component: Function): T[] {
        let components: T[] = [];
        for (let i = 0, len = this.components.length; i < len; i++) {
            let c = <T>this.components[i];
            if (c instanceof component) {
                components.push(c);
            }
        }
        return components;
    }

    /**
     * Get a Component from the entity by its tag name
     */
    public hasComponent(component: Function): boolean {
        for (let i = 0, len = this.components.length; i < len; i++) {
            let c = this.components[i];
            if (c instanceof component) {
                return true;
            }
        }
        return false;
    }

    /**
     * remove a Component from the entity
     */
    public removeComponent(component: Function): void {
        for (let i = 0, len = this.components.length; i < len; i++) {
            let c = this.components[i];
            if (c instanceof component) {
                delete this.components[i];
            }
        }
    }

    /**
     * Get all components from the entity
     */
    public getAllComponents(): Component[] {
        return this.components;
    }

    /**
     * Reuses old Component slots in the array
     */
    private _getFreeSlot(): number | null {
        for (let c = 0, len = this.components.length; c < len; c++) {
            let component = this.components[c];
            if (component == undefined || component == null) {
                return c;
            }
        }
        return null;
    }

    /**
     * Kills the entity
     */
    public destroy(): void {
        this.alive = false;
        this.remove = true;
    }

    /**
     * Get the worl object from the entity
     */
    public getWorld(): World | null {
        return this.world;
    }

    /**
     * Set the worldobject
     */
    public setWorld(world: World): void {
        this.world = world;
    }

    public setIndex(index: number): void {
        this.index = index;
    }

    public getIndex(): number | null {
        return this.index;
    }

    public isAlive(): boolean {
        return this.alive;
    }

    public isRemove(): boolean {
        return this.remove;
    }
}
