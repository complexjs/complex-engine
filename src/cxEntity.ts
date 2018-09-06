"use strict";

import cxComponent from './cxComponent';
import {cxWorld} from './Complex';

/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */
export default class cxEntity {
    protected name: string;
    protected components: cxComponent[] = [];
    protected alive: boolean = true;
    protected remove: boolean = false;
    protected world: cxWorld | null = null;
    private index: number | null = null;

    constructor(name: string = "Entity") {
        this.name = name;
    }

    /**
     * Add a component to the entity
     */
    public addComponent(component: cxComponent): void {
        let slot = this._getFreeSlot();
        if (slot != null) {
            this.components[slot] = component;
        } else {
            this.components.push(component);
        }
    }

    /**
     * Get a component from the entity by its tag name
     */
    public getComponents(componentName: string): cxComponent[] {
        let components = [];
        for (let i = 0, len = this.components.length; i < len; i++) {
            let component = this.components[i];
            if (component.tag === componentName) {
                components.push(component);
            }
        }
        return components;
    }

    /**
     * Get a component from the entity by its tag name
     */
    public hasComponent(componentName: string): boolean {
        for (let i = 0, len = this.components.length; i < len; i++) {
            let component = this.components[i];
            if (component.tag === componentName) {
                return true;
            }
        }
        return false;
    }

    /**
     * remove a component from the entity
     */
    public removeComponent(componentName: string): void {
        for (let i = 0, len = this.components.length; i < len; i++) {
            let component = this.components[i];
            if (component.tag == componentName) {
                delete this.components[i];
            }
        }
    }

    /**
     * Get all components from the entity
     */
    public getAllComponents(): cxComponent[] {
        return this.components;
    }

    /**
     * Reuses old component slots in the array
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
    public getWorld(): cxWorld | null {
        return this.world;
    }

    /**
     * Set the worldobject
     */
    public setWorld(world: cxWorld): void {
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
