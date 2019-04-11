'use strict';

import { System } from '../System';
import Entity from '../Entity';
import World from '../World';

/**
 * This systems renders only entities that match the required components.
 */
export default abstract class EntitySystem implements System {
    protected components: Function[] = [];
    protected world: World | null = null;
    
    public processEntities(entities: Entity[]): void {
        for (let i = 0; i < entities.length; i++) {
            this.update(entities[i]);
        }
    }
    
    /**
     * Get list of components to work with this system
     */
    public getComponents(): Function[] {
        return this.components;
    }
    
    
    /**
     * @method update
     * @param {Entity} entity
     */
    protected abstract update(entity: Entity): void;
    
    
    public added(entity: Entity): void {
    
    };
    
    public addedToWorld(): void {
    
    };
    
    public removed(entity: Entity): void {
    
    }
    
    public setWorld(world: World): void {
        this.world = world;
    }
}
