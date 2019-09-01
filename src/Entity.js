import Component from './Component';
import { World } from './Complex';

/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */
class Entity {

    /**
     * 
     * @param {string} name 
     */
    constructor(name = "Entity") {
        /** @var {string} */
        this.name = name;

        /** @var { Component[]} */
        this.components = [];

        /** @var {boolean} */
        this.alive = true;

        /** @var {boolean} */
        this.remove = false;

        /** @var {World | null} */
        this.world = null;

        /** @var {number | null} */
        this.index = null;
    }

    /**
     * Add a Component to the entity
     * @param {Component} component
     */
    addComponent(component) {
        let slot = this._getFreeSlot();
        if (slot != null) {
            this.components[slot] = component;
        } else {
            this.components.push(component);
        }
    }

    /**
     * Get a Component from the entity by its tag name
     * @param {Function} component
     * @return {Component[]}
     */
    getComponents(component) {
        let components = [];
        for (let i = 0, len = this.components.length; i < len; i++) {
            let c = this.components[i];
            if (c instanceof component) {
                components.push(c);
            }
        }
        return components;
    }

    /**
     * Get a Component from the entity by its tag name
     * @param {Function} component
     * @returns {boolean}
     */
    hasComponent(component) {
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
     * @param {Function} component
     */
    removeComponent(component) {
        for (let i = 0, len = this.components.length; i < len; i++) {
            let c = this.components[i];
            if (c instanceof component) {
                delete this.components[i];
            }
        }
    }

    /**
     * Get all components from the entity
     * @returns { Component[]}
     */
    getAllComponents() {
        return this.components;
    }

    /**
     * Reuses old Component slots in the array
     * @return {number | null}
     * @private
     */
    _getFreeSlot() {
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
    destroy() {
        this.alive = false;
        this.remove = true;
    }

    /**
     * Get the worl object from the entity
     * @returns {World | null}
     */
    getWorld() {
        return this.world;
    }

    /**
     * Set the worldobject
     * @param {World} world
     *
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * 
     * @param {number} index 
     */
    setIndex(index) {
        this.index = index;
    }

    /**
     * @returns {number | null}
     */
    getIndex() {
        return this.index;
    }

    /**
     * @returns {boolean}
     */
    isAlive() {
        return this.alive;
    }

    /**
     * @returns {boolean}
     */
    isRemove() {
        return this.remove;
    }
}

export default Entity;
