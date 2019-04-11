import { System } from '../System';
import Entity from '../Entity';
import World from '../World';
/**
 * This systems renders only entities that match the required components.
 */
export default abstract class EntitySystem implements System {
    protected components: Function[];
    protected world: World | null;
    processEntities(entities: Entity[]): void;
    /**
     * Get list of components to work with this system
     */
    getComponents(): Function[];
    /**
     * @method update
     * @param {Entity} entity
     */
    protected abstract update(entity: Entity): void;
    added(entity: Entity): void;
    addedToWorld(): void;
    removed(entity: Entity): void;
    setWorld(world: World): void;
}
