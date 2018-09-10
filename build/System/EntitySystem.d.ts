import System from '../System';
import Entity from '../Entity';
/**
 * This systems renders only entities that match the required components.
 */
export default abstract class EntitySystem extends System {
    protected components: Function[];
    processEntities(entities: Entity[]): void;
    /**
     * @method update
     * @param {Entity} entity
     */
    protected abstract update(entity: Entity): void;
    getComponents(): Function[];
}
