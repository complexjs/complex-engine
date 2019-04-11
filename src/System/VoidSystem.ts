'use strict';

import { System } from '../System';
import Entity from '../Entity';
import World from '../World';

/**
 * This System only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */
export default abstract class VoidSystem implements System {
    protected world: World | null = null;
    
    /**
     * update System
     */
    public abstract update(): void;
    
    
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
