"use strict";

import System from '../System';
import Entity from '../Entity';

/**
 * This systems renders only entities that match the required components.
 */
export default abstract class EntitySystem extends System {
    protected components: Function[] = [];

    public processEntities(entities: Entity[]): void {
        for (let i = 0; i < entities.length; i++) {
            this.update(entities[i]);
        }
    }

    /**
     * @method update
     * @param {Entity} entity
     */
    protected abstract update(entity: Entity): void;

    public getComponents(): Function[] {
        return this.components;
    }
}
